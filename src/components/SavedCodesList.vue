<template>
  <ul v-for="code in codes" :key="code.id" class="left-align list">
    <li class="saved-list">
      <span>{{ code.unit }}</span>
      <span>{{ code.codes }}</span>
      <ProgressSpinner
        v-if="!code.id && saving === code.unit"
        style="height: 25px; width: 25px; margin-right: 5px;"
      />
      <button
        v-else-if="!code.id"
        @click="onSyncCode(code)"
        :class="`small-btn ${syncing === code.unit ? 'spin' : ''}`"
      >
        <i class="pi pi-sync sync-icon"></i>
      </button>
      <button
        v-else
        @click="onDeleteCode(code)"
        class="small-btn"
      >
        <i class="pi pi-trash trash-icon"></i>
      </button>
    </li>
    <Divider />
  </ul>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
import Divider from 'primevue/divider'

export default defineComponent({
  props: [`codes`, `onSyncCode`, `syncing`, `onDeleteCode`],
  components: {
    ProgressSpinner,
    Divider,
  },
})
</script>
<style>
  .left-align {
    text-align: left;
  }
  .list {
    list-style: none;
    padding-left: 0;
  }
  .saved-list {
    display: grid;
    grid-template-columns: 50px 4fr 30px;
    font-size: 22px;
    grid-gap: 10px;
  }
</style>
