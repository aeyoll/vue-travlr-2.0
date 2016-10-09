<template>
  <div class="list-view">
    <spinner :show="loading"></spinner>
    <h1>My travels</h1>
    <ul>
      <li v-for="(travel, key) in travels" :key="travel.id" :item="travel">
        <router-link :to="'/travel/' + key">{{ travel.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { RECEIVE_TRAVELS } from '../store/mutation-types'
import { watchTravelList } from '../api'
import Spinner from '../components/Spinner.vue'

export default {
  name: 'list-view',

  data () {
    return {
      loading: false
    }
  },

  components: {
    Spinner,
  },

  computed: mapGetters({
    travels: 'allTravels'
  }),

  beforeMount () {
    this.unwatchList = watchTravelList(travels => {
      this.$store.commit(RECEIVE_TRAVELS, travels)
    })
  },

  beforeDestroy () {
    this.unwatchList()
  },

  created () {
    this.loading = true
    this.$store.dispatch('getAllTravels').then(() => {
      this.loading = false
    })
  }
}
</script>