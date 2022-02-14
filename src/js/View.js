import icons from 'url:../img/icons.svg';

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.handleEroor('no query for your search');
    this._data = data;
    const markup = this._generaMarkup();
    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
  
    this._data = data;
    const newMarkup = this._generaMarkup();
    const newDOm = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDOm.querySelectorAll('*'));
    const currElement = Array.from(this._parentEle.querySelectorAll('*'));
    newElement.forEach((newEle, i) => {
      const currEle = currElement[i];
      // updatetae changed text 
      if (!newEle.isEqualNode(currEle) && newEle.firstChild?.nodeValue !== '') {
        currEle.textContent = newEle.textContent;
      }

      // update changed atrribute
      if(!newEle.isEqualNode(currEle)){
        Array.from(newEle.attributes).forEach(attbs=>currEle.setAttribute(attbs.name,attbs.value))
      }
    });
  }
  _clear() {
    this._parentEle.innerHTML = '';
  }
  loadingSpinner = () => {
    const htmls = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._clear();
    this._parentEle.innerHTML = htmls;
  };

  handleEroor(error) {
    const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}_icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${error}</p>
          </div>`;

    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', markup);
  }
}
