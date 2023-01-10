export function switchBorder(errors: any, isTouched: boolean, element: any) {
  if (errors && isTouched) {
    element.style.border = '1px solid red';
  } else {
    element.style.border = '1px solid #CFCFCF';
  }
}