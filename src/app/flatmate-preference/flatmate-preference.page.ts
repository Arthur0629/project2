import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatabaseService } from '../service/database.service';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { Item } from '../models/item';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-flatmate-preference',
  templateUrl: './flatmate-preference.page.html',
  styleUrls: ['./flatmate-preference.page.scss'],
})
export class FlatmatePreferencePage implements OnInit {
  item:any;


  constructor(
    private navCtrl: NavController,
    private dataService: DatabaseService,
    private formBuilder: FormBuilder,
    public router: Router,
    private firestore: AngularFirestore,
    private authService: AuthenticateService
  ) { }

  async ngOnInit() {
    

    this.item = new Object();
    this.item.age = "";
    this.item.gender = "";
    this.item.habit = "";
    this.item = await this.dataService.show_flatmates();
  }

  

  update(){
    this.dataService.update_flatmates(this.item);

    
  }

  BacktoHome(){
    this.router.navigateByUrl('home');
  }
  
  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }

}