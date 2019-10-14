import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, LoadingController } from '@ionic/angular';
import { AuthenticateService } from '../service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  hasVerifiedEmail = true;
  sentTimestamp;

  constructor(
    private navCtrl: NavController,
    public router: Router,
    public loadingCtrl: LoadingController,
    private authService: AuthenticateService,
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user)
        this.hasVerifiedEmail = this.afAuth.auth.currentUser.emailVerified;
    });
  }

  gotoProfile(){
    this.router.navigateByUrl("profile")
  }

  gotoFlatmatepreference(){
    this.router.navigateByUrl("flatmate-preference")
  }

  recommendationList(){
    this.router.navigateByUrl("recommendation")
  }

  sendEmail(){
    this.authService.snedEmail();
  }
  reload() {
    window.location.reload();
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
