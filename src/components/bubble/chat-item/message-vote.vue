<template>
  <section class="im-message-vote border-solid border-[1px] border-my-border-1">
    <div class="vote-from">
      <div class="vheader">
        <p style="font-weight: bold">
          {{ voteType }}
        </p>
        <p>{{ voteDetail.title }}</p>
      </div>

      <template v-if="voteDetail.is_submit">
        <div class="vbody">
          <div
            class="vote-view"
            v-for="option in voteDetail.answer_options"
            :key="option.key"
          >
            <p class="vote-option">{{ option.key }}、 {{ option.value }}</p>
            <p class="vote-census">
              {{ option.num }} 票 {{ option.progress }}%
            </p>
            <p class="vote-progress">
              <n-progress
                type="line"
                :height="5"
                :show-indicator="false"
                :percentage="option.progress"
                color="#1890ff"
              />
            </p>
          </div>
        </div>
        <div class="vfooter vote-view">
          <p>应参与人数：{{ voteDetail.answer_num }} 人</p>
          <p>实际参与人数：{{ voteDetail.answered_num }} 人</p>
        </div>
      </template>
      <template v-else>
        <div class="vbody">
          <div
            class="option"
            :class="{ radio: voteDetail.answer_mode == 1 }"
            v-for="option in voteDetail.answer_options"
            :key="option.key"
          >
            <p class="checkbox">
              <n-checkbox
                v-model:checked="option.is_checked"
                @update:checked="onCheckboxChange(option.is_checked, option)"
              />
            </p>
            <p
              class="text"
              @click="onCheckboxChange(!option.is_checked, option)"
            >
              {{ option.key }}、{{ option.value }}
            </p>
          </div>
        </div>
        <div class="vfooter">
          <n-button plain round @click="onSubmit">
            {{ isCanSubmit ? "立即投票" : "请选择进行投票" }}
          </n-button>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import request from "@/api/modules/user";
import { ref, defineProps, computed, onMounted } from "vue";
const props = defineProps({
  message: {
    type: Object,
    default: {},
  },
});
const voteDetail = ref({
  answer_options:[]
});
const voteId = computed(() => {
  let { extra } = props.message;
  let { vote_id } = JSON.parse(extra);
  return vote_id;
});
const getVoteDetail = async () => {
  let { data } = await request.getVoteDetailById({ vote_id: voteId.value });
  voteDetail.value = data;
  let items = [];
  for (const v of data.answered_users) {
    for (const option of v.options) {
      items.push(option);
    }
  }
  voteDetail.value.answer_options.forEach((option) => {
    option.progress =
      (items.filter((item) => item == option.key).length / items.length) * 100;
  });
};
const onSubmit = () => { 
};
const voteType = computed(() => {
  let { answer_mode } = voteDetail.value;
  return answer_mode ? "多选投票" : "单选投票";
});
const isCanSubmit = computed(() => {
  return voteDetail.value?.answer_options.some((item) => item.is_checked);
});

onMounted(() => {
  getVoteDetail();
});
</script>

<style lang="less" scoped>
.im-message-vote {
  width: 300px;
  min-height: 150px;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;

  .vote-from {
    width: 100%;

    .vheader {
      min-height: 50px;
      background: #4e83fd;
      padding: 15px;
      position: relative;

      p {
        margin: 3px 0;
        &:first-child {
          color: rgb(245, 237, 237);
          font-size: 13px;
          margin-bottom: 8px;
        }

        &:last-child {
          color: white;
        }
      }

      &::before {
        content: '投票';
        position: absolute;
        font-size: 60px;
        color: white;
        opacity: 0.1;
        top: -5px;
        right: 10px;
      }
    }

    .vbody {
      min-height: 80px;
      width: 100%;
      padding: 5px 15px;
      box-sizing: border-box;

      .option {
        margin: 14px 0px;
        font-size: 13px;
        display: flex;
        flex-direction: row;
        align-items: center;
        user-select: none;

        .text {
          margin-left: 10px;
          cursor: pointer;
          line-height: 26px;
        }

        &.radio {
          :deep(.n-checkbox-box) {
            border-radius: 50%;
            margin-top: 2px;
          }
        }
      }

      margin-bottom: 10px;
    }

    .vfooter {
      height: 55px;
      text-align: center;
      box-sizing: border-box;

      .n-button {
        width: 90%;
        font-weight: 400;
      }

      &.vote-view {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding-left: 15px;

        p {
          border-left: 2px solid #2196f3;
          padding-left: 5px;
        }
      }
    }
  }

  .vote-view {
    width: 100%;
    min-height: 30px;
    margin: 15px 0;
    box-sizing: border-box;

    > p {
      margin: 6px 0px;
      font-size: 13px;
    }

    .vote-option {
      min-height: 20px;
      line-height: 20px;
    }

    .vote-census {
      height: 20px;
      line-height: 20px;
    }
  }
}
</style>