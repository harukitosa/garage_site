import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import * as Tone from "tone";
import { getRandomInt } from "../../lib/random";
import { normalColorSample } from "../../lib/colorData";

interface ComponentProps {
    //Your component props
}

class PointHasVelocity {
    private position: p5Types.Vector;
    private velocity: p5Types.Vector;
    private sound: Tone.Synth<Tone.SynthOptions>;
    private hash: number;

    constructor(
        p5: p5Types,
        positionX: number,
        positionY: number,
        vector: p5Types.Vector,
	hash: number = getRandomInt(1000)
    ) {
        this.position = p5.createVector(positionX, positionY);
        this.velocity = vector;
        this.sound = new Tone.Synth().toDestination();
	this.hash = hash;
    }
    public update(p5: p5Types) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.updateVelocity(p5);
    }

    private playSound(freq: number) {
        try {
            this.sound.triggerAttackRelease(freq, "8n");
        } catch (e) {}
    }

    public updateVelocity(p5: p5Types) {
        if (this.position.x > p5.windowWidth) {
            this.velocity.x *= -1;
            this.playSound(this.hash);
        }
        if (this.position.x < 0) {
            this.velocity.x *= -1;
            this.playSound(this.hash);
        }

        if (this.position.y > p5.windowHeight) {
            this.velocity.y *= -1;
            this.playSound(this.hash);
        }
        if (this.position.y < 0) {
            this.velocity.y *= -1;
            this.playSound(this.hash);
        }
    }

    public getPosition() {
        return this.position;
    }
}

class Rect {
    private points: PointHasVelocity[] = [];
    private color: p5Types.Color;
    constructor(
        p5: p5Types,
        positionX: number,
        positionY: number,
        width: number,
        height: number
    ) {
        const defaultVelocity = 1;
        this.points.push(
            new PointHasVelocity(
                p5,
                positionX,
                positionY,
                p5.createVector(defaultVelocity, 0)
            )
        );
        this.points.push(
            new PointHasVelocity(
                p5,
                positionX + width,
                positionY,
                p5.createVector(0, defaultVelocity)
            )
        );
        this.points.push(
            new PointHasVelocity(
                p5,
                positionX + width,
                positionY + height,
                p5.createVector(-defaultVelocity, 0)
            )
        );
        this.points.push(
            new PointHasVelocity(
                p5,
                positionX,
                positionY + height,
                p5.createVector(0, -defaultVelocity)
            )
        );
        this.color = normalColorSample(p5)[getRandomInt(4)];
        console.log(this.color);
    }

    public update(p5: p5Types) {
        this.points.forEach((point) => {
            point.update(p5);
        });
    }

    public render(p5: p5Types) {
        p5.beginShape();
        p5.fill(this.color);
        p5.noStroke();
        this.points.forEach((point) => {
            const { x, y } = point.getPosition();
            p5.vertex(x, y);
        });
        p5.endShape(p5.CLOSE);
    }
}

export const RectSoundPage: React.FC<ComponentProps> = (
    props: ComponentProps
) => {
    const list: Rect[] = [];
    //See annotations in JS for more information
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(
            canvasParentRef
        );
        for (let i = 0; i < 30; i++) {
            list.push(
                new Rect(
                    p5,
                    getRandomInt(p5.windowWidth),
                    getRandomInt(p5.windowHeight),
                    getRandomInt(100),
                    getRandomInt(100)
                )
            );
        }
        p5.frameRate(60);
    };

    let released = true;

    function mouseReleased() {
        released = true;
    }
    const mousePressed = (p5: p5Types) => {
        if (!released) {
            return;
        }
        released = false;
    };

    const draw = (p5: p5Types) => {
        p5.background(255);
        list.forEach((rect) => {
            rect.render(p5);
            rect.update(p5);
        });
	// p5.textSize(32);
	// p5.fill(255)
	// p5.text("不気味な楽器", 10, 30);
    };

    const windowResized = (p5: p5Types) => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

    return (
        <Sketch
            setup={setup}
            draw={draw}
            windowResized={windowResized}
            mousePressed={mousePressed}
            mouseReleased={mouseReleased}
        />
    );
};
