<template>
  <div>
    <div class="form-group">
      <label>Nama Mesjid:</label>
      <input type="text" class="form-control" v-model="form.name" />
    </div>
    <div class="form-group">
      <label>Alamat:</label>
      <textarea class="form-control" v-model="form.address"></textarea>
    </div>
    <div class="form-group">
      <label>Kontak:</label>
      <input type="text" class="form-control" v-model="form.phone" />
    </div>
    <div class="form-group">
      <label>Pray Zone:</label>
      <input type="text" class="form-control" v-model="form.prayzone" placeholder="masukan nama kota"/>
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
      form: {
        name: "",
        address: "",
        phone: "",
        prayzone: ''
      },
    };
  },
  mounted: function () {
    this.form.name = this.$store.state.config.data.name;
    this.form.address = this.$store.state.config.data.address;
    this.form.phone = this.$store.state.config.data.phone;
    this.form.prayzone = this.$store.state.config.data.prayzone;
  },
  methods: {
    save: function() {
      this.$store.commit('SET_UMUM',this.form)
      this.$store.dispatch("SAVE_CONFIG");
      this.$store.dispatch("GET_PRAYTIME");

      this.$bvToast.toast(`Menyimpan Data`, {
        title: 'Menyimpan',
        autoHideDelay: 5000,
      });
    }
  },
};
</script>