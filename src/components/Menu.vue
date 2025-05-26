<script setup lang="ts">
import type { MenuOption } from "naive-ui";
import { NMenu } from "naive-ui";
import { computed, h } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Component } from "vue";

const router = useRouter();
const route = useRoute();

const menuOptions = computed<MenuOption[]>(() => {
  return router.options.routes.map((route) => ({
    label: route.meta?.title || route.name,
    key: route.path,
    icon: route.meta?.icon ? () => h(route.meta!.icon as Component) : undefined,
  }));
});

const handleUpdateValue = (key: string) => {
  router.push(key);
};
</script>

<template>
  <NMenu
    :options="menuOptions"
    :value="route.path"
    @update:value="handleUpdateValue"
  />
</template>

<style scoped>
.n-menu {
  height: 100%;
}
</style>
