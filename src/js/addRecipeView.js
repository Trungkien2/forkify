import View from './View.js';
import icons from 'url:../img/icons.svg';
class addRecipeView extends View {
  _parentEle = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  
  constructor(){
      super();
      this._addhandlerShowindow();
      this._addHandlerHideWindow()
  }
  toogleWindow(){
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addhandlerShowindow(){
      this._btnOpen.addEventListener('click',this.toogleWindow.bind(this))
  }

  _addHandlerHideWindow(){
    this._btnClose.addEventListener('click',this.toogleWindow.bind(this))
    this._overlay.addEventListener('click',this.toogleWindow.bind(this))
  }

  addhandlerUpload(handler){
      this._parentEle.addEventListener('submit',function(e){
          e.preventDefault();
          const dataArr = [...new FormData(this)];
          const data = Object.fromEntries(dataArr); 
          handler(data)
      })
  }
  _generaMarkup() {
  
  }


  
}

export default new addRecipeView();
