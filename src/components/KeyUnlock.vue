<script setup>
  import { ref, inject, watch } from 'vue';
  import * as ipns from 'ipns';
  import { useIdentityStore } from '../stores/identity.js';

  const helia = inject('helia');
  const j = inject('heliaJSON');
  const name = inject('heliaIPNS');
  name.republish();

  const emit = defineEmits(['unlock']);
  const existingKey = !!localStorage.getItem('ipns_key');

  const idStore = useIdentityStore();

  const keyBits = ref(2048);
  const keyType = ref('RSA');

  const error = ref('');
  const password = ref('');
  const status = ref('');

  async function makeKey() {
    status.value = 'Creating a new identity...';
    if ((await helia.libp2p.keychain.listKeys()).map(x => x.name).indexOf('cosmic-key') != -1) {
      await helia.libp2p.keychain.removeKey('cosmic-key');
    }
    try {
      //console.log(keyType);
      const keyInfo = await helia.libp2p.keychain.createKey('cosmic-key', keyType.value, keyBits.value);
      // Setup our identity
      // No posts at the start
      //const j = inject('heliaJSON');
      const cid = await j.add(idStore.identity);
      //const name = inject('heliaIPNS');
      const peerId = await helia.libp2p.keychain.exportPeerId(keyInfo.name);
      const entry = await name.publish(peerId, cid);
      console.info(entry)
      doWatch();
      localStorage.setItem('ipns_key', await helia.libp2p.keychain.exportKey('cosmic-key', password.value));
      localStorage.setItem('cosmic_identity', peerId.toString());
      emit('unlock');
    } catch (err) {
      error.value = err.toString();
      console.warn(error.value);
      if (err.toString().indexOf('PublishError.InsufficientPeers') != -1) {
        error.value += '. Try waiting until you have connected to more peers';
      }
    }
    status.value = '';
  }
  async function unlockKey() {
    try {
      await helia.libp2p.keychain.importKey('cosmic-key', localStorage.getItem('ipns_key'), password.value);
      doWatch();
      emit('unlock');
    } catch (err) {
      error.value = `${err.toString()}. Either your password is wrong, the key is corrupted, or something else went wrong.`;
    }
  }
  function doWatch() {
    watch(idStore.identity, async (newId, oldId) => {
      const cid = await j.add(idStore.value);
      const peerId = await helia.libp2p.keychain.exportPeerId(keyInfo.name);
      const entry = await name.publish(peerId, cid);
      console.info(entry);
      localStorage.setItem('cosmic_identity', peerId.toString());
    });
  }
</script>
<template>
  <div v-if="existingKey">
    <h1>Unlock your existing Cosmic keypair</h1>
    <input v-model="password" type="password" placeholder="Password"/>
    <button @click="unlockKey">Unlock the keypair</button>
  </div>
  <div v-if="!existingKey">
    <h1>Create a new keypair for Cosmic</h1>
    <label for="keypair-type">Keypair type:</label>
    <select v-model="keyType" id="keypair-type">
      <option value="RSA">RSA</option>
      <option value="Ed25519">Ed25519</option>
      <option value="secp256k1">Secp256k1</option>
    </select> 
    <br/>
    <label for="keypair-bits">Keypair bits:</label>
    <input v-model="keyBits" id="keypair-bits" type="number"/>
    <input v-model="password" type="password" placeholder="Password"/>
    <button @click="makeKey">Create the keypair</button>
  </div>
  <p v-if="status">{{status}}</p>
  <p class="error" v-if="error">{{error}}</p>
</template>

