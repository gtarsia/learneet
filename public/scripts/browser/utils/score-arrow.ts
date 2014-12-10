
export class ScoreArrow {

    constructor(offImageUrl: string, onImageUrl: string) {

    }
    turnOff() {

    }
    turnOn() {

    }
}

export class UpScoreArrow extends ScoreArrow {
    constructor() {
        super('/images/up-score.png', '/images/down-score.png')
    }
}

export class DownScoreArrow extends ScoreArrow {
    constructor() {
        
    }
}