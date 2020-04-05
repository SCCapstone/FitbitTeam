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
    password: '',
    first_name: '',
    last_name:'',
    type: ''
  };
  constructor() { }
  ngOnInit() {
    firebase.auth().signOut().then(function() {
    }).catch(function(error) {
      // An error happened.
    });
    //console.log(firebase.auth().currentUser.uid)
  }

  signup() {
    var email = this.user.email;
    var password = this.user.password;
    const first_name = this.user.first_name;
    const last_name = this.user.last_name;
    const type= this.user.type;
    const status = 'Healthy'
    const self= this;
    

    console.log(this.user);
    //Database stuff
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error.message);
      if (errorCode.length > 0) {
        console.log('Failed');
        alert(errorMessage)
        this.failsafe=false;
      } else {
        console.log('Signed-UP');
      }
      })
      .then((user) => {
     
          console.log(firebase.auth().currentUser.uid)
          const userid = firebase.auth().currentUser.uid;
          const usertype = firebase.database().ref('usertypes/'+userid);
          usertype.set({
            'uid': userid,
            'first_name': first_name,
            'last_name': last_name,
            'status': status,
            'type': type
          });
          console.log(usertype)
        
        
      });
  }
}
