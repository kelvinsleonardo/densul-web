import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Constant} from '@core/config';
import {AppRoutingLazyConfig} from '@core/config/routing-lazy.config';
import {HomePageComponent} from '@pages/home/home';


const routes: Routes = [

  {
    path: Constant.routes.empty,
    redirectTo: Constant.routes.root,
    pathMatch: 'full'
  },
  {
    path: Constant.routes.root,
    component: HomePageComponent,
    data: {title: 'Home'},
    canActivate: []
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, preloadingStrategy: AppRoutingLazyConfig})],
  exports: [RouterModule],
  providers: [AppRoutingLazyConfig]
})
export class AppRoutingModule {
}
