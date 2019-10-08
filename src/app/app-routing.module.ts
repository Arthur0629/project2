import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'recommendation', loadChildren: './recommendation/recommendation.module#RecommendationPageModule' },
  { path: 'add-profile', loadChildren: './add-profile/add-profile.module#AddProfilePageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'flatmate-preference', loadChildren: './flatmate-preference/flatmate-preference.module#FlatmatePreferencePageModule' },
  { path: 'comparasion-detail', loadChildren: './comparasion-detail/comparasion-detail.module#ComparasionDetailPageModule' },
  { path: 'filter-age', loadChildren: './filter-age/filter-age.module#FilterAgePageModule' },
  { path: 'filter-gender', loadChildren: './filter-gender/filter-gender.module#FilterGenderPageModule' },
  { path: 'filter-habit', loadChildren: './filter-habit/filter-habit.module#FilterHabitPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
