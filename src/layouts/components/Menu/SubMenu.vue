<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <template #title>
        <!-- 处理图标 -->
        <template v-if="subItem.meta.icon">
          <template v-if="subItem.meta.icon.startsWith('svg-icon-')">
            <SvgIcon
              :name="subItem.meta.icon.replace('svg-icon-', '')"
              :icon-style="{ width: '18px', height: '18px', marginRight: '5px' }"
            />
          </template>
          <el-icon v-else>
            <component :is="subItem.meta.icon" />
          </el-icon>
        </template>
        <span v-else class="mr-[18px]"></span>
        <!-- 标题 -->
        <span class="sle">{{ subItem.meta.title }}</span>
      </template>
      <SubMenu :menu-list="subItem.children" />
    </el-sub-menu>

    <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
      <!-- 处理图标 -->
      <template v-if="subItem.meta.icon">
        <template v-if="subItem.meta.icon.startsWith('svg-icon-')">
          <SvgIcon
            :name="subItem.meta.icon.replace('svg-icon-', '')"
            :icon-style="{ width: '18px', height: '18px', marginRight: '5px' }"
          />
        </template>
        <el-icon v-else>
          <component :is="subItem.meta.icon" />
        </el-icon>
      </template>
      <span v-else class="mr-[18px]"></span>

      <!-- 标题 -->
      <template #title>
        <span class="sle">{{ subItem.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

defineProps<{ menuList: Menu.MenuOptions[] }>();

const router = useRouter();
const handleClickMenu = (subItem: Menu.MenuOptions) => {
  if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
  router.push(subItem.path);
};
</script>

<style lang="scss">
.el-sub-menu .el-sub-menu__title:hover {
  color: var(--el-menu-hover-text-color) !important;
  background-color: transparent !important;
}
.el-menu--collapse {
  .is-active {
    .el-sub-menu__title {
      color: #ffffff !important;
      background-color: var(--el-color-primary) !important;
    }
  }
}
.el-menu-item {
  &:hover {
    color: var(--el-menu-hover-text-color);
  }
  &.is-active {
    color: var(--el-menu-active-color) !important;
    background-color: var(--el-menu-active-bg-color) !important;
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      content: "";
      background-color: var(--el-color-primary);
    }
  }
}
.vertical,
.classic,
.transverse {
  .el-menu-item {
    &.is-active {
      &::before {
        left: 0;
      }
    }
  }
}
.columns {
  .el-menu-item {
    &.is-active {
      &::before {
        right: 0;
      }
    }
  }
}
</style>
