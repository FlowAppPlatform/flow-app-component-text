import React from 'react';

import AppComponent from 'flow-app-component';

// Text Canvas Styles
import './style.css';

class TextComponent extends AppComponent {
  static properties = {
    iconUrl: '/assets/images/text-component.png',
    name: 'Text',
    type: 'ui-component',
    componentType: 'text',
    category: 'Views',
    parent: null,
    allowsChildren: false
  };

  constructor() {
    super();
    const newState = {
      properties: [
        {
          categoryName: 'General',
          categoryDescription: 'Basic settings for text.',
          properties: [
            {
              id: 'text',
              name: 'Text',
              type: 'text',
              options: {},
              data: null,
            },
          ],
        },
        {
          categoryName: 'Style',
          categoryDescription: 'Change style of the text component',
          properties: [
            {
              id: 'color',
              name: 'Color',
              type: 'color',
              options: {},
              data: null,
            },
            {
              id: 'size',
              name: 'Size',
              type: 'dropdown', // this would render as input box as properties panel on the right.
              options: {
                values: [
                  { text: 'Heading', value: 'heading' },
                  { text: 'Sub Heading', value: 'subheading' },
                  { text: 'Normal', value: 'normal' },
                ],
              },
              data: null,
            },
          ],
        },
        {
          categoryName: 'Events',
          categoryDescription: 'Events for the text component',
          properties: [
            {
              id: 'event',
              name: 'Events',
              type: 'graph',
              options: {},
              data: null,
            },
          ],
        },
      ],

      ...TextComponent.properties
    };

    this.state = Object.assign(this.state, newState); // merge two states together, and dont lose any parent state properties.
  }

  renderContent() {
    const elemProps = this.getElementProps();
    elemProps.style = Object.assign(this.getDefaultStyle() || {}, {
      color: this.getPropertyData('color') || 'black',
    });
    return (
      <div className="node" {...elemProps}>
        {this.getPropertyData('size') === 'heading' && (
          <h1> {this.getPropertyData('text') || 'Default Text Content'} </h1>
        )}
        {this.getPropertyData('size') === 'subheading' && (
          <h3> {this.getPropertyData('text') || 'Default Text Content'} </h3>
        )}
        {(this.getPropertyData('size') === 'normal' ||
          !this.getPropertyData('size')) && (
          <p> {this.getPropertyData('text') || 'Default Text Content'} </p>
        )}
      </div>
    );
  }
}

export default TextComponent;