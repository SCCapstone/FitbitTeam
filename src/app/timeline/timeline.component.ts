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
  userid = ''
  Entries:any
  table = false;
  status = ''
  clientRef= ''
  fitbitData:any
  constructor(public router: Router,private route: ActivatedRoute) { 
    if (this.router.getCurrentNavigation().extras.state != undefined) {
    console.log(this.router.getCurrentNavigation().extras.state.example); // should log client id
    this.clientRef = this.router.getCurrentNavigation().extras.state.example
    }
  }

  ngOnInit() {
    if (firebase.auth().currentUser != null){
      this.userid = firebase.auth().currentUser.uid
    }
    else {
    this.userid = "";
    this.userid = localStorage.getItem("UID")
  }
    if(this.userid != null){
      console.log("THIS IS THE USERID " + this.userid)
      //Check if it is a client or not
      var usid = this.userid
      if (this.clientRef != ''){
        usid = this.clientRef;
      } else {
        if (this.userid != null) {
          usid = this.userid
        }
        else {
          console.log("youre not logged in");
        }
      }
      this.FitbitDataFromFirebase()
      this.getInfo()
      this.getStatus()
      var z = document.getElementById("myChartDIV");
      if (z.style.display === "none") {
        z.style.display = "block";
      } else {
        z.style.display = "none";
      }
      /*
 setTimeout(() => {
      this.GenerateChart()
    }, 2000);
    setTimeout(() => {
      this.Entries = this.GetEntries()
      console.log( this.Entries)
    }, 100);
      */
   
     if(this.fitbitData != null){
      this.GetEntries(this.fitbitData)
      this.GenerateChart(this.fitbitData)
  
    }
    else{
      setTimeout(() => {
        //console.log(this.fitbitData)
        this.GetEntries(this.fitbitData)
      }, 1200);
      
      setTimeout(() => {
        this.GenerateChart(this.fitbitData)
      }, 1000);
   
      console.log("no firebase data yet")
    }


    }


    else{
      setTimeout(() => {
        this.ngOnInit()
      }, 200);
    }
  }

  getInfo(){
    //Get Info of Current client
    var usid
    if (this.clientRef != ''){
      usid = this.clientRef;
    } else {
    usid = this.userid
    }
    var ref = firebase.database().ref('usertypes/' + usid );
    ref.on('value', (snapshot) => {
      this.info = snapshot.val();
      //console.log(this.info)
    });
    setTimeout(() => {
      this.first = this.info.first_name

    }, 800);
  }

  getTypeInfo(){
    //Get Info of Current User
    var usid = this.userid
    var ref = firebase.database().ref('usertypes/' + usid );
    ref.on('value', (snapshot) => {
      this.info = snapshot.val();
      console.log(this.info)
    });
    this.first = this.info.first_name
  }
  

  GenerateChart(data){
    var myArray = data
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
        //console.log(dataPoints);
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

  logout(){
    firebase.auth().signOut();
    this.router.navigate(["../login"])
    localStorage.clear()
    console.log(firebase.auth().currentUser.uid)
  }



  FitbitDataFromFirebase(){
    var tdata:any
    var path:string = "fitbitData/" + this.userid
    var ref = firebase.database().ref(path)
    ref.on('value', (snapshot) => {
      tdata = snapshot.val();
    })
    setTimeout(() => {
      if(tdata != null){
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
      weight = this.toNum(weight)
      //console.log(weight)
  
      this.fitbitData = [date,weight,time]
      //console.log(this.fitbitData)
     
      }
    }, 700);
  }



  //Get Data for the table view to view in HTML.
  GetEntries(dataary){
    var Data = dataary
    
    var arry = []

    if(Data != null){
      //console.log(Data)
      for (var i =0; i < Data[0].length; i++){
        var t = {
            'Date': Data[0][i],
            'Time': Data[2][i],
            'Weight': Data[1][i]
          };
          arry.push(t)
        }
        console.log(arry)
        
        this.Entries = arry
    }else{
      console.log("DATA == NULL")
    }
   
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
    setTimeout(() => {
      console.log(this.info)
      console.log(this.info.status)
    this.status = this.info.status
    //console.log(status)
    }, 800);
  }
}
