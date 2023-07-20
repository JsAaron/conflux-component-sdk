import AndroidCfxWeb3 from './android.js'
import IOSCfxWeb3 from './ios.js'
import PCCfxWeb3 from './pc.js'

function CfxWeb3(confData) {
  this.version = '2.0.4'
  this._callBackMap = {}
  this.platform = this.getPlatform()
  this.initProvider()
  this.initWatch()
  this.setConfig(confData)
}

CfxWeb3.createApp = function (confData) {
  let obj = new CfxWeb3(confData)
  obj.init()
  return obj
}

CfxWeb3.prototype.initWatch = function () {
  var par = this
  window.getShareInfo = function () {
    return par.provider.getShareInfo()
  }
}

CfxWeb3.prototype.initProvider = function () {
  let isInOs = document.cookie.indexOf('isInConfluxOs=true') != -1
  if (this.platform == 'ios' && IOSCfxWeb3.create() && isInOs) {
    this.provider = IOSCfxWeb3
  } else if (this.platform == 'android' && AndroidCfxWeb3.create() && isInOs) {
    this.provider = AndroidCfxWeb3
  } else {
    PCCfxWeb3.create()
    this.provider = PCCfxWeb3
  }
}

CfxWeb3.prototype.setConfig = function (confData) {
  this._confData = confData
  this._appInfo = confData.appInfo
  this.provider.setConfig(confData)
  this.provider.setAppConfig(confData.appConf)
  this.provider.initDapp(this._appInfo)
}

CfxWeb3.prototype.init = function () {
  this.setMenuList(this._confData.menuList)
  this.setShareInfo(this._confData.shareInfo)
  this.setNavList(this._confData.navList)
  if (this._confData.showNav) {
    this.showNav(1)
  }
}

CfxWeb3.prototype.isObject = function (value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

//osLocale=zh-CN;isInConfluxOS=true;deviceTarget=E99ee3b
CfxWeb3.prototype.isInConfluxOs = function () {
  var ckstr = document.cookie
  return this.provider && this.provider.exist && ckstr.indexOf('isInConfluxOs=true') != -1
}

CfxWeb3.prototype.setCallBack = function (backname, callBack, target) {
  var backObj = {
    callBack: callBack,
    target: target,
    backName: backname
  }
  var par = this
  window[backname] = function (res) {
    try {
      backObj.callBack.apply(backObj.target, [res])
    } catch (err) {
      par.errorLog(backObj.backName, 'setCallBack', res)
    }
  }
}

CfxWeb3.prototype.onNullCallBack = function () {
  //alert("CallBack");
}

CfxWeb3.prototype.setAppInfo = function (info) {
  this._appInfo = info
}

CfxWeb3.prototype.getShareInfo = function () {
  return this._shareInfo
}

CfxWeb3.prototype.setShareInfo = function (info) {
  this._shareInfo = info
  try {
    this.provider.setShareInfo(info)
  } catch (err) {
    this.errorLog('CfxWeb3', 'setShareInfo', err.message)
  }
}

CfxWeb3.prototype.alertInfo = function (info) {
  this.provider.alert(info)
}

CfxWeb3.prototype.showNav = function (value) {
  this.provider.showNav({
    flag: value ? 1 : 0
  })
}

CfxWeb3.prototype.confirmInfo = function (jsonObj) {
  console.log('🚀 ~ file: index.js:172 ~ jsonObj:', jsonObj)
  return this.provider.confirm(jsonObj)
}

CfxWeb3.prototype.getPlatform = function () {
  var pf = 'pc'

  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    pf = 'ios'
  } else if (/(Android)/i.test(navigator.userAgent)) {
    pf = 'android'
  } else if (/(Windows Phone)/i.test(navigator.userAgent)) {
    pf = 'windowsPhone'
  }
  return pf
}
CfxWeb3.prototype.getLocale = function () {
  var sps = document.cookie.split(';')
  for (var i = 0; i < sps.length; i++) {
    var spStr = sps[i]
    var spKVs = spStr.split('=')
    if (spKVs[0] == 'osLocale') {
      return spKVs[1]
    }
  }
  return 'unKnow'
}

/**
 * 废弃
 * 获取授权信息
 * 获取 APP 中用户个人信息、钱包信息到 H5 页面系统，用户授权同意/拒绝 app 回调 js
 * @param {*} chainCode
 * @param {*} needkyc
 * @param {*} refresh
 * @param {*} callBack
 * @param {*} target
 * @returns
 */
