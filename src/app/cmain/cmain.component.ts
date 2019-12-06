import { Component, OnInit } from '@angular/core';
import { Router,Routes, RouterModule , ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-cmain',
  templateUrl: './cmain.component.html',
  styleUrls: ['./cmain.component.css']
})
export class CmainComponent implements OnInit {
  userid = ''
  info:any
  first = ''
  tmeds:any
  meds:any
  last = ''
  medName = ''
  medTime = ''
  medDate = ''
  medEntry:any
  hasclicked=false

  constructor(public router: Router,private route: ActivatedRoute) {
    var userid = firebase.auth().currentUser.uid;
    console.log(userid)

   }

  ngOnInit() {
    this.userid = firebase.auth().currentUser.uid;
    console.log(this.userid)
    var usid = firebase.auth().currentUser.uid;
    var mref = firebase.database().ref('meds/' + usid );
    var refs = firebase.database().ref('usertypes/' + usid);
    refs.on('value', (snapshot) => {
      this.info = snapshot.val();
    })
    this.first = this.info.first_name
    this.last = this.info.last_name
    mref.on('value', (snapshot) => {
      this.tmeds = snapshot.val();
      this.meds = Object.keys(this.tmeds).map(i => this.tmeds[i]);
    })
    //console.log("outside" + this.meds)
  }
  
  toTimeline(){
    this.router.navigate(["../timeline"])
  }


  logout(){
    firebase.auth().signOut();
    this.router.navigate(["../login"])
    console.log(firebase.auth().currentUser.uid)
  }
  clicked(){
    this.hasclicked= !this.hasclicked;
    console.log(this.hasclicked)
  }

  add(){
    var userid = firebase.auth().currentUser.uid;
    var medname = this.medName;
    var meddate = this.medDate;
    var medTime = this.medTime;
    var path:string = "meds/" + userid.toString();
    let med = firebase.database().ref(path).push();
    med.set ({
      'medname':medname,
      'meddate': meddate,
      'medTime': medTime
    });
    this.medName = ''
    this.medDate=''
    this.medTime=''
  this.clicked();
  }



}
