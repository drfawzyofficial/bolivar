<script>

import Vertical from "@/router/layouts/vertical";
import Horizontal from "@/router/layouts/horizontal";

export default {
  components: { Vertical, Horizontal },
  computed: {
   layoutType: 'vertical'
  }
};
</script>

<template>
  <div>
    <vertical v-if="layoutType === 'vertical'" >
      <slot />
    </vertical>

    <Horizontal v-if="layoutType === 'horizontal'" :layout="layoutType">
      <slot />
    </Horizontal>
  </div>
</template>