import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router,Routes, RouterModule , ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {
  userid = ''
  info:any
  first = ''
  tClients:any
  clients:any
  last = ''
  patName = ''
  refNum = ''
  hasclicked=false
  constructor(public router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.userid = firebase.auth().currentUser.uid;
    console.log(this.userid)
    var usid = firebase.auth().currentUser.uid;
    var pref = firebase.database().ref('clients/' + usid );
    var refs = firebase.database().ref('usertypes/' + usid);
    refs.on('value', (snapshot) => {
      this.info = snapshot.val();
    })
    this.first = this.info.first_name
    this.last = this.info.last_name
    pref.on('value', (snapshot) => {
      this.tClients = snapshot.val();
      this.clients = Object.keys(this.tClients).map(i => this.tClients[i]);
    })
  }
  clicked(){
    this.hasclicked= !this.hasclicked;
    console.log(this.hasclicked)
  }
  toTimeline(){
    this.router.navigate(["../timeline"])
    console.log(firebase.auth().currentUser.uid)
  }
  logout(){
    firebase.auth().signOut();
    this.router.navigate(["../login"])
    console.log(firebase.auth().currentUser.uid)
  }
  add(){
    var userid = firebase.auth().currentUser.uid;
    var patName = this.patName;
    var refNum = this.refNum;
    var path:string = "clients/" + userid.toString();
    let clients = firebase.database().ref(path).push();
    clients.set ({
      'patName':patName,
      'refNum': refNum
    });
    this.refNum = ''
    this.patName=''
  this.clicked();
  }
}
