import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDatabase, faClock, faFileInvoiceDollar, faHandHoldingUsd, faUsersCog } from '@fortawesome/pro-solid-svg-icons';
import { faTrain08, faTankerMoney, faRailcarMaintenance } from 'ng-font-qts/font-qts';
import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from '../../components/portal/portal.component';

@NgModule({
  declarations: [
    PortalComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    FontAwesomeModule
  ]
})
export class PortalModule {
  constructor() {
    // Add an icon to the library for convenient access in other components
    library.add(faDatabase, faClock, faFileInvoiceDollar, faTrain08, faTankerMoney, faRailcarMaintenance, faHandHoldingUsd, faUsersCog );
  }
}
