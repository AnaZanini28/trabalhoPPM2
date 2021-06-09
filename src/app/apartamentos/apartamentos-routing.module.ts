import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApartamentosCadastroComponent } from './apartamentos-cadastro/apartamentos-cadastro.component';

import { ApartamentosPage } from './apartamentos.page';

const routes: Routes = [
  {
    path: '',
    component: ApartamentosPage
  },{
    path: 'cadastro',
    component: ApartamentosCadastroComponent
  },{
    path: 'edicao/:id',
    component: ApartamentosCadastroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApartamentosPageRoutingModule {}
