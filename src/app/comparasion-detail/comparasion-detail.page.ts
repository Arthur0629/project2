import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-comparasion-detail',
  templateUrl: './comparasion-detail.page.html',
  styleUrls: ['./comparasion-detail.page.scss'],
})
export class ComparasionDetailPage implements OnInit {

  arrayOfItems:any [] = [];
  myProfile:any;
  mateProfile:any;
  constructor(private navCtrl: NavController,
    private databaseService:DatabaseService) { }

  ngOnInit() {
    this.mateProfile = localStorage.getItem("selectedMate");
    
   

    // this.databaseService.getUserCollection().subscribe(items =>{
    //   this.arrayOfItems = items;
    // 把localstorage 中的内容读取，与myProfile 比较
    // var zhangsan: any = new Object();
    // zhangsan.name = " zhangsan ";
    // zhangsan.dob = " 01/01/1982";
    // zhangsan.gender = "male";
    // zhangsan.swmming = true;
    // zhangsan.baskball = true;

    // var xiaohong: any = new Object();
    // xiaohong.name = "xiaohong";
    // xiaohong.dob = "01/01/1981";
    // xiaohong.gender = "Female";
    // xiaohong.swmming = true;
    // xiaohong.baskball = true;


    // this.myProfile = zhangsan;
    // this.mateProfile = xiaohong;

  }
  
  recommendationList(){
    this.navCtrl.navigateForward('/recommendation');

  }
}
