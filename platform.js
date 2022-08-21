class Platform {
    constructor(ctx, posX, posY) {

        this.ctx = ctx

        this.image = new Image()
        this.image.src = './images/platform.png'

        this.position = {
            x: posX,
            y: posY
        }

        this.width = 200
        this.height = 20
    }

    draw() {
        this.ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }


}