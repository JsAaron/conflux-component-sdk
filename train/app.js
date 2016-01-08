KISSY.config({
    "packages": {
        "gama": {
            base: "http://g.tbcdn.cn/gama/",
            ignorePackageNameInUri: true
        }
    }
});

KISSY.use("node, banner", function(S, Node, Game) {
    Game.init({
        container: S.one(".container"),
        baseImage: "http://game.taobao.net/demo/Banner/resource/image/",
        config: {}
    });
});


KISSY.add('banner', function() {

    return {

        init: function(data, callback) {

            var Game = (function e(t, n, r) {

                function s(o, u) {
                    if (!n[o]) {
                        if (!t[o]) {
                            var a = typeof require == "function" && require;
                            if (!u && a) return a(o, !0);
                            if (i) return i(o, !0);
                            var f = new Error("Cannot find module '" + o + "'");
                            throw f.code = "MODULE_NOT_FOUND", f
                        }
                        var l = n[o] = {
                            exports: {}
                        };

                        t[o][0].call(l.exports, function(e) {
                            var n = t[o][1][e];
                            return s(n ? n : e)
                        }, l, l.exports, e, t, n, r)

                    }
                    return n[o].exports
                }

                var i = typeof require == "function" && require;

                for (var o = 0; o < r.length; o++) {
                    s(r[o])
                };

                return s
            })({
                1: [function(require, module, exports) {
                    module.exports = function(game) {

                        var Assets = require('./common/create-assets-class.js')(game.Gama)
                        var base = game.data.baseImage

                        var res = [{
                            id: 'bg',
                            url: 'http://img.alicdn.com/tps/TB1jdCHLXXXXXXEXFXXXXXXXXXX-1025-420.png'
                        }, {
                            id: 'track',
                            url: 'http://img.alicdn.com/tps/TB1hLKVLXXXXXbOXXXXXXXXXXXX-1025-420.png'
                        }, {
                            id: 'back-track',
                            url: 'http://img.alicdn.com/tps/TB1_yyHLXXXXXaDXFXXXXXXXXXX-1025-420.png'
                        }, {
                            id: 'front-track',
                            url: 'http://img.alicdn.com/tps/TB1wjyyLXXXXXb9XVXXXXXXXXXX-1025-420.png'
                        }, {
                            id: 'sp',
                            url: 'http://img.alicdn.com/tps/TB1GvCYLXXXXXbnXXXXXXXXXXXX-256-128.png',
                            tpJSON: require('./sp.js')
                        }]

                        game.assets = new Assets()
                        game.assets.add(res)

                    }
                }, {
                    "./common/create-assets-class.js": 14,
                    "./sp.js": 19
                }],
                2: [function(require, module, exports) {
                    module.exports = function(game) {

                        var Base = game.Base


                        function Balloon() {
                            Base.call(this, 'balloon', 65)
                            game.stage.addChild(this)
                            this.start()
                        }
                        Balloon.prototype = Object.create(Base.prototype)

                        Balloon.prototype.start = function() {

                            var X = 385
                            var Y = 60
                            var DY = 10

                            var DUR = 4000

                            var lasted = 0
                            var self = this
                            var pi2 = Math.PI * 2
                            game.ticker.addTask(function(now, last) {
                                lasted += (now - last)
                                lasted %= DUR
                                var p = lasted / DUR
                                p = Math.sin(p * pi2)
                                self.setTranslation(X, Y + DY * p)
                            })
                        }

                        game.Balloon = Balloon

                    }
                }, {}],
                3: [function(require, module, exports) {
                    module.exports = function(game) {

                        var Obj2d = game.Gama.Gamekit.Obj2d
                        var toConfig = require('./common/frame-2-obj2d-config.js')

                        function Base(key, z) {
                            Obj2d.call(this, toConfig(game.assets.getFrame(key)))
                            z && this.setZ(z)
                        }
                        Base.prototype = Object.create(Obj2d.prototype)

                        Base.prototype.useFrame = function(key) {
                            var frame =
                                typeof key === 'string' ?
                                game.assets.getFrame(key) :
                                key

                            if (!frame) {
                                throw 'frame ' + key + ' not found'
                            }

                            this.coverage.set({
                                type: 'texture',
                                image: frame.image,
                                x: frame.x,
                                y: frame.y
                            })
                        }

                        Base.prototype.hide = function() {
                            this.setTranslation(-999, -999)
                        }

                        Base.prototype.opacity = function(a) {
                            this.coverage.set({
                                type: this.coverage.type,
                                a: a
                            })
                        }

                        game.Base = Base

                    }
                }, {
                    "./common/frame-2-obj2d-config.js": 16
                }],
                4: [function(require, module, exports) {
                    module.exports = function(game) {

                        var CIRCLE_X = 541
                        var CIRCLE_Y = 156
                        var LEFT = 428
                        var RIGHT = 542
                        var TOP = 152
                        var BOTTOM = 160
                        var DURATION = 4000

                        var Base = game.Base

                        function Cable() {
                            this.car1 = new CableCar(true)
                            this.car2 = new CableCar()
                            this.circle = new CableCircle()

                            game.stage.addChild(this.car1)
                            game.stage.addChild(this.car2)
                            game.stage.addChild(this.circle)

                            this.circle.setTranslation(CIRCLE_X, CIRCLE_Y)

                            var lasted = 0
                            game.ticker.addTask(function(now, last) {
                                var inter = now - last
                                lasted += inter
                                if (lasted > DURATION) {
                                    lasted %= DURATION
                                }
                                var p = lasted / DURATION

                                this.circle.rotate(-(now - last) / 700)
                                this.car1.setPercentage(p)
                                this.car2.setPercentage(1 - p)

                            }.bind(this))

                        }

                        function CableCar(ontop) {
                            this.ontop = ontop
                            this.y = ontop ? TOP : BOTTOM
                            Base.call(this, ontop ? 'cable-car-flip' : 'cable-car', ontop ? 71 : 70)
                            this.shape.set({
                                type: 'rectangle',
                                originY: 0
                            })
                            this.setTranslation(-999, -999)
                        }
                        CableCar.prototype = Object.create(Base.prototype)
                        CableCar.prototype.setPercentage = function(p) {
                            var x = LEFT * p + RIGHT * (1 - p)
                            this.setTranslation(x, this.y)
                        }


                        function CableCircle() {
                            Base.call(this, 'cable-circle', 80)
                            this.setTranslation(-999, -999)
                        }
                        CableCircle.prototype = Object.create(Base.prototype)

                        game.Cable = Cable

                    }
                }, {}],
                5: [function(require, module, exports) {
                    module.exports = function(game) {

                        var LEFT = 120
                        var RIGHT = 290
                        var TOP = 182
                        var BOTTOM = 192
                        var DURATION = 10000

                        var Base = game.Base

                        function Car() {
                            Base.call(this, 'car', 80)

                            var lasted = 0
                            game.ticker.addTask(function(now, last) {
                                var inter = now - last
                                lasted += inter
                                if (lasted > DURATION) {
                                    lasted %= DURATION
                                }
                                this.setPercentage(lasted / DURATION)
                            }.bind(this))

                            game.stage.addChild(this)
                        }

                        Car.prototype = Object.create(Base.prototype)

                        var ease = game.Gama.Gamekit.Related.Easing.easeInOutQuad

                        Car.prototype.setPercentage = function(p) {
                            if (p < 0.5 && this.flip) {
                                this.useFrame('car')
                                this.flip = false
                            } else if (p > 0.5 && !this.flip) {
                                this.useFrame('car-flip')
                                this.flip = true
                            }

                            var y = p > 0.5 ? BOTTOM : TOP
                            var q = Math.abs(p - 0.5) / 0.5
                            q = ease(q)
                            var x = LEFT * (1 - q) + RIGHT * q
                            this.setTranslation(x, y)
                        }

                        game.Car = Car

                    }
                }, {}],
                6: [function(require, module, exports) {
                    module.exports = function(game) {

                        function Clouds() {
                            this.clouds = []
                            for (var i = 0; i < 5; i++) {
                                for (var j = 0; j < 4; j++) {
                                    var cloud = new Cloud(j)
                                    cloud.start(i / 5 - 0.1)
                                    this.clouds.push(cloud)
                                }
                            }
                        }

                        var Base = game.Base

                        function Cloud(i) {
                            this.i = i
                            Base.call(this, 'cloud' + i, 10)
                            game.stage.addChild(this)
                            this.y = (0.1 + 0.55 * (1 - Math.random())) * game.height
                        }
                        Cloud.prototype = Object.create(Base.prototype)
                        Cloud.prototype.start = function(p) {

                            var DUR
                            switch (this.i) {
                                case 0:
                                    DUR = 22000
                                    break
                                case 1:
                                    DUR = 25000
                                    break
                                case 2:
                                    DUR = 17000
                                    break
                                case 3:
                                    DUR = 14000
                                    break
                            }


                            var lasted = DUR * p

                            game.ticker.addTask(function(now, last) {
                                lasted += (now - last)
                                lasted %= DUR
                                var p = lasted / DUR
                                if (p < 0.1) {
                                    this.opacity(p / 0.1)
                                }
                                if (p > 0.9) {
                                    this.opacity((1 - p) / 0.1)
                                }
                                this.setTranslation((0.05 + p * 0.9) * game.width, this.y)
                            }.bind(this))
                        }

                        game.Clouds = Clouds



                    }
                }, {}],
                7: [function(require, module, exports) {
                    module.exports = function(game) {

                        function Magic() {
                            this.rabbit = new Rabbit()
                            this.shining = new Shining()
                            this.hat = new Hat()
                            this.hatBack = new HatBack()
                            this.rabbit.shining = this.shining

                            this.rabbit.show()
                        }

                        var Base = game.Base

                        var RabbitPosition = [716, 367]
                        var RabbitToPosition = [716, 348]

                        function Rabbit() {
                            Base.call(this, 'magic-rabbit', 70)
                            game.stage.addChild(this)
                            this.setTranslation(RabbitPosition[0], RabbitPosition[1])
                        }
                        Rabbit.prototype = Object.create(Base.prototype)
                        Rabbit.prototype.show = function() {
                            this.shining.shin()
                            var x = RabbitPosition[0]
                            var y1 = RabbitPosition[1]
                            var y2 = RabbitToPosition[1]
                            var self = this
                            game.ticker.addTask(function(now, last, p) {
                                var per
                                if (p < 0.3) {
                                    per = p / 0.3
                                } else if (p > 0.7) {
                                    per = (1 - p) / 0.3
                                } else {
                                    per = 1
                                }
                                var y = y1 * (1 - per) + y2 * per
                                this.setTranslation(x, y)
                            }.bind(this), {
                                duration: 1200,
                                callback: function() {
                                    self.hide()
                                    game.ticker.setTimeout(function() {
                                        self.show()
                                    }, 1000 + Math.random() * 2000)
                                }
                            })
                        }

                        var ShiningPosition = [716, 338]

                        function Shining() {
                            Base.call(this, 'magic-shining', 72)
                            game.stage.addChild(this)
                            this.setTranslation(ShiningPosition[0], ShiningPosition[1])
                            this.opacity(0)
                        }
                        Shining.prototype = Object.create(Base.prototype)
                        Shining.prototype.shin = function() {
                            this.opacity(0)
                            game.ticker.addTask(function(now, last, p) {
                                var o
                                if (p < 0.7 && p > 0.3) {
                                    o = 1 - Math.abs(p - 0.5) / 0.2
                                } else {
                                    o = 0
                                }
                                this.opacity(o)
                            }.bind(this), {
                                duration: 1200
                            })
                        }


                        var HatPosition = [716, 370]

                        function Hat() {
                            Base.call(this, 'magic-hat', 71)
                            game.stage.addChild(this)
                            this.setTranslation(HatPosition[0], HatPosition[1])
                        }
                        Hat.prototype = Object.create(Base.prototype)

                        function HatBack() {
                            Base.call(this, 'magic-hat-back', 69)
                            game.stage.addChild(this)
                            this.setTranslation(HatPosition[0], HatPosition[1])
                        }
                        HatBack.prototype = Object.create(Base.prototype)


                        game.Magic = Magic

                    }
                }, {}],
                8: [function(require, module, exports) {
                    module.exports = function(game) {

                        var pos = [
                            [216, 288],
                            [236, 276],
                            [240, 299],
                            [279, 266]
                        ]

                        function Sheeps() {
                            this.sheepList = []
                            for (var i = 0; i < 4; i++) {
                                var sheep = new Sheep(pos[i][0], pos[i][1], 0.2 * i - 0.1)
                                this.sheepList.push(sheep)
                            }
                        }

                        var Base = game.Base

                        function Sheep(x, y, p) {
                            Base.call(this, 'sheep', 80)
                            this.x = x
                            this.y = y
                            this.tox = x + 5
                            this.toy = y
                            this.p = p
                            this.setTranslation(this.x, this.y)
                            game.stage.addChild(this)
                            this.start()

                            if (this.p < 0.5) {
                                this.back = false
                                this.useFrame('sheep')
                            } else {
                                this.back = true
                                this.useFrame('sheep-back')
                            }

                        }
                        Sheep.prototype = Object.create(Base.prototype)
                        Sheep.prototype.start = function() {

                            var DUR = 3000 + Math.random() * 1000
                            var lasted = this.p * DUR

                            game.ticker.addTask(function(now, last) {
                                lasted += (now - last)
                                lasted %= DUR
                                var per = lasted / DUR
                                if (per < 0.2 && this.back) {
                                    this.useFrame('sheep')
                                    this.back = false
                                }
                                if (per > 0.8 && !this.back) {
                                    this.useFrame('sheep-back')
                                    this.back = true
                                }
                                if (per <= 0.2) {
                                    per = per / 0.2
                                } else if (per >= 0.8) {
                                    per = (1 - per) / 0.2
                                } else {
                                    per = null
                                }

                                if (per) {
                                    var x = (1 - per) * this.x + per * this.tox
                                    var y = this.y
                                        // console.log(x,y)
                                    this.setTranslation(x, y)
                                }

                            }.bind(this))

                        }

                        game.Sheeps = Sheeps

                    }
                }, {}],
                9: [function(require, module, exports) {
                    module.exports = function(game) {

                        var Base = game.Base

                        function SkyWheel() {
                            Base.call(this, 'sky-wheel', 24)
                            game.stage.addChild(this)
                            this.setTranslation(150, 100)
                            game.ticker.addTask(function(now, last) {
                                var r = (now - last) / 2000
                                this.rotate(r)
                            }.bind(this))
                        }
                        SkyWheel.prototype = Object.create(Base.prototype)

                        game.SkyWheel = SkyWheel

                    }
                }, {}],
                10: [function(require, module, exports) {
                    module.exports = function(game) {

                        var Gamekit = game.Gama.Gamekit

                        function Stage() {

                            Gamekit.Stage.call(this, {
                                container: game.data.container.element,
                                width: game.width,
                                height: game.height,
                                background: game.assets.getImage('bg')
                            })

                            var add = addForeground.bind(this)

                            add('back-track', 25)
                            add('track', 50)
                            add('front-track', 75)

                        }

                        Stage.prototype = Object.create(Gamekit.Stage.prototype)

                        game.Stage = Stage

                        function addForeground(key, z) {

                            var image = game.assets.getImage(key)

                            var config = require('./common/image-2-obj2d-config.js')(image)

                            var foreground = new Gamekit.Obj2d(config)
                            foreground.setZ(z)

                            foreground.setTranslation(game.width / 2, game.height / 2)

                            this.addChild(foreground)
                        }

                    }
                }, {
                    "./common/image-2-obj2d-config.js": 17
                }],
                11: [function(require, module, exports) {
                    module.exports = function(game) {

                        var Base = game.Base

                        function SuperMan() {
                            Base.call(this, 'superman', 60)
                            game.stage.addChild(this)
                            this.hide()
                            this.fly()
                        }
                        SuperMan.prototype = Object.create(Base.prototype)
                        SuperMan.prototype.fly = function() {
                            var y = 20 + Math.random() * 150
                            var self = this
                            game.ticker.addTask(function(now, last, p) {
                                var per = p
                                if (per < 0.2) {
                                    self.opacity(per / 0.2)
                                }
                                if (per > 0.8) {
                                    self.opacity((1 - per) / 0.2)
                                }
                                self.setTranslation(((1 - per) * 0.7 + 0.15) * game.width, y)
                            }, {
                                delay: 1000 + Math.random() * 3000,
                                duration: 3000,
                                callback: function() {
                                    self.hide()
                                    self.fly()
                                }
                            })
                        }


                        game.SuperMan = SuperMan

                    }
                }, {}],
                12: [function(require, module, exports) {
                    module.exports = function(game) {

                        var Base = game.Base

                        function Train() {
                            this.trainHead = new TrainHead()
                            game.stage.addChild(this.trainHead)
                            this.trainSections = []
                            for (var i = 0; i < 3; i++) {
                                var section = new TrainSection()
                                this.trainSections.push(section)
                                game.stage.addChild(section)
                            }
                            this.trainHead.trainSections = this.trainSections
                            this.trainHead.start()
                        }



                        function TrainHead() {
                            Base.call(this, 'train-head', 55)
                            this.frame = game.assets.getFrame('train-head')
                            this.frameFlip = game.assets.getFrame('train-head-flip')
                            var shape = this.shape
                            shape.set({
                                type: 'rectangle',
                                originY: shape.boundingHeight() * 0.8
                            })
                            this.setTranslation(-999, -999)
                        }
                        TrainHead.prototype = Object.create(Base.prototype)
                        TrainHead.prototype.start = function() {
                            var spd = 0.1
                            var i = 0
                            var len = 0
                            var off = false
                            var tlen = 0

                            game.ticker.addTask(function(now, last) {
                                if (off) {
                                    return
                                }
                                var cy = route[4 * i + 1]
                                spd = Math.sqrt(cy + 30) / 50 - tlen / 8000
                                var dlen = (now - last) * spd
                                len += dlen
                                tlen += dlen
                                while (len > route[4 * i + 2]) {
                                    len -= route[4 * i + 2]
                                    i++
                                }
                                updateTrainSection(this, len, i)

                                for (var p = 0; p < this.trainSections.length; p++) {
                                    updateTrainSection(this.trainSections[p], len - (p + 1) * (i === 0 ? 28 : 20), i)
                                }

                                if (route[4 * (i + 1) + 2] === -1) {
                                    off = true
                                    game.ticker.setTimeout(function() {
                                        i = 0
                                        off = false
                                        tlen = 0
                                    }, 2000)
                                }

                            }.bind(this))
                        }

                        function TrainSection() {
                            Base.call(this, 'train-section', 55)
                            this.frame = game.assets.getFrame('train-section')
                            this.frameFlip = game.assets.getFrame('train-section-flip')
                            var shape = this.shape
                            shape.set({
                                type: 'rectangle',
                                originY: shape.boundingHeight() * 0.8
                            })
                            this.setTranslation(-999, -999)
                        }
                        TrainSection.prototype = Object.create(Base.prototype)



                        var route = (function() {
                            var data = require('./track-route.js')
                            var route = []
                            for (var k = 0; k * 2 < data.length; k++) {
                                var x1 = data[2 * k]
                                var y1 = data[2 * k + 1]
                                var x2 = data[2 * k + 2]
                                var y2 = data[2 * k + 3]
                                var dx = x2 - x1
                                var dy = y2 - y1
                                var len = Math.sqrt(dx * dx + dy * dy)
                                var norm
                                if (k === 0) {
                                    norm = Math.atan2(dx, dy) + Math.PI / 2
                                } else {
                                    var x0 = data[2 * k - 2]
                                    var y0 = data[2 * k - 1]
                                    norm = Math.atan2(x2 - x0, y2 - y0) + Math.PI / 2
                                }
                                route.push(x1)
                                route.push(y1)
                                route.push(len)
                                route.push(norm)
                            }

                            route.push(data[k])
                            route.push(data[k + 1])
                            route.push(-1)

                            return route
                        })()


                        function updateTrainSection(section, len, i) {

                            while (len < 0) {
                                if (i === -1) {
                                    return
                                }
                                len += route[4 * i - 2]
                                i--
                            }

                            var x1 = route[4 * i]
                            var y1 = route[4 * i + 1]
                            var x2 = route[4 * i + 4]
                            var y2 = route[4 * i + 5]
                            var mlen = route[4 * i + 2]
                            var norm1 = route[4 * i + 3]
                            var norm2 = route[4 * i + 7]
                            var p = len / mlen

                            var x = x1 * (1 - p) + x2 * p
                            var y = y1 * (1 - p) + y2 * p

                            if (Math.abs(norm1 - norm2) > Math.PI) {
                                if (norm1 < norm2) {
                                    norm1 += Math.PI * 2
                                } else {
                                    norm2 += Math.PI * 2
                                }
                            }

                            var norm = norm1 * (1 - p) + norm2 * p

                            if (!x || !y || isNaN(norm)) {
                                x = -999
                                y = -999
                                norm = 0
                            }
                            section.setTranslation(x, y)

                            if (i < 62) {
                                section.rotate(-norm + Math.PI)
                                if (section.fliped) {
                                    section.useFrame(section.frame)
                                    section.fliped = false
                                }
                            } else {
                                section.rotate(-norm)
                                if (!section.fliped) {
                                    section.useFrame(section.frameFlip)
                                    section.fliped = true
                                }
                            }
                        }

                        game.Train = Train

                    }
                }, {
                    "./track-route.js": 20
                }],
                13: [function(require, module, exports) {
                    function on(element, type, func) {
                        if (element.addEventListener) {
                            element.addEventListener(type, func)
                        } else {
                            element.attachEvent('on' + type, func)
                        }
                    }

                    function Mouse(container) {
                        this.container = container
                    }

                    Mouse.prototype.onUp = function(func) {
                        on(this.container, 'mouseup', function(e) {
                            func(e.offsetX, e.offsetY)
                        })
                    }

                    Mouse.prototype.onDown = function(func) {
                        on(this.container, 'touchstart', function(e) {
                            var target = e.target
                            var left = 0,
                                top = 0
                            while (target) {
                                left += target.offsetLeft
                                top += target.offsetTop
                                target = target.offsetParent
                            }
                            var touch = e.touches[0]
                            func(touch.clientX - left, touch.clientY - top)
                            e.preventDefault()
                        })
                        on(this.container, 'mousedown', function(e) {
                            func(e.offsetX, e.offsetY)
                        })
                    }

                    Mouse.prototype.onMove = function(func) {
                        on(this.container, 'mousemove', function(e) {
                            func(e.offsetX, e.offsetY)
                        })
                    }

                    Mouse.prototype.onLeave = function(func) {
                        on(this.container, 'mouseleave', function(e) {
                            func(e.offsetX, e.offsetY)
                        })
                    }

                    module.exports = Mouse
                }, {}],
                14: [function(require, module, exports) {
                    module.exports = function(Gama) {

                        var Loader = Gama.Loader
                        var Gamekit = Gama.Gamekit

                        if (!Loader || !Gamekit) {
                            return
                        }

                        var TpFrame = Gamekit.Related.TpFrame

                        function Assets() {
                            this.assets = []
                            this.onReady = function() {}
                        }

                        Assets.prototype.add = function(assets) {
                            if (assets.length) {
                                assets.forEach(function(asset) {
                                    this.assets.push(asset)
                                }.bind(this))
                            } else {
                                this.assets.push(assets)
                            }
                        }

                        Assets.prototype.load = function() {

                            this.loader = new Loader()

                            // 全部加入loader
                            this.assets.forEach(function(asset) {
                                asset.id = asset.id || getIdFromUrl(asset.url)
                                this.loader.add(asset)
                            }.bind(this))

                            this.tpFrame = new TpFrame()
                            this.resources = {}

                            // 加载
                            this.loader.on('load', function() {
                                this.assets.forEach(function(asset) {
                                    if (asset.tpJSON) {
                                        asset.image = asset.content
                                        this.tpFrame.add(asset)
                                    } else {
                                        this.resources[asset.id] = asset
                                    }
                                }.bind(this))
                                this.onReady()
                            }.bind(this)).load()

                            function getIdFromUrl(url) {
                                var slashIndex = url.lastIndexOf('/') || -1
                                var dotIndex = url.lastIndexOf('.') || url.length
                                return url.substring(slashIndex + 1, dotIndex)
                            }
                        }

                        Assets.prototype.getFrame = function(key, index) {
                            return this.tpFrame.getFrame(key, index)
                        }

                        Assets.prototype.getFrameLength = function(key) {
                            return this.tpFrame.getFrameCountAction(key)
                        }

                        Assets.prototype.getImage = function(id) {
                            return this.resources[id].content
                        }

                        Assets.prototype.getAudio = function(id) {
                            return this.resources[id].content
                        }

                        Assets.prototype.ready = function(func) {
                            this.onReady = func
                        }

                        return Assets

                    }
                }, {}],
                15: [function(require, module, exports) {
                    module.exports = function(Gama) {

                        var Ticker = Gama.Ticker
                        var Gamekit = Gama.Gamekit
                        if (!Ticker || !Gamekit) {
                            return
                        }

                        function startGame(stage) {

                            var renderer

                            if (stage.container.toString() === '[object HTMLCanvasElement]') {
                                renderer = new Gamekit.CanvasRenderer()
                            } else {
                                renderer = new Gamekit.DomRenderer()
                            }

                            var ticker = new Ticker()

                            ticker.add({
                                tick: function() {
                                    renderer.render(stage)
                                }
                            })

                            ticker.start()
                            return ticker
                        }

                        return startGame

                    }
                }, {}],
                16: [function(require, module, exports) {
                    module.exports = function(frame, scale) {

                        if (scale === undefined) {
                            scale = 1
                        }

                        return {
                            shape: {
                                type: 'rectangle',
                                width: frame.width * scale,
                                height: frame.height * scale
                            },
                            coverage: {
                                type: 'texture',
                                x: frame.x,
                                y: frame.y,
                                image: frame.image,
                                scale: scale
                            }
                        }


                    }
                }, {}],
                17: [function(require, module, exports) {
                    module.exports = function(image, scale) {

                        if (scale === undefined) {
                            scale = 1
                        }

                        return {
                            shape: {
                                type: 'rectangle',
                                width: image.width * scale,
                                height: image.height * scale
                            },
                            coverage: {
                                type: 'texture',
                                x: 0,
                                y: 0,
                                image: image,
                                scale: scale
                            }
                        }


                    }
                }, {}],
                18: [function(require, module, exports) {
                  
                    function Game(Gama, data) {

                        var game = {
                            Gama: Gama, // Gama
                            data: data, // 游戏通用配置
                            config: data.config // 游戏自定义配置
                        }
                        window.gg = game

                        require('./assets.js')(game)
                        game.assets.ready(function() {
                            game.start()
                        })

                        game.width = 1025
                        game.height = 420

                        require('./class-base.js')(game)
                        require('./class-stage.js')(game)
                        require('./class-train.js')(game)
                        require('./class-cable.js')(game)
                        require('./class-car.js')(game)
                        require('./class-superman.js')(game)
                        require('./class-balloon.js')(game)
                        require('./class-clouds.js')(game)
                        require('./class-skywheel.js')(game)
                        require('./class-magic.js')(game)
                        require('./class-sheeps.js')(game)
                        game.Mouse = require('./common/class-mouse.js')

                        game.start = function() {
                            game.stage = new game.Stage()
                            var start = require('./common/create-start-game.js')(game.Gama)
                            game.ticker = start(game.stage)

                            game.mouse = new game.Mouse(game.data.container.element)

                            // 初始化过山车

                            game.train = new game.Train()
                            game.cable = new game.Cable()
                            game.car = new game.Car()
                            game.superman = new game.SuperMan()
                            game.balloon = new game.Balloon()
                            game.clouds = new game.Clouds()
                            game.skywheel = new game.SkyWheel()
                            game.magic = new game.Magic()
                            game.sheeps = new game.Sheeps()
                        }

                        game.assets.load()
                        return game
                    }

                    Game.Meta = {
                        Gama: {
                            Gamekit: '0.1.1',
                            Ticker: '0.1.1',
                            Loader: '0.1.1'
                        }
                    }

                    module.exports = Game
                }, {
                    "./assets.js": 1,
                    "./class-balloon.js": 2,
                    "./class-base.js": 3,
                    "./class-cable.js": 4,
                    "./class-car.js": 5,
                    "./class-clouds.js": 6,
                    "./class-magic.js": 7,
                    "./class-sheeps.js": 8,
                    "./class-skywheel.js": 9,
                    "./class-stage.js": 10,
                    "./class-superman.js": 11,
                    "./class-train.js": 12,
                    "./common/class-mouse.js": 13,
                    "./common/create-start-game.js": 15
                }],
                19: [function(require, module, exports) {
                    module.exports = {
                        "frames": {
                            "balloon.png": {
                                "frame": {
                                    "x": 77,
                                    "y": 2,
                                    "w": 39,
                                    "h": 55
                                }
                            },
                            "cable-car-flip.png": {
                                "frame": {
                                    "x": 214,
                                    "y": 72,
                                    "w": 24,
                                    "h": 21
                                }
                            },
                            "cable-car.png": {
                                "frame": {
                                    "x": 118,
                                    "y": 2,
                                    "w": 24,
                                    "h": 21
                                }
                            },
                            "cable-circle.png": {
                                "frame": {
                                    "x": 149,
                                    "y": 2,
                                    "w": 16,
                                    "h": 16
                                }
                            },
                            "car-flip.png": {
                                "frame": {
                                    "x": 193,
                                    "y": 42,
                                    "w": 53,
                                    "h": 28
                                }
                            },
                            "car.png": {
                                "frame": {
                                    "x": 138,
                                    "y": 26,
                                    "w": 53,
                                    "h": 28
                                }
                            },
                            "cloud0.png": {
                                "frame": {
                                    "x": 40,
                                    "y": 78,
                                    "w": 126,
                                    "h": 33
                                }
                            },
                            "cloud1.png": {
                                "frame": {
                                    "x": 193,
                                    "y": 26,
                                    "w": 57,
                                    "h": 14
                                }
                            },
                            "cloud2.png": {
                                "frame": {
                                    "x": 168,
                                    "y": 2,
                                    "w": 84,
                                    "h": 22
                                }
                            },
                            "cloud3.png": {
                                "frame": {
                                    "x": 126,
                                    "y": 113,
                                    "w": 47,
                                    "h": 12
                                }
                            },
                            "magic-hat-back.png": {
                                "frame": {
                                    "x": 175,
                                    "y": 101,
                                    "w": 44,
                                    "h": 25
                                }
                            },
                            "magic-hat.png": {
                                "frame": {
                                    "x": 168,
                                    "y": 74,
                                    "w": 44,
                                    "h": 25
                                }
                            },
                            "magic-rabbit.png": {
                                "frame": {
                                    "x": 118,
                                    "y": 26,
                                    "w": 18,
                                    "h": 31
                                }
                            },
                            "magic-shining.png": {
                                "frame": {
                                    "x": 2,
                                    "y": 78,
                                    "w": 36,
                                    "h": 36
                                }
                            },
                            "sheep-back.png": {
                                "frame": {
                                    "x": 14,
                                    "y": 116,
                                    "w": 10,
                                    "h": 9
                                }
                            },
                            "sheep.png": {
                                "frame": {
                                    "x": 2,
                                    "y": 116,
                                    "w": 10,
                                    "h": 9
                                }
                            },
                            "sky-wheel.png": {
                                "frame": {
                                    "x": 2,
                                    "y": 2,
                                    "w": 73,
                                    "h": 74
                                }
                            },
                            "superman.png": {
                                "frame": {
                                    "x": 40,
                                    "y": 113,
                                    "w": 84,
                                    "h": 12
                                }
                            },
                            "train-head-flip.png": {
                                "frame": {
                                    "x": 103,
                                    "y": 59,
                                    "w": 24,
                                    "h": 16
                                }
                            },
                            "train-head.png": {
                                "frame": {
                                    "x": 77,
                                    "y": 59,
                                    "w": 24,
                                    "h": 16
                                }
                            },
                            "train-section-flip.png": {
                                "frame": {
                                    "x": 149,
                                    "y": 56,
                                    "w": 18,
                                    "h": 16
                                }
                            },
                            "train-section.png": {
                                "frame": {
                                    "x": 129,
                                    "y": 59,
                                    "w": 18,
                                    "h": 16
                                }
                            }
                        },
                        "meta": {
                            "size": {
                                "w": 256,
                                "h": 128
                            }
                        }
                    }
                }, {}],
                20: [function(require, module, exports) {
                    module.exports = [
                        152, 326,
                        153, 304,
                        158, 277,
                        165, 257,
                        173, 245,
                        185, 234,
                        195, 229,
                        206, 227,
                        216, 227, // 第一个顶弯
                        226, 230,
                        236, 237,
                        244, 246,
                        249, 253,
                        259, 271,
                        267, 289,
                        274, 300,
                        282, 311,
                        292, 321,
                        302, 326, // 第一个底弯
                        315, 329,
                        325, 329,
                        343, 325,
                        368, 318,
                        440, 297,
                        512, 275,
                        573, 252,
                        609, 238,
                        645, 222,
                        665, 210, // 交叉口
                        678, 201,
                        694, 187,
                        708, 169,
                        712, 137,
                        710, 122,
                        707, 115,
                        700, 103,
                        684, 91,
                        670, 85,
                        652, 83,
                        634, 84, // 顶
                        622, 89,
                        609, 95,
                        601, 103,
                        595, 113,
                        589, 137,
                        591, 153,
                        597, 168,
                        609, 183,
                        625, 197,
                        649, 209, // 交叉口
                        678, 220,
                        704, 224,
                        732, 228,
                        799, 233,
                        850, 239,
                        884, 246,
                        915, 252,
                        936, 257,
                        949, 262,
                        954, 265,
                        965, 274,
                        968, 280, // 右边 第62个点
                        967, 286,
                        967, 289,
                        958, 295,
                        942, 303,
                        917, 313,
                        869, 336,
                        833, 351,
                        809, 361,
                        786, 371,
                        773, 375,
                        761, 374,
                        755, 369, // 下角
                        748, 359,
                        739, 338,
                        734, 315,
                        727, 297,
                        719, 287,
                        709, 278,
                        699, 274,
                        685, 274,
                        672, 280,
                        663, 290,
                        658, 301,
                        650, 320,
                        646, 342,
                        643, 350,
                        639, 359,
                        632, 368,
                        620, 373, // 下角
                        605, 372,
                        591, 365,
                        581, 345,
                        575, 326,
                        568, 313,
                        559, 305,
                        547, 302,
                        538, 305,
                        530, 312,
                        525, 322,
                        524, 333,
                        520, 345,
                        516, 357,
                        509, 366,
                        494, 372,
                        489, 374, // 下角
                        468, 371,
                        454, 357,
                        428, 334,
                        418, 330,
                        409, 331,
                        394, 336,
                        380, 346,
                        371, 355,
                        364, 362,
                        351, 370,
                        326, 372,
                        209, 372,
                        140, 372

                    ]
                }, {}]
            }, {}, [18])(18)

            KISSY.use('node, gama/es5-shim/0.1.1/index-ks', function(S) {

                var names = []
                var paths = []
                var MetaGama = Game.Meta.Gama
                for (var name in MetaGama) {
                    names.push(name)
                    paths.push('gama/' + name.toLowerCase() + '/' + MetaGama[name] + '/index-ks')
                }

                KISSY.use(paths.join(','), function(S) {

                    var Gama = {}
                    for (var i = 0; i < names.length; i++) {
                        Gama[names[i]] = arguments[i + 1]
                    }

                    var container = data.container
                    var width = container.width()
                    var height = container.height()

                    var element = null
                    var cvs = S.one('<canvas>')
                    if (cvs[0] && cvs[0].getContext && !data.doNotUseCanvas) {
                        cvs.width(width).height(height)
                        container.append(cvs)
                        element = cvs[0]
                    } else {
                        var div = S.one('<div>')
                        div.width(width).height(height)
                        container.append(div)
                        element = div[0]
                    }
                    // 重写 data.container
                    data.container = {
                        element: element,
                        width: width,
                        height: height
                    }

                    if (!data.baseImage) {
                        try {
                            data.base = S.config('packages').gama.base
                        } catch (e) {
                            console && console.log('未配置gama包')
                            data.base = 'http://g.tbcdn.cn/gama/'
                        }
                        data.baseImage =
                            data.base + 'app-unnamed/0.0.0/resource/image/'
                    }

                    var game = Game(Gama, data)

                    game.onReady = function() {
                        callback(game)
                    }

                })
            })
        }
    }
})
