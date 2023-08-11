const PCCfxWeb3 = function() {}
PCCfxWeb3.create = function() {
	this.setConfig = function(confData) {
		this._confData = confData
		//console.log("CfxWeb3UI:"+window.CfxWeb3UI);
		if (window.CfxWeb3UI) {
			this._web3UI = new CfxWeb3UI(confData)
		} else {
			this._web3UI = null
		}
	}
	this.getLocale = function() {
		return 'getLocale cn'
	}
	this.requestUserInfo = function(jsonObj) {
		this._web3UI && this._web3UI.reqUserInfo(jsonObj)
		// setTimeout(function(){ window[jsonObj.callBack]({code:0,msg:"",data:{userName:"TestUser",
		// userImageFileBase64:"xxxxxx",
		// accountAddress:"cfxtest:aasv5an6h689wc3bham4y5wf2nyyrw4upewukyjsw4"}});},100)
		return 'requestUserInfo:' + JSON.stringify(jsonObj)
	}
	this.setNavList = function(jsonObj) {
		return 'setNavList:' + JSON.stringify(jsonObj)
	}
	this.setMenuList = function(jsonObj) {
		return 'setMenuList:' + JSON.stringify(jsonObj)
	}
	this.setAppConfig = function(jsonObj) {
		return 'setAppConfig:' + JSON.stringify(jsonObj)
	}
	this.getShareInfo = function() {
		return this._shareInfo
	}
	this.setShareInfo = function(jsonObj) {
		this._shareInfo = jsonObj
	}
	this.prompt = function(jsonObj) {
		this._web3UI && this._web3UI.prompt(jsonObj)
		return 'prompt:' + JSON.stringify(jsonObj)
	}
	this.input = function(jsonObj) {
		this._web3UI && this._web3UI.input(jsonObj)
		return 'input:' + JSON.stringify(jsonObj)
	}
	this.confirm = function(jsonObj) {
		this._web3UI && this._web3UI.confirm(jsonObj)
		return 'confirm:' + JSON.stringify(jsonObj)
	}
	this.step = function(jsonObj) {
		this._web3UI && this._web3UI.step(jsonObj)
		return 'step:' + JSON.stringify(jsonObj)
	}
	this.slide = function(jsonObj) {
		this._web3UI && this._web3UI.slide(jsonObj)
		return 'slide:' + JSON.stringify(jsonObj)
	}
	this.datetimePick = function(jsonObj) {
		this._web3UI && this._web3UI.datetimePick(jsonObj)
		return 'datetimePick:' + JSON.stringify(jsonObj)
	}

	this.alert = function(jsonObj) {
		this._web3UI && this._web3UI.alert(jsonObj)
		return 'alert:' + JSON.stringify(jsonObj)
	}
	this.showNav = function(jsonObj) {
		return 'showNav:' + JSON.stringify(jsonObj)
	}
	this.signData = function(jsonObj) {
		//this._web3UI.signData(jsonObj);
		return 'signData:' + JSON.stringify(jsonObj)
	}
	this.showTitle = function(jsonObj) {
		return 'showTitle:' + JSON.stringify(jsonObj)
	}
	this.setTitle = function(jsonObj) {
		return 'setTitle:' + JSON.stringify(jsonObj)
	}
	this.setTitleList = function(jsonObj) {
		return 'setTitleList:' + JSON.stringify(jsonObj)
	}

	this.contractCall = function(jsonObj) {
		/**
        const conflux = new window.TreeGraph.Conflux({
            url: 'https://test.confluxrpc.com',
            logger: console,
            networkId: 1,
        });
        const contract = conflux.Contract({address: jsonObj.contractAddr,abi: [jsonObj.abi]});
        var encodeStr=contract[jsonObj.abi[0].name].encodeData(jsonObj.args);

        return "contractCall:"+jsonObj.abi[0].name+":"+encodeStr;
		**/
		return ''
	}

	this.accountCall = function(jsonObj) {
		this._web3UI && this._web3UI.accountCall(jsonObj)
		return ''
	}
	this.getTransactionByHash = function(jsonObj) {
		this._web3UI && this._web3UI.getTransactionByHash(jsonObj)
		return ''
	}
	this.deployContract = function(jsonObj) {
		this._web3UI && this._web3UI.deployContract(jsonObj)
		return ''
	}

	this.toShare = function(jsonObj) {
		return ''
	}
	this.showScan = function(jsonObj) {
		return ''
	}
	this.setRealName = function(jsonObj) {
		return ''
	}
	this.setLoginToken = function(jsonObj) {
		return ''
	}

	this.requestWalletInfo = function(jsonObj) {
		return ''
	}

	this.exitDapp = function(jsonObj) {
		window.close()
		return ''
	}
	this.initDapp = function(jsonObj) {
		return ''
	}

	this.requestToNewWeb = function(jsonObj) {
		return ''
	}

	this.transferNft = function(jsonObj) {
		return ''
	}

	this.launchWXMiniPay = function(jsonObj) {
		return ''
	}

	this.applePay = function(jsonObj) {
		return ''
	}

	this.exist = false

	return this.exist
}

export default PCCfxWeb3