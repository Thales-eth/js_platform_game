class Platform {
    constructor(ctx, posX, posY, heightFactor, boost) {

        this.ctx = ctx

        this.image = new Image()
        this.image.src = './images/platform.png'

        this.position = {
            x: posX,
            y: posY
        }

        this.width = 200
        this.height = 20

        this.heightFactor = heightFactor

        this.isBoosted = boost
    }

    draw() {
        this.ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        if (this.isBoosted) this.position.x += 5
        if (this.heightFactor) {
            this.width *= 1.5
            this.height *= 5
        }
    }
}