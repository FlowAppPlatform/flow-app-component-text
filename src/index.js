import React from 'react';

import AppComponent from 'flow-app-component';

// Text Canvas Styles
import './style.css';

// Programmatically generated styles
import {
  alignContainer, 
  containerWidth,
  aligntext,
  textMarginVertical,
  textMarginPosition,
  displayType,
  alignVertical
} from './style';

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
            {
              id: 'align-container',
              name: 'Align Container',
              type: 'position', 
              options: ['left', 'center', 'right'],
              data: null,
            },
            {
              id: 'container-width',
              name: 'Width',
              type: 'dropdown',
              options: {
                options: [
                  { label: '10%', value: 'ten' },
                  { label: '20%', value: 'twenty' },
                  { label: '30%', value: 'thirty'},
                  { label: '40%', value: 'forty' },
                  { label: '50%', value: 'fifty' },
                  { label: '60%', value: 'sixty'},
                  { label: '70%', value: 'seventy' },
                  { label: '80%', value: 'eighty' },
                  { label: '90%', value: 'ninety'},
                  { label: '100%', value: 'full-page'}
                ]
              },
              data: null,
            },
            {
              id: 'display-type',
              name: 'Component Orientation',
              type: 'dropdown',
              options: {
                options: [
                  { label: 'Horizontal', value: 'inline-block' },
                  { label: 'Vertical', value: 'block' },
                ]
              },
              data: null,
            },
            {
              id: 'align-text',
              name: 'Align Text',
              type: 'align-text', 
              options: ['left', 'right', 'center', 'justify'],
              data: null,
            },
            {
              id: 'vertical-align',
              name: 'Vertical Align',
              type: 'dropdown',
              options: {
                options: [
                  { label: 'Top', value: 'top' },
                  { label: 'Middle', value: 'middle' },
                  { label: 'Bottom', value: 'bottom' },
                ]
              },
              data: null
            },
            {
              id: 'text-margin-vertical',
              name: 'Vertical Margin',
              type: 'dropdown',
              options: {
                options: [
                  { label: 'Default', value: 'default' },
                  { label: 'Small', value: 'small' },
                  { label: 'Normal', value: 'normal' },
                  { label: 'Large', value: 'large' },
                ]
              },
              data: null
            },
            {
              id: 'text-margin-vertical-position',
              name: 'Margin Position',
              type: 'dropdown',
              options: {
                options: [
                  { label: 'Top', value: 'top' },
                  { label: 'Bottom', value: 'bottom' },
                  { label: 'Both', value: 'both' }
                ]
              },
              data: null
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
    if (typeof this.getElementProps().onEvent === 'function') {
      this.getElementProps().onEvent(graphId)
    }
  }

  computeTextStyling = () => {
    let marginSize = this.getPropertyData('text-margin-vertical') 
      ? textMarginVertical(this.getPropertyData('text-margin-vertical').value)
      : 10
    return {
      ...this.getPropertyData('text-margin-vertical-position')
        && textMarginPosition(this.getPropertyData('text-margin-vertical-position').value, marginSize)
    }
  }

  renderContent() {
    const elemProps = this.getElementProps();
    const defaultDisplay = { display: 'block' }
    const defaultWidth = { width: '100%' };
    const defaultVerticalAlign = { verticalAlign: 'top' }

    elemProps.style = Object.assign(this.getDefaultStyle() || {}, {
      color: this.getPropertyData('color') || 'black',
      ...this.getPropertyData('align-container') 
        && alignContainer(this.getPropertyData('align-container')),
      ...this.getPropertyData('container-width')
        && containerWidth(this.getPropertyData('container-width').value) || defaultWidth,
      ...this.getPropertyData('align-text')
        && aligntext(this.getPropertyData('align-text')),
      ...this.computeTextStyling(),
      ...this.getPropertyData('display-type')
        && displayType(this.getPropertyData('display-type').value) || defaultDisplay,
      ...this.getPropertyData('vertical-align')
        && alignVertical(this.getPropertyData('vertical-align').value) || defaultVerticalAlign,
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
      <div 
        className="node"
        {...props}
      >
        {(this.getPropertyData('size') && this.getPropertyData('size').value === 'heading') && (
          <h1
            onMouseOver={() => this.triggerGraphEvent('hover')}
          > {this.getPropertyData('text') || 'Default Text Content'} </h1>
        )}
        {(this.getPropertyData('size') && this.getPropertyData('size').value === 'subheading') && (
          <h3
            onMouseOver={() => this.triggerGraphEvent('hover')}
          > {this.getPropertyData('text') || 'Default Text Content'} </h3>
        )}
        {((this.getPropertyData('size') && this.getPropertyData('size').value === 'normal') ||
          !this.getPropertyData('size')) && (
          <p
          style={{minWidth: 'inherit'}}
            onMouseOver={() => this.triggerGraphEvent('hover')}
          > {this.getPropertyData('text') || 'Default Text Content'} </p>
        )}
      </div>
    );
  }
}

export default TextComponent;