CfxWeb3.prototype.reqUserInfo = function (chainCode, needkyc, refresh, callBack, context) {
  var self = this
  var paraObj = {}

  window._requestUserInfoCallBack_ = function (res) {
    self.onUserInfo(res)
  }

  //如果第一个参数是对象
  if (this.isObject(chainCode)) {
    // data: {
    // 	chainCode: getApp().getChainCode(),
    // 	realAuth: 1,
    // 	loginAuth: 0,
    // 	refresh: 1
    // },
    // callBack: this.onUserInfo,
    // context: this
    var paramObjs = chainCode
    var paramData = paramObjs.data

    this._callBack = paramObjs.callBack
    this._callContext = paramObjs.context

    paraObj = {
      accountModel: paramData.accountModel,
      chainCode: paramData.chainCode,
      needRealNameAuth: paramData.realAuth,
      needLoginAuth: paramData.loginAuth,
      refresh: paramData.refresh,
      callBack: '_requestUserInfoCallBack_'
    }
  } else {
    // 如果是传递的多参数
    // 保留回调目标
    this._callBack = callBack
    this._callContext = context
    paraObj = {
      accountModel: paramData.accountModel,
      chainCode: chainCode,
      needRealNameAuth: needkyc,
      refresh: refresh,
      callBack: '_requestUserInfoCallBack_'
    }
  }

  try {
    return this.provider.requestUserInfo(paraObj)
  } catch (err) {
    this.errorLog('CfxWeb3', 'reqUserInfo', {
      paras: paraObj,
      errMsg: err.message
    })
  }
}

/**
 * 用户授权回调方法
 * @param {} res
 */
CfxWeb3.prototype.onUserInfo = function (res) {
  var estr = []
  for (var e in res) {
    estr.push(e)
  }
  try {
    if (res.code == 0) {
      this._userInfo = res.data
      this.logoSrc = 'data:image/jpeg;base64,' + res.data.userImageFileBase64
    }
    if (this._callBack != null) {
      this._callBack.apply(this._callContext, [res])
    }
  } catch (err) {
    this.errorLog('CfxWeb3', 'onUserInfo', {
      errMsg: err.message
    })
  }
}

CfxWeb3.prototype.getUserInfo = function () {
  return this._userInfo
}

CfxWeb3.prototype.setMenuList = function (menuList) {
  try {
    return this.provider.setMenuList(menuList)
  } catch (err) {
    this.errorLog('CfxWeb3', 'setMenuList', {
      paras: menuList,
      errMsg: err.message
    })
  }
}

CfxWeb3.prototype.setNavList = function (navList) {
  try {
    return this.provider.setNavList(navList)
  } catch (err) {
    this.errorLog('CfxWeb3', 'setNavList', {
      paras: navList,
      errMsg: err.message
    })
  }

  //this.callApp("setNavList",navList)
}

CfxWeb3.prototype.showTitle = function (flag) {
  try {
    return this.provider.showTitle(flag)
  } catch (err) {
    this.errorLog('CfxWeb3', 'showTitle', {
      paras: flag,
      errMsg: err.message
    })
  }
}
CfxWeb3.prototype.setTitle = function (titleTxt) {
  try {
    return this.provider.setTitle(titleTxt)
  } catch (err) {
    this.errorLog('CfxWeb3', 'setTitle', {
      paras: titleTxt,
      errMsg: err.message
    })
  }
}
CfxWeb3.prototype.setTitleList = function (titleList) {
  try {
    return this.provider.setTitleList(titleList)
  } catch (err) {
    this.errorLog('CfxWeb3', 'setTitleList', {
      paras: titleList,
      errMsg: err.message
    })
  }
}

CfxWeb3.prototype.cloneTo = function (srcObj, toObj) {
  for (var e in srcObj) {
    toObj[e] = srcObj[e]
  }
  return toObj
}

CfxWeb3.prototype.createMenuInfo = function (icon, mname, url) {
  return {
    icon: icon,
    menuName: mname,
    targetUrl: url
  }
}
CfxWeb3.prototype.createShareInfo = function (menuIcon, shareIcon, shareTitle, shareInfo) {
  return {
    icon: icon,
    menuName: mname,
    targetUrl: url
  }
}

