import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlocosCadastroComponent } from './blocos-cadastro/blocos-cadastro.component';
import { BlocosPage } from './blocos.page'; 
  
const routes: Routes = [
  {
    path: '',
    component: BlocosPage
  },
  {
    path: 'cadastro',
    component: BlocosCadastroComponent
  },
  {
    path: 'edicao/:id',
    component: BlocosCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlocosPageRoutingModule {}
