<template>
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
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import Article from "@/types/Articles";
import convertToDate from "@/methods/dateProcessor";

export default defineComponent({
  name: "NewsList",
  props: {
    articles: {
      required: true,
      type: Array as PropType<Article[]>,
    },
  },
  setup() {
    const ImgAlt = ref<string>("");

    const getImgAlt = (heading: string) => {
      ImgAlt.value = "image description of " + heading;
    };

    const toDate = (date: string | Date) => {
      return convertToDate(date);
    };

    return { getImgAlt, toDate };
  },
});
</script>

