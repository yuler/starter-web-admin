<script lang="ts" setup>
defineProps({
  collapsed: Boolean,
})
defineEmits(['update:collapsed'])
</script>

<template>
  <div class="w-full h-full flex items-center justify-between">
    <div class="h-full flex">
      <div
        class="h-full px-4 cursor-pointer flex items-center"
        @click="$emit('update:collapsed', !collapsed)"
      >
        <el-icon size="18" class="h-full">
          <icon-ant-design-MenuUnfoldOutlined />
        </el-icon>
      </div>
      <div class="h-full px-4 cursor-pointer flex items-center">
        <el-icon size="18" class="h-full">
          <icon-ant-design-ReloadOutlined />
        </el-icon>
      </div>
      <el-breadcrumb class="ml-2 flex items-center">
        <el-breadcrumb-item :to="{path: '/'}"> homepage </el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">promotion management</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="h-full flex">
      <div class="h-full px-4 cursor-pointer flex items-center">
        <el-icon size="18" class="h-full">
          <icon-ant-design-SearchOutlined />
        </el-icon>
      </div>
      <div class="h-full px-4 cursor-pointer flex items-center">
        <el-icon size="18" class="h-full">
          <icon-ant-design-GithubOutlined />
        </el-icon>
      </div>
      <div class="h-full px-4 cursor-pointer flex items-center">
        <el-icon size="18" class="h-full">
          <icon-ant-design-LockOutlined />
        </el-icon>
      </div>
      <div class="h-full px-4 flex items-center cursor-pointer">
        <el-avatar class="rounded">
          xxx
          <template #icon>
            <icon-ant-design-UserOutlined />
          </template>
        </el-avatar>
      </div>
      <div class="h-full px-4 cursor-pointer flex items-center">
        <el-icon size="18" class="h-full">
          <icon-ant-design-SettingOutlined />
        </el-icon>
      </div>
    </div>
  </div>
</template>
