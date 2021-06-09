import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';
  
import { BlocosCadastroComponent } from './blocos-cadastro/blocos-cadastro.component';
import { BlocosPageRoutingModule } from './blocos-routing.module';
import { BlocosPage } from './blocos.page';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule,
    BlocosPageRoutingModule,
    HttpClientModule
  ],
  declarations: [BlocosPage, BlocosCadastroComponent ]
})

export class BlocosPageModule {}
