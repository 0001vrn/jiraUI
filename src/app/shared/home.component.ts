import { Component, OnInit } from '@angular/core';
import { JiraApiService } from '../boards/boards.service';
import { IBoard } from '../boards/board';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { User } from '../form-data/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {
  
  
  projects :IBoard[];
  currentProject = '';
  currentBoardId = -2;
  isSelected = false;
  isloggedIn = false;
  errorMessage: string;
 // Inject HttpClient into your component or service.
 constructor(private _boardsService: JiraApiService) {}
 
 open(item) :void
 {
      //console.log(item);
      this.currentBoardId = item.id;
      this.currentProject = item.name;
      this.isSelected = true;
  }

  ngOnChanges(){
    console.log('changes called '+JSON.parse(localStorage.getItem("user")));
  }
  ngOnInit(): void {
    //debugger
    if(localStorage.getItem("user")=="")
    {
      //console.log('here if');

      this.errorMessage = "Please login first";
    }
    else
    {
      
      this._boardsService.getBoards()
      .subscribe(boards=>{
        //console.log(boards);  
        this.currentBoardId=-1;
        
        this.projects=boards;
      },
        error => {
        this.errorMessage="Please try again or refresh the page";
      });
    }
    
  } 
}

