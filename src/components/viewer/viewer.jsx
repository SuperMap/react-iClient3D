import React, { useEffect } from 'react';
import "./viewer.scss";
import { useDispatch } from 'react-redux'
import ScreenEventManage from "../../js/common/eventManager/EventManager.js";
// import createTooltip from '../../js/tool/tooltip.js'
import createTooltip from '../../js/tool/tooltip.js'

function Sm3dViewer(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    initGlobe(props)
    openingAnimation()
    // 创建tooltip
    // if (!window.tooltip) {
    //   window.tooltip = createTooltip(scene._element);
    // }
    // 加载模式数据
    // scene.open(
    //   "http://www.supermapol.com/realspace/services/3D-CBD/rest/realspace"
    // );
    // 地形
    // scene.terrainProvider = new SuperMap3D.SuperMapTerrainProvider({
    //   url: "https://www.supermapol.com/realspace/services/3D-stk_terrain/rest/realspace/datas/info/data/path",
    //   requestWaterMask: true,
    //   requestVertexNormals: true,
    //   isSct: false,
    // });
    // // 设置相机视角
    // scene.camera.setView({
    //   destination: SuperMap3D.Cartesian3.fromDegrees(88.3648, 29.0946, 90000),
    //   orientation: {
    //     heading: 6.10547067016156,
    //     pitch: -0.8475077031996778,
    //     roll: 6.2831853016686185,
    //   },
    // });
  }, [])
  /**
   * @description: 初始化
   * @param {*} props
   * @return {*}
   */
  const initGlobe = (props) => {
    const viewer = new SuperMap3D.Viewer('Container')
    let scene = viewer.scene;
    // 挂载注册屏幕事件
    scene.eventManager = new ScreenEventManage(
      scene,
      SuperMap3D.ScreenSpaceEventHandler,
      SuperMap3D.ScreenSpaceEventType
    );
    // 挂载_element
    scene._element = document.body;
    window.scene = scene
    dispatch({ type: 'INVIEWER', isViewer: true })
    if (props && props.sceneUrl) {
      scene.open(props.sceneUrl)
    }
  }
  /**
   * @description: 三维球旋转动画
   * @return {*}
   */
  const openingAnimation = () => {
    scene.camera.flyTo({
      destination: new SuperMap3D.Cartesian3(
        6788287.844465209,
        -41980756.10214644,
        29619220.04004376
      ),
      duration: 0,
      complete: function () {
        scene.camera.flyTo({
          destination: new SuperMap3D.Cartesian3.fromDegrees(
            110.60396458865515,
            34.54408834959379,
            30644793.325518917
          ),
          duration: 5,
        });
      },
    });
  };


  return (
    <div id="Container">

    </div>
  )
}

Sm3dViewer.defaultProps = {
  sceneUrl: ''
}

// 这里通过函数组件的 propTypes 属性设置类型校验
// PropType.类型：规定传入类型
// PropType.类型.isRequired：规定必须传入
// About.propTypes = {
//   name: PropTypes.string.isRequired,
//   age: PropTypes.number
// }

export default Sm3dViewer