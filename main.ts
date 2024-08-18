input.onButtonPressed(Button.A, function () {
    if (mode == 0) {
        if (leds[x + y * 5] == 1) {
            leds[x + y * 5] = 0
        } else {
            leds[x + y * 5] = 1
        }
        dessinerLeds()
        music.play(music.createSoundExpression(WaveShape.Square, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    } else {
        music.play(music.createSoundExpression(WaveShape.Square, 500, 500, 255, 0, 200, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
})
function accelerationToLedPosition (acceleration: number) {
    i = Math.round(acceleration / 200 + 2)
    if (i < 0) {
        return 0
    } else if (i > 4) {
        return 4
    }
    return i
}
input.onButtonPressed(Button.AB, function () {
    music.play(music.createSoundExpression(WaveShape.Noise, 1600, 1, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    effacerLeds()
})
function effacerLeds () {
    for (let i = 0; i <= 4; i++) {
        for (let j = 0; j <= 4; j++) {
            leds[i + j * 5] = 0
        }
    }
}
input.onButtonPressed(Button.B, function () {
    mode += 1
    if (mode > 1) {
        mode = 0
    }
    music.play(music.createSoundExpression(WaveShape.Sine, 200, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
})
function dessinerLeds () {
    for (let i = 0; i <= 4; i++) {
        for (let j = 0; j <= 4; j++) {
            if (leds[i + j * 5] == 1) {
                led.plot(i, j)
            } else {
                led.unplot(i, j)
            }
        }
    }
}
let i = 0
let y = 0
let x = 0
let leds: number[] = []
let mode = 0
basic.showIcon(IconNames.Asleep)
mode = 0
leds = []
basic.pause(1000)
effacerLeds()
basic.forever(function () {
    if (input.logoIsPressed()) {
        basic.showString("" + (Math.round(input.compassHeading())))
    } else {
        dessinerLeds()
        x = accelerationToLedPosition(input.acceleration(Dimension.X))
        y = accelerationToLedPosition(input.acceleration(Dimension.Y))
        if (mode == 0) {
            led.toggle(x, y)
        }
    }
})
