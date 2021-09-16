module.exports = {
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                publish: ['github'],//此处写入github 就好，不用添加其他内容
                // "directories":{
                //     "output":"./dist_electron"//输出文件路径
                // },
                "win": {//win相关配置
                    "icon": "./dist_electron/icons/icon.ico",//图标，当前图标在根目录下，注意这里有两个坑
                    "target": [
                        {
                            "target": "zip"
                        },
                        // {
                        //     "target": "nsis",//利用nsis制作安装程序
                        //     // "arch": [
                        //     //     "x64",//64位
                        //     //     "ia32"//32位
                        //     // ]
                        // }
                    ],

                },
                "extraFiles": { // 拷贝dll等静态文件到指定位置
                    "from": "./extraResources/",
                    "to": "extraResources"
                },
                // "nsis": {
                //     "oneClick": false, // 一键安装
                //     // "guid": "xxxx", //注册表名字，不推荐修改
                //     "perMachine": true, // 是否开启安装时权限限制（此电脑或当前用户）
                //     "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                //     "allowToChangeInstallationDirectory": true, // 允许修改安装目录
                //     "installerIcon": "./dist_electron/icons/icon.ico", // 安装图标
                //     "uninstallerIcon": "./dist_electron/icons/icon.ico", //卸载图标
                //     "installerHeaderIcon": "./dist_electron/icons/icon.ico", // 安装时头部图标
                //     "createDesktopShortcut": true, // 创建桌面图标
                //     "createStartMenuShortcut": false, // 创建开始菜单图标
                //     "shortcutName": "Latex题库0.0.5" // 图标名称
                // }

            }
        }

    }
}