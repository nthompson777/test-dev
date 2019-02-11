import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faDatabase,
  faClock,
  faFileInvoiceDollar,
  faHandHoldingUsd,
  faUsersCog,
  faTrain,
  faWrench,
  faBoxUsd } from '@fortawesome/pro-solid-svg-icons';
/* import { faTrain08, faTankerMoney, faRailcarMaintenance } from 'ng-font-qts/font-qts'; */
import { PortalRoutingModule } from './portal-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PortalComponent } from '../../components/portal/portal.component';

@NgModule({
  declarations: [
    PortalComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class PortalModule {
  faTrain = faTrain;
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(faDatabase, faClock, faFileInvoiceDollar, faHandHoldingUsd, faUsersCog, faTrain, faWrench, faBoxUsd );
    // faTrain08, faTankerMoney, faRailcarMaintenance
  }
}
