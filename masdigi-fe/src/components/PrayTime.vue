<template>
  <div>
    <div style="padding:2rem">
        <h6>Tanggal & Waktu</h6>
        <hr>
        <b-form-datepicker v-model="date" class="mb-2"></b-form-datepicker>
        <b-form-timepicker v-model="time" locale="id"></b-form-timepicker>
        <hr>
        <!-- <p>{{ date }} {{ time }} : {{ differenceSelectedToSytemTimestamp() }}</p> -->
    </div>
    <hr>

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
      date: '',
      time: ''
    };
  },
  mounted: function () {
    this.form.Imsak = this.$store.state.config.data.praytime.Imsak;
    this.form.Fajr = this.$store.state.config.data.praytime.Fajr;
    this.form.Dhuhr = this.$store.state.config.data.praytime.Dhuhr;
    this.form.Asr = this.$store.state.config.data.praytime.Asr;
    this.form.Maghrib = this.$store.state.config.data.praytime.Maghrib;
    this.form.Isha = this.$store.state.config.data.praytime.Isha;

    let d = this.getCurrentDateObject();
    this.date = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
    this.time = `${d.getHours()}:${d.getMinutes()}`;
  },
  methods: {
    getCurrentDateObject() {
      let d = new Date();
      let diff = this.$store.state.config.data.differenceSelectedToSytemTimestamp;

      if(diff == undefined) {
        diff = 0;
      }

      d = new Date(d.getTime() - diff);
      return d;

    },
    save: function () {
        this.$store.commit("SET_DIFFERENCE", this.differenceSelectedToSytemTimestamp());
        this.$store.commit("SET_PRAYTIME", this.form);
        this.$store.dispatch("SAVE_CONFIG");

        this.$bvToast.toast(`Menyimpan Data`, {
          title: 'Menyimpan',
          autoHideDelay: 5000,
        });
    },
    datetimeTotimestamp(date) {
        return new Date(date).getTime();
    },
    selectedTimeToTimestamp() {
        return this.datetimeTotimestamp(`${this.date} ${this.time}`);
    },
    differenceSelectedToSytemTimestamp() {
        let selected = this.selectedTimeToTimestamp();
        let system = this.datetimeTotimestamp(new Date().getTime());
        let diff = system - selected;
        
        return isNaN(diff) ? 0 : diff;
    }
  },
};
</script>