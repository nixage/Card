import { Component, OnInit } from '@angular/core';

import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { dateValidator } from '../validators/date-validator';

import { fadeAnimation, fadeHeightAnimation } from '../animation/anim.fade';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [fadeAnimation, fadeHeightAnimation]
})
export class CardComponent implements OnInit {

  cardLogoVisa:boolean = false;
  cardLogoMasterCard:boolean = false;
  cardErrors: boolean = false;

  randomLists: Array<number>;
  cvvCode:string = '';
  keyBoardActive: boolean = false;

  cardForms: FormGroup;
  submitedForm: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.initForm()
    this.cardForms.valueChanges.subscribe( data => {
      this.getErrorForms()
    })
  }

  initForm(){
    this.cardForms = new FormGroup({
      cardNumber: new FormArray([
        new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern(/^4|5/)],),
        new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)],),
        new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)],),
        new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)],)
      ]),
      date: new FormControl('', [dateValidator, Validators.required, Validators.maxLength(5), Validators.minLength(5)]),
      cvv: new FormControl(''),
    });
  }

  get getCardNumber() {
    return this.cardForms.get('cardNumber') as FormArray;
  }

  get getCardDate(): FormControl{
    return this.cardForms.get('date') as FormControl
  }

  getErrorForms(){
    this.cardErrors = false;
    this.getCardNumber.controls.forEach( el => {
      if (el.errors && el.touched && !el.hasError('pattern')){
        this.cardErrors = true;
        return
      }
    })
    if(!this.cardErrors){
      this.cardErrors = false;
    }
  }

   /* ==================================FRON CARD ================================== */
  /* METHOD VALIDATE NUMBER IN CARD */
  setCaretEndPosition(e):void{
    const target:HTMLInputElement = e.target as HTMLInputElement;
    setTimeout( ()=> {
      target.selectionStart = target.selectionEnd = 10000;
    },0)
    return
  }

  checkValidNumber(event:InputEvent):void{
    const target:HTMLInputElement = event.target as HTMLInputElement;

    this.replaceIfNotNumber(target)

    if (target.value.length > 4){
      target.value = '';
      return
    }
    if(target.value.length === 4){
      this.focusNextElement(target)
    }
  }

  replaceIfNotNumber(target:HTMLInputElement):void{
    target.value = target.value.replace(/\D/, '')
  }

  focusNextElement(element: HTMLInputElement):void{
    const nextElement:HTMLInputElement = element.nextElementSibling as HTMLInputElement;
    if(nextElement !== null && nextElement.nodeName === 'INPUT'){
      if(!nextElement.value.length){
        nextElement.focus()
      }
    }
  }
  /* METHOD VALIDATE NUMBER IN CARD */

  /* METHOD VALIDATE DATE IN CARD */
  checkValidDate(event:InputEvent): void{
    const target = event.target as HTMLInputElement;
    if(target.value.length > 5){
      target.value = '';
      return
    }
    if((/\D/).exec(event.data) && event.data !== null){
      target.value = target.value.slice(0,-1)
    }

    const isMonth = (/^\d\d$/).exec(target.value);
    if(isMonth && event.inputType !== 'deleteContentBackward'){
      target.value = target.value + "/";
    }
  }
  /* METHOD VALIDATE DATE IN CARD */

  showBackCard(){
    this.cardForms.get('cvv').setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(3)]);
    this.cardForms.get('cvv').updateValueAndValidity()
  }
  /* ==================================FRON CARD ================================== */

  /* ==================================BACK CARD ================================== */

  showFrontCard(){
    this.cardForms.get('cvv').enable()
    this.cardForms.get('cvv').clearValidators()
    this.cardForms.get('cvv').updateValueAndValidity();
    this.randomLists = [];
    this.keyBoardActive = false;
  }

  openKeyBoard(event:FocusEvent){
    const target = event.target as HTMLInputElement;
    if (this.keyBoardActive){
      target.blur()
      return
    }
    target.blur();
    this.cardForms.get('cvv').setValue('')
    this.keyBoardActive = true;
    this.randomNumber()
  }

  addCvvCode(num: number){
    this.cvvCode += num;
    this.cardForms.get('cvv').setValue(this.cvvCode)
    if(this.cvvCode.length === 3){
      this.randomLists = [];
      this.keyBoardActive = false;
      this.cardForms.get('cvv').enable();
      this.cvvCode = ''
      return
    }
    this.randomNumber()
  }

  removeNumber(){
    this.cvvCode = this.cvvCode.slice(0,-1)
    this.cardForms.get('cvv').setValue(this.cvvCode)
  }

  submitForm(){
    if (this.cardForms.invalid){return}
    this.initForm();
    this.submitedForm = true;
    setTimeout( () => {
      this.submitedForm = false;
    }, 3000)
    
  }

  randomNumber() {
    const arr = [];
    while(arr.length < 10){
      const randNum = Math.floor(0 + Math.random() * (9 + 1 - 0))
      if(arr.indexOf(randNum) == -1){
        arr.push(randNum)
      }
    }
    this.randomLists = arr;
  }
  /* ==================================BACK CARD ================================== */

}
