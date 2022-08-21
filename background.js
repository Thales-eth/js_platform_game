class Background {
    constructor(ctx, image) {
        this.ctx = ctx
        this.posX = -1
        this.posY = -1

        this.image = new Image()
        this.image.src = image

        this.width = this.image.width
        this.height = this.image.height
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY)
    }
}