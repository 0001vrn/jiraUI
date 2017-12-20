import { Component, OnInit } from '@angular/core';
import { User } from '../form-data/user';
import { JiraApiService } from '../boards/boards.service';
import { Router } from '@angular/router';
import { EmitterService } from '../helper/emitter.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  

  model = new User('','','');
  submitted = false;
  
  constructor(private _emitterService:EmitterService,private router: Router) {}
  ngOnInit() {
    if(this.submitted)
    {
      this.router.navigateByUrl('/home');
    }
  }

  
  onSubmit() { 
    this.submitted = true;
    //console.log(this.model);

    if(this.model.email == '' || this.model.password == '' || this.model.serverUrl == ''){
      alert('please fill the form');
      return;
    }
      
    //do base64 encoding for email,password
    //console.log(btoa(this.model.email+this.model.password));


    //store in local storage
    localStorage.setItem("user", this.diagnostic);
    //console.log('localStorage here');


    //do post request to server
    // this._LoginService.postFormSubmit(this.diagnostic).subscribe(
    // res=>{
    //   console.log(res);
    // }, 
    // error => {

    //   console.log('error occured');
      
    // });

   
    //show user logged in
    this._emitterService.publishData(this.model);
    
    //redirect to home
    this.router.navigateByUrl('/home');
     
  }
  
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
