<template>
  <div class="file">
    <div class="img" v-if="file.url">
      <img :src="file.url" alt="" />
    </div>
    <div class="img-file" v-else>
        <img
        v-if="file.contentType.includes('pdf')"
        src="../../assets/pdf.png"
        alt=""
      />
      <img
        v-else-if="file.contentType.includes('word')"
        src="../../assets/word.png"
        alt=""
      />
      <img
        v-else-if="file.contentType.includes('excel')"
        src="../../assets/excel.png"
        alt=""
      />
      
      <img
        v-else-if="file.contentType.includes('text')"
        src="../../assets/notepad.png"
        alt=""
      />
      <img v-else src="../../assets/note.png" alt="" />
    </div>

    <div class="function">
      <v-btn text @click="deleteFile()">
        <v-icon small> mdi-trash-can-outline </v-icon>
      </v-btn>
      <v-btn text @click="downloadFile()">
        <v-icon small> mdi-cloud-download-outline </v-icon>
      </v-btn>
    </div>
    <div class="file-infor">
      <div class="file-name">
        {{ fileName }}
      </div>
      <div><Date :date="file.createdAt" /></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Date from '../../components/tableCell/DateTableCell.vue';
export default {
  name: 'ChatCard',
  props: {
    file: {
      type: Object,
    },
    idTask: {
      type: String,
    },
  },
  computed: {
    fileName() {
      if (this.file.isFile) {
        let arr = this.file.name.split('-');
        arr.pop();
        return arr.join('-');
      } else {
        return this.file.name;
      }
    },
  },
  methods: {
    ...mapActions({
      downloadFileAction: 'CHAT/downloadFile',
      deleteFileAction: 'TASK/deleteFile',
    }),
    downloadFile() {
      this.downloadFileAction(this.file.name);
    },
    deleteFile() {
      this.deleteFileAction({ idFile: this.file._id, idTask: this.idTask });
    },
  },
  components: {
    Date,
  },
};
</script>

<style lang="scss" scoped>
.file {
  position: relative;
  border-radius: 5px;

  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  .img {
    img {
      width: 180px;
      height: 120px;
      border-radius: 5px;
      border: 1px solid rgb(219, 216, 216);
    }
  }
  .img-file {
    width: 180px;
    height: 120px;
    border-radius: 5px;
    border: 1px solid rgb(219, 216, 216);
    img {
      width: 50px;
      height: 50px;
      position: relative;
      top: 25%;
      left: 30%;
    }
  }
  .file-infor {
    position: absolute;
    bottom: 0px;
    background-color: rgba(255, 255, 255, 0.6);
    padding: 5px 5px 10px;
    height: 40px;
    width: 179.5px;
    .file-name {
      width: 180px;
      text-overflow: ellipsis !important;
      overflow: hidden !important;
      font-weight: bold;
    }
  }
  .function {
    position: absolute;
    top: 0;
    width: 180px;
    height: 120px;
    background-color: rgba(114, 110, 110, 0.8);
    display: flex;
    flex-direction: row-reverse;
    opacity: 0;
    .v-btn {
      padding: 0 !important;
      background-color: rgba(255, 255, 255, 0.5);
      min-width: 20px !important;
      width: 30px !important;
      height: 30px;
      margin-left: 5px;
    }
  }
}
.file:hover {
  .function {
    opacity: 1;
    content: '';
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  }
}
</style>
