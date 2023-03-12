import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import * as Tone from "tone";
import { getRandomInt } from "../../lib/random";

interface ComponentProps {
    //Your component props
}

let state: State[] = [];

interface State {
    vec: p5Types.Vector;
    velocity: p5Types.Vector;
    acc: p5Types.Vector;
    osc: MyOscillator;
}

class MyOscillator {
    player: Tone.Synth<Tone.SynthOptions>;
    constructor() {
        this.player = new Tone.Synth().toDestination();
    }

    play(freq: number) {
        try {
          this.player.triggerAttackRelease(freq, "8n");
        } catch (e) {
        }
    }
}

export const CircuitPage: React.FC<ComponentProps> = (props: ComponentProps) => {
    //See annotations in JS for more information
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.background(0);
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(
            canvasParentRef
        );
        for (let i = 0; i < 1; i++) {
            state.push({
                vec: p5.createVector(
                    getRandomInt(p5.windowWidth),
                    getRandomInt(p5.windowHeight / 2)
                ),
                velocity: p5.createVector(
                    getRandomInt(20) - 10,
                    getRandomInt(2)
                ),
                acc: p5.createVector(0, 0.4),
                osc: new MyOscillator(),
            });
            // state.osc.start();
        }
        Tone.context.resume();
        p5.frameRate(60);
    };

    let released = true;
    let count = 0;

    function mouseReleased() {
        released = true;
    }
    let pressed = false;
    const mousePressed = (p5: p5Types) => {
        if (!released) {
            return;
        }
        pressed = true;
        released = false;
    };
    function playOscillator(state: State, flag = false) {
        if (!flag) {
            state.osc.play(Math.abs(state.velocity.y) * 30);
        } else {
            state.osc.play(Math.abs(state.velocity.x) * 30);
        }
    }

    function updateState(p5: p5Types, state: State) {
        state.velocity.add(state.acc);
        state.vec.add(state.velocity);

        if (state.vec.y + 50 >= p5.windowHeight) {
            if (state.velocity.y >= 2) {
                playOscillator(state);
            }
            state.velocity.y *= -0.6;
            state.vec.y = p5.windowHeight - 50;
        }

        if (state.vec.x + 50 >= p5.windowWidth) {
            playOscillator(state, true);
            state.velocity.x *= -0.2;
            state.vec.x = p5.windowWidth - 50;
        }

        if (state.vec.x <= 0) {
            playOscillator(state, true);
            state.velocity.x *= -0.2;
            state.vec.x = 0;
        }
    }

    function renderState(p5: p5Types, state: State) {
        p5.noFill();
        p5.stroke(255);
        p5.ellipse(state.vec.x, state.vec.y, 50, 50);
    }

    const draw = (p5: p5Types) => {
        p5.background(0);

        if (!pressed) {
            p5.textSize(32);
            p5.textAlign(p5.CENTER, p5.CENTER);
            p5.fill(255);
            p5.text(
                "Click to start sound",
                p5.windowWidth / 2,
                p5.windowHeight / 2
            );
        } else {
            p5.textSize(32);
            p5.textAlign(p5.CENTER, p5.CENTER);
            p5.fill(255);
            p5.text("「○」", p5.windowWidth / 2, p5.windowHeight / 2);
        }
        state.forEach((s) => {
            renderState(p5, s);
            updateState(p5, s);
        });
        count++;
        if (count % 100 === 0) {
            for (let i = 0; i < 1; i++) {
                const data = {
                    vec: p5.createVector(
                        getRandomInt(p5.windowWidth),
                        getRandomInt(p5.windowHeight / 2)
                    ),
                    velocity: p5.createVector(
                        getRandomInt(20) - 10,
                        getRandomInt(2)
                    ),
                    acc: p5.createVector(0, 0.4),
                    osc: new MyOscillator(),
                };
                state.push(data);
            }
        }
        if (count % 40000 === 0) {
            state = [];
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
