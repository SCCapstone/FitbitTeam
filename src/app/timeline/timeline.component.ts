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
  //initializing the variables
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
    //here it checks if a parameter of a client's uid is passed through the router
    if (this.router.getCurrentNavigation().extras.state != undefined) {
    console.log(this.router.getCurrentNavigation().extras.state.example); // should log client id
    this.clientRef = this.router.getCurrentNavigation().extras.state.example
    
    }
  }

  ngOnInit() {
    //If there is a client Id, log the client's data, otherwise load the regular user
    if(this.clientRef != ''){
     this.userid = this.clientRef
     
    }
    else{
      if (firebase.auth().currentUser != null){
        this.userid = firebase.auth().currentUser.uid
      }
      else {
      this.userid = "";
      this.userid = localStorage.getItem("UID")
    }
    }
    //Check if it is a client or not
    if(this.userid != null){
      console.log("THIS IS THE USERID " + this.userid)
      
      
    
     //runs the functions to get client data from firebase
      this.FitbitDataFromFirebase()
      this.getInfo()
      this.getStatus()
      //this is to switch between the chart and the table divs
      var z = document.getElementById("myChartDIV");
      if (z.style.display === "none") {
        z.style.display = "block";
      } else {
        z.style.display = "none";
      }
    this.generateVisuals()
    }


    else{
      setTimeout(() => {
        this.ngOnInit()
      }, 200);
    }
  }
  generateVisuals(){
    //generates chart and table from the data
    if(this.fitbitData != null){
      this.GetEntries(this.fitbitData)
      this.GenerateChart(this.fitbitData)
    }
    else{
      setTimeout(() => {
        this.generateVisuals()

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
      //console.log(this.info)
    });
    this.first = this.info.first_name
  }
  

  GenerateChart(data){
    //boilerplate linegraph for the timeline
    var myArray = data
    var y = 0;
    var x = '';
    var dataPoints = [];
    console.log(myArray)
    for (var i = 0 ; i < myArray[0].length; i++) {
        y = myArray[1][i];
        x = myArray[0][i];
        dataPoints.push({
          x: new Date(x),
          y: y                
          });
          
      }
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
    //pulls the fitbit data from firebase
    var tdata:any
    var path:string = "fitbitData/" + this.userid
    var ref = firebase.database().ref(path)
    ref.on('value', (snapshot) => {
      tdata = snapshot.val();
    })
    setTimeout(() => {
      if(tdata != null){
        var ar = Object.values(tdata)
      var date = []
      var weight = []
      var time = []
      var size = this.getSize(ar[0])
      for (var i = 0; i < size; i++){
        var temp = Object.values(ar[0][i])
        var x = +temp[2];
        date.push(temp[0]) 
        weight.push(Math.round((x * 2.20462) * 100) / 100)
        time.push(temp[1])
      }
      weight = this.toNum(weight)
  
      this.fitbitData = [date,weight,time]
     
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
        //console.log(arry)
        
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
  //function that toggles between chart and table
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
      
    this.status = this.info.status
    }, 800);
  }
}
