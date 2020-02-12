import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router,Routes, RouterModule , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-c-settings',
  templateUrl: './c-settings.component.html',
  styleUrls: ['./c-settings.component.css']
})
export class CSettingsComponent implements OnInit {
  first = ''
  last = ''
  editName = false
  userid = 'test'
  hasclicked=false
  info:any
  type = ''
  dname = ''
  dnum = ''
  devices:any
  constructor(public router: Router,private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.userid = firebase.auth().currentUser.uid;
    console.log(this.userid)
    var usid = firebase.auth().currentUser.uid;
    var refs = firebase.database().ref('usertypes/' + usid);
    var dref = firebase.database().ref('devices/' + usid );
    refs.on('value', (snapshot) => {
      this.info = snapshot.val();
    })
    this.first = this.info.first_name
    this.last = this.info.last_name
    this.type = this.info.type
    dref.on('value', (snapshot) => {
      var tmeds = snapshot.val();
      this.devices = Object.keys(tmeds).map(i => tmeds[i]);
      
    })
  }

  logout(){
    firebase.auth().signOut();
    this.router.navigate(["../login"])
    console.log(firebase.auth().currentUser.uid)
  }
  clicked(){
    this.first= ''
    this.last = ''
    this.hasclicked= !this.hasclicked;
    console.log(this.hasclicked)
  }

  SaveNew(){
    this.info.first_name = this.first
    this.info.last_name = this.last
    this.info.type = this.info.type
    var usid = firebase.auth().currentUser.uid;
    var refs = firebase.database().ref('usertypes/' + usid);
    console.log(this.info)
    refs.set(this.info)
  }

  test(){
    var type = this.info.type
    console.log(type)
  }
  homepage(){
    var type = this.info.type
    if(type == 'Admin'){
      this.router.navigate(["../admin"])
    }
    else{
      this.router.navigate(["../cmain"])
    }
  }

}
