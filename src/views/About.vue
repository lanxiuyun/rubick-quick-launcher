<script setup lang="ts">
import { NCard } from "naive-ui";

const dage_url = "https://github.com/1129921824";
const naiv_url = "https://www.naiveui.com/zh-CN/os-theme";
const pixel_url = "https://maomentai817.github.io/pixel-ui/";

const openExternalLink = (url: string) => {
  window.open(url, "_blank");
};
</script>

<template>
  <div class="about">
    <div class="acknowledgments">
      <h2>特别鸣谢</h2>
      <div class="acknowledgment-list">
        <n-card
          hoverable
          class="acknowledgment-item"
          @click="openExternalLink(dage_url)"
        >
          <h3>核心贡献者</h3>
          <img src="/20693715.jpg" alt="核心贡献者" class="ack-logo" />
          <p>
            感谢您对本项目的贡献！您是项目中不可或缺的一部分，您的努力和
            智慧为项目增添了无限光彩。
          </p>
        </n-card>

        <n-card
          hoverable
          class="acknowledgment-item"
          @click="openExternalLink(naiv_url)"
        >
          <h3>UI 组件库</h3>
          <div class="icon-wrapper">
            <img src="/naive-logo.svg" alt="Naive UI Logo" class="ack-logo" />
            <span>Naive UI</span>
          </div>
        </n-card>

        <n-card
          hoverable
          class="acknowledgment-item"
          @click="openExternalLink(pixel_url)"
        >
          <h3>像素风格支持</h3>
          <div class="icon-wrapper">
            <img
              src="/pixel-ui-logo.png"
              alt="Pixel UI Logo"
              class="ack-logo"
            />
            <span>Pixel UI</span>
          </div>
        </n-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.acknowledgments {
  margin-top: 2rem;
}

.acknowledgment-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 1.5rem;
}

.acknowledgment-item:hover {
  cursor: var(--pixel-cursor-pointer);
}

.acknowledgment-item h3 {
  margin: 0 0 1rem 0;
  color: var(--el-text-color-primary);
}

.acknowledgment-item a {
  color: var(--el-color-primary);
  text-decoration: none;
  font-weight: 500;
}

.acknowledgment-item a:hover {
  text-decoration: underline;
}

.acknowledgment-item p {
  margin: 0.5rem 0 0 0;
  color: var(--el-text-color-secondary);
  font-size: 0.9rem;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.icon-wrapper span {
  color: var(--el-color-primary);
  font-weight: 500;
}

.ack-logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  padding: 2px;
}
</style>
