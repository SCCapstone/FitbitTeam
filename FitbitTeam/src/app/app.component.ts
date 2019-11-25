import { Component, OnInit, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { AccountsServer } from '@accounts/server';
import { Mongo } from '@accounts/mongo';
//const mongoose = require('mongoose');
import mongoose from 'mongoose';

declare var require: any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FitbitTeam';
}
/*const {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential
} = require('mongodb-stitch-browser-sdk');

const client = Stitch.initializeDefaultAppClient('fitbitapp-svmgq');

const db = client.getServiceClient(RemoteMongoClient.factory, 'mongodb-atlas').db('TestDatabase');

client.auth.loginWithCredential(new AnonymousCredential()).then(user =>
db.collection('TestCollection').updateOne({owner_id: client.auth.user.id}, {$set:{number:42}}, {upsert:true})
).then(() =>
db.collection('TestCollection').find({owner_id: client.auth.user.id}, { limit: 100}).asArray()
).then(docs => {
  console.log("Found docs", docs)
  console.log("[MongoDB Stitch] Connected to Stitch")
}).catch(err => {
  console.error(err)
});*/