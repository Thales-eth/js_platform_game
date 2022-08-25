class Background {
    constructor(ctx, image, parallax) {
        this.ctx = ctx
        this.posX = -1
        this.posY = -1
        this.parallax = parallax

        this.image = new Image()


        this.image.src = image

        this.width = this.image.width
        this.height = this.image.height
    }

    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY)
    }
}