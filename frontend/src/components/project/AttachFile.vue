<template>
  <div class="attach-file">
    <ul>
      <li v-for="(file, index) in files" :key="index">
        <File :file="file" :idTask="idTask" />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import File from './File.vue';
export default {
  name: 'ChatCard',
  props: ['idTask'],
  computed: {
    ...mapGetters({
      files: 'TASK/files',
    }),
  },
  methods: {
    ...mapActions({
      downloadFileAction: 'CHAT/downloadFile',
    }),
    downloadFile(nameFile) {
      if (this.chat.isFile) {
        this.downloadFileAction(nameFile);
      } else return;
    },
  },
  components: {
    File,
  },
};
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  font-size: 12px;
  li {
    width: 180px;
    margin-top: 15px;
    margin-right: 15px;
  }
}
</style>
