import * as echarts from "echarts";
export const option = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    label: {
        // text: 'Gradient Stacked Area Chart'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5'],
        textStyle: {
            color: '#ffffff'
        }
        //字体颜色
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLabel: {
                show: true,
                color: '#ffffff'
                // textStyle: {

                // }
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {//y轴文字的配置
                color: "#fff",
                margin: 15
                // textStyle: {

                // },
                // formatter: '{value} %'//y轴的每一个刻度值后面加上‘%’号
            },
        }
    ],
    series: [
        {
            name: 'Line 1',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(128, 255, 165)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(1, 191, 236)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [140, 232, 101, 264, 90, 340, 250]
        },
        {
            name: 'Line 2',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(0, 221, 255)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(77, 119, 255)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [120, 282, 111, 234, 220, 340, 310]
        },
        {
            name: 'Line 3',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(55, 162, 255)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(116, 21, 219)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [320, 132, 201, 334, 190, 130, 220]
        },
        {
            name: 'Line 4',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(255, 0, 135)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(135, 0, 157)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [220, 402, 231, 134, 190, 230, 120]
        },
        {
            name: 'Line 5',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            label: {
                show: true,
                position: 'top'
            },
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(255, 191, 0)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(224, 62, 76)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: [220, 302, 181, 234, 210, 290, 150]
        }
    ]
};
export const organization = [{
    label: '研发中心',
    value: Math.random().toString(36).substring(7),
    type: 'organization',
    level: 1,
    children: [
        {
            label: "基础研发部",
            type: "department",
            value: Math.random().toString(36).substring(7),
            level: 2,
            children: [
                {
                    label: "前端组",
                    type: "group",
                    level: 3,
                    value: Math.random().toString(36).substring(7),
                    children: [
                        {
                            label: "疾风知劲草",
                            type: "user",
                            position: "frontend",
                            sex: "man",
                            phone: "123456789",
                            email: "123@qq.com",
                            status: "active",
                            admin: true,
                            grade: 1,
                            value: Math.random().toString(36).substring(7),
                        },
                        {
                            label: "小羊君",
                            type: "user",
                            position: "frontend",
                            sex: "man",
                            phone: "123456789",
                            email: "123@qq.com",
                            status: "active",
                            grade: 2,
                            value: Math.random().toString(36).substring(7),
                        },
                        {
                            label: "忆长安",
                            type: "user",
                            position: "frontend",
                            sex: "woman",
                            phone: "123456789",
                            email: "123@qq.com",
                            status: "active",
                            grade: 2,
                            value: Math.random().toString(36).substring(7),
                        },
                    ]
                },
                {
                    label: "后端组",
                    type: "group",
                    level: 3,
                    value: Math.random().toString(36).substring(7),
                    children: [
                        {
                            label: "明天你好",
                            type: "user",
                            position: "backend",
                            sex: "man",
                            phone: "123456789",
                            email: "123@qq.com",
                            status: "active",
                            admin: true,
                            grade: 2,
                            value: Math.random().toString(36).substring(7),
                        },
                        {
                            label: "当昨天的我们走远了",
                            type: "user",
                            position: "backend",
                            sex: "man",
                            phone: "123456789",
                            email: "123@qq.com",
                            status: "active",
                            grade: 3,
                            value: Math.random().toString(36).substring(7),
                        }
                    ]
                },
                {
                    label: "测试组",
                    type: "group",
                    level: 3,
                    value: Math.random().toString(36).substring(7),
                    children: [
                        {
                            label: "长大以后",
                            type: "user",
                            position: "tester",
                            sex: "man",
                            phone: "123456789",
                            value: Math.random().toString(36).substring(7),
                            email: "123@qq.com",
                            status: "active",
                            admin: true,
                            grade: 3,
                        },
                        {
                            label: "当昨天的我们走远了",
                            type: "user",
                            position: "tester",
                            sex: "man",
                            phone: "123456789",
                            value: Math.random().toString(36).substring(7),
                            email: "123@qq.com",
                            status: "active",
                            grade: 3,
                        }
                    ]
                },
                {
                    label: "我只能奔跑",
                    type: "user",
                    position: "product",
                    sex: "man",
                    phone: "123456789",
                    value: Math.random().toString(36).substring(7),
                    email: "123@qq.com",
                    status: "dead",
                    grade: 3,
                },
                {
                    label: "一边失去，一边寻找",
                    type: "user",
                    position: "manager",
                    sex: "man",
                    phone: "123456789",
                    email: "123@qq.com",
                    value: Math.random().toString(36).substring(7),
                    status: "dead",
                    grade: 3,
                    admin: true,
                },
            ]
        },
        {
            label: "PMS研发部",
            type: "group",
            value: Math.random().toString(36).substring(7),
            level: 2,
            children: [
                {
                    label: "前端组",
                    type: "group",
                    value: Math.random().toString(36).substring(7),
                    level: 3,
                    children: [
                        {
                            label: "疾风知劲草",
                            value: Math.random().toString(36).substring(7),
                            type: "user",
                            position: "frontend",
                            sex: "man",
                            phone: "123456789",
                            email: "123@qq.com",
                            status: "active",
                            admin: true,
                            grade: 2,
                        },
                        {
                            label: "忆长安",
                            type: "user",
                            position: "frontend",
                            value: Math.random().toString(36).substring(7),
                            sex: "woman",
                            phone: "123456789",
                            email: "123@qq.com",
                            status: "active",
                            grade: 3,
                        },
                    ]
                },
                {
                    label: "后端组",
                    value: Math.random().toString(36).substring(7),
                    type: "group",
                    level: 3,
                    children: [
                        {
                            label: "明天你好",
                            type: "user",
                            position: "backend",
                            sex: "man",
                            value: Math.random().toString(36).substring(7),
                            phone: "123456789",
                            email: "123@qq.com",
                            status: "active",
                            admin: true,
                            grade: 2,
                        },
                    ]
                },
                {
                    label: "测试组",
                    type: "group",
                    value: Math.random().toString(36).substring(7),
                    level: 3,
                    children: [
                        {
                            label: "长大以后",
                            type: "user",
                            value: Math.random().toString(36).substring(7),
                            position: "tester",
                            sex: "man",
                            phone: "123456789",
                            email: "123@qq.com",
                            status: "active",
                            admin: true,
                            grade: 3,
                        },
                    ]
                },
                {
                    label: "举杯祝福",
                    type: "user",
                    position: "designer",
                    value: Math.random().toString(36).substring(7),
                    sex: "man",
                    phone: "123456789",
                    email: "123@qq.com",
                    status: "dead",
                    grade: 3,
                },
                {
                    label: "我是佬哒",
                    type: "user",
                    position: "manager",
                    sex: "man",
                    phone: "123456789",
                    value: Math.random().toString(36).substring(7),
                    email: "123@qq.com",
                    status: "dead",
                    grade: 3,
                    admin: true,
                },
            ]
        },
        // {
        //     label: "餐饮研发部",
        //     type: "group",
        //     level: 2,
        //     children: [
        //         {
        //             label: "前端组",
        //             type: "group",
        //             level: 3,
        //             children: [
        //                 {
        //                     label: "忆长安",
        //                     type: "user",
        //                     position: "frontend",
        //                     sex: "woman",
        //                     phone: "123456789",
        //                     email: "123@qq.com",
        //                     status: "active",
        //                     grade: 3,
        //                     admin: true,
        //                 },
        //             ]
        //         },
        //         {
        //             label: "后端组",
        //             type: "group",
        //             level: 3,
        //             children: [
        //                 {
        //                     label: "明天你好",
        //                     type: "user",
        //                     position: "backend",
        //                     sex: "man",
        //                     phone: "123456789",
        //                     email: "123@qq.com",
        //                     status: "active",
        //                     admin: true,
        //                     grade: 2,
        //                 },
        //             ]
        //         },
        //         {
        //             label: "测试组",
        //             type: "group",
        //             level: 3,
        //             children: [
        //                 {
        //                     label: "长大以后",
        //                     type: "user",
        //                     position: "tester",
        //                     sex: "man",
        //                     phone: "123456789",
        //                     email: "123@qq.com",
        //                     status: "active",
        //                     admin: true,
        //                     grade: 3,
        //                 },
        //             ]
        //         },
        //         {
        //             label: "举杯祝福",
        //             type: "user",
        //             position: "fullstack",
        //             sex: "man",
        //             phone: "123456789",
        //             email: "123@qq.com",
        //             status: "active",
        //             grade: 3,
        //         },
        //         {
        //             label: "我是佬哒",
        //             type: "user",
        //             position: "manager",
        //             sex: "man",
        //             phone: "123456789",
        //             email: "123@qq.com",
        //             status: "dead",
        //             grade: 3,
        //             admin: true,
        //         },
        //     ]
        // },
        {
            label: "文旅研发部",
            type: "group",
            value: Math.random().toString(36).substring(7),
            level: 2,
        },
    ]
}
]
const removeUserLeaves = (nodes) => {
    return nodes
        .filter(node => {
            // 如果当前节点是叶子节点且 type 为 'user'，则过滤掉
            if (node.type === 'user') {
                return false;
            }
            return true; // 保留其他节点
        })
        .map(node => {
            // 如果当前节点有子节点，递归处理子节点
            if (node.children && node.children.length > 0) {
                node.children = removeUserLeaves(node.children);
                if (node.children.length === 0) {
                    delete node.children;
                }
            }
            return node;
        });
}
export const getOrganization = () => {
    let tree = JSON.parse(JSON.stringify(organization))
    return removeUserLeaves(tree)
}