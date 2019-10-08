import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../service/database.service';
import { AuthenticateService } from '../service/authentication.service';
import { LoadingController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  info: any;

  constructor(
    private navCtrl: NavController,
    public router: Router,
    private authService: AuthenticateService,
    private route: ActivatedRoute,
    private dataservice : DatabaseService
    
  ) {}

  async ngOnInit() {


    this.info = new Object();

    this.info.name ="";
    this.info.age ="";
    this.info.gender ="";
    this.info.habit ="";

    this.info = await this.dataservice.show_details();
  }


  
  update(){
      this.dataservice.update_details(this.info);
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
