import { Component, OnInit, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { AccountsServer } from '@accounts/server';
//import { Mongo } from '@accounts/mongo';
//const mongoose = require('mongoose');
import * as firebase from 'firebase';
import { Directive, forwardRef, Attribute} from "@angular/core";
import { Validator, AbstractControl, NG_VALIDATORS} from "@angular/forms";
import { Router,Routes, RouterModule , ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  user = {
    email: '',
    password: '',
    retype_password: '',
    first_name: '',
    last_name:'',
    type: ''
  };
  constructor(public router: Router,private route: ActivatedRoute) { }
  type:any;
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
    var retype_password = this.user.retype_password;
    const first_name = this.user.first_name;
    const last_name = this.user.last_name;
    const type= this.user.type;
    const status = 'Healthy'
    const self= this;
   
    if (this.validate()){

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
    }else{
      alert("Password must have one uppercase letter, one lowercase letter, one special character (!,#, ...), and be 6+ characters long")
      this.router.navigate(["../signup"])
      console.log('Signup Failed')
    }
  }

  validate(){

    let invalidPassword = true;

    let password = this.user.password;

    let hasLower = false;
    let hasUpper = false;
    let hasNum = false;
    let hasSpecial = false;

    const lowercaseRegex = new RegExp("(?=.*[a-z])");// has at least one lower case letter
    if (lowercaseRegex.test(password)) {
      hasLower = true;
    }

    const uppercaseRegex = new RegExp("(?=.*[A-Z])"); //has at least one upper case letter
    if (uppercaseRegex.test(password)) {
      hasUpper = true;
    }

    const numRegex = new RegExp("(?=.*\\d)"); // has at least one number
    if (numRegex.test(password)) {
      hasNum = true;
    }

    const specialcharRegex = new RegExp("[!@#$%^&*(),.?\":{}|<>]");
    if (specialcharRegex.test(password)) {
      hasSpecial = true;
    }

    let counter = 0;
    let checks = [hasLower, hasUpper, hasNum, hasSpecial];
    for (let i = 0; i < checks.length; i++) {
      if (checks[i]) {
        counter += 1;
      }
    }

    if (counter < 3) {
      return false;
    } else {
      return true;
    }
  }
}
