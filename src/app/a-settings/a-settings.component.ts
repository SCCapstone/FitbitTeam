import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router,Routes, RouterModule , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-a-settings',
  templateUrl: './a-settings.component.html',
  styleUrls: ['./a-settings.component.css']
})
export class ASettingsComponent implements OnInit {
first = ''
last = ''
info:any
  constructor(public router: Router,private route: ActivatedRoute) {
    var userid = firebase.auth().currentUser.uid;
    console.log(userid)
   }

  ngOnInit() {
    var usid = firebase.auth().currentUser.uid;
    var refs = firebase.database().ref('usertypes/' + usid);

    refs.on('value', (snapshot) => {
      this.info = snapshot.val();
    })
    this.first = this.info.first_name
    this.last = this.info.last_name
  }

  logout(){
    firebase.auth().signOut();
    this.router.navigate(["../login"])
    console.log(firebase.auth().currentUser.uid)
  }
}