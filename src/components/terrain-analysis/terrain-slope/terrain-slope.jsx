// 拖拽 
import Draggable from 'react-draggable';
import { initHandler, handlerDrawing, clearHandlerDrawing } from "../../../js/common/drawHandler.js"    //公共handler.js
import React, { useEffect, useState } from 'react'
import { Select, Slider, Button } from 'antd';
import '../../../css/global.scss'
import './terrain-slope.scss'
const { Option } = Select;
function Sm3dTerrainSlope() {

  // 设置默认值数据
  const [slopData, setSlopData] = useState({
    analysisArea: 'ARM_REGION',//分析区域
    displayMode: 'FACE_AND_ARROW',//显示模式
    wideMaxR: 90, //最大坡度
    wideMinR: 0, //最小坡度
    slopeInterval: [0, 90],
    trans: 0.8, //透明度
    isEdit: false,//是否编辑
    slopePositions: [],
    lineVisible: true,//是否显示绘制线
  });

  // 初始化数据
  let tipFlag = true;
  let slope = new SuperMap3D.SlopeSetting(); //分析对象
  let wide = SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode[slopData.analysisArea]; //默认分析区域值
  let disMode = SuperMap3D.SlopeSettingEnum.DisplayMode[slopData.displayMode]; //显示模式
  let SlopColorTable = new SuperMap3D.ColorTable();  //颜色
  let slopePosition = [];  //保存当前分析区域
  SlopColorTable.insert(80, new SuperMap3D.Color(255 / 255, 0 / 255, 0 / 255));
  SlopColorTable.insert(
    50,
    new SuperMap3D.Color(221 / 255, 224 / 255, 7 / 255)
  );
  SlopColorTable.insert(
    30,
    new SuperMap3D.Color(20 / 255, 187 / 255, 18 / 255)
  );
  SlopColorTable.insert(20, new SuperMap3D.Color(0, 161 / 255, 1));
  SlopColorTable.insert(0, new SuperMap3D.Color(9 / 255, 9 / 255, 255 / 255));

  // 分析区域
  const changeAnalysisArea = (value) => {
    setSlopData({
      ...slopData,
      analysisArea: value
    })
  }
  // 坡度区间
  const changeSlopeInterval = (value) => {
    setSlopData({
      ...slopData,
      slopeInterval: value
    })
  }
  /*
   ***坡度分析模块***
  */

  // 分析
  const startSlope = (e) => {
    e.preventDefault();
    slope.DisplayMode = disMode;
    slope.MaxVisibleValue = slopData.wideMaxR;
    slope.MinVisibleValue = slopData.wideMinR;
    slope.ColorTable = SlopColorTable;
    slope.Opacity = slopData.trans;
    // this.positions = [];
    // scene.globe.enableLighting = true;
    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }
    handlerDrawing("Polygon", slopData.lineVisible).then(
      (res) => {
        slopePosition = res.positions;
        slopeUpdate(slopePosition);
        let handlerPolygon = window.handlerPolygon;
        handlerPolygon.polygon.show = false;
        handlerPolygon.polyline.show = false;
        handlerPolygon.deactivate();
        if (slopData.isEdit) {
          Edit(slopePosition, false, slopeUpdate);
        }
      },
      (err) => {
        console.log(err);
      }
    );
    handlerPolygon.activate();
    if (!scene.pickPositionSupported) {
      tool.Message.errorMsg(resource.NoPickPositionSupported);
    }
  };
  // 更新
  const slopeUpdate = (p) => {
    if (p) {
      slopePosition = p;
    }
    slope.CoverageArea = p;
    scene.globe.SlopeSetting = {
      slopeSetting: slope,
      analysisMode: wide,
    };
  };
  // 清除
  const clearSlope = (e) => {
    e.preventDefault();
    slopePosition = [];
    if (!window.handlerPolygon) return;
    scene.globe.SlopeSetting = {
      analysisMode: SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_NONE,
    };
    clearHandlerDrawing("Polygon");
    clearEditHandler("Polygon");
  };

  return (
    <Draggable handle='.sm-drag-handler'>
      <div className="sm-panel">
        <div className='sm-drag-handler'></div>
        <div className="sm-global-row">
          <span>分析区域</span>
          <Select value={slopData.analysisArea} onChange={changeAnalysisArea}>
            <Option value="ARM_REGION">指定多边形区域</Option>
            <Option value="ARM_ALL">全部区域参与分析</Option>
            <Option value="ARM_NONE">全部区域不参与分析</Option>
          </Select>
        </div>
        <div className="sm-global-row">
          <span>坡度区间</span>
          <Slider
            className="sm-global-slider"
            value={slopData.slopeInterval}
            min={0}
            max={90}
            range
            step={1}
            onChange={changeSlopeInterval}
          />
        </div>
        <div className="sm-global-button">
          <Button size="small" onClick={startSlope}>分析</Button>
          <Button size="small" onClick={clearSlope}>清除</Button>
        </div>

      </div>
    </Draggable>
  )

}
export default Sm3dTerrainSlope