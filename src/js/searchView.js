class searhView {
  _parentEle = document.querySelector('.search');
    getQuery(){
        const query =  this._parentEle.querySelector('.search__field').value;
        this._clearInput();
        return query;
        
    }
  _clearInput(){
        this._parentEle.querySelector('.search__field').value=''
    }
    addhandle(handler){
        this._parentEle.addEventListener('submit',(e)=>{
            e.preventDefault();
            handler();
           
        })
    }

}

export default new searhView()