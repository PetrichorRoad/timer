
import UserCardModal from '@/components/user/UserCardModal.vue'
import { useUserStore } from '@/store'
import { getUserInfo } from "@/utils/auth.js";
export function useInject() {
  const dialog = window['$dialog']
  const message = window['$message']
  const notification = window['$notification']
  const modal = window['$modal']

  // 显示用户信息
  const toShowUserInfo = (userId) => {
    // const { uid: loginUserId } = useUserStore()
    let { uid } = getUserInfo()
    const instance = modal.create({
      content: () =>
        h(UserCardModal, {
          userId,
          loginUserId:uid,
          onClose: () => instance.destroy()
        }),
      preset: 'card',
      closable: false,
      style: { width: 'auto', background: 'transparent' },
      contentStyle: { padding: '0px' }
    })
  }

  return { toShowUserInfo, dialog, message, notification, modal }
}
