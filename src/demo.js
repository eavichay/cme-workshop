import { 
  LitElement, html
} from '/node_modules/@polymer/lit-element/lit-element.js';

import '/node_modules/cme-ui-components/components/ui-menu.js';
import '/node_modules/cme-ui-components/components/ui-menu-item.js';
import '/node_modules/cme-ui-components/components/controls/ui-menu-group.js';
import '/node_modules/cme-ui-components/components/controls/ui-radio-group.js';
import '/node_modules/cme-ui-components/components/ui-popup.js';
import '/node_modules/cme-ui-components/components/ui-progress.js';
import '/node_modules/cme-ui-components/components/ui-card.js';
import '/node_modules/cme-ui-components/components/fx/quantity-label.js';

class MyDemoCard extends LitElement {

  constructor () {
    super();

    this.someValue = 1e6;
    this.action = 'sell';
    this.status = 'Pending';
    this.progress = 0;
  }

  static get properties () {
    return {
      someValue: {
        type: Number
      },
      action: {
        type: String
      },
      status: {
        type: String
      },
      progress: {
        type: Number
      }
    }
  }

  render () {
    return html`

    <style>
      :host {
        display: inline-block;
        width: 15rem;
      }

      ui-popup {
        float: right;
      }

      #content {
      }

      #progress {
        height: 2rem;
        width: 100%;
      }

      ui-progress {
        width: 100%;
        height: 100%;
      }
    </style>

    <ui-card>
      <div slot="header">
        I'm a real card
        <ui-popup>
            <!-- nice "hamburger" icon for trigger, should be slotted to "trigger" -->
            <i slot="trigger" class="fa fa-bars">Menu</i>
            <!-- content -->
            <ui-menu id="my-menu">
              <label>Amount</label>
              <ui-menu-group>
                <ui-menu-item @selected=${() => this.someValue = 10e6}>10M</ui-menu-item>
                <ui-menu-item @selected=${() => this.someValue = 100e6}>100M</ui-menu-item>
                <ui-menu-item @selected=${() => this.someValue = 500e6}>500M</ui-menu-item>
              <ui-menu-group>
              <label>Action</label>
              <ui-radio-group .value=${this.action} @value-changed=${(event) => this.action = event.detail.value}>
                <ui-menu-item><ui-radio value="buy">Buy</ui-radio></ui-menu-item>
                <ui-menu-item><ui-radio value="sell">Sell</ui-radio></ui-menu-item>
              </ui-radio-group>
          </ui-menu>
        </ui-popup>
      </div>
      <div id="content">
        I want to ${this.action} <quantity-label .value=${this.someValue} formatting="full"></quantity-label>
      </div>
      <div id="action-bar">
        <button @click=${() => this.doSubmit()}>Submit</button>
        <button @click=${() => this.doCancel()}>Cancel</button>
      </div>
      <div id="progress">
        ${this.renderProgressBar()}
      </div>
    </ui-card>
    
    `;
  }

  doSubmit () {
    this.doCancel();
    this.status = 'Processing...';
    this.intervalID = setInterval( () => {
      this.progress += 0.4e6;
      if (this.progress > this.someValue) {
        this.progress = this.someValue;
        this.doCancel();
      }
    }, 1000);
  }

  doCancel () {
    this.status = 'Done';
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }
  }

  renderProgressBar () {
    return html`
    <ui-progress .progress=${this.progress} .minValue=0 .maxValue=${this.someValue}>
      ${this.status}
    </ui-progress>
  `;
  }
}

customElements.define('my-demo-card', MyDemoCard);


















/*





*/



/*



*/




/*




*/