<script setup lang="js">
// import { useUserStore, useTalkStore } from '@/store'
import { ServOrganizeDepartmentList, ServOrganizePersonnelAll } from '@/api/modules/organize'
import { Female, MaleOutline,TerminalSharp } from "@vicons/ionicons5";
import { useRouter } from 'vue-router'
import { computed,ref,onMounted,h } from 'vue'
// import { useInject } from '@/hooks'
import { NTag } from 'naive-ui'

const router = useRouter()
// const userStore = useUserStore()
// const talkStore = useTalkStore()
// const { toShowUserInfo, message } = useInject()

const ancestors = ref('')
const keywords = ref('')
const items = ref([])

const filter = computed(() => {
  return items.value.filter((item) => {
    return (
      item.nickname.match(keywords.value) != null &&
      (ancestors.value == '' || item.ancestors.indexOf(ancestors.value) > -1)
    )
  })
})

const tree = ref([])
const breadcrumb =([{ name: '企业成员', dept_id: -1 }])

const onToTalk = (item) => {
  // if (userStore.uid != item.user_id) {
  //   talkStore.toTalk(1, item.user_id, router)
  // } else {
  //   message.info('禁止给自己发送消息!')
  // }
}

function toTree(list) {
  const map = {}

  list.forEach((item) => {
    map[item.dept_id] = item
  })

  const ancestors = (value) => {
    const list = []

    value.split(',').forEach((id) => {
      const item = map[parseInt(id)]

      item && list.push(item.dept_name)
    })

    return list
  }

  const tree = []

  for (const item of list) {
    item.breadcrumb = ancestors(item.ancestors || '').join(' / ')

    const parent = map[item.parent_id]
    if (parent) {
      if (parent.children == undefined) parent.children = []
      parent.children.push(item)
    } else {
      tree.push(item)
    }
  }

  return tree
}

const onInfo = (item) => {
  // toShowUserInfo(item.user_id)
}

const onNodeProps = ({ option }) => {
  return {
    onClick() {
      if (option.breadcrumb == '') {
        breadcrumb.value = [{ name: '企业成员', dept_id: -1 }]
      } else {
        breadcrumb.value = option.breadcrumb.split('/').map((name) => {
          return {
            name: name,
            dept_id: option.dept_id
          }
        })
      }

      ancestors.value = option.ancestors

      console.log(option.ancestors)
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
  const { code, data } = await ServOrganizeDepartmentList()
  if (code != 200) return

  let items = data.items || []
  items = items.map((item) => {
    return {
      parent_id: item.parent_id,
      dept_id: item.dept_id,
      dept_name: item.dept_name,
      ancestors: item.dept_id > 0 ? `${item.ancestors},${item.dept_id}` : '',
      prefix: item.dept_id == -1 ? tag : null,
      suffix: item.count
    }
  })

  tree.value = toTree(items)
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
          <n-tree
            key-field="dept_id"
            label-field="dept_name"
            :data="tree"
            :default-expand-all="true"
            :cancelable="true"
            :default-selected-keys="[-1]"
            :node-props="onNodeProps"
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
                  <im-avatar :src="item.avatar" :size="40" :username="item.nickname" />
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
                    个性签名: {{ item.motto ? item.motto : '暂无' }}
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
