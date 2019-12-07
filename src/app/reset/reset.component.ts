import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component'

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  currentPw = ''
  newPw1 = ''
  newPw2 = ''
  constructor() { }

  ngOnInit() {
  }

}