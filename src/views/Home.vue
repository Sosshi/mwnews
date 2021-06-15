<template>
    <div v-if="articles.length > 0 && isConnected">
        <NewsList :articles="articles"/>
    </div>

    <div v-else-if="isConnected == false">
        Failed to connect !
    </div>

    <div v-else>
        connecting...
    </div>
  
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";
import Article from "@/types/Articles";
import NewsList from "@/components/NewsList.vue";

export default defineComponent({
  name: "Home",
  components: { NewsList },
  setup() {
    const articles = ref<Article[]>([]);
    const isConnected = ref<boolean>(true)

    const fetchNews = () => {
      axios
        .get("https://mwnews.herokuapp.com/apinews/")
        .then((response) => (articles.value = response.data.results)).catch(()=> {console.log("Oops seems likes something is not okay"); isConnected.value=false;});
    };

    onMounted(() => {
      fetchNews();
    });

    return { articles, isConnected };
  },
});
</script>