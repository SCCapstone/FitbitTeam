import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router,Routes, RouterModule , ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-c-settings',
  templateUrl: './c-settings.component.html',
  styleUrls: ['./c-settings.component.css']
})
export class CSettingsComponent implements OnInit {
  userid = ''
  first = ''
  last = ''
  editName = false
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
    this.userid = firebase.auth().currentUser.uid
  
    //Grabbing First and Last name from firebase
    console.log("User ID: "+ this.userid)
    var usid = this.userid;
    console.log("RUNNING GETINFO")
    this.getInfo()
    console.log("FIRST NAME: "+this.first)

    //grabbing fitbit data from firebase
    var fitbitInfo:any
    var fref = firebase.database().ref('fitbitInfo/' + usid );
    fref.on('value', (snapshot) => {
      console.log("RUNNING getFitbitInfo")
      fitbitInfo = snapshot.val();
   });
   if(fitbitInfo == null){
    setTimeout(() => {
      console.log("RUNNING helpInfo with timout")
      this.helpInfo(fitbitInfo)
    }, 500);
   }
   else{
    console.log("RUNNING helpInfo without timeout")
    this.helpInfo(fitbitInfo)
   }
    // If user is logged into FitBit, we want to tell them.
    if(this.fitbitInfo != ''){
      this.connection = 'Connected to fitbit account'
    }
  } 

  helpInfo(obj1){
    if(obj1 != null){
      var ar = Object.values(obj1)
      this.fitbitId = ar[0]
      this.fitbitToken= ar[1]
      //function parses the very long token to the XXXX.XXXX first 4 and last 4 characters to easily display/diagnose
      if (this.fitbitToken != '') {
        this.tokenParsed = this.fitbitToken.toString();
        this.tokenLength = this.fitbitToken.length;
        this.tokenParsed = this.tokenParsed.substr(0, 4) + "." + this.tokenParsed.substr(this.tokenLength -4); //last 4 
      }
      else{
        setTimeout(() => {
          this.helpInfo(obj1)
        }, 100);
      }
    }
  
  }
  isValid(){
    if(this.first != '' && this.last != ''){
      return true;
    }
    return false

  }

  getInfo(){
    var refs = firebase.database().ref('usertypes/' + this.userid);
    refs.on('value', (snapshot) => {
      this.info = snapshot.val();
    })
    if(this.info != null){
      this.first = this.info.first_name
      this.last = this.info.last_name
      this.type = this.info.type
    }else{
      setTimeout(() => {
        console.log("RUNNING getInfo Recursion")
        this.getInfo()
      }, 100);
     
    }
      
  }


  logout(){
    firebase.auth().signOut();
    this.router.navigate(["../login"])
    localStorage.clear()
    console.log(firebase.auth().currentUser.uid)
  }


  /*
  Function Purpose: redirect user when 'Login with Fitbit' button is clicked to authenticate
  All parameters for this function are found directly on fitbit api dev website under app settings. You can change redirect link here for after user authenticates. 
  */
  redirectFitbit() {
    console.log(this.fitbitToken)
    if (this.fitbitToken = null || this.fitbitToken == undefined) {
      let url = 'https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22B9QJ&redirect_uri=https%3A%2F%2Ffitbittesterv2.herokuapp.com%2Flogin&scope=weight&expires_in=604800'
      window.open(url)
    } else {
      alert("User is already authenticated with FitBit!" +
      "\nCheck your application settings at: "+
      "\nfitbit.com/settings/applications"+
      "\nApp is: Capstone490")
    }
  }
  redirectAmazon() {
    alert("Function not working yet!")
    return 0;
    // console.log("logging in with amazon")
    //   window.onAmazonLoginReady = function() {
    //     amazon.Login.setClientId('amzn1.application-oa2-client.944b2e2126854b468271e6ed0f7421ca');
    //   };
    //   (function(d) {
    //     var a = d.createElement('script'); a.type = 'text/javascript';
    //     a.async = true; a.id = 'amazon-login-sdk';
    //     a.src = 'https://assets/loginwihtamazon.com/sdk/na/login1.js';
    //     d.getElementById('amazon-root').appendChild(a);
    //   })(document);
  }

  redirectAlexaSkill() {
    alert("Function not working yet!")
    return 0;
    let url = 'https://pitangui.amazon.com/api/skill/link/M36BFXKAHFCNJM'
    window.open(url);
  }
  /* This function is used as a button on c-settings to allow
  the user to revoke access from FitBit. 
  */
  revokeAccessFitbit(){
    //creating AJAX POST for revoking access from Fitbit API Authorization server
    /*
    If you are getting a 401 error, it is because the token passed is invalid. This is typically because it expired, so the user must 
    reauthenticate with FitBit to pass a valid token to Firebase that we can use for this command. Look into the xhr console log

    If 400 error, no token exists and it becomes an invalid request. Make sure it is pulling correctly from firebase.
    */
    if (this.fitbitToken != null) {
      var params = "token=" + this.fitbitToken;
      var xhr = new XMLHttpRequest();
      //Download progress
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
      alert("Token is invalid!")
      //location.reload(true);
    }
  }
  revokeAccessAlexa() {

  }

  clicked(){
    this.first= ''
    this.last = ''
    this.hasclicked= !this.hasclicked;
    console.log(this.hasclicked)
  }

  SaveNew(){
    if(this.isValid() == true){
      this.info.first_name = this.first
      this.info.last_name = this.last
      this.info.type = this.info.type
      var usid = firebase.auth().currentUser.uid;
      var refs = firebase.database().ref('usertypes/' + usid);
      console.log(this.info)
      refs.set(this.info)
    }else{
      alert("Please input values in the first and last name input tags")
    }
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
