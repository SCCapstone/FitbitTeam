import { Component, OnInit } from '@angular/core';
import { Router,Routes, RouterModule , ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
  })
  export class NavMenuComponent implements OnInit {
    userName = ''
    type = ''
    userid = ''
    loginStatus:boolean
    typeBool:boolean

    /* currently: UID is grabbed from login, Name, is grabbed from login redirect to cmain.  we set these values to access in local storage*/

    constructor(public router: Router,private route: ActivatedRoute) {
      console.log("nav component loaded")
      /* We need these values to present the right data to the navbar */
      /* userName, type are set in login redirect to cmain(ngOnInit:getInfo())
         userId, set in login auth */
      //check to see if user is logged in or not
      if (localStorage.getItem("userid") == null) {
        this.loginStatus = false
      }
      else {
        this.loginStatus = true
        this.userName = localStorage.getItem("userName")
        this.type = localStorage.getItem("type")
        if (this.type = "Admin") {
          this.typeBool = false
        } else { this.typeBool = true}
      }
    }

    ngOnInit(
    ) {

    }
    onLogout()
    {
      firebase.auth().signOut();
      this.router.navigate(["../home"])
      localStorage.clear()
      console.log(firebase.auth().currentUser.uid)
    }

}