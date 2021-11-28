<template>
  <b-row>
    <b-col cols="12">
      <h2>
        Room List
        <b-link href="#/add-room">(Add Room)</b-link>
      </h2>
      <b-table striped hover :items="rooms" :fields="fields">
         <template v-slot:cell(actions)="data">
           <button @click.stop="join(data.item._id)">Join</button>
        </template>
        <!-- <template slot="actions" scope="row">
          <b-btn size="sm" @click.stop="join(row._id)">Join</b-btn>
        </template> -->
      </b-table>
      <ul v-if="errors && errors.length">
        <li v-for="(error, index) of errors" :key="index">
          {{error.message}}
        </li>
      </ul>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'

export default {
  name: 'BookList',
  data () {
    return {
      // fields: {
      //   room_name: { label: 'Room Name', sortable: true, 'class': 'text-center' },
      //   created_date: { label: 'Created Date', sortable: true },
      //   actions: { label: 'Action', 'class': 'text-center' }
      // },
      fields: ['_id', 'createdAt', 'updatedAt', 'actions'],
      rooms: [],
      errors: []
    }
  },
  created () {
    axios.get(`http://localhost:3000/api/room`)
    .then(response => {
      console.log(response.data);
      this.rooms = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },
  methods: {
    join (id) {
      console.log(id);
      this.$router.push({
        name: 'JoinRoom',
        params: { id: id }
      })
    }
  }
}
</script>