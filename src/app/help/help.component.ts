import { Component, OnInit } from '@angular/core';
import { Router,Routes, RouterModule, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  logged = false
  constructor() { }

  ngOnInit() {
    //checks if logged in or not
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
  togStart() {
    //Toggles to tab 1
    var x = document.getElementById("GetStarted");
    var y = document.getElementById("Account");
    var z = document.getElementById("Connect");
    var t1 = document.getElementById("1");
    var t2 = document.getElementById("2");
    var t3 = document.getElementById("3");

      t1.classList.add('active');
      t2.classList.remove('active');
      t3.classList.remove('active');

      x.style.display = "block";
      y.style.display = "none";
      z.style.display = "none";
    
  }
  togAccount() {
        //Toggles to tab 2
    var x = document.getElementById("GetStarted");
    var y = document.getElementById("Account");
    var z = document.getElementById("Connect");
    var t1 = document.getElementById("1");
    var t2 = document.getElementById("2");
    var t3 = document.getElementById("3");

      t1.classList.remove('active');
      t2.classList.add('active');
      t3.classList.remove('active');

      x.style.display = "none";
      y.style.display = "block";
      z.style.display = "none";
    
  }
  togConnect() {
        //Toggles to tab 3
    var x = document.getElementById("GetStarted");
    var y = document.getElementById("Account");
    var z = document.getElementById("Connect");
    var t1 = document.getElementById("1");
    var t2 = document.getElementById("2");
    var t3 = document.getElementById("3");

      t1.classList.remove('active');
      t2.classList.remove('active');
      t3.classList.add('active');

      x.style.display = "none";
      y.style.display = "none";
      z.style.display = "block";
    
  }
  

}
