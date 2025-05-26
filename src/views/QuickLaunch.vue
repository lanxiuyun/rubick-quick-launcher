<template>
  <div class="quick-launch-container">
    <div class="quick-launch-header">
      <h2>快捷启动</h2>
      <PxButton type="primary" @click="handleAdd"> 添加 </PxButton>
    </div>
    <n-list bordered hoverable>
      <n-list-item v-for="item in launchList">
        <div class="list-item-content">
          <div class="item-info">
            <PxText type="primary">{{ item.name }}</PxText
            ><br />
            <PxText type="success">{{ item.command }}</PxText
            ><br />
            <PxText v-if="item.desc" type="sakura">{{ item.desc }}</PxText>
          </div>
          <n-space>
            <PxButton size="small" @click="handleEdit(item)">修改</PxButton>
            <PxButton
              size="small"
              type="danger"
              @click="handleDelete(item.name)"
              >删除</PxButton
            >
          </n-space>
        </div>
      </n-list-item>
      <n-empty v-if="launchList.length === 0" description="暂无快捷启动项" />
    </n-list>
    <!-- 编辑/添加弹窗 -->
    <n-modal v-model:show="showModal">
      <n-card class="modal-card" title="快捷启动项">
        <n-form :model="form" label-width="80">
          <n-form-item label="名称">
            <n-input v-model:value="form.name" placeholder="如：VSCode" />
          </n-form-item>
          <n-form-item label="命令">
            <n-input
              v-model:value="form.command"
              placeholder='如：C:/vscode/code.exe "D:/rubick"'
            />
          </n-form-item>
          <n-form-item label="描述">
            <n-input v-model:value="form.desc" placeholder="可选" />
          </n-form-item>
        </n-form>
        <template #footer>
          <n-space justify="end">
            <PxButton @click="showModal = false">取消</PxButton>
            <PxButton type="primary" @click="handleSave">保存</PxButton>
          </n-space>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
import rubickFunc from "@/rubick/rubickFunc";
import { PxButton, PxText } from "@mmt817/pixel-ui";
import {
  NCard,
  NEmpty,
  NForm,
  NFormItem,
  NInput,
  NList,
  NListItem,
  NModal,
  NSpace,
} from "naive-ui";
import { ref } from "vue";

const launchList = ref(rubickFunc.fetchLauncherList());
const showModal = ref(false);
const form = ref({ name: "", command: "", desc: "" });
const editingOriginalName = ref("");

function handleAdd() {
  form.value = { name: "", command: "", desc: "" };
  editingOriginalName.value = "";
  showModal.value = true;
}

function handleEdit(item) {
  form.value = { ...item };
  editingOriginalName.value = item.name;
  showModal.value = true;
}

function handleDelete(name) {
  const item = launchList.value.find((item) => item.name === name);
  launchList.value = launchList.value.filter((item) => item.name !== name);
  rubickFunc.saveLauncherList(launchList.value);
  removeFeature(item.command);
}

function handleSave() {
  if (editingOriginalName.value) {
    const index = launchList.value.findIndex(
      (item) => item.name === editingOriginalName.value
    );
    if (index !== -1) {
      if (editingOriginalName.value !== form.value.name) {
        removeFeature(launchList.value[index].command);
      }
      launchList.value[index] = { ...form.value };
    }
  } else {
    launchList.value.push({ ...form.value });
  }
  showModal.value = false;
  setFeature(form.value.command, form.value.desc, [form.value.name]);
  rubickFunc.saveLauncherList(launchList.value);
  editingOriginalName.value = "";
}

function setFeature(code, explain, cmds) {
  window.rubick.setFeature({
    code,
    explain,
    cmds,
  });
}

function removeFeature(code) {
  window.rubick.removeFeature(code);
}
</script>

<style scoped>
.quick-launch-container {
  width: 100%;
  height: 100%;
}

.quick-launch-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.quick-launch-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

.list-item-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.item-info {
  flex: 1;
  word-break: break-all;
  white-space: normal;
  overflow-wrap: break-word;
}

.modal-card {
  width: 400px;
}
</style>
