<template>
  <div class="card">
    <div class="card-header">
      <slot name="card-header"></slot>
    </div>
    <div class="card-body">
      <slot name="card-body"></slot>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.card {
  position: relative;
  border-radius: 3px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  overflow: hidden;
}
.card-header {
  position: relative;
}
.card-body {
  position: relative;
  color: #fff;
  padding: 8px;
}
</style>