# vue-meow-highlight

[![Build Status](https://travis-ci.org/octonyat/vue-meow-highlight.svg?branch=master)](https://travis-ci.org/octonyat/vue-meow-highlight)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b2c605edf7804a2b8ca34f8ff90f57fe)](https://www.codacy.com/project/octonyat/vue-meow-highlight/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=octonyat/vue-meow-highlight&amp;utm_campaign=Badge_Grade_Dashboard)

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

## Development

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
