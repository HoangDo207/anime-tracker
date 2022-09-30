<template>
  <component :is="layout">
    <router-view v-slot="{ Component }">
      <transition name="fadeScale" mode="out-in">
        <KeepAlive>
          <suspense>
            <component :is="Component"> </component>
          </suspense>
        </KeepAlive>
      </transition>
    </router-view>
  </component>
</template>

<script>
const app_layout = "app";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || app_layout) + "-layout";
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  box-sizing: border-box;
  font-family: "Fira Sans", sans-serif;
}

body {
  background-color: #fff;
  margin: 0px;
}

.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.page {
  padding: 0 8px;
}
.fadeScale-enter-to,
.fadeScale-leave-from {
  transform: translateY(100px);
  opacity: 1;
}

.fadeScale-enter-active {
  transform: opacity 5s ease-out;
}

.fadeScale-leave-active {
  transform: opacity 5s ease-in;
}

.fadeScale-enter-from,
.fadeScale-leave-to {
  transform: translateY(100px);
  opacity: 0;
}

.img-full {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
