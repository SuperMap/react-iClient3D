import { InputNumber, Select, Slider, Button } from 'antd';
const { Option } = Select;
function Sm3dSkyline() {
  // 设置默认值数据
  const [state, setState] = useState({
    skylineRadius: 10000,  //分析半径
    lineWidth: 3,   //天际线宽度
    skylineColor: "#C80000",   //天际线颜色
    skyBodyColor: "#2C95C5",   //天际体颜色
    barrierColor: "#FFBA01",   //障碍物颜色
    skylineMode: 'line',   //分析模式
    highlightBarrier: false,   //是否显示高亮障碍物
    getSkyline2d: false,    //是否显示二维分析结果
    skylineSpatialAnalysisUrl: null,   //分析服务地址 'http://www.supermapol.com/realspace/services/spatialAnalysis-data_all/restjsr/spatialanalyst/geometry/3d/skylinesectorbody.json'
    observerInformation: null,  //观察者信息
    ignoreGlobe: true,  // 地球表面不参与分析
  });

  // 传入props改变默认值
  // if (props) {
  //   for (let key in props) {
  //     if (state.hasOwnProperty(key)) {
  //       if (props[key] != undefined)
  //         state[key] = props[key]
  //     } else {
  //       tool.Message.errorMsg(resource.AttributeError + key);
  //     }
  //   }
  // }

  // 初始化数据
  let myChart, s3mInstance, skyline, tipFlag = true;
  const echarts_box = ref(null);

  onMounted(() => {
    initMyChart();
  });


  // if (storeState.isViewer) {
  //   skyline = new SuperMap3D.Skyline(scene);
  //   skyline.ignoreGlobe = state.ignoreGlobe;  //地球表面不参与分析
  //   skyline.build();
  //   s3mInstance = new SuperMap3D.S3MInstanceCollection(scene._context);
  //   scene.primitives.add(s3mInstance);
  //   //初始化观察者信息（后面有需要可以添加监听）
  //   if (state.observerInformation) {
  //     skyLineUpdate(state.observerInformation);
  //   }
  //   if (!window.tooltip) {
  //     window.tooltip = createTooltip(scene._element);
  //   }
  // }
  // //viewer 初始化完成的监听
  // watch(() => storeState.isViewer, val => {
  //   if (val) {
  //     skyline = new SuperMap3D.Skyline(scene);
  //     skyline.ignoreGlobe = state.ignoreGlobe;
  //     skyline.build();
  //     s3mInstance = new SuperMap3D.S3MInstanceCollection(scene._context);
  //     scene.primitives.add(s3mInstance);
  //     if (state.observerInformation) {
  //       skyLineUpdate(state.observerInformation);
  //     }
  //     if (!window.tooltip) {
  //       window.tooltip = createTooltip(scene._element);
  //     }
  //   }
  // });

  //初始化echarts
  const initMyChart = () => {
    if (window.echarts) {
      if (!myChart) {
        myChart = window.echarts.init(echarts_box.value);  //初始化echarts
        window.onresize = const () {
          myChart.resize()  //自适应屏幕
        };
      }
    } else {
      tool.Message.warnMsg(resource.EchartsErr);
      return;
    }
    myChart.setOption({
      title: {
        text: "二维天际线",
        textStyle: {
          fontSize: 14
        }
      },
      grid: {
        left: 30,
        right: 0,
        top: 30,
        bottom: 8
      },
      tooltip: {},
      xAxis: {
        show: false
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: "bar",
          data: [],
        },
      ],
    });
  };

  /*
   ***分析模块***
  */

  //分析
  const skyLineAnalysis = () => {
    clear(); // 清除上一次分析结果
    // 天际线分析的视口位置设置成当前相机位置
    let cartographic = scene.camera.positionCartographic;
    let observerObj = {
      longitude: SuperMap3D.Math.toDegrees(cartographic.longitude),
      latitude: SuperMap3D.Math.toDegrees(cartographic.latitude),
      height: cartographic.height,
      pitch: SuperMap3D.Math.toDegrees(scene.camera.pitch),
      direction: SuperMap3D.Math.toDegrees(scene.camera.heading)
    };
    skyLineUpdate(observerObj);
  };

  // 设置限高体
  const setLimitBody = () => {
    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }
    tooltip.setVisible(false);
    if (tipFlag) {   //只提示一次
      window.tooltip.showAt(' <p>点击鼠标左键绘制区域</p><p>点击鼠标右键结束绘制</p>', '450px');
      tipFlag = false
    }
    handlerDrawing("Polygon").then(
      res => {
        skyline.removeLimitbody("limitBody");
        let handlerPolygon = window.handlerPolygon;
        let pos = res.result.object.positions;
        let positions = [];
        // 遍历多边形，取出所有点
        for (let i = 0, len = pos.length; i < len; i++) {
          //转化为经纬度，并加入至临时数组
          let cartographic = SuperMap3D.Cartographic.fromCartesian(pos[i]);
          let longitude = SuperMap3D.Math.toDegrees(cartographic.longitude);
          let latitude = SuperMap3D.Math.toDegrees(cartographic.latitude);
          positions.push([longitude, latitude]);
        }
        //去除重复点
        let p = tool.unique(positions);
        let posArr = [];
        //再次遍历转化为接口所需的数组格式
        for (let i = 0, len = p.length; i < len; i++) {
          posArr.push(positions[i][0]);
          posArr.push(positions[i][1]);
        }
        //添加限高体对象
        skyline.addLimitbody({
          position: posArr,
          name: "limitBody"
        });
        handlerPolygon.polygon.show = false;
        handlerPolygon.polyline.show = false;
        //   window.polylineTransparent.show = false; //半透线隐藏
        handlerPolygon.deactivate();
      },
      err => {
        console.log(err);
      }
    );
    window.handlerPolygon.activate();
  };

  // 更新天际线
  const skyLineUpdate = (observerObj) => {
    skyline.viewPosition = [observerObj.longitude, observerObj.latitude, observerObj.height];
    //设置俯仰和方向
    skyline.pitch = observerObj.pitch
    skyline.direction = observerObj.direction
    skyline.radius = Number(state.skylineRadius);
    skyline.lineWidth = Number(state.lineWidth);
    skyline.color = SuperMap3D.Color.fromCssColorString(state.skylineColor);
    skyline.displayStyle = Number(state.skylineMode > 1 ? 0 : state.skylineMode);

    setTimeout(() => {
      if (state.highlightBarrier) { // 显示障碍物
        let BarrierColor = SuperMap3D.Color.fromCssColorString(
          state.barrierColor
        );
        changeBarrierColor(BarrierColor);
      }
      if (state.skylineMode == 2) {   // 是否切换天际体
        if (state.skylineSpatialAnalysisUrl) {
          setSkyLineBody(observerObj)
        } else {
          setSkyLineBody2(observerObj)
          // setSkyLineBody(observerObj)
        }
      }
      let object = skyline.getSkyline2D();
      setOptions(object)  // 设置二维天际线
    }, 300);
    state.observerInformation = observerObj
  }

  // 改变障碍物颜色
  const changeBarrierColor(BarrierColor) {
    let ObjectIds = skyline.getObjectIds();
    console.log(ObjectIds)

    let layers = scene.layers && scene.layers.layerQueue;
    for (let index in ObjectIds) {
      layers.forEach(layer => {
        if (layer._id === Number(index)) {
          layer.setObjsColor(ObjectIds[index], BarrierColor);
        }
      });
    }
  };

  // 设置二维天际线
  const setOptions = (object) => {
    if (state.observerInformation && myChart) {
      let option = {
        tooltip: {
          trigger: 'axis',
          // formatter: 'X: {b}<br/>Y : {c}'
          formatter: (param) => {
            let datax = Number(param[0].axisValue);
            let datay = param[0].data;
            return [
              "X: " +
              datax.toFixed(6) +
              "<br/>",
              "Y: " +
              datay.toFixed(6)
            ].join("");
          },
        },
        grid: {
          left: 40,
          right: 0,
          top: 35,
          bottom: 8,
          borderColor: '#333333'
        },
        // backgroundColor: "rgba(73,139,156,0.0)",
        color: 'red',
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: object.x,
            show: false
          }
        ],
        yAxis: {
          min: const(value) {
            return (value.min - 0.05).toFixed(2);
          },
          show: true,
          axisLine: {
            show: true,

          }
        },
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: 0,
            filterMode: "filter",
            start: 0,
            end: 100,
          },
        ],
        series: [
          {
            symbolSize: 8,
            symbol: 'circle',
            smooth: true,
            // name: "天际线分析",
            // symbol: "none",
            type: "line",
            data: object.y,
            lineStyle: {
              width: 2,
              shadowColor: 'rgba(145, 146, 148,0.7)',
              shadowBlur: 10,
              shadowOffsetY: 8
            },
          }
        ]
      };
      myChart.setOption(option);
    }
  };

  // 天际线体走数据服务
  const setSkyLineBody = () => {
    let param = skyline.getSkylineSectorParameter();
    let geometrySkylineSectorBodyPostParameter = {
      viewerPoint: param.viewPos,
      line3D: param.geoLine3D,
      height: 0,
      lonlat: true
    };

    let url = state.skylineSpatialAnalysisUrl;
    let queryData = JSON.stringify(geometrySkylineSectorBodyPostParameter);
    axios
      .post(url, queryData)
      .then(response => {
        //再发送一次GET请求  获取到运算结果
        axios
          .get(response.data.newResourceLocation + ".json")
          .then(response => {
            let data = response.data;
            if (data.geometry === null) {
              return;
            }
            let uint8Array = new Uint8Array(data.geometry.model);
            let buffer = uint8Array.buffer;
            s3mInstance.add(
              "SkyLineBody",
              {
                id: 1,
                position: SuperMap3D.Cartesian3.fromDegrees(
                  data.geometry.position.x,
                  data.geometry.position.y,
                  data.geometry.position.z
                ),
                hpr: new SuperMap3D.HeadingPitchRoll(0, 0, 0),
                color: SuperMap3D.Color.fromCssColorString(state.skyBodyColor)
              },
              buffer, false
            );
            data.geometry.model = [4, 0, 0, 0].concat(data.geometry.model);
            // // 传到store可以做gpu查询
            data.geometry["name"] = resource.SkyLineBody;
            storeDate.geometrys["SkyLineBody"] = data.geometry;
            actions.setGeometrys();
          })
          .catch(const (error) {
            console.log(error);
            tool.Message.errorMsg("获取天际线体数据失败", error);
          });
  })
      .catch (const (error) {
    console.log(error);
    tool.Message.errorMsg("获取天际线体数据失败", error);
  });
};

// 天际线体
const setSkyLineBody2 = (observerObj) => {
  let points = skyline.getSkyline3D();
  let pointArr = new Array();
  let cameraPoint = SuperMap3D.Cartesian3.fromDegrees(observerObj.longitude, observerObj.latitude, observerObj.height);
  pointArr.push(cameraPoint);
  for (let i = 0; i < points.x.length; i++) {
    let point = SuperMap3D.Cartesian3.fromDegrees(points.x[i], points.y[i], points.z[i]);
    pointArr.push(point);
  }
  scene.trackingLayer.add({
    id: 'SkyLineBody',
    polygon: {
      extrudedHeight: 10,
      hierarchy: pointArr,
      perPositionHeight: true,
      material: SuperMap3D.Color.fromCssColorString(state.skyBodyColor)
    }
  })
}

// 清除
const clear= () =>{
  clearHandlerDrawing();
  tooltip.setVisible(false);
  if (!state.observerInformation) return;
  scene.trackingLayer.removeById('SkyLineBody')
  if (skyline) {
    skyline.clear();
  }
  for (let i = 0; i < scene.layers._layerQueue.length; i++) {
    let layer = scene.layers.findByIndex(i);
    layer.removeAllObjsColor();
  }
  state.observerInformation = null;
  myChart.clear();
  initMyChart()
  s3mInstance.removeCollection("SkyLineBody");
  if (storeDate.geometrys.SkyLineBody) {
    delete storeDate.geometrys.SkyLineBody;
    actions.setGeometrys();
  }

};

// 监听

watch(() => state.skylineRadius, val => {
  if (state.observerInformation) {
    skyline.radius = parseFloat(val);
    skyline.pitch = parseFloat(state.observerInformation.pitch);
  }
});
watch(() => state.lineWidth, val => {
  skyline.lineWidth = Number(val);
  if (state.observerInformation) {
    skyline.pitch = parseFloat(state.observerInformation.pitch); //加上才能实时改变线宽，可能是缺陷
  }
});
watch(() => state.skylineColor, newValue => {
  if (state.observerInformation && newValue != "") {
    let color = SuperMap3D.Color.fromCssColorString(newValue);
    skyline.color = color;
    skyline.pitch = parseFloat(state.observerInformation.pitch);
  }
});
watch(() => state.barrierColor, newValue => {
  if (state.observerInformation || !state.highlightBarrier) {
    let BarrierColor = SuperMap3D.Color.fromCssColorString(newValue);
    changeBarrierColor(BarrierColor);
  }
});
watch(() => state.ignoreGlobe, newValue => {
  if (skyline) skyline.ignoreGlobe = newValue;
});


watch(() => state.highlightBarrier, newValue => {
  if (newValue && state.observerInformation) {
    let BarrierColor = SuperMap3D.Color.fromCssColorString(
      state.barrierColor
    );
    changeBarrierColor(BarrierColor);
  } else {
    for (let i = 0; i < scene.layers._layerQueue.length; i++) {
      let layer = scene.layers.findByIndex(i);
      layer.removeAllObjsColor();
    }
  }
});
watch(() => state.skyBodyColor, newValue => {
  if (state.observerInformation && newValue != "") {
    let color = SuperMap3D.Color.fromCssColorString(newValue);
    if (state.skylineSpatialAnalysisUrl) {
      s3mInstance.getInstance("SkyLineBody", 1).updateColor(color);
    } else {
      scene.trackingLayer.getById('SkyLineBody').polygon.material = color //不走服务用这个
    }
  }
});
watch(() => state.getSkyline2d, newValue => {
  if (!newValue || !myChart) {
    state.getSkyline2d = false;
    return;
  }
  setTimeout(() => {
    myChart.resize()  //自适应屏幕
  }, 200)

});
watch(() => state.skylineMode, newValue => {
  if (newValue == 0) {
    skyline.displayStyle = 0;
    scene.trackingLayer.removeById('SkyLineBody')
    s3mInstance.removeCollection("SkyLineBody");
    if (storeDate.geometrys.SkyLineBody) {
      delete storeDate.geometrys.SkyLineBody;
      actions.setGeometrys();
    }
  } else if (newValue == 1) {
    skyline.displayStyle = 1;
    scene.trackingLayer.removeById('SkyLineBody')
    s3mInstance.removeCollection("SkyLineBody");
    if (storeDate.geometrys.SkyLineBody) {
      delete storeDate.geometrys.SkyLineBody;
      actions.setGeometrys();
    }
  } else if (newValue == 2) {
    // 需要iServer910支持=
    skyline.displayStyle = 0;
    if (state.observerInformation) {
      if (state.skylineSpatialAnalysisUrl) {
        setSkyLineBody(state.observerInformation)
      } else {
        setSkyLineBody2(state.observerInformation)
        // setSkyLineBody(state.observerInformation)
      }
    }
  }
});

// 销毁
// onBeforeUnmount(() => {
//   clear();
//   if (s3mInstance) {
//     // s3mInstance.destroy();
//   }
//   skyline = undefined;
//   myChart = undefined;
//   s3mInstance = undefined;
// })

return <div>
  <div class="sm-global-row">
    <span class="sm-global-row-title">显示模式</span>
    <Select class="sm-global-select" defaultValue="line">
      <Option value="line">线显示</Option>
      <Option value="area">面显示</Option>
      <Option value="volume">体显示</Option>
    </Select>
  </div>
  <div class="sm-global-row">
    <span>分析半径</span>
    <InputNumber class="sm-global-input-number" min={1} />
  </div>
  <div class="sm-global-row">
    <span>线宽度</span>
    <Slider class="sm-global-slider" min={1}
      max={10} />
  </div>
  <div class="sm-global-row">
    <span>天际线颜色</span>
    <input class="sm-global-color" type="color" v-model="skylineColor" />
  </div>
  <div class="sm-global-row">
    <span>天际体颜色</span>
    <input class="sm-global-color" type="color" v-model="skyBodyColor" />
  </div>
  <div class="sm-global-row">
    <span>障碍物颜色</span>
    <input class="sm-global-color" type="color" v-model="barrierColor" />
  </div>

  <div class="sm-global-button">
    <Button>分析</Button>
    <Button > 清除</Button>
  </div >
</div>
}

export default Sm3dSkyline