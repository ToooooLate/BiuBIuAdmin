<template>
  <div class="md:flex">
    <template v-for="(item, index) in growCardList" :key="item.title">
      <Card
        size="small"
        :loading="loading"
        :title="item.title"
        class="md:w-1/4 w-full md:mt-0 '!mt-4' md:!mx-2"
      >
        <template #extra>
          <Tag :color="item.color">{{ item.action }}</Tag>
        </template>

        <div class="py-4 px-4 flex justify-between items-center">
          <span class="text-2xl"> ${{ item.value }} </span>
          <!-- <Icon :icon="item.icon" :size="40" /> -->
          <IconifyIconOnline
            :icon="item.icon"
            style="width: 35px; height: 35px"
          />
        </div>

        <div class="p-2 px-4 flex justify-between">
          <span>总{{ item.title }}</span>
          <span class="text-2xl"> ${{ item.total }} </span>
        </div>
      </Card>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { Tag, Card } from "ant-design-vue";
import { growCardList } from "../data";

defineProps({
  loading: {
    type: Boolean
  }
});
</script>
