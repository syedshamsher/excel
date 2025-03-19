const stylelint = require('stylelint');

const ruleName = 'custom/no-ant-prefix';

module.exports = stylelint.createPlugin(ruleName, (enabled) => {
  return (root, result) => {
    if (!enabled) {
      return;
    }

    root.walkRules((rule) => {
      rule.selectors.forEach((selector) => {
        if (selector.includes('.ant-')) {
          stylelint.utils.report({
            ruleName,
            result,
            node: rule,
            message: `Class name "${selector}" contains ".ant-". (please avoid using ant overrides)`,
          });
        }
      });
    });
  };
});

module.exports.ruleName = ruleName;
