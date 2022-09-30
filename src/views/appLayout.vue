<template>
  <div class="app-container">
    <transition name="fade" mode="out-in">
      <Suspense>
        <the-header></the-header>
      </Suspense>
    </transition>

    <div class="app-main__outer">
      <div class="app-main__inner">
        <slot></slot>
      </div>

      <!-- <transition name="fade" mode="out-in" appear>
        <Footer />
      </transition> -->
    </div>
  </div>
</template>

<style scoped>
.app-main__outer {
  padding-top: 6rem;
}
</style>

