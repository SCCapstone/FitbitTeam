import { Component, OnInit, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { AccountsServer } from '@accounts/server';
import { Mongo } from '@accounts/mongo';
//const mongoose = require('mongoose');


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = {
    email: '',
    username: '',
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
    const username = this.user.username;
    const first_name = this.user.first_name;
    const last_name = this.user.last_name;
    const type= this.user.type;
    const self= this;

    console.log("This runs");
    console.log(this.user);
    //Database stuff
    //mongoose.connect(process.env.MONGO_URL);
    //const db = mongoose.connection;
    //console.log(db)

  }
}