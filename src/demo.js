import { 
  LitElement, html
} from '/node_modules/@polymer/lit-element/lit-element.js';



class MyDemoCard extends LitElement {

  constructor () {
    super();

    this.someValue = 100;
  }

  static get properties () {
    return {
      someValue: {
        type: Number,
        value: 100,
      }
    }
  }

  render () {
    return html`

    <style>
      :host {
        display: inline-block;
        width: 15rem;
        height: 25rem;
        border: 1px solid black;
        border-radius: 0.5rem;
      }
    </style>
    
    <h1>I'm a web component</h1>
    <div>
        My value is ${this.someValue}
        <br/>
        <button
          @click=${() => this.someValue *= 2}>Change my value</button>
    </div>


    
    `;
  }

  onMenuItemSelected (event) {
    this.someValue = event.detail;
  }
}

customElements.define('my-demo-card', MyDemoCard);


















/*





*/



/*

import '/node_modules/cme-ui-components/components/ui-menu.js';
import '/node_modules/cme-ui-components/components/ui-menu-item.js';

*/




/*

    <div id="menu">
      <ui-menu @selected=${(event) => {this.onMenuItemSelected(event)}}>
        <ui-menu-item value="10">Item 1</ui-menu-item>
        <ui-menu-item value="100">Item 2</ui-menu-item>
        <ui-menu-item value="500">Item 3</ui-menu-item>
      </ui-menu>
    </div>


*/