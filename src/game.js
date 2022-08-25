const Game = {

    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    floor: 50,
    scrollOffset: 0,
    message: undefined,
    time: 0,
    secs: 0,
    timer: undefined,
    level: undefined,
    levels: [],

    FPS: 60,

    player: undefined,
    platforms: [],
    backgrounds: [],
    clouds: [],
    backgroundImg: 'images/background.png',
    hillsImage: 'images/hills.png',

    spriteStandLeft: 'images/spriteStandLeft.png',
    spriteStandRight: 'images/spriteStandRight.png',
    spriteRunLeft: 'images/spriteRunLeft.png',
    spriteRunRight: 'images/spriteRunRight.png',

    interval: undefined,


    init() {
        this.timer = document.querySelector('#score')
        this.level = document.querySelector('#level')
        this.message = document.querySelector('h4')
        this.canvas = document.querySelector('#canvas')
        this.ctx = canvas.getContext('2d')
        this.setDimensions()
        this.start()
    },

    setDimensions() {
        this.width = 1024
        this.height = 576
        this.canvas.width = this.width
        this.canvas.height = this.height
    },

    start() {

        this.generateAll()

        this.interval = setInterval(() => {

            console.log(this.player.position.x + this.player.width >= this.platforms[9].position.x)
            this.time++
            if (this.time % 60 === 0) {
                this.secs++
                this.timer.innerText = this.secs
                if (this.secs > 5) {
                    this.timer.style.color = 'red'
                    this.message.innerText = 'You are running out of time!'
                }

            }

            this.clearAll()
            this.drawAll()
            this.checkCollision()
            this.checkPlayerPosition()
            this.checkTimeOver()
            this.checkDeath()
            this.checkWin()

        }, 1000 / this.FPS)
    },

    clearAll() {
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(0, 0, this.width, this.height)
    },

    generateAll() {
        this.player = new Player(this.ctx, this.width, this.height, this.spriteStandLeft,
            this.spriteStandRight, this.spriteRunLeft, this.spriteRunRight)

        this.platforms.push(new Platform(this.ctx, 200, this.height / 1.6))
        this.platforms.push(new Platform(this.ctx, 700, this.height / 1.2))
        this.platforms.push(new Platform(this.ctx, 1200, this.height / 1.6))
        this.platforms.push(new Platform(this.ctx, 1700, this.height / 1.2))
        this.platforms.push(new Platform(this.ctx, 2200, this.height / 1.6))
        this.platforms.push(new Platform(this.ctx, 2700, this.height / 1.2))
        this.platforms.push(new Platform(this.ctx, 3200, this.height / 1.6))
        this.platforms.push(new Platform(this.ctx, 3700, this.height / 1.2))
        this.platforms.push(new Platform(this.ctx, 4200, this.height / 1.6))
        this.platforms.push(new Platform(this.ctx, 4700, this.height / 1.6))

        this.backgrounds.push(new Background(this.ctx, this.backgroundImg, 0))
        this.backgrounds.push(new Background(this.ctx, this.hillsImage, 10))
        this.platforms.forEach((platform, index) => {
            if (index % 4 === 0) {
                this.clouds.push(new Cloud(this.ctx, platform.position.x + platform.width / 2 - 10, platform.position.y - platform.height))
            }
        })

    },

    drawAll() {
        this.backgrounds.forEach(background => {
            background.draw()
            if (this.player.rightKeyPressed) {
                background.posX -= background.parallax
            }
            if (this.player.leftKeyPressed) {
                background.posX += background.parallax
            }
        })

        this.player.update()

        this.platforms.forEach(platform => {
            platform.draw()
            if (this.player.rightKeyPressed) {
                platform.position.x -= 15
                this.scrollOffset += 1
            }
            if (this.player.leftKeyPressed) {
                platform.position.x += 15
                this.scrollOffset -= 1
            }
        })

        this.clouds.forEach(cloud => {
            cloud.update()

            if (this.player.rightKeyPressed) {
                cloud.posX -= 15
            }
            if (this.player.leftKeyPressed) {
                cloud.posX += 15
            }
        })
    },

    checkCollision() {
        this.platforms.forEach(platform => {
            if (this.player.position.y + this.player.height <= platform.position.y
                && this.player.position.y + this.player.height + this.player.velocity.y >= platform.position.y
                && this.player.position.x + this.player.width > platform.position.x
                && this.player.position.x < platform.position.x + platform.width) {
                this.player.velocity.y = 0
                this.player.canJump = true
            }
        })

        this.clouds.forEach((cloud, index) => {
            if (this.player.position.x + this.player.width + this.player.velocity.x >= cloud.posX
                && this.player.position.y + this.player.height >= cloud.posY) {
                this.player.canFly = true
                this.player.flyTimer += 2000
                this.clouds.splice(index, 1)
            }
        })

    },

    checkPlayerPosition() {
        if (this.player.position.x + this.player.width >= this.platforms[9].position.x
            && this.player.position.y + this.player.height + this.player.velocity.y + 15 >= this.platforms[9].position.y) {
            this.scrollOffset++
            this.player.isPositioned = true
            this.platforms[9].isBoosted = true
            // this.backgrounds.forEach(background => {
            //     background.posX -= background.parallax
            // })
        }
    },

    checkDeath() {
        if (this.player.position.y - 20 >= this.canvas.height) {
            clearInterval(this.interval)
            location.reload()
        }
    },

    checkWin() {
        if (this.player.position.x > this.width) {
            setTimeout(() => {
                location.reload()
            }, 1000);
        }
    },

    checkTimeOver() {
        if (this.secs >= 100) {
            alert('you lose!')
            location.reload()
        }
    }
}