import { Component, OnInit } from '@angular/core';
import { User } from '../form-data/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  model = new User('','');
  submitted = false;

  onSubmit() { this.submitted = true; }
  
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
