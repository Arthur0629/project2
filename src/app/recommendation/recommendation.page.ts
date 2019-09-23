import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticateService } from '../service/authentication.service';
import { DatabaseService } from '../service/database.service';


@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.page.html',
  styleUrls: ['./recommendation.page.scss'],
})
export class RecommendationPage implements OnInit {

  arrayOfItems:any [] = [];
  myProflie:any;
  matchingResult:any;
  

  constructor(private navCtrl: NavController,
    public router: Router,
    private authService: AuthenticateService,
    private databaseService:DatabaseService ) {}

  ngOnInit(){
    
    this.databaseService.getUserCollection().subscribe(items =>{
      this.arrayOfItems = items;
      this.matchingCalculator();
      var a = this.databaseService.getDetails();
      var b = 2;
      
    });

  }

  onUpdateProfile(){
    this.navCtrl.navigateForward('/profile');
  }

  goHome(){
    this.navCtrl.navigateForward('/home');
  }


  onCheckDetails(_item){
    //把item放到local storage
    localStorage.setItem("selectedMate",_item);
    this.navCtrl.navigateForward('/comparasion-detail');
  }

  

  
  matchingCalculator(){
   
    var mateProfile;
   
   
    for(var i: number = 0; i < this.arrayOfItems.length; i++){
   
        mateProfile = this.arrayOfItems[i];
        var num = 0;
        var totalMetric = 3;


        if(localStorage.getItem("idealMate") ){


          if ( localStorage.getItem("idealAge") === mateProfile.age ){
            num += 1;
          }

          if ( localStorage.getItem("idealGender")  === mateProfile.gender ){
            num += 1;
          }

          if ( localStorage.getItem("habit") === mateProfile.habit ){
            num += 1;
          }

          this.arrayOfItems[i].result = ( num / totalMetric );
        }   
        else{
          this.arrayOfItems[i].result = 0;
        }
     

    }

  }
}
