import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
export const useSubscriptionStore = defineStore('subscriptions', () => {
  const users = useStorage('subscription_users', []);
  const groups = useStorage('subscription_groups', []);
  const addUser = (user) => users.value.push(user);
  const addGroup = (group) => groups.value.push(group);
  return { users, groups, addUser, addGroup };
});
