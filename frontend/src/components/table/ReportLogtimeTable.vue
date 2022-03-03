<template>
  <v-data-table
    :headers="headers"
    :items="logtimes"
    class="elevation-1"
    :items-per-page="5"
    hide-default-footer
  >
    <template v-slot:item="{ item }">
      <tr>
        <td>
          <Avatar v-bind:user="item.createdBy" />
        </td>
        <td><TimeCell v-bind:timeInMiliseconds="item.timeInMiliseconds" /></td>
        <td class="text"><DateCell :date="item.createdAt" /></td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import TimeCell from '../tableCell/TimeReportCell.vue';
import DateCell from '../tableCell/DateTableCell.vue';
import Avatar from '../Avatar.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'ReportLogtimeTable',
  data() {
    return {
      headers: [
        {
          text: 'Name',
          value: 'createdBy',
        },
        {
          text: 'Time',
          value: 'timeInMiliseconds',
        },
        {
          text: 'Day',
          value: 'createdAt',
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      logtimes: 'LOGTIME/logtimeArrayByTask',
    }),
  },
  components: {
    TimeCell,
    DateCell,
    Avatar,
  },
};
</script>

<style scoped></style>
