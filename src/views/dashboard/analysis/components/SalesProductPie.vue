<template>
  <Card title="成交占比" :loading="loading">
    <div ref="chartRef" :style="{ width, height }" />
  </Card>
</template>
<script lang="ts" setup>
import { Ref, ref, watch } from "vue";
import { Card } from "ant-design-vue";
import { useECharts } from "@pureadmin/utils";

const props = defineProps({
  loading: Boolean,
  width: {
    type: String as PropType<string>,
    default: "100%"
  },
  height: {
    type: String as PropType<string>,
    default: "300px"
  }
});

const chartRef = ref<HTMLDivElement | null>(null);
const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

watch(
  () => props.loading,
  () => {
    if (props.loading) {
      return;
    }
    setOptions({
      legend: {
        top: "bottom"
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: false },
          dataView: { show: false, readOnly: false },
          restore: { show: false },
          saveAsImage: { show: false }
        }
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: [20, 80],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 3
          },
          data: [
            { value: 40, name: "rose 1" },
            { value: 38, name: "rose 2" },
            { value: 32, name: "rose 3" },
            { value: 30, name: "rose 4" },
            { value: 28, name: "rose 5" },
            { value: 26, name: "rose 6" },
            { value: 22, name: "rose 7" },
            { value: 18, name: "rose 8" }
          ].sort(function (a, b) {
            return a.value - b.value;
          }),
          animationType: "scale",
          animationEasing: "exponentialInOut",
          animationDelay: function () {
            return Math.random() * 400;
          }
        }
      ]
    });
  },
  { immediate: true }
);
</script>