CfxWeb3.prototype.createNavInfo = function (
  icon,
  tname,
  url,
  textColor,
  selectedIcon,
  selectedTextColor,
  clickHandler,
  clickData
) {
  return {
    icon: icon,
    iconCheck: selectedIcon,
    url: url,
    tabName: tname,
    tabTextColor: textColor,
    tabTextSelectColor: selectedTextColor,
    click: clickHandler,
    data: clickData
  }
}

CfxWeb3.prototype.errorLog = function (classname, funname, obj) {
  console.error(this.packLog(4, classname, funname, obj))
}

CfxWeb3.prototype.packLog = function (level, classname, funname, obj) {
  var logBody = ''
  if (obj instanceof String) {
    logBody = obj
  } else {
    logBody = JSON.stringify(obj)
  }
  var logStr = '[' + level + ']' + classname + '.' + funname + ':' + logBody
  return logStr
}
/**
 *
 * @param {*} contractAddr
 * @param {*} abi
 {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address",
        "networkId": 1
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function" //event
  }
 * @param {*} args
  ["cfxtest:aasm7pnb6h3pa2knc4jnabym7sfgeghdxe39vapngn"]
 * @param {*} addr

 * @returns
 */
CfxWeb3.prototype.contractCall = function (contractAddr, abi, args, callBack, target) {
  var backName = '__onContractRes__' + this.getReqIndex()
  if (callBack != null) {
    this.setCallBack(backName, callBack, target)
  } else {
    this.setCallBack(backName, this.onNullCallBack, this)
  }
  var info = {
    contractAddr: contractAddr,
    abi: JSON.stringify(abi),
    args: args,
    callBack: backName
  }
  try {
    return this.provider.contractCall(info)
  } catch (err) {
    this.errorLog('CfxWeb3', 'contractCall', {
      paras: info,
      errMsg: err.message
    })
  }
}
CfxWeb3.prototype.getReqIndex = function () {
  if (CfxWeb3._reqIndex == null || CfxWeb3._reqIndex == undefined) {
    CfxWeb3._reqIndex = 0
  }
  return CfxWeb3._reqIndex++
}
CfxWeb3.prototype.accountCall = function (contractAddr, abi, args, addr, appKeyStr, callTipStr, callBack, target) {
  if (callBack != null) {
    this.setCallBack('__onAccountRes__', callBack, target)
  } else {
    this.setCallBack('__onAccountRes__', this.onNullCallBack, this)
  }
  var info = {
    contractAddr: contractAddr,
    abi: JSON.stringify(abi),
    args: args,
    address: addr,
    callBack: '__onAccountRes__',
    appKey: appKeyStr,
    callTip: callTipStr
  }
  try {
    return this.provider.accountCall(info)
  } catch (err) {
    this.errorLog('CfxWeb3', 'accountCall', {
      paras: info,
      errMsg: err.message
    })
  }
}

/*
    * @param {*} rawdata 描述
	* @param {*} rawType 类型,string｜bytes32｜uint256....
	* @param {*} needHash: 0|1 , 是否需要进行hash,0:否,1:是
	* @param {*} prefix 前缀字符如："\x19Ethereum Signed Message:\n" |　"\u0019Conflux Signed Message:\n"
    * @param {*} address 用来签名的账户钱包地址
    * @param {*} callBack 回调方法名
    * @param {*} target
    code:0,
    msg:"",
    data:{
        "value":"123456",签名值
        "flag":1
    }
*/
CfxWeb3.prototype.signData = function (rawData, rawType, needHash, prefix, tipStr, addr, callBack, target) {
  if (callBack != null) {
    this.setCallBack('__onSignedData__', callBack, target)
  } else {
    this.setCallBack('__onSignedData__', this.onNullCallBack, this)
  }

  var info = {
    raw: rawData,
    type: rawType,
    needHash: needHash,
    prefix: prefix,
    address: addr,
    tip: tipStr,
    callBack: '__onSignedData__'
  }
  this.provider.signData(info)
}

CfxWeb3.prototype.toShareInfo = function (info) {
  return this.provider.toShare(info)
}

CfxWeb3.prototype.setRealName = function (realNameToken) {
  return this.provider.setRealName({
    realNameToken: realNameToken
  })
}

/**
 *
 * 获取授权钱包列表信息
 * @param {*} chainCode
 * @param {*} refresh
 * @param {*} callBack
 * @param {*} target
 * @returns
 */
