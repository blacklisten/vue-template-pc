<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<%_ if (options.tools.includes('typescript')) { _%>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>
<%_ } else { _%>
<script>
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
<%_ } _%>