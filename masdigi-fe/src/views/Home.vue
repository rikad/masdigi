<template>
  <div id="homepage">
    <div id="top" class="row">
      <div id="date" class="col-3">
        <span class="day">{{ hari }},</span><br />
        <span class="masehi"> {{ masehi }} M </span><br />
        <span class="hijriah">{{ hijriah }}</span>
      </div>
      <div id="title" class="col-6">
        <router-link to="/config"><h1>{{ config.data.name }}</h1></router-link>
        <p>
          <span id="txtaddress">{{ config.data.address }}</span>
          <br>
          <span id="txtphone">{{ config.data.phone }}</span>
        </p>
      </div>
      <div id="time" class="col-3">
        <div class="now"> {{ waktu }} </div>
        <div class="countdown"> {{ countdown.name }} - {{ countdown.time }} </div>
      </div>
    </div>

   <div id="bottom">

      <div id="timePray" class="row">
        <div class="col">
          <div class="title" style="background-color: rgba(2, 48, 71, 0.9)" v-if="praytime"> Shubuh </div>
          <div class="time" style="background-color: rgba(2, 48, 71, 0.7)">  {{ praytime.Fajr.substr(0,5) }} </div>
        </div>
        <div class="col">
          <div class="title" style="background-color: rgba(61, 64, 91, 0.9)" v-if="praytime"> Syuruq</div>
          <div class="time" style="background-color: rgba(61, 64, 91, 0.7)"> {{ praytime.Syuruq.substr(0,5) }}</div>
        </div>
        <div class="col">
          <div class="title" style="background-color: rgba(19, 42, 19, 0.9)" v-if="praytime"> Dzuhur </div>
          <div class="time"  style="background-color: rgba(19, 42, 19, 0.7)"> {{ praytime.Dhuhr.substr(0,5) }}</div>
        </div>
        <div class="col">
          <div class="title" style="background-color: rgba(50, 48, 49, 0.9)" v-if="praytime"> Ashar </div>
          <div class="time" style="background-color: rgba(50, 48, 49, 0.7)"> {{ praytime.Asr.substr(0,5) }}</div>
        </div>
        <div class="col">
          <div class="title" style="background-color: rgba(98, 23, 8, 0.9)" v-if="praytime"> Maghrib </div>
          <div class="time"  style="background-color: rgba(98, 23, 8, 0.7)"> {{ praytime.Maghrib.substr(0,5) }}</div>
        </div>
        <div class="col">
          <div class="title" style="background-color: rgba(59, 61, 202, 0.9)" v-if="praytime"> Isya </div>
          <div class="time"  style="background-color: rgba(59, 61, 202, 0.7)"> {{ praytime.Isha.substr(0,5) }}</div>
        </div>
      </div>

      <div id="runText">
        <marquee v-html="announcement"></marquee>
      </div>
    </div>

    <vue-flux
      :options="vfOptions"
      :images="vfImages"
      :transitions="vfTransitions"
      ref="slider"
      style="width:100vw; height:100vh; z-index: -99"
      >
    </vue-flux>

  </div>
</template>

<style scoped>

@font-face {
  font-family: "Ramadhan";
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  src: url("/aAwalRamadhan.otf"), url("/aAwalRamadhan.ttf");
}

* {
  font-size: 1.3rem;
}

#top {
  position: absolute;
  top: 0;
  width: 100vw;
  background-color: rgba(41, 41, 214, 0.6);
  color: white;
  margin: 0;
  padding: 1rem;
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
  width: 20vw;
  padding: 0.5rem;
  font-weight: bold;
  font-size: 1.5em;
}

#date span {
  font-size: 1.2em;
  font-weight: bold;
  line-height: 0;
}

#date .hijriah {
  font-family: "Ramadhan";
}

#date .masehi {
  font-family: "Ramadhan";
}

#title {
  text-align: center;
  font-family: "Ramadhan";
}

