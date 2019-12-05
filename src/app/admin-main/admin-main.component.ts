import { Component, OnInit } from '@angular/core';
import { Router,Routes, RouterModule , ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  constructor(public router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
  }
  toTimeline(){
    this.router.navigate(["../timeline"])

  }
}
