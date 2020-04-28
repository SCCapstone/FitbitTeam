import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router,Routes, RouterModule , ActivatedRoute } from '@angular/router';
import { TimeoutError } from 'rxjs';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {
  userid = ''
  info:any
  Rec = ''
  first = ''
  tClients:any
  trecs:any
  recomends:any
  clients:any
  last = ''
  patName = ''
  id = ''
  refNum = ''
  display = []
  hasclicked=false
  recClicked = false
  constructor(public router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    if (firebase.auth().currentUser != null){
      this.userid = firebase.auth().currentUser.uid
    }
    else {
    this.userid = "";
    this.userid = localStorage.getItem("UID")
  }
  if (this.userid != null){
    console.log(this.userid)
    setTimeout(() => {
    var usid = this.userid
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
      this.loadRecs()
    }, 600)

    }, 500);
  }
  else{
    setTimeout(() => {
      this.ngOnInit()
    }, 200);
  }
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
    //console.log(firebase.auth().currentUser.uid)
  }
  add(){
    var userid = this.userid
    var patName = this.patName;
    var refNum = this.refNum;
    if(this.isValid(refNum) == true){
    let check = firebase.database().ref('usertypes/' + refNum)
    check.on('value', (snapshot) => {
      console.log(snapshot.val())
      if(snapshot.val() != null)
      {
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
    else 
    {
      alert("reference number not found")
    }
  })
  }
  }
  isValid(refNum)
  {
    if(refNum != "")
    {
      return true
    }
    else 
    {
      alert("reference number not found")
    }
    return false
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
    var userid = this.userid
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
  addRec(){
    console.log(this.Rec)
    var path:string = "Recs/";
    var ref = firebase.database().ref(path)
    ref.push(this.Rec)
    this.recClick()
  }
  recClick(){
      this.recClicked= !this.recClicked;
      console.log(this.recClicked)
  }
  //gets the status of the client to display on admin main
  getStatus() {
    var data = []
    var obj:any
    //console.log(this.clients.length)
    setTimeout(() => {
      
    }, 500);
    for(var i = 0; i < this.clients.length; i++)
    {
      var clientId = this.clients[i].refNum
      var refs = firebase.database().ref('usertypes/' + clientId)
      //console.log('usertypes/' + clientId)
      refs.on('value', (snapshot) => {
        data.push(snapshot.val())
       //console.log(snapshot.val())
      })
      //console.log(data)
     // console.log(data.length)
      if(data.length > 0 && data != null) {
        console.log(data[0])
        obj = {
          'patName':data[i].first_name,
          'refNum':this.clients[i].refNum,
          'status':data[i].status
        }
        this.display.push(obj)
      }
     
   
   
        
    }
    if(data.length == 0 && data != null) {
      setTimeout(() => {
       //console.log ("Refresh " + data)
       for (var j = 0; j < data.length; j++){
         console.log(data[j])
         obj = {
           'patName':data[j].first_name,
           'refNum':this.clients[j].refNum,
           'status':data[j].status
         }
         this.display.push(obj)
       }
      
      }, 300);
      
      }
   
  }
  /* this function goes through to set each status */
  setStatus() {

  }
  loadRecs(){
  var mref = firebase.database().ref('Recs/');
    mref.on('value', (snapshot) => {
      this.trecs = snapshot.val();
      if(this.trecs != null ){
        this.recomends = Object.keys(this.trecs).map(i => this.trecs[i]);
      }else{
        console.log("NO Recomendations")
      }
      
    })
}
removeRec(id){
  var size = this.getSize(this.recomends)
  //Goes through list of meds object and removes the meds
  for (var i = 0; i < size; i ++){
    if (this.recomends[i] == this.recomends [id]){
      console.log("Removal of " + this.recomends[i])
      delete this.recomends[i]
    } 
  }
  var path:string = "Recs/";
  var ref = firebase.database().ref(path)
  ref.set(this.recomends)
}
}
