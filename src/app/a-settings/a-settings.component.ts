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
hasclicked=false
editName = false

info:any
  constructor(public router: Router,private route: ActivatedRoute) {
    var userid = firebase.auth().currentUser.uid;
    console.log(userid)
   }

  ngOnInit() {
    var usid = firebase.auth().currentUser.uid;
    var refs = firebase.database().ref('usertypes/' + usid);

    refs.on('value', (snapshot) => {
      this.info = snapshot.val();
    })
    this.first = this.info.first_name
    this.last = this.info.last_name
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
}