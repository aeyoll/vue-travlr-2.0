<template>
  <div class="list-view">
    <spinner :show="loading"></spinner>
    <ul>
      <li v-for="(travel, key) in travels" :key="travel.id" :item="travel">
        <router-link :to="'/travel/' + key">{{ travel.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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

  created () {
    this.loading = true
    this.$store.dispatch('getAllTravels').then(() => {
      this.loading = false
    })
  }
}
</script>