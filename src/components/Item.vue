<template>
  <li class="news-item">
    <span class="title">
      <template>
        <router-link :to="'/travel/' + item.id">{{ item.title }}</router-link>
      </template>
    </span>
  </li>
</template>

<script>
export default {
  name: 'news-item',
  props: ['item'],
  // https://github.com/vuejs/vue/blob/next/packages/vue-server-renderer/README.md#component-caching
  serverCacheKey: props => {
    return `${props.item.id}::${props.item.__lastUpdated}`
  }
}
</script>

<style lang="sass">
</style>
