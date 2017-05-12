<template>
  <div>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header" ref="drawer">
        <header class="fv-layout-transparent mdl-layout__header mdl-layout__header--transparent portfolio-header">
            <div class="mdl-layout__header-row portfolio-logo-row">
                <span class="mdl-layout__title">
                    <span class="mdl-layout__title">Force Vue</span>
                </span>
            </div>
            <div class="mdl-layout__header-row portfolio-navigation-row mdl-layout--large-screen-only">
                <nav class="mdl-navigation mdl-typography--body-1-force-preferred-font">
                    <router-link class="mdl-navigation__link" to="/home">Home</router-link>
                    <router-link class="mdl-navigation__link" to="/about">About</router-link>
                    <router-link class="mdl-navigation__link" to="/contact">Contact</router-link>
                </nav>
            </div>
        </header>
        <div class="mdl-layout__drawer mdl-layout--small-screen-only">
            <nav class="mdl-navigation mdl-typography--body-1-force-preferred-font">
              <router-link class="mdl-navigation__link" to="/home" @click.native="toggleMenu()">Home</router-link>
              <router-link class="mdl-navigation__link" to="/about" @click.native="toggleMenu()">About</router-link>
              <router-link class="mdl-navigation__link" to="/contact" @click.native="toggleMenu()">Contact</router-link>
            </nav>
        </div>
        <main class="mdl-layout__content">
          <router-view></router-view>
        </main>
        <footer class="mdl-mini-footer">
            <div class="mdl-mini-footer__left-section">
                <div class="mdl-logo">Force Vue</div>
            </div>
            <div class="mdl-mini-footer__right-section">
                <ul class="mdl-mini-footer__link-list">
                    <li><router-link to="/help" data-qa="helpLink">Help</router-link></li>
                    <li><router-link to="/terms" data-qa="privacyLink">Privacy & Terms</router-link></li>
                </ul>
            </div>
        </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    toggleMenu() {
      this.$refs.drawer.MaterialLayout.toggleDrawer();
    }
  }
};
</script>

<style>
.fv-layout-transparent {
  background: url('../static/images/starwars-background.jpg') center / cover;
}
.fv-layout-transparent .mdl-layout__header,
.fv-layout-transparent .mdl-layout__drawer-button {
  /* This background is dark, so we set text to white. Use 87% black instead if
     your background is light. */
  color: white;
}
</style>
