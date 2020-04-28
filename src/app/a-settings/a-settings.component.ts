import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router,Routes, RouterModule , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-a-settings',
  templateUrl: './a-settings.component.html',
  styleUrls: ['./a-settings.component.css']
})
export class ASettingsComponent implements OnInit {
//Declaring Variables used in HTML or later in the type script
first = ''
last = ''
userid = ''
hasclicked=false
editName = false
type = ''
info:any
  constructor(public router: Router,private route: ActivatedRoute) { 
   }

  ngOnInit() {
    //Used for refresh and set the current user id
    if (firebase.auth().currentUser != null){
      this.userid = firebase.auth().currentUser.uid
    }
    else {
      this.userid = "";
      this.userid = localStorage.getItem("UID")
    }
    //if to make sure Userid is not null and if it is, rerun ngOnInit (should never run)
    if (this.userid != null){
      //grabs firtname, lastname
      this.getInfo()
    }
    else{
      setTimeout(() => {
        this.ngOnInit()
      }, 200);
    }
  }
  //logout from firebase and from your account
  logout(){
    //gets rid of log in token
    localStorage.clear()
    firebase.auth().signOut();
    this.router.navigate(["../login"])
    console.log(firebase.auth().currentUser.uid)
  }
  
  //This is used for the edit button to change first name and last name of a user
  SaveNew(){
    //Makes sure input values are not null. aka cannot put '' as a name
    if(this.isValid() == true){
      //Setting a global info object new varibles based on global variables and html input tags
      this.info.first_name = this.first
      this.info.last_name = this.last
      this.info.type = this.info.type
      //grabs userid from the global variable
      var usid = this.userid
      //sets a reference to a firebase location and sets the edited/updated information.
      var refs = firebase.database().ref('usertypes/' + usid);
      refs.set(this.info)
    }
    else{
      alert("Please input values in the first and last name input tags")
    }
  }
  //Makes sure inputed values for first name and last name are not blank. 
  isValid(){
    if(this.first != '' && this.last != ''){
      return true;
    }
      return false
  }
  //Used for *ngIf making certain tags visible or invisible, it is a toggle
  clicked(){
    this.first= ''
    this.last = ''
    this.hasclicked= !this.hasclicked;
  }
  //Grabs information about an user from firebase
  getInfo(){
    var refs = firebase.database().ref('usertypes/' + this.userid);
    refs.on('value', (snapshot) => {
      this.info = snapshot.val();
    })
    if(this.info != null){
      this.first = this.info.first_name
      this.last = this.info.last_name
      this.type = this.info.type
    }
    else{
      setTimeout(() => {
        this.getInfo()
      }, 100);
    }
  }
}