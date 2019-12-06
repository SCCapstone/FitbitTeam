import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router,Routes, RouterModule , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-c-settings',
  templateUrl: './c-settings.component.html',
  styleUrls: ['./c-settings.component.css']
})
export class CSettingsComponent implements OnInit {
  first = ''
  last = ''
  userid = 'test'
  hasclicked=false
  info:any
  dname = ''
  dnum = ''
  devices:any
  constructor(public router: Router,private route: ActivatedRoute) {
   
   }

  ngOnInit() {
    this.userid = firebase.auth().currentUser.uid;
    console.log(this.userid)
    var usid = firebase.auth().currentUser.uid;
    
    var refs = firebase.database().ref('usertypes/' + usid);
    var dref = firebase.database().ref('devices/' + usid );

    refs.on('value', (snapshot) => {
      this.info = snapshot.val();
    })
    this.first = this.info.first_name
    this.last = this.info.last_name

    dref.on('value', (snapshot) => {
      var tmeds = snapshot.val();
      this.devices = Object.keys(tmeds).map(i => tmeds[i]);
      console.log(this.devices)
    })


  }

  add(){
    var userid = firebase.auth().currentUser.uid;
    var path:string = "devices/" + userid.toString();
    let device = firebase.database().ref(path).push();
    if(this.dname != '' && this.dnum != ''){
      device.set ({
        'name': this.dname,
        'serialnumber': this.dnum
      }); 
    }
    else{
      device.set({
        'name': "ERROR",
        'serialnumber': 'ERROR'
      });
    }
  this.clicked();
  }

  edit(){

  }

  logout(){
    firebase.auth().signOut();
    this.router.navigate(["../login"])
    console.log(firebase.auth().currentUser.uid)
  }
  clicked(){
    this.hasclicked= !this.hasclicked;
    console.log(this.hasclicked)
  }

}
