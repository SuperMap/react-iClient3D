// 拖拽 
import Draggable from 'react-draggable';
import React, { useEffect, useState } from 'react'
import { Slider, Radio, InputNumber, Button } from 'antd';
import { initHandler, handlerDrawing, clearHandlerDrawing } from "../../../js/common/drawHandler.js"    //公共handler.js
import { Edit, clearEditHandler } from "../../../js/common/editHandler.js"   //编辑
import tool from '../../../js/tool/tool.js'        //提示等工具
function Sm3dTerrainOperation() {
  // 设置默认值数据
  const [state, setState] = useState({
    digDepth: 500,
    isEdit: false,
    isEditZ: false,
    lineVisible: true,
    digPositions: [],
    modifyPositions: [],
    operationType: 'dig',
    terrainVisible: "terrainVisible"
  })

  // 非响应式数据定义
  let digPosition = [];
  let modifyPosition = [];
  let operationType = "dig";

  // 开挖 需改
  const changeOperationType = (e) => {
    setState({
      ...state,
      operationType: e.target.value
    })
  }
  // 开挖深度
  const changeDigDepth = (value) => {
    setState({
      ...state,
      digDepth: value
    })
  }

  /*
   ***挖掘模块***
  */
  //初始化挖掘区域(暂时只支持一个开挖区域)
  // if (props && props.digPositions) {
  //   digUpdate(props.digPositions);
  // }

  const digTerrain = (e) => {
    e.preventDefault();
    operationType = "dig";
    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }
    handlerDrawing("Polygon", state.lineVisible).then(
      res => {
        digPosition = res.positions;
        let handlerPolygon = window.handlerPolygon;
        digUpdate(res.positions);
        handlerPolygon.polygon.show = false;
        handlerPolygon.polyline.show = false;
        handlerPolygon.deactivate();
        if (state.isEdit) {
          Edit(digPosition, state.isEditZ, digUpdate);
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

  }

  //更新地形挖掘
  const digUpdate = (dig_position) => {
    if (dig_position) {
      digPosition = dig_position;
    }
    scene.globe.removeAllExcavationRegion();
    scene.globe.addExcavationRegion({
      name: "dig_terrain",
      position: digPosition,
      height: state.digDepth,
      transparent: false
    });
  }
  // 清除
  const clearDig = (e) => {
    e.preventDefault();
    digPosition = [];
    if (!window.handlerPolygon) return;
    scene.globe.removeAllExcavationRegion();
    clearHandlerDrawing("Polygon");
    clearEditHandler("Polygon");
  }

  /*
   ***地形修改模块***
   */
  const modifyTerrain = (e) => {
    e.preventDefault();
    operationType = "modify";
    // if (viewer.terrainProvider.tablename) {
    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }
    handlerDrawing("Polygon", state.lineVisible).then(
      res => {
        modifyPosition = res.positions;
        let handlerPolygon = window.handlerPolygon;
        modifyUpdate(res.positions);
        handlerPolygon.polygon.show = false;
        handlerPolygon.polyline.show = false;
        if (state.isEdit) {
          Edit(modifyPosition, state.isEditZ, modifyUpdate);
        }
      },
      err => {
        console.log(err);
      }
    );

    window.handlerPolygon.activate();
    if (!scene.pickPositionSupported) {
      alert("不支持深度纹理,无法绘制多边形，地形修改功能无法使用！");
    }
    // }
  }
  const clearModify = (e) => {
    e.preventDefault();
    if (!window.handlerPolygon) return;
    scene.globe.removeAllModifyRegion();
    clearHandlerDrawing("Polygon");
    clearEditHandler("Polygon");
  }
  //更新地形修改
  const modifyUpdate = (modify_positions) => {
    if (modify_positions) {
      modifyPosition = modify_positions;
    }
    scene.globe.removeAllModifyRegion();
    scene.globe.addModifyRegion({
      name: "ggg",
      position: modifyPosition
    });
  }


  return (
    <Draggable handle='.sm-drag-handler'>
      <div className="sm-panel">
        <div className='sm-drag-handler'></div>
        <Radio.Group value={state.operationType} className="sm-global-row" onChange={changeOperationType}>
          <Radio value="dig">地形开挖</Radio >
          <Radio value="modify">地形修改</Radio >
        </Radio.Group>
        {
          state.operationType === 'dig' ? (<div className="sm-global-row">
            <span>开挖深度</span>
            <InputNumber className="sm-global-input-number" value={state.digDepth} min={0} onChange={changeDigDepth} />
          </div>) : ("")
        }
        {
          state.operationType === 'modify' ? (<div className="sm-global-button" >
            <Button size="small" onClick={modifyTerrain}>修改</Button>
            <Button size="small" onClick={clearModify}>清除</Button>
          </div >) : (<div className="sm-global-button" >
            <Button size="small" onClick={digTerrain}>开挖</Button>
            <Button size="small" onClick={clearDig}> 清除</Button>
          </div >)
        }
      </div >
    </Draggable>
  )


}
export default Sm3dTerrainOperation