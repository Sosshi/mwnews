<template>
  <div v-for="article in articles" :key="article.id">
    <h1>
      <a :href="article.link">{{ article.heading }}</a>
    </h1>
    <img :src="article.image" :alt="getImgAlt(article.heading)" />
    <p>{{ article.description }}</p>
    <h2>{{ article.source }}</h2>
    <h3>{{ article.date }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import Article from "@/types/Articles";

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

    /* 
    const dateNow = ref<Date>();
    const publishedDate = ref<Date>();

    const DAY_IN_MILLISECONDS = ref<number>(86_400_000);
    const convertToDate = (date: string | Date) => {
      dateNow.value = new Date();
      publishedDate.value = new Date(date);

      let DateNowMilliseconds: number = dateNow.value.getTime();
      let publishedDateMilliseconds: number = publishedDate.value.getTime();

      let compareMilliseconds = DateNowMilliseconds - publishedDateMilliseconds;
      console.log(compareMilliseconds);

      if (compareMilliseconds < DAY_IN_MILLISECONDS.value) {
        let convert =compareMilliseconds/1000
        return { convert};
      } else if (
        compareMilliseconds >= DAY_IN_MILLISECONDS.value &&
        compareMilliseconds < DAY_IN_MILLISECONDS.value * 2
      ) {
        let yesterday = "Yesterday";
        return { yesterday };
      }
      let displayDate =
        String(publishedDate.value.getFullYear()) +
        ", " +
        String(publishedDate.value.getMonth() + 1) +
        ", " +
        String(publishedDate.value.getDay() + 1);

      return { displayDate };
    };*/

    return { getImgAlt };
  },
});
</script>
