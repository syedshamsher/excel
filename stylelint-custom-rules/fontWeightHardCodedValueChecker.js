const stylelint = require('stylelint');

const ruleName = 'custom/font-weight-scss-variable';

const message = 'Found hardcoded font-weight value, use SCSS variable instead.';

// it's not being used yet kept as a reference to create custom rules.
// it will find all the hard-coded value given for font-weight (other than $font-weight-*, $fontweight)

function rule() {
  return (root, result) => {
    root.walkDecls('font-weight', (decl) => {
      const value = decl.value.trim(); // Remove whitespace

      // Define a regular expression pattern to match SCSS variables with the prefix $font-weight-
      const scssVariablePattern = /^(\$font-weight-|\$fontweight)[a-zA-Z0-9_-]+$/;

      // Check if the value matches the pattern
      if (!scssVariablePattern.test(value)) {
        stylelint.utils.report({
          ruleName,
          result,
          node: decl,
          message,
        });
      }
    });
  };
}

module.exports = stylelint.createPlugin(ruleName, rule);
module.exports.ruleName = ruleName;
