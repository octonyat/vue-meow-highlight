<template>
  <div class="app-container">
    <nav class="navigation">
      <section class="container">
        <a class="navigation-title" href="#">vue-highlighter</a>
      </section>
    </nav>

    <h1>Search word.</h1>

    <div class="search">
      <div class="controllers">
        <label>
          <span>ignore case:</span><input type="checkbox" v-model="ignoreCase">
        </label>
      </div>

      <div>
        <input
          v-model="modelQuery"
          type="text"
          placeholder="Search..."
        />
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
    }
  ]
}
</script>

<style scoped>
.app-container {
  padding-top: 6rem;
}

.controllers {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 0.6rem;
}

.controllers span,
.controllers input {
  vertical-align: middle;
}

.controllers label {
  font-weight: 300;
  margin: 0;
}

.controllers input {
  margin: 0 0 0 0.6rem;
}

.highlight-container {
  padding: 1.6rem;
  border-bottom: 1px solid #d1d1d1;
}

.navigation {
  background: #f4f5f6;
  border-bottom: 0.1rem solid #d1d1d1;
  display: block;
  height: 5.2rem;
  left: 0;
  max-width: 100%;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 1;
}

.navigation .navigation-title {
  display: inline;
  font-size: 1.6rem;
  line-height: 5.2rem;
}
</style>
