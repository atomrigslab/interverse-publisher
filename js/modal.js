class AtomrigsModal extends HTMLElement {
  isOpen = false;
  onHideCallback = null;
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  open(onShownCallback, onHideCallback = null) {
    this.isOpen = true;
  
    this.render();
  
    const modalElm = this.shadowRoot.querySelector('.modal');
    modalElm.addEventListener(
      "animationend",
      onShownCallback ? onShownCallback : () => {},
      false
    );

    this.onHideCallback = onHideCallback;
  }

  hide() {
    this.isOpen = false;
    if (this.onHideCallback) {
      this.onHideCallback();
    }
    this.render();
  }

  render() {
    const height = this.getAttribute('height') || '300px';
    const style = `
      .modal-background {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        position: fixed;
        top: 0;
        left: 0;
        display: ${this.isOpen ? 'block' : 'none'};
        z-index: 9998;
      }
      
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        display: ${this.isOpen ? 'flex' : 'none'};
        justify-content: center;
        align-items: center;
        width: ${this.getAttribute('width') || '300px'};
        height: ${height};
        background-color: ${this.getAttribute('bgColor') || '#fff'};
        box-sizing: border-box;
        z-index: 9999;
        animation-name: show-modal;
        animation-duration: 0.2s;
        animation-timing-function: ease;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
      }

      @keyframes show-modal {
        0% {
          opacity: 0;
          transform: scale(0.80, 1) translateY(0);
        }
        100% {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      .modal-header {
        width: 100%;
        min-height: 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: end;
        padding: 0rem 0.5rem;
      }

      .modal-content {
        width: 100%;
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .modal-footer {
        width: 100%;
        min-height: 20px;
        background-color: transparent;
        box-sizing: border-box;
        text-align: center;
        padding: 1rem 0rem;
      }

      .circle-btn-close {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        border: 1px solid white;
        border-radius: 50px;
        padding: 8px;
        background: transparent;
        text-decoration: none;
      }
  
      .btn-close-icon {
        width: 100%;
        height: 100%;
      }
    `;
    // https://codeshack.io/pure-css3-modal-example/
    this.shadowRoot.innerHTML = `
      <style>
        ${style}
      </style>
      <div for="modal" class="modal-background"></div>
      <div class="modal">
        <div class="modal-container">
          <div class="modal-content">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="circle-btn-close">
              <img src="../assets/mobile/icon-close.svg" alt="" class="btn-close-icon" />
            </button>
          </div>
        </div>
      </div>
    `;

    const hideFunc = () => {
      this.hide();
    };

    this.shadowRoot.querySelector('.modal-background')
    .addEventListener('click', hideFunc);

    const elm = this.shadowRoot.querySelector('.circle-btn-close');
    elm.addEventListener('click', hideFunc);
  }

  connectedCallback() {
    this.render();
  }
};

customElements.define('atomrigs-modal', AtomrigsModal);