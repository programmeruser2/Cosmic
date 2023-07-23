<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';
import KeyUnlock from './components/KeyUnlock.vue';
let idInitialized = ref(false);
function handleUnlock() {
  idInitialized.value = true;
}
</script>

<template>
  <header v-if="idInitialized">
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/subscribe">Subscribe</RouterLink>
        <RouterLink to="/feed">Feed</RouterLink>
        <RouterLink to="/post">Post</RouterLink>
      </nav>
    </div>
  </header>
  <KeyUnlock v-if="!idInitialized" @unlock="handleUnlock"/>
  <RouterView v-if="idInitialized"/>
</template>

