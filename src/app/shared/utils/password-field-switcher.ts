import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

export function switchFieldTypeAndIcon(
  passwordField: HTMLInputElement,
  icon: IconDefinition
) {
  passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
  return icon === faEyeSlash ? faEye : faEyeSlash;
}