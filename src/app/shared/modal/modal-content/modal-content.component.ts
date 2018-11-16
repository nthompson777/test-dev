import { Component, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-foundation/modal';

@Component({
  selector: 'app-modal-content',
  template: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})

export class ModalContentComponent {
  title: string;
  message: string;
  options1: string;
  options2: string;

  constructor(public bsModalRef: BsModalRef) {}

  respond() {
    this.bsModalRef.hide();
  }
}
