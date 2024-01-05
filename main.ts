//setup everything
let y = 0
let x = 0
let isEmptyPosition = false
let growth = 0
let speedY = 0
let speedX = 0
let snake: Sprite[] = []
let mySprite: Sprite = null
mySprite = sprites.create(assets.image`bod1`, SpriteKind.Player)
mySprite.setFlag(SpriteFlag.AutoDestroy, true)
mySprite.setPosition(8, 8)
snake.push(mySprite)
mySprite = sprites.create(assets.image`bod1`, SpriteKind.Player)
mySprite.setFlag(SpriteFlag.AutoDestroy, true)
mySprite.setPosition(24, 8)
snake.push(mySprite)
speedX = 1
speedY = 0
growth = 0
spawnFood()
info.setScore(0)
pause(2000)

//food creator
function spawnFood () {
    mySprite = sprites.create(assets.image`food`, SpriteKind.Food)
    isEmptyPosition = false
    while (!(isEmptyPosition)) {
        x = 8 + 16 * randint(0, 9)
        y = 8 + 15 * randint(0, 7)
        isEmptyPosition = true
        for (let value of snake) {
            if (x == value.x && y == value.y) {
                isEmptyPosition = false
            }
        }
    }
    mySprite.setPosition(x, y)
}

//control commands
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (speedY == 0) {
        speedX = 0
        speedY = -1
    }
})

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (speedX == 0) {
        speedX = -1
        speedY = 0
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (speedX == 0) {
        speedX = 1
        speedY = 0
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (speedY == 0) {
        speedX = 0
        speedY = 1
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    growth = 1
    spawnFood()
    info.changeScoreBy(1)
})
sprites.onDestroyed(SpriteKind.Player, function (sprite) {
    game.over(false, effects.melt)
})

//game rules
forever(function () {
    if (growth == 0) {
        mySprite = snake.shift()
    } else {
        growth = 0
        mySprite = sprites.create(assets.image`bod3`, SpriteKind.Player)
        mySprite.setFlag(SpriteFlag.AutoDestroy, true)
    }
    x = snake[snake.length - 1].x + 16 * speedX
    y = snake[snake.length - 1].y + 15 * speedY
    mySprite.setPosition(x, y)
    snake.push(mySprite)
    if (snake.length == 80) {
        game.over(true, effects.confetti)
    }
    pause(200)
})