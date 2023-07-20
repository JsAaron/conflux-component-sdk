const AndroidCfxWeb3 = function () {}
AndroidCfxWeb3.create = function () {
  if (window.Android) {
    this.exist = true
    this.getLocale = function () {
      return window.Android.getLocale()
    }
    this.setConfig = function (confData) {
      this._confData = confData
    }
    this.requestUserInfo = function (jsonObj) {
      return window.Android.requestUserInfo(JSON.stringify(jsonObj))
    }
    this.setNavList = function (jsonObj) {
      return window.Android.setNavList(JSON.stringify(jsonObj))
    }
    this.setMenuList = function (jsonObj) {
      return window.Android.setMenuList(JSON.stringify(jsonObj))
    }
    this.setAppConfig = function (jsonObj) {
      return window.Android.setAppConfig(JSON.stringify(jsonObj))
    }
    this.prompt = function (jsonObj) {
      return window.Android.prompt(JSON.stringify(jsonObj))
    }
    this.alert = function (jsonObj) {
      return window.Android.alert(JSON.stringify(jsonObj))
    }
    this.showNav = function (jsonObj) {
      return window.Android.showNav(JSON.stringify(jsonObj))
    }
    this.signData = function (jsonObj) {
      return window.Android.signData(JSON.stringify(jsonObj))
    }
    this.showTitle = function (jsonObj) {
      return window.Android.showTitle(JSON.stringify(jsonObj))
    }
    this.setTitle = function (jsonObj) {
      return window.Android.setTitle(JSON.stringify(jsonObj))
    }
    this.setTitleList = function (jsonObj) {
      return window.Android.setTitleList(JSON.stringify(jsonObj))
    }
    this.input = function (jsonObj) {
      return window.Android.input(JSON.stringify(jsonObj))
    }
    this.confirm = function (jsonObj) {
      return window.Android.confirm(JSON.stringify(jsonObj))
    }
    this.step = function (jsonObj) {
      return window.Android.step(JSON.stringify(jsonObj))
    }
    this.slide = function (jsonObj) {
      return window.Android.slide(JSON.stringify(jsonObj))
    }
    this.datetimePick = function (jsonObj) {
      return window.Android.datetimePick(JSON.stringify(jsonObj))
    }
    this.contractCall = function (jsonObj) {
      return window.Android.contractCall(JSON.stringify(jsonObj))
    }

    this.accountCall = function (jsonObj) {
      return window.Android.accountCall(JSON.stringify(jsonObj))
    }
    this.getTransactionByHash = function (jsonObj) {
      return window.Android.getTransactionByHash(JSON.stringify(jsonObj))
    }
    this.deployContract = function (jsonObj) {
      return window.Android.deployContract(JSON.stringify(jsonObj))
    }

    this.toShare = function (jsonObj) {
      return window.Android.toShare(JSON.stringify(jsonObj))
    }
    this.showScan = function (jsonObj) {
      return window.Android.showScan(JSON.stringify(jsonObj))
    }

    this.setRealName = function (jsonObj) {
      return window.Android.setRealName(JSON.stringify(jsonObj))
    }

    this.exitDapp = function (jsonObj) {
      return window.Android.exitDapp(JSON.stringify(jsonObj))
    }

    this.requestWalletInfo = function (jsonObj) {
      return window.Android.requestWalletInfo(JSON.stringify(jsonObj))
    }

    this.requestRealName = function (jsonObj) {
      return window.Android.requestRealName(JSON.stringify(jsonObj))
    }

    this.initDapp = function (jsonObj) {
      return window.Android.initDapp(JSON.stringify(jsonObj))
    }

    this.getShareInfo = function () {
      return JSON.stringify(this._shareInfo)
    }
    this.setShareInfo = function (jsonObj) {
      this._shareInfo = jsonObj
    }

    this.getLoginToken = function (jsonObj) {
      return window.Android.getLoginToken(jsonObj)
    }

    this.setLoginToken = function (jsonObj) {
      return window.Android.setLoginToken(JSON.stringify(jsonObj))
    }

    this.requestToNewWeb = function (jsonObj) {
      return window.Android.requestToNewWeb(JSON.stringify(jsonObj))
    }

    this.transferNft = function (jsonObj) {
      return window.Android.transferNft(JSON.stringify(jsonObj))
    }

    this.transferCFX = function (jsonObj) {
      return window.Android.transfer(JSON.stringify(jsonObj))
    }

    this.getBalanceCFX = function (jsonObj) {
      return window.Android.getBalance(JSON.stringify(jsonObj))
    }

    this.launchWXMiniPay = function (jsonObj) {
      return window.Android.launchWXMiniPay(JSON.stringify(jsonObj))
    }

    this.parse = function (jsonObj) {
      return window.Android.parse(JSON.stringify(jsonObj))
    }
		
  } else {
    this.exist = false
  }
  return this.exist
}

export default AndroidCfxWeb3
