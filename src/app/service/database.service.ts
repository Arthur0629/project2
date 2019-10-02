import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {Info} from '../models/info';
import { Observable } from 'rxjs';
import { IonItemDivider } from '@ionic/angular';
import { Item } from '../models/item';
import {map} from 'rxjs/operators'

 
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  Profile_detail: AngularFirestoreCollection<Info>;
  Profile_details: Observable<Info[]>;
  profileDoc: AngularFirestoreDocument<Info>;

  Flatmate_detail: AngularFirestoreCollection<Item>;
  Flatmate_details: Observable<Item[]>;
  FlatmateDoc: AngularFirestoreDocument<Item>;

 
  constructor(
    private firestore: AngularFirestore,
    public afAuth: AngularFireAuth
  ){
    let currentUser = firebase.auth().currentUser;
    this.Profile_detail = firestore.collection('user');
    this.Flatmate_detail = firestore.collection('flatmate');
  }
  addUserProfile(info: Info) {

    return new Promise<any>((resolve, reject) => {

      let uid = firebase.auth().currentUser.uid;
      let profile:any = new Object();
      profile.userID = uid;
      profile.name = info.name;
      profile.age = info.age;
      profile.gender = info.gender;
      profile.habit = info.habit;
  
      this.firestore.collection('user').doc(uid).set(profile)
        .then(
          res => resolve(res),
          err => reject(err)
        );
      let flatmate:any = new Object();
      flatmate.userID = uid;
      flatmate.age = "";
      flatmate.gender = "";
      flatmate.habit = "";
  
      this.firestore.collection('flatmate').doc(uid).set(flatmate)
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });

  }


  show_details(){
    return new Promise<any>((resolve, reject) => {

      let userId = firebase.auth().currentUser.uid;

      this.firestore.collection('user' , ref=>ref.where('userID', '==', userId)).get().toPromise().then(
          res => resolve(res.docs[0].data()),
          err => reject(err)
        )
    })
  }

  show_flatmates(){
    return new Promise<any>((resolve, reject) => {

      let userId = firebase.auth().currentUser.uid;

      this.firestore.collection('flatmate' , ref=>ref.where('userID', '==', userId)).get().toPromise().then(
          res => resolve(res.docs[0].data()),
          err => reject(err)
        )
    })
  }


  // showIdeal(){

  //   this.Profile_details = this.firestore.collection('user', ref=>ref.where('gender', '==', 'male').where('habit', '==', 'cold')).valueChanges();
  //   return this.Profile_details
   
  // }

  update_details(info:Info){
    let uid = firebase.auth().currentUser.uid;
      let profile:any = new Object();
      profile.userID = uid;
      profile.name = info.name;
      profile.age = info.age;
      profile.gender = info.gender;
      profile.habit = info.habit;
    this.profileDoc = this.Profile_detail.doc(uid);
    this.profileDoc.update(profile);
    
  }

  update_flatmates(item:Item){
    let uid = firebase.auth().currentUser.uid;
    let flatmate:any = new Object();
    flatmate.userID = uid;
    flatmate.age = item.age;
    flatmate.gender = item.gender;
    flatmate.habit = item.habit;
    this.FlatmateDoc = this.Flatmate_detail.doc(uid);
    this.FlatmateDoc.update(flatmate);
    
  }
  
  
}