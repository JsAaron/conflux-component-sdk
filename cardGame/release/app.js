;(function() {

	//游戏时间
	var GameTime = 30000; //ms单位 

    var $homePage    = $('.home-page');
    var $contentPage = $('.content-page');
    var $footerPage  = $('.footer-page');
    var $element     = $('.banner-right .score');
    var $footerPlay  = $('.footer-play');

	/**
	 * 音乐
	 * @return {[type]} [description]
	 */
	var A = function() {
		var instance = null; //存放不同音轨的一个实例
		return {
			paly: function(url) {
				var audio;
				if (instance) {
					audio = instance;
					audio.src = url;
				} else {
					audio = new Audio(url);
				}
				audio.autoplay = true;
				audio.play();
				//更新音轨
				instance = audio;
			}
		}
	}();


	/**
	 * 分数更新
	 * @type {Number}
	 */
	var integral = function() {
		var $element     = $('.banner-right .score');
		var score = 0;
		//更新分数
		var update = function() {
			$element.text(score);
		}
		return {
			add: function() {
				score += 10;
				update();
				A.paly('music/score.mp3');
			},
			reduce: function() {
				score -= 3;
				if (score < 1) {
					score = 0;
				}
				update();
			},
			reset:function(){
				score = 0;
				update();
			},
            get:function(){
                return score;
            }
		} 
	}();

   	/**
   	 * 倒计时处理
   	 * @return {[type]} [description]
   	 */
	var slidebox = new function() {
		var timer;
		var $dotWrap      = $('.dot-wrap');
		var $ems          = $dotWrap.find('em')
		var vernier       = $ems.length;
		var rate          = GameTime / vernier;
		var self          = this;
		var timercallabck = null;

		function clear() {
			clearTimeout(timer)
			timer = null;
		}

		function updatedot() {
			var em;
			if (em = $ems[--vernier]) {
				em.style.backgroundColor = '#291669';
			}
			if(!em){
				clear()
				overTime(timercallabck);
				return;
			}
		}

		function run() {
			timer = setTimeout(function() {
				updatedot();
				timer && run();
			}, rate)
		}

		self.start = function() {
			run();
		}

		self.destroy = function() {
			clear();
			vernier = $ems.length;
			$ems.css('backgroundColor', '#d3aa4e')
		}

		self.watch = function(timeout,callback){
			timercallabck = callback;
		}

	}

	/**
	 * 超时处理
	 * @return {[type]} [description]
	 */
	function overTime(callback) {
		var l = layer.open({
			// style: 'border:none; background-color:#78BA32; color:#fff;',
			className: 'popuo-login',
			btn: ['OK'],
			content: '游戏超时，请重新开始游戏！',
			yes: function(elem) {
				callback();
				resetGames();
				layer.close(l)
				l = null;
			}
		})
    }

	//游戏次数
    var GameTotal = 1;
    //内容节点class名
    var className = '.content-page-card';

	/**
	 * 开始游戏
	 * @return {[type]} [description]
	 */
    function createGames() {
    	slidebox.start();
    	++GameTotal;
        var cardGames = new CardGames(className)
        cardGames.$watch('success', integral.add)
        cardGames.$watch('fail', integral.reduce)
        cardGames.$watch('complete', function() {
			slidebox.destroy();
			cardGames.destroy();
			selectGame()
        })
        //超时回调
		slidebox.watch('timeout', function() {
			slidebox.destroy();
			cardGames.destroy();
		})
    }


    /**
     * 选择游戏
     * @return {[type]} [description]
     */
    function selectGame() {
        //游戏结束
        if (GameTotal >= 1) {
            footerPage();
            return;
        }
        //继续游戏
        createGames();
    }


    /**
     * 尾页
     * @return {[type]} [description]
     */
    function footerPage(){
        $footerPage.css('visibility', 'visible')
        $contentPage.css('visibility', 'hidden');

        A.paly('music/through.mp3');
        //得分处理
        $('.footer-slideWrap').text(integral.get())

        $('.footer-prompt div:first').addClass('animated bounceInLeft');
        $('.footer-prompt div:last').addClass('animated bounceInRight');
        // $('.footer-marks').addClass('animated infinite flash');
    }


    function visible($element) {
        $element.css('visibility', 'visible');
    }

    function hidden($element) {
        $element.css('visibility', 'hidden');
    }

    /**
     * 重设游戏
     * @return {[type]} [description]
     */
	function resetGames() {
		$contentPage.css('visibility', 'hidden');
		$homePage.show()
		integral.reset();
	}

    /**
     * 开始页面
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    function startContent(e) {
        createGames('.content-page-card');
        $contentPage.css('visibility', 'visible');
        $homePage.css('visibility', 'hidden');
    }


    $('.start-button').on('click', function(e) {
        startContent(e)
    })

    /**
     * 在玩一次
     * @param  {[type]} ){                 } [description]
     * @return {[type]}     [description]
     */
    $footerPlay.on('click',function(){
        $homePage.css('visibility', 'visible')
        $footerPage.css('visibility', 'hidden')
        $contentPage.css('visibility', 'hidden');
    })


   //  setTimeout(function(){
   //      footerPage()
   //  },100)
  	// startContent()
})()
