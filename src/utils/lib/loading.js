import { createApp } from 'vue';

//含有loading样式的组件
import loadingWrapper from '@/components/loading/loading.vue';
import bookingWrapper from '@/components/loading/booking.vue';
//存储每个元素的loading状态
const map = new WeakMap();
// let loadingMap = {
//     "booking": bookingWrapper
//     "carding": loadingWrapper
// }
const createAndShowLoadingAnimation = (container) => {
    const loadingDivInstance = createApp(loadingWrapper);
    loadingDivInstance.mount(container);
    container.style.display = 'flex';
};

const hideLoadingAnimation = (container) => {
    container.style.display = 'none';
};

//自定义指令
export const loading = {
    mounted(el, binding) {
        el.style.position = 'relative';
        //创建一个div容器并添加到使用指令的元素中
        const loadingDivContainer = document.createElement('div');
        loadingDivContainer.className = 'loading-container';
        loadingDivContainer.style.display = 'none';
        el.appendChild(loadingDivContainer);

        //根据传入的值决定是否显示loading动画
        if (binding.value) {
            createAndShowLoadingAnimation(loadingDivContainer);
        }

        //将元素和loading状态存储到map中
        map.set(el, { loadingDivContainer, value: binding.value });
    },

    updated(el, binding) {
        //获取元素的loading状态
        const { loadingDivContainer, value: oldValue } = map.get(el) || {};
        //如果传入的值和之前的值不一样，则更新loading状态
        if (binding.value !== oldValue) {
            if (binding.value) {
                createAndShowLoadingAnimation(loadingDivContainer);
            } else {
                hideLoadingAnimation(loadingDivContainer);
            }
            map.set(el, { loadingDivContainer, value: binding.value });
        }
    },

    unmounted(el) {
        const { loadingDivContainer } = map.get(el) || {};
        if (loadingDivContainer) {
            hideLoadingAnimation(loadingDivContainer);
            map.delete(el);
        }
    }
};
