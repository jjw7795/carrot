'use strict';

export default class PopUp{
    constructor(){
 this.popUp = document.querySelector('.pop-up');
 this.popUpRefresh = document.querySelector('.pop-up__refresh');
 this.popUpText = document.querySelector('.pop-up__message');
 this.popUpRefresh.addEventListener('click',()=>{
      this.onClick && this.onClick();
      this.hide();

   })
  }
  setClickListener(onClick){
      this.onClick =onClick;
  }

  showWithText(text){
      this.popUpText.innerText = text;
      this.popUp.classList.remove('pop-up__hide')
  }

  hide(){
      this.popUp.classList.add('pop-up__hide');
  }

}