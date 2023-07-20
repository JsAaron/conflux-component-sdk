const IOSCfxWeb3 = function () {}
IOSCfxWeb3.create = function () {
  if (window.webkit && window.webkit.messageHandlers) {
    this.exist = true
    this.getLocale = function () {
      return window.webkit.messageHandlers.getLocale.postMessage({})
    }
    this.setConfig = function (confData) {
      this._confData = confData
    }
    this.requestUserInfo = function (jsonObj) {
      return window.webkit.messageHandlers.requestUserInfo.postMessage(jsonObj)
    }
    this.setNavList = function (jsonObj) {
      return window.webkit.messageHandlers.setNavList.postMessage(jsonObj)
    }
    this.setMenuList = function (jsonObj) {
      return window.webkit.messageHandlers.setMenuList.postMessage(jsonObj)
    }
    this.setAppConfig = function (jsonObj) {
      return window.webkit.messageHandlers.setAppConfig.postMessage(jsonObj)
    }
    this.prompt = function (jsonObj) {
      return window.webkit.messageHandlers.prompt.postMessage(jsonObj)
    }
    this.alert = function (jsonObj) {
      return window.webkit.messageHandlers.alert.postMessage(jsonObj)
    }
    this.showNav = function (jsonObj) {
      return window.webkit.messageHandlers.showNav.postMessage(jsonObj)
    }
    this.signData = function (jsonObj) {
      return window.webkit.messageHandlers.signData.postMessage(jsonObj)
    }
    this.showTitle = function (jsonObj) {
      return window.webkit.messageHandlers.showTitle.postMessage(jsonObj)
    }
    this.setTitle = function (jsonObj) {
      return window.webkit.messageHandlers.setTitle.postMessage(jsonObj)
    }
    this.setTitleList = function (jsonObj) {
      return window.webkit.messageHandlers.setTitleList.postMessage(jsonObj)
    }
    this.input = function (jsonObj) {
      return window.webkit.messageHandlers.input.postMessage(jsonObj)
    }
    this.confirm = function (jsonObj) {
      return window.webkit.messageHandlers.confirm.postMessage(jsonObj)
    }
    this.step = function (jsonObj) {
      return window.webkit.messageHandlers.step.postMessage(jsonObj)
    }
    this.slide = function (jsonObj) {
      return window.webkit.messageHandlers.slide.postMessage(jsonObj)
    }
    this.datetimePick = function (jsonObj) {
      return window.webkit.messageHandlers.datetimePick.postMessage(jsonObj)
    }
    this.contractCall = function (jsonObj) {
      return window.webkit.messageHandlers.contractCall.postMessage(jsonObj)
    }
    this.accountCall = function (jsonObj) {
      return window.webkit.messageHandlers.accountCall.postMessage(jsonObj)
    }
    this.getTransactionByHash = function (jsonObj) {
      return window.webkit.messageHandlers.getTransactionByHash.postMessage(jsonObj)
    }
    this.deployContract = function (jsonObj) {
      return window.webkit.messageHandlers.deployContract.postMessage(jsonObj)
    }

    this.toShare = function (jsonObj) {
      return window.webkit.messageHandlers.toShare.postMessage(jsonObj)
    }
    this.showScan = function (jsonObj) {
      return window.webkit.messageHandlers.showScan.postMessage(jsonObj)
    }

    this.setRealName = function (jsonObj) {
      return window.webkit.messageHandlers.setRealName.postMessage(jsonObj)
    }

    this.requestWalletInfo = function (jsonObj) {
      return window.webkit.messageHandlers.requestWalletInfo.postMessage(jsonObj)
    }
    this.exitDapp = function (jsonObj) {
      return window.webkit.messageHandlers.exitDapp.postMessage(jsonObj)
    }
    this.requestRealName = function (jsonObj) {
      return window.webkit.messageHandlers.requestRealName.postMessage(jsonObj)
    }
    this.initDapp = function (jsonObj) {
      return window.webkit.messageHandlers.initDapp.postMessage(jsonObj)
    }

    this.getShareInfo = function () {
      return this._shareInfo
    }
    this.setShareInfo = function (jsonObj) {
      this._shareInfo = jsonObj
    }

    this.getLoginToken = function (jsonObj) {
      return window.webkit.messageHandlers.getLoginToken.postMessage(jsonObj)
    }

    this.setLoginToken = function (jsonObj) {
      return window.webkit.messageHandlers.setLoginToken.postMessage(jsonObj)
    }

    this.requestToNewWeb = function (jsonObj) {
      return window.webkit.messageHandlers.requestToNewWeb.postMessage(jsonObj)
    }

    this.transferNft = function (jsonObj) {
      return window.webkit.messageHandlers.transferNft.postMessage(jsonObj)
    }

    this.transferCFX = function (jsonObj) {
      return window.webkit.messageHandlers.transfer.postMessage(jsonObj)
    }

    this.getBalanceCFX = function (jsonObj) {
      return window.webkit.messageHandlers.getBalance.postMessage(jsonObj)
    }

    this.launchWXMiniPay = function (jsonObj) {
      return window.webkit.messageHandlers.launchWXMiniPay.postMessage(jsonObj)
    }

    this.parse = function (jsonObj) {
      return window.webkit.messageHandlers.parse.postMessage(jsonObj)
    }
		
		this.applePay = function (jsonObj) {
		  return window.webkit.messageHandlers.applePay.postMessage(jsonObj)
		}
		
  } else {
    this.exist = false
  }
  return this.exist
}

export default IOSCfxWeb3
