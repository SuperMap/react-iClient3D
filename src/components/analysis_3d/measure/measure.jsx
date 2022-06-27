// 拖拽 
import Draggable from 'react-draggable';
import tool from '../../../js/tool/tool.js'
import '../../../css/global.scss'
import './measure.scss'
import React, { useEffect, useState } from 'react'
import { Select } from 'antd';
const { Option } = Select;

function Sm3dMeasure() {
  // 设置默认值数据
  const [state, setState] = useState({
    measureMode: 'Space', //测量模式
    clampMode: SuperMap3D.ClampMode.Space,
    Ellipsoid: null, //椭球选择
    contourColor: '#ff7d00', //等高线颜色
    isShowDVH: false, //显示等高线界面
    isShowLine: true, //显示等高线
    pickPointEnabled: true //开启顶点捕捉
  })

  console.log('measure页面重新刷新');

  // 初始化数据
  let layers, lineHeight, setHypFlag, height_0 = 0;
  // 高
  let [handlerHeight, setHandlerHeight] = useState({})
  //  面积
  let [handlerArea, setHandlerArea] = useState({})
  // 距离
  let [handlerDis, setHandlerDis] = useState({})
  // 等高线
  // let [isoline, setIsoline] = useState({})
  // 等高线
  let isoline = new SuperMap3D.HypsometricSetting();
  isoline.DisplayMode = SuperMap3D.HypsometricSettingEnum.DisplayMode.LINE;
  let colorTable = new SuperMap3D.ColorTable();
  isoline._lineColor = SuperMap3D.Color.fromCssColorString(state.contourColor);
  isoline.ColorTable = colorTable;
  isoline.Opacity = 0.6;
  isoline.MaxVisibleValue = -100;
  isoline.MinVisibleValue = -100;
  // 初始化设置图层等高线
  const setHypsometricSetting = () => {
    if (!layers) return;
    for (let i = 0; i < layers.length; i++) {
      layers[i].hypsometricSetting = {
        hypsometricSetting: isoline,
        analysisMode: SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
      };
    }
    setHypFlag = true;
  }

  const init = () => {
    layers = scene.layers && scene.layers.layerQueue;
    scene.globe.HypsometricSetting = {
      hypsometricSetting: isoline,
      analysisMode: SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
    };
    setHypsometricSetting()
    setHandlerDis(new SuperMap3D.MeasureHandler(
      scene,
      SuperMap3D.MeasureMode.Distance,
      state.clampMode
    ))
    setHandlerArea(new SuperMap3D.MeasureHandler(
      scene,
      SuperMap3D.MeasureMode.Area,
      state.clampMode
    ))
    setHandlerHeight(new SuperMap3D.MeasureHandler(
      scene,
      SuperMap3D.MeasureMode.DVH
    ))
  };
  const [initEventTag, setInitEventTag] = useState(false)
  // 初始化
  useEffect(() => {
    init()
    setInitEventTag(true)
  }, [])
  useEffect(() => {
    if (initEventTag) {
      initeEvent()
      setInitEventTag(false)
    }
  }, [handlerDis, handlerArea, handlerHeight])

  const initeEvent = () => {
    console.log('initEventTag', initEventTag);
    //初始化测量距离
    handlerDis.activeEvt.addEventListener(isActive => {
      if (isActive == true) {
        scene.enableCursorStyle = false;
        scene._element.style.cursor = "";
        document.body.classList.add("measureCur");
        scene.pickPointEnabled = state.pickPointEnabled;
      } else {
        scene.enableCursorStyle = true;
        document.body.classList.remove("measureCur");
        scene.pickPointEnabled = false;
      }
    });
    //注册测距功能事件
    handlerDis.measureEvt.addEventListener(result => {
      let dis = Number(result.distance);
      let mode = state.measureMode;
      if (mode == "CGCS2000" || mode == "XIAN80" || mode == "WGS84") {
        dis = Number(calcClampDistance(result.positions));
      }
      let distance = dis > 1000 ? (dis / 1000).toFixed(2) + "km" : dis.toFixed(2) + "m";
      handlerDis.disLabel.text = "距离:" + distance;
    });
    //初始化测量面积
    handlerArea.activeEvt.addEventListener(isActive => {
      if (isActive == true) {
        scene.enableCursorStyle = false;
        scene._element.style.cursor = "";
        document.body.classList.add("measureCur");
        scene.pickPointEnabled = state.pickPointEnabled;
      } else {
        scene.enableCursorStyle = true;
        document.body.classList.remove("measureCur");
        scene.pickPointEnabled = false;
      }
    });
    handlerArea.measureEvt.addEventListener(result => {
      let mj = Number(result.area);
      let mode = state.measureMode;
      if (mode == "CGCS2000" || mode == "XIAN80" || mode == "WGS84") {
        mj = Number(calcClampValue(result.positions));
      } else if (mode == "6") {
        mj = Number(calcAreaWithoutHeight(result.positions));
      }
      let area =
        mj > 1000000
          ? (mj / 1000000).toFixed(2) + "km²"
          : mj.toFixed(2) + "㎡";
      handlerArea.areaLabel.text = "面积:" + area;
    });
    let point1, point2;
    //初始化测量高度
    handlerHeight.measureEvt.addEventListener(result => {
      let distance =
        result.distance > 1000
          ? (result.distance / 1000).toFixed(2) + "km"
          : (result.distance / 1).toFixed(2) + "m";
      let vHeight =
        result.verticalHeight > 1000
          ? (result.verticalHeight / 1000).toFixed(2) + "km"
          : (result.verticalHeight / 1).toFixed(2) + "m";
      let hDistance =
        result.horizontalDistance > 1000
          ? (result.horizontalDistance / 1000).toFixed(2) + "km"
          : (result.horizontalDistance / 1).toFixed(2) + "m";
      handlerHeight.disLabel.text = "空间距离:" + distance;
      handlerHeight.vLabel.text = "垂直高度:" + vHeight;
      handlerHeight.vLabel.horizontalOrigin = SuperMap3D.HorizontalOrigin.RIGHT;
      handlerHeight.hLabel.text = "水平距离:" + hDistance;
      handlerHeight.hLabel.verticalOrigin = SuperMap3D.VerticalOrigin.BOTTOM;
      //实时等高线显示
      point1 = SuperMap3D.Cartographic.fromCartesian(result.verticalPositions[0]);
      point2 = SuperMap3D.Cartographic.fromCartesian(result.verticalPositions[1]);
      if (point1.height > point2.height) lineHeight = Number(result.verticalHeight) + height_0;
      else lineHeight = -Number(result.verticalHeight) + height_0;
      if (state.isShowLine) updateContourLine(lineHeight)
    });
    handlerHeight.activeEvt.addEventListener(isActive => {
      if (isActive == true) {
        scene.enableCursorStyle = false;
        scene._element.style.cursor = "";
        document.body.classList.add("measureCur");
        scene.pickPointEnabled = state.pickPointEnabled;
      } else {
        scene.enableCursorStyle = true;
        document.body.classList.remove("measureCur");
        scene.pickPointEnabled = false;
      }
    });
  }

  // 是否开启顶点捕捉
  useEffect(() => {
    scene.pickPointEnabled = state.pickPointEnabled;
  }, [state.pickPointEnabled])

  const handleChange = (value) => {
    setState({
      ...state,
      measureMode: value
    })
  }
  useEffect(() => {
    let value = state.measureMode;
    if (value === "Space") {
      setState({
        ...state,
        clampMode: SuperMap3D.ClampMode.Space
      })
      handlerArea.clampMode = SuperMap3D.ClampMode.Space
      handlerDis.clampMode = SuperMap3D.ClampMode.Space
    } else {
      setState({
        ...state,
        clampMode: SuperMap3D.ClampMode.Ground
      })
      handlerArea.clampMode = SuperMap3D.ClampMode.Ground
      handlerDis.clampMode = SuperMap3D.ClampMode.Ground
    } if (value === "XIAN80") {
      setState({
        ...state,
        Ellipsoid: SuperMap3D.Ellipsoid.XIAN80
      })
    } else if (value === "CGCS2000") {
      setState({
        ...state,
        Ellipsoid: SuperMap3D.Ellipsoid.CGCS2000
      })
    } else if (value === "WGS84") {
      setState({
        ...state,
        Ellipsoid: SuperMap3D.Ellipsoid.WGS84
      })
    } else {
      setState({
        ...state,
        Ellipsoid: null
      })
    }


    console.log('state.measureMode的useEffect', state);
  }, [state.measureMode])
  // 分析
  //椭球贴地距离
  const calcClampDistance = (positions) => {
    let lonlat = [];
    for (let i = 0; i < positions.length; i++) {
      let cartographic = SuperMap3D.Cartographic.fromCartesian(positions[i]);
      let lon = SuperMap3D.Math.toDegrees(cartographic.longitude);
      let lat = SuperMap3D.Math.toDegrees(cartographic.latitude);
      lonlat.push(lon, lat);
    }
    let gemetry = new SuperMap3D.PolylineGeometry({
      positions: SuperMap3D.Cartesian3.fromDegreesArray(lonlat)
    });
    return scene.globe.computeSurfaceDistance(gemetry, state.Ellipsoid);
  };
  //椭球贴地面积
  const calcClampValue = (positions) => {
    let lonlat = [];
    for (let i = 0; i < positions.length; i++) {
      let cartographic = SuperMap3D.Cartographic.fromCartesian(positions[i]);
      let lon = SuperMap3D.Math.toDegrees(cartographic.longitude);
      let lat = SuperMap3D.Math.toDegrees(cartographic.latitude);
      lonlat.push(lon, lat);
    }

    let gemetry = new SuperMap3D.PolygonGeometry.fromPositions({
      positions: SuperMap3D.Cartesian3.fromDegreesArray(lonlat)
    });
    return scene.globe.computeSurfaceArea(gemetry, state.Ellipsoid);
  };
  //投影面积
  const calcAreaWithoutHeight = (positions) => {
    let totalLon = 0;
    for (let i = 0; i < positions.length; i++) {
      let cartographic = SuperMap3D.Cartographic.fromCartesian(positions[i]);
      let lon = SuperMap3D.Math.toDegrees(cartographic.longitude);
      totalLon += lon;
    }

    let dh = Math.round((totalLon / positions.length + 6) / 6); //带号
    let centralMeridian = dh * 6 - 3;
    //高斯投影
    let projection = new SuperMap3D.CustomProjection({
      name: "tmerc",
      centralMeridian: centralMeridian,
      primeMeridian: 0,
      standardParallel_1: 0,
      standardParallel_2: 0,
      eastFalse: 500000.0,
      northFalse: 0.0,
      semimajorAxis: 6378137,
      inverseFlattening: 298.257222101
    });
    let cartesians = [];
    for (let i = 0; i < positions.length; i++) {
      let cartographic = SuperMap3D.Cartographic.fromCartesian(positions[i]);

      let cartesian = projection.project(cartographic);
      cartesians.push(cartesian);
    }

    cartesians.push(cartesians[0]); //首尾相接
    let value = SuperMap3D.getPreciseArea(
      cartesians,
      "China2000",
      centralMeridian,
      dh,
      1
    );
    return value;
  };
  //   设置等值线
  const updateContourLine = (height) => {
    scene.globe.HypsometricSetting.hypsometricSetting.MaxVisibleValue = height;
    scene.globe.HypsometricSetting.hypsometricSetting.MinVisibleValue = height;
    if (!setHypFlag) return;
    for (let i = 0; i < layers.length; i++) {
      if (layers[i].hypsometricSetting.hypsometricSetting) {
        layers[i].hypsometricSetting.hypsometricSetting.MaxVisibleValue = height;
        layers[i].hypsometricSetting.hypsometricSetting.MinVisibleValue = height;
      } else {
        setHypsometricSetting();
      }
    }
  };
  const distanceClk = () => {
    deactiveAll();
    handlerDis && handlerDis.activate();
  };
  const areaClk = () => {
    console.log('areaClk中的state', state);
    console.log('handlerArea', handlerArea);
    deactiveAll();
    handlerArea && handlerArea.activate();
  };
  const heightClk = () => {
    if (!setHypFlag) setHypsometricSetting();
    clearLine();
    //鼠标左键事件监听
    scene.eventManager.addEventListener("CLICK", measureHeightClk, true);
    deactiveAll();
    setState({
      ...state,
      isShowDVH: true
    })
    // state.isShowDVH = true;
    handlerHeight && handlerHeight.activate();
  };
  const measureHeightClk = (e) => {
    let position = scene.pickPosition(e.message.position);
    let p = tool.CartesiantoDegrees(position) // 将获取的点的位置转化成经纬度
    height_0 = p[2];
  }
  // 清除
  const clearAll = () => {
    deactiveAll();
    handlerDis && handlerDis.clear();
    handlerArea && handlerArea.clear();
    handlerHeight && handlerHeight.clear();
    clearLine();
  };
  //   清除等值线
  const clearLine = () => {
    updateContourLine(-10000);
    scene.eventManager.removeEventListener("CLICK", measureHeightClk); //移除鼠标点击事件监听
  };
  const deactiveAll = () => {
    if (!handlerDis) init();
    handlerDis && handlerDis.deactivate();
    handlerArea && handlerArea.deactivate();
    handlerHeight && handlerHeight.deactivate();
    setState({
      ...state,
      isShowDVH: false,
      Ellipsoid: null
    })
    // state.isShowDVH = false;
    // state.Ellipsoid = null;
    lineHeight = -10000;
  };
  const clear = () => {
    clearAll();
    scene.pickPointEnabled = false;
  };

  return (
    <Draggable handle='.sm-drag-handler'>
      < div className="sm-panel" style={{ width: '200px' }}>
        <div className='sm-drag-handler'></div>
        <div className="sm-global-row">
          <span className="sm-global-row-title">模式</span>
          <Select className="sm-global-select" defaultValue="Space" onChange={handleChange}>
            <Option value="Space">空间量算</Option>
            <Option value="Ground">贴地量算</Option>
            <Option value="CGCS2000">CGCS2000</Option>
            <Option value="XIAN80">XIAN80</Option>
            <Option value="WGS84">WGS84</Option>
            <Option value="Plane">平面投影</Option>
          </Select>
        </div>
        <div className="sm-global-row">
          <button onClick={distanceClk} disabled={state.measureMode === 'Plane'}
            className={state.measureMode === 'Plane' ? 'sm-measure-disabled-color' : ''}
          >
            <i className="iconfont iconkongjianjuli" title="测距"></i>
          </button>
          <button onClick={heightClk} disabled={state.measureMode != 'Space' && state.measureMode != 'Ground'}
            className={state.measureMode != 'Space' && state.measureMode != 'Ground'
              ? 'sm-measure-disabled-color'
              : ''}
          >
            <i className="iconfont icongaoduceliang" title="测高"></i>
          </button>
          <button onClick={areaClk}>
            <i className="iconfont iconkongjianmianji" title="测面"> </i>
          </button>
          <button onClick={clear} >
            <i className="iconfont iconqingchu" title="清除"></i>
          </button >
        </div>
      </div >
    </Draggable>

  )

}
export default Sm3dMeasure