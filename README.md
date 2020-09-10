# vue-template-pc😍

定制一套自己的vue项目模板，这套模板目前只做pc上面的处理

## 功能✨

- [x] 一个通用的模板，使用`vue2.0 typeScript`
  - [x] 自定义引入`vuex` `default: true`
  - [x] 自定义引入`savml` `default: true`
  - [x] 自定义引入`va-study-public-sdk` `default: true`
  - [x] 自定义引入`elementUI` `default: true`
  - [x] 自定义引入`wxTools` `default: true`
  - [x] 自定义引入`wxui` `default: false`
- [ ] 一个可配置化、功能多样的`vue`模板
  - [ ] 支持`javaScript typeScript`自由选择
  - [ ] 支持`vue2.0 vue3.0`自由选择
  - [ ] 支持是否适配`mobile`
  - [ ] 支持是否引入`electron`

## 使用👍

```bash
vue create --preset vaopen/vue-template-pc <project-name>
```

cd <project-name>

```bash
npm install or yarn
npm run fix:js or yarn fix:js
npm run lint:fix or yarn lint:fix
```

## FAQ📖

- *va-study-public-sdk wxTools wxui* 需使用wx自己的npm源

- *No matching version found for wx-tools* 请忽略
