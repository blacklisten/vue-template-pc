// rules: 0 -> off  1 -> waring  2 -> error
<%_ if (options.tools.includes('typescript')) { _%>
const tsRule = {
  // ts相关
  // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin
  // 可以使用any类型
  '@typescript-eslint/no-explicit-any': 0,
  // 允许存在无函数体的函数
  '@typescript-eslint/no-empty-function': 0,
  // 可以使用require，主要在webpack配置中
  '@typescript-eslint/no-var-requires': 0,
  // 忽略接口名以I开头
  '@typescript-eslint/interface-name-prefix': 0,
  // 取消函数需要返回值
  '@typescript-eslint/explicit-function-return-type': 0,
  // 接口和类型文字需要特定的成员定界符样式
  '@typescript-eslint/member-delimiter-style': 2,
  '@typescript-eslint/prefer-regexp-exec': 0,
  'prefer-spread': 0
}
<%_ } _%>

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    <%_ if (options.tools.includes('typescript')) { _%>
    '@vue/typescript/recommended',
    '@vue/prettier/@typescript-eslint',
    <%_ } _%>
    '@vue/prettier',
    'plugin:vue/recommended',
    'plugin:vue/essential',
  ],
  <%_ if (options.tools.includes('typescript')) { _%>
  'overrides': [
    {
      'files': [
        'src/**/*.{ts,tsx}',
        'utils/*.ts'
      ],
      'extends': [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      'plugins': ['@typescript-eslint'],
      'rules': {
        ...tsRule
      },
      'parser': 'vue-eslint-parser',
      'parserOptions': {
        'ecmaFeatures': { 'jsx': true },
        'parser': '@typescript-eslint/parser',
        'tsconfigRootDir': __dirname,
        'project': './tsconfig.json'
      }
    }
  ],
  <%_ } else { _%>
  "parserOptions": {
    "parser": "babel-eslint",
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  <%_ } _%>
  plugins: ['prettier', 'vue'],
  globals: {},
  rules: {
    'prettier/prettier': 'off',
    // --- vue相关 ---
    // https://eslint.vuejs.org/rules/max-attributes-per-line.html
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 3,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    // 标签的右括号之前要求换行
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'always'
    }],
    // 标签内无内容时自闭合
    'vue/html-self-closing': ['error', {
      'html': {
        'void': 'never',
        'normal': 'always',
        'component': 'always'
      },
      'svg': 'always',
      'math': 'always'
    }],
    // 标签名使用中划线连接
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      'registeredComponentsOnly': true, // 仅检查已注册的组件
      'ignores': []
    }],
    // 禁止在计算属性中使用异步方法
    'vue/no-async-in-computed-properties': 2,
    // 禁止重复字段名称
    'vue/no-dupe-keys': 2,
    // 单行元素内容换行规则
    'vue/singleline-html-element-content-newline': 0,
    // name命名使用中划线
    'vue/name-property-casing': [2, 'kebab-case'],
    // 允许使用v-html
    'vue/no-v-html': 'off',
    // 禁止重复属性名(除了class和style)
    'vue/no-duplicate-attributes': [
      2,
      {
        allowCoexistClass: true,
        allowCoexistStyle: true
      }
    ],
    // 一致的缩进风格
    'vue/html-indent': [
      2,
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    // eslint相关
    // https://cn.eslint.org/docs/rules/
    // 允许使用异步函数作为Promise executor
    'no-async-promise-executor': 0,
    // 禁止在没有类型检查操作符的情况下与 null 进行比较(使用 a === null 或 a !== null)
    'no-eq-null': 2,
    // 禁用不必要的 return await
    'no-return-await': 2,
    // no-extra-semi
    'no-extra-semi': 2,
    // 禁止使用不带 await 表达式的 async 函数
    'require-await': 2,
    // 禁止将 undefined 作为标识符(比如var foo = undefined; if (foo === undefined);) -> 忽略
    'no-undefined': 0,
    // 该规则强制数组开括号后和闭括号前不需要空格[1, 2, 3]
    'array-bracket-spacing': [2, 'never'],
    // 代码块前后空格(function foo() { return true; })
    'block-spacing': [2, 'always'],
    // 允许代码块的开闭大括号位于同一行, 且开大括号不换行
    'brace-style': [
      2,
      '1tbs',
      {
        allowSingleLine: true
      }
    ],
    // 要求使用扩展运算符而非 .apply() -> 忽略
    'prefer-spread': 0,
    // 在对象和数组文字中，当最后一个元素或属性与闭括号 ] 或 } 在 不同的行时，允许（但不要求）使用拖尾逗号；当在 同一行时，禁止使用拖尾逗号
    // https://cn.eslint.org/docs/rules/comma-dangle
    'comma-dangle': [2, 'only-multiline'],
    // 逗号前面不允许空格，后面加空格
    'comma-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    // 在数组，对象和变量声明中强制使用一致的逗号样式，位于行末
    'comma-style': [2, 'last'],
    // 禁止在计算属性内使用空格(像这样：obj[foo ]; var x = {[ b ]: a}是不好的)
    'computed-property-spacing': 2,
    // 禁止在函数调用时函数名和开括号之间有空格
    'func-call-spacing': 2,
    // 文件末尾加换行
    'eol-last': 2,
    // 要求使用 === 和 !==
    eqeqeq: [
      2,
      'always',
      {
        null: 'ignore'
      }
    ],
    // 对象字面量键和值之间使用一致的空格(冒号后加空格，前面不能有空格)
    'key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    // 关键字前后加空格(行首的关键字前面不需要加空格)
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    // 强制注释周围有空行
    'lines-around-comment': [
      2,
      {
        beforeBlockComment: true, // 要求在块级注释之前有一空行 /* ------- */
        beforeLineComment: false // 要求在行级注释之前有一空行 // ---------
      }
    ],
    // 要求在类成员之间出现空行
    'lines-between-class-members': [
      2,
      'always',
      {
        exceptAfterSingleLine: true // 跳过对单行类的检测
      }
    ],
    // 禁止使用多个空格
    'no-multi-spaces': 2,
    // 禁止出现多行空行，最多一行空行
    'no-multiple-empty-lines': [
      2,
      {
        max: 1
      }
    ],
    // 函数调用之间不需要空格
    'no-spaced-func': 2,
    // // 抛出异常时禁止使用字面量(throw 2)
    // 'no-throw-literal': 2,
    // 禁用行尾空格
    'no-trailing-spaces': 2,
    // 不允许初始化变量值为 undefined
    'no-undef-init': 2,
    // 禁止出现未使用过的变量
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'none'
      }
    ],
    // 禁止属性前有空白
    'no-whitespace-before-property': 2,
    // 强制操作符使用一致的换行符,要求把换行符放在操作符后面
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }
    ],
    // 要求或禁止块内填充(代码块首行之前、末行之后不许有空行)
    'padded-blocks': [2, 'never'],
    // 强制使用一致的反勾号、双引号或单引号
    quotes: [
      2,
      'single',
      {
        avoidEscape: false,
        allowTemplateLiterals: true
      }
    ],
    // 禁止在语句末尾使用分号
    semi: [2, 'never'],
    // 强制分号之后使用一致的空格
    'semi-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    // 强制代码块之前空格
    'space-before-blocks': [2, 'always'],
    // 函数圆括号之前不需要空格
    'space-before-function-paren': [2, { 'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always' }],
    // 强制圆括号内不许有空格
    'space-in-parens': [2, 'never'],
    // 要求操作符周围有空格
    'space-infix-ops': 2,
    // 强制在一元操作符前后使用一致的空格
    'space-unary-ops': [
      2,
      {
        words: true, // a += '2' a += 1
        nonwords: false // a++
      }
    ],
    // 强制在注释中 // 或 /* 使用一致的空格
    'spaced-comment': [
      2,
      'always',
      {
        markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
      }
    ],
    // 强制模板字符串中空格的使用，不使用空格
    'template-curly-spacing': [2, 'never'],
    // 要求调用 isNaN()检查 NaN
    'use-isnan': 2,
    // 要求使用 const 声明那些声明后不再被修改的变量
    'prefer-const': 2,
    // 强制在花括号中使用一致的空格
    'object-curly-spacing': [
      2,
      'always',
      {
        objectsInObjects: true
      }
    ],
    // 箭头函数箭头前后加空格
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    <%_ if (options.tools.includes('typescript')) { _%>
    ...tsRule
    <%_ } _%>
  }
}
