<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="false"
    :on-cancel="onCancel"
    :is-full-page="isFullpage"
  />

  <div v-if="articles.length > 0 && isConnected">
    <div
      class="flex pt-20 flex-col"
      :class="checkedNames.length > 0 ? 'pt-20' : 'pt-10'"
    >
      <h1 v-if="checkedNames.length > 0" class="text-center">
        Showing data for {{ checkedNames }}
      </h1>
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
      <div
        class="
          md:flex
          pt-24
          lg:w-2/12
          flex-col
          items-center
          hidden
          fixed
          pl-4
          top-0
          right-0
        "
      >
        <h1 class="text-xl text-blue-500 pr-14 pb-4">
          Filters{{ filterNews }}
        </h1>
        <div id="v-model-multiple-checkboxes">
          <div class="flex justify-start space-x-4">
            <input
              type="checkbox"
              id="Zodiak"
              value="Zodiak"
              v-model="checkedNames"
              class="block"
            />
            <label for="Zodiak">Zodiak</label>
          </div>
          <div class="flex justify-start space-x-4">
            <input
              type="checkbox"
              id="nyasatimes"
              value="nyasatimes"
              v-model="checkedNames"
              class="block"
            />
            <label for="nyasatimes">nyasatimes</label>
          </div>
          <div class="flex justify-start space-x-4">
            <input
              type="checkbox"
              id="times mw"
              value="times mw"
              v-model="checkedNames"
              class="block"
            />
            <label for="times mw">times mw</label>
          </div>
          <div class="flex justify-start space-x-4">
            <input
              type="checkbox"
              id="Malawi Nation"
              value="Malawi Nation"
              v-model="checkedNames"
              class="block"
            />
            <label for="Malawi Nation">Malawi Nation</label>
          </div>
          <br />
        </div>
      </div>
    </div>
  </div>

  <div
    v-else-if="isConnected == false"
    class="flex min-h-screen w-full justify-center items center"
  >
    Failed to connect !
  </div>

  <div v-else class="flex min-h-screen w-full justify-center items center">
    connecting...
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";
import Article from "@/types/Articles";
import NewsList from "@/components/NewsList.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { useStore } from "vuex";

export default defineComponent({
  name: "Home",
  components: { NewsList, Loading },
  setup() {
    const store = useStore();
    const articles = ref<Article[]>([]);
    const isConnected = ref<boolean>(true);
    const isLoading = ref<boolean>(true);
    const isFullpage = ref<boolean>(true);
    const checkedNames = ref<Array<string>>([]);

    const getFilterOptions = (options: any) => {
      let element;
      if (options.length == 0) return "cannot parse empty array";
      for (let i = 0; i < options.length; i++) {
        if (element) {
          element = element + ("&source__icontains=" + options[i]);
        } else {
          element = "?" + ("source__icontains=" + options[i]);
        }
      }
      return element;
    };

    const onCancel = () => {
      console.log("Cancelled the loader");
    };

    const load = () => {
      isLoading.value = false;
    };

    const fetchNews = (url: string) => {
      isLoading.value = true;
      axios
        .get(url)
        .then((response) => (store.state.articles = response.data.results))
        .then(() => {
          load();
          isConnected.value = true;
          articles.value = store.state.articles;
        })
        .catch(() => {
          console.log("Oops seems likes something is not okay");
          isConnected.value = false;
          isLoading.value = false;
          articles.value = store.state.articles;
        });
    };

    onMounted(() => {
      fetchNews("https://mwnews.herokuapp.com/apinews/");
    });

    return {
      articles,
      isConnected,
      isLoading,
      isFullpage,
      onCancel,
      checkedNames,
      fetchNews,
      getFilterOptions,
    };
  },
  computed: {
    filterNews() {
      if (this.checkedNames.length > 0) {
        console.log("I am accessed");
        let url =
          "https://mwnews.herokuapp.com/apinews/" +
          this.getFilterOptions(this.checkedNames);
        this.fetchNews(url);
        console.log(url);
      }
      return "";
    },
  },
});
</script>


<style scoped>
</style>