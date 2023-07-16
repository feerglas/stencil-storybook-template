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

@Component({
  shadow: true,
  styleUrl: 'my-component.scss',
  tag: 'my-component',
})

export class MyComponent {

  /**
   * Create a meaningful description for the properties/attributes.
   * This will be automatically rendered to the documentation.
   */
  @Prop() public firstName: string;

  // @Element() private _element!: HTMLElement;

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
        <p>Hello, World! I'm <span class='name'>My name iiss {this.firstName}</span></p>

        <button
          onClick={this._buttonClick}
        >Button</button>
      </div>
    );
  }
}
