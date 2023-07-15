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
import format from '../../utils/utils';

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
  @Prop() public first: string;

  /**
   * The middle name
   */
  @Prop() public middle: string;

  /**
   * The last name
   */
  @Prop() public last: string;

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

  private _getText(): string {
    return format(this.first, this.middle, this.last);
  }

  private _buttonClick = (evt: any): void => {
    evt.preventDefault();
    this.clicked.emit();
  };

  public render(): HTMLDivElement {
    return (
      <div class='wrapper'>
        <p>Hello, World! I'm <span class='name'>{this._getText()}</span></p>

        <button
          onClick={this._buttonClick}
        >Button</button>
      </div>
    );
  }
}
