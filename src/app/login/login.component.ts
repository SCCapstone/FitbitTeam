import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminMainComponent } from '../admin-main/admin-main.component';
import { Router,Routes, RouterModule , ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = 'test@email.com';
  password = '123456';
  uid = ''
  constructor(public router: Router,private route: ActivatedRoute) { }
  type:any;
  ngOnInit() {
  }

  login(){
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
      
        // FITBIT INITIALIZATION AFTER REDIRECT
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
          let fitbitInfo = firebase.database().ref(path).push();
          if (access_token != '' && fitbitId != ''){
            fitbitInfo.set ({
              'token': access_token,
              'id': fitbitId
            });
          } else{
            fitbitInfo.set({
              'token': "ERROR",
              'id': "ERROR"
            });
          }
          //end firebase input
        }
      }
        // END FITBIT INITIALIZATION

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
  cmain(){
    this.router.navigate(["../cmain"])
  }
  
  admin(){
    this.router.navigate(["../admin"])
  }
}
