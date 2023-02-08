import { Component, Input } from '@angular/core';
import { faTrashCan, faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { ButtonContent } from '../../utils/button-icon-name';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() buttonText?: string;
  @Input() buttonIconName?: string;
  @Input() disabled: boolean = false;

  isButtonTextSet() {
    return this.buttonText !== undefined;
  }

  setProperIconBtn() {
    if (this.buttonIconName === ButtonContent.PENCIL) {
      return faPencil;
    } else if (this.buttonIconName === ButtonContent.TRASH) {
      return faTrashCan;
    } else {
      return faFaceSmile;
    }
  }
}
