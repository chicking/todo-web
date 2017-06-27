<template lang="html">
  <td v-if="isEditMode">
    <div class="field is-expanded">
      <p class="control">
        <input ref="input" class="input" :type="type" :value="vm" @keyup.enter="input($event.target.value)" @keyup.esc="close()" @blur="close()">
      </p>
    </div>
  </td>
  <td v-else @dblclick="editMode()">
    <slot></slot>
  </td>
</template>

<script>
export default {
  name: 'td-input',
  props: {
    value: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data() {
    return {
      isEditMode: false,
      vm: this.$props.value
    }
  },
  watch: {
    value(val) {
      this.vm = val
    }
  },
  methods: {
    init() {
      this.vm = this.$props.value
    },
    input(val) {
      if (val === '') return
      this.$emit('input', val)
      this.$emit('update')
      this.close()
    },
    editMode() {
      this.isEditMode = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
    close() {
      this.isEditMode = false
      this.init()
    }
  }
}
</script>

<style lang="css">
</style>