CfxWeb3.prototype.requestWalletInfo = function (chainCode, refresh, callBack, target) {
  if (callBack != null) {
    this.setCallBack('__onWalletInfoRes__', callBack, target)
  } else {
    this.setCallBack('__onWalletInfoRes__', this.onNullCallBack, this)
  }
  var paraObj = {
    chainCode: chainCode,
    needRealNameAuth: 0,
    refresh: refresh,
    callBack: '__onWalletInfoRes__'
  }
  try {
    return this.provider.requestWalletInfo(paraObj)
  } catch (err) {
    this.errorLog('CfxWeb3', 'requestWalletInfo', {
      paras: paraObj,
      errMsg: err.message
    })
  }
}

CfxWeb3.prototype.initDapp = function (dappName, dappIcon, dappUrl, dappKey) {
  var paraObj = {
    appName: dappName,
    appIcon: dappIcon,
    appUrl: dappUrl,
    appKey: dappKey
  }
  return this.provider.initDapp(paraObj)
}
CfxWeb3.prototype.exitDapp = function () {
  return this.provider.exitDapp({})
}

CfxWeb3.prototype.requestRealName = function (callBack, target) {
  if (callBack != null) {
    this.setCallBack('__onRequestRealNameRes__', callBack, target)
  } else {
    this.setCallBack('__onRequestRealNameRes__', this.onNullCallBack, this)
  }
  var paraObj = {
    callBack: '__onRequestRealNameRes__'
  }
  try {
    return this.provider.requestRealName(paraObj)
  } catch (err) {
    this.errorLog('CfxWeb3', 'requestRealName', {
      paras: paraObj,
      errMsg: err.message
    })
  }
}

CfxWeb3.stringToHexString = function (str) {
  var enStr = ''
  for (var i = 0; i < str.length; i++) {
    enStr += '%' + str.charCodeAt(i).toString(16)
  }

  return enStr
}

CfxWeb3.hexStringToString = function (str) {
  var deArr = str.split('%')
  var deStr = ''
  for (var i = 1; i < deArr.length; i++) {
    deStr += String.fromCharCode(parseInt(deArr[i], 16))
  }
  return deStr
}

CfxWeb3.bytesToHexString = function (bytes) {
  var outStr = ''
  for (var i = 0; i < bytes.length; i++) {
    var v = bytes[i] & 0xff
    var vStr = v.toString(16)
    if (vStr.length < 2) {
      vStr = '0' + vStr
    }
    outStr += vStr
  }
  return '0x' + outStr
}

CfxWeb3.hexStringToBytes = function (hexStr) {
  var len = hexStr.length
  if (len == 0) {
    return []
  }
  if (len > 2) {
    if (hexStr.substr(0, 2) == '0x') {
      hexStr = hexStr.substr(2)
    }
  }
  var outBytes = []
  var len = hexStr.length
  if (len % 2 != 0) {
    hexStr = '0' + hexStr
    len++
  }
  for (var i = 0; i < len; i += 2) {
    var hexValue = hexStr.substr(i, 2)
    outBytes.push(parseInt(hexValue, 16))
  }

  return outBytes
}

//====== 2023.3.1新增接口 ======

CfxWeb3.prototype.getLoginToken = function (callBack) {
  this.setCallBack('__onLoginToken__', callBack)
  return this.provider.getLoginToken('__onLoginToken__')
}

CfxWeb3.prototype.setLoginToken = function (token, refreshToken) {
  return this.provider.setLoginToken({
    token: token,
    refreshToken: refreshToken
  })
}

/**
 *
 * @param {*} url
 * @param {*} model
 * @returns
 */
CfxWeb3.prototype.requestToNewWeb = function (url, model) {
  return this.provider.requestToNewWeb({
    url,
    model
  })
}

//====== 内部接口 ======

/**
 * 应用转移NFT
 * @param {} paramObjs
 * @returns
 */
CfxWeb3.prototype.transferNft = function (paramObjs, callBack, context) {
  this.setCallBack('_transferNftCallBack_', callBack, context)
  var paraObj = {
    tokenId: paramObjs.tokenId,
    nftName: paramObjs.nftName,
    contractAddr: paramObjs.contractAddr,
    address: paramObjs.address,
    callBack: '_transferNftCallBack_',
    //tokenType
    chainCode: paramObjs.chainCode,
    tokenType: paramObjs.tokenType,
    amount: paramObjs.amount || 1
  }
  try {
    return this.provider.transferNft(paraObj)
  } catch (err) {
    this.errorLog('CfxWeb3', 'transferNft', {
      paras: paraObj,
      errMsg: err.message
    })
  }
}

