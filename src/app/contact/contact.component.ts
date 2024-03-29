import { Component, OnInit } from '@angular/core';
import { Router,Routes, RouterModule, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  logged = false

  firstName = ''
  lastName = ''
  email = ''
  phoneNum = ''
  message = ''
  constructor() { }

  ngOnInit() {
    if (firebase.auth().currentUser == null){
      console.log("NOT LOGGED IN")
      this.logged = false
    }
    else{
      console.log(firebase.auth().currentUser.uid)
      console.log("LOGGED IN")
      this.logged = true
    
    }  
  }
  addMessage(){
      var firstName = this.firstName;
      var lastName = this.lastName;
      var email = this.email;
      var phoneNum = this.phoneNum;
      var message = this.message;
      var path:string = "contactMessages/";
      let contact = firebase.database().ref(path).push();
      contact.set ({
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'phoneNum': phoneNum,
        'message' : message
      });
      this.firstName = ''
      this.lastName=''
      this.email=''
      this.phoneNum=''
      this.message=''
      alert("Message Sent")
    }
  }
