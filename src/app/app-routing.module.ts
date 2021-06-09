import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  }, 
  {
    path: 'moradores',
    loadChildren: () => import('./moradores/moradores.module').then( m => m.MoradoresPageModule)
  }, 
  {
    path: 'blocos',
    loadChildren: () => import('./blocos/blocos.module').then( m => m.BlocosPageModule)
  }, 
  {
    path: 'apartamentos',
    loadChildren: () => import('./apartamentos/apartamentos.module').then( m => m.ApartamentosPageModule)
  }
   
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
