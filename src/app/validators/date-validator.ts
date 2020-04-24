import { AbstractControl } from '@angular/forms'

export function dateValidator( control: AbstractControl ): { [key: string]: any } | null {

  const value = control.value
  const creditCardYear = Math.floor(parseInt('20'.concat(control.value.slice(-2)).trim()));
  const creditCardMonth = Math.floor(parseInt(value.slice(0,2).trim()));

  if (value.length < 5){
    return { dataInvalid: { valid: false, value: value}}
  }
  // IF YEAR < 20
  if(value.slice(-2) < 20){
    console.log(value.slice(-1))
    return { dataInvalid: { year: false, value: value}}
  }
  // IF MONTH INCORRECT
  if(creditCardMonth > 12 ){
    return { dataInvalid: { valid: false, value: value}}
  }
  // IF YEAR INCORRECT
  if(!creditCardYear){
    return { dataInvalid: { valid: false, value: value}}
  }

  const currentDateString = Math.floor(new Date().getTime() / 10000);
  const creditCardExpiryDateString = Math.floor(new Date(creditCardYear, creditCardMonth - 1).getTime() / 10000);
  // IF CREDIT CARD EXPIRY
  if(currentDateString > creditCardExpiryDateString){
    return { dataInvalid: { valid: false, value: value}}
  }
  return null
}