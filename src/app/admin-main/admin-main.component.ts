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
  //Global variables used in later ts code or in the HTML
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
  type = ''
  constructor(public router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    //Used for refresh.
    console.log(localStorage.getItem("type"))
  if (firebase.auth().currentUser != null){
    this.userid = firebase.auth().currentUser.uid
  }
  else {
    this.userid = "";
    this.userid = localStorage.getItem("UID")
  }
  //Make sure UserId is not null
  if (this.userid != null){
    setTimeout(() => {
    var usid = this.userid
    //Grabs refs for the firebase database
    var pref = firebase.database().ref('clients/' + this.userid);
    var refs = firebase.database().ref('usertypes/' + usid);
    //Grabs current admin user info from firebase
    refs.on('value', (snapshot) => {
      this.info = snapshot.val();
    })
    //Loads Client information and User information
    setTimeout(() => {
    this.first = this.info.first_name
    this.last = this.info.last_name
    this.type = this.info.type
    localStorage.setItem("userName", this.first)
    localStorage.setItem("type", this.type)
    pref.on('value', (snapshot) => {
      this.tClients = snapshot.val();
      this.clients = Object.keys(this.tClients).map(i => this.tClients[i]);
    })
    }, 300);
    //Gets the status of each clients and loads the recomendation
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
  //Toggle for *ngIfs in the HTML
  clicked(){
    this.hasclicked= !this.hasclicked;
    console.log(this.hasclicked)
  }
  //used to go to specific client timeline page
  toTimeline(refNumb){
    this.router.navigate(["../timeline"], { state: { example: refNumb } })
  }
  //Logout of the app and remove firebase token
  logout(){
    localStorage.clear()
    firebase.auth().signOut();
    this.router.navigate(["../login"])
  }
  //This adds a client to a admin account through the reference number
  add(){
    //Grabs current user, the clients name, and their reference number
    var userid = this.userid
    var patName = this.patName;
    var refNum = this.refNum;
    //Checks to make sure the Refernece number is valid
    if(this.isValid(refNum) == true){
      let check = firebase.database().ref('usertypes/' + refNum)
      check.on('value', (snapshot) => {
        if(snapshot.val() != null)
        {
          var path:string = "clients/" + userid.toString();
          //Creates client object and inserts the new client into firebase.
          let clients = firebase.database().ref(path).push();
          clients.set ({
            'patName':patName,
            'refNum': refNum
          });
        //Reset the global variables
        this.refNum = ''
        this.patName=''
        //adds client to the display
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
  //Checks and makes sure the refernce number for adding a client is valid
  isValid(refNum) {
    if(refNum != "") {
      return true
    }
    else {
      alert("reference number not found")
    }
    return false
  }
  //Populates global display to show in HTML
  addDisp(refNumber) {
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
  //removes client from the list
  remove(id){
    var size = this.getSize(this.clients)
    //Goes through list of meds object and removes the meds
    for (var i = 0; i < size; i ++){
      if (this.clients[i] == this.clients [id]){
        delete this.clients[i]
        delete this.display[i]
      } 
    }
    this.display = this.display.filter(function (el) {
      return el != null;
    });
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
  //Add a recomendation to the datbase
  addRec(){
    var path:string = "Recs/";
    var ref = firebase.database().ref(path)
    ref.push(this.Rec)
    this.recClick()
    }
  //Toggle for adding a recomendation
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
    //loop through clients to grab status from firebase and grabs their information. 
    for(var i = 0; i < this.clients.length; i++)
    {
      var clientId = this.clients[i].refNum
      //Grabs client information from firebase
      var refs = firebase.database().ref('usertypes/' + clientId)
      refs.on('value', (snapshot) => {
        data.push(snapshot.val())
      })
      //Creates object and pushes to display variable to show on HTML
      if(data.length > 0 && data != null) {
        obj = {
          'patName':data[i].first_name,
          'refNum':this.clients[i].refNum,
          'status':data[i].status
        }
        this.display.push(obj)
      }
    }
    //This is for on refresh, creates object with timeout so everything loads and show it on HTML
    if(data.length == 0 && data != null) {
      setTimeout(() => {
       for (var j = 0; j < data.length; j++){
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
  //Loads the reccomendations from firebase. 
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
  //Removes reccomendation from the list and from firebase
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
