import View from './View.js';
import icons from 'url:../img/icons.svg';

class paginationView extends View {
  _parentEle = document.querySelector('.pagination');
  addHandleBtn(handler){
      this._parentEle.addEventListener('click',(e)=>{
          const btnClick = e.target.closest('.btn--inline');
          console.log(btnClick);
          if(!btnClick) return;
          const gotoPage = +e.target.dataset.goto;
          console.log(gotoPage);
          handler(gotoPage)
      })
  }
  _generaMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPage
    );
    // page 1
    if (this._data.eachPage === 1 && numPages > 1) {
      return ` <button data-goto="${this._data.eachPage+1}" class="btn--inline pagination__btn--next">
              <span>Page ${this._data.eachPage +1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button>`;
    }
    // last page
    if (this._data.eachPage === numPages && numPages > 1) {
      return `<button data-goto="${this._data.eachPage-1}" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${this._data.eachPage-1}</span>
            </button>`;
    }

    //other page
    if (this._data.eachPage < numPages) {
      return `<button data-goto="${this._data.eachPage-1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._data.eachPage-1}</span>
      </button>
      <button data-goto="${this._data.eachPage+1}" class="btn--inline pagination__btn--next">
        <span>Page ${this._data.eachPage+1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }

    // page 1 and there are no other page
    return '';
  }
}

export default new paginationView();
