;(function() {

	//游戏时间
	var GameTime = 30000; //ms单位 


	var $homePage    = $('.home-page');
	var $contentPage = $('.content-page');
	var $element     = $('.banner-right .score');

    //目前分数
    var score = 0;
    //更新分数
    var update = function() {
        $element.text(score);
    }
    var add = function() {
        score += 10;
        update();
    }
    var reduce = function() {
        score -= 3;
        if (score < 1) {
            score = 0;
        }
        update();
    }


	var SlideBox = function() {
		var startTime;
		var timer;
		var $dotWrap = $('.dot-wrap');
		var $ems     = $dotWrap.find('em')
		var vernier  = $ems.length;
		var rate     = GameTime/vernier;

		function updatedot() {
			var em;
			if (em = $ems[--vernier]) {
				em.style.backgroundColor = '#291669';
			}
		}

		function run() {
			timer = setTimeout(function() {
				updatedot();
				run();
			}, rate)
		}

		this.start = function() {
			startTime = new Date().getTime();
			run();
		}

		this.destroy = function() {
			clearTimeout(timer)
			vernier = $ems.length;
			$ems.css('backgroundColor', '#d3aa4e')
		}

	}
	var slidebox = new SlideBox();


	//游戏次数
    var GameTotal = 1;
    //内容节点class名
    var className = '.content-page-card';

	//选择游戏
	function selectGame() {
		if (GameTotal >= 4) {
			alert('游戏结束')
			return;
		}
		createGames();
	}


    function createGames() {
    	slidebox.start();
    	++GameTotal;
        var cardGames = new CardGames(className)
        cardGames.$watch('success', add)
        cardGames.$watch('fail', reduce)
        cardGames.$watch('complete', function() {
			slidebox.destroy();
			cardGames.destroy();
			selectGame()
        })
    }


    function startContent(e) {
        createGames('.content-page-card');
        $contentPage.css('visibility', 'visible');
        $homePage.hide()
    }


    $('.start-button').on('click', function(e) {
        startContent(e)
    })
  	// startContent()
})()
