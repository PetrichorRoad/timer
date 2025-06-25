

<template>
  <section class="h-full w-full flex flex-col" id="drawer-container">
    <!-- 头部区域 -->
    <header class="el-header border-solid border-solid border-b-[1px] border-my-border-1">
      <!-- <panel-header
        :talk-mode="talkParams.talkMode"
        :username="talkParams.username"
        :online="talkParams.online"
        :keyboard="talkParams.keyboard"
        :num="talkParams.num"
        :menu="talkStore.isShowSessionMenu"
        :description="talkParams.description"
        @evnet="onPanelHeaderEvent"
        @change-session-menu="
          (value) => {
            talkStore.isShowSessionMenu = value
          }
        "
      ></panel-header> -->

      <panel-header></panel-header>
    </header>

    <!-- 聊天区域 -->
    <main class="flex-1 min-h-[0px] overflow-hidden">
      <panel-chat-list></panel-chat-list>
    </main>

    <!-- 编辑器区域 -->
    <footer
      class="el-footer border-t-[1px] border-solid border-my-border-1"
      :style="{ height: '200px' }"
    >
    <panel-chat-editor></panel-chat-editor>
      <!-- <Editor
        :uid="talkParams.uid"
        :index-name="talkParams.indexName"
        :talk-mode="talkParams.talkMode"
        :to-from-id="talkParams.toFromId"
        :online="talkParams.online"
        :members="members"
      /> -->
    </footer>
  </section>

  <!-- <n-drawer
    v-model:show="uploadsStore.isShow"
    :width="400"
    placement="right"
    :trap-focus="false"
    :block-scroll="false"
    show-mask="transparent"
    to="#drawer-container"
  >
    <UploadsModal />
  </n-drawer>

  <GroupNoticeDrawer
    v-model="isShowGroupNoticeAside"
    :group-id="talkParams.toFromId"
  />

  <n-drawer
    v-model:show="isShowGroupAside"
    :width="400"
    placement="right"
    show-mask="transparent"
    to="#drawer-container"
  >
    <GroupPanel
      :group-id="talkParams.toFromId"
      @close="isShowGroupAside = false"
    />
  </n-drawer> -->

  <!-- <GroupLaunch
    v-if="showGroupLaunch.isShowGroupLaunch"
    :group-id="showGroupLaunch.groupId"
    @close="showGroupLaunch.isShowGroupLaunch = false"
    @on-submit="
      (groupId) => {
        talkStore.toTalk(TalkModeEnum.Group, groupId, router);
      }
    "
  /> -->
</template>


<script setup>
import panelChatEditor from './chat-panel/panel-chat-editor.vue';
import panelHeader from './chat-panel/panel-header.vue';
import panelChatList from './chat-panel/panel-chat-list.vue';
</script>
