import { createApp } from "vue";

//含有loading样式的组件
import loadingWrapper from "@/components/loading/loading1.vue";
import bookingWrapper from "@/components/loading/booking.vue";
//存储每个元素的loading状态
const map = new WeakMap();
let componentMap = {
  card: loadingWrapper,
  book: bookingWrapper,
};
const createAndShowLoadingAnimation = (container,type) => {
  const loadingDivInstance = createApp(componentMap[type]);
  loadingDivInstance.mount(container);
  container.style.display = "flex";
};

const hideLoadingAnimation = (container) => {
  container.style.display = "none";
};

//自定义指令
export const loading = {
  mounted(el, binding) {
    el.style.position = "relative";
    //创建一个div容器并添加到使用指令的元素中
    const loadingDivContainer = document.createElement("div");
    loadingDivContainer.className = "loading-container";
    loadingDivContainer.style.display = "none";
    el.appendChild(loadingDivContainer);
    let {
      value: { loading, type },
    } = binding;

    //根据传入的值决定是否显示loading动画
    if (loading) {
      createAndShowLoadingAnimation(loadingDivContainer, type);
    }

    //将元素和loading状态存储到map中
    map.set(el, { loadingDivContainer, value: loading });
  },

  updated(el, binding) {
    let {
      value: { loading, type },
    } = binding;
    //获取元素的loading状态
    const { loadingDivContainer, value: oldValue } = map.get(el) || {};
    //如果传入的值和之前的值不一样，则更新loading状态
    if (loading !== oldValue) {
      if (loading) {
        createAndShowLoadingAnimation(loadingDivContainer, type);
      } else {
        hideLoadingAnimation(loadingDivContainer);
      }
      map.set(el, { loadingDivContainer, value: loading });
    }
  },

  unmounted(el) {
    const { loadingDivContainer } = map.get(el) || {};
    if (loadingDivContainer) {
      hideLoadingAnimation(loadingDivContainer);
      map.delete(el);
    }
  },
};
