import { Component, OnInit } from '@angular/core';
import { Router,Routes, RouterModule, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  togStart() {
    var x = document.getElementById("GetStarted");
    var y = document.getElementById("Account");
    var z = document.getElementById("Connect");
      x.style.display = "block";
      y.style.display = "none";
      z.style.display = "none";
    
  }
  togAccount() {
    var x = document.getElementById("GetStarted");
    var y = document.getElementById("Account");
    var z = document.getElementById("Connect");
      x.style.display = "none";
      y.style.display = "block";
      z.style.display = "none";
    
  }
  togConnect() {
    var x = document.getElementById("GetStarted");
    var y = document.getElementById("Account");
    var z = document.getElementById("Connect");
      x.style.display = "none";
      y.style.display = "none";
      z.style.display = "block";
    
  }
  

}
