<script setup>
import { defineProps } from "vue";
const props = defineProps(["items"]);
</script>

<template>
  <div class="breadcrumb">
    <ul v-if="props.items.length > 0">
      <li v-for="item in props.items" :key="item.name">
        <span v-if="item.active" :class="{ active: item.active }">{{
          item.name
        }}</span>
        <router-link v-else :to="item.links">{{ item.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.breadcrumb {
  position: relative;
  padding: 8px;
  background: #fcf8f8;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  border-radius: 0.25rem;
}
.breadcrumb ul {
  padding: 0px;
  margin: 0px;
  text-align: left;
  display: flex;
  align-items: center;
}
.breadcrumb ul li {
  list-style: none;
  display: inline-block;
}

.breadcrumb ul li + li {
  padding-left: 0.5rem;
}

.breadcrumb ul li + li::before {
  float: left;
  padding-right: 0.5rem;
  color: #6c757d;
  content: "/";
}

.breadcrumb ul li a {
  color: rgba(51, 51, 51, 0.3);
  text-decoration: none;
}
.breadcrumb ul li .active {
  color: teal;
}
</style>