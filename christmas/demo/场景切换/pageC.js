function pageC(callback) {


}


new pageA(function() {
	new pageB(function() {
		new pageC(function() {
			//执行下一个
		})
	})
})