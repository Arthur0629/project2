import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from '../service/database.service';
import { Info } from '../models/info';



@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.page.html',
  styleUrls: ['./recommendation.page.scss'],
})
export class RecommendationPage implements OnInit {
  item:any;

  recItems: Info[];


  recItem:any;


  constructor(private navCtrl: NavController,
    public router: Router,
    private dataservice : DatabaseService

    ) {}

  async ngOnInit(){



    // this.recItem = new Object();
    // this.recItem.name = "";
    // this.recItem.age = "";
    // this.recItem.gender = "";
    // this.recItem.habit = "";

   

    // this.recItem = await this.dataservice.showIdeal();



    
    
    

    this.dataservice.showIdeal().subscribe(infos =>{
 
      this.recItems = infos;
      });


  }



  goHome(){
    this.navCtrl.navigateForward('/home')
  }


  onCheckDetails(){
    this.navCtrl.navigateForward('/comparasion-detail');

  }

  

  
}
