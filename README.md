# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:



template
```ts
export const RectSound2Page: React.FC<ComponentProps> = (
    props: ComponentProps
) => {
    //See annotations in JS for more information
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(
            canvasParentRef
        );
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

export const RectSound2Page: React.FC<ComponentProps> = (
    props: ComponentProps
) => {
    //See annotations in JS for more information
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(
            canvasParentRef
        );
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
```