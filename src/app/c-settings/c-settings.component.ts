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
  connection = 'User is not connected'
  token = ''
  fitbit:any
  constructor(public router: Router,private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.userid = firebase.auth().currentUser.uid;
    console.log(this.userid)
    var usid = firebase.auth().currentUser.uid;
    var refs = firebase.database().ref('usertypes/' + usid);
    var dref = firebase.database().ref('fitbitInfo/' + usid );
    refs.on('value', (snapshot) => {
      this.info = snapshot.val();
    })
    this.first = this.info.first_name
    this.last = this.info.last_name
    this.type = this.info.type
    
    dref.on('value', (snapshot) => {
      this.fitbit = snapshot.val();
    })
   if(this.fitbit != ''){
     this.connection = 'Connected to fitbit account'
    console.log("CONNECTED")
   }
   
   console.log(this.token)
   
  }

  logout(){
    firebase.auth().signOut();
    this.router.navigate(["../login"])
    console.log(firebase.auth().currentUser.uid)
  }
  /* This function is used as a button on c-settings to allow
  the user to revoke access from FitBit. 
  */
  revokeAccess(){
    //grabbing fitbit token from firebase
    var fitbitInfo:any
    var fitbitToken:any
    var fitbitId:any
    var userid = firebase.auth().currentUser.uid;
    var path:string = ("fitbitInfo/" + userid.toString());
    var fitbitRefs = firebase.database().ref(path); 
    fitbitRefs.on('value', (snapshot) => {
      fitbitInfo = snapshot.val();
    });
    var tempArray = Object.keys(fitbitInfo).map((key)=> {
      return [Number(key), fitbitInfo[key]];
    });
    fitbitToken = tempArray[1][1].token
    fitbitId = tempArray[1][1].id
    //creating AJAX POST for revoking access from Fitbit API Authorization server
    var params = "token=" + fitbitToken;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.fitbit.com/oauth2/revoke');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //xhr.setRequestHeader("Authorization", 'Basic MjJCOVFKOmIyMzgxMzlmOWI3NzE0MjA0YTg1MzZlMTlmNmUyYzMx', true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(xhr.responseText)
        }
    };
    xhr.send(params);
  }
  /*This function will check in ngOnInit to see if the user is already
  logged in. If they are, it will present the revokeAccess button instead
  of the login to fitbit button.
  */
  fitbitLogged(){

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
