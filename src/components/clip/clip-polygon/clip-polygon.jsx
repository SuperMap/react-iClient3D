// 拖拽 
import Draggable from 'react-draggable';
import { initHandler, handlerDrawing, clearHandlerDrawing } from "../../../js/common/drawHandler.js"    //公共handler.js
import React, { useEffect, useState } from 'react'
import { Radio, Button } from 'antd';
import '../../../css/global.scss'

function Sm3dClipPolygon() {
  // 设置默认值数据
  const [state, setState] = useState({
    clipModelPolygon: 'ClipInside',//裁剪模式js
    isEdit: false,//是否编辑
    isEditZ: false,
    lineVisible: true,//是否显示绘制线
  });

  // 初始化数据
  let clipMode = SuperMap3D.ModifyRegionMode.CLIP_INSIDE;   //裁剪模式值 外部: SuperMap3D.ModifyRegionMode.CLIP_OUTSIDE;
  let layers;
  let polygonPosition = [];

  const changeClipModelPolygon = (e) => {
    console.log(e);
    setState({
      ...state,
      clipModelPolygon: e.target.value
    })
  }

  /*
   ***裁剪平面分析模块***
  */

  //初始化分析区域 （后面有需要可以添加监听）
  useEffect(() => {
    layers = scene.layers && scene.layers.layerQueue;
  }, [scene.layers])

  // 分析
  const clipPolygon = (e) => {
    e.preventDefault();
    if (!layers) {
      layers = scene.layers && scene.layers.layerQueue;
    }
    for (let layer of layers) {
      layer.selectEnabled = false;
      // 设置被裁剪对象的颜色
      layer.clipLineColor = new SuperMap3D.Color(1, 1, 1, 0);
    }
    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }
    handlerDrawing("Polygon", state.lineVisible).then(
      (res) => {
        clipPolygonUpdate(res.positions)
        let handlerPolygon = window.handlerPolygon;
        handlerPolygon.polygon.show = false;
        handlerPolygon.polyline.show = false;
        handlerPolygon.deactivate();
        if (state.isEdit) {
          Edit(polygonPosition, state.isEditZ, clipPolygonUpdate);
        }
      },
      (err) => {
        console.log(err);
      }
    );
    window.handlerPolygon.activate();
    if (!scene.pickPositionSupported) {
      tool.Message.errorMsg(resource.NoPickPositionSupported);
    }
  };
  // 更新
  const clipPolygonUpdate = (p) => {
    polygonPosition = p;
    for (let layer of layers) {
      layer.setModifyRegions([p], clipMode);
    }
  };

  // 清除
  const clearClipPolygon = (e) => {
    e.preventDefault();
    polygonPosition = [];
    if (!window.handlerPolygon) return;
    clearHandlerDrawing("Polygon");
    for (let layer of layers) {
      layer.clearModifyRegions();
    }
  };
  // 监听
  useEffect(() => {
    switch (state.clipModelPolygon) {
      case "ClipInside":
        clipMode = SuperMap3D.ModifyRegionMode.CLIP_INSIDE;
        break;
      case "ClipOutside":
        clipMode = SuperMap3D.ModifyRegionMode.CLIP_OUTSIDE;
        break;
      default:
        break;
    }
    if (polygonPosition.length > 0) {
      clipPolygonUpdate(polygonPosition);
    }
  }, [state.clipModelPolygon])


  // 销毁
  // onBeforeUnmount(() => {
  //   layers = undefined;
  // })

  return (
    <Draggable handle='.sm-drag-handler'>
      <div className='sm-panel' >
        <div className='sm-drag-handler'></div>
        <Radio.Group defaultValue="ClipInside" className="sm-global-row" onChange={changeClipModelPolygon}>
          <Radio value="ClipInside">裁剪内部</Radio>
          <Radio value="ClipOutside">裁剪外部</Radio>
        </Radio.Group>
        <div className="sm-global-button">
          <Button size="small" onClick={clipPolygon}>裁剪</Button>
          <Button size="small" onClick={clearClipPolygon}>清除</Button>
        </div>
      </div>
    </Draggable>
  )


}
export default Sm3dClipPolygon