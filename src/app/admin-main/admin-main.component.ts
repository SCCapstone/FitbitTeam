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
  id = ''
  refNum = ''
  display = []
  hasclicked=false
  constructor(public router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.userid = firebase.auth().currentUser.uid;
    console.log(this.userid)
    var usid = firebase.auth().currentUser.uid;
    var pref = firebase.database().ref('clients/' + this.userid);
    var refs = firebase.database().ref('usertypes/' + usid);
    refs.on('value', (snapshot) => {
      this.info = snapshot.val();
    })
    setTimeout(() => {
    this.first = this.info.first_name
    this.last = this.info.last_name
    pref.on('value', (snapshot) => {
      this.tClients = snapshot.val();
      this.clients = Object.keys(this.tClients).map(i => this.tClients[i]);
    })
    }, 300);
    setTimeout(() => {
      this.getStatus()
    }, 400)
  }
  clicked(){
    this.hasclicked= !this.hasclicked;
    console.log(this.hasclicked)
  }
  toTimeline(refNumb){
    console.log(refNumb)
    this.router.navigate(["../timeline"], { state: { example: refNumb } })
    console.log(refNumb)
    //console.log(firebase.auth().currentUser.uid)
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
    this.addDisp(refNum)
  this.clicked();
  }
  addDisp(refNumber)
  {
    var refs = firebase.database().ref('usertypes/' + refNumber)
    var data = []
    refs.on('value', (snapshot) => {
     data.push(snapshot.val())
    })
    let obj = {
      'patName':data[0].first_name,
      'refNum':refNumber,
      'status':data[0].status
    }
    this.display.push(obj)
  }
  remove(id){
    //console.log(this.clients)
    var size = this.getSize(this.clients)
    //Goes through list of meds object and removes the meds
    for (var i = 0; i < size; i ++){
      if (this.clients[i] == this.clients [id]){
        console.log("Removal of " + this.clients[i])
        delete this.clients[i]
        delete this.display[i]
      } 
    }
    this.display = this.display.filter(function (el) {
      return el != null;
    });
    console.log(this.display)
    //This changes the new medication object in the database
    var userid = firebase.auth().currentUser.uid;
    var path:string = "clients/" + userid.toString();
    var ref = firebase.database().ref(path)
    ref.set(this.clients)
  }
  //gets size of an object in js
  getSize(obj){
    var size = 0, key;
    for (key in obj){
      size++;
    }
    return size;

  }
  //gets the status of the client to display on admin main
  getStatus() {
    var data = []
    var obj:any
    for(var i = 0; i < this.clients.length; i++)
    {
      var refs = firebase.database().ref('usertypes/' + this.clients[i].refNum)
      refs.on('value', (snapshot) => {
        data.push(snapshot.val())
      })
      obj = {
        'patName':data[i].first_name,
        'refNum':this.clients[i].refNum,
        'status':data[i].status
      }
      this.display.push(obj)
    }
    console.log(this.display)
  }
  /* this function goes through to set each status */
  setStatus() {

  }
}
