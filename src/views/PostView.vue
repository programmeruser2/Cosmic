<script setup>
  import { useRoute } from 'vue-router';
  import { inject, ref, onBeforeMount } from 'vue';
  import { peerIdFromString } from '@libp2p/peer-id';
  const route = useRoute();
  const cid = route.params.cid;
  const j = inject('heliaJSON');
  const name = inject('heliaIPNS');
  const body = ref('');
  const author = ref('');
  const time = ref('');
  const error = ref('');
  onBeforeMount(async () => {
    const obj = await j.get(CID.parse(cid));
    const peer = peerIdFromString(obj.author);
    const authorCID = await j.get(name.resolve(peer));
    const info = await j.get(authorCID);
    if (!info.lookup[obj.hash]) {
    error.value = 'post not found';
    return;
    } 
    body.value = info.lookup[obj.hash].body;
    author.value = obj.author;
    time.value = (new Date(obj.timestamp * 1000)).toLocaleTimeString('en-US');
  });
</script>
<template>
  <h1>View Post </h1>
  <h5>CID: {{cid}}</h5>
  <h6>Author: {{author}}</h6> <br/>
  <h6>Time posted: {{time}}</h6> <br/>
  <p>{{body}}</p> <br/>
  <p class="error" v-if="error">{{error}}</p>
</template>
