<template>
  <div class="message">
    <el-popover placement="bottom" :width="310" trigger="click">
      <template #reference>
        <el-badge :value="5" class="item">
          <i :class="'iconfont icon-xiaoxi'" class="toolBar-icon"></i>
        </el-badge>
      </template>
      <el-tabs v-model="activeName">
        <el-tab-pane label="通知(5)" name="first">
          <div class="message-list">
            <div class="message-item">
              <img src="@/assets/images/msg01.png" alt="" class="message-icon" />
              <div class="message-content">
                <span class="message-title">一键三连 Geeker-Admin 🧡</span>
                <span class="message-date">一分钟前</span>
              </div>
            </div>
            <div class="message-item">
              <img src="@/assets/images/msg02.png" alt="" class="message-icon" />
              <div class="message-content">
                <span class="message-title">一键三连 Geeker-Admin 💙</span>
                <span class="message-date">一小时前</span>
              </div>
            </div>
            <div class="message-item">
              <img src="@/assets/images/msg03.png" alt="" class="message-icon" />
              <div class="message-content">
                <span class="message-title">一键三连 Geeker-Admin 💚</span>
                <span class="message-date">半天前</span>
              </div>
            </div>
            <div class="message-item">
              <img src="@/assets/images/msg04.png" alt="" class="message-icon" />
              <div class="message-content">
                <span class="message-title">一键三连 Geeker-Admin 💜</span>
                <span class="message-date">一星期前</span>
              </div>
            </div>
            <div class="message-item">
              <img src="@/assets/images/msg05.png" alt="" class="message-icon" />
              <div class="message-content">
                <span class="message-title">一键三连 Geeker-Admin 💛</span>
                <span class="message-date">一个月前</span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="消息(0)" name="second">
          <div class="message-empty">
            <img src="@/assets/images/notData.png" alt="notData" />
            <div>暂无消息</div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="代办(0)" name="third">
          <div class="message-empty">
            <img src="@/assets/images/notData.png" alt="notData" />
            <div>暂无代办</div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const activeName = ref("first");
</script>

<style scoped lang="scss">
.message-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 260px;
  line-height: 45px;
}
.message-list {
  display: flex;
  flex-direction: column;
  .message-item {
    display: flex;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid var(--el-border-color-light);
    &:last-child {
      border: none;
    }
    .message-icon {
      width: 40px;
      height: 40px;
      margin: 0 20px 0 5px;
    }
    .message-content {
      display: flex;
      flex-direction: column;
      .message-title {
        margin-bottom: 5px;
      }
      .message-date {
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }
    }
  }
}
</style>
