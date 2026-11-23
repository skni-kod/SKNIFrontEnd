import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import beAxios from '@/axios';

export function useUsers() {
  const store = useStore();
  const users = ref<any[]>([]);

  onMounted(() => {
    beAxios
      .get('api/users/', {
        headers: {
          Authorization: 'Bearer ' + store.getters.token,
        },
      })
      .then((res) => {
        users.value = res.data.map((element: any) => ({
          ...element,
          fullname: element.first_name + ' "' + element.username + '" ' + element.last_name,
        }));
      });
  });

  return users;
}
