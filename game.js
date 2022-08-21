const Game = {

    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    floor: 50,
    scrollOffset: 0,

    FPS: 60,

    player: undefined,
    platforms: [],
    backgrounds: [],
    backgroundImg: 'images/background.png',
    hillsImage: 'images/hills.png',

    interval: undefined,


    init() {
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

            this.clearAll()
            this.drawAll()
            this.checkCollision()
            this.checkWin()

        }, 1000 / this.FPS)
    },

    clearAll() {
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(0, 0, this.width, this.height)
        // this.ctx.clearRect(0, 0, this.width, this.height)
    },

    generateAll() {
        this.player = new Player(this.ctx, this.width, this.height, this.floor)
        this.platforms.push(new Platform(this.ctx, 200, this.height / 2))
        this.platforms.push(new Platform(this.ctx, 700, this.height / 1.2))
        this.platforms.push(new Platform(this.ctx, 1000, this.height / 1.6))
        this.backgrounds.push(new Background(this.ctx, this.backgroundImg, 0))
        this.backgrounds.push(new Background(this.ctx, this.hillsImage, 10))
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

    },

    checkCollision() {
        this.platforms.forEach(platform => {
            if (this.player.position.y + this.player.height <= platform.position.y
                && this.player.position.y + this.player.height + this.player.velocity.y >= platform.position.y
                && this.player.position.x + this.player.width > platform.position.x
                && this.player.position.x < platform.position.x + platform.width) {
                this.player.velocity.y = 0
            }
        })

    },

    checkWin() {
        if (this.scrollOffset >= 1000) {
            setTimeout(() => {
                location.reload()
            }, 1000)
            alert('YOU WON')
        }
    }
}