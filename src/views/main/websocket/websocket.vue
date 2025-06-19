<template>
    <div class="websocket">
    </div>
</template>

<script setup lang="jsx">
import { ref,h } from 'vue'
import { NAvatar, NButton, useNotification } from "naive-ui";
import moment from 'moment'
const notification = useNotification();
let websocketConnection = ref(null)
const sendNotice = (data) => {
  console.log(data);
  const n = notification.create({
    title: () =>
      h(NAvatar, {
        size: "small",
        round: true,
        src: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
      }),
    content: ()=>{
      // return (<div v-html={}></div>)
      return (<div v-text={data.content}></div>)
    },
    meta: moment().format("YYYY-MM-DD HH:mm:ss"),
    action: () =>
      h(
        NButton,
        {
          text: true,
          type: "primary",
          onClick: () => {
            markAsRead = true;
            n.destroy();
          },
        },
        {
          default: () => "已读",
        }
      ),
    onClose: () => {
      n.destroy();
    },
    // duration: 5000,
  });
};
const createWebSocket = () => {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')||{})
    let clientId = userInfo.accountId
    let socketUrl =  `ws://127.0.0.1:8080/timer/ws/${clientId}`
    if (typeof WebSocket == 'undefined') {
      
    } else {
      let websocket = null
      websocket = new WebSocket(socketUrl)
      // 监听socket打开
      websocket.onopen = function () {
        console.log('浏览器WebSocket已打开')
      }
      // 监听socket消息接收
      websocket.onmessage = function (msg) {
        sendNotice(JSON.parse(msg.data))
        // // 转换为json对象
        // that.$refs.audioVo.currentTime = 0
        // that.$refs.audioVo2.currentTime = 0

        // console.log(msg, JSON.parse(msg.data), 'msg')
        // // const h = this.$createElement
        // const jsonMsg = JSON.parse(msg.data)
        // if (jsonMsg.type === 1) {
        //   that.$refs.audioVo.play()
        // } else if (jsonMsg.type === 2) {
        //   that.$refs.audioVo2.play()
        // }
        // that.$notify({
        //   title: jsonMsg.type === 1 ? '待接单' : '催单',
        //   duration: 0,
        //   dangerouslyUseHTMLString: true,
        //   onClick: () => {
        //     that.$router
        //       .push(`/order?orderId=${jsonMsg.orderId}`)
        //       .catch((err) => {
        //         console.log(err)
        //       })
        //     setTimeout(() => {
        //       location.reload()
        //     }, 100)
        //   },
        //   // 这里也可以把返回信息加入到message中显示
        //   message: `${
        //     jsonMsg.type === 1
        //       ? `<span>您有1个<span style=color:#419EFF>订单待处理</span>,${jsonMsg.content},请及时接单</span>`
        //       : `${jsonMsg.content}<span style='color:#419EFF;cursor: pointer'>去处理</span>`
        //   }`,
        // })
      }
      // 监听socket错误
      websocket.onerror = function () {
        // that.$notify({
        //   title: '错误',
        //   message: '服务器错误，无法接收实时报警信息',
        //   type: 'error',
        //   duration: 0,
        // })
      }
      // 监听socket关闭
      websocket.onclose = function () {
        console.log('WebSocket已关闭')
      }

      return websocketConnection.value = websocket
    }
}
// createWebSocket()
</script>