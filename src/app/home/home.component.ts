import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  logged = false
  constructor() { }

  ngOnInit() {
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
