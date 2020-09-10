<%_ if (options['va-study-public-sdk']) { _%>
import { Service } from './ajax'

declare module 'vue/types/vue' {
  interface Vue {
    $api: Service;
  }
}
<%_ } _%>
