import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonContent } from '../../utils/button-icon-name';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-confirm-window',
  templateUrl: './confirm-window.component.html',
  styleUrls: ['./confirm-window.component.scss']
})
export class ConfirmWindowComponent {

  @Input() title!: string;
  @Input() message!: string;

  @Output() confirmWindowButtonClicked = new EventEmitter<string>();

  xMarkBtn = faXmark;

  okButtonText: string = ButtonContent.OK;
  cancelButtonText: string = ButtonContent.CLOSE;

  cancelAndCloseModaleWindow() {
    this.confirmWindowButtonClicked.emit(this.cancelButtonText);
  }

  confirmAndCloseModaleWindow() {
    this.confirmWindowButtonClicked.emit(this.okButtonText);
  }

}
