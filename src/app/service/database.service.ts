import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Info } from '../models/info';
import { Observable } from 'rxjs';
import { Item } from '../models/item';

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

  profileDetails: Observable<any[]>;

  constructor(
    private firestore: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    //   let currentUser = firebase.auth().currentUser;
    //   this.Profile_detail = firestore.collection('user').doc(currentUser.uid).collection('details');
    //   this.profileDetails = firestore.collection('user').valueChanges();
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
  
      this.firestore.collection('user').add(profile)
        .then(
          res => resolve(res),
          err => reject(err)
        );
    });

  }

  getUserCollection() {
    let currentUser = firebase.auth().currentUser;
    return this.firestore.collection('user').valueChanges();
  }

  getDetails() {
    let currentUser = firebase.auth().currentUser;
    this.profileDoc = this.Profile_detail.doc(currentUser.uid);
    return this.profileDoc;
  }


  get_user_details(info: Info) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.firestore.collection('user').doc(currentUser.uid).set(info)
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })

  }

  get_flatmte_preference(value) {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.firestore.collection('flatmate').doc(currentUser.uid).collection('preference').doc(currentUser.uid).set({
        age: value.age,
        gender: value.gender,
        habit: value.habit
      })
        .then(
          res => resolve(res),
          err => reject(err)
        )
    })

  }


  show_details() {

    return new Promise<any>((resolve, reject) => {

      let userId = firebase.auth().currentUser.uid;

      let citiesRef = this.firestore.collection('user' , ref=>ref.where('userID', '==', userId)).get().toPromise().then(
          res => resolve(res.docs[0].data()),
          err => reject(err)
        )
    })
    

  }

  show_flatmates() {
    let currentUser = firebase.auth().currentUser;
    this.Flatmate_details = this.firestore.collection('flatmate').doc(currentUser.uid).collection('preference').valueChanges();
    return this.Flatmate_details;
  }

  update_details(info: Info) {

    let userId = firebase.auth().currentUser.uid;
    this.firestore.collection('user' , ref=>ref.where('userID', '==', userId)).add(info);
    

  }

  update_flatmates(){

  }

}