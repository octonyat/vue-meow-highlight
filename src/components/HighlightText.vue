<template>
  <span>
    <template v-if="hasHighlights">
      <span
        v-for="(obj, index) in highlights"
        v-if="obj && obj.highlightable"
        :key="index"
        class="highlight"
        :style="{
          backgroundColor: getBgcolor(obj.layer)
        }"
      >{{ obj.char }}</span>
      <template v-else>{{ content[index] }}</template>
    </template>

    <template v-else>{{ content }}</template>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

const DEFAULT_PALETTE = ['#ffff00', '#00ff00', '#00ffff']
const DEFAULT_SEP = /\s+/

interface SeparatorsAfter {
  layer: number
  count: number
}

interface HighlightContaier {
  char: string
  highlightable: boolean
  layer?: number
}

@Component
export default class HighlightText extends Vue {
  @Prop({ default: '' })
  private content!: string
  @Prop({ default: '' })
  private query!: string
  @Prop({ default: () => DEFAULT_PALETTE })
  private palette!: string[]
  @Prop()
  private ignoreCase!: Boolean

  get splittedContent(): string[] {
    return this.content.split('')
  }
  get splittedContentBySep(): string[] {
    return this.content.split(DEFAULT_SEP)
  }
  get splittedQueryBySep(): string[] {
    return this.query.split(DEFAULT_SEP)
  }
  get separatorsAfters(): SeparatorsAfter[] {
    const containers: SeparatorsAfter[] = []
    let layer = 0
    let count = 0

    this.splittedContent.forEach(t => {
      if (t.match(DEFAULT_SEP)) {
        count++
        const index = containers.findIndex(
          container => container.layer === layer
        )
        if (index !== -1) {
          containers[index].count = count
        } else {
          containers.push({ layer, count })
        }
      } else {
        layer++
        count = 0
        containers.push({ layer, count: 0 })
      }
    })
    return containers
  }
  get highlights(): HighlightContaier[] {
    let highlightContainers: HighlightContaier[] = this.splittedContent.map(
      char => ({ char, highlightable: false })
    )

    if (this.query && this.query.length > 0) {
      this.splittedContentBySep.forEach((text, splittedContentBySepIndex) => {
        const counts = this.separatorsAfters
          .filter(v => v.count !== 0)
          .map(v => v.count)

        const initialPosition = this.splittedContentBySep
          .slice(0, splittedContentBySepIndex)
          .map(t => t.length)
          .reduce((a, c, i) => a + c + counts[i], 0)

        this.splittedQueryBySep.forEach((query, layerIndex) => {
          const searchIndex = this.ignoreCase
            ? text.toLowerCase().indexOf(query.toLowerCase())
            : text.indexOf(query)

          if (searchIndex !== -1) {
            const start = searchIndex + initialPosition
            const end = query.length + searchIndex + initialPosition

            highlightContainers.slice(start, end).forEach(obj => {
              obj.layer = layerIndex
              obj.highlightable = true
            })
          }
        })
      })
    }
    return highlightContainers
  }
  get hasHighlights(): boolean {
    return this.highlights.some(obj => obj.highlightable)
  }

  getBgcolor(layerIndex: number): string {
    const paletteIndex =
      layerIndex + 1 > this.palette.length
        ? layerIndex % this.palette.length
        : layerIndex
    return this.palette[paletteIndex]
  }
}
</script>

<style scoped>
.highlight {
  background-color: #ffff00;
}
</style>
