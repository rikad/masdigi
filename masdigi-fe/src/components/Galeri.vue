<template>
  <div>
    <div class="row">
      <div class="col-8">
        <input
          type="file"
          class="form-control"
          ref="file"
          v-on:change="onChangeFileUpload()"
        />
      </div>
      <div class="col-4">
        <button type="submit" class="btn btn-primary" @click="submitForm()">
          Upload
        </button>
      </div>
    </div>

    <hr />
    <table class="table table-striped table-bordered" v-if="config.data.galeri">
      <tr>
        <th>Nama</th>
        <th>#</th>
      </tr>
      <tr v-bind:key="idx" v-for="(val, idx) in config.data.galeri">
        <td>{{ val.name }}</td>
        <td>
          <button
            class="btn btn-danger"
            style="padding: 0 4px 0px 4px"
            @click="deleteFile(val.name)"
          >
            X
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      file: "",
    };
  },
  computed: {
    config() {
      return this.$store.state.config;
    },
  },
  methods: {
    save: function () {
      console.log(this.form);
      this.$store.commit("SET_UMUM", this.form);
    },
    submitForm() {
      let formData = new FormData();
      formData.append("file", this.file);

      Axios.post(`${this.$store.state.api}/galeri/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function (data) {
          alert("berhasil");

          console.log(data.data);
          this.$store.dispatch("GET_CONFIG");
          alert("berhasil");
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },
    deleteFile(name) {
      Axios.post(`${this.$store.state.api}/galeri/delete`, { file: name })
        .then(function (data) {
          console.log(data.data);
          this.$store.dispatch("GET_CONFIG");
          alert("berhasil");
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },
    onChangeFileUpload() {
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>