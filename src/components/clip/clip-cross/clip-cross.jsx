// 拖拽 
import Draggable from 'react-draggable';
import React, { useEffect, useState } from 'react'
import { InputNumber, Select, Slider, Radio, Button } from 'antd';
const { Option } = Select;
function Sm3dClipCross() {
  // 设置默认值数据
  const [state, setState] = useState({
    clipWidth: 5,
    clipHeight: 5,
    heading: 0,
    pitch: 0,
    roll: 0,
    extrude: 1,
  });


  // 初始化数据
  let layers;
  // let screenSpaceEventHandler;
  const [screenSpaceEventHandler] = useState(new SuperMap3D.ScreenSpaceEventHandler(
    scene.canvas
  ));
  const [box, setBox] = useState()
  let startClip, //裁剪标志
    boxPosition, dim,  //entity
    position;  //裁剪区域

  // if (storeState.isViewer) {
  //   layers = scene.layers && scene.layers.layerQueue;
  // }
  //viewer 初始化完成的监听
  // watch(() => storeState.isViewer, val => {
  //   if (val) {
  //     screenSpaceEventHandler = new SuperMap3D.ScreenSpaceEventHandler(
  //       scene.canvas
  //     );
  //     layers = scene.layers && scene.layers.layerQueue;
  //   }
  // })

  useEffect(() => {
    layers = scene.layers && scene.layers.layerQueue;
    console.log('useEffect的layers', layers);
  }, [layers])
  // 裁剪宽度
  const changeClipWidth = (value) => {
    setState({
      ...state,
      clipWidth: value
    })
  }
  // 裁剪高度
  const changeClipHeight = (value) => {
    setState({
      ...state,
      clipHeight: value
    })
  }
  // 绕X轴旋转
  const changePitch = (value) => {
    setState({
      ...state,
      pitch: value
    })
  }
  /** 
   * @description: 绕Y轴旋转
   * @return {*}
   */
  // 
  const changeRoll = (value) => {
    setState({
      ...state,
      roll: value
    })
  }

  /**
   * 绕Z轴旋转
   * @description: 
   * @param {*} value
   * @return {*}
   */
  const changeHeading = (value) => {
    setState({
      ...state,
      heading: value
    })
  }
  // 拉伸高度
  const changeExtrude = (value) => {
    setState({
      ...state,
      extrude: value
    })
  }

  /*
   ***cross分析模块***
  */

  // 分析
  const startCross = async (e) => {
    e.preventDefault();
    if (!scene) {
      return;
    }
    if (box) {
      clearCross()
    }
    await start();
    startClip = true;
    box.show = true;
  };
  const start = () => {
    for (let layer of layers) {
      layer.selectEnabled = false;
    }
    // 添加盒子
    boxPosition = SuperMap3D.Cartesian3.fromDegrees(0, 0, 0);
    dim = new SuperMap3D.Cartesian3(
      state.clipWidth,
      state.clipHeight,
      0.1
    );
    let boxTem = null;
    boxTem = scene.trackingLayer.add({
      // 标识盒
      id: "cross-clip-identify-box",
      position: boxPosition,
      show: false,
      box: {
        dimensions: dim,
        fill: false,
        outline: true,
        outlineColor: SuperMap3D.Color.AQUA,
        outlineWidth: 5.0
      }
    });
    let hpr;
    screenSpaceEventHandler.setInputAction(movement => {
      if (startClip) {
        boxPosition = scene.pickPosition(movement.endPosition);

        if (!boxPosition) {
          return;
        }
        boxTem.position = boxPosition;
        if (!hpr) {
          hpr = new SuperMap3D.HeadingPitchRoll(
            SuperMap3D.Math.toRadians(state.heading),
            SuperMap3D.Math.toRadians(state.pitch),
            SuperMap3D.Math.toRadians(state.roll)
          )
        }
        let orientation = SuperMap3D.Transforms.headingPitchRollQuaternion(
          boxPosition,
          hpr
        );
        boxTem.orientation = orientation;

      }
    }, SuperMap3D.ScreenSpaceEventType.MOUSE_MOVE);

    screenSpaceEventHandler.setInputAction(evt => {
      if (startClip) {
        position = scene.pickPosition(evt.position);
        if (!position) {
          return;
        }
        updateClip();
        startClip = false;
        boxTem.show = false;
      }
      screenSpaceEventHandler.removeInputAction(
        SuperMap3D.ScreenSpaceEventType.MOUSE_MOVE
      );
      screenSpaceEventHandler.removeInputAction(
        SuperMap3D.ScreenSpaceEventType.LEFT_CLICK
      );
      hpr = null;
    }, SuperMap3D.ScreenSpaceEventType.LEFT_CLICK);
    console.log('start中的', boxTem);
    setBox(boxTem)
  };
  // 更新
  const updateClip = () => {
    for (let layer of layers) {
      layer.setCustomClipCross({
        position: position,
        dimensions: dim,
        heading: state.heading,
        pitch: state.pitch,
        roll: state.roll,
        extrudeDistance: Number(state.extrude)
      });
    }
  };

  // 清除
  const clearCross = () => {
    box && scene.trackingLayer.removeById("cross-clip-identify-box");
    for (let layer of layers) {
      layer.clearCustomClipBox();
    }
    startClip = false;
    box = undefined;
    screenSpaceEventHandler.removeInputAction(
      SuperMap3D.ScreenSpaceEventType.MOUSE_MOVE
    );
    screenSpaceEventHandler.removeInputAction(
      SuperMap3D.ScreenSpaceEventType.LEFT_CLICK
    );
  };

  // 监听
  // watch(() => state.clipWidth, val => {
  //   let temp_width = Number(val);
  //   if (temp_width <= 0 || !box) {
  //     return;
  //   }
  //   box.box.dimensions = new SuperMap3D.Cartesian3(
  //     state.clipWidth,
  //     state.clipHeight,
  //     0.1
  //   );
  //   dim = new SuperMap3D.Cartesian3(temp_width, state.clipHeight, state.extrude);
  //   updateClip();
  // });
  useEffect(() => {
    let temp_width = Number(state.clipWidth);
    if (temp_width <= 0 || !box) {
      return;
    }
    box.box.dimensions = new SuperMap3D.Cartesian3(
      state.clipWidth,
      state.clipHeight,
      0.1
    );
    dim = new SuperMap3D.Cartesian3(temp_width, state.clipHeight, state.extrude);
    updateClip();
  }, [state.clipWidth])
  // watch(() => state.clipHeight, val => {
  //   let temp_height = Number(val);
  //   if (temp_height <= 0 || !box) {
  //     return;
  //   }
  //   box.box.dimensions = new SuperMap3D.Cartesian3(
  //     state.clipWidth,
  //     state.clipHeight,
  //     0.1
  //   );
  //   dim = new SuperMap3D.Cartesian3(state.clipWidth, temp_height, state.extrude);
  //   updateClip();
  // });
  // watch(() => state.pitch, val => {
  //   if (val === "" || !box) {
  //     return;
  //   }
  //   let pitch = Number(val);
  //   let hpr = new SuperMap3D.HeadingPitchRoll(
  //     SuperMap3D.Math.toRadians(state.heading),
  //     SuperMap3D.Math.toRadians(pitch),
  //     SuperMap3D.Math.toRadians(state.roll)
  //   );
  //   let orientation = SuperMap3D.Transforms.headingPitchRollQuaternion(
  //     boxPosition,
  //     hpr
  //   );
  //   box.orientation = orientation;
  //   updateClip();
  // });
  // watch(() => state.roll, val => {
  //   if (val === "" || !box) {
  //     return;
  //   }
  //   let roll = Number(val);
  //   let hpr = new SuperMap3D.HeadingPitchRoll(
  //     SuperMap3D.Math.toRadians(state.heading),
  //     SuperMap3D.Math.toRadians(state.pitch),
  //     SuperMap3D.Math.toRadians(roll)
  //   );
  //   let orientation = SuperMap3D.Transforms.headingPitchRollQuaternion(
  //     boxPosition,
  //     hpr
  //   );
  //   box.orientation = orientation;
  //   updateClip();
  // });
  // watch(() => state.heading, val => {
  //   if (val === "" || !box) {
  //     return;
  //   }
  //   let heading = Number(val);
  //   let hpr = new SuperMap3D.HeadingPitchRoll(
  //     SuperMap3D.Math.toRadians(heading),
  //     SuperMap3D.Math.toRadians(state.pitch),
  //     SuperMap3D.Math.toRadians(state.roll)
  //   );
  //   let orientation = SuperMap3D.Transforms.headingPitchRollQuaternion(
  //     boxPosition,
  //     hpr
  //   );
  //   box.orientation = orientation;
  //   updateClip();
  // });
  // watch(() => state.extrude, val => {
  //   let temp_extrudeDistance = Number(val);
  //   if (temp_extrudeDistance <= 0 || !box) {
  //     return;
  //   }
  //   updateClip();
  // });

  // 销毁
  // onBeforeUnmount(() => {
  //   screenSpaceEventHandler.destroy();
  //   layers = undefined;
  //   box = undefined;
  //   screenSpaceEventHandler = undefined;
  //   dim = undefined;
  // })


  return (
    <Draggable handle='.sm-drag-handler'>
      <div className="sm-panel" style={{ width: '250px' }}>
        <div className='sm-drag-handler'></div>
        <div className="sm-global-row">
          <span>裁剪宽度</span>
          <div className="sm-cc-slider-input">
            <Slider
              className="sm-cc-slider"
              value={state.clipWidth}
              min={1}
              step={1}
              onChange={changeClipWidth}
            />
            <InputNumber value={state.clipWidth} min={1}
              onChange={changeClipWidth}
            />
          </div>
        </div>
        <div className="sm-global-row">
          <span>裁剪高度</span>
          <div className="sm-cc-slider-input">
            <Slider className="sm-cc-slider" value={state.clipHeight} min={1}
              onChange={changeClipHeight}
            />
            <InputNumber value={state.clipHeight} min={1}
              onChange={changeClipHeight}
            />
          </div>
        </div>
        <div className="sm-global-row">
          <span>绕X轴旋转</span>
          <div className="sm-cc-slider-input">
            <Slider className="sm-cc-slider" value={state.pitch} min={1} step={1} max={360}
              onChange={changePitch}
            />
            <InputNumber value={state.pitch} min={0} max={360}
              onChange={changePitch}
            />
          </div>
        </div>
        <div className="sm-global-row">
          <span>绕Y轴旋转</span>
          <div className="sm-cc-slider-input">
            <Slider
              className="sm-cc-slider"
              value={state.roll}
              min={0}
              step={1}
              max={360} onChange={changeRoll}
            />
            <InputNumber value={state.roll} min={0} max={360} onChange={changeRoll} />
          </div>
        </div>
        <div className="sm-global-row">
          <span>绕Z轴旋转</span>
          <div className="sm-cc-slider-input">
            <Slider
              className="sm-cc-slider"
              value={state.heading}
              min={0}
              step={1}
              max={360} onChange={changeHeading}
            />
            <InputNumber value={state.heading} min={0} max={360} onChange={changeHeading} />
          </div>
        </div>
        <div className="sm-global-row">
          <span>拉伸高度</span>
          <div className="sm-cc-slider-input">
            <Slider className="sm-cc-slider" value={state.extrude} min={1} step={1} onChange={changeExtrude} />
            <InputNumber value={state.extrude} min={1} onChange={changeExtrude} />
          </div>
        </div>
        <div className="sm-global-button">
          <Button size="small" onClick={startCross}>裁剪</Button>
          <Button size="small" onClick={clearCross}>清除</Button>
        </div>
      </div>
    </Draggable>
  )

}
export default Sm3dClipCross