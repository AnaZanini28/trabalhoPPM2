import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoradoresCadastroComponent } from './moradores-cadastro/moradores-cadastro.component';
 
import { MoradoresPage } from './moradores.page';

const routes: Routes = [
  {
    path: '',
    component: MoradoresPage
  },
  {
    path: 'cadastro',
    component: MoradoresCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: MoradoresCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoradoresPageRoutingModule {}
