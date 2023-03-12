import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import * as Tone from "tone";
import { getRandomInt } from "../../lib/random";
import { normalColorSample } from "../../lib/colorData";

interface ComponentProps {
    //Your component props
}

class SoundRect {
    //     private player: Tone.Synth<Tone.SynthOptions>;
    private position: p5Types.Vector;
    private w: number;
    private h: number;
    private hash: number;
    private color: p5Types.Color;

    constructor(position: p5Types.Vector, w: number, h: number, p5: p5Types) {
        // this.player = new Tone.Synth().toDestination();
        this.position = position;
        this.w = w;
        this.h = h;
        this.hash = getRandomInt(255);
        this.color = normalColorSample(p5)[getRandomInt(4)];
    }

    getHash() {
        return this.hash;
    }

    render(p5: p5Types) {
        p5.noStroke();
        p5.fill(this.hash % 255, 255, 255);
        // p5.fill(this.color);
        p5.rect(this.position.x, this.position.y, this.w, this.h);
    }

    update(p5: p5Types) {
        const size = getRandomInt(10) + 90;
        this.w = size;
        this.h = size;
    }

    updateColors(p5: p5Types) {
        this.hash = getRandomInt(255);
        // this.color = normalColorSample(p5)[getRandomInt(4)];
        // p5.fill(this.color);
        // this.play(this.hash*3)
    }

    play(freq: number) {
        try {
            //     this.player.triggerAttackRelease(freq, "8n");
        } catch (e) {}
    }
}

const soundRects: SoundRect[][] = []; // 2D array
export const RectSound3Page: React.FC<ComponentProps> = (
    props: ComponentProps
) => {
    const SIZE = 4;
    const player = new Tone.Synth().toDestination();
    let timing = 0;
    //See annotations in JS for more information
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(
            canvasParentRef
        );

        for (let i = 0; i < SIZE; i++) {
            soundRects[i] = [];
            for (let j = 0; j < SIZE; j++) {
                soundRects[i].push(
                    new SoundRect(
                        p5.createVector(
                            p5.windowWidth / 2 + (i - SIZE / 2) * 100,
                            p5.windowHeight / 2 + (j - SIZE / 2) * 100
                        ),
                        100,
                        100,
                        p5
                    )
                );
            }
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
    let count = 0;
    const draw = (p5: p5Types) => {
        p5.background(255, 255, 240);
        p5.rectMode(p5.CORNER);
        count++;
        for (let i = 0; i < SIZE; i++) {
            for (let j = 0; j < SIZE; j++) {
                soundRects[i][j].render(p5);
                if (timing === i + j * SIZE && count % 60 === 0) {
                    soundRects[i][j].update(p5);
                    soundRects[i][j].updateColors(p5);
                    const hash = soundRects[i][j].getHash();
                    player.triggerAttackRelease(hash*3+100, "8n");
                }
            }
        }

        p5.rectMode(p5.CENTER);
        p5.fill(200, 70);
        p5.ellipse(p5.mouseX, p5.mouseY, 50, 50);
        p5.rectMode(p5.CORNER);
        if (count % 60 === 0) {
            timing++;
            if (timing >= SIZE * SIZE) {
                timing = 0;
            }
            try {
            } catch (e) {}
        }
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
