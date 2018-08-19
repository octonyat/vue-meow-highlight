import Vue from 'vue'
import HighlightText from './HighlightText.vue'

const Components = {
  HighlightText
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components
