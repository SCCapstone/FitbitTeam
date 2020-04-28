import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  logged = false
  constructor() { }

  ngOnInit() {
    //Logged is variable that shows loged in status 
    //False:Not logged in
    //True: Logged In
    if (firebase.auth().currentUser == null){
      console.log("NOT LOGGED IN")
      this.logged = false
    }
    else{
      console.log(firebase.auth().currentUser.uid)
      console.log("LOGGED IN")
      this.logged = true
    
    }  
  }
  

}
