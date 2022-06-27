// 拖拽 
import Draggable from 'react-draggable';
import tool from '../../../js/tool/tool.js'
import * as common from "../../../js/common/drawHandler.js"    //公共handler等js
import React, { useEffect, useState } from 'react'
import { InputNumber, Select, Slider, Button } from 'antd';
import '../../../css/global.scss'
import './terrain-flood.scss'
function Sm3dTerrainFlood() {
  // 设置默认值数据
  const [state, setState] = useState({
    maxHeight: 9000, //最大可见高程
    minHeight: 1000, //最小可见高程
    floodHeight: [1000, 9000],
    currentHeight: 1000, //当前高程
    floodTrans: 0.8, //透明度
    cheackedBand: 'band1', //当前选择颜色
    colorBandShow: false, //颜色下拉框显隐
    floodSpeed: 800, //速度
    floodPositions: [],
    lineVisible: true, //是否显示绘制线
  })

  // 可见高度
  const changeFloodHeight = (value) => {
    setState({
      ...state,
      floodHeight: value,
      currentHeight: value[1],
      maxHeight: value[1]
    })
  }
  // 淹没速度
  const changeFloodSpeed = (value) => {
    setState({
      ...state,
      floodSpeed: value
    })
  }

  // 初始化数据
  let floodDisplayMode = SuperMap3D.HypsometricSettingEnum.DisplayMode.FACE;
  let hypFlood = new SuperMap3D.HypsometricSetting();
  let floodColorTable = new SuperMap3D.ColorTable();
  let colors = tool.gradientColors("#95E9F9", "#002794", 20, 0.8);
  // 0-4500米颜色取值
  colors.forEach((color, index) => {
    let h = 500 + 200 * index;
    floodColorTable.insert(
      h,
      SuperMap3D.Color.fromCssColorString(color)
    );
  })
  floodColorTable.insert(9000, new SuperMap3D.Color(0, 39 / 255, 148 / 255, 1));
  floodColorTable.insert(0, new SuperMap3D.Color(149 / 255, 232 / 255, 249 / 255, 0.5));
  let interval;
  let floodPosition = [];
  /*
   ***地形淹没分析模块***
  */


  // 分析
  function floodBegin(e) {
    e.preventDefault();
    hypFlood.DisplayMode = floodDisplayMode;
    hypFlood._lineColor = new SuperMap3D.Color(1.0, 0.0, 0.0, 1.0);
    hypFlood.MinVisibleValue = state.minHeight;
    hypFlood.MaxVisibleValue = 0;
    hypFlood.ColorTableMinKey = 1;
    hypFlood.ColorTableMaxKey = 9000;
    hypFlood.ColorTable = floodColorTable;
    hypFlood.Opacity = state.floodTrans;
    hypFlood.LineInterval = 200.0;
    if (!window.handlerPolygon) {
      common.initHandler("Polygon");
    }
    common.handlerDrawing("Polygon", state.lineVisible).then(
      res => {
        let handlerPolygon = window.handlerPolygon;
        floodUpdate(res.positions);
        handlerPolygon.polygon.show = false;
        handlerPolygon.deactivate();
      },
      err => {
        console.log(err);
      }
    );
    window.handlerPolygon.activate();
    if (!scene.pickPositionSupported) {
      tool.Message.errorMsg(resource.NoPickPositionSupported);
    }
  };
  function floodUpdate(positions) {
    if (positions) {
      floodPosition = positions;
    }
    let currentH = state.minHeight;
    hypFlood.CoverageArea = positions;
    interval = setInterval("flood()", 100);
    window.flood = () => {
      if (currentH <= state.maxHeight) {
        setState({
          ...state,
          currentHeight: currentH
        })
      }
      if (currentH > state.maxHeight) {
        setState({
          ...state,
          currentHeight: state.maxHeight
        })
        clearInterval(interval);
        return;
      }
      hypFlood.MaxVisibleValue = currentH;
      try {
        scene.globe.HypsometricSetting = {
          hypsometricSetting: hypFlood,
          analysisMode:
            SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
        };
      } catch (err) {
        clearInterval(interval);
      };
      currentH += parseFloat(state.floodSpeed) / 10;
    };


  };
  // 清除
  function floodClear(e) {
    e.preventDefault();
    floodPosition = [];
    if (!window.handlerPolygon) return;
    scene.globe.HypsometricSetting = undefined;
    clearInterval(interval);
    common.clearHandlerDrawing("Polygon");
  };

  return (
    <Draggable handle='.sm-drag-handler'>
      <div className="sm-panel">
        <div className='sm-drag-handler'></div>
        <div className="sm-global-row">
          <span>可见高度</span>
          <Slider className="sm-global-slider"
            min={0}
            max={9000}
            value={state.floodHeight}
            range step={1}
            onChange={changeFloodHeight}
          />
        </div>
        <div className="sm-global-row">
          <span>当前高程</span>
          <InputNumber
            className="sm-global-input-number"
            value={state.currentHeight}
            min={0}
            disabled
          />
        </div>
        <div className="sm-global-row">
          <span>淹没速度</span>
          <Slider className="sm-global-slider"
            min={1}
            max={1000}
            step={1}
            value={state.floodSpeed}
            onChange={changeFloodSpeed}
          />
        </div>
        <div className="sm-global-button">
          <Button size="small" onClick={floodBegin}>分析</Button>
          <Button size="small" onClick={floodClear}>清除</Button>
        </div>
      </div>
    </Draggable>
  )


}
export default Sm3dTerrainFlood