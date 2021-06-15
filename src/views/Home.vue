<template>
    <div>Home {{x}}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
    name: "Home",
    data(){
        return {
            x:"hie there"
        }
    }

});
</script>