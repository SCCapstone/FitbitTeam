import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  fitbitInfo:any
  fitbitID = ''
  fitbitToken = ''
  info:any
  first = ''
  constructor() { }

  ngOnInit() {
    var x = document.getElementById("myChartDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  var usid = firebase.auth().currentUser.uid;
  var ref = firebase.database().ref('usertypes/' + usid );
  ref.on('value', (snapshot) => {
    this.info = snapshot.val();
    console.log(this.info)
  });
  this.first = this.info.first_name

  var refs = firebase.database().ref('fitbitInfo/' + usid );
  refs.on('value', (snapshot) => {
     var tmeds= snapshot.val();
     this.fitbitInfo = Object.keys(tmeds).map(i => tmeds[i]);
     console.log(this.fitbitInfo)
      this.fitbitID = this.fitbitInfo[0].id
      this.fitbitToken = this.fitbitInfo[0].token
   
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://api.fitbit.com/1/user/' + this.fitbitID + '/body/log/weight/date/today/1w.json');
      xhr.setRequestHeader("Authorization", 'Bearer ' + this.fitbitToken);
      xhr.onload = function () {
        if (xhr.status === 200) {
          if (xhr.responseText != ' ') {
            var data = xhr.responseText;
            console.log(data)
          }
          console.log(data)
          var path:string = "fitbitData/" + usid.toString();
          let fitbitData = firebase.database().ref(path).push();
          fitbitData.set ({
            'data': data,
          });
        }
    };
  })

  
    
    


  }
  toggle() {
    var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  var y = document.getElementById("myChartDIV");
  if (y.style.display === "none") {
    y.style.display = "block";
  } else {
    y.style.display = "none";
  }
  }
}
