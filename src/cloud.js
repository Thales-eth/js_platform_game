class Cloud {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.posX = x
        this.posY = y
        this.width = 20
        this.height = 20
    }

    update() {
        this.draw()
    }

    draw() {
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
    }
}