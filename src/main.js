import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { createHelia } from 'helia';
import { json } from '@helia/json';
import { ipns } from '@helia/ipns';
import { dht, pubsub } from '@helia/ipns/routing';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Load helia
const helia = await createHelia();
app.provide('helia', helia);
app.provide('heliaJSON', json(helia));
app.provide('heliaIPNS', ipns(helia, [dht(helia), pubsub(helia)]));
document.querySelector('#ipfs-loading').remove();

app.mount('#app')
