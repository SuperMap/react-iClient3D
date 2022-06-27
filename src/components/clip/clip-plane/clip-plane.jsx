import React, { useEffect, useState } from 'react'
import { InputNumber, Select, Slider, Radio, Button } from 'antd';
const { Option } = Select;
function Sm3dClipPlane() {
  // 设置默认值数据
  const [state, setState] = useState({
    clipMode: 'ClipInside',  //裁剪模式
    planeDirection: 'vertical', //裁剪方向
  });

  // 初始化数据
  let layers;
  let planePositionObj;
  let editEntity, s3mInstanceColc;
  let modelUrl = 'public/data/s3m/box.s3m';
  let modelEditor;
  // 平面方向
  const changePlaneDirection = (value) => {
    setState({
      ...state,
      planeDirection: value
    })
  }
  // 裁剪模式
  const changeClipMode = (value) => {
    setState({
      ...state,
      clipMode: value
    })
  }

  /*
   ***平面分析模块***
  */

  //viewer 初始化完成的监听
  useEffect(() => {
    init()
  }, [])

  const init = () => {
    layers = scene.layers && scene.layers.layerQueue;
    s3mInstanceColc = new SuperMap3D.S3MInstanceCollection(scene._context);
    scene.primitives.add(s3mInstanceColc);
  }


  // 分析
  const clipPlaneStart = (e) => {
    e.preventDefault();
    if (planeSurface) clearClipPlane();
    if (!window.handlerPolygon) {
      initHandler("Polyline");
    }
    handlerDrawing("Polyline").then(
      res => {
        let handlerPolyline = window.handlerPolyline;
        handlerPolyline.polyline.show = false;
        window.polylineTransparent.show = false; //半透线隐藏
        handlerPolyline.deactivate();
        setPlanePositions(res.positions, res.result.object._positions);
      },
      (err) => {
        console.log(err);
      }
    );
    window.handlerPolyline.activate();
  };

  // 垂直地面裁剪面设置
  const verticalGroundPlane = (linePositions, carPos, width) => {
    let point1 = linePositions.slice(0, 3);
    let point2 = linePositions.slice(3, 6);
    let point3 = point2.slice(0, 2).concat(point2[2] + width);
    let point4 = point1.slice(0, 2).concat(point1[2] + width);
    let catPoints = [].concat(carPos);
    catPoints.push(SuperMap3D.Cartesian3.fromDegrees(point3[0], point3[1], point3[2]));
    catPoints.push(SuperMap3D.Cartesian3.fromDegrees(point4[0], point4[1], point4[2]));
    return catPoints
  }

  // 平行地面的裁剪面
  const parallelGroundPlane = (carPos, width) => {
    let Vab = new SuperMap3D.Cartesian3(0, 0, 0);
    let Vbc = new SuperMap3D.Cartesian3(0, 0, 0);
    let py = new SuperMap3D.Cartesian3(0, 0, 0);
    let point3 = new SuperMap3D.Cartesian3(0, 0, 0);
    let point4 = new SuperMap3D.Cartesian3(0, 0, 0);
    SuperMap3D.Cartesian3.subtract(carPos[0], carPos[1], Vab);
    SuperMap3D.Cartesian3.cross(Vab, carPos[0], Vbc);
    SuperMap3D.Cartesian3.normalize(Vbc, Vbc);
    SuperMap3D.Cartesian3.multiplyComponents(Vbc, new SuperMap3D.Cartesian3(width, width, width), py)
    SuperMap3D.Cartesian3.add(carPos[0], py, point4);
    SuperMap3D.Cartesian3.add(carPos[1], py, point3);
    let catPoints = [carPos[0], carPos[1], point3, point4];
    return catPoints
  }


  const setPlanePositions = (linePositions, carPos) => {
    let cartPositions;
    let width = SuperMap3D.Cartesian3.distance(carPos[0], carPos[1]);
    width = SuperMap3D.defaultValue(width, 100);
    if (state.planeDirection === 'vertical') cartPositions = verticalGroundPlane(linePositions, carPos, width);
    else cartPositions = parallelGroundPlane(carPos, width);
    let centerP = SuperMap3D.BoundingSphere.fromPoints(cartPositions).center;
    planePositionObj = {
      cartPositions: cartPositions,
      centerPositions: centerP
    }
    addsurface()
    clipPlaneUpdate()
  }

  let planeSurface;
  const addsurface = () => {
    planeSurface = scene.trackingLayer.add({
      id: "clip-plane",
      polygon: {
        hierarchy: new SuperMap3D.CallbackProperty(() => {
          return {
            positions: planePositionObj.cartPositions,
            holes: []
          }
        }, false),
        material: SuperMap3D.Color.GOLD.withAlpha(0.2),
        outline: true,
        outlineColor: SuperMap3D.Color.GOLD,
        perPositionHeight: true,
      },
    });
    addModel()
  }

  const addModel = () => {
    let getAngleAndRadian = tool.getAngleAndRadian(planePositionObj.cartPositions[0], planePositionObj.cartPositions[1]);
    let heading = getAngleAndRadian.radian;
    let id = "clip-model";
    s3mInstanceColc.add(modelUrl, {
      id: id,
      position: planePositionObj.centerPositions,
      hpr: new SuperMap3D.HeadingPitchRoll(heading, 0, 0),
      // color:SuperMap3D.Color.RED,
      scale: new SuperMap3D.Cartesian3(0.1, 0.1, 0.1),
    });
    editEntity = s3mInstanceColc.getInstance(modelUrl, id);
    if (!modelEditor) addModelEditor(editEntity);
    else {
      modelEditor.setEditObject(editEntity);
      modelEditor.activate();
    }
  }

  const addModelEditor = (model) => {
    modelEditor = new SuperMap3D.ModelEditor({
      model: model,
      scene: scene,
      axesShow: {
        "translation": true,
        "rotation": false,
        "scale": false
      }
    });
    modelEditor.activate();
    modelEditor.changedEvt.addEventListener((param) => {
      let Cartesian3 = new SuperMap3D.Cartesian3();
      SuperMap3D.Matrix4.getTranslation(param.modelMatrix, Cartesian3);
      if (Cartesian3) {
        let subx = Cartesian3.x - planePositionObj.centerPositions.x;
        let suby = Cartesian3.y - planePositionObj.centerPositions.y;
        let subz = Cartesian3.z - planePositionObj.centerPositions.z;
        for (let i = 0; i < 4; i++) {
          planePositionObj.cartPositions[i].x += subx;
          planePositionObj.cartPositions[i].y += suby;
          planePositionObj.cartPositions[i].z += subz;
        }
        planePositionObj.centerPositions = Cartesian3;
        clipPlaneUpdate()
      }
    })
  }


  // 更新
  const clipPlaneUpdate = () => {
    if (!planePositionObj.cartPositions) return
    for (let layer of layers) {
      // layer.clearCustomClipBox();
      layer.setCustomClipPlane(
        planePositionObj.cartPositions[0],
        planePositionObj.cartPositions[1],
        planePositionObj.cartPositions[2]
      );
    }
  };

  // 清除
  const clearClipPlane = () => {
    if (planeSurface) {
      scene.trackingLayer.remove(planeSurface);
      modelEditor.deactivate();
      s3mInstanceColc.removeCollection(modelUrl);
      planeSurface = null;
      planePositionObj = null;
    }
    if (!window.handlerPolyline) return;
    clearHandlerDrawing("Polyline");
    for (let layer of layers) {
      layer.clearCustomClipBox();
    }
  };


  return <div>
    <div className="sm-global-row">
      <span>平面方向</span>
      <Select defaultValue="vertical" onChange={changePlaneDirection}>
        <Option value="vertical">竖直方向</Option>
        <Option value="parallel">水平方向</Option>
      </Select>
    </div>
    <div className="sm-global-row">
      <span>裁剪模式</span>
      <Select defaultValue="ClipInside" onChange={changeClipMode}>
        <Option value="ClipInside">裁剪内部</Option>
        <Option value="ClipOutside">裁剪外部</Option>
      </Select>
    </div>
    <div className="sm-global-button">
      <Button size="small" >裁剪</Button>
      <Button size="small" >清除</Button>
    </div>
  </div>
}
export default Sm3dClipPlane