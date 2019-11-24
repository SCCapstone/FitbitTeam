import { Component, OnInit, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = {
    email: '',
    password: '',
    first_name: '',
    last_name:'',
    type: ''
  };
  constructor() { }

  ngOnInit() {
  }
  signup() {
    const email = this.user.email;
    const password = this.user.password;
    const first_name = this.user.first_name;
    const last_name = this.user.last_name;
    const type= this.user.type;
    const self= this;

    console.log("This runs");
    console.log(this.user);

    
  }


}
