<template>
  <div class="row h-100 top-container">
    <div class="col"></div>
    <div class="col">

      <div>
        <b-card title="Card Title" no-body>
          <b-card-header header-tag="nav">

            <router-link to="/"><h1 class="title pt-2">Masjid Digital</h1></router-link>
            <p class="version pb-2">v 1.0</p>

            <b-nav card-header tabs justified align="center">
              <b-nav-item to="/config/" exact exact-active-class="active">Umum</b-nav-item>
              <b-nav-item to="/config/galeri" exact exact-active-class="active">Galeri</b-nav-item>
              <b-nav-item to="/config/pengumuman" exact exact-active-class="active">Pengumuman</b-nav-item>
              <b-nav-item to="/config/praytime" exact exact-active-class="active">Waktu</b-nav-item>
            </b-nav>

          </b-card-header>

          <b-card-body>
            <router-view></router-view>
          </b-card-body>
          
        </b-card>
      </div>
    </div>
    <div class="col"></div>
  </div>
</template>

<style scoped>
  .title {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    text-align: center;
  }
  .version {
    font-family:'Courier New', Courier, monospace;
    text-align: center;
  }
  h1 {
    color: black;
  }

  .top-container {
    padding-top: 4rem;
  }

  @media only screen and (max-width: 768px) {
    .card {
      width: 100vw;
    }
    .top-container {
      padding-top: 0;
    }

  }

</style>