import {defineStore} from "pinia";
import {ref} from "vue";

export const useUserStore = defineStore('User',()=>{
  const dialogVisible = ref<boolean>(false)


  return{
    dialogVisible,
  }
})