import { Component, OnInit } from '@angular/core';
import { Router,Routes, RouterModule , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  template: `
  <hr/>
  <p>© 2020 - FitBitTeam | <a routerLink="../about">Terms of Service & Privacy Policy</a></p>
  `,
  styles: []
})
export class FooterComponent implements OnInit {
  constructor(public router: Router,private route: ActivatedRoute) {

  }
  ngOnInit() {
      
  }
}