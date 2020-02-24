import { Component, OnInit } from '@angular/core';
import { Router,Routes, RouterModule , ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-cmain',
  templateUrl: './cmain.component.html',
  styleUrls: ['./cmain.component.css']
})
export class CmainComponent implements OnInit {
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
  fitbitInfo:any
  fitbitToken =''
  fitbitId= ''

  constructor(public router: Router,private route: ActivatedRoute) {
    var userid = firebase.auth().currentUser.uid;
    console.log(userid)

   }

  ngOnInit() {
    this.userid = firebase.auth().currentUser.uid;
    console.log(this.userid)
    var usid = firebase.auth().currentUser.uid;
    var mref = firebase.database().ref('meds/' + usid );
    var refs = firebase.database().ref('usertypes/' + usid);
    refs.on('value', (snapshot) => {
      this.info = snapshot.val();
    })
    this.first = this.info.first_name
    this.last = this.info.last_name
    mref.on('value', (snapshot) => {
      this.tmeds = snapshot.val();
      this.meds = Object.keys(this.tmeds).map(i => this.tmeds[i]);
    })
    //console.log("outside" + this.meds)
  }
  
  toTimeline(){
    this.router.navigate(["../timeline"])
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

  add(){
    var userid = firebase.auth().currentUser.uid;
    var medname = this.medName;
    var meddate = this.medDate;
    var medTime = this.medTime;
    var path:string = "meds/" + userid.toString();
    let med = firebase.database().ref(path).push();
    med.set ({
      'medname':medname,
      'meddate': meddate,
      'medTime': medTime
    });
    this.medName = ''
    this.medDate=''
    this.medTime=''
  this.clicked();
  }

  getDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    let t = yyyy + '-' + mm + '-' + dd;
    return t;
  }

  getPriorMonth() {
    var date = new Date(new Date().setDate(new Date().getDate() - 30));
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    var priorDate = yyyy + '-' + mm + '-' + dd;    
    return priorDate;
  }

  pullFitbit(){
    var userid = firebase.auth().currentUser.uid;
    var path:string = ("fitbitInfo/" + userid.toString());

    var fitbitRefs = firebase.database().ref(path); 
    fitbitRefs.on('value', (snapshot) => {
      this.fitbitInfo = snapshot.val();
    });
    console.log(this.fitbitInfo)
    var tempArray = Object.keys(this.fitbitInfo).map((key)=> {
      return [Number(key), this.fitbitInfo[key]];
    });
    this.fitbitToken = tempArray[1][1].token
    this.fitbitId = tempArray[1][1].id
    console.log("fitbitToken: " + this.fitbitToken)
    console.log("fitbitId: " + this.fitbitId)

    /* Date must be in yyyy-MM-dd format such as:
      1. /body/log/weight/date/[date].json
      2. /body/log/weight/date/[base-date]/[period].json
      3. /body/log/weight/date/[base-date]/[end-date].json
      Range end date must not be longer than 31 days.
    */
    var todaysDate = this.getDate();
    var monthPriorDate = this.getPriorMonth();
    
    console.log("Grabbing Fitbit data from " + monthPriorDate + " to today, " + todaysDate);

    var temp:string = 'https://api.fitbit.com/1/user/' + this.fitbitId + '/body/log/weight/date/' + monthPriorDate + '/' + todaysDate + '.json';
    console.log(temp);

    var xhr = new XMLHttpRequest();

    xhr.open('GET', temp);
    xhr.setRequestHeader("Authorization", 'Bearer ' + this.fitbitToken);
    xhr.onload = function () {
      if (xhr.status === 200) {
        //Firebase Storing
        let finfo = xhr.responseText
        var tarray = finfo.split("{");
        var data:any
        var array:any
        var finalData = []
        for (var i = 2 ; i < tarray.length; i++){
          //console.log(tarray[i].split(","))
          array = tarray[i].split(",")
          var tweight = array[5].split(":")[1].replace('"', '').replace('}', '').replace(']', '').replace('}', '')
         /*
          data = {
            date: array[1].split(":")[1].replace('"', ''),
            time: array[4].split(":")[1].replace('"', ''),
            weight: tweight
          }
          finalData.push(data)
          */
          var path:string = "fitbitData/" + userid.toString();
          let fdata = firebase.database().ref(path).push();
          fdata.set ({
            'date': array[1].split(":")[1].replace('"', '').replace('\\', ''),
            'time': array[4].split(":")[1].replace('"', ''),
            'weight': tweight
          });
          //console.log(data)
        }
        //console.log(array)
        //console.log(finalData)
      
        
      }
    };
    xhr.send();
    

  }

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



}
