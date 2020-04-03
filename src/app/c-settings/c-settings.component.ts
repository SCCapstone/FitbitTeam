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
  fitbitToken = ''
  tokenParsed:String;
  tokenLength:any
  fitbitId = ''
  fitbitInfo:any
  constructor(public router: Router,private route: ActivatedRoute) {
   }

  ngOnInit() {
    //Grabbing First and Last name from firebase
    this.userid = firebase.auth().currentUser.uid;
    console.log("User ID: "+ this.userid)
    var usid = firebase.auth().currentUser.uid;
    var refs = firebase.database().ref('usertypes/' + usid);
    var fref = firebase.database().ref('fitbitInfo/' + usid );

    refs.on('value', (snapshot) => {
      this.info = snapshot.val();
    })
    this.first = this.info.first_name
    this.last = this.info.last_name
    this.type = this.info.type
    
    //grabbing fitbit data from firebase
    fref.on('value', (snapshot) => {
      this.fitbitInfo = snapshot.val();
    });
    var tempArray = Object.keys(this.fitbitInfo).map((key)=> {
      return [Number(key), this.fitbitInfo[key]];
    });
    this.fitbitToken = tempArray[1][1].token
    this.fitbitId = tempArray[1][1].id
    //function parses the very long token to the XXXX.XXXX first 4 and last 4 characters to easily display/diagnose
    if (this.fitbitToken != '') {
      this.tokenParsed = this.fitbitToken.toString();
      this.tokenLength = this.fitbitToken.length;
      this.tokenParsed = this.tokenParsed.substr(0, 4) + "." + this.tokenParsed.substr(this.tokenLength -4); //last 4 
    }
    // If user is logged into FitBit, we want to tell them.
    if(this.fitbitInfo != ''){
      this.connection = 'Connected to fitbit account'
      console.log("CONNECTED")
    }
   console.log("FitBit Token: " + this.fitbitToken)
   console.log("FitBit ID: " + this.fitbitId)
   
  }

  logout(){
    firebase.auth().signOut();
    this.router.navigate(["../login"])
    console.log(firebase.auth().currentUser.uid)
  }


  /*
  Function Purpose: redirect user when 'Login with Fitbit' button is clicked to authenticate
  All parameters for this function are found directly on fitbit api dev website under app settings. You can change redirect link here for after user authenticates. 
  */
  redirect() {
    let url = 'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22B9QJ&redirect_uri=https%3A%2F%2Ffitbittesterv2.herokuapp.com%2F&scope=weight&expires_in=604800'
    window.open(url)
  }
  /* This function is used as a button on c-settings to allow
  the user to revoke access from FitBit. 
  */
  revokeAccess(){
    //creating AJAX POST for revoking access from Fitbit API Authorization server
    /*
    If you are getting a 401 error, it is because the token passed is invalid. This is typically because it expired, so the user must 
    reauthenticate with FitBit to pass a valid token to Firebase that we can use for this command. Look into the xhr console log
    */
    var params = "token=" + this.fitbitToken;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.fitbit.com/oauth2/revoke');
    // this long basic is our client ID and secret encoded in base 64 with a : delimitting the two. clientID:clientSecret=
    xhr.setRequestHeader("Authorization", 'Basic MjJCOVFKOmIyMzgxMzlmOWI3NzE0MjA0YTg1MzZlMTlmNmUyYzMx=');
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    console.log(xhr);
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("SUCCESS")
            console.log(xhr.responseText)
        }
    };
    xhr.send(params);
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
