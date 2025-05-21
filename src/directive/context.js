import { createApp, h } from 'vue';
import ContextMenu from '@/components/context/context-menu.vue';

let contextMenuApp;

export const context = {
  mounted(el, binding) {
    // 创建独立的 Vue 应用来挂载菜单（避免污染主应用）
    if (!contextMenuApp) {
      const mountPoint = document.createElement('div');
      document.body.appendChild(mountPoint);
      
      contextMenuApp = createApp({
        render() {
          return h(ContextMenu, {
            items: binding.value,
            visible: this.visible,
            x: this.x,
            y: this.y,
            onClose: () => this.visible = false
          });
        },
        data() {
          return { visible: false, x: 0, y: 0 };
        }
      });
      
      contextMenuApp.mount(mountPoint);
    }

    el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      contextMenuApp._instance.proxy.visible = true;
      contextMenuApp._instance.proxy.x = e.clientX;
      contextMenuApp._instance.proxy.y = e.clientY;
    });

    // 点击外部关闭
    document.addEventListener('click', () => {
      if (contextMenuApp?._instance) {
        contextMenuApp._instance.proxy.visible = false;
      }
    });
  },
  unmounted() {
    contextMenuApp?.unmount();
  }
};