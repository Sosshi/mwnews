<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="false"
    :on-cancel="onCancel"
    :is-full-page="isFullpage"
  />

  <div v-if="articles.length > 0 && isConnected">
    <div class="flex flex-col pt-16">
      <!--<div class="h-5/6 bg-gray-100 grid grid-cols-2">
        <img
          src="https://times.mw/wp-content/uploads/2021/06/lafarge-cement-390x220.jpg"
          alt=""
          class="w-full h-full object-cover"
        />
        <div class="grid grid-cols-2 w-full">
          <img
            src="https://www.nyasatimes.com/wp-content/uploads/21FD7C2F-D239-4A19-9F78-9FE46551B0BC-600x600.jpeg shadow-inner"
            class="object-cover h-full w-full"
            alt=""
          />
          <img
            src="https://www.nyasatimes.com/wp-content/uploads/a-Nyasa-Times-pic-7228.jpg shadow-inner shadow"
            class="object-cover h-full w-full"
            alt=""
          />
          <img
            src="https://www.zodiakmalawi.com/media/k2/items/cache/1483d5fc21b6efae347a9bf42df7466b_L.jpg"
            alt=""
            class="object-cover h-full w-full col-span-2"
          />
          <img
            src="https://www.zodiakmalawi.com/media/k2/items/cache/dd1d8cc2241bc82b0a81e801cebd9ed7_L.jpg"
            class="object-cover h-full w-full"
            alt=""
          />
          <img
            src="https://times.mw/wp-content/uploads/2021/06/Covid-vaccine-390x220.jpg"
            class="object-cover h-full w-full"
            alt=""
          />
        </div>
      </div>-->
      <div
        class="
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
      >
        <NewsList :articles="articles" />
      </div>
    </div>
  </div>

  <div v-else-if="isConnected == false" class="">Failed to connect !</div>

  <div v-else class="">connecting...</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";
import Article from "@/types/Articles";
import NewsList from "@/components/NewsList.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default defineComponent({
  name: "Home",
  components: { NewsList, Loading },
  setup() {
    const articles = ref<Article[]>([]);
    const isConnected = ref<boolean>(true);
    const isLoading = ref<boolean>(true);
    const isFullpage = ref<boolean>(true);

    const onCancel = () => {
      console.log("Cancelled the order");
    };

    const storeNews = (news: Article[]) => {
      localStorage.setItem("news", JSON.stringify(news));
    };

    const getNewsStored = () => {
      let retrievedData = localStorage.getItem("news");
      if (retrievedData == null) {
        return {
          id: 0,
          heading: "",
          description: "",
          source: "",
          link: "",
          image: "",
          date: "",
        } as Article;
      }

      return JSON.parse(String(retrievedData)) as Article;
    };

    const load = () => {
      isLoading.value = false;
    };

    const fetchNews = () => {
      axios
        .get("https://mwnews.herokuapp.com/apinews/")
        .then((response) => (articles.value = response.data.results))
        .then(() => {
          if (articles.value == []) {
            storeNews(articles.value);
          }
        })
        .catch(() => {
          console.log("Oops seems likes something is not okay");
          isConnected.value = false;
          console.log(getNewsStored());
        });
      load();
    isConnected.value = true
      console.log(getNewsStored());
    };

    onMounted(() => {
      fetchNews();
    });

    return { articles, isConnected, isLoading, isFullpage, onCancel };
  },
});
</script>

<style scoped>
</style>