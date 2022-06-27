import Draggable from 'react-draggable';
import { Slider, Button } from 'antd';
import React, { useEffect, useState } from 'react'
import tool from '../../../js/tool/tool.js'        //提示等工具
import '../../../css/global.scss'
import './sight-line.scss'
function Sm3dSightline() {
  // 设置默认值数据
  const [state, setState] = useState({
    viewPosition: null,
    visibleColor: "#00C800",
    hiddenColor: "#C80000",
    barrierColor: "#FFBA01",
    highlightBarrier: false,
    lineWidth: 3,
    showBarrierPoints: true
  });
  // 
  const [sightline, setSightLine] = useState({})

  // 初始化数据
  let timer, tipFlag = true, clickFlag = false, ObjectIds = [];
  let point_index = 0, sightTargetPoints = [], sightBarrierPoints = [], sightBarrierPointsColor = [];
  let viewPointPosition;
  const init = () => {
    let sightlineTem;
    sightlineTem = new SuperMap3D.Sightline(scene);
    sightlineTem.visibleColor = SuperMap3D.Color.fromCssColorString(
      state.visibleColor
    );
    sightlineTem.hiddenColor = SuperMap3D.Color.fromCssColorString(state.hiddenColor);
    sightlineTem.lineWidth = state.lineWidth;
    setSightLine(sightlineTem)
  };

  //viewer 初始化完成的监听
  // useSelector(state => {
  //   if (state?.isViewer) {
  //     console.log('初始化 init');
  //     init()
  //   }
  // })
  useEffect(() => {
    init()
  }, [])


  /*
   ***分析模块***
  */

  //分析
  const analysis = () => {
    scene.enableCursorStyle = false;
    scene._element.style.cursor = "";
    document.body.classList.add("measureCur");
    //鼠标左键事件监听
    scene.eventManager.addEventListener("CLICK", LEFT_CLICK, true);
    scene.eventManager.addEventListener("MOUSE_MOVE", MOUSE_MOVE);
    scene.eventManager.addEventListener("RIGHT_CLICK", RIGHT_CLICK, true);
  };

  //   点击左键确认观察者点和目标点
  const LEFT_CLICK = (e) => {
    clickFlag = true;
    clearTimeout(timer);
    timer = setTimeout(() => { clickFlag = false }, 20);  //添加点时延迟移动添加目标点
    let position = scene.pickPosition(e.message.position);
    let p = tool.CartesiantoDegrees(position) // 将获取的点的位置转化成经纬度
    if (p[2] < 0) {
      p[2] = 0;
      position = SuperMap3D.Cartesian3.fromDegrees(p[0], p[1], p[2])
    }
    if (state.viewPosition) {
      sightline.addTargetPoint({
        position: p,
        name: "sightPoint_Target" + point_index,
      });
      sightTargetPoints.push(position);
      point_index += 1;
      // 添加障碍点
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          sightline.getBarrierPoint(('sightPoint_Target' + point_index), (obj) => {
            addSightPoint_Target(point_index);  //添加目标点 
            if (obj && obj.position) {
              obj.position.height += 2;
              let position = SuperMap3D.Cartographic.toCartesian(obj.position);
              sightBarrierPoints.push(position);  //记录障碍点信息
              // 记录障碍物id
              let ObjectId = sightline.getObjectIds();
              if (!ObjectId) {
                return;
              }
              ObjectIds.push(ObjectId);
              sightBarrierPointsColor.push(state.hiddenColor);

            } else {
              sightBarrierPoints.push({ x: 6378137, y: 0, z: 0 });
              sightBarrierPointsColor.push(state.visibleColor);
            }
            addBarrierCone(point_index);  //添加障碍点

          })
        })
      })
    } else {
      sightline.viewPosition = p;
      // 观察者信息记录
      state.viewPosition = p;
      sightline.build();
      addSightPoint_view();
      viewPointPosition = position;
    }
  };

  // 添加观察点
  const addSightPoint_view = () => {
    scene.trackingLayer.add(({
      id: 'sightPoint_view',
      point: new SuperMap3D.PointGraphics({
        color: SuperMap3D.Color.fromCssColorString(state.barrierColor),
        pixelSize: 10
      }),
      position: new SuperMap3D.CallbackProperty(() => {
        return viewPointPosition;
      }, false),
    }));
  }

  const addSightPoint_Target = (i) => {
    scene.trackingLayer.add(({
      id: 'sightPoint_Target' + i,
      point: new SuperMap3D.PointGraphics({
        // color: SuperMap3D.Color.fromCssColorString(state.barrierColor),
        color: new SuperMap3D.CallbackProperty(() => {
          return SuperMap3D.Color.fromCssColorString(sightBarrierPointsColor[i]);
        }, false),
        pixelSize: 10
      }),
      position: new SuperMap3D.CallbackProperty(() => {
        return (sightTargetPoints[i]);
      }, false),
    }));
  }
  // 绘制障碍点圆锥
  let barrierCones = [];
  const addBarrierCone = (i) => {
    let ab = scene.trackingLayer.add({
      name: 'Point_Barrier' + i,
      position: new SuperMap3D.CallbackProperty(() => {
        return (sightBarrierPoints[i]);
      }, false),
      // orientation: SuperMap3D.Transforms.headingPitchRollQuaternion(sightBarrierPoints[i], new SuperMap3D.HeadingPitchRoll(0, 0, Math.PI)),
      cylinder: {
        length: 3,
        topRadius: 2,
        bottomRadius: 0,
        material: SuperMap3D.Color.fromCssColorString("#d60000")
      }
    });
    barrierCones.push(ab)
  }

  // 鼠标移动实时分析
  const MOUSE_MOVE = (e) => {
    if (!state.viewPosition || clickFlag) return;
    //获取鼠标屏幕坐标,并将其转化成笛卡尔坐标
    let endPosition = scene.pickPosition(e.message.endPosition);
    let p = tool.CartesiantoDegrees(endPosition) // 将获取的点的位置转化成经纬度
    sightline.addTargetPoint({
      position: p,
      name: "point",
    });
  }

  // //鼠标右键确认分析距离和方向，不再执行鼠标移动事件中对可视域的操作
  const RIGHT_CLICK = () => {
    document.body.classList.remove("measureCur");
    if (state.highlightBarrier) {
      getHighlightBarriers()
    }
    sightline.removeTargetPoint('point');
    sightline.build()
    scene.eventManager.removeEventListener("CLICK", LEFT_CLICK); //移除鼠标点击事件监听
    scene.eventManager.removeEventListener("MOUSE_MOVE", MOUSE_MOVE); //移除鼠标点击事件监听
    scene.eventManager.removeEventListener("RIGHT_CLICK", RIGHT_CLICK); //移除鼠标点击事件监听
  };

  // 获取障碍物
  const getHighlightBarriers = (barrierColor) => {
    let color = SuperMap3D.defaultValue(barrierColor, SuperMap3D.Color.fromCssColorString(state.barrierColor));
    try {
      if (ObjectIds.length === 0) return;
      ObjectIds.forEach((ObjectId) => {
        for (let index in ObjectId) {
          let layer = scene.layers.findByIndex(Number(index) - 3); // 底层索引从3开始
          let ids = ObjectId[index];
          layer.setObjsColor(ids, color);
        }
      })

    } catch (error) {
      console.log(error)
    }
  }
  // 清除
  const clear = () => {
    sightline.removeAllTargetPoint();
    for (let layer of scene.layers.layerQueue) {
      layer.removeAllObjsColor();
    }
    point_index = 0;
    ObjectIds.length = 0;
    sightTargetPoints.length = 0;
    sightBarrierPoints.length = 0;
    sightBarrierPointsColor.length = 0;
    scene.trackingLayer.removeAll();
    document.body.classList.remove("measureCur");
    state.viewPosition = null;
    barrierCones.length = 0;
    scene.eventManager.removeEventListener("CLICK", LEFT_CLICK); //移除鼠标点击事件监听
    scene.eventManager.removeEventListener("MOUSE_MOVE", MOUSE_MOVE); //移除鼠标点击事件监听
    scene.eventManager.removeEventListener("RIGHT_CLICK", RIGHT_CLICK); //移除鼠标点击事件监听
  };

  // 监听
  // 修改线宽度
  const onLineWidthChange = (value) => {
    setState({
      ...state,
      lineWidth: value
    })
    sightline.lineWidth = value
  }
  // 修改可视区颜色
  const onVisibleColorChange = (e) => {
    setState({
      ...state,
      visibleColor: e.target.value
    })
    sightline.visibleColor = SuperMap3D.Color.fromCssColorString(e.target.value);
  }
  // 修改不可视颜色
  const onHiddenColor = (e) => {
    setState({
      ...state,
      hiddenColor: e.target.value
    })
    sightline.hiddenColor = SuperMap3D.Color.fromCssColorString(e.target.value);
  }

  return (
    <Draggable handle='.sm-drag-handler'>
      <div className="sm-panel" style={{ width: '270px' }}>
        <div className='sm-drag-handler'></div>
        <div className="sm-global-row">
          <span className="sm-title">线宽度</span>
          <Slider className="sm-global-slider" min={1}
            max={10} step={1}
            value={state.lineWidth}
            onChange={onLineWidthChange}
          />
        </div>
        <div className="sm-global-row">
          <span>可视区颜色</span>
          <input className="sm-global-color" type="color" value={state.visibleColor}
            onChange={onVisibleColorChange} />
        </div>
        <div className="sm-global-row">
          <span>不可视颜色</span>
          <input className="sm-global-color" type="color" value={state.hiddenColor}
            onChange={onHiddenColor}
          />
        </div>
        <div className="sm-global-button">
          <Button size="small" onClick={analysis}>分析</Button>
          <Button size="small" onClick={clear}>清除</Button>
        </div>
      </div>
    </Draggable>
  )


}
export default Sm3dSightline