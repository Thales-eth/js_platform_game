class Player {
    constructor(ctx, ctxWidth, ctxHeigth, floor) {
        this.ctx = ctx
        this.ctxHeigth = ctxHeigth
        this.ctxWidth = ctxWidth
        this.floor = floor
        this.canJump = false

        this.gravity = 0.5

        this.position = {
            x: 210,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 50
        this.height = 50

        this.keys = {
            leftKeyPressed: false,
            rightKeyPressed: false,
            upKeyPressed: false,
        }

    }

    draw() {
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
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

        if (this.upKeyPressed) this.moveUp()

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
        if (this.canJump) this.velocity.y = -15
        this.canJump = false
    }
}
