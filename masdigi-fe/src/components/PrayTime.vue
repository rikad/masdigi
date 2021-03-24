<template>
  <div>
    <b-row>
      <b-col md="auto">
        <h3>Imsak</h3>
        <b-time v-model="form.Imsak" locale="id"></b-time>
      </b-col>
      <b-col md="auto">
        <h3>Shubuh</h3>
        <b-time v-model="form.Fajr" locale="id"></b-time>
      </b-col>
    </b-row>
    <hr>

    <b-row>
      <b-col md="auto">
        <h3>Dzuhur</h3>
        <b-time v-model="form.Dhuhr" locale="id"></b-time>
      </b-col>
      <b-col md="auto">
        <h3>Ashar</h3>
        <b-time v-model="form.Asr" locale="id"></b-time>
      </b-col>
    </b-row>
    <hr>

    <b-row>
      <b-col md="auto">
        <h3>Maghrib</h3>
        <b-time v-model="form.Maghrib" locale="id"></b-time>
      </b-col>
      <b-col md="auto">
        <h3>Isya</h3>
        <b-time v-model="form.Isha" locale="id"></b-time>
      </b-col>
    </b-row>
    <hr>

    <div align="right">
      <button type="submit" class="btn btn-primary" @click="save">
        Simpan
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        Imsak: "",
        Fajr: "",
        Dhuhr: "",
        Asr: "",
        Maghrib: "",
        Isha: ""
      },
      context: null
    };
  },
  mounted: function () {
    this.form.Imsak = this.$store.state.config.data.praytimeManual.Imsak;
    this.form.Fajr = this.$store.state.config.data.praytimeManual.Fajr;
    this.form.Dhuhr = this.$store.state.config.data.praytimeManual.Dhuhr;
    this.form.Asr = this.$store.state.config.data.praytimeManual.Asr;
    this.form.Maghrib = this.$store.state.config.data.praytimeManual.Maghrib;
    this.form.Isha = this.$store.state.config.data.praytimeManual.Isha;
  },
  methods: {
    save: function () {
      this.$store.commit("SET_PRAYTIME_MANUAL", this.form);
      this.$store.dispatch("SAVE_CONFIG");
    }
  },
};
</script>