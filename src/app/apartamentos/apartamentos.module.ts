import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApartamentosPageRoutingModule } from './apartamentos-routing.module';

import { ApartamentosPage } from './apartamentos.page';
import { HttpClientModule } from '@angular/common/http';
import { ApartamentosCadastroComponent } from './apartamentos-cadastro/apartamentos-cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApartamentosPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [ApartamentosPage , ApartamentosCadastroComponent]
})
export class ApartamentosPageModule {}
