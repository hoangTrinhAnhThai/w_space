<template>
  <v-data-table :headers="headers" :items="userList" :items-per-page="10" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title style="font-weight: 900"
          >User accounts</v-toolbar-title
        >
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn class="save-btn" v-bind="attrs" v-on="on">
              New Item
            </v-btn>
          </template> -->
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      disabled
                      v-model="editedItem.email"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.firstName"
                      label="First name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.lastName"
                      label="Last name"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="close"> Cancel </v-btn>
              <v-btn style="margin: 20px" class="save-btn" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.isBlock`]="{ item }">
      <v-icon small v-if="item.isBlock" class="mr-2" color="#EF5350"
        >mdi-checkbox-blank-circle</v-icon
      >
      <v-icon small v-else class="mr-2" color="green">
        mdi-checkbox-blank-circle
      </v-icon>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <span v-if="userInfo._id != item._id">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon
          v-if="item.isBlock"
          small
          class="mr-2"
          @click="block(item, false)"
        >
          mdi-lock-open-variant-outline
        </v-icon>
        <v-icon v-else small class="mr-2" @click="block(item, true)">
          mdi-lock-outline
        </v-icon>
      </span>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Email",
        align: "start",
        value: "email",
      },
      { text: "First name", value: "firstName" },
      { text: "Last Name", value: "lastName" },
      { text: "Role", value: "role.name" },
      { text: "Status", value: "isBlock" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedId: 0,
    editedItem: {
      lastName: "",
      firstName: "",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters({
      userList: "ADMIN/userList",
      userInfo: "USER/userInfo",
    }),
  },

  watch: {
  },
  created() {
    this.getAllUsers();
  },
  methods: {
    ...mapActions({
      getAllUsers: "ADMIN/getAllUsers",
      editUser: "ADMIN/editUser",
    }),
    editItem(item) {
      this.editedId = item._id;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    block(item, isBlock) {
      this.editUser({ id: item._id, user: { isBlock: isBlock } });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedId != 0) {
        this.editUser({ id: this.editedId, user: this.editedItem });
      } else {
        this.userList.push(this.editedItem);
      }
      this.close();
    },
    closeDelete() {

    },
    deleteItemConfirm() {

    }
  },
};
</script>

<style scoped>
.theme--light.v-data-table {
  width: 95% !important;
  margin: 50px auto;
}
.v-application .elevation-1 {
  box-shadow: none !important;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12) !important;
}
.main-container[data-v-03d9b622] {
  background-image: none;
}
</style>
