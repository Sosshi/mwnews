<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="false"
    :on-cancel="true"
    :is-full-page="true"
  />
  <div class="" v-if="displayResults">
    <div v-for="article in articles" :key="article.id">
      <h1>{{ article.heading }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import Article from "@/types/Articles";
import { defineComponent, ref, onMounted, computed } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import axios from "axios";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "SearchNews",
  components: { Loading },
  setup() {
    const articles = ref<Article[]>([]);
    const isLoading = ref<boolean>(true);
    const isConnected = ref<boolean>(true);
    const route = useRoute();

    const displayResults = computed(()=>{
      console.log("I am from computed")
      return fetchNews(route.params.words)
    })

    const load = () => {
      isLoading.value = false;
    };

    const fetchNews = (word: string | string[]) => {
      axios
        .get("https://mwnews.herokuapp.com/apinews/?heading__icontains=" + word)
        .then((response) => (articles.value = response.data.results))
        .then(() => {
          load();
          isConnected.value = true;
        })
        .catch(() => {
          console.log("Oops seems likes something is not okay");
          isConnected.value = false;
          isLoading.value = false;
        });
        return articles.value
    };
    onMounted(() => {
      console.log("I am from Mount")
      fetchNews(route.params.words);
    });
    return { articles, isLoading, isConnected, fetchNews, displayResults };
    
  },
});
</script>