import { Component, OnInit } from '@angular/core';
import { Router,Routes, RouterModule , ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-cmain',
  templateUrl: './cmain.component.html',
  styleUrls: ['./cmain.component.css']
})
export class CmainComponent implements OnInit {

  constructor(public router: Router,private route: ActivatedRoute) {
    var userid = firebase.auth().currentUser.uid;
    console.log(userid)

   }

  ngOnInit() {
  }
  
  toTimeline(){
    this.router.navigate(["../timeline"])

  }
}
