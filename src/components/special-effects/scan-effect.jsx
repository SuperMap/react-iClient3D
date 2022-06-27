import Draggable from 'react-draggable';
import React, { useEffect, useState } from 'react'
import { InputNumber, Select, Slider, Radio, Button, Checkbox } from 'antd';
import { initHandler, handlerDrawing, clearHandlerDrawing } from "../../js/common/drawHandler.js"    //公共handler.js
import './scan-effect.scss'
const { Option } = Select;
function Sm3dScanEffect() {
  const [state, setState] = useState({
    scanMode: "lineMode",
    scanColor: "#0F7AF4",
    scanTextures: [],
    selectedTextureIndex: 0,
    bloomShow: false,  //开启反光
    openHDR: false,  //开启HDR
    threshold: 0.01,  //亮度阈值
    intensity: 0.5,  //泛光强度
    lineWidth: 100,  //获取或设置线状扫描线的宽度，单位：米。
    period: 3.0,  //获取或设置扫描线的运行周期，单位：秒。
    speed: 100,  //获取或设置扫描线的运行速度，单位：米/秒。
    addTextures: null, //[{name:纹理1,type:'line / ring',url:xxx}]
    scanShow: false,
  })

  // 初始化数据
  const [lineScanTextures, setLineScanTextures] = useState([
    {
      name: '无纹理',
      type: 'line',
      url: ''
    },
    {
      name: '线状纹理1',
      type: 'line',
      // url: require('../../assets/images/particleSystem/line-1.jpg')
      url: require('../../assets/images/particleSystem/line-1.jpg')
    },
    {
      name: '线状纹理2',
      type: 'line',
      url: require('../../assets/images/particleSystem/line-2.jpg')
    },
  ])
  const [circleScanTextures, setCircleScanTextures] = useState([
    {
      name: '无纹理',
      type: 'ring',
      url: ''
    },
    {
      name: '环状纹理1',
      type: 'ring',
      url: require('../../assets/images/particleSystem/ring-1.jpg')
    },
    {
      name: '环状纹理2',
      type: 'ring',
      url: require('../../assets/images/particleSystem/ring-2.jpg')
    },
    {
      name: '环状六边形纹理',
      type: 'ring',
      url: require('../../assets/images/particleSystem/ring-3.jpg')
    },
  ])

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    scene.scanEffect.color = SuperMap3D.Color.fromCssColorString(state.scanColor);
    scene.scanEffect.textureUrl = '';
    scene.scanEffect.lineWidth = Number(state.lineWidth);
    scene.scanEffect.period = Number(state.period);
    scene.scanEffect.speed = Number(state.speed);
    scene.scanEffect.centerPostion = new SuperMap3D.Cartesian3.fromDegrees(0, 0, 0);
  };

  // 扫描模式
  const changeScanMode = (e) => {
    setState({
      ...state,
      scanMode: e.target.value,
    })
  }
  useEffect(() => {
    setState({
      ...state,
      scanTextures: state.scanMode === 'lineMode' ? lineScanTextures : circleScanTextures
    })
  }, [state.scanMode])
  // 扫描纹理
  const changeSelectedTextureIndex = (value) => {
    setState({
      ...state,
      selectedTextureIndex: value
    })
  }

  const drawPolyline = () => {
    if (!window.handlerPolyline) {
      initHandler("Polyline");
    }
    handlerDrawing("Polyline").then(
      res => {
        addLineScans(res.result.object.positions)
        let handlerPolyline = window.handlerPolyline;
        handlerPolyline.polyline.show = false;
        window.polylineTransparent.show = false; //半透线隐藏
        handlerPolyline.deactivate();
      },
      (err) => {
        console.log(err);
      }
    );
    window.handlerPolyline.activate();
  }

  const addLineScans = (positions) => {
    let dir = new SuperMap3D.Cartesian3();
    SuperMap3D.Cartesian3.subtract(positions[1], positions[0], dir); // 获取扫描方向向量
    if (state.scanShow) {
      scene.scanEffect.add(positions[0]);
      scene.scanEffect.lineMoveDirection = dir;
      return;
    }
    scene.scanEffect.centerPostion = positions[0];
    scene.scanEffect.lineMoveDirection = dir;
    state.scanShow = true;
  }

  const addCircleScans = (e) => {
    scene.eventManager.removeEventListener("CLICK", addCircleScans);
    scene.enableCursorStyle = true;
    document.body.classList.remove("measureCur");
    let centerPosition = scene.pickPosition(e.message.position);
    if (state.scanShow) {
      scene.scanEffect.add(centerPosition);
      return;
    }
    scene.scanEffect.centerPostion = centerPosition;
    state.scanShow = true;
  }



  const addScans = () => {
    if (state.scanMode === 'lineMode') {
      drawPolyline();
      return
    }
    scene.enableCursorStyle = false;
    scene._element.style.cursor = "";
    document.body.classList.add("measureCur");
    scene.eventManager.addEventListener("CLICK", addCircleScans, true);
  }


  const clear = () => {
    state.scanShow = false;
    let index = scene.scanEffect.count;
    for (let i = 0; i < index; i++) {
      scene.scanEffect.remove(i);
    }
    scene.eventManager.removeEventListener("CLICK", addCircleScans);
    clearHandlerDrawing('Polyline');
  }

  // 监听
  // watch(() => state.scanShow, val => {
  //   scene.scanEffect.show = val;
  // });
  useEffect(() => {
    scene.scanEffect.show = state.scanShow
  }, [state.scanShow])
  // watch(() => state.scanMode, val => {
  //   if (val === "lineMode") {
  //     scene.scanEffect.mode = SuperMap3D.ScanEffectMode.LINE;
  //     state.scanTextures = lineScanTextures;
  //     return
  //   }
  //   scene.scanEffect.mode = SuperMap3D.ScanEffectMode.CIRCLE;
  //   state.scanTextures = circleScanTextures;
  // });
  useEffect(() => {
    if (state.scanMode === "lineMode") {
      scene.scanEffect.mode = SuperMap3D.ScanEffectMode.LINE;
      setState({
        ...state,
        scanTextures: lineScanTextures
      })
      return
    }
    scene.scanEffect.mode = SuperMap3D.ScanEffectMode.CIRCLE;
    setState({
      ...state,
      scanTextures: circleScanTextures
    })
  }, [state.scanMode])


  return (
    <Draggable handle='.sm-drag-handler'>
      <div className="sm-panel" style={{ width: '300px' }}>
        <div className='sm-drag-handler'></div>
        <div className="sm-global-row">
          <span>扫描模式</span>
          <Radio.Group value={state.scanMode} name="radioGroup" onChange={changeScanMode}>
            <Radio value="lineMode">线状扫描</Radio>
            <Radio value="ringMode">环状扫描</Radio>
          </Radio.Group>
        </div>
        <div className="sm-global-row">
          <span>扫描纹理</span>
          <Select
            value={state.selectedTextureIndex}
            style={{ width: '190px' }}
            onChange={changeSelectedTextureIndex}>
            {
              state.scanTextures.map((item, index) => {
                return (
                  <Option value={index} key={index}>
                    {item.name}
                  </Option>
                )
              })
            }
          </Select>
        </div>
        <div className="sm-global-button">
          <Button size="small" onClick={addScans}>添加</Button>
          <Button size="small" onClick={clear}>清除</Button>
        </div>
      </div >
    </Draggable>

  )

}
export default Sm3dScanEffect