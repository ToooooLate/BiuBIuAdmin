<template>
  <Card title="访问来源" :loading="loading">
    <div ref="chartRef" :style="{ width, height }" />
  </Card>
</template>
<script lang="ts" setup>
import { Ref, ref, watch } from "vue";
import { Card } from "ant-design-vue";
import { useECharts } from "@pureadmin/utils";
import { http } from "@/utils/http";

type Result = {
  success: boolean;
  data: any;
};

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
const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);

http.request<Result>("get", "/getGeoMap").then(({ data }) => {
  echarts.registerMap("CN", data.mapjson);
});
watch(
  () => props.loading,
  () => {
    if (props.loading) {
      return;
    }
    setOptions({
      tooltip: {
        trigger: "item",
        formatter: "{b}<br/>{c} (p / km2)"
      },
      toolbox: {
        show: false,
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      visualMap: {
        min: 800,
        max: 50000,
        text: ["High", "Low"],
        realtime: false,
        calculable: true,
        inRange: {
          color: ["lightskyblue", "yellow", "orangered"]
        }
      },
      series: [
        {
          name: "访问量热度",
          type: "map",
          map: "CN",
          label: {
            show: true
          },
          zoom: 1.26,
          data: [
            { name: "北京市", value: 20057.34 },
            { name: "天津市", value: 15477.48 },
            { name: "上海市", value: 31686.1 },
            { name: "山西省", value: 6992.6 },
            { name: "内蒙古自治区", value: 44045.49 },
            { name: "广东省", value: 40689.64 },
            { name: "广西省", value: 37659.78 },
            { name: "湖北省", value: 45180.97 },
            { name: "湖南省", value: 55204.26 },
            { name: "海南省", value: 21900.9 },
            { name: "河北省", value: 4918.26 },
            { name: "河南省", value: 5881.84 },
            { name: "山东省", value: 4178.01 },
            { name: "陕西省", value: 2227.92 },
            { name: "四川省", value: 22180.98 },
            { name: "福建省", value: 9172.94 },
            { name: "辽宁省", value: 3368 },
            { name: "云南省", value: 806.98 },
            { name: "新疆维吾尔自治区", value: 806.98 },
            { name: "西藏自治区", value: 1806.98 },
            { name: "青海省", value: 2806.98 },
            { name: "甘肃省", value: 806.98 }
          ]
        }
      ]
    });
  },
  { immediate: true }
);
</script>
