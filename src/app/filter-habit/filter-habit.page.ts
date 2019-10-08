import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from '../service/database.service';
import { Info } from '../models/info';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-filter-habit',
  templateUrl: './filter-habit.page.html',
  styleUrls: ['./filter-habit.page.scss'],
})
export class FilterHabitPage implements OnInit {
  Profile_details: Observable<Info[]>;
  recItems: Info[];
  item:any;
  test:any;

  constructor(
    private navCtrl: NavController,
    public router: Router,
    private firestore: AngularFirestore,
    private dataservice : DatabaseService
  ) { }

  async ngOnInit(){

    
    this.item = new Object();
    this.item.age = "";
    this.item.gender = "";
    this.item.habit = "";
    this.item = await this.dataservice.show_flatmates();




    await this.showIdeal().subscribe(infos =>{
 
      this.recItems = infos;
      });


  }



  goHome(){
    this.navCtrl.navigateForward('/home')
  }
  selectAll(){
    this.router.navigateByUrl('recommendation')
  }
  filterAge(){
    this.router.navigateByUrl('filter-age')
  }
  filterGender(){
    this.router.navigateByUrl('filter-gender')
  }


  showIdeal(){

    this.Profile_details = this.firestore.collection('user', ref=>ref.where('habit', '==', this.item.habit)
    ).valueChanges();
    return this.Profile_details;
   
  }


}