//APP调用微信小程序
CfxWeb3.prototype.launchWXMiniPay = function (paramObjs) {
  var paraObj = {
    path: paramObjs.path,
    miniprogramType: paramObjs.miniprogramType
  }
  return this.provider.launchWXMiniPay(paraObj)
}

//===================== 新接口 ======================

/**
 * 统一处理失败
 */
CfxWeb3.prototype.unifiedFail = function (param, err) {
  param.fail && param.fail(err)
  param.complete && param.complete(err)
}

/**
 * 统一处理成功
 */
CfxWeb3.prototype.unifiedSuccess = function (param, res) {
  param.success && param.success(res)
  param.complete && param.complete(res)
}

/**
 * 统一处理回调
 * @param {*} backname
 * @param {*} callBack
 * @param {*} target
 */
CfxWeb3.prototype.unifiedCallBack = function (callBackName, param) {
  window[callBackName] = res => {
    this.unifiedSuccess(param, res)
  }
}

//新增接口
//获取用户授权信息
CfxWeb3.prototype.getUserAuthorizeInfo = function (param) {
  window._requestUserAuthorizeInfo = res => {
    var estr = []
    for (var e in res) {
      estr.push(e)
    }
    try {
      if (res.code == 0) {
        this._userInfo = res.data
        this.logoSrc = 'data:image/jpeg;base64,' + res.data.userImageFileBase64
      }
      this.unifiedSuccess(param, res)
    } catch (err) {
      this.unifiedFail(param, err)
    }
  }
  let paraObj = {
    accountModel: param.accountModel,
    chainCode: param.chainCode,
    needRealNameAuth: param.realAuth,
    needLoginAuth: param.loginAuth,
    refresh: param.refresh,
    callBack: '_requestUserAuthorizeInfo'
  }
  try {
    return this.provider.requestUserInfo(paraObj)
  } catch (err) {
    this.unifiedFail(param, err)
  }
}

/**
 * 获取授权钱包列表信息
 * @param {*} chainCode
 * @param {*} refresh
 * @param {*} callBack
 * @param {*} target
 * @returns
 */
CfxWeb3.prototype.getWalletInfo = function (param) {
  var paraObj = {
    chainCode: param.chainCode,
    needRealNameAuth: 0,
    refresh: param.refresh,
    callBack: '__onWalletInfoRes__'
  }
  this.unifiedCallBack('__onWalletInfoRes__', param)
  try {
    return this.provider.requestWalletInfo(paraObj)
  } catch (err) {
    this.unifiedFail(param, err)
  }
}

/**
 * 获取数据签名
 */
CfxWeb3.prototype.getSignData = function (param) {
  var paraObj = {
    raw: param.raw,
    type: param.type,
    needHash: param.needHash,
    prefix: param.prefix,
    address: param.address,
    tip: param.raw,
    callBack: '__onSignedData__'
  }
  this.unifiedCallBack('__onSignedData__', param)
  try {
    this.provider.signData(paraObj)
  } catch (err) {
    this.unifiedFail(param, err)
  }
}

/**
 *
 * @param 合约调用
 * @returns
 */
CfxWeb3.prototype.callContract = function (param) {
  var backName = '__onContractRes__' + this.getReqIndex()
  this.unifiedCallBack(backName, param)
  var info = {
    contractAddr: param.contractAddr,
    abi: JSON.stringify(param.abi),
    args: param.args,
    callBack: backName
  }
  try {
    return this.provider.contractCall(info)
  } catch (err) {
    this.unifiedFail(param, err)
  }
}

/**
 * 合约更新
 * @param {} contractAddr
 * @param {*} abi
 * @param {*} args
 * @param {*} addr
 * @param {*} appKeyStr
 * @param {*} callTipStr
 * @param {*} callBack
 * @param {*} target
 * @returns
 */
CfxWeb3.prototype.updateContract = function (param) {
  var info = {
    chainCode: param.chainCode,
    contractAddr: param.contractAddr,
    abi: JSON.stringify(param.abi),
    args: param.args,
    address: param.addr,
    callBack: '__onAccountRes__',
    appKey: param.appKeyStr,
    callTip: param.callTipStr
  }
  this.unifiedCallBack('__onAccountRes__', param)
  try {
    return this.provider.accountCall(info)
  } catch (err) {
    this.unifiedFail(param, err)
  }
}

