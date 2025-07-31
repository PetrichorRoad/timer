<template>
  <section class="el-container is-vertical w-full h-full">
    <header class="el-header me-view-header border-bottom flex justify-between items-center p-4 border-solid border-[1px] border-my-border-1">
      <div>
        <n-breadcrumb>
          <n-breadcrumb-item :clickable="false" :key="item.name" v-for="item in breadcrumb">{{
            item.name
          }}</n-breadcrumb-item>
          ({{ filter.length }})
        </n-breadcrumb>
      </div>

      <div>
        <n-space style="display: flex; align-items: center">
          <n-input
            v-model:value.trim="keywords"
            placeholder="搜索"
            clearable
            style="width: 200px"
            round
          >
            <template #prefix>
              <n-icon :component="TerminalSharp" />
            </template>
          </n-input>
        </n-space>
      </div>
    </header>

    <main class="el-main flex-1">
      <section class="h-full flex">
        <aside
          class="el-aside border-right p-2"
          style="width: 200px"
          v-dropsize="{
            min: 200,
            max: 500,
            direction: 'right',
            key: 'aside-organize'
          }"
        >
        <!--  -->
         <!--  -->
          <n-tree
            key-field="value"
            label-field="label"
            :data="tree"
            :default-expand-all="true"
            :cancelable="true"
            :node-props="onNodeProps"
            :default-selected-keys="[-1]"
            block-node
            block-line
            :show-line="true"
          />
        </aside>

        <main class="el-main flex-1" v-if="filter.length" style="padding-bottom: 10px">
          <n-virtual-list style="max-height: inherit" :item-size="80" :items="filter">
            <template #default="{ item }">
              <div :key="item.user_id" class="item-box hover:border-my-border-2 pointer border-my-border-1">
                <div class="avatar" @click="onInfo(item)">
                  <n-avatar :src="item.avatar" :size="40" :username="item.nickname" />
                </div>
                <div class="content" @click="onInfo(item)">
                  <div class="content-title">
                    <span>
                      <n-icon v-if="item.gender == 1" :component="MaleOutline" color="#508afe" />
                      <n-icon v-if="item.gender == 2" :component="Female" color="#ff5722" />
                    </span>
                    <span>{{ item.remark || item.nickname }}</span>
                    <n-tag
                      v-for="(v, index) in item.position_items"
                      size="small"
                      type="info"
                      :key="index"
                      >{{ v.name }}</n-tag
                    >
                  </div>
                  <div class="content-text text-ellipsis">
                    个性签名: {{ item.signature ? item.signature : '暂无' }}
                  </div>
                </div>
                <div class="tool">
                  <n-button text size="small" type="primary" @click="onToTalk(item)">
                    发消息
                  </n-button>
                </div>
              </div>
            </template>
          </n-virtual-list>
        </main>

        <main class="el-main flex-1 flex-center" v-else>
          <n-empty description="暂无相关数据" />
        </main>
      </section>
    </main>
  </section>
</template>


<script setup lang="js">
// import { useUserStore, useTalkStore } from '@/store'
import { ServOrganizeDepartmentList, ServOrganizePersonnelAll } from '@/api/modules/organize'
import { getUserInfo } from '@/utils/lib'
import { saveSession } from "@/database/data.js";
import { Female, MaleOutline,TerminalSharp } from "@vicons/ionicons5";
import { useRouter } from 'vue-router'
import { computed,ref,onMounted,h } from 'vue'
import { useMessage } from "naive-ui";
import { NTag } from 'naive-ui'
import request from "@/api/base";
import { useSessionStore } from "@/store/session.js";
const talkStore = useSessionStore();
const router = useRouter()
const message = useMessage();
// const userStore = useUserStore()
// const talkStore = useTalkStore()
// const { toShowUserInfo, message } = useInject()

const ancestors = ref('')
const keywords = ref('')
const items = ref([])

const filter = ref([])

const tree = ref([])
const breadcrumb =([{ name: '企业成员', dept_id: -1 }])

const onToTalk = async (item) => {
  let { chatList } = talkStore
  let { accountId } = item
  let chat = chatList.find(item => item.id === accountId)
  if (chat){
    router.push({ name: 'address-book' })
  }else{
    await saveSession(accountId, []);
    router.push({ name: 'address-book' })
  }
}


const onInfo = (item) => {
  // toShowUserInfo(item.user_id)
}

const onNodeProps = ({ option }) => {
  return {
    async onClick() {
      let { depId } = option
      let { data } = await request.getUserLists({ depId })
      filter.value = data
    }
  }
}

const tag = () => {
  return h(NTag, {
    type: 'info',
    size: 'small',
    bordered: false,
    style: {
      margin: '5px 0px 5px 0px'
    },
    innerHTML: '全员'
  })
}

async function onLoadDepartment() {
  const {data} = await request.getOrganizationTree({companyId:1})
  tree.value = [data]
}

async function onLoadData() {
  const { code, data } = await ServOrganizePersonnelAll()
  if (code != 200) return

  const users = data.items || []

  users.map((item) => {
    item.position_items.sort((a, b) => a.sort - b.sort)
    item.ancestors = `${item.dept_item.ancestors},${item.dept_item.dept_id}`

    item.position = item.position_items.map((item) => item.name).join('、')

    return item
  })

  items.value = users.sort((a, b) => a.nickname.localeCompare(b.nickname, 'zh-CN'))
}

onMounted(() => {
  onLoadData()
  onLoadDepartment()
})
</script>
<style lang="less" scoped>
.aside {
  width: 250px;
  padding: 8px;
}

.item-box {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.5s;
  border-radius: 5px;
  padding: 5px 0;
  margin: 10px;
  border:1px solid pink;

  > div {
    height: inherit;
  }

  .avatar {
    width: 70px;
    height: inherit;
    flex-shrink: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    flex: 1;
    overflow: hidden;
    user-select: none;

    &-title {
      display: flex;
      align-items: center;
      height: 30px;
      line-height: 30px;
      span {
        margin-right: 5px;
      }
    }

    &-text {
      height: 30px;
      line-height: 30px;
      color: rgba(0, 0, 0, 45%);
    }
  }

  .tool {
    width: 60px;
    flex-shrink: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-right: 10px;
  }
}

html[theme-mode='dark'] {
  .item-box {
    background-color: rgba(255, 255, 255, 5%);
    border-color: transparent;

    &:hover {
      background-color: rgba(255, 255, 255, 10%);
    }

    .content {
      &-text {
        color: rgba(255, 255, 255, 50%);
      }
    }
  }
}
</style>
