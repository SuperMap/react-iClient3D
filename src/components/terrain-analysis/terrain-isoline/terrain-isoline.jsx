// 拖拽 
import Draggable from 'react-draggable';
import React, { useEffect, useState } from 'react'
import { InputNumber, Select, Slider, Button } from 'antd';
import { initHandler, handlerDrawing, clearHandlerDrawing } from "../../../js/common/drawHandler.js"    //公共handler.js
import { Edit, clearEditHandler } from "../../../js/common/editHandler.js"   //编辑
import '../../../css/global.scss'
import './terrain-isoline.scss'
const { Option } = Select;
function Sm3dTerrainIsoline() {
  // 设置默认值数据
  const [state, setState] = useState({
    fillMaxHeight: 9000, //最大可见高程
    fillMinHeight: 0, //最小可见高程
    fillHeight: [0, 9000],
    equivalentIsoline: 100, //等值距
    fillOptionsSelected: 'Line', //当前选择模式
    lineColor: "#FF8040", //颜色
    isEdit: false, //是否编辑
    isolinePositions: [],
    lineVisible: true, //是否显示绘制线
  });

  const colorTableInit = (colorTable) => {
    colorTable.insert(5597.06640625, new SuperMap3D.Color(0, 0, 255 / 255));
    colorTable.insert(
      5406.3873860677086,
      new SuperMap3D.Color(0, 51 / 255, 255 / 255)
    );
    colorTable.insert(
      5215.7083658854172,
      new SuperMap3D.Color(0, 102 / 255, 255 / 255)
    );
    colorTable.insert(
      5025.0293457031257,
      new SuperMap3D.Color(0, 153 / 255, 255 / 255)
    );
    colorTable.insert(
      4834.3503255208343,
      new SuperMap3D.Color(0, 204 / 255, 255 / 255)
    );
    colorTable.insert(
      4643.6713053385429,
      new SuperMap3D.Color(0, 255 / 255, 255 / 255)
    );
    colorTable.insert(
      4452.9922851562524,
      new SuperMap3D.Color(51 / 255, 255 / 255, 204 / 255)
    );
    colorTable.insert(
      4262.3132649739609,
      new SuperMap3D.Color(102 / 255, 255 / 255, 153 / 255)
    );
    colorTable.insert(
      4071.6342447916695,
      new SuperMap3D.Color(153 / 255, 255 / 255, 102 / 255)
    );
    colorTable.insert(
      3880.9552246093781,
      new SuperMap3D.Color(204 / 255, 255 / 255, 51 / 255)
    );
    colorTable.insert(
      3690.2762044270867,
      new SuperMap3D.Color(255 / 255, 255 / 255, 0)
    );
    colorTable.insert(
      3499.5971842447952,
      new SuperMap3D.Color(255 / 255, 204 / 255, 0)
    );
    colorTable.insert(
      3308.9181640625038,
      new SuperMap3D.Color(255 / 255, 153 / 255, 0)
    );
    colorTable.insert(
      3118.2391438802129,
      new SuperMap3D.Color(255 / 255, 102 / 255, 0)
    );
    colorTable.insert(
      2927.5601236979214,
      new SuperMap3D.Color(255 / 255, 51 / 255, 0)
    );
    colorTable.insert(2736.88110351563, new SuperMap3D.Color(255 / 255, 0, 0));
  };
  // 初始化数据
  let hyp = new SuperMap3D.HypsometricSetting();
  // const [DisplayModeHyp, setDisplayModeHyp] = useState()
  let DisplayModeHyp = SuperMap3D.HypsometricSettingEnum.DisplayMode.LINE;  //显示模式
  let colorTable = new SuperMap3D.ColorTable(); //建立颜色表
  colorTableInit(colorTable)
  let isolinePosition = [];  //保存当前分析区域

  // 可见高度
  const changeFillHeight = (value) => {
    setState({
      ...state,
      fillHeight: value
    })
  }
  // 深度
  const changeEquivalentIsoline = (value) => {
    setState({
      ...state,
      equivalentIsoline: value
    })
  }

  const changeFillOptionsSelected = (value) => {
    setState({
      ...state,
      fillOptionsSelected: value
    })
    switch (value) {
      case "None":
        DisplayModeHyp = undefined;
        break;
      case "Line":
        DisplayModeHyp =
          SuperMap3D.HypsometricSettingEnum.DisplayMode.LINE;
        hyp.Opacity = 1;
        break;
      case "Region":
        DisplayModeHyp =
          SuperMap3D.HypsometricSettingEnum.DisplayMode.FACE;
        hyp.Opacity = 0.5;
        break;
      case "Line_Region":
        DisplayModeHyp =
          SuperMap3D.HypsometricSettingEnum.DisplayMode.FACE_AND_LINE;
        hyp.Opacity = 0.5
        break;
      default:
        break;
    }
    hyp.DisplayMode = DisplayModeHyp;
    if (isolinePosition.length == 0) {
      return;
    }
    isolineUpdate(isolinePosition)
  }
  /*
   ***等值线分析模块***
  */

  // 分析
  const isoLineAnalysis = (e) => {
    e.preventDefault();
    //参数配置
    hyp.DisplayMode = DisplayModeHyp;
    hyp._lineColor = SuperMap3D.Color.fromCssColorString(state.lineColor);
    hyp.LineInterval = parseFloat(state.equivalentIsoline);
    hyp.MaxVisibleValue = parseFloat(state.fillMaxHeight);
    hyp.MinVisibleValue = parseFloat(state.fillMinHeight);
    hyp.ColorTableMinKey = 2736.88110351563;
    hyp.ColorTableMaxKey = 5597.06640625;
    hyp.ColorTable = colorTable;
    // hyp.Opacity = 0.4;
    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }
    handlerDrawing("Polygon", state.lineVisible).then(
      res => {
        isolinePosition = res.positions;
        let handlerPolygon = window.handlerPolygon;
        //分析区域为指定区域
        isolineUpdate(isolinePosition)
        handlerPolygon.polygon.show = false;
        handlerPolygon.polyline.show = false;
        handlerPolygon.deactivate();
        if (state.isEdit) {
          Edit(isolinePosition, false, isolineUpdate)
        }
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
  // 更新
  const isolineUpdate = (p) => {
    if (p) {
      isolinePosition = p;
    }
    if (isolinePosition.length == 0) return;
    if (p) {
      hyp.CoverageArea = p;
    }
    scene.globe.HypsometricSetting = {
      hypsometricSetting: hyp,
      analysisMode:
        SuperMap3D.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
    }
  };
  // 清除
  const clearIsoLine = (e) => {
    e.preventDefault();
    isolinePosition = [];
    if (!window.handlerPolygon) return;
    scene.globe.HypsometricSetting = undefined;
    hyp && (hyp.MaxVisibleValue = -1000);
    hyp && (hyp.MinVisibleValue = -1000);
    clearHandlerDrawing("Polygon");
    clearEditHandler("Polygon");
  };

  return (
    <Draggable handle='.sm-drag-handler'>
      <div className='sm-panel'>
        <div className='sm-drag-handler'></div>
        <div className="sm-global-row">
          <span>可见高度</span>
          <Slider className="sm-global-slider" min={0} value={state.te}
            max={9000} step={1}
            onChange={changeFillHeight}
          />
        </div>
        <div className="sm-global-row">
          <span>等值距(米)</span>
          <InputNumber className="sm-global-input-number" min={0} placeholder="深度" value={state.equivalentIsoline} onChange={changeEquivalentIsoline} />
        </div>
        <div className="sm-global-row">
          <span>显示模式</span>
          <Select className="sm-global-select" value={state.fillOptionsSelected} onChange={changeFillOptionsSelected}>
            <Option value="Line">等高线填充</Option>
            <Option value="Region">等高面填充</Option>
            <Option value="Line_Region">等高线面填充</Option>
            <Option value="None">无颜色表</Option>
          </Select>
        </div>
        <div className="sm-global-button">
          <Button size="small" onClick={isoLineAnalysis}>分析</Button>
          <Button size="small" onClick={clearIsoLine}>清除</Button>
        </div>
      </div>
    </Draggable>
  )

}
export default Sm3dTerrainIsoline