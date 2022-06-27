// 拖拽 
import Draggable from 'react-draggable';
import { initHandler, handlerDrawing, clearHandlerDrawing } from "../../../js/common/drawHandler.js"    //公共handler.js
// import createTooltip from '../../../js/tool/tooltip.js'
import tool from '../../../js/tool/tool.js'        //提示等工具
import React, { useEffect, useState } from 'react'
import { InputNumber, Select, Slider, Radio, Button } from 'antd';
const { Option } = Select;
function Sm3dGeologicalBody() {
  // 设置默认值数据
  const [state, setState] = useState({
    operationType: 'stretch_cut',  //操作类型
    stretchHeight: 1,  //拉伸高度
    modelUrls: [
      {
        id: 1,
        model: "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer1/features/1.stream",
        color: new SuperMap3D.Color(179 / 255, 179 / 255, 179 / 255, 1)
      },
      {
        id: 2,
        model: "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer2/features/1.stream",
        color: new SuperMap3D.Color(94 / 255, 179 / 255, 59 / 255, 1)
      },
      {
        id: 3,
        model: "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer3/features/1.stream",
        color: new SuperMap3D.Color(52 / 255, 94 / 255, 35 / 255, 1)
      },
      {
        id: 4,
        model: "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer4/features/1.stream",
        color: new SuperMap3D.Color(115 / 255, 115 / 255, 115 / 255, 1)
      },
      {
        id: 5,
        model: "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer5/features/1.stream",
        color: new SuperMap3D.Color(171 / 255, 85 / 255, 66 / 255, 1)
      },
      {
        id: 6,
        model: "http://www.supermapol.com/realspace/services/data-dizhiti/rest/data/datasources/%E5%9C%B0%E8%B4%A8%E4%BD%93/datasets/Layer6/features/1.stream",
        color: new SuperMap3D.Color(68 / 255, 68 / 255, 68 / 255, 1)
      }
    ],  //模型配置
    digHeight: 500,
    drillRadius: 400,
    drillHeight: 2000,
    clipType: 'drawClip',
    drawClipMode: 'KeepInside',
  });

  // 初始化数据
  const [solidModelsProfile, setSolidModelsProfile] = useState(new SuperMap3D.SolidModelsProfile(scene));
  let entitie_ids = [];  //剖切
  let drillConeCounts = 0, drillPoints = [];  //钻孔
  let editorBox, geoBox;  //裁剪

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    scene.logarithmicDepthBuffer = true;
    scene.camera.frustum.near = 0.1;
    scene.globe.show = false;
    scene.skyAtmosphere.show = false;
    solidModelsProfile.addModels(state.modelUrls);
    scene.camera.setView({
      destination: new SuperMap3D.Cartesian3(-2167835.4408299956, 4423497.534529096, 4095839.2845661934),
      orientation: {
        heading: 4.029329438295484,
        pitch: -0.23796647219353817,
        roll: 8.994289757424667e-10
      }
    });
  };

  // 操作类型
  const changOperationType = (value) => {
    setState({
      ...state,
      operationType: value
    })
  }
  // 拉伸系数
  const changeStretchHeight = (value) => {
    setState({
      ...state,
      stretchHeight: value
    })
  }
  // 开挖深度
  const changeDigHeight = (value) => {
    setState({
      ...state,
      digHeight: value
    })
  }
  // 钻孔半径
  const changeDrillRadius = (value) => {
    setState({
      ...state,
      drillRadius: value
    })
  }
  // 裁剪
  const changeClipType = (e) => {
    setState({
      ...state,
      clipType: e.target.value
    })
  }
  // 裁剪模式
  const changeDrawClipMode = (value) => {
    setState({
      ...state,
      drawClipMode: value
    })
  }





  // 拉伸剖切
  const drawLine = () => {
    if (!window.handlerPolyline) {
      initHandler("Polyline");
    }
    // window.tooltip.showAt(' <p>点击鼠标左键开始绘制</p><p>鼠标右键结束绘制</p><p>可以绘制多条线段</p>', '350px');
    handlerDrawing("Polyline").then(
      res => {
        addCutLine(res.result.object.positions)
        let handlerPolyline = window.handlerPolyline;
        handlerPolyline.polyline.show = false;
        // window.polylineTransparent.show = false; //半透线隐藏
        handlerPolyline.deactivate();
        // tooltip.setVisible(false);

        let id = 'geologicalbody_cutline-' + new Date().getTime()
        entitie_ids.push(id);
        scene.trackingLayer.add({
          id: id,
          polyline: {
            positions: res.result.object.positions,
            width: 2,
            material: SuperMap3D.Color.fromCssColorString('#51ff00'),
            // clampToGround: true, //线贴地
            // classificationType: SuperMap3D.ClassificationType.S3M_TILE, //线面贴对象
          },
        });
      },
      (err) => {
        console.log(err);
      }
    );
    window.handlerPolyline.activate();

  }
  const addCutLine = (positions) => {
    let pointArray = [];
    if (positions.length < 2) return;
    for (let i = 0; i < positions.length - 1; i++) {
      pointArray.length = 0;
      pointArray.push(positions[i]);
      pointArray.push(positions[i + 1]);
      solidModelsProfile.addProfileGeometry(pointArray);
    }
  }
  const startCut = () => {
    // tooltip.setVisible(false);
    clearHandlerDrawing('Polyline');
    if (entitie_ids.length === 0) {
      // window.tooltip.showAt(' <p>请先绘制剖切的线段</p>', '350px');
      return;
    }
    solidModelsProfile.build();
  }
  const clearCut = () => {
    // tooltip.setVisible(false);
    solidModelsProfile.clearProfile();
    clearHandlerDrawing('Polyline');
    entitie_ids.forEach((id) => { scene.trackingLayer.removeById(id); })
    entitie_ids.length = 0;
  }

  //开挖
  const addProfileGeometry = (positions) => {
    let point3ds = new SuperMap3D.Point3Ds();
    let points = tool.CartesiantoDegreesObjs(positions);
    points.forEach((point) => {
      let point3d = new SuperMap3D.Point3D(point.longitude, point.latitude, point.height + 1000);
      point3ds.add(point3d);
    })
    let geometry = new SuperMap3D.GeoRegion3D([point3ds]);
    if (state.operationType === 'dig') {
      solidModelsProfile.clippingType = SuperMap3D.ClippingType.KeepOutside;
      geometry.extrudedHeight = -Number(state.digHeight);
      //封底
      let geometry2 = new SuperMap3D.GeoRegion3D([point3ds]);
      geometry2.isLatLon = false;
      geometry2.bottomAltitude = geometry.extrudedHeight;
      solidModelsProfile.addProfileGeometry(geometry2);
    } else {
      // solidModelsProfile.clippingType = SuperMap3D.ClippingType.KeepOutside;
      geometry.extrudedHeight = -7000;
    }
    geometry.isLatLon = false;
    solidModelsProfile.setClipGeometry(geometry);
    //封边
    for (let i = 0; i < positions.length; i++) {
      let singleA = [];
      singleA.push(positions[i]);
      if (i == positions.length - 1) {
        singleA.push(positions[0]);
      } else {
        singleA.push(positions[i + 1]);
      }
      solidModelsProfile.addProfileGeometry(singleA);
      solidModelsProfile.build();
    }
  }

  const drawPolygon = () => {
    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }
    handlerDrawing("Polygon", false).then(
      res => {
        let handlerPolygon = window.handlerPolygon;
        addProfileGeometry(res.result.object.positions);
        handlerPolygon.polygon.show = false;
        handlerPolygon.polyline.show = false;
        handlerPolygon.deactivate();
      },
      err => {
        console.log(err);
      }
    );
    window.handlerPolygon.activate();
  };

  const startDig = () => {
    clearDig();
    drawPolygon()
  }

  const clearDig = () => {
    // tooltip.setVisible(false);
    solidModelsProfile.clearProfile();
    clearHandlerDrawing();
  }

  //钻孔
  const startDrilling = () => {
    clearDrilling();
    scene.enableCursorStyle = false;
    scene._element.style.cursor = "";
    document.body.classList.add("measureCur");
    // window.tooltip.showAt(' <p>点击鼠标左键确认钻孔位置</p><p>鼠标右键结束绘制并执行钻孔</p>', '350px');
    scene.eventManager.addEventListener("CLICK", click_point, true);
    scene.eventManager.addEventListener("RIGHT_CLICK", click_right, true);
  };

  const click_point = (e) => {
    let position = scene.pickPosition(e.message.position);
    addDrillCone(position);
    drillPoints.push(position)
  }

  const click_right = (e) => {
    // window.tooltip.setVisible(false);
    document.body.classList.remove("measureCur");
    let points = tool.CartesiantoDegreesObjs(drillPoints);
    points.forEach((point) => {
      let geoCylinder = new SuperMap3D.GeoCylinder(Number(state.drillRadius), Number(state.drillRadius), Number(state.drillHeight));
      let height = Number(state.drillHeight) / 2;
      geoCylinder.geoPosition = new SuperMap3D.Point3D(point.longitude, point.latitude, point.height - height);
      solidModelsProfile.addProfileGeometry(geoCylinder);
    })
    for (let i = 1; i <= drillConeCounts; i++) {
      scene.trackingLayer.removeById('Drill_Point-' + i);
    }
    solidModelsProfile.build();
    scene.eventManager.removeEventListener("CLICK", click_point);
    scene.eventManager.removeEventListener("RIGHT_CLICK", click_right);
  }

  const clearDrilling = () => {
    // tooltip.setVisible(false);
    solidModelsProfile.clearProfile();
    document.body.classList.remove("measureCur");
    for (let i = 1; i <= drillConeCounts; i++) {
      scene.trackingLayer.removeById('Drill_Point-' + i);
    }
    scene.eventManager.removeEventListener("CLICK", click_point);
    scene.eventManager.removeEventListener("RIGHT_CLICK", click_right);
    drillConeCounts = 0;
    drillPoints.length = 0;
  }
  // 绘制转空点
  const addDrillCone = (position) => {
    drillConeCounts++;
    scene.trackingLayer.add({
      id: 'Drill_Point-' + drillConeCounts,
      position: position,
      cylinder: {
        length: 100,
        topRadius: Number(state.drillRadius),
        bottomRadius: Number(state.drillRadius),
        material: SuperMap3D.Color.fromCssColorString("#d60000"),
      }
    });
  }

  //裁剪
  const startClip = () => {
    clearClip();
    solidModelsProfile.clippingType = SuperMap3D.ClippingType[state.drawClipMode];
    if (state.clipType === 'drawClip') {
      drawPolygon()
      return;
    }
    BoxClipByEitor()
  }

  const clearClip = () => {
    clearDig();
    clearHandlerDrawing('Box');
    if (editorBox) {
      editorBox.deactivate();
      editorBox.destroy()
      editorBox = null;
    }
  }

  //box裁剪

  const BoxClipByEitor = () => {
    if (editorBox) {
      editorBox.deactivate();
    }
    // tooltip.showAt(' <p>点击鼠标左键开始绘制box底面</p><p>然后移动鼠标绘制box高度</p><p>点击鼠标右键结束绘制</p>', '350px');
    if (!window.handlerBox) {
      initHandler("Box");
    }
    handlerDrawing("Box", false).then(
      res => {
        let handlerBox = window.handlerBox;
        updateClipBox(res.result.object);
        handlerBox.deactivate();
      },
      err => {
        console.log(err);
      }
    );
    window.handlerBox.activate();
  };

  const updateClipBox = (object) => {
    object.show = false;
    //绘制的盒子裁剪模型
    let newDim = object.box.dimensions.getValue();
    let position = SuperMap3D.Cartographic.fromCartesian(object.position.getValue(0));
    geoBox = new SuperMap3D.GeoBox(newDim.x, newDim.y, newDim.z);
    geoBox.geoPosition = new SuperMap3D.Point3D(SuperMap3D.Math.toDegrees(position.longitude),
      SuperMap3D.Math.toDegrees(position.latitude), position.height);
    solidModelsProfile.addProfileGeometry(geoBox);
    solidModelsProfile.build();
    // 编辑盒子
    if (!editorBox) {
      editorBox = new SuperMap3D.BoxEditor(scene, object);
      editorBox.color = SuperMap3D.Color.WHITE.withAlpha(0.0);//设置盒子透明
      editorBox.hoverColor = SuperMap3D.Color.BLUE;//设置编辑轴的选中色
      let editBoxEvt = (e) => {
        let newDim = e.dimensions;
        geoBox.geoWidth = newDim.y;
        geoBox.geoHeight = newDim.z;
        geoBox.geoLength = newDim.x;
        let position = tool.CartesiantoDegrees(e.position);
        geoBox.geoPosition = new SuperMap3D.Point3D(position[0], position[1], position[2]);
        geoBox.geoRotationZ = editorBox.hpr.heading * (180 / SuperMap3D.Math.PI);
      };
      editorBox.editEvt.addEventListener(editBoxEvt);
    } else {
      editorBox.setEditObject(object) //
    }
    editorBox.activate();
  }


  //叠加体元



  const clearAll = () => {
    clearCut();
    clearClip();
    clearDrilling()
  }

  // 监听
  // watch(() => state.modelUrls, val => {
  //   solidModelsProfile.addModels(val);
  // });
  // watch(() => state.stretchHeight, val => {
  //   if (!state.modelUrls || state.modelUrls.length == 0) return;
  //   for (let model of state.modelUrls) {
  //     let url = model.model;
  //     let instance = solidModelsProfile._s3mInstanceCollection._group[url].instances._array[0];
  //     instance.updateScale(new SuperMap3D.Cartesian3(1, 1, Number(val)));
  //   }
  // });
  // watch(() => state.operationType, val => {
  //   clearAll();
  // });
  // watch(() => state.drawClipMode, val => {
  //   solidModelsProfile.clippingType = SuperMap3D.ClippingType[val];
  // });
  // watch(() => state.clipType, val => {
  //   clearClip()
  // });
  // 销毁
  // onBeforeUnmount(() => {
  //   solidModelsProfile.clear()
  //   scene.globe.show = true;
  //   scene.skyAtmosphere.show = true;
  //   clearAll();
  //   scene = null;
  //   solidModelsProfile = null;
  //   geoBox = null;
  // });



  return (
    <Draggable handle='.sm-drag-handler'>
      <div className="sm-panel">
        <div className='sm-drag-handler'></div>
        <div className="sm-global-row">
          <span>操作类型</span>
          <Select defaultValue={state.operationType}
            className="sm-global-select"
            onChange={changOperationType}
          >
            <Option value="stretch_cut">拉伸与剖切</Option>
            <Option value="dig">开挖</Option>
            <Option value="drilling">转孔</Option>
            <Option value="clip">裁剪</Option>
          </Select>
        </div>
        {/* <!-- 拉伸与剖切 --> */}
        {
          state.operationType === 'stretch_cut' ? (<div>
            <div className="sm-global-row">
              <span>拉伸系数</span>
              <InputNumber
                value={state.stretchHeight}
                min={1}
                className="sm-global-input-number"
                onChange={changeStretchHeight}
              />
            </div>
            <div className="sm-global-button">
              <Button size="small" onClick={drawLine}>画线</Button>
              <Button size="small" onClick={startCut} style={{ marginRight: '10px' }}>剖切</Button>
              <Button size="small" onClick={clearCut}>清除</Button>
            </div>
          </div>) : ('')
        }
        {/* <!-- 开挖 --> */}
        {
          state.operationType === 'dig' ? (<div >
            <div className="sm-global-row">
              <span>开挖深度</span>
              <InputNumber
                value={state.digHeight}
                min={1}
                className="sm-global-input-number"
                onChange={changeDigHeight}
              />
            </div>
            <div className="sm-global-button">
              <Button size="small" onClick={startDig}>开挖</Button>
              <Button size="small" onClick={clearDig}>清除</Button>
            </div>
          </div>) : ('')
        }
        {/* <!-- 钻孔 --> */}
        {
          state.operationType === 'drilling' ? (<div >
            <div className="sm-global-row">
              <span>钻孔半径</span>
              <InputNumber
                value={state.drillRadius}
                min={1}
                className="sm-global-input-number"
                onChange={changeDrillRadius}
              />
            </div>
            <div className="sm-global-row">
              <span>钻孔深度</span>
              <InputNumber
                value={state.drillHeight}
                min={1}
                className="sm-global-input-number"
              />
            </div>
            <div className="sm-global-button">
              <Button size="small" onClick={startDrilling}>钻孔</Button>
              <Button size="small" onClick={clearDrilling}>清除</Button>
            </div>
          </div>) : ('')
        }
        {/* <!-- 裁剪 --> */}
        {
          state.operationType === 'clip' ? (<div>
            {/* <Radio.Group value={state.clipType} name="radioGroup" onChange={changeClipType}>
              <Radio value="drawClip">绘制裁剪</Radio>
              <Radio value="boxClip">Box裁剪</Radio>
            </Radio.Group> */}
            <div className="sm-global-row">
              <span>裁剪模式</span>
              <Select value={state.drawClipMode} onChange={changeDrawClipMode}>
                <Option value="KeepInside">裁剪外部</Option>
                <Option value="KeepOutside">裁剪内部</Option>
              </Select>
            </div>
            <div className="sm-global-button">
              <Button size="small" onClick={startClip} >裁剪</Button>
              <Button size="small" onClick={clearClip}>清除</Button>
            </div>
          </div>) : ('')
        }
      </div>
    </Draggable>

  )

}
export default Sm3dGeologicalBody