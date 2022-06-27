// 拖拽 
import Draggable from 'react-draggable';
import '../../../css/global.scss'
import React, { useEffect, useState } from 'react'
import { Button, Radio } from 'antd';


function Sm3dClipBox() {
  // 设置默认值数据
  const [state, setState] = useState({
    clipMode: 'clip_behind_all_plane',//裁剪模式js
  });


  // 初始化数据
  let layers;
  const [boxEntity, setBoxEntity] = useState()
  const [handlerBox, setHandlerBox] = useState(new SuperMap3D.DrawHandler(scene, SuperMap3D.DrawMode.Box))
  const [editorBox, setEditorBox] = useState()
  useEffect(() => {
    // setHandlerBox(new SuperMap3D.DrawHandler(scene, SuperMap3D.DrawMode.Box))
  }, [])

  useEffect(() => {
    layers = scene.layers && scene.layers.layerQueue;
  }, [layers])
  /*
   ***裁剪交互分析模块***
  */


  // 分析
  const BoxClipByEitor = () => {
    clearBoxClipByEitor();
    if (editorBox) {
      handlerBox.activate();
      return;
    }
    // 设置裁剪线颜色
    setAllLayersClipColor();
    //交互绘制box
    handlerBox.movingEvt.addEventListener(windowPosition => {
    });
    handlerBox.drawEvt.addEventListener(e => {
      // boxEntity = e.object;
      let newDim = e.object.box.dimensions.getValue();
      let position = e.object.position.getValue(0);
      let boxOption = {
        dimensions: newDim,
        position: position,
        clipMode: state.clipMode,
        heading: 0
      };
      //box编辑
      setEditorBox(new SuperMap3D.BoxEditor(scene, e.object))
      setBoxEntity(e.object)
      // editorBox = new SuperMap3D.BoxEditor(scene, boxEntity);
      setAllLayersClipOptions(boxOption);
      handlerBox.clear();
      handlerBox.deactivate();
    });
    handlerBox.activate();
  };

  // useEffect(() => {
  //   if(boxEntity) {

  //   }
  // }, [boxEntity])

  useEffect(() => {
    if (editorBox) {
      editorBox.editEvt.addEventListener(e => {
        boxEntity.box.dimensions = e.dimensions;
        boxEntity.position = e.position;
        boxEntity.orientation = e.orientation;
        setClipBox();
      });
      editorBox.activate();
    }
  }, [editorBox])

  // 更新
  const setClipBox = () => {
    if (typeof boxEntity == "undefined") {
      return;
    }
    let newDim = boxEntity.box.dimensions.getValue();
    let position = boxEntity.position.getValue(0);

    let heading = 0;
    if (typeof boxEntity.orientation != "undefined") {
      let rotationM3 = SuperMap3D.Matrix3.fromQuaternion(
        boxEntity.orientation._value,
        new SuperMap3D.Matrix3()
      );
      let localFrame = SuperMap3D.Matrix4.fromRotationTranslation(
        rotationM3,
        SuperMap3D.Cartesian3.ZERO,
        new SuperMap3D.Matrix4()
      );
      let inverse = SuperMap3D.Matrix4.inverse(
        SuperMap3D.Transforms.eastNorthUpToFixedFrame(position),
        new SuperMap3D.Matrix4()
      );
      let hprm = SuperMap3D.Matrix4.multiply(
        inverse,
        localFrame,
        new SuperMap3D.Matrix4()
      );
      let rotation = SuperMap3D.Matrix4.getMatrix3(hprm, new SuperMap3D.Matrix3());
      let hpr = SuperMap3D.HeadingPitchRoll.fromQuaternion(
        SuperMap3D.Quaternion.fromRotationMatrix(rotation)
      );
      heading = hpr.heading;
    }
    let boxOptions = {
      dimensions: newDim,
      position: position,
      clipMode: state.clipMode,
      heading: heading
    };
    setAllLayersClipOptions(boxOptions);
  };
  //设置图层裁剪
  const setAllLayersClipOptions = (boxOptions) => {
    for (let i = 0, j = layers.length; i < j; i++) {
      layers[i].setCustomClipBox(boxOptions);
    }
  };
  //设置线颜色
  const setAllLayersClipColor = () => {
    for (let i = 0, j = layers.length; i < j; i++) {
      layers[i].selectEnabled = false;
      layers[i].clipLineColor = new SuperMap3D.Color(1, 1, 1, 0);
    }
  };
  // 清除
  const clearBoxClipByEitor = () => {
    if (handlerBox) {
      handlerBox.deactivate();
    }
    if (!boxEntity) {
      return;
    }
    for (let layer of layers) {
      layer.clearCustomClipBox();
    }
    boxEntity = undefined;
    editorBox.deactivate();
    scene.trackingLayer.removeAll();
    handlerBox.clear();
  };

  const changeRadio = (e) => {
    setState({
      clipMode: e.target.value
    })
  }

  return (
    <Draggable handle='.sm-drag-handler'>
      <div className='sm-panel'>
        <div className='sm-drag-handler'></div>
        <Radio.Group value={state.clipMode}
          onChange={changeRadio}
          className="sm-global-row">
          <Radio value="clip_behind_all_plane">裁剪内部</Radio>
          <Radio value="clip_behind_any_plane">裁剪外部</Radio>
        </Radio.Group>
        <div className="sm-global-button">
          <Button size="small" onClick={BoxClipByEitor}>裁剪</Button>
          <Button size="small" onClick={clearBoxClipByEitor}>清除</Button>
        </div>
      </div>
    </Draggable>
  )


}
export default Sm3dClipBox