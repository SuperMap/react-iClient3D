# <center>react-iclient3d</center>
# 简介
### 特点：
- 采用当前React Hook升级组件，相比原来有更快的速度和更好的性能
- 实现了界面与功能分离，可以更灵活的适用于各种应用场景
- 全面的开源组件源码，可以更容易的理解和修改等二次开发，轻松实现自定义组件。

### 示例：https://www.supermapol.com/earth/react-iclient3d/index.html

#### React目前提供的组件可以参考示例项目，如您在使用过程中遇到问题，或更好的使用建议，欢迎提issues，开发人员看到会及时给予处理

# 快速使用
#### React工程，NPM 安装：

``` bash
npm install react-iclient3d --save
```



##### 1、修改index.html文件：

- 在index.html里引入SuperMap3D等资源文件。

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://www.supermapol.com/earth/SuperMap3D/SuperMap3D.js"></script>
  <title>webgl3d</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

##### 2、修改main.js文件：

``` js

import {
  Sm3dViewer,
  Sm3dMeasure,
  Sm3dSightline,
  Sm3dViewshed,
  Sm3dTerrainFlood,
  Sm3dTerrainOperation,
  Sm3dTerrainSlope,
  Sm3dTerrainIsoline,
  Sm3dClipCross,
  Sm3dClipPolygon,
  Sm3dGeologicalBody
} from 'react-iclient3d/lib/index.js'

```

##### 3、在App.jsx里测试使用量算功能组件：

``` js
<template>
  <sm3d-viewer scene-url="http://www.supermapol.com/realspace/services/3D-ZF_normal/rest/realspace">
  </sm3d-viewer>
  <sm3d-measure></sm3d-measure>
</template>
<script>
```




