import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {Info} from '../models/info';
import { Observable } from 'rxjs';
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

  profileDetails: Observable<any[]>;
 
  constructor(
    private firestore: AngularFirestore,
    public afAuth: AngularFireAuth
  ){
  //   let currentUser = firebase.auth().currentUser;
  //   this.Profile_detail = firestore.collection('user').doc(currentUser.uid).collection('details');
  //   this.profileDetails = firestore.collection('user').valueChanges();
  }

  addUserProfile( info:Info ){

    return new Promise<any>((resolve, reject) => {

      this.firestore.collection('user').add(info)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  getUserCollection(){
    let currentUser = firebase.auth().currentUser;
    return this.firestore.collection('user').valueChanges();
  }

  getDetails(){
    let currentUser = firebase.auth().currentUser;
    this.profileDoc = this.Profile_detail.doc(currentUser.uid);
    return  this.profileDoc;
  }


  get_user_details(info:Info)
  {
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.firestore.collection('user').doc(currentUser.uid).set(info)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })

  }

  get_flatmte_preference(value)
  {
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

  show_details(){
    // let a :Observable<any> ;
    
    // let currentUser = firebase.auth().currentUser;
    // a = this.firestore.collection('user').doc(currentUser.uid).valueChanges();
    // return this.firestore.collection('user').doc(currentUser.uid);
    // // return this.firestore.collection('user').doc(currentUser.uid).valueChanges();
    // db.collection('cities').doc('SF');

    let currentUser = firebase.auth().currentUser;
    this.profileDoc = this.firestore.collection('user').doc(currentUser.uid);
    this.profileDoc.valueChanges();
    let a = this.profileDoc;
    return this.profileDoc; 

    
    // this.Profile_details =  this.Profile_detail.snapshotChanges().pipe(
    //   map(actions => actions.map(a => {
    //     const data = a.payload.doc.data() as Info;
    //     const id = a.payload.doc.id;
    //     return {id, ...data};
    //   }))
    // );
    // return this.Profile_details; 
  }

  show_flatmates(){
    let currentUser = firebase.auth().currentUser;
    this.Flatmate_details =  this.firestore.collection('flatmate').doc(currentUser.uid).collection('preference').valueChanges();
    return this.Flatmate_details;
  }

  update_details(info:Info){
    
    let currentUser = firebase.auth().currentUser;
    this.profileDoc = this.Profile_detail.doc(currentUser.uid);
    this.profileDoc.update(info);
    
  }
  
  
}