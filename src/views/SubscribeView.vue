<script setup>
  import { useSubscriptionStore } from '../stores/subscriptions.js';
  import { ref } from 'vue';
  const store = useSubscriptionStore();
  const subs = [];
  for (const user of store.users) {
    subs.push({type:'user',content:user});
  }
  for (const group of store.groups) {
    subs.push({type:'group', content:group});
  }

  const subUser = ref('');
  const subGroup = ref('');

  function handleSubUser() {
    store.addUser(subUser.value);
  }

  function handleSubGroup() {
    store.addGroup(subGroup.value);
  }
</script>
<template>
  <h1>Subscribe</h1>
  <details>
    <summary>Show existing subscriptions</summary>
    <ul>
      <li v-for="sub in subs">
        <p>{{sub.type == 'user' ? 'User' : 'Group'}}: {{sub.content}} </p>
      </li>
    </ul>
  </details>
  <h2>Subscribe to a new user</h2>
  <input v-model="subUser" type="text" placeholder="User"/>
  <button @click="handleSubUser">Subscribe</button>
  
  <h2>Subscribe to a new group</h2>
  <input v-model="subGroup" type="text" placeholder="Group"/>
  <button @click="handleSubGroup">Subscribe</button>

</template>
