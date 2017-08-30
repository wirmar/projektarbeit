class MyApp extends Polymer.Element {
  static get is() {
    return 'my-app';
  }
}

window.customElements.define(MyApp.is, MyApp);
