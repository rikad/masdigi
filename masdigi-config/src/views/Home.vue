<template>
  <div>
    <swiper loop :autoplay="5000" v-if="config.data.galeri">
      <div v-for="(val, idx) in config.data.galeri" v-bind:key="idx">
        <img :src="val.link" />
      </div>
    </swiper>

    <div id="top" class="row">
      <div id="date" class="col">
        <b>{{ hari }},</b><br />{{ masehi }} M<br />{{ hijriah }}<br>
        <b>{{ prayzone }}</b>
      </div>
      <div id="title" class="col">
        <router-link to="/config"
          ><h1>{{ config.data.name }}</h1></router-link
        >
        <p>{{ config.data.address }}</p>
        <h2>{{ config.data.phone }}</h2>
      </div>
      <div id="time" class="col">
        {{ waktu }}
      </div>
    </div>

    <div id="bottom">
      <div id="imsakTime" v-if="praytime">
        <b>Imsak - {{ praytime.Imsak }}</b>
      </div>

      <div id="timePray" class="row">
        <div class="col" style="background-color: rgba(34, 201, 109, 0.9)">
          <b class="two" v-if="praytime"> Shubuh</b><br />{{ praytime.Fajr.substr(0,5) }}
        </div>
        <div class="col" style="background-color: rgba(206, 40, 40, 0.9)">
          <b class="two" v-if="praytime"> Dzuhur </b><br />{{ praytime.Dhuhr.substr(0,5) }}
        </div>
        <div class="col" style="background-color: rgba(214, 144, 64, 0.9)">
          <b class="two" v-if="praytime"> Ashar </b><br />{{ praytime.Asr.substr(0,5) }}
        </div>
        <div class="col" style="background-color: rgba(80, 219, 75, 0.9)">
          <b class="two" v-if="praytime"> Maghrib </b><br />{{ praytime.Maghrib.substr(0,5) }}
        </div>
        <div class="col" style="background-color: rgba(59, 61, 202, 0.9)">
          <b class="two" v-if="praytime"> Isya </b><br />{{ praytime.Isha.substr(0,5) }}
        </div>
      </div>

      <div id="runText" class="row">
        <marquee v-html="announcement"></marquee>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-size: 1.3rem;
}

img {
  width: 100vw;
  height: 100vh;
}

#top {
  position: absolute;
  top: 0;
  width: 100vw;
  background-color: rgba(41, 41, 214, 0.6);
  color: white;
  padding: 1em;
  margin: 0;
}

#bottom {
  position: absolute;
  bottom: 0;
  width: 100vw;
}

#imsakTime {
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  color: black;
  width: 30%;
  padding: 8px;
}

#date {
  padding: 1em;
}

#title {
  text-align: center;
}

#title h1 {
  color: yellow;
  font-size: 2em;
}

#title h2 {
  color: yellow;
  font-size: 1em;
}

#time {
  text-align: right;
  font-size: 2em;
  padding-top: 1em;
}

#timePray {
  text-align: center;
  width: 100%;
  margin: 0;
}

#timePray .col {
  padding: 15px;
  margin: 5px;
}

#runText {
  background-color: rgb(0, 0, 0);
  text-align: center;
  color: white;
  width: 100%;
  margin: 0;
}
</style>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import moment from "moment-hijri";
import { Swiper } from "vue2-swiper";

export default {
  components: {
    Swiper,
  },
  data() {
    return {
      days: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu"],

      months: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],

      hari: 0,
      waktu: 0,
      masehi: 0,
      hijriah: 0,
      praytime: '',
    };
  },
  computed: {
    config() {
      return this.$store.state.config;
    },
    announcement() {
      let txt = this.$store.state.config.data.announcement;
      return txt.split("\n").join(" &#8226; ");
    },
    prayzone() {
      let prayzone = this.$store.state.config.data.prayzone;
      return prayzone.toUpperCase();
    }
  },
  created() {

    let app = this;

    //run every second
    setInterval(function () {
      app.getTime()
      app.getHijriah()
      app.getMasehi()
      app.getPraytime()
    }, 1000);

    //run every 5 second
    setInterval(function () {
      app.$store.dispatch("GET_CONFIG");

      // disabled praytime api
      // app.$store.dispatch("GET_PRAYTIME");

    }, 5000);

  },
  methods: {
    getCurrentDateObject() {
      let d = new Date();
      d = new Date(d.getTime() - this.$store.state.config.data.differenceSelectedToSytemTimestamp);
      return d;
    },
    getPraytime() {
      //praytime from api
      // let d = new Date();
      // let date = d.getDate();
      // let data = this.$store.state.config.data;
      // if(data.praytime) { 
      //   if(data.praytime[date]) {
      //     this.praytime = data.praytime[date].times
      //   } else {
      //     this.praytime = data.praytime[0].times
      //   }
      // }
      //end of praytime from api

      let data = this.$store.state.config.data;
      this.praytime = data.praytimeManual
    },
    getTime() {
      let d = this.getCurrentDateObject();
      this.waktu = `${this.toDouble(d.getHours())}:${this.toDouble(d.getMinutes())}:${this.toDouble(d.getSeconds())}`;
    },
    getHijriah() {
      let m = new moment(this.getCurrentDateObject().getTime());
      m.locale("id");
      this.hijriah = m.format("iDD iMMMM iYYYY");
    },
    getMasehi() {
      let d = this.getCurrentDateObject();
      this.masehi = `${d.getDate()} ${this.months[d.getMonth()]} ${d.getFullYear()}`;
      this.hari = this.days[d.getDay()];
    },
    toDouble(v) {
      let str = v.toString();
      return str.length === 1 ? "0" + str.toString() : str;
    },
  },
  mounted() {
  },
};
</script>
