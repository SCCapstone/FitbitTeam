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
  fitbitToken:any
  tokenParsed:String;
  tokenLength:any
  fitbitId:any
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
    var fitbitInfo:any
    fref.on('value', (snapshot) => {
      fitbitInfo = snapshot.val();
   });
   setTimeout(() => {
     var ar = Object.values(fitbitInfo)
    this.fitbitId = ar[0]
    this.fitbitToken= ar[1]
    //function parses the very long token to the XXXX.XXXX first 4 and last 4 characters to easily display/diagnose
    if (this.fitbitToken != '') {
      this.tokenParsed = this.fitbitToken.toString();
      this.tokenLength = this.fitbitToken.length;
      this.tokenParsed = this.tokenParsed.substr(0, 4) + "." + this.tokenParsed.substr(this.tokenLength -4); //last 4 
    }
  }, 200);
    // If user is logged into FitBit, we want to tell them.
    if(this.fitbitInfo != ''){
      this.connection = 'Connected to fitbit account'
      console.log("CONNECTED")
    }
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
    console.log(this.fitbitToken)
    if (this.fitbitToken = null || this.fitbitToken == undefined) {
      let url = 'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22B9QJ&redirect_uri=https%3A%2F%2Ffitbittesterv2.herokuapp.com%2F&scope=weight&expires_in=604800'
      window.open(url)
    } else {
      alert("User is already authenticated with FitBit!" +
      "\nCheck your application settings at: "+
      "\nfitbit.com/settings/applications"+
      "\nApp is: Capstone490")
    }
  }
  /* This function is used as a button on c-settings to allow
  the user to revoke access from FitBit. 
  */
  revokeAccess(){
    //creating AJAX POST for revoking access from Fitbit API Authorization server
    /*
    If you are getting a 401 error, it is because the token passed is invalid. This is typically because it expired, so the user must 
    reauthenticate with FitBit to pass a valid token to Firebase that we can use for this command. Look into the xhr console log

    If 400 error, no token exists and it becomes an invalid request. Make sure it is pulling correctly from firebase.
    */
    if (this.fitbitToken != null) {
      var params = "token=" + this.fitbitToken;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://api.fitbit.com/oauth2/revoke');
      // this long basic is our client ID and secret encoded in base 64 with a : delimitting the two. clientID:clientSecret=
      xhr.setRequestHeader("Authorization", 'Basic MjJCOVFKOmIyMzgxMzlmOWI3NzE0MjA0YTg1MzZlMTlmNmUyYzMx=');
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      console.log(xhr);
      xhr.onload = function () {
          if (xhr.status === 200) {
              console.log("Token Revoked")
              console.log(xhr.responseText)
          }
      };
      xhr.send(params);
      // remove the token from firebase
      let userid = firebase.auth().currentUser.uid;
      var path:string = "fitbitInfo/" + userid.toString();
      let fitbitRef = firebase.database().ref(path);
      fitbitRef.remove();
      this.fitbitId = null;
      this.fitbitToken = null;
    } else {
      this.fitbitToken = null;
      alert("Token is invalid! Refreshing page.")
      location.reload(true);
    }
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
