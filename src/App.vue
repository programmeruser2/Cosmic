<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
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
  <RouterView/>
</template>

