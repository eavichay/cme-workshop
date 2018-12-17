import { 
  LitElement, html
} from '/node_modules/@polymer/lit-element/lit-element.js';

class MyDemoCard extends LitElement {

  constructor () {
    super();
  }

  render () {
    return html`<h1>Welcome to CME Workstation Workshop!</h1>`;
  }
}

customElements.define('my-demo-card', MyDemoCard);