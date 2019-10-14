import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
 
@Injectable()
export class AuthenticateService {
 
  constructor(){}
 
  registerUser(value){
   return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
       res => resolve(res),
       err => reject(err))
   })
  }
 
  loginUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }

  snedEmail(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().currentUser.sendEmailVerification()
        .then(() => {
          console.log("sent verification email");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })

  }

 
  logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          console.log("LOG Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }

}