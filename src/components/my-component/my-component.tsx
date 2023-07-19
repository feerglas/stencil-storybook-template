import {
  Component,
  // Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
} from '@stencil/core';
import { InterfaceMyComponent } from './my-component.custom.d';

@Component({
  shadow: true,
  styleUrls: {
    default: 'styles/my-component.default.scss',
    shared: 'styles/my-component.shared.scss',
  },
  tag: 'my-component',
})

export class MyComponent {

  /**
   * Create a meaningful description for the properties/attributes.
   * This will be automatically rendered to the documentation.
   */
  @Prop() public firstName: string;

  // @Element() private _element!: HTMLElement;

  @Prop() public variant?: InterfaceMyComponent['variant'] = 'primary';

  /**
   * Create a meaningful description for the event.
   * This will be automatically rendered to the documentation.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'my-component_button-clicked',
  })
  public clicked: EventEmitter<void>;

  /* eslint-disable require-await */
  /**
   * Create a meaningful description for the method.
   * This will be automatically rendered to the documentation.
   */
  @Method()
  public async sampleMethod(): Promise<void> {
    console.log('method called');
  }
  /* eslint-enable require-await */

  @Listen('sample-listener')
  public sampleListenerHandler(event: CustomEvent): void {
    console.log('sample listener event handler', event.target);
  }

  private _buttonClick = (evt: any): void => {
    evt.preventDefault();
    this.clicked.emit();
  };

  public render(): HTMLDivElement {
    return (
      <div class='wrapper'>
        <p class='greeting'>Hello, World! I'm <span class='name'>{this.firstName}</span></p>

        <button
          onClick={this._buttonClick}
          class={this.variant}
        >Button</button>
      </div>
    );
  }
}
