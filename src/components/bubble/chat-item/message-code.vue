<template>
  <section
    class="immsg-code border-solid border-b-[1px] border-my-border-1 el-container is-vertical"
    :class="{ full, [msgClass]: true }"
  >
    <header class="el-header header border-solid border-b-[1px] border-my-border-1">
      <p>{{ content.lang }}</p>
      <p>
        <n-icon
          class="icon"
          :size="16"
          :component="PersonOutline"
          @click="onClipboard"
        />
        <n-icon
          class="icon"
          :size="16"
          :component="WineOutline"
          @click="full = !full"
        />
      </p>
    </header>

    <main class="el-main main me-scrollbar me-scrollbar-thumb">
      <n-code :language="content.lang" :code="content.code" show-line-numbers />
    </main>
  </section>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
import { BookOutline, PersonOutline, WineOutline } from "@vicons/ionicons5";
const full = ref(false)
const props = defineProps({
  message: {
    type: Object,
    default: {},
  },
});
const content = computed(() => {
  let { extra} = props.message;
  let {code,lang} = JSON.parse(extra);
  return {
    code,
    lang,
  }
});
const msgClass = computed(() => {
  let { position = false } = props.message;
  return position ? "bg-my-bg-3" : "bg-my-bg-4";
});
const onClipboard = () => {
  navigator.clipboard.writeText(content.code);
};
</script>

<style lang="less" scoped>
.immsg-code {
  border-radius: 5px;
  overflow-x: auto;
  padding: 5px 10px;
  max-width: fit-content;
  min-width: 250px;
  width: 100%;

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 38px;
    cursor: pointer;
    font-size: 16px;

    .icon {
      margin-left: 8px;
    }
  }

  .main {
    overflow-y: hidden;
    padding: 10px 0;

    overflow: auto;
    :deep(.n-code pre) {
      overflow: auto;
    }

    max-height: 300px;
  }

  .footer {
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.03);
    border-radius: 20px;
    margin: 10px 0;
  }

  &.full {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    border: unset;
    box-sizing: border-box;
    max-width: unset;
    max-height: unset;
    border-radius: unset;

    .header {
      height: 60px;
    }

    .main {
      overflow-y: unset;
      max-height: unset;
    }
  }
}

html[theme-mode="dark"] {
  .immsg-code {
    border: unset;
    background: rgb(43 43 43);

    .footer {
      background-color: rgba(255, 255, 255, 5%);
    }
  }
}
</style>