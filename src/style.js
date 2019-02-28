export const alignContainer = option => {
  let style = {
    marginRight: 'auto'
  }
  switch (option) {
    case 'left':
      return style
    case 'right':
      return {
        marginLeft: 'auto'
      };
    case 'center':
      return {
        margin: 'auto'
      }
  }
}

export const containerWidth = option => {
  let style = {
    minWidth: 20
  };
  switch (option) {
    case 'full':
      return {
        width: '100%'
      }
    case 'half-page':
      return {
        width: '50%'
      }
    case 'normal':
      return style;
  }
}

export const aligntext = option => ({
  textAlign: option
})

export const textMarginVertical = option => {
  switch (option) {
    case 'large': 
      return 50;
    case 'normal':
      return 30;
    case 'small':
      return 10;
    case 'default':
      return 5;
  }
}

export const textMarginPosition = (option, size) => {
  switch (option) {
    case 'top':
      return {
        paddingTop: size
      };
    case 'bottom':
      return {
        paddingBottom: size
      };
    case 'both':
      return {
        paddingTop: size,
        paddingBottom: size
      }
  }
}