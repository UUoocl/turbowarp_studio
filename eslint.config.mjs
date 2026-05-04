import js from "@eslint/js";
import globals from "globals";
import esquery from "esquery";
import tseslint from "typescript-eslint";

const reportQueryMatches = (context, ast, selector, message) => {
  const parsedSelector = esquery.parse(selector);
  const matches = esquery.match(ast, parsedSelector);
  for (const match of matches) {
    context.report({
      node: match,
      message,
    });
  }
};

/**
 * Allows creating custom rules that work similar to ESLint's no-restricted-syntax.
 * @param {Array<{selector: string; message: string;}>} rules
 */
const createQueryRule = (rules) => ({
  create: (context) => ({
    Program: (node) => {
      for (const rule of rules) {
        reportQueryMatches(context, node, rule.selector, rule.message);
      }
    },
  }),
});

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        Scratch: "readonly",
      },
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      // Unused variables commonly indicate logic errors
      "no-unused-vars": "off", // Handled by @typescript-eslint/no-unused-vars
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "none",
          caughtErrors: "none",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      // Allow while (true) { }
      "no-constant-condition": [
        "error",
        {
          checkLoops: false,
        },
      ],
      // Allow empty catch {} blocks
      "no-empty": [
        "error",
        {
          allowEmptyCatch: true,
        },
      ],
      // Returning a value from a constructor() implies a mistake
      "no-constructor-return": "error",
      // new Promise(async () => {}) implies a mistake
      "no-async-promise-executor": "warn",
      // x === x implies a mistake
      "no-self-compare": "error",
      // Using ${...} in a non-template-string implies a mistake
      "no-template-curly-in-string": "error",
      // Loops that only iterate once imply a mistake
      "no-unreachable-loop": "error",
      // Detect some untrusted code execution
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-script-url": "error",
      // Combinations of || and && are unreadable and may not do what you expect
      "no-mixed-operators": [
        "error",
        {
          groups: [["&&", "||"]],
        },
      ],
      // Disallow async functions that don't need to be.
      "require-await": "off", // Handled by @typescript-eslint/require-await
      "@typescript-eslint/require-await": "error",

      // Explicit any is discouraged but sometimes needed for library interop
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
  {
    files: ["src/**/*.ts"],
    plugins: {
      extension: {
        rules: {
          "no-new-syntax": createQueryRule([
            {
              selector: 'AssignmentExpression[operator="??="]',
              message: "x ??= y syntax is too new; use x = x ?? y intead",
            },
            {
              selector:
                "MemberExpression[object.name=Object][property.name=hasOwn]",
              message:
                "Object.hasOwn(...) is too new; use Object.prototype.hasOwnProperty.call(...) instead",
            },
          ]),
          "no-xmlhttprequest": createQueryRule([
            {
              selector: "NewExpression[callee.name=XMLHttpRequest]",
              message: "Use Scratch.fetch() instead of XMLHttpRequest",
            },
          ]),
          "use-scratch-vm": createQueryRule([
            {
              selector:
                "MemberExpression[object.name=window][property.name=vm]",
              message: "Use Scratch.vm instead of window.vm",
            },
          ]),
          "use-scratch-fetch": createQueryRule([
            {
              selector: "CallExpression[callee.name=fetch]",
              message: "Use Scratch.fetch() instead of fetch()",
            },
            {
              selector:
                "CallExpression[callee.object.name=window][callee.property.name=fetch]",
              message: "Use Scratch.fetch() instead of window.fetch()",
            },
          ]),
          "use-scratch-open-window": createQueryRule([
            {
              selector: "CallExpression[callee.name=open]",
              message: "Use Scratch.openWindow() instead of open()",
            },
            {
              selector:
                "CallExpression[callee.object.name=window][callee.property.name=open]",
              message: "Use Scratch.openWindow() instead of window.open()",
            },
          ]),
          "use-scratch-redirect": createQueryRule([
            {
              selector:
                "AssignmentExpression[left.object.name=location][left.property.name=href]",
              message: "Use Scratch.redirect() instead of location.href = ...",
            },
            {
              selector:
                "AssignmentExpression[left.object.object.name=window][left.object.property.name=location][left.property.name=href]",
              message:
                "Use Scratch.redirect() instead of window.location.href = ...",
            },
            {
              selector: "AssignmentExpression[left.name=location]",
              message: "Use Scratch.redirect() instead of location = ...",
            },
            {
              selector:
                "AssignmentExpression[left.object.name=window][left.property.name=location]",
              message:
                "Use Scratch.redirect() instead of window.location = ...",
            },
            {
              selector:
                "CallExpression[callee.object.name=location][callee.property.name=assign]",
              message: "Use Scratch.redirect() instead of location.assign()",
            },
            {
              selector:
                "CallExpression[callee.object.object.name=window][callee.object.property.name=location][callee.property.name=assign]",
              message:
                "Use Scratch.redirect() instead of window.location.assign()",
            },
            {
              selector:
                "CallExpression[callee.object.name=location][callee.property.name=replace]",
              message: "Use Scratch.redirect() instead of location.replace()",
            },
            {
              selector:
                "CallExpression[callee.object.object.name=window][callee.object.property.name=location][callee.property.name=replace]",
              message:
                "Use Scratch.redirect() instead of window.location.replace()",
            },
          ]),
          "check-can-fetch": createQueryRule([
            {
              selector: "NewExpression[callee.name=WebSocket]",
              message:
                "Ensure that `await Scratch.canFetch(url)` is checked first, then add // eslint-disable-next-line extension/check-can-fetch",
            },
            {
              selector: "NewExpression[callee.name=Image]",
              message:
                "Ensure that `await Scratch.canFetch(url)` is checked first, then add // eslint-disable-next-line extension/check-can-fetch",
            },
            {
              selector: "NewExpression[callee.name=Audio]",
              message:
                "Ensure that `await Scratch.canFetch(url)` is checked first, then add // eslint-disable-next-line extension/check-can-fetch",
            },
          ]),
        },
      },
    },
    rules: {
      "extension/no-new-syntax": "error",
      "extension/no-xmlhttprequest": "error",
      "extension/use-scratch-vm": "error",
      "extension/use-scratch-fetch": "error",
      "extension/use-scratch-open-window": "error",
      "extension/use-scratch-redirect": "error",
      "extension/check-can-fetch": "error",
    },
  },
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "TurboWarp-extensions-master-repo-for-reference/**",
    ],
  }
);