/**
 * 部署合约
 * @param {} addr
 * @param {*} abi
 * @param {*} args
 * @param {*} bytecode
 * @param {*} callBack
 * @param {*} target
 */
CfxWeb3.prototype.depolyContract = function (addr, abi, args, bytecode, callBack, target) {
  // 接口对象
  if (this.isObject(addr)) {
    let param = addr
    var info = {
      address: param.address,
      abi: param.abi,
      args: param.args,
      bytecode: param.bytecode,
      callBack: '__onDepolyContractRes__'
    }
    try {
      this.unifiedCallBack('__onDepolyContractRes__', param)
      this.provider.deployContract(info)
    } catch (err) {
      this.unifiedFail(param, err)
    }
    return
  }

  if (callBack != null) {
    this.setCallBack('__onDepolyContractRes__', callBack, target)
  } else {
    this.setCallBack('__onDepolyContractRes__', this.onNullCallBack, this)
  }
  var info = {
    address: addr,
    abi: abi,
    args: args,
    bytecode: bytecode,
    callBack: '__onDepolyContractRes__'
  }
  this.provider.deployContract(info)
}

/** 转移CFX */
CfxWeb3.prototype.transferCFX = function (param) {
  var info = {
    chainCode: param.chainCode,
    fromAddress: param.fromAddress,
    toAddress: param.toAddress,
    value: param.value,
    callBack: '__onTransferCFX__'
  }
  this.unifiedCallBack('__onTransferCFX__', param)
  try {
    return this.provider.transferCFX(info)
  } catch (err) {
    this.unifiedFail(param, err)
  }
}

//获取CFX余额
CfxWeb3.prototype.getBalanceCFX = function (param) {
  var info = {
    chainCode: param.chainCode,
    address: param.address,
    callBack: '__onBalanceCFX__'
  }
  this.unifiedCallBack('__onBalanceCFX__', param)
  try {
    return this.provider.getBalanceCFX(info)
  } catch (err) {
    this.unifiedFail(param, err)
  }
}

// ============= 监听 ===============

CfxWeb3.prototype.listener = function (name, callback) {
  this.unifiedCallBack(name, {
    success: callback
  })
}

/**
 * ABI编码返回值解析接口
 * @param {*} name
 * @param {*} callback
 */
CfxWeb3.prototype.parse = function (param) {
  var info = {
    chainCode: param.chainCode,
    rawdata: param.rawdata,
    outputs: param.outputs,
    callBack: '__onParseRes__'
  }
  this.unifiedCallBack('__onParseRes__', param)
  try {
    return this.provider.parse(info)
  } catch (err) {
    this.unifiedFail(param, err)
  }
}

//交易查询
CfxWeb3.prototype.getTransactionByHash = function (txhash, intervalMillis, callBack, target) {
  // 接口对象
  if (this.isObject(txhash)) {
    let param = txhash
    var info = {
      chainCode: param.chainCode,
      txhash: param.txhash,
      intervalMillis: param.intervalMillis,
      callBack: '__onTransactionRes__'
    }
    try {
      this.unifiedCallBack('__onTransactionRes__', param)
      this.provider.getTransactionByHash(info)
    } catch (err) {
      this.unifiedFail(param, err)
    }
    return
  }

  if (callBack != null) {
    this.setCallBack('__onTransactionRes__', callBack, target)
  } else {
    this.setCallBack('__onTransactionRes__', this.onNullCallBack, this)
  }
  var info = {
    txhash: txhash,
    intervalMillis: intervalMillis,
    callBack: '__onTransactionRes__'
  }
  return this.provider.getTransactionByHash(info)
}

//=========== ui接口 =================

/**
 * 弹出
 * @param {*} content
 * @param {*} icon
 * @param {*} title
 */
CfxWeb3.prototype.alert = function (param) {
  this.alertInfo({
    ...param
  })
}

/**
 *
 * @param {*} desc 描述
 * @param {*} callBack
 * @param {*} target
 * @param {*} icon 图标
 * @param {*} title 标题
 * @returns
 */
CfxWeb3.prototype.confirm = function (param) {
  this.unifiedCallBack('__onConfirm__', param)
  this.confirmInfo({
    ...param,
    callBack: '__onConfirm__'
  })
}

