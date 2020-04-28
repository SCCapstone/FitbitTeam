import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router,Routes, RouterModule , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-a-settings',
  templateUrl: './a-settings.component.html',
  styleUrls: ['./a-settings.component.css']
})
export class ASettingsComponent implements OnInit {
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
    if (firebase.auth().currentUser != null){
      this.userid = firebase.auth().currentUser.uid
    }
    else {
    this.userid = "";
    this.userid = localStorage.getItem("UID")
  }
  if (this.userid != null){
   this.getInfo()
  }
  else{
    setTimeout(() => {
      this.ngOnInit()
    }, 200);
  }
   
  }

  logout(){
    firebase.auth().signOut();
    this.router.navigate(["../login"])
    console.log(firebase.auth().currentUser.uid)
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
  isValid(){
    if(this.first != '' && this.last != ''){
      return true;
    }
    return false

  }
  
  clicked(){
    this.first= ''
    this.last = ''
    this.hasclicked= !this.hasclicked;
    console.log(this.hasclicked)
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
}