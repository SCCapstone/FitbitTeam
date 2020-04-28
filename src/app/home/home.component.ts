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
    //checks if the user is logged in or not
    if (firebase.auth().currentUser == null){
      this.logged = false
    }
    else{

      this.logged = true
    
    }  
  }

}
