import React, { useEffect, useState } from 'react'
import { InputNumber, Select, Slider, Radio, Button, Checkbox } from 'antd';
const { Option } = Select;
function Sm3dDrawLinePolygon() {
  // 设置默认值数据
  const [state, setState] = useState({
    drawModle: "space",  //绘制模式
    currentId: "1",  //当前选中线id
    config: config,  //线类型配置  
    lineColor: "#FAC441",  //设置线颜色
    lineWidth: 5,  //设置选中线宽
    dottedColor: "#FAC441",  //间隔颜色
    dottedLength: 30,
    outLineColor: "#1DCEC8",
    outLineWidth: 2,
    glowStrength: 0.5,
    trailPercentage: 0.3,
    trailPeroid: 2,
    isEdit: true,
    isEditZ: false,
    //面
    drawType: 'polyline',
    solidColor: "#FAC441",
    gridColor: "#FAC441",
    gridWidth: 1,
    gridCount: 8,
    gridCellAlpha: 0.1,
    stripeEvenColor: "#FFFFFF",
    stripeOddColor: "#000000",
    stripeRepeat: 12,
    stripeOffset: 0,
    stripeOrientation: "horizontal",
  })

  // 传入props改变默认值
  // if (props) {
  //   for (let key in props) {
  //     if (state.hasOwnProperty(key)) {
  //       if (props[key] != undefined)
  //         state[key] = props[key]
  //     } else {
  //       tool.Message.errorMsg(resource.AttributeError + key);
  //     }
  //   }
  // }

  // 初始化数据
  let clampToGround = undefined, classificationType = undefined;
  let perPositionHeight = true, clampToS3M = undefined, classificationType_gon = SuperMap3D.ClassificationType.TERRAIN;
  let selected_line = undefined;
  let selected_gon = undefined;
  let setHeight = undefined;


  if (storeState.isViewer) {
    if (!window.tooltip) {
      window.tooltip = createTooltip(scene._element);
    }
    scene.eventManager.addEventListener("CLICK", LEFT_CLICK_Listener, false);
    Edit(); //编辑功能
  }
  //viewer 初始化完成的监听
  watch(() => storeState.isViewer, val => {
    if (val) {
      if (!window.tooltip) {
        window.tooltip = createTooltip(scene._element);
      }
      scene.eventManager.addEventListener("CLICK", LEFT_CLICK_Listener, false);
      Edit(); //编辑功能
    }
  });




  const changeSelect = (id) => {
    state.currentId = id;
  }

  const drawPolyline = () => {
    if (!window.handlerPolyline) {
      initHandler("Polyline");
    }
    window.tooltip.showAt(' <p>点击鼠标左键开始绘制</p><p>右键单击结束分析</p><p>选中对象进行编辑或清除</p>', '50%');
    handlerDrawing("Polyline").then(
      res => {
        creat_entity_line(res.result.object.positions)
        let handlerPolyline = window.handlerPolyline;
        handlerPolyline.polyline.show = false;
        window.polylineTransparent.show = false; //半透线隐藏
        handlerPolyline.deactivate();
        tooltip.setVisible(false);
      },
      (err) => {
        console.log(err);
      }
    );
    window.handlerPolyline.activate();
  }

  const creat_entity_line = (position) => {
    let lineColor = SuperMap3D.Color.fromCssColorString(state.lineColor);
    let lineWidth = Number(state.lineWidth);
    let material;
    switch (state.currentId) {
      case '1':
        material = lineColor
        break;
      case '2':
        let dottedColor = SuperMap3D.Color.fromCssColorString(state.dottedColor); //间隔颜色
        let dottedLength = Number(state.dottedLength);
        material = new SuperMap3D.PolylineDashMaterialProperty({
          color: lineColor,
          gapColor: dottedColor,
          dashLength: dottedLength,
        })
        break;
      case '3':
        let outLineColor = SuperMap3D.Color.fromCssColorString(state.outLineColor); //轮廓颜色
        let outLineWidth = Number(state.outLineWidth);
        material = new SuperMap3D.PolylineOutlineMaterialProperty({
          color: lineColor,
          outlineWidth: outLineWidth,
          outlineColor: outLineColor,
        })
        break;
      case '4':
        material = new SuperMap3D.PolylineArrowMaterialProperty(lineColor)
        break;
      case '5':
        let glowStrength = Number(state.glowStrength);
        material = new SuperMap3D.PolylineGlowMaterialProperty({
          glowPower: glowStrength,
          color: lineColor,
        })
        break;
      case '6':
        let trailPercentage = Number(state.trailPercentage);
        material = new SuperMap3D.PolylineTrailMaterialProperty({
          color: lineColor,
          trailLength: trailPercentage,
          period: state.trailPeroid,
        })
        break;
      default: material = lineColor
        break;
    };
    selected_line = scene.trackingLayer.add({
      id: "polyline-symbol-line-" + new Date().getTime(),
      polyline: {
        positions: position,
        width: lineWidth,
        material: material,
        clampToGround: clampToGround, //线贴地
        classificationType: classificationType, //线面贴对象
        height: setHeight
      },
    });

  }

  const LEFT_CLICK_Listener = (e) => {
    //获取点击位置笛卡尔坐标
    let selectedEntity = scene.pick(e.message.position);
    if (selectedEntity && selectedEntity.id && selectedEntity.id.id && typeof (selectedEntity.id.id) === 'string') {
      if (selectedEntity.id.id.indexOf("polyline-symbol-line") != -1) {
        selected_line = selectedEntity.id;
      }
      if (selectedEntity.id.id.indexOf("polygon-symbol-gon") != -1) {
        selected_gon = selectedEntity.id;
      }
    }
  }

  const clear = () => {
    if (selected_line && state.drawType === 'polyline') scene.trackingLayer.removeById(selected_line.id);
    if (selected_gon && state.drawType === 'polygon') scene.trackingLayer.removeById(selected_gon.id);
    window.tooltip.setVisible(false);
    clearHandlerDrawing('Polyline');
    clearHandlerDrawing('Polygon');
    if (window.editHandler) window.editHandler.clear()
  }

  const draw = () => {
    if (state.drawType === 'polyline') drawPolyline();
    else drawPolygon()
  }

  const drawPolygon = () => {
    if (!window.handlerPolygon) {
      initHandler("Polygon");
    }
    handlerDrawing("Polygon", false).then(
      res => {
        let handlerPolygon = window.handlerPolygon;
        creat_entity_gon(res.result.object.positions);
        handlerPolygon.polygon.show = false;
        handlerPolygon.polyline.show = false;
        handlerPolygon.deactivate();
      },
      err => {
        console.log(err);
      }
    );
    window.handlerPolygon.activate();
  }

  const creat_entity_gon = (position) => {
    console.log(position)
    let material;
    switch (state.currentId) {
      case '1':
        let polygonColor = SuperMap3D.Color.fromCssColorString(state.solidColor);
        material = polygonColor
        break;
      case '2':
        let gridColor = SuperMap3D.Color.fromCssColorString(state.gridColor); //间隔颜色
        let gridWidth = Number(state.gridWidth);
        let gridCount = Number(state.gridCount);
        let gridCellAlpha = Number(state.gridCellAlpha);
        material = new SuperMap3D.GridMaterialProperty({
          color: gridColor,
          cellAlpha: gridCellAlpha,
          lineCount: new SuperMap3D.Cartesian2(
            gridCount,
            gridCount
          ),
          lineThickness: new SuperMap3D.Cartesian2(
            gridWidth,
            gridWidth
          )
        })
        break;
      case '3':
        let stripeEvenColor = SuperMap3D.Color.fromCssColorString(state.stripeEvenColor); //间隔颜色
        let stripeOddColor = SuperMap3D.Color.fromCssColorString(state.stripeOddColor); //间隔颜色
        let stripeRepeat = Number(state.stripeRepeat);
        let stripeOffset = Number(state.stripeOffset);
        material = new SuperMap3D.StripeMaterialProperty({
          evenColor: stripeEvenColor,
          oddColor: stripeOddColor,
          repeat: stripeRepeat,
          offset: stripeOffset,
          orientation: state.stripeOrientation === 'horizontal' ? 0 : 1,
        })
        break;

      default:
        break;
    };
    selected_gon = scene.trackingLayer.add({
      id: "polygon-symbol-gon-" + new Date().getTime(),
      polygon: {
        hierarchy: {
          positions: position,
        },
        material: material,
        // perPositionHeight: perPositionHeight,
        // heightReference: SuperMap3D.HeightReference.NONE 
      },
      // clampToS3M: clampToS3M
      // classificationType: classificationType, //面贴对象
      // height: setHeight
    });
  }

  // 销毁
  // onBeforeUnmount(() => {
  //   if (scene) scene.eventManager.removeEventListener("CLICK", LEFT_CLICK_Listener);
  // });


  // 监听
  const setLineMode = (val1, val2, val3) => {
    clampToGround = val1;
    classificationType = val2;
    setHeight = val3;
    if (selected_line) {
      selected_line.polyline.clampToGround = clampToGround;
      selected_line.polyline.classificationType = classificationType;
      selected_line.polyline.height = val3;
    }
  }
  // 
  const setGonMode = (val1, val2, val3) => {
    perPositionHeight = val1;
    classificationType = val2;
    setHeight = val3;
    if (selected_gon) {
      selected_gon.polygon.perPositionHeight = perPositionHeight;
      selected_gon.classificationType = classificationType;
      selected_gon.polygon.height = val3;
    }
  }

  watch(() => state.drawModle, val => {
    let isLine = state.drawType === 'polyline' ? true : false;
    switch (val) {
      case "space":
        if (isLine) setLineMode(undefined, undefined, undefined);
        else setGonMode(true, undefined, undefined)
        break;
      case "stick":
        if (isLine) setLineMode(true, SuperMap3D.ClassificationType.TERRAIN, 0);
        else setGonMode(false, SuperMap3D.ClassificationType.TERRAIN, 0)
        break;
      case "postObject":
        if (isLine) setLineMode(true, SuperMap3D.ClassificationType.S3M_TILE, undefined);
        else setGonMode(false, SuperMap3D.ClassificationType.S3M_TILE, undefined)
        break;
      default:
        setLineMode(undefined, undefined, undefined);
        setGonMode(true, false, undefined)
        break;
    };
  });

  watch(() => state.lineColor, val => {
    let color = SuperMap3D.Color.fromCssColorString(val);
    if (selected_line)
      selected_line.polyline.material.color = color;
  });
  watch(() => state.lineWidth, val => {
    if (selected_line)
      selected_line.polyline.width = Number(val);
  });

  watch(() => state.dottedColor, val => {
    let color = SuperMap3D.Color.fromCssColorString(val);
    if (selected_line)
      selected_line.polyline.material.gapColor = color;
  });

  watch(() => state.dottedLength, val => {
    if (selected_line)
      selected_line.polyline.material.dashLength = Number(val);
  });
  watch(() => state.outLineColor, val => {
    let color = SuperMap3D.Color.fromCssColorString(val);
    if (selected_line)
      selected_line.polyline.material.outlineColor = color;
  });
  watch(() => state.outLineWidth, val => {
    if (selected_line)
      selected_line.polyline.material.outlineWidth = Number(val);
  });
  watch(() => state.glowStrength, val => {
    if (selected_line)
      selected_line.polyline.material.glowPower = Number(val);
  });
  watch(() => state.trailPercentage, val => {
    if (selected_line)
      selected_line.polyline.material.trailLength = Number(val);
  });
  watch(() => state.isEdit, val => {
    if (!selected_line) return;
    if (val) { Edit(); return; }
    clearEditHandler();
  });
  watch(() => state.isEditZ, val => {
    if (!selected_line) return;
    if (window.editHandler) {
      window.editHandler.isEditZ = val;
    }
  });

  //面
  watch(() => state.drawType, val => {
    state.currentId = '1';
  });
  watch(() => state.solidColor, val => {
    let color = SuperMap3D.Color.fromCssColorString(val);
    if (selected_gon)
      selected_gon.polygon.material = color;
  });
  watch(() => state.gridColor, val => {
    let color = SuperMap3D.Color.fromCssColorString(val);
    if (selected_gon)
      selected_gon.polygon.material.color = color;
  });
  watch(() => state.gridWidth, val => {
    if (selected_gon)
      selected_gon.polygon.material.lineThickness = new SuperMap3D.Cartesian2(
        Number(val),
        Number(val)
      );
  });
  watch(() => state.gridCount, val => {
    if (selected_gon)
      selected_gon.polygon.material.lineCount = new SuperMap3D.Cartesian2(
        Number(val),
        Number(val)
      );
  })
  watch(() => state.gridCellAlpha, val => {
    if (selected_gon)
      selected_gon.polygon.material.cellAlpha = Number(val)
  })
  watch(() => state.stripeEvenColor, val => {
    let color = SuperMap3D.Color.fromCssColorString(val);
    if (selected_gon)
      selected_gon.polygon.material.evenColor = color;
  });
  watch(() => state.stripeOddColor, val => {
    let color = SuperMap3D.Color.fromCssColorString(val);
    if (selected_gon)
      selected_gon.polygon.material.oddColor = color;
  });
  watch(() => state.stripeRepeat, val => {
    if (selected_gon)
      selected_gon.polygon.material.repeat = Number(val)
  })
  watch(() => state.stripeOffset, val => {
    if (selected_gon)
      selected_gon.polygon.material.offset = Number(val)
  })
  watch(() => state.stripeOrientation, val => {
    if (!selected_gon) return;
    let or = val === 'horizontal' ? 0 : 1;
    selected_gon.polygon.material.orientation = or
  })




  return <div>
    <Radio.Group value={state.drawType} className="sm-global-row">
      <Radio value="polyline">绘制线</Radio>
      <Radio value="polygon">绘制面</Radio>
    </Radio.Group>
    <div className="sm-global-row">
      <span>绘制模式</span>
      <Select defaultValue={state.drawModle} style="width: 120px">
        <Option value="space">空间模式</Option>
        <Option value="stick">贴地模式</Option>
        <Option value="postObject">贴对象模式</Option>
      </Select>
    </div>
    <div className="sm-global-row">
      <Checkbox  checked={state.isEdit}>编辑</Checkbox >
      <Checkbox  checked={state.isEditZ}>编辑Z轴</Checkbox >
    </div>
    <!-- 线整体 -->
    <div v-show="drawType === 'polyline'">
      <div className="sm-dl-box">
        <div
          v-for="line in config.polyline"
          :key="line.id"
          className="sm-dl-line-item"
          :className="{ 'sm-dl-theme-color': line.id === currentId }"
          onClick="changeSelect(line.id)"
        >
          <span className="iconfont" :className="line.iconfont"></span>
          <span>{{ line.lineName }}</span>
        </div>
      </div>
      <div className="sm-global-row">
        <span>线颜色</span>
        <input type="color" v-model="lineColor" className="sm-global-color" />
      </div>
      <div className="sm-global-row">
        <span>线宽</span>
        <InputNumber
          v-model:value="lineWidth"
          min={1}
          className="sm-global-input-number"
        />
      </div>
      <!--虚线 -->
      <div v-show="currentId === '2'">
        <div className="sm-global-row">
          <span>间隔颜色</span>
          <input type="color" v-model="dottedColor" className="sm-global-input-number" />
        </div>
        <div className="sm-global-row">
          <span>分量长度</span>
          <InputNumber v-model:value="dottedLength" min={1}  className="sm-global-input-number"/>
        </div>
      </div>
      <!--轮廓线 -->
      <div v-show="currentId === '3'">
        <div className="sm-global-row">
          <span>轮廓颜色</span>
          <input type="color" v-model="outLineColor" className="sm-global-input-number" />
        </div>
        <div className="sm-global-row">
          <span>轮廓宽度</span>
          <InputNumber v-model:value="outLineWidth" :min="0" className="sm-global-input-number" />
        </div>
      </div>
      <!--光晕线 -->
      <div v-show="currentId === '5'" className="sm-global-row">
        <span>光晕强度</span>
        <InputNumber v-model:value="glowStrength" min="0" step="0.1" className="sm-global-input-number" />
      </div>
      <!--尾迹线 -->
    <div v-show="currentId === '6'" className="sm-global-row">
      <span>尾迹占比</span>
      <InputNumber v-model:value="trailPercentage" min="0" step="0.1" className="sm-global-input-number" />
    </div>
    </div >
    < !--面整体 -->
    <div v-show="drawType === 'polygon'">
      <div className="sm-dl-box">
        <div
          v-for="polygon in config.polygon"
          :key="polygon.id"
        className="sm-dl-line-item"
        :className="{'theme-color': polygon.id === currentId }"
        onClick="changeSelect(polygon.id)"
        >
        <i className="iconfont" :className="polygon.iconfont"></i>
      <label>{{ polygon.faceName }}</label>
    </div>
      </div >

    // <!-- 纯色 -->
    <div className="sm-global-row">
      <span>面颜色</span>
      <input type="color" v-model="solidColor" className="sm-global-input-number" />
    </div>


      
    </div >

    <div className="sm-global-button">
      <Button size="small" onClick="draw">绘制</Button>
      <Button size="small" onClick="clear">清除</Button>
    </div>
  </div >
}
export default Sm3dDrawLinePolygon