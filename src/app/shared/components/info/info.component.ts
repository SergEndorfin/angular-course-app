import { Component } from '@angular/core';
import { ButtonContent } from '../../utils/button-icon-name';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  addNewCourseButtonText = ButtonContent.ADD_NEW_COURSE;

  faEye = faEye;
  faEyeSlash = faEyeSlash;
}
