import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router,Routes, RouterModule , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-expand-md fixed-top navbar-dark navbar-default @navbar-height 200px">
        <a routerLink="../home" href="../home" class="navbar-brand nav-link" >
            <img src="../../assets/favicon.png" alt="FitBitTeamLogo" style="width:40px;height:40px;">FitBitTeam</a>
        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav" >
                <a *ngIf = "logged && !clientOrAdmin" routerLink="../cmain" class="nav-item nav-link"><font color="white">Timeline</font></a>
                <a *ngIf = "logged && clientOrAdmin" routerLink="../admin" class="nav-item nav-link"><font color="white">Admin</font></a>
                <a routerLink="../about" class="nav-item nav-link"><font color="white">About</font></a>
                <a routerLink="../help" class="nav-item nav-link"><font color="white">Help</font></a>
                <a routerLink="../contact" class="nav-item nav-link"><font color="white">Contact</font></a>
            </div>
            <div *ngIf = "logged" class="navbar-nav ml-auto">
                <font color="white">Welcome, {{userName}}</font>
            </div>
            <div *ngIf = "logged && !clientOrAdmin" class="navbar-nav ml-auto">
                <a routerLink="../settings" class="nav-item nav-link"><font color="white">Settings</font></a>
                <a (click)="logout()" class="nav-item nav-link"><font color="white">Logout</font></a>
            </div>
            <div *ngIf = "logged && clientOrAdmin" class="navbar-nav ml-auto">
            <a routerLink="../asettings" class="nav-item nav-link"><font color="white">Settings</font></a>
            <a routerLink="" (click)="logout()" class="nav-item nav-link"><font color="white">Logout</font></a>
        </div>
            <div *ngIf = "!logged" class="navbar-nav ml-auto">
            <a routerLink="../login" class="nav-item nav-link"><font color="white">Login</font></a>
        </div>
        </div>
    </nav>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    logged = false;
    clientOrAdmin = true;
    userName = '';
    userType = '';
  constructor(public router: Router,private route: ActivatedRoute) {
    this.userName = localStorage.getItem("userName");
    if(localStorage.getItem("UID") != null) {
        this.logged = true;
        this.userName = localStorage.getItem("userName")
        this.userType = localStorage.getItem("type")
        if(this.userType === 'Admin') {
            this.clientOrAdmin = true;
        }
        if(this.userType === 'Client') {
            this.clientOrAdmin = false;
        }
    }
  }
  ngOnInit() {

  }
  logout(){
    firebase.auth().signOut();
    localStorage.clear()
    this.router.navigate(["../login"])
    this.logged = false;
  }
}