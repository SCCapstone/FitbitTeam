import { Component, OnInit } from '@angular/core';
import { Router,Routes, RouterModule , ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import * as CanvasJS from '../canvasjs.min.js';

@Component({
  selector: 'app-cmain',
  templateUrl: './cmain.component.html',
  styleUrls: ['./cmain.component.css']
})
export class CmainComponent implements OnInit {
  //variables used in the program
  userid = ''
  info:any
  first = ''
  tmeds:any
  meds:any
  last = ''
  medName = ''
  medTime = ''
  medDate = ''
  medEntry:any
  hasclicked=false
  id = ''
  status = ''
  recommendation = ''

  constructor(public router: Router,private route: ActivatedRoute) {
    var userid = firebase.auth().currentUser.uid;
    
    console.log(userid)
   }

  ngOnInit() {
    this.userid = firebase.auth().currentUser.uid;
    this.getMeds()
    this.getRecommendation()
    setTimeout(() => {
      this.getInfo()
    }, 400);
    setTimeout(() => {
      this.getChart()
    }, 500);
    setTimeout(() => {
      this.getStatus()
    }, 600);
    this.status= this.getStatus()
  }

  getInfo(){
    var refs = firebase.database().ref('usertypes/' + this.userid);
    refs.on('value', (snapshot) => {
      this.info = snapshot.val();
    })
    //grabs first and last name from the info
    this.first = this.info.first_name
    this.last = this.info.last_name
  }

  getMeds(){
    var mref = firebase.database().ref('meds/' + this.userid );
    mref.on('value', (snapshot) => {
      this.tmeds = snapshot.val();
      this.meds = Object.keys(this.tmeds).map(i => this.tmeds[i]);
    })
    //console.log("outside" + this.meds)
  }
  getChart(){
  var myArray = this.FitbitDataFromFirebase();
  var y = 0;
  var x = '';
  var dataPoints = [];
  for (var i = myArray[0].length -7 ; i < myArray[0].length; i++) {
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
        text: "Weekly Recap"
      },
      axisX:{
        title : "Last 7 Days"
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


  //Function used in HTML to go to the timeline of a specific user
  toTimeline(){
    this.router.navigate(["../timeline"])
  }

  //Logout from firebase
  logout(){
    firebase.auth().signOut();
    this.router.navigate(["../login"])
    console.log(firebase.auth().currentUser.uid)
  }
  //Wraper function to change what is viewed in HTML
  clicked(){
    this.hasclicked= !this.hasclicked;
    console.log(this.hasclicked)
  }
  // Function to add a medication to the firebase database
  add(){
    var userid = firebase.auth().currentUser.uid;
    var medname = this.medName;
    var meddate = this.medDate;
    var medTime = this.medTime;
    var path:string = "meds/" + userid.toString();
    let med = firebase.database().ref(path).push();
    med.set ({
      'medname': medname,
      'meddate': meddate,
      'medTime': medTime
    });
    this.medName = ''
    this.medDate=''
    this.medTime=''
  this.clicked();
  }
 /* Date must be in yyyy-MM-dd format such as:
      1. /body/log/weight/date/[date].json
      2. /body/log/weight/date/[base-date]/[period].json
      3. /body/log/weight/date/[base-date]/[end-date].json
      Range end date must not be longer than 31 days.
    */
   
  //Grabs the current date and in yyyy-mm-dd format
  getDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    let t = yyyy + '-' + mm + '-' + dd;
    return t;
  }

  //Gets the date for the day 30 days ago
  getPriorMonth() {
    var date = new Date(new Date().setDate(new Date().getDate() - 30));
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    var priorDate = yyyy + '-' + mm + '-' + dd;    
    return priorDate;
  }

  //Grabs the fitbit data using the Token inside of the firebase.
  pullFitbit(){    
    var userid = firebase.auth().currentUser.uid;
    var path:string = ("fitbitInfo/" + userid.toString());
    var fitbitInfo:any
    var fitbitRefs = firebase.database().ref(path); 
    
    fitbitRefs.on('value', (snapshot) => {
       fitbitInfo = snapshot.val();
    });
    setTimeout(() => {
      var ar = Object.values(fitbitInfo)
      
      var fitbitId = ar[0]
      var fitbitToken= ar[1]
      console.log(fitbitId + " "+ fitbitToken)
      console.log(fitbitToken + " " + fitbitId)
      var todaysDate = this.getDate();
      var monthPriorDate = this.getPriorMonth();
      //************ */
      if (fitbitToken != null) {
        console.log("Grabbing Fitbit data from " + monthPriorDate + " to today, " + todaysDate);
        var temp:string = 'https://api.fitbit.com/1/user/' + fitbitId + '/body/log/weight/date/' + monthPriorDate + '/' + todaysDate + '.json';
        console.log(temp);
  
        //Grabs the data from fitbit as a xhr reqest. 
        var xhr = new XMLHttpRequest();
        xhr.open('GET', temp);
        xhr.setRequestHeader("Authorization", 'Bearer ' + fitbitToken);
        xhr.onload = function () {
          if (xhr.status === 200) {
            //Firebase Storing
            let finfo = xhr.responseText
            var tarray = finfo.split("{");
            var array:any
            var tobj:any
            var tarry = []
            for (var i = 2 ; i < tarray.length; i++){
              //console.log(tarray[i].split(","))
              array = tarray[i].split(",")
              //String manipulation, Grabs weight from xhr string
              var tweight = array[5].split(":")[1].replace('"', '').replace('}', '').replace(']', '').replace('}', '')
              var tdate = array[1].split(":")[1].replace('"', '').replace('\\', '') 
              //console.log(array[4].split("\"")[3].replace('"'))
              var ttime = array[4].split("\"")[3].replace('"')
              tobj = {
                'date': tdate,
                'time': ttime,
                'weight': tweight
              }
              tarry.push(tobj)
            }  
            //console.log(tarry)
            var path:string = "fitbitData/" + userid.toString();
            let fdata = firebase.database().ref(path).set({
              Data: tarry
            });
          }
        };
        xhr.send();
      }
     
    }, 500);
    console.log("Running")
  }


  FitbitDataFromFirebase(){
    var tdata:any
    var path:string = "fitbitData/" + this.userid
    var ref = firebase.database().ref(path)
    ref.on('value', (snapshot) => {
      tdata = snapshot.val();
    })
    //console.log(tdata)

    var ar = Object.values(tdata)
    //console.log(ar)
    var date = []
    var weight = []
    var size = this.getSize(ar[0])
    //console.log(size)
    for (var i = 0; i < size; i++){
      //console.log(ar[0][i])
      var temp = Object.values(ar[0][i])
      var x = +temp[2];
      //console.log(temp[0])
      date.push(temp[0]) 
      weight.push(Math.round((x * 2.20462) * 100) / 100)
    }
    //console.log(date)
    //console.log(weight)
    weight = this.toNum(weight)
    //console.log(weight)
    return [date, weight]
  }
  //wraper function that changes weight array from string to double
  toNum(arry){
    var rweight = []
    rweight = arry.map(Number);
    //console.log(rweight)
    return rweight
  }


    //Deletes a chosen medication 
  delMed(id){
    var size = this.getSize(this.meds)
    //Goes through list of meds object and removes the meds
    for (var i = 0; i < size; i ++){
      if (this.meds[i] == this.meds [id]){
        console.log("Removal of " + this.meds[i])
        delete this.meds[i]
      } 
    }
    //This changes the new medication object in the database
    var userid = firebase.auth().currentUser.uid;
    var path:string = "meds/" + userid.toString();
    var ref = firebase.database().ref(path)
    ref.set(this.meds)
  }

  //gets size of an object in js
  getSize(obj){
    var size = 0, key;
    for (key in obj){
      size++;
    }
    return size;
  }
  
  getStatus(){
    //set 
    var Data = this.FitbitDataFromFirebase();
    //Done
    var weight = Data[1];
    console.log(weight)
    var count = 0;
    var status = 'GREEN'
    var weekAvg = 0;
    var current = 0;
    var yester = 0;
    var weekAgo = weight[weight.length - 7]
    //gets avg for week, aswell as setting current and yesterdays weight
    for(var i = weight.length - 7; i < weight.length; i++)
    {
      if(count == 5)
      {
        yester = weight[i]
      }
      if(count == 6)
      {
        current = weight[i];
      }
      weekAvg = weekAvg + weight[i]
      count++
    } 
    weekAvg = weekAvg / 7;
    //check whether they are actually losing weight (Day to day), in that case, status remains green
    var diff = current - yester
    var bool = 0;
    if(diff < 0)
    {
      bool = 1;
    }
    diff = Math.abs(diff)
    //console.log(diff)
    //check whether they are losing weight (week to week), in this case, status will remain green
    var weekDiff = current - weekAgo
    if(weekDiff < 0)
    {
      bool = 1;
    }
    weekDiff = Math.abs(weekDiff)
    //console.log(weekDiff)
    //First check and set status based on difference of weight from one day to the next
    if(diff <= 1)
    {
      status = 'GREEN'
    }
    else if(diff > 1 && diff <= 2)
    {
      status = 'YELLOW'
    }
    else
    {
      status = 'RED'
    }
    //Now check and set status based on difference of weight from week to week (giving this more priority over status)
    if(weekDiff <= 2)
    {
      status = 'GREEN'
    }
    else if(diff > 2 && diff <= 5)
    {
      status = 'YELLOW'
    }
    else
    {
      status = 'RED'
    }
    //If they've lost weight, set status to Green
    if(bool == 1)
    {
      status = 'GREEN'
    }
    this.status = this.info.status
    console.log(status)
    this.saveStatus(status)
    return status
  }
  saveStatus(status){
    var refs = firebase.database().ref('usertypes/' + this.userid);
    refs.set({
      'uid': this.userid,
      'first_name': this.info.first_name,
      'last_name': this.info.last_name,
      'status': status,
      'type': this.info.type
    });
    //console.log(status)
  }
  // the following group of get functions are to serve
  // alexa the proper data for voice activated commands

  getTodaysWeight(){
    var temp = this.FitbitDataFromFirebase()
    var today = this.getDate()
    var dates = temp[0]
    console.log(dates)
    var size = this.getSize(dates)
    for(var i = 0; i < size; i++)
    {
      if(dates[i] == today)
      {
        return dates[i]
      }
    }
    return null;
  }
  getAverageWeekWeight(){
    var temp = this.FitbitDataFromFirebase()
    var weight = temp[1]
    var size = this.getSize(weight)
    var total = 0;

    console.log(weight)

    for(var i = (size - 1) ; i > (size - 8); i--)
    {
      total = total + weight[i];
    }
    total = total/7;
    console.log("weekly average: " + total)
    return total;
  }
  
  getAverageMonthWeight() {
    // past 30 days
    var temp = this.FitbitDataFromFirebase()
    var weight = temp[1]
    var size = this.getSize(weight)
    var total = 0;

    console.log(weight)

    for(var i = (size - 1) ; i > (size - 31); i--)
    {
      total = total + weight[i];
    }
    total = total/30;
    console.log("Monthly average: " + total)
    return total;
  }
  getRecommendation()
  {
    var recommendation = ''
    var count = 0
    count = Math.floor(Math.random() * (7))
    switch (count)
    {
      case 0:
        recommendation = 'Try and excercise atleast 3 times a week'
        break;
      case 1:
        recommendation = 'Avoid foods/drinks high in sugar'
        break;
      case 2:
        recommendation = 'Avoid processed junk foods'
        break;
      case 3:
        recommendation = 'Cut back on your carbs'
        break;
      case 4:
        recommendation = 'Drink lots of water'
        break;
      case 5:
        recommendation = 'Always keep healthy food around to snack on'
        break;
      case 6:
        recommendation = 'Make sure to get enough sleep'
        break;
    }
    console.log(recommendation)
    this.recommendation = recommendation
    return recommendation
  }
  getMedication(){

  }
  getReminders(){

  }  
}
