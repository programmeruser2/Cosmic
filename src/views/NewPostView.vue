<script setup>
  import { sha256 } from '../utils/sha256.js';
  import { ref, inject } from 'vue';
  import { useIdentityStore } from '../stores/identity.js';
  import router from '../router/index.js';
  const idStore = useIdentityStore();
  const body = ref('');
  const j = inject('heliaJSON');
  async function createPost() {
    const timestamp = Date.now();
    const hash = sha256(String(timestamp) + body);
    idStore.identity.lookup[hash] = {timestamp, body};
    const obj = {timestamp, hash, version: 0, author: localStorage.getItem('cosmic_identity')};
    const cid = await j.add(obj);
    idStore.identity.posts.push(cid.toString());
    router.push({ path: '/view/' + cid.toString() });
  }
</script>
<template>
  <h1>Create Post</h1>
  <textarea v-model="body" type="text" placeholder="Post Body"/> <br/>
  <!-- specify group to post into -->
  <button @click="createPost">Create Post</button>
</template>
