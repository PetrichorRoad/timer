

<template>
  <section class="el-container is-vertical" id="drawer-container">
    <!-- 头部区域 -->
    <header class="el-header border-solid border-solid border-b-[1px] border-[#44496B]">
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
    <main class="el-main">
      <!-- <ChatPlus
        ref="chat"
        :items="records"
        :custom-render="customMessageRender"
        data-source-mode="pulldown"
        :onScrollLoadMore="loadChatRecord"
        :unread="dialogueStore.unreadBubble"
        :multi-select-mode="true"
        :context-menu="true"
        :context-menu-option="contextMenuOptions"
        @context-menu-event="onContextMenuEvent"
        @element-select="onChatElementSelect"
        @element-event="onContextMenuEvent"
        @user-click-event="onElementClickUser"
        @on-scroll-to-bottom="onClearUnread"
      /> -->
    </main>

    <!-- 编辑器区域 -->
    <!-- <footer
      v-show="isShowEditor"
      class="el-footer"
      :style="{ height: 200 + 'px' }"
      v-dropsize="{ min: 100, max: 600, direction: 'top', key: 'editor' }"
    >
      <MultiSelectComponent v-if="isShowMultiSelect" />

      <Editor
        v-else
        :uid="talkParams.uid"
        :index-name="talkParams.indexName"
        :talk-mode="talkParams.talkMode"
        :to-from-id="talkParams.toFromId"
        :online="talkParams.online"
        :members="members"
      />
    </footer> -->
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
import panelHeader from './chat-panel/panel-header.vue';
</script>
