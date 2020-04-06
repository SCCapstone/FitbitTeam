import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminMainComponent } from '../admin-main/admin-main.component';
import { Router,Routes, RouterModule , ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  uid = ''
  constructor(public router: Router,private route: ActivatedRoute) { }
  type:any;
  ngOnInit() {
    this.enter()
    // Cannot put fitbit pull here as we append everything to the current logged in user.
  }

  onKeydown(event) {
    this.login();
  }
/*
  login(){
    var login = true;
    const email = this.email;
    const password = this.password;
    const self = this;
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
   
    return firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
       login = false;
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else if (errorCode === 'auth/user-not-found'){
        alert("User does not exist");
      } else {
        alert(errorMessage);
      }
      })
      .then(function(result){
        //console.log(login)
        let userid = firebase.auth().currentUser.uid;
  //CALL FITBIT PULL
        // if (window.location.href != ' ') {
        //   var url = window.location.href;
        //   console.log(url)
        //   if (url.split('#')[1] != undefined) {
        //     // Make sure it is a redirect before calling method!
        //     // console.log("Calling getFitbitInfo");
        //     // this.getFitbitInfo();
        //   }
        // }
  if (window.location.href != ' ') {
    //link not empty
    var url = window.location.href;
    if (url.split('#')[1] != undefined) {
      // this means link contains #, meaning it is after redirect so we are good to grab token and id, and do requests
      // gets access_token
      var access_token = url.split('#')[1].split("=")[1].split("&")[0];
      // gets the userId
      var fitbitId = url.split("#")[1].split("=")[2].split("&")[0];
      console.log("Fitbit Token: " + access_token);
      console.log("Fitbit ID: " + fitbitId);

      // push fitbit info to firebase
      var path:string = "fitbitInfo/" + userid.toString();
      let fitbitRef = firebase.database().ref(path);
      fitbitRef.remove();
      fitbitRef.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
          console.log(child.key+": "+child.val());
        });
      });
      if (access_token != '' && fitbitId != ''){
        fitbitRef.set ({
          'token': access_token,
          'id': fitbitId
        });
      } else{
        fitbitRef.set({
          'token': "ERROR",
          'id': "ERROR"
        });
      }
      fitbitRef.push();
      //end firebase input
    }
  }
        //let userid = firebase.auth().currentUser.uid;
        let usertypesRef = firebase.database().ref('usertypes/');
        usertypesRef.orderByChild("uid").equalTo(userid).on("value",function(data){
        data.forEach(function(thing){
          if(login ==true){
            if (thing.val().type == "Admin"){
              self.admin();
            }
            else{
              self.cmain();
            }
          }
        })
        });
      }); //end result
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  }
*/


  login(){
    localStorage.clear()
    var login = true;
    const email = this.email;
    const password = this.password;
    const self = this;
    
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      login = false;
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else if (errorCode === 'auth/user-not-found'){
        alert("User does not exist");
      } else {
        alert(errorMessage);
      }
      })
      .then(function(result){
        //console.log(login)
        let userid = firebase.auth().currentUser.uid;
        localStorage.setItem('UID', userid)
  //CALL FITBIT PULL
        // if (window.location.href != ' ') {
        //   var url = window.location.href;
        //   console.log(url)
        //   if (url.split('#')[1] != undefined) {
        //     // Make sure it is a redirect before calling method!
        //     // console.log("Calling getFitbitInfo");
        //     // this.getFitbitInfo();
        //   }
        // }
  if (window.location.href != ' ') {
    //link not empty
    var url = window.location.href;
    if (url.split('#')[1] != undefined) {
      // this means link contains #, meaning it is after redirect so we are good to grab token and id, and do requests
      // gets access_token
      var access_token = url.split('#')[1].split("=")[1].split("&")[0];
      // gets the userId
      var fitbitId = url.split("#")[1].split("=")[2].split("&")[0];
      console.log("Fitbit Token: " + access_token);
      console.log("Fitbit ID: " + fitbitId);

      // push fitbit info to firebase
      var path:string = "fitbitInfo/" + userid.toString();
      let fitbitRef = firebase.database().ref(path);
      fitbitRef.remove();
      fitbitRef.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
          console.log(child.key+": "+child.val());
        });
      });
      if (access_token != '' && fitbitId != ''){
        fitbitRef.set ({
          'token': access_token,
          'id': fitbitId
        });
      } else{
        fitbitRef.set({
          'token': "ERROR",
          'id': "ERROR"
        });
      }
      fitbitRef.push();
      //end firebase input
    }
  }
        //let userid = firebase.auth().currentUser.uid;
        let usertypesRef = firebase.database().ref('usertypes/');
        usertypesRef.orderByChild("uid").equalTo(userid).on("value",function(data){
        data.forEach(function(thing){
          if(login ==true){
            if (thing.val().type == "Admin"){
              self.admin();
            }
            else{
              self.cmain();
            }
          }
        })
        });
      }); //end result
  }


  //function allows user to hit 'Enter' on keyboard = 13 to login
  enter() {
    var input = document.getElementById('InputPassword');
    input.addEventListener('keyup', function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("loginButton").click();
      }
    });
  }


  /*
  This function checks the URl to see if it contains information after the 'Login with fitbit' redirect
  If it does, it will parse this data and upload to firebase AS LONG AS it is not already saved. 

  Tokens ARE different each time they are assigned, if it is a new token it will delete the rest from firebase
  but IF the token is the same it will do nothing.
  */
  getFitbitInfo() {
    console.log("in method")
    var url = window.location.href;
    // gets access_token
    console.log("splitting url")
    var access_token = url.split('#')[1].split("=")[1].split("&")[0];
    // gets the userId
    var fitbitId = url.split("#")[1].split("=")[2].split("&")[0];
    console.log("Fitbit Token: " + access_token);
    console.log("Fitbit ID: " + fitbitId);     
        
    let userid = firebase.auth().currentUser.uid;
    var path:string = "fitbitInfo/" + userid.toString();
    let fitbitRef = firebase.database().ref(path);
    // deletes any existing tokens
    fitbitRef.remove();
    // fitbitRef.once("value", function(snapshot) {
    //   snapshot.forEach(function(child) {
    //     console.log(child.key+": "+child.val());
    //   });
    // });
    //push to firebase
    if (access_token != '' && fitbitId != ''){
      fitbitRef.set ({
        'token': access_token,
        'id': fitbitId
      });
    } else {
      fitbitRef.set({
        'token': "ERROR",
        'id': "ERROR"
      });
    }
    fitbitRef.push();
  // END FITBIT INITIALIZATION
  }

  cmain(){
    this.router.navigate(["../cmain"])
  }
  
  admin(){
    this.router.navigate(["../admin"])
  }
}
