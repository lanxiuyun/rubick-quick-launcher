import type { App } from "vue";

const { spawn } = window.require("child_process");

export function onPluginReady(app: App) {
  window.rubick.onPluginReady(
    async ({
      code,
      type,
      payload,
    }: {
      code: string;
      type: string;
      payload: any;
    }) => {
      if (code === "quick-launcher") {
        // 进入快捷启动页面，也就是 App.vue 页面，无需任何操作
      } else {
        // 使用 spawn 创建子进程
        const child = spawn(code, [], {
          shell: true,
          detached: true,
          stdio: "ignore",
        });
        // 让子进程独立运行
        child.unref();

        window.rubick.hideMainWindow();
        window.rubick.outPlugin();
      }
    }
  );
}
