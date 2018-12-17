import { 
  LitElement, html
} from '/node_modules/@polymer/lit-element/lit-element.js';

import '/node_modules/cme-ui-components/components/ui-menu.js';
import '/node_modules/cme-ui-components/components/ui-menu-item.js';
import '/node_modules/cme-ui-components/components/ui-popup.js';
import '/node_modules/cme-ui-components/components/fx/quantity-label.js';

class MyDemoCard extends LitElement {

  constructor () {
    super();

    this.someValue = 1e6;
  }

  static get properties () {
    return {
      someValue: {
        type: Number,
        value: 1e6,
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
        I want to sell <quantity-label .value=${this.someValue} formatting="full"></quantity-label>
        <br/>

        <ui-popup>
            <!-- nice "hamburger" icon for trigger, should be slotted to "trigger" -->
            <i slot="trigger" class="fa fa-bars">Menu</i>
            <!-- content -->
            <ui-menu id="my-menu">
            <ui-menu-item @selected=${() => this.someValue = 10e6}>10M</ui-menu-item>
            <ui-menu-item @selected=${() => this.someValue = 100e6}>100M</ui-menu-item>
            <ui-menu-item @selected=${() => this.someValue = 500e6}>500M</ui-menu-item>
          </ui-menu>
        </ui-popup>

      </div>
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



*/




/*




*/