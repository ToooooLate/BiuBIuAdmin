export default {
  path: "/dashboard",
  redirect: "/dashboard/analysis",
  meta: {
    icon: "informationLine",
    title: "数据首页",
    rank: 9
  },
  children: [
    {
      path: "/dashboard/analysis",
      name: "Analysis",
      component: () => import("@/views/dashboard/analysis/index.vue"),
      meta: {
        title: "后台首页"
      }
    }
  ]
} as RouteConfigsTable;
