import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import {MoradoresPageRoutingModule } from './moradores-routing.module';
 
import { MoradoresPage } from './moradores.page';
import { MoradoresCadastroComponent } from './moradores-cadastro/moradores-cadastro.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    MoradoresPageRoutingModule,
    HttpClientModule
  ],
  declarations: [MoradoresPage, MoradoresCadastroComponent]
})

export class MoradoresPageModule {}
