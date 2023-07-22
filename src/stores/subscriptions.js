import { reactive } from 'vue';
import { defineStore } from 'pinia';
export const useSubscriptionStore = defineStore('subscriptions', () => {
  const users = reactive([]);
  const groups = reactive([]);
  const addUser = (user) => users.push(user);
  const addGroup = (group) => groups.push(group);
  return { users, groups, addUser, addGroup };
});
