import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  uid = ''
  constructor() { }

  ngOnInit() {
    
  }
  login(){
    var login = true;
    const email = this.email;
    const password = this.password;
    var id = '';
    const self = this;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      login = false;
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else if (errorCode === 'auth/user-not-found'){
        alert("User does not exist");
      } else {
        alert(errorMessage);
      }
      
      })
      .then(function(result){
        console.log("login Sucess")
        let userid = firebase.auth().currentUser.uid;
        let usertypesRef = firebase.database().ref('usertypes/');
        usertypesRef.orderByChild("uid").equalTo(userid).on("value",function(data){
          data.forEach(function(thing){
          })
        });
    });
  }

}
