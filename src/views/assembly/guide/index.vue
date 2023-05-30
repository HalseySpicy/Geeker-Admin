<template>
  <div class="card content-box">
    <span class="text"> 引导页 🍓🍇🍈🍉</span>
    <el-alert
      title="引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于 driver.js."
      type="warning"
      :closable="false"
    />
    <div id="Geeker">
      <el-button type="primary" @click.prevent.stop="guide"> 打开引导页 🤹‍♂️ </el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="guide">
import Driver from "driver.js";
import "driver.js/dist/driver.min.css";

const guide = () => {
  const driver: Driver = new Driver({
    allowClose: false,
    doneBtnText: "结束",
    closeBtnText: "关闭",
    nextBtnText: "下一步",
    prevBtnText: "上一步"
  });
  driver.defineSteps(steps);
  driver.start();
};

const steps = [
  {
    element: "#collapseIcon",
    popover: {
      title: "Collapse Icon",
      description: "Open && Close sidebar",
      position: "right"
    }
  },
  {
    element: "#breadcrumb",
    popover: {
      title: "Breadcrumb",
      description: "Indicate the current page location",
      position: "right"
    }
  },
  {
    element: "#assemblySize",
    popover: {
      title: "Switch Assembly Size",
      description: "Switch the system size",
      position: "left"
    }
  },
  {
    element: "#language",
    popover: {
      title: "Switch Language",
      description: "Switch the system language",
      position: "left"
    }
  },
  {
    element: "#searchMenu",
    popover: {
      title: "Page Search",
      description: "Page search, quick navigation",
      position: "left"
    }
  },
  {
    element: "#themeSetting",
    popover: {
      title: "Setting theme",
      description: "Customize settings theme",
      position: "left"
    }
  },
  {
    element: "#message",
    popover: {
      title: "Message Notification",
      description: "Can receive company information",
      position: "left"
    }
  },
  {
    element: "#fullscreen",
    popover: {
      title: "Full Screen",
      description: "Full Screen, Exit The Full Screen Page",
      position: "left"
    }
  }
];
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
