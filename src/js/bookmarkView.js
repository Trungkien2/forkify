import View from './View.js';
import icons from 'url:../img/icons.svg';
class bookMarkView extends View {
  _parentEle = document.querySelector('.bookmarks__list');
  _generaMarkup() {
    return this._data.map(this._generaMarkupPreview).join('');
  }

  _generaMarkupPreview(result){
    const id = window.location.hash.slice(1);
      return ` <li class="preview">
      <a class="preview__link ${result.id===id ? "preview__link--active" : ""}" href="#${result.id}">
        <figure class="preview__fig">
          <img src="${result.image}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>`;
  }
}

export default new bookMarkView();
