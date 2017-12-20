import { Component, OnChanges, Input } from '@angular/core';
import { User } from './form-data/user';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { EmitterService } from './helper/emitter.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges, OnDestroy{
  
  
  
  emitter: Subscription;
  pageTitle = 'JIRA Monitoring System';
  model = new User('','','');
  isloggedIn=false;
  constructor(private emitterService: EmitterService,private router: Router){
    
  }  
  ngOnInit() {
    this.emitter = this.emitterService.key$.subscribe(
      data =>{
        for (let key in data) {
          this.switchAction(key, data);
      }
    });
    
  }
  ngOnChanges() {
    //console.log('changes called');
  }

  ngOnDestroy(){
    this.emitter.unsubscribe();
  }
  

  logMeOut(){
    
    this.isloggedIn = false;
    
    //reset local storage
    localStorage.setItem("user",'');
    
    //redirect to login
    this.router.navigateByUrl('/login');
  }
  switchAction(type: any, data: User): any {
    this.model = data;
    this.isloggedIn = true;
    //console.log('switch action' + type + data.toString());
  }
}
