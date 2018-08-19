# vue-meow-highlight

![](https://raw.githubusercontent.com/octonyat/vue-meow-highlight/add_image/capture/preview.gif)

## Install

```bash
npm install --save vue-meow-highlight
```

```bash
yarn add vue-meow-highlight
```

## Usage

```js
import Vue from 'vue'
import VueMeowHighlight from 'vue-meow-highlight'

Vue.use(VueMeowHighlight)
```

```html
<highlight-text
  content="foo bar baz"
  query="ba"
/>
```

## development

🐈TBW🐈

```bash
npm install @vue/cli-service
npm install
npm run serve
```

## Props

| Name           | Type     | Default            |
| :------------- | :------- | :----------------- |
| query          | string   | ''                 |
| content        | string   | ''                 |
| ignoreCase     | boolean  | true               |
| palette        | string[] | ['#ffff00', '#00ff00', '#00ffff'] |

## License

[MIT License](https://github.com/ndelvalle/v-click-outside/blob/master/LICENSE)
