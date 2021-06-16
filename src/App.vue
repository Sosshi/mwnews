<template>
  <div
    class="
      w-screen
      md:h-16
      h-10
      bg-red-700
      flex
      lg:justify-start
      justify-center
      md:pl-40
      items-center
      space-x-20
      fixed
    "
  >
    <div class="md:inline text-xl text-gray-800 hidden">
      <a href="#" class="hover:text-gray-200">Home</a>
    </div>
    <div class="md:inline text-xl text-gray-800 hidden">
      <a href="#" class="hover:text-gray-200">About</a>
    </div>
    <div>
      <form class="flex space-x-2">
        <input placeholder="search" type="text" v-model="search" class="lg:w-96 text-gray-600 rounded-2xl lg:h-8 px-2" v-if="isSearchButtonClicked" />
        <button @click.prevent="isSearchClicked()" class="hover:text-gray-50"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            /></svg
        ></button>
      </form>
    </div>
  </div>
  <Home />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Home from "./views/Home.vue";

export default defineComponent({
  name: "App",
  components: {
    Home,
  },

  setup(){
    const isSearchButtonClicked = ref<boolean>(false);
    const search = ref<string>("")

    const isSearchClicked = () => {
      if (isSearchButtonClicked.value){
        isSearchButtonClicked.value = false
        searchWords(search.value)
      }else {
        isSearchButtonClicked.value = true
      }
    }
    const searchWords = (words: string)=> {
      console.log(words)
    }
    return {isSearchClicked, isSearchButtonClicked, search, searchWords}
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
