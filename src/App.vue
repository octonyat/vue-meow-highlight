<template>
  <div class="app-container">
    <div class="search-block">
      <input
        v-model="modelQuery"
        type="text"
        placeholder="Search..."
        class="search"
      />

      <div class="controllers">
        <label>
          <span>ignore case:</span><input type="checkbox" v-model="ignoreCase">
        </label>
      </div>
    </div>

    <div class="highlight-containers">
      <section
        v-for="highlightTextProp in highlightTextProps"
        class="highlight-container"
        :key="highlightTextProp.id"
      >
        <highlight-text
          :content="highlightTextProp.content"
          :query="modelQuery"
          :palette="highlightTextProp.palette"
          :ignoreCase="ignoreCase"
        />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HighlightText from './components/HighlightText.vue'

interface HighlightTextProps {
  id: number
  content: string
  palette?: string[]
  ignoreCase?: boolean
}

@Component({
  components: {
    HighlightText
  }
})
export default class App extends Vue {
  ignoreCase = false
  modelQuery = ''
  highlightTextProps: HighlightTextProps[] = [
    {
      id: 1,
      content: 'aaa    bb cc aa     bb cc   aaaaa bb eee aaa bb'
    },
    {
      id: 2,
      content: 'aaa   bbb cc   ddd ee ffff aaa   bbb ee aabbaaaa'
    },
    {
      id: 3,
      content: 'AA   bbb cc   DD ee ffff aaa   bbb ee aabbAAa'
    }
  ]
}
</script>

<style>
*,
*::after,
*::before {
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  font-size: 1.6rem;
  font-weight: 100;
  line-height: 1.5;
  font-family: 'Hiragino Kaku Gothic ProN', Meiryo, 'Yu Gothic', YuGothic, Verdana, Helvetica, sans-serif;
}

.search-block {
  margin-bottom: 1.6rem;
}

.search {
  height: 4rem;
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 0.8rem;
}

.controllers label {
  font-size: 1.2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.controllers input {
  margin: 0 0 0 0.6rem;
}

.highlight-container {
  padding: 1.6rem;
  border-bottom: 1px solid #d1d1d1;
}

.highlight-container:first-child {
  border-top: 1px solid #d1d1d1;
}
</style>
