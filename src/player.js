class Player {
    constructor(ctx, ctxWidth, ctxHeigth, standLeft, standRight, runLeft, runRight) {
        this.ctx = ctx
        this.ctxHeigth = ctxHeigth
        this.ctxWidth = ctxWidth
        this.canJump = false
        this.canFly = false
        this.flyTimer = 2000
        this.isPositioned = false

        this.frames = 0

        this.standLeftImg = new Image()
        this.standLeftImg.src = standLeft

        this.standRightImg = new Image()
        this.standRightImg.src = standRight

        this.runLeftImg = new Image()
        this.runLeftImg.src = runLeft

        this.runRightImg = new Image()
        this.runRightImg.src = runRight

        this.gravity = 0.5

        this.position = {
            x: 210,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 66
        this.height = 150

        this.keys = {
            leftKeyPressed: false,
            rightKeyPressed: false,
            upKeyPressed: false,
        }

    }

    draw() {
        this.ctx.drawImage(this.standRightImg, 177 * this.frames, 0, 177, 400, this.position.x, this.position.y, this.width, this.height)
        if (this.isPositioned) this.position.x += 5
    }

    update() {
        this.frames++
        if (this.frames > 28) this.frames = 0

        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.velocity.y += this.gravity

        this.setEventListeners()

        if (this.leftKeyPressed && this.position.x > 20) {
            this.moveLeft()
        }
        else if (this.rightKeyPressed && this.position.x <= this.ctxWidth / 2.5) {
            this.moveRight()
        }
        else {
            this.velocity.x = 0
        }

        if (this.upKeyPressed && this.position.y > 0) this.moveUp()

    }

    setEventListeners() {
        document.addEventListener('keydown', ({ key }) => {
            switch (key) {
                case 'ArrowLeft':
                    this.leftKeyPressed = true
                    break

                case 'ArrowRight':
                    this.rightKeyPressed = true
                    break


                case 'ArrowUp':
                    this.upKeyPressed = true
                    break

            }
        })

        document.addEventListener('keyup', ({ key }) => {
            switch (key) {
                case 'ArrowLeft':
                    this.leftKeyPressed = false
                    break

                case 'ArrowRight':
                    this.rightKeyPressed = false
                    break

                case 'ArrowUp':
                    this.upKeyPressed = false
                    break
            }
        })
    }

    moveLeft() {
        this.velocity.x = -12
    }

    moveRight() {
        this.velocity.x = 12
    }

    moveUp() {
        if (this.canJump || this.canFly) this.velocity.y = -15

        this.canJump = false

        setTimeout(() => {
            this.canFly = false
        }, this.flyTimer)
    }
}
