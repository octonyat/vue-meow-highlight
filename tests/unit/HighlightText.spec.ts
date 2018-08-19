import { shallowMount } from '@vue/test-utils'
import HighlightText from '@/components/HighlightText.vue'

// prettier-ignore
describe('HighlightText.vue', () => {
  describe('highlight text test', () => {
    it('renders props.text when passed', () => {
      const content = 'foo bar baz'
      const wrapper = shallowMount(HighlightText, {
        propsData: { content }
      })
      expect(wrapper.text()).toMatch(content)
    })

    it('displays highlighted text.', () => {
      const content = 'foo bar baz'
      const query = 'ba'
      const wrapper = shallowMount(HighlightText, {
        propsData: { content, query }
      })
      expect(wrapper.findAll('.highlight').length).toBe(4)

      expect(wrapper.findAll('.highlight').at(0).text()).toBe('b')
      expect(wrapper.findAll('.highlight').at(1).text()).toBe('a')

      expect(wrapper.findAll('.highlight').at(2).text()).toBe('b')
      expect(wrapper.findAll('.highlight').at(3).text()).toBe('a')
    })

    it('displays plain text.', () => {
      const content = 'foo bar baz'
      const query = 'nyan'
      const wrapper = shallowMount(HighlightText, {
        propsData: { content, query }
      })
      expect(wrapper.findAll('.highlight').length).toBe(0)
    })

    it('displays plain text with whitespace.', () => {
      const content = 'foo bar    baz'
      const query = 'ba'
      const wrapper = shallowMount(HighlightText, {
        propsData: { content, query }
      })

      expect(
        wrapper.findAll('.highlight').at(0).element.style.backgroundColor
      ).toEqual('rgb(255, 255, 0)')
      expect(wrapper.findAll('.highlight').at(0).text()).toBe('b')

      expect(
        wrapper.findAll('.highlight').at(1).element.style.backgroundColor
      ).toEqual('rgb(255, 255, 0)') // a
      expect(wrapper.findAll('.highlight').at(1).text()).toBe('a')

      expect(
        wrapper.findAll('.highlight').at(2).element.style.backgroundColor
      ).toEqual('rgb(255, 255, 0)') // b
      expect(wrapper.findAll('.highlight').at(2).text()).toBe('b')

      expect(
        wrapper.findAll('.highlight').at(3).element.style.backgroundColor
      ).toEqual('rgb(255, 255, 0)') // a
      expect(wrapper.findAll('.highlight').at(3).text()).toBe('a')
    })

    it('count splitted text with ignore case.', () => {
      const localThis = {
        content: 'FOO BAR baz',
        query: 'foo bar BAZ',
        ignoreCase: true
      }
      const wrapper = shallowMount(HighlightText, {
        propsData: localThis
      })
      expect(wrapper.findAll('.highlight').length).toBe(9)
    })

    it('has background-color with appropriate Layer index value.', () => {
      const localThis = {
        content: 'a b a b',
        query: 'a b'
      }
      const wrapper = shallowMount(HighlightText, {
        propsData: localThis
      })
      expect(
        wrapper.findAll('.highlight').at(0).element.style.backgroundColor
      ).toEqual('rgb(255, 255, 0)')
      expect(
        wrapper.findAll('.highlight').at(1).element.style.backgroundColor
      ).toEqual('rgb(0, 255, 0)')
      expect(
        wrapper.findAll('.highlight').at(2).element.style.backgroundColor
      ).toEqual('rgb(255, 255, 0)')
      expect(
        wrapper.findAll('.highlight').at(3).element.style.backgroundColor
      ).toEqual('rgb(0, 255, 0)')
    })

    it('has background-color with appropriate Layer index value, even if the search word matches twice', () => {
      /**
       * [INFO] DEFAULT_PALETTE: ['#ffff00', '#00ff00', '#00ffff']
       * '#ffff00' - rgb(255, 255, 0) - yellow color
       * '#00ff00' - rgb(0, 255, 0) - green color
       * '#00ffff' - rgb(0, 255, 255) - blue color
       */
      const localThis = {
        content: 'aa bb aa bb',
        query: 'aa bb aa bb'
      }
      const wrapper = shallowMount(HighlightText, {
        propsData: localThis
      })
      expect(
        wrapper.findAll('.highlight').at(0).element.style.backgroundColor
      ).toEqual('rgb(0, 255, 255)')
      expect(
        wrapper.findAll('.highlight').at(1).element.style.backgroundColor
      ).toEqual('rgb(0, 255, 255)')
      expect(
        wrapper.findAll('.highlight').at(2).element.style.backgroundColor
      ).toEqual('rgb(255, 255, 0)')
      expect(
        wrapper.findAll('.highlight').at(3).element.style.backgroundColor
      ).toEqual('rgb(255, 255, 0)')
    })

    it('has background-color with appropriate Layer index value, even if the search word matches multiple', () => {
      /**
       * [INFO] DEFAULT_PALETTE: ['#ffff00', '#00ff00', '#00ffff']
       * '#ffff00' - rgb(255, 255, 0) - yellow color
       * '#00ff00' - rgb(0, 255, 0) - green color
       * '#00ffff' - rgb(0, 255, 255) - blue color
       */
      const localThis = {
        content: 'aa bb aa bb',
        query: 'aa b a'
      }
      const wrapper = shallowMount(HighlightText, {
        propsData: localThis
      })
      expect(
        wrapper.findAll('.highlight').at(0).element.style.backgroundColor
      ).toEqual('rgb(0, 255, 255)')
      expect(
        wrapper.findAll('.highlight').at(1).element.style.backgroundColor
      ).toEqual('rgb(255, 255, 0)')
      expect(
        wrapper.findAll('.highlight').at(2).element.style.backgroundColor
      ).toEqual('rgb(0, 255, 0)')
      expect(
        wrapper.findAll('.highlight').at(3).element.style.backgroundColor
      ).toEqual('rgb(0, 255, 255)')
      expect(
        wrapper.findAll('.highlight').at(4).element.style.backgroundColor
      ).toEqual('rgb(255, 255, 0)')
      expect(
        wrapper.findAll('.highlight').at(5).element.style.backgroundColor
      ).toEqual('rgb(0, 255, 0)')
    })

    it('has background-color with appropriate Layer index value with custom Palette', () => {
      const localThis = {
        content: 'a b c d e f',
        query: 'a b c d e f',
        palette: ['#ff0000', '#00ff00', '#0000ff', '#000000', '#ffffff']
      }
      const wrapper = shallowMount(HighlightText, {
        propsData: localThis
      })
      expect(
        wrapper.findAll('.highlight').at(0).element.style.backgroundColor
      ).toEqual('rgb(255, 0, 0)')
      expect(
        wrapper.findAll('.highlight').at(1).element.style.backgroundColor
      ).toEqual('rgb(0, 255, 0)')
      expect(
        wrapper.findAll('.highlight').at(2).element.style.backgroundColor
      ).toEqual('rgb(0, 0, 255)')
      expect(
        wrapper.findAll('.highlight').at(3).element.style.backgroundColor
      ).toEqual('rgb(0, 0, 0)')
    })
  })
})
