<script setup>
  import { ref } from 'vue';
  const name = ref('');
  const body = ref('');
  function createPost() {

  }
</script>
<template>
  <h1>Create Post</h1>
  <input v-model="name" type="text" placeholder="Post Name"/>
  <textarea v-model="body" type="text" placeholder="Post Body"/>
  <!-- specify group to post into -->
  <button @click="createPost">Create Post</button>
</template>
