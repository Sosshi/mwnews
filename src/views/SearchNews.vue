<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="false"
    :on-cancel="true"
    :is-full-page="true"
  />
  <div
    class="
      pt-12
      md:grid
      lg:grid-cols-3
      md:grid-cols-2
      flex flex-col
      md:h-96
      lg:px-10
      px-2
      gap-8
      lg:w-10/12
      w-full
    "
    v-if="displayResults"
  >
    <div v-for="article in articles" :key="article.id">
      <div class="group bg-gray-50 hover:shadow mt-5 md:h-96 flex flex-grow">
        <div class="pb-4">
          <img :src="article.image" alt="" class="h-1/2 w-full object-cover" />
          <a :href="article.link" class=""
            ><h1 class="text-2xl group-hover:text-blue-500 text-gray-700 pt-4">
              {{ article.heading }}
            </h1></a
          >
          <p class="text-gray-500 group-hover:text-gray-700">
            {{ article.description.slice(0, 110) }}...<a
              :href="article.link"
              class="text-blue-500"
              >read more</a
            >
          </p>
          <span class="text-gray-400 px-5">{{ toDate(article.date) }}</span>
          <span
            :class="
              article.source == 'Zodiak Malawi'
                ? 'text-yellow-600'
                : article.source == 'times mw'
                ? 'text-red-600'
                : article.source == 'nyasatimes'
                ? 'text-red-800'
                : 'text-blue-600'
            "
            ><a :href="article.link">{{ article.source }}</a></span
          >
        </div>
      </div>
    </div>
    <div class="flex h-full w-full justify-center items-center text-xl text-gray-700">Oops no results found for {{$route.params.words}} </div>
  </div>
</template>

<script lang="ts">
import Article from "@/types/Articles";
import { defineComponent, ref, onMounted, computed } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import convertToDate from "@/methods/dateProcessor";

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
    const toDate = (date: string | Date) => {
      return convertToDate(date);
    };

    const displayResults = computed(() => {
      console.log("I am from computed");
      return fetchNews(route.params.words);
    });

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
      return articles.value;
    };
    onMounted(() => {
      console.log("I am from Mount");
      fetchNews(route.params.words);
    });
    return {
      articles,
      isLoading,
      isConnected,
      fetchNews,
      displayResults,
      toDate,
    };
  },
});
</script>