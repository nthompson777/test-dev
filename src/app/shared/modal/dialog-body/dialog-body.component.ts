import { Component, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-foundation/modal';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss']
})
export class DialogBodyComponent {
  title: string;
  message: string;
  options: string;

  constructor(public bsModalRef: BsModalRef) { }

  confirmModal() {
    // ... Add confirmation action/function ...
    this.bsModalRef.hide();
  }

  closeModal() {
    this.bsModalRef.hide();
  }
}
