<template>
  <div>
    <div class="row">
      <div class="col-12">
        <textarea
          class="form-control"
          rows="10"
          v-model="announcement"
        ></textarea>
      </div>
    </div>
    <hr />
    <div align="right">
      <button type="submit" class="btn btn-primary" @click="save">Simpan</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      announcement: "",
    };
  },
  mounted: function () {
    this.announcement = this.$store.state.config.data.announcement;
  },
  methods: {
    save: function () {
      console.log(this.announcement);
      this.$store.commit("SET_ANNOUNCEMENT", this.announcement);
      this.$store.dispatch("SAVE_CONFIG");
    },
  },
};
</script>