import React, { useEffect, useState } from 'react'
import { InputNumber, Select, Slider, Radio, Button, Checkbox } from 'antd';
const { Option } = Select;
function Sm3dSplitScreen() {
  // 设置默认值数据
  const [state, setState] = useState({
    multiViewport: "NONE", //
    selectedViewport: '0', //
    TreeDatas: [],
  })
  const changeMultiViewport = (value) => {
    console.log('value', value);
    setState({
      ...state,
      multiViewport: value
    })
  }

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
  let layers, imgLayers, terrainLayers, mvtLayers;
  // let tree = ref(null);
  let tree = null;
  //记录视口的选中状态
  let KeysViewports = {
    KeysViewport1: [],
    KeysViewport2: [],
    KeysViewport3: [],
    KeysViewport4: []
  };

  // onMounted(() => {
  //   setTimeout(() => {
  //     initLayers()
  //   }, 500)
  // });

  //监听图层加载完成
  // watch(() => storeState.changeLayers, val => {
  //   initLayers()
  // });

  //初始化图层
  function initLayers() {
    layers = scene.layers && scene.layers.layerQueue;
    imgLayers = scene.imageryLayers._layers;
    mvtLayers = scene._vectorTileMaps && scene._vectorTileMaps._layerQueue;
    terrainLayers = scene.terrainProvider;
    state.TreeDatas.length = 0;
    updataS3MLayer();
    updataImgLayers();
    updataMvtLayers();
    // setTimeout(() => {
    //     tree.value.setCheckedNodes(state.TreeDatas);
    //     let keys = tree.value.getCheckedKeys(true);
    //     KeysViewports.KeysViewport1 = [...keys];
    //     KeysViewports.KeysViewport2 = [...keys];
    //     KeysViewports.KeysViewport3 = [...keys];
    //     KeysViewports.KeysViewport4 = [...keys];
    // }, 500)
  }


  // 分析

  // updatS3M图层
  function updataS3MLayer() {
    if (layers.length == 0) {
      return;
    }
    let S3MLayersObj = {
      id: 's3m',
      label: "S3M图层",
      children: []
    };
    layers.forEach((layer, index) => {
      let S3Mlayer = {
        id: 's3m-' + index,
        label: layer._name,
      };
      S3MLayersObj.children.push(S3Mlayer);
    });
    state.TreeDatas[0] = S3MLayersObj;

  }

  //updatImg
  function updataImgLayers() {
    if (imgLayers.length == 1) {
      return;
    }
    let imgLayersObj = {
      id: 'img',
      label: "IMG图层",
      children: []
    };
    imgLayers.forEach((layer, index) => {
      let isMvt = layer._imageryProvider instanceof SuperMap3D.MvtProviderGL;
      if (index === 0 || isMvt) return true;
      let IMGlayer = {
        id: 'img-' + index,
        label: resource.BaseMapImg,
      };
      if (layer._imageryProvider.tablename) {
        IMGlayer.label = layer._imageryProvider.tablename;
      }
      imgLayersObj.children.unshift(IMGlayer);
    });
    if (imgLayersObj.children.length > 0) state.TreeDatas[1] = imgLayersObj;
  }

  //updatMVT
  function updataMvtLayers() {
    if (!mvtLayers) {
      return
    }
    if (mvtLayers.length == 0) {
      return;
    }
    let mvtLayersObj = {
      id: 'mvt',
      label: "MVT图层",
      children: []
    };
    mvtLayers.forEach((layer, index) => {
      let IMGlayer = {
        id: 'mvt-' + index,
        label: layer.name,
      };
      mvtLayersObj.children.unshift(IMGlayer);
    });
    state.TreeDatas[2] = mvtLayersObj;
  }

  //updatTerrain
  function updataTerrainLayers() {
    if (!terrainLayers.tablename) {
      return;
    }
    let terrainLayersObj = {
      id: 'terrain',
      label: "地形图层",
      children: []
    };
    let TerrainLayer = {
      id: 'terrain-0',
      label: terrainLayers.tablename,
    };
    terrainLayersObj.children.push(TerrainLayer);
    state.TreeDatas[4] = terrainLayersObj;

  }

  //勾选节点函数
  function checkNode(data) {
    let node = tree.value.getNode(data)
    let ids = data.id.split('-');
    setVisibleInViewport(ids, node.checked)
  }

  //设置图层视口显隐
  function setVisibleInViewport(ids, checked) {
    let type = ids[0];
    let index = ids[1];
    switch (type) {
      case 's3m':
        if (!index) {
          for (let i = 0; i < layers.length; i++) {
            layers[i].setVisibleInViewport(Number(state.selectedViewport), checked);
          }
          return;
        }
        layers[index].setVisibleInViewport(Number(state.selectedViewport), checked)
        break;
      case 'img':
        if (!index) {
          for (let i = 0; i < imgLayers.length; i++) {
            imgLayers[i].setVisibleInViewport(Number(state.selectedViewport), checked)
          }
          return;
        }
        imgLayers[index].setVisibleInViewport(Number(state.selectedViewport), checked)
        break;
      case 'mvt':
        if (!index) {
          for (let i = 0; i < mvtLayers.length; i++) {
            mvtLayers[i].setVisibleInViewport(Number(state.selectedViewport), checked)
          }
          return;
        }
        mvtLayers[index].setVisibleInViewport(Number(state.selectedViewport), checked)
        break;
      default: break
    }
  }


  //监听
  // watch(() => state.multiViewport, val => {
  //   scene.multiViewportMode = SuperMap3D.MultiViewportMode[val];
  // });
  useEffect(() => {
    scene.multiViewportMode = SuperMap3D.MultiViewportMode[state.multiViewport]
  }, [state.multiViewport])

  // watch(() => state.selectedViewport, (val, oldval) => {
  //   let keys = tree.value.getCheckedKeys(true);
  //   KeysViewports['KeysViewport' + oldval] = keys;
  //   tree.value.setCheckedKeys(KeysViewports['KeysViewport' + val], true);
  // });


  // 销毁
  // onBeforeUnmount(() => {
  //   layers = null;
  //   imgLayers = null;
  //   terrainLayers = null;
  //   mvtLayers = null;
  //   KeysViewports = null;
  // })


  return <div className="sm-panel">
    <div className="sm-global-row">
      <span>分屏显示</span>
      <Select defaultValue={state.multiViewport} onChange={changeMultiViewport}>
        <Option value="NONE">不使用分屏</Option>
        <Option value="HORIZONTAL">水平分屏</Option>
        <Option value="VERTICAL">垂直分屏</Option>
        <Option value="TRIPLE">三视口</Option>
        <Option value="QUAD">四视口</Option>
      </Select>
    </div>
  </div>
}
export default Sm3dSplitScreen