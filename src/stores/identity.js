import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
export const useIdentityStore = defineStore('identity', () => {
  const identity = useStorage('cosmic_identity_value', { version: 0, posts: [], lookup: {} });
  return { identity };
});
