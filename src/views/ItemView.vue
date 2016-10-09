<template>
  <div class="item-view" v-if="item">
    <spinner :show="!item"></spinner>
    <template v-if="item">
      <div class="item-view-header">
        <h1>{{ item.name }}</h1>
      </div>
    </template>
  </div>
</template>

<script>
import Spinner from '../components/Spinner.vue'

function fetchTravel (store) {
  return store.dispatch('getTravel', {
    slug: store.state.route.params.slug
  })
}

export default {
  name: 'item-view',

  data () {
    return {
      loading: false
    }
  },

  components: {
    Spinner,
  },

  computed: {
    item () {
      return this.$store.state.travels.all[this.$route.params.slug]
    }
  },

  preFetch: fetchTravel,

  beforeMount () {
    fetchTravel(this.$store)
  }
}
</script>