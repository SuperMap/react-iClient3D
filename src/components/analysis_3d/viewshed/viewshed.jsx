// 拖拽 
import Draggable from 'react-draggable';
import { Slider, Button } from 'antd';
import React, { useEffect, useState } from 'react'
import { initHandler, handlerDrawing, clearHandlerDrawing } from "../../../js/common/drawHandler.js"    //公共handler.js
import tool from '../../../js/tool/tool.js'        //提示等工具
import '../../../css/global.scss'
import './viewshed.scss'
function Sm3dViewshed() {
  // 设置默认值数据
  const [state, setState] = useState({
    viewshedSpatialUrl: "http://www.supermapol.com/realspace/services/spatialAnalysis-data_all/restjsr/spatialanalyst/geometry/3d/viewshedbody.json",
    observerInformation: null,  //观察者信息
    direction: 1.0,    //方向
    pitch: 1.0,        //俯仰角度
    addheight: 1.8,   //附加高度
    distance: 200,   //距离
    verticalFov: 60,   //  垂直视角
    horizontalFov: 90,   //水平视角
    hintLineColor: "#D4CA2D",   //提示线颜色
    visibleAreaColor: "#09C770",  //可视区域颜色
    hiddenAreaColor: "#EE7216",  //不可视区域颜色
    visibleBodyColor: "#09C770",   //可视域体颜色
    invisibleBodyColor: "#EE7216",  //不可视域体颜色
    visibleBody: true,   //显示可视域体
    invisibleBody: true,   //显示不可视域体
    viewshedAnimation: true,  //动画演示
    DynamicLine: [],    //路线点
    DynamicSpeed: 10,   //动态分析行进速度

  });

  // 初始化数据
  let handler, s3mInstanceColc, startPosition;
  let tipFlag = true;
  let Carurls = ['public/data/s3m/car1.s3m'], timers;

  useEffect(() => {
    init()
  }, [])
  const [viewshed3D, setViewshed3D] = useState({})
  const [dynamicLayer3D, setDynamicLayer3D] = useState({})
  const init = () => {
    let viewshed3DTem = new SuperMap3D.ViewShed3D(scene);
    handler = new SuperMap3D.ScreenSpaceEventHandler(scene.canvas);
    viewshed3DTem.hintLineColor = SuperMap3D.Color.fromCssColorString(
      state.hintLineColor
    );
    viewshed3DTem.visibleAreaColor = SuperMap3D.Color.fromCssColorString(
      state.visibleAreaColor
    );
    viewshed3DTem.hiddenAreaColor = SuperMap3D.Color.fromCssColorString(
      state.hiddenAreaColor
    );
    setViewshed3D(viewshed3DTem)
    s3mInstanceColc = new SuperMap3D.S3MInstanceCollection(scene._context);
    scene.primitives.add(s3mInstanceColc);
    let dynamicLayer3DTem = new SuperMap3D.DynamicLayer3D(scene.context, Carurls);
    dynamicLayer3DTem.updateInterval = 100;
    dynamicLayer3DTem.setCullEnabled(Carurls[0], SuperMap3D.CullFace.BACK);
    dynamicLayer3DTem.maxVisibleAltitude = 2000;
    dynamicLayer3DTem.minVisibleAltitude = 0;
    setDynamicLayer3D(dynamicLayer3DTem)
    scene.primitives.add(dynamicLayer3DTem);
  };

  /*
   ***分析模块***
  */

  //分析

  const analysis = () => {
    scene.enableCursorStyle = false;
    scene._element.style.cursor = "";
    document.body.classList.add("measureCur");

    if (state.viewshedAnimation) {
      if (timers) {
        clear();
        state.viewshedAnimation = true;
        document.body.classList.add("measureCur");
      }
      handlerPolyline()
    } else {
      LEFT_CLICK();
    }
  }

  //   点击左键确认观察者点
  const LEFT_CLICK = () => {
    s3mInstanceColc.removeCollection("VeiwshedBody");
    s3mInstanceColc.removeCollection("VeiwshedBodyHidden");
    viewshed3D.distance = 0.00001;
    viewshed3D.visibleAreaColor = SuperMap3D.Color.fromCssColorString(state.visibleAreaColor);
    viewshed3D.hiddenAreaColor = SuperMap3D.Color.fromCssColorString(state.hiddenAreaColor);
    handler.setInputAction((e) => {
      let position = scene.pickPosition(e.position);
      startPosition = position;  //记录分析观察者笛卡尔坐标
      let p = tool.CartesiantoDegrees(position) // 将获取的点的位置转化成经纬度
      p[2] += Number(state.addheight);  //添加附加高度
      viewshed3D.viewPosition = p;
      viewshed3D.build();
      // 观察者信息记录
      state.observerInformation = p;
      document.body.classList.remove("measureCur");
      removeInputAction('LEFT_CLICK')
      MOUSE_MOVE();
      RIGHT_CLICK();
      // 添加观察者点
      let p2 = SuperMap3D.Cartesian3.fromDegrees(p[0], p[1], p[2]);
      addPoint(p2)
    }, SuperMap3D.ScreenSpaceEventType.LEFT_CLICK);
  };
  const addPoint = (p) => {
    scene.trackingLayer.removeById('viewshedPoint');
    scene.trackingLayer.add({
      id: 'viewshedPoint',
      point: new SuperMap3D.PointGraphics({
        color: colorUpdate(state.hiddenAreaColor),
        pixelSize: 8
      }),
      position: p
    });
  }
  // 鼠标移动实时分析
  const MOUSE_MOVE = () => {
    handler.setInputAction((e) => {
      // tooltip.setVisible(false);
      //获取鼠标屏幕坐标,并将其转化成笛卡尔坐标
      let position = e.endPosition;
      let endPosition = scene.pickPosition(position);
      //计算该点与视口位置点坐标的距离
      let distance = SuperMap3D.Cartesian3.distance(startPosition, endPosition);
      if (distance > 0) {
        let p2 = tool.CartesiantoDegrees(endPosition) // 将获取的点的位置转化成经纬度
        // 通过该点设置可视域分析对象的距离及方向
        viewshed3D.setDistDirByPoint(p2);
      }
    }, SuperMap3D.ScreenSpaceEventType.MOUSE_MOVE);
  }

  // //鼠标右键确认分析距离和方向，不再执行鼠标移动事件中对可视域的操作
  const RIGHT_CLICK = () => {
    handler.setInputAction((e) => {
      state.direction = viewshed3D.direction.toFixed(2);
      state.pitch = viewshed3D.pitch.toFixed(2);
      state.distance = viewshed3D.distance.toFixed(2);
      state.horizontalFov = viewshed3D.horizontalFov;
      state.verticalFov = viewshed3D.verticalFov;
      tooltip.setVisible(false);
      removeInputAction('MOUSE_MOVE');
      removeInputAction('RIGHT_CLICK');
    }, SuperMap3D.ScreenSpaceEventType.RIGHT_CLICK);
  }
  //移除鼠标事件
  const removeInputAction = (type) => {
    switch (type) {
      case 'LEFT_CLICK':
        handler.removeInputAction(
          SuperMap3D.ScreenSpaceEventType.LEFT_CLICK
        );
        break;
      case 'MOUSE_MOVE':
        handler.removeInputAction(
          SuperMap3D.ScreenSpaceEventType.MOUSE_MOVE
        );
        break;
      case 'RIGHT_CLICK':
        handler.removeInputAction(
          SuperMap3D.ScreenSpaceEventType.RIGHT_CLICK
        );
        break;
      case 'ALL':
      default:
        handler.removeInputAction(
          SuperMap3D.ScreenSpaceEventType.LEFT_CLICK
        );
        handler.removeInputAction(
          SuperMap3D.ScreenSpaceEventType.MOUSE_MOVE
        );
        handler.removeInputAction(
          SuperMap3D.ScreenSpaceEventType.RIGHT_CLICK
        );
        break;
    }

  }

  // 清除
  const clear = () => {
    clearViewshed();
    dynamicLayer3D.clearState(Carurls[0], [1]);
    clearInterval(timers);
    timers = null;
    state.viewshedAnimation = false;
    clearHandlerDrawing("Polyline");
  };
  const clearViewshed = () => {
    tooltip.setVisible(false);
    scene.trackingLayer.removeById('viewshedPoint');
    document.body.classList.remove("measureCur");
    viewshed3D.distance = 0.00001;
    viewshed3D.viewPosition = [0, 0, 0];
    state.visibleBody = false;
    state.invisibleBody = false;
    state.observerInformation = null;
  }

  /*
  动态可视域模块
  */
  //绘制路线
  const handlerPolyline = () => {
    if (!window.handlerPolyline) {
      initHandler("Polyline");
    }
    // if (props.DynamicLine) {  //如果传入路线,就不需要绘制路线了
    //   setCarState();
    //   return;
    // }
    handlerDrawing("Polyline", SuperMap3D.ClampMode.Ground).then(
      res => {
        let handlerPolyline = window.handlerPolyline;
        handlerPolyline.polyline.show = false;
        window.polylineTransparent.show = true; //半透线隐藏
        handlerPolyline.deactivate();
        state.DynamicLine = res.result.object._positions;
        tooltip.setVisible(false);
        if (state.DynamicLine.length < 2) {
          tool.Message.warnMsg('至少需要两个点！');
          return;
        };
        setCarState()
      },
      (err) => {
        console.log(err);
      }
    );
    window.handlerPolyline.activate();
  }

  // 添加动态可视域动画模型
  const setCarState = () => {
    viewshed3D.distance = state.distance;
    viewshed3D.build();
    let points = state.DynamicLine;
    let points2 = [];
    for (let i = 1, j = points.length; i < j; i++) {
      let startPoint = points[i - 1];
      let endPoint = points[i];
      let d = SuperMap3D.Cartesian3.distance(startPoint, endPoint);
      let count = parseInt(d / (state.DynamicSpeed * 0.05)) + 1;
      for (let i = 1, j = count; i <= j; i++) {
        points2.push(
          SuperMap3D.Cartesian3.lerp(
            startPoint,
            endPoint,
            i / count,
            new SuperMap3D.Cartesian3()
          )
        );
      }
    }
    let positions = tool.CartesiantoDegreesObjs(points2)
    let CarState = new SuperMap3D.DynamicObjectState({
      id: 1,
      longitude: positions[0].longitude,
      latitude: positions[0].latitude,
      altitude: positions[0].height,
      scale: new SuperMap3D.Cartesian3(1, 1, 1)
    });
    dynamicLayer3D.updateObjectWithModel(Carurls[0], [CarState])
    let index = 1;
    timers = setInterval(() => {
      if (index >= positions.length) {
        clearInterval(timers);
        return;
      }
      CarState.longitude = positions[index].longitude;
      CarState.latitude = positions[index].latitude;
      CarState.altitude = positions[index].height;
      dynamicLayer3D.updateObjectWithModel(Carurls[0], [CarState]);
      let getAngleAndRadian = tool.getAngleAndRadian(points2[index - 1], points2[index]);
      viewshed3D.direction = getAngleAndRadian.angle;
      viewshed3D.viewPosition = [CarState.longitude, CarState.latitude, (CarState.altitude + Number(state.addheight))];
      index += 1;
    }, 50)
  }

  // 附加高度
  const changAddheight = (value) => {
    setState({
      ...state,
      addheight: value
    })
    console.log('state.observerInformation', state.observerInformation);
    // if (state.observerInformation) {
    //   setState({
    //     ...state,
    //     observerInformation[2] += value
    //   })
    //   viewshed3D.viewPosition = state.observerInformation
    // }
    //   if (state.observerInformation) {
    //     state.observerInformation[2] += parseFloat(val);
    //     viewshed3D.viewPosition = state.observerInformation;
    //   }
  }
  // 垂直视角
  const changeVerticalFov = (value) => {
    setState({
      ...state,
      verticalFov: parseFloat(value)
    })
    viewshed3D.verticalFov = parseFloat(value)
  }
  // 水平视角
  const changeHorizontalFov = (value) => {
    setState({
      ...state,
      horizontalFov: parseFloat(value)
    })
    viewshed3D.horizontalFov = parseFloat(value);
  }
  // 提示线颜色
  const changeHintLineColor = (e) => {
    let value = e.target.value
    setState({
      ...state,
      hintLineColor: value
    })
    viewshed3D.hintLineColor = colorUpdate(value);
  }
  // 可视区颜色
  const changeVisibleAreaColor = (e) => {
    let value = e.target.value
    setState({
      ...state,
      visibleAreaColor: value
    })
    viewshed3D.visibleAreaColor = colorUpdate(value);
  }
  // 隐藏区颜色
  const changeHiddenAreaColor = (e) => {
    let value = e.target.value
    setState({
      ...state,
      hiddenAreaColor: value
    })
    viewshed3D.hiddenAreaColor = colorUpdate(value);
  }


  const colorUpdate = (val) => {
    if (val == "") return;
    return SuperMap3D.Color.fromCssColorString(val);
  }

  return (
    <Draggable handle='.sm-drag-handler'>
      <div className="sm-panel">
        <div className='sm-drag-handler'></div>
        <div className="sm-global-row">
          <span>附加高度</span>
          <Slider className="sm-global-slider" min={1}
            max={10} step={0.1}
            value={state.addheight}
            onChange={changAddheight} />
        </div>
        <div className="sm-global-row">
          <span>垂直视角</span>
          <Slider className="sm-global-slider" min={1}
            max={179}
            value={state.verticalFov}
            onChange={changeVerticalFov} />
        </div >
        <div className="sm-global-row">
          <span>水平视角</span>
          <Slider className="sm-global-slider" min={1} max={179}
            value={state.horizontalFov}
            onChange={changeHorizontalFov} />
        </div >
        <div className="sm-global-row">
          <span>提示线颜色</span>
          <input className="sm-global-color" type="color"
            value={state.hintLineColor}
            onChange={changeHintLineColor} />
        </div>
        <div className="sm-global-row">
          <span>可视区颜色</span>
          <input className="sm-global-color" type="color"
            v-model="visibleAreaColor"
            value={state.visibleAreaColor}
            onChange={changeVisibleAreaColor} />
        </div>
        <div className="sm-global-row">
          <span>隐藏区颜色</span>
          <input className="sm-global-color" type="color"
            value={state.hiddenAreaColor}
            onChange={changeHiddenAreaColor} />
        </div>
        <div className="sm-global-button">
          <Button size="small" onClick={analysis}>分析</Button>
          <Button size="small" onClick={clear}> 清除</Button>
        </div >
      </div >
    </Draggable>
  )


}
export default Sm3dViewshed