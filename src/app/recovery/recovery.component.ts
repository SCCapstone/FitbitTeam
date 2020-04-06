import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {
  email = ''
  constructor() { }

  ngOnInit() {
  }
  sendEmail(){
    var auth = firebase.auth();
  auth.sendPasswordResetEmail(this.email).then(function() {
  // Email sent.
}).catch(function(error) {
  // An error happened.
});
  }

}
