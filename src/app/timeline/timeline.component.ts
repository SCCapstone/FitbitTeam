import { Component, OnInit } from '@angular/core';
import { Router,Routes, RouterModule , ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import * as CanvasJS from '../canvasjs.min.js';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { templateJitUrl } from '@angular/compiler';

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
  Entries:any
  table = false;
  status = ''
  clientRef= ''
  constructor(public router: Router,private route: ActivatedRoute) { 
    if (this.router.getCurrentNavigation().extras.state != undefined) {
    console.log(this.router.getCurrentNavigation().extras.state.example); // should log client id
    this.clientRef = this.router.getCurrentNavigation().extras.state.example
    }
  }

  ngOnInit() {
    
    var usid
    if (this.clientRef != ''){
      usid = this.clientRef;
    } else {
    usid = firebase.auth().currentUser.uid;
    }
    this.getInfo()
    this.status = this.getStatus()

    var z = document.getElementById("myChartDIV");
    if (z.style.display === "none") {
      z.style.display = "block";
    } else {
      z.style.display = "none";
    }
  
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
  this.GenerateChart()
  this.Entries = this.GetEntries()
  console.log( this.Entries)
  }
  getTypeInfo(){
    //Get Info of Current User
    var usid = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref('usertypes/' + usid );
    ref.on('value', (snapshot) => {
      this.info = snapshot.val();
      console.log(this.info)
    });
    this.first = this.info.first_name
  }
  getInfo(){
    //Get Info of Current client
    var usid
    if (this.clientRef != ''){
      usid = this.clientRef;
    } else {
    usid = firebase.auth().currentUser.uid;
    }
    var ref = firebase.database().ref('usertypes/' + usid );
    ref.on('value', (snapshot) => {
      this.info = snapshot.val();
      console.log(this.info)
    });
    this.first = this.info.first_name
  }

  GenerateChart(){
    var myArray = this.FitbitDataFromFirebase();
    var y = 0;
    var x = '';
    var dataPoints = [];
    for (var i = 0 ; i < myArray[0].length; i++) {
      y = myArray[1][i];
      x = myArray[0][i];
      dataPoints.push({
        x: new Date(x),
        y: y                
        });
        //console.log(x);
        //console.log(y);
        //console.log(dataPoints);
    }
      console.log(dataPoints);
      let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
	      zoomEnabled: true,
        theme: "light2",
        title:{
          text: "Detailed Zoom/Pan Graph"
        },
        axisX:{
          title : "Last 30 Days"
         },
        axisY:{
          title : "Pounds (lbs)",
          includeZero: false
        },
        data:[{        
          type: "line",       
          dataPoints: dataPoints
        }]
      });
      chart.render();
  }


  FitbitDataFromFirebase(){
    var tdata:any
    var usid
    if (this.clientRef != ''){
      usid = this.clientRef;
    } else {
    usid = firebase.auth().currentUser.uid;
    }
    var path:string = "fitbitData/" + usid
    var ref = firebase.database().ref(path)
    ref.on('value', (snapshot) => {
      tdata = snapshot.val();
    })
    //console.log(tdata)
    var ar = Object.values(tdata)
    //console.log(ar)
    var date = []
    var weight = []
    var time = []
    var size = this.getSize(ar[0])
    //console.log(size)
    for (var i = 0; i < size; i++){
      //console.log(ar[0][i])
      var temp = Object.values(ar[0][i])
      var x = +temp[2];
      //console.log(temp[0])
      date.push(temp[0]) 
      weight.push(Math.round((x * 2.20462) * 100) / 100)
      time.push(temp[1])
    }
    //console.log(date)
    //console.log(weight)
    weight = this.toNum(weight)
    console.log(weight)
    return [date, weight, time]
  }
  GetEntries(){
    var Data = this.FitbitDataFromFirebase() 
    console.log(Data)
    var arry = []
    
    for (var i =0; i < Data[0].length; i++){
    
    var t = {
        'Date': Data[0][i],
        'Time': Data[2][i],
        'Weight': Data[1][i]
      };
      arry.push(t)
    }
    console.log(arry)
    
    return arry
  }


  toNum(arry){
    var rweight = []
    rweight = arry.map(Number);
    //console.log(rweight)
    return rweight
  }
  getSize(obj){
    var size = 0, key;
    for (key in obj){
      size++;
    }
    return size;
  }

toggle() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } 
  else {
    x.style.display = "none";
  }
  var y = document.getElementById("myChartDIV");
  if (y.style.display === "none") {
    y.style.display = "block";
  } 
  else {
    y.style.display = "none";
  }
}

  homepage(){
        
    this.getTypeInfo()
    var type = this.info.type
    if(type == 'Admin'){
      this.router.navigate(["../admin"])
    }
    else{
      this.router.navigate(["../cmain"])
    }
  }
  settings(){
    this.getTypeInfo()
    var type = this.info.type
    if(type == 'Admin'){
      this.router.navigate(["../asettings"])
    }
    else{
      this.router.navigate(["../settings"])
    }
  }
  getStatus(){
    var status = this.info.status
    console.log(status)
    return status
  }
}
