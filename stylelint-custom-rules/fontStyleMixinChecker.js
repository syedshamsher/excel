const stylelint = require('stylelint');

const ruleName = 'custom/font-style-mixin-checker';

// this function will find the hard-coded value given in font-styles mixin
// and also check for misplaced values ie. $font-weight-md given for line-height property

module.exports = stylelint.createPlugin(ruleName, (enabled) => {
  return (root, result) => {
    if (!enabled) {
      return;
    }

    root.walkAtRules('include', (node) => {
      if (node.params.includes('font-styles')) {
        const mixin = parseMixin(node.params);
        if (mixin.length) {
          for (let i = 0; i < mixin.length; i++) {
            const style = mixin[i]?.trim();
            if (style && style[0] !== '$') {
              handleNonVariableStyle(style, i, mixin, result, node);
            } else if (style) {
              handleVariableStyle(style, i, result, node);
            }
          }
        }
      }
    });
  };
});

module.exports.ruleName = ruleName;

function parseMixin(params) {
  const cleanedParams = params
    .replace('font-styles', '')
    .replace(/\(|\)/g, '') // Remove parentheses
    .split(',')
    .map((item) => item.trim());

  return cleanedParams;
}

function triggerError(message, result, node) {
  stylelint.utils.report({
    ruleName,
    message,
    result,
    node,
  });
}

function handleNonVariableStyle(style, index, mixin, result, node) {
  // inherit in line-height, none in color is allowed
  if ((index === 2 && style !== 'inherit') || (index === 3 && style !== 'none')) {
    const errorMessage = `${style} in ${JSON.stringify(mixin)} is not allowed.`;
    triggerError(errorMessage, result, node);
  }
}

function isInvalidStyle(style, validKey) {
  return !style.includes(validKey);
}

function handleVariableStyle(style, index, result, node) {
  const invalidStyles = {
    0: 'size',
    1: 'weight',
    2: 'line',
  };

  if (index in invalidStyles && isInvalidStyle(style, invalidStyles[index])) {
    const errorMessage = `${style} is given for ${
      invalidStyles[index] === 'line' ? 'line-height' : `font-${invalidStyles[index]}`
    }.`;
    triggerError(errorMessage, result, node);
  }
}
