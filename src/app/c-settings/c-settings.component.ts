import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router,Routes, RouterModule , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-c-settings',
  templateUrl: './c-settings.component.html',
  styleUrls: ['./c-settings.component.css']
})
export class CSettingsComponent implements OnInit {

  constructor(public router: Router,private route: ActivatedRoute) {
    var userid = firebase.auth().currentUser.uid;
    console.log(userid)
   }

  ngOnInit() {
  }

  logout(){
    firebase.auth().signOut();
    this.router.navigate(["../login"])
    console.log(firebase.auth().currentUser.uid)
  }
}
