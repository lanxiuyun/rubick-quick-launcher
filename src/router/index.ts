import AboutView from "@/views/About.vue";
import QuickLaunch from "@/views/QuickLaunch.vue";
import { InfoCircleOutlined, RocketOutlined } from "@vicons/antd";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // 使用 hash 模式, 适配 rubick 的 file:// 协议;
  routes: [
    {
      path: "/",
      name: "home",
      component: QuickLaunch,
      meta: {
        title: "快捷启动",
        icon: RocketOutlined,
      },
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
      meta: {
        title: "特别鸣谢",
        icon: InfoCircleOutlined,
      },
    },
  ],
});

export default router;
 