import { Component, OnInit, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { AccountsServer } from '@accounts/server';
//import { Mongo } from '@accounts/mongo';
//const mongoose = require('mongoose');
import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = {
    email: '',
 //   username: '',
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
   // const username = this.user.username;
    const first_name = this.user.first_name;
    const last_name = this.user.last_name;
    const type= this.user.type;
    const self= this;

    console.log("This runs");
    console.log(this.user);
    //Database stuff
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error.message);
      if (errorCode.length > 0) {
        console.log('Failed');
        alert(errorMessage)
      } else {
        console.log('Signed-UP');
      }
      })
      .then((user) => {
          const userid = firebase.auth().currentUser.uid;
          //const usertype = firebase.database().ref('usertypes/'+userid).push();
          const usertype = firebase.database().ref('usertypes/'+userid);
          usertype.set({
            'first_name': name,
            'last_name': last_name,
            'type': type
          });
      });
  }
}
