export class CardArea{
  constructor(elementsArray) {
    this.elementsArray = elementsArray;
    this.childWidth = 193;
    this.childHeight = 260;
    this.currentWidth = 1;
    this.currentMaxHeight = 1;
    this.columnsNumber = 1;
    this.rowsNumber = 1;
    this.maxChildrens = 1;
    this.currentPage = 1;
    this.pagesNumber = 1; 
  }

  create() {
    const cardArea = document.createElement("div");
    cardArea.classList.add("card_area");

    this._injectChilds(cardArea)
    
    this.resizeObserver.observe(cardArea);
    return cardArea
  }



  resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      const maxChildrens = this.maxChildrens;
      this._setElementWidth(entry);
      this._updateColumnsNumber();
      const style = window.getComputedStyle(entry.target);
      if (style) {
        this._setElementMaxWidth(entry);
        this._updateRowsNumber();
      }
      this._setMaxChildrens();
      if (this.maxChildrens !== maxChildrens) {
        console.log("update")
        this._setGridTemplateStyle(entry);
        this._updateCardAreaChilds();
      }
    }
  });
  
  _updateCardAreaChilds() {
    const cardArea = document.querySelector(".card_area");
    cardArea.innerHTML = "";
    this._injectChilds(cardArea);
  }

  _injectChilds(parent) {
    for (let child = 0; child < this.maxChildrens; child++) {
      if (child < this.elementsArray.length) {
        parent.appendChild(this.elementsArray[child]);
      }
    }
  }

  _setElementWidth(element) {
    this.currentWidth = element.contentRect.width;
    return this.currentWidth
  }

  _updateColumnsNumber() {
    this.columnsNumber = Math.floor(this.currentWidth/this.childWidth)
    return this.columnsNumber
  }

  _setElementMaxWidth(element) {
    const style = window.getComputedStyle(element.target)
    if (style) {
      this.currentMaxHeight = style.getPropertyValue('max-height').match(/\d+/g).map(Number)[0];
      return  this.currentMaxHeight     
    }
  }

  _setGridTemplateStyle(element) {
    element.target.style.gridTemplateColumns = `repeat(${this.columnsNumber}, auto)`;
    element.target.style.gridTemplateRowns = `repeat(${this.rowsNumber}, auto)`;
  }

  _updateRowsNumber() {
    this.rowsNumber = Math.floor(this.currentMaxHeight/this.childHeight)
    return this.rowsNumber
  }

  _updateMaxChildrens() {
    this.maxChildrens = this.columnsNumber * this.rowsNumber;
  }

  _setMaxChildrens() {
    this.maxChildrens = this.columnsNumber * this.rowsNumber;
  }
}