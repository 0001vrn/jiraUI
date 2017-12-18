import { Component, OnInit, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from '../shared/home.component';
import { SprintDetail, ResourseTimeChart, IndividualStoryPoints, TimeTracking } from '../sprint-details/sprint';
import { JiraApiService } from '../boards/boards.service';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import {state, trigger, stagger, animate, style, group, query, transition, keyframes} from '@angular/animations';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-sprint-details',
  templateUrl: './sprint-details.component.html',
  styleUrls: ['./sprint-details.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('toggleHoursLogged', [
      state('open', style({ height: 'auto', overflow:'auto' })),
      // asterisk calculates the size of the element
      state('closed', style({ height: '0px', padding: '0px', overflow:'auto'})),
      transition('open <=> closed', animate('400ms ease-in-out'))
    ]),
    trigger('toggleTimeEst', [
      state('open', style({ height: 'auto', overflow:'auto' })),
      // asterisk calculates the size of the element
      state('closed', style({ height: '0px', padding: '0px', overflow:'auto'})),
      transition('open <=> closed', animate('400ms ease-in-out'))
    ])
  ]
})
export class SprintDetailsComponent implements OnInit ,OnChanges {
  ctr = 0;
  loading=false;
  public doughnutChartLabels:string[]=[];
  public doughnutChartData:number[]=[];
  public totalTimeSpent:string;
  public totalDaysLeft;
  public isHoursLoggedUp: boolean;
  public isTimeEstUp: boolean;
  public doughnutChartType:string = 'doughnut';
  public red:string;
  public green:string;
  public datePick:string;
  public stateHours = "open";
  public stateTimeEst = "open";
  errorMessage: string;
  loggedHoursResponse: Array<ResourseTimeChart>;
  individualStoryPointsAssigned: Array<IndividualStoryPoints>;
  timeTrackingPerStory: Array<TimeTracking>;
  isFromDate:boolean = false;
  minDate;
  maxDate;
  ngOnChanges(): void {
    //console.log('change called');
    this.loading=true;
    this.errorMessage="";
    this.myInit();

  }

  sprintDetails: SprintDetail;
  @Input() boardId: string;

  
  constructor(private http: HttpClient,private boardService:JiraApiService ) {
    
  }
  trunc(hours:number):number{
    return Math.trunc(hours);
  }
  option:any={
    legend: {
      display: false
  },
     tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          return data.labels[tooltipItem.index]+" : "+Math.trunc(+(+data.datasets[0].data[tooltipItem.index])/3600)+" h";
        }
      }
    }
  }
  ngOnInit() {
    this.loading=true;
    this.myInit();
    this.red='red red-parent';
    this.green='green red-parent';
  }
  onDateChange(myDate: string){
    //console.log('here is date ' + myDate); 
    this.loading = true;
    
    this.boardService.getLoggedHours(this.boardId,myDate).subscribe(res=>{
      
      this.loggedHoursResponse = res;
      this.isFromDate = true;
      this.loading = false;
      //console.log('logged hours ' + JSON.stringify(this.loggedHoursResponse));
    },error=>{
      this.setError();
      this.loading = false;
      
    });
  }
  myInit()
  {
    if(this.ctr==0){
      this.ctr++;
      return;
    }

      this.boardService.getSprintActualvsEstimated(this.boardId).subscribe(res =>{
        this.timeTrackingPerStory = res;
      }
      ,error => {
        this.setError();
      });

      this.boardService.getIndividualStoryPoints(this.boardId).subscribe(res => {
        //console.log('individual sp : '+JSON.stringify(res));
        this.individualStoryPointsAssigned = res;
      }
      ,error => {
        this.setError();
      });

      this.boardService.getActiveSprint(this.boardId).subscribe(res => {
      //console.log(res);
      this.sprintDetails =res[0];
      this.loading=false;
      if(this.sprintDetails == undefined)
      {  
        this.setError();
        return;
      }
      
      this.minDate = new Date(this.sprintDetails.startDate);
      this.maxDate = new Date(this.sprintDetails.endDate) > new Date()?new Date():new Date(this.sprintDetails.endDate);
      
      this.totalDaysLeft = this.getTimeDuration(new Date(), this.sprintDetails.endDate);
      //console.log(this.totalDaysLeft);
      
      var x=this.sprintDetails.timeChart;
      this.isFromDate = false;
      //console.log(this.datePick);
      this.doughnutChartData= x.map(x=>x["timeChart"]["originalEstimated"]);
      
      //console.log(this.getReadableTime(x.map(x=>x["timeChart"]["totalSpent"]).reduce((a,b)=>a+b)));

      this.totalTimeSpent=this.getReadableTime(x.map(x=>x["timeChart"]["originalEstimated"]).reduce((a,b)=>a+b)); 
      setTimeout( () => {this.doughnutChartLabels =  x.map(x=>x["resourseName"])});
      
    },error => {
      this.setError();
      }
  );
  }

  resetError(){
    this.errorMessage="";
  }
  setError(){
    this.errorMessage="Please try again or refresh the page";
  }

  getReadableTime(seconds: number){
    var numWeeks = Math.floor(seconds/604800)
    var numDays = Math.floor((seconds % 604800)/86400);
    var numHours = Math.floor((seconds % 86400) / 3600);
    var numMinutes = Math.floor(((seconds % 86400) % 3600) / 60);
    return numWeeks + "w " + numDays + "d " + numHours + "h " + numMinutes + "m";
  }

  getTimeDuration(startDate, endDate){
    var eventStartTime = new Date(startDate);
    var eventEndTime = new Date(endDate);
    var duration = (((eventEndTime.valueOf() - eventStartTime.valueOf())/1000) % 604800) / 86400;
    if(duration > 0){
      return duration.toFixed(1);
    }
    else{
      return 0;
    }
  }
 
 getFixedTime(seconds){
   var numHours = seconds/3600;
   return numHours.toFixed(1);
 }
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  public toggleHoursLogged(){
    this.stateHours = (this.stateHours=="open")? "closed": "open";
    this.isHoursLoggedUp = (this.stateHours=="open")? true: false;
  }

  public toggleTimeEst(){
    this.stateTimeEst = (this.stateTimeEst=="open")? "closed": "open";
    this.isTimeEstUp = (this.stateTimeEst=="open")? true: false;
  }
}
