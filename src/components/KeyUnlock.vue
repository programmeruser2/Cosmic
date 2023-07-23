<script setup>
  import { ref, inject } from 'vue';
  const helia = inject('helia');
  const j = inject('heliaJSON');
  const name = inject('heliaIPNS');

  const emit = defineEmits(['unlock']);
  const existingKey = !!localStorage.getItem('ipns_key');

  const keyBits = ref(2048);
  const keyType = ref('RSA');

  const error = ref('');
  const password = ref('');

  async function makeKey() {
    if ((await helia.libp2p.keychain.listKeys()).map(x => x.name).indexOf('cosmos-key') != -1) {
      await helia.libp2p.keychain.removeKey('cosmos-key');
    }
    try {
      //console.log(keyType);
      const keyInfo = await helia.libp2p.keychain.createKey('cosmos-key', keyType.value, keyBits.value);
      // Setup our identity
      // No posts at the start
      //const j = inject('heliaJSON');
      const cid = j.add({ posts: [] });
      //const name = inject('heliaIPNS');
      const peerId = await helia.libp2p.keychain.exportPeerId(keyInfo.name);
      await name.publish(peerId, cid);
      localStorage.setItem('ipns_key', await helia.libp2p.keychain.exportKey('cosmos-key', password.value));
      emit('unlock');
    } catch (err) {
      error.value = err.toString();
      if (err.toString().indexOf('PublishError.InsufficientPeers') != -1) {
        error.value += '. Try waiting until you have connected to more peers';
      }
    }
  }
  async function unlockKey() {
    try {
      await helia.libp2p.keychain.importKey('cosmos-key', localStorage.getItem('ipns_key'), password.value);
      emit('unlock');
    } catch (err) {
      error.value = `${err.toString()}. Either your password is wrong, the key is corrupted, or something else went wrong.`;
    }
  }
</script>
<template>
  <div v-if="existingKey">
    <h1>Unlock your existing Cosmos keypair</h1>
    <input v-model="password" type="password" placeholder="Password"/>
    <button @click="unlockKey">Unlock the keypair</button>
  </div>
  <div v-if="!existingKey">
    <h1>Create a new keypair for Cosmos</h1>
    <label for="keypair-type">Keypair type:</label>
    <select v-model="keyType" id="keypair-type">
      <option value="RSA">RSA</option>
      <!--<option value="Ed25519">Ed25519</option>
      <option value="secp256k1">Secp256k1</option> -->
    </select> 
    <br/>
    <label for="keypair-bits">Keypair bits:</label>
    <input v-model="keyBits" id="keypair-bits" type="number"/>
    <input v-model="password" type="password" placeholder="Password"/>
    <button @click="makeKey">Create the keypair</button>
  </div>
  <p class="error" v-if="error">{{error}}</p>
</template>