/**
 *
 * @param {*} icon 图标
 * @param {*} title 标题
 * @param {*} desc 描述
 * @param {*} datetimeStr 05/28/2022 14:40:00 , 05/28/2022 , 14:40:00 根据参数 决定列数，返回与输入格式一致，输入日期时间为当前选中日期时间
 * @param {*} callBack
 * @param {*} target
 * @returns
 */
CfxWeb3.prototype.datetimePicker = function (param) {
  this.unifiedCallBack('__onDateTimePick__', param)
  try {
    return this.datetimePickInfo({
      icon: param.icon,
      title: param.title,
      description: param.desc,
      datatime: param.datetimeStr,
      callBack: '__onDateTimePick__'
    })
  } catch (err) {
    this.unifiedFail(param, err)
  }
}

CfxWeb3.prototype.datetimePickInfo = function (jsonObj) {
  return this.provider.datetimePick(jsonObj)
}

/**
 *
 * @param {*} icon 图标
 * @param {*} title 标题
 * @param {*} desc 描述
 * @param {*} callBack
 * @param {*} target
 * @returns
 */
CfxWeb3.prototype.input = function (param) {
  this.unifiedCallBack('__onInput__', param)
  try {
    return this.inputInfo({
      icon: param.icon,
      title: param.title,
      description: param.desc,
      length: param.num,
      callBack: '__onInput__'
    })
  } catch (err) {
    this.unifiedFail(param, err)
  }
}
CfxWeb3.prototype.inputInfo = function (jsonObj) {
  return this.provider.input(jsonObj)
}

/**
 *
 * @param {*} icon 图标
 * @param {*} title 标题
 * @param {*} desc 描述
 * @param {*} rule  正则表达式
 * @param {*} callBack
 * @param {*} target
 */
CfxWeb3.prototype.prompt = function (param) {
  this.unifiedCallBack('__onPrompt__', param)
  try {
    return this.promptInfo({
      icon: param.icon,
      title: param.title,
      description: param.desc,
      rule: param.rule,
      tip: param.tip,
      cancelTxt: param.cancelTxt || '取消',
      sureTxt: param.sureTxt || '确定',
      callBack: '__onPrompt__'
    })
  } catch (err) {
    this.unifiedFail(param, err)
  }
}
CfxWeb3.prototype.promptInfo = function (info) {
  this.provider.prompt(info)
}

CfxWeb3.prototype.scanCode = function (param) {
  this.unifiedCallBack('__onScanRes__', param)
  try {
    return this.provider.showScan({
      callBack: '__onScanRes__'
    })
  } catch (err) {
    this.unifiedFail(param, err)
  }
}

/**
 *
 * @param {*} icon 图标
 * @param {*} title 标题
 * @param {*} desc 描述
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @param {*} callBack
 * @param {*} target
 * @returns
 */
CfxWeb3.prototype.slider = function (param) {
  this.unifiedCallBack('__onSlide__', param)
  try {
    return this.slideInfo({
      icon: param.icon,
      title: param.title,
      sicon: param.sliderIcon,
      description: param.desc,
      min: param.min,
      max: param.max,
      value: param.value,
      callBack: '__onSlide__'
    })
  } catch (err) {
    this.unifiedFail(param, err)
  }
}

CfxWeb3.prototype.slideInfo = function (jsonObj) {
  return this.provider.slide(jsonObj)
}

/**
 *
 * @param {*} icon 图标
 * @param {*} title 标题
 * @param {*} desc 描述
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @param {*} step 每次步进值
 * @param {*} callBack
 * @param {*} target
 * @returns
 */
CfxWeb3.prototype.steps = function (param) {
  this.unifiedCallBack('__onStep__', param)
  try {
    return this.stepInfo({
      icon: param.icon,
      title: param.title,
      description: param.desc,
      min: param.min,
      max: param.max,
      value: param.value,
      step: param.step,
      callBack: '__onStep__'
    })
  } catch (err) {
    this.unifiedFail(param, err)
  }
}
CfxWeb3.prototype.stepInfo = function (jsonObj) {
  return this.provider.step(jsonObj)
}

//=============== 内部 =================
CfxWeb3.prototype.applePay = function (callBack, target) {
  if (callBack != null) {
    this.setCallBack('__onApplePay__', callBack, target)
  } else {
    this.setCallBack('__onApplePay__', this.onNullCallBack, this)
  }
  return this.provider.applePay({
    callBack: '__onApplePay__'
  })
}

export default CfxWeb3
