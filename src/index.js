import React from 'react';

import AppComponent from 'flow-app-component';

// Text Canvas Styles
import './style.css';

class TextComponent extends AppComponent {
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
              id: 'load',
              name: 'Load Event',
              type: 'graph',
              options: {},
              data: null,
            },
            {
              id: 'hover',
              name: 'Hover Event',
              type: 'graph',
              options: {},
              data: null,
            },
          ],
        },
      ],
      iconUrl: '/assets/images/text-component.png',
      name: 'Text',
      type: 'ui-component',
      componentType: 'text',
      category: 'Views',
      parent: null,
      allowsChildren: false,
    };

    this.state = Object.assign(this.state, newState); // merge two states together, and dont lose any parent state properties.
  }

  componentDidMount() {
    this.triggerGraphEvent('load')
  }

  triggerGraphEvent = (eventId) => {
    const graphId = this.getPropertyData(eventId);
    this.getElementProps().onEvent(graphId)
  }

  renderContent() {
    const elemProps = this.getElementProps();
    elemProps.style = Object.assign(this.getDefaultStyle() || {}, {
      color: this.getPropertyData('color') || 'black',
    });
      //Filter out unwanted props
      const {
          parentId,
          componentType,
          componentData,
          isDragging,
          canAcceptDrop,
          hasChildren,
          getComponent,
          getComponentType,
          getComponentPropertyData,
          setPropertyData,
          moveUI,
          moveInto,
          setHoverObject,
          hoverObject,
          ...props
      } = elemProps;
    return (
      <div className="node" {...props}>
        {this.getPropertyData('size') === 'heading' && (
          <h1 
            onMouseOver={() => this.triggerGraphEvent('hover')}
          > {this.getPropertyData('text') || 'Default Text Content'} </h1>
        )}
        {this.getPropertyData('size') === 'subheading' && (
          <h3
            onMouseOver={() => this.triggerGraphEvent('hover')}
          > {this.getPropertyData('text') || 'Default Text Content'} </h3>
        )}
        {(this.getPropertyData('size') === 'normal' ||
          !this.getPropertyData('size')) && (
          <p
            onMouseOver={() => this.triggerGraphEvent('hover')}
          > {this.getPropertyData('text') || 'Default Text Content'} </p>
        )}
      </div>
    );
  }
}

export default TextComponent;
