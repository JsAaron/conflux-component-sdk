const web3DappConfig = {
  showTitle: false,
  title: '标题',
  showNav: false,
  navList: [],
  titleList: [
    {
      icon: 'https://community.cfx.art/icons_sun.png',
      click: 'goPage', //
      data: {
        url: 'https://community.cfx.art/demo.html'
      }
    },
    {
      icon: 'https://community.cfx.art/icons_sun.png',
      click: 'backPage', //
      data: {}
    }
  ],

  appInfo: {
    appKey: '',
    appName: 'SDK DEMO',
    appIcon: 'http://web3.cfx.art/cossdkicon.jpg', //应用图标地址
    appUrl: 'http://web3.cfx.art/demo.html' //应用访问地址
  },
  appConf: {
    enableImgBrowse: false, //允许右键保存图片
    orientation: 'portrait', //AUTO|PORTRAIT|LANDSCAPE
    navheight: 30, //30px;
    navBgImg: {
      url: '',
      align: 'left|center|right',
      fillMode: 'clip|repeat|scale' //clip不改大小，repeat重复位图，scale缩放
    },
    navBgColor: '#ff0000',
    allowDomain: ['web3.cfx.art', '*.cfx.art']
  },
  //右上角弹出菜单设置
  menuList: [
    {
      icon: 'http://web3.cfx.art/icons_moon.png', //图标地址
      menuName: '收藏',
      click: 'favApp', //AppMethod,callJs,openUrl,Alert,Confirm //为调用
      data: {
        appName: '测试示例',
        appIcon: 'http://web3.cfx.art/icons_moon.png',
        appUrl: 'http://web3.cfx.art/demo.html'
      } //
    },
    {
      icon: 'res@icon_menu_share',
      menuName: '分享',
      click: 'shareApp',
      data: {}
    },
    {
      icon: 'res@icon_menu_request',
      menuName: '重新授权',
      click: 'callJs', //AppMethod,callJs,openUrl //
      data: {
        method: '__onAcceptCall__'
      }
    },
    {
      icon: 'res@icon_menu_refresh',
      menuName: '刷新',
      click: 'callJs', //AppMethod,callJs,openUrl //
      data: {
        method: '__onRefreshCall__'
      }
    }
  ],
  shareInfo: {
    mode: 'code', //sdk|code|encode
    type: 'shot', //image|text|shot
    info: {
      url: 'http://web3.cfx.art/demo.html?page=share',
      img: 'http://web3.cfx.art/shot.jpg', //当type为image时或mode=sdk时，图片URL
      title: '分享标题', //当是code模式时，这是口令明文部分
      desc: '分享内容描述' //mode=sdk时，图文中的描述部分
    },
    to: [
      //分享到何处
      {
        name: '微信',
        icon: 'http://web3.cfx.art/icons_wx.png',
        scheme: 'weixin://'
      },
      {
        name: 'QQ',
        icon: 'http://web3.cfx.art/icons_qq.png',
        scheme: 'mqqapi://'
      },
      {
        name: '微博',
        icon: 'http://web3.cfx.art/icons_wb.png',
        scheme: 'sinaweibo://splash'
      }
    ]
  }
}

export default web3DappConfig
