export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._listForRendering = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  appendItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._listForRendering.forEach((item) => {
      this._renderer(item);
    });
  }
}
