import { 
  LitElement, html
} from '/node_modules/@polymer/lit-element/lit-element.js';

import { mixin, DraggableMixin, FancyCloseMixin } from '/node_modules/cme-ui-components/index.js';

import '/node_modules/cme-ui-components/components/ui-card.js';
import '/node_modules/cme-ui-components/components/ui-popup.js';
import '/node_modules/cme-ui-components/components/ui-progress.js';
import '/node_modules/cme-ui-components/components/ui-menu.js';
import '/node_modules/cme-ui-components/components/ui-menu-item.js';
import '/node_modules/cme-ui-components/components/controls/ui-menu-group.js';
import '/node_modules/cme-ui-components/components/controls/ui-radio.js';
import '/node_modules/cme-ui-components/components/controls/ui-radio-group.js';
import '/node_modules/cme-ui-components/components/controls/ui-checkbox.js';
import '/node_modules/cme-ui-components/components/fx/quantity-input.js';
import '/node_modules/cme-ui-components/components/fx/quantity-label.js';

const instruments = []


class MyDemoCard extends mixin(DraggableMixin, FancyCloseMixin)(LitElement) {

  constructor () {
    super();
    this.committedValue = 1e6;
    this.committedProgress = 0;
    this.title = 'Awesome Card';
  }

  render () {
    return html`
      <style>
        @import url("/node_modules/cme-ui-components/styles/fonts/fa/fontawesome.css");
        @import url("/node_modules/cme-ui-components/styles/base.css");

        :host {
          background: white;
          display: inline-flex;
          flex-direction: column;
          width: 450px;
          display: inline-block;
        }

        .full-size {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
        }

        #card-content {
          padding: 0.5rem;
        }

        button {
          float: right;
        }

        ui-radio-group {
          display: flex;
          flex-direction: column;
        }

        [slot="header"] {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
        }

        ui-progress {
          width: 100%;
          font-size: 14px;
          text-align: center;
          font-style: italic;
        }

      </style>
      <ui-card @collapsed-changed=${() => this.requestUpdate()}>
        <div slot="header">
          <span>${this.title}</span>
          <ui-popup>
            <span slot="trigger">Menu</span>
            <div id="menu">
              ${this.renderMenu()}
            </div>
          </ui-popup>
        </div>
        <div id="card-content">
          <input is="quantity-input"
            .quantity=${this.committedValue}
            @quantity-changed="${(event) => this.handleQuantityChanged(event.target)}"
            stepsize="1000000"
            formatting="full" />
          Committed value:
          <quantity-label .value=${this.committedValue}></quantity-label>
          <br/>
          <div>
            <br/>
            <button @click=${() => this.gogogo()}>Go Go Go</button>
            <br/>
            <br/>
          </div>
          <div>
            <ui-progress .minValue=0 .maxValue=${this.committedValue} .progress=${this.committedProgress}>
              Progress
              <quantity-label .value=${this.committedProgress}></quantity-label> / <quantity-label .value=${this.committedValue}></quantity-label>
            </ui-progress>
          </div>
          <!--
          <ui-progress class="full-size" .minValue=0 .maxValue=${this.committedValue} .progress=${this.committedProgress}></ui-progress>-->
        </div>
      </ui-card>
    `;
  }

  renderMenu () {
    return html`
      <ui-menu>
        <ui-menu-item @selected=${() => this.setValue(1e6)}>Reset Value</ui-menu-item>
        <ui-menu-item @selected=${() => this.setValue(10e6)}>Put 10M</ui-menu-item>
        <ui-menu-group>
          <ui-radio-group value="10" @value-changed=${(evt) => this.setValue(parseInt(evt.detail.value) * 1e6)}>
            <ui-radio value="10">10M</ui-radio>
            <ui-radio value="50">50M</ui-radio>
            <ui-radio value="75">75M</ui-radio>
          </ui-radio-group>
        </ui-menu-group>
        <ui-menu-item @selected=${() => this.remove()}>Remove</ui-menu-item>
      </ui-menu>
    `;
  }

  firstUpdated () {
    this.cardElement = this.shadowRoot.querySelector('ui-card');
  }

  setValue (number) {
    this.title = 'Awesome Card';
    clearInterval(this.interval);
    this.committedValue = number;
    this.committedProgress = 0;
    this.requestUpdate();
  }

  gogogo () {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.committedProgress = 0;
    this.title = 'In Progress...';
    this.interval = setInterval( () => {
      this.committedProgress += Math.random() * this.committedValue / 10;
      if (this.committedProgress >= this.committedValue) {
        clearInterval(this.interval);
        this.committedProgress = this.committedValue;
        this.title = 'Done';
        this.requestUpdate();
      }
      this.requestUpdate();
    }, 500);
  }

  handleQuantityChanged (quantityInputElement) {
    this.committedValue = quantityInputElement.quantity;
    this.requestUpdate();
  }


}

customElements.define('my-demo-card', MyDemoCard);