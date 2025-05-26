<script setup lang="ts">
import Menu from "@/components/Menu.vue";
import { NLayout, NLayoutContent, NLayoutSider } from "naive-ui";

// 获取当前系统平台
// console.log(window.rubick.isMacOs());
// console.log(window.rubick.isWindows());
// console.log(window.rubick.isLinux());

// window.rubick.setFeature({
//   code: "aaa",
//   explain: "aaa",
//   cmds: ["aaa"],
// });

// window.rubick.setFeature({
//   code: "bbb",
//   explain: "bbb",
//   cmds: ["bbb"],
// });

// window.rubick.setFeature({
//   code: "dlcv-env",
//   explain: "dlcv-env",
//   cmds: ["dlcv-env"],
// });
</script>

<template>
  <NLayout has-sider>
    <NLayoutSider
      bordered
      collapse-mode="width"
      :width="150"
      :native-scrollbar="false"
    >
      <Menu />
    </NLayoutSider>
    <NLayoutContent>
      <div style="flex-grow: 1">
        <router-view />
      </div>
    </NLayoutContent>
  </NLayout>
</template>

<style scoped>
.n-layout {
  height: 100%;
}

.n-layout-content {
  padding: 20px;
}

:deep(.n-layout-scroll-container) {
  display: flex;
}
</style>