#title h1 {
  color: #ffb703;
  font-size: 2em;
  margin: 0;
}

#title #txtphone {
  color: #ffb703;
  font-size: 1.3em;
}

#title p {
  margin: 0;
}

#time {
  text-align: right;
}

#time .now {
  text-align: right;
  font-size: 3em;
  padding-top: 2rem;
  font-family: "Ramadhan";
  line-height: 0.5em;
}

#time .countdown {
  text-align: right;
  font-size: 1.3em;
  font-family: "Ramadhan";
  color: #ffb703;
}


#timePray {
  text-align: center;
  width: 100%;
  margin: 0;
  padding: 0;
}

#timePray .col {
  padding: 0;
  margin: 5px;
  border-radius: 4px;
}

#timePray .title {
  font-size: 1.3em;
  margin: 0;
  padding: 0;
  color: #ffb703;
  font-weight: bold;
}

#timePray .time {
  font-size: 1.8em;
  margin: 0;
  padding: 0;
  font-weight: bold;
  color: white;
  font-family: "Ramadhan";
}

#runText {
  background-color: rgb(0, 0, 0);
  text-align: center;
  color: white;
  width: 100%;
  margin: 0;
}

#runText marquee {
  font-size: 1.3em;
}
</style>

<script>

import moment from "moment-hijri";
import {
   VueFlux
} from 'vue-flux';

export default {
  components: {
    VueFlux
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

      vfOptions: {
         autoplay: true
      },
      // vfImages: [],
      vfTransitions: [ 'fade', 'kenburn', 'swipe', 'slide', 'waterfall', 'blocks1', 'explode' ],
      countdown: {
        name: '',
        time: 0
      }

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
    },
    praytime() {
      return this.$store.state.config.data.praytime;
    },
    vfImages() {
      let galeri = this.$store.state.config.data.galeri; 
      return galeri ? galeri.map(x => x.link) : [];
    }
  },
  created() {

    let app = this;

    if(app.$route.query.config) {
      app.$router.push('config')
    }

    //run every second
    setInterval(function () {
      let dateObj = app.getCurrentDateObject();

      app.getTime(dateObj)
      app.getHijriah(dateObj)
      app.getMasehi(dateObj)
      app.getCountdown(dateObj)

    }, 1000);

    //run every 5 second
    setInterval(function () {
      app.$store.dispatch("GET_CONFIG");
    }, 5000);

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
    getTime(d) {
      this.waktu = `${this.toDouble(d.getHours())}:${this.toDouble(d.getMinutes())}:${this.toDouble(d.getSeconds())}`;
    },
    getHijriah(d) {
      let m = new moment(d.getTime());
      m.locale("id");
      this.hijriah = m.format("iDD iMMMM iYYYY");
    },
    getMasehi(d) {
      this.masehi = `${d.getDate()} ${this.months[d.getMonth()]} ${d.getFullYear()}`;
      this.hari = this.days[d.getDay()];
    },
    toDouble(v) {
      let str = v.toString();
      return str.length === 1 ? "0" + str.toString() : str;
    },
    praytimeToObj(p) {
      let time = p.split(':'); //ex 15:10
      return { hour: parseInt(time[0]), minute: parseInt(time[1]), second: 0 }
    },
    getCountdown(d) {
      let currentHour = d.getHours();
      let currentMinute = d.getMinutes();
      let currentSecond = d.getSeconds();

      for(const x in this.praytime) {
        let next = this.praytimeToObj(this.praytime[x])
        let remaining = (next.hour * 60 + next.minute) - (currentHour * 60 + currentMinute);
        let remainingHour = this.toDouble(Math.floor(remaining/60));
        let remainingMinute = this.toDouble(remaining%60);

        if(remaining > 0) {

          this.countdown = {
            name: x,
            time: `${remainingHour}:${remainingMinute}:${60 - currentSecond}`
          }

          break;
        }
      }

    }
  },
  mounted() {
  },
};
</script>
