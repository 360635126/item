/*
R
modified from liusen
load dependency
"cbit": "file:../pxt-cbit"
*/



//% color="#C814B8" weight=25 icon="\uf1d4"
namespace Aibot_灯光{
    
    // export enum enColor {

    //     //% blockId="OFF" block="灭"
    //     OFF = 0,
    //     //% blockId="Red" block="红色"
    //     Red,
    //     //% blockId="Green" block="绿色"
    //     Green,
    //     //% blockId="Blue" block="蓝色"
    //     Blue,
    //     //% blockId="White" block="白色"
    //     White,
    //     //% blockId="Cyan" block="青色"
    //     Cyan,
    //     //% blockId="Pinkish" block="品红"
    //     Pinkish,
    //     //% blockId="Green" block="黄色"
    //     Yellow,

    // }
    // export enum enLED1 {
        
    //     //% blockId="OFF" block="灭"
    //     OFF = 0,
    //     //% blockId="ON" block="亮"
    //     ON =1
    // }

    // //% blockId=cbit_LED1 block="LED灯|引脚 %pin|状态 %value"
    // //% weight=5
    // //% blockGap=8
    // //% color="#C814B8"
    // //% name.fieldEditor="gridpicker" name.fieldOptions.columns=1
    // export function LED1(pin: DigitalPin, value: enLED1): void {

    //     pins.digitalWritePin(pin, value);

    // }

    // //% blockId=cbit_LED2 block="LED灯|引脚 %pin|亮度 %value"
    // //% weight=4
    // //% blockGap=8
    // //% color="#C814B8"
    // //% value.min=0 value.max=255
    // //% name.fieldEditor="gridpicker" name.fieldOptions.columns=2
    // export function LED2(pin: AnalogPin, value: number): void {

    //     pins.analogWritePin(pin, value * 1024 / 256);

    // }

    // //% blockId=cbit_BreathLED block="呼吸灯|引脚 %pin"
    // //% weight=3
    // //% blockGap=8
    // //% color="#C814B8"
    // //% name.fieldEditor="gridpicker" name.fieldOptions.columns=3
    // export function BreathLED(pin: AnalogPin): void {

    //     for (let i: number = 0; i < 1023; i++) {
    //         pins.analogWritePin(pin, i);
    //         //basic.pause(1);
    //         control.waitMicros(1000);
    //     }
    //     basic.pause(10);
    //     for (let i: number = 1023; i > 0; i--) {
    //         pins.analogWritePin(pin, i);
    //         //basic.pause(1);
    //         control.waitMicros(1000);
    //     }

    // }

    // //% blockId=cbit_RGB block="RGB七彩灯|引脚R %pin1|引脚G %pin2|引脚B %pin3|红色 %value1|绿色 %value2|蓝色 %value3"
    // //% weight=2
    // //% blockGap=8
    // //% color="#C814B8"
    // //% value1.min=0 value1.max=255 value2.min=0 value2.max=255 value3.min=0 value3.max=255
    // //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    // export function RGB(pin1: AnalogPin, pin2: AnalogPin, pin3: AnalogPin, value1: number, value2: number, value3: number): void {

    //     pins.analogWritePin(pin1, value1 * 1024 / 256);
    //     pins.analogWritePin(pin2, value2 * 1024 / 256);
    //     pins.analogWritePin(pin3, value3 * 1024 / 256);

    // }
    // //% blockId=cbit_RGB2 block="RGB七彩灯|引脚R %pin1|引脚G %pin2|引脚B %pin3|显示 %value"
    // //% weight=1
    // //% blockGap=8
    // //% color="#C814B8"
    // //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    // export function RGB2(pin1: DigitalPin, pin2: DigitalPin, pin3: DigitalPin, value: enColor): void {

    //     switch (value) {
    //         case enColor.OFF: {
    //             pins.digitalWritePin(pin1, 0);
    //             pins.digitalWritePin(pin2, 0);
    //             pins.digitalWritePin(pin3, 0);
    //             break;
    //         }
    //         case enColor.Red: {
    //             pins.digitalWritePin(pin1, 1);
    //             pins.digitalWritePin(pin2, 0);
    //             pins.digitalWritePin(pin3, 0);
    //             break;
    //         }
    //         case enColor.Green: {
    //             pins.digitalWritePin(pin1, 0);
    //             pins.digitalWritePin(pin2, 1);
    //             pins.digitalWritePin(pin3, 0);
    //             break;
    //         }
    //         case enColor.Blue: {
    //             pins.digitalWritePin(pin1, 0);
    //             pins.digitalWritePin(pin2, 0);
    //             pins.digitalWritePin(pin3, 1);
    //             break;
    //         }
    //         case enColor.White: {
    //             pins.digitalWritePin(pin1, 1);
    //             pins.digitalWritePin(pin2, 1);
    //             pins.digitalWritePin(pin3, 1);
    //             break;
    //         }
    //         case enColor.Cyan: {
    //             pins.digitalWritePin(pin1, 0);
    //             pins.digitalWritePin(pin2, 1);
    //             pins.digitalWritePin(pin3, 1);
    //             break;
    //         }
    //         case enColor.Pinkish: {
    //             pins.digitalWritePin(pin1, 1);
    //             pins.digitalWritePin(pin2, 0);
    //             pins.digitalWritePin(pin3, 1);
    //             break;
    //         }
    //         case enColor.Yellow: {
    //             pins.digitalWritePin(pin1, 1);
    //             pins.digitalWritePin(pin2, 1);
    //             pins.digitalWritePin(pin3, 0);
    //             break;
    //         }
    //     }

    // }
    let initialized = false
    const PCA9685_ADD = 0x41
    const MODE1 = 0x00
    const PRESCALE = 0xFE
    const LED0_ON_L = 0x06
    let yahStrip: neopixel.Strip;
    export enum enColor {

        //% blockId="OFF" block="灭"
        OFF = 0,
        //% blockId="Red" block="红色"
        Red,
        //% blockId="Green" block="绿色"
        Green,
        //% blockId="Blue" block="蓝色"
        Blue,
        //% blockId="White" block="白色"
        White,
        //% blockId="Cyan" block="青色"
        Cyan,
        //% blockId="Pinkish" block="品红"
        Pinkish,
        //% blockId="Green" block="黄色"
        Yellow,

    }
    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }
    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }
    function setFreq(freq: number): void {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        let oldmode = i2cread(PCA9685_ADD, MODE1);
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        i2cwrite(PCA9685_ADD, MODE1, newmode); // go to sleep
        i2cwrite(PCA9685_ADD, PRESCALE, prescale); // set the prescaler
        i2cwrite(PCA9685_ADD, MODE1, oldmode);
        control.waitMicros(5000);
        i2cwrite(PCA9685_ADD, MODE1, oldmode | 0xa1);
    }
    function initPCA9685(): void {
        i2cwrite(PCA9685_ADD, MODE1, 0x00)
        setFreq(50);
        initialized = true
    }
    function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15)
            return;
        if (!initialized) {
            initPCA9685();
        }
        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADD, buf);
    }
    /**
     * *****************************************************************
     * @param index
     */
    //% blockId=cbit_RGB_Car_Big2 block="小车RGB探照灯|选择车灯颜色 %value"
    //% weight=101
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Big2(value: enColor): void {

        switch (value) {
            case enColor.OFF: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 0);
                setPwm(2, 0, 0);
                break;
            }
            case enColor.Red: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 0);
                setPwm(2, 0, 0);
                break;
            }
            case enColor.Green: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 0);
                break;
            }
            case enColor.Blue: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 0);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.White: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.Cyan: {
                setPwm(0, 0, 0);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.Pinkish: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 0);
                setPwm(2, 0, 4095);
                break;
            }
            case enColor.Yellow: {
                setPwm(0, 0, 4095);
                setPwm(1, 0, 4095);
                setPwm(2, 0, 0);
                break;
            }
        }
    }
    //% blockId=cbit_RGB_Car_Big block="小车RGB探照灯|红色 %value1|绿色 %value2|蓝色 %value3"
    //% weight=100
    //% blockGap=10
    //% color="#C814B8"
    //% value1.min=0 value1.max=255 value2.min=0 value2.max=255 value3.min=0 value3.max=255
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Big(value1: number, value2: number, value3: number): void {

        let R = value1 * 16;
        let G = value2 * 16;
        let B = value3 * 16;

        if (R > 4096)
            R = 4095;
        if (G > 4096)
            G = 4095;
        if (B > 4096)
            B = 4095;

        setPwm(0, 0, R);
        setPwm(1, 0, G);
        setPwm(2, 0, B);

    }
       //% blockId=cbit_RGB_Car_Program block="七彩流水灯"
    //% weight=99
    //% blockGap=10
    //% color="#C814B8"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function RGB_Car_Program(): neopixel.Strip {
         
        if (!yahStrip) {
            yahStrip = neopixel.create(DigitalPin.P16, 3, NeoPixelMode.RGB);
        }
        return yahStrip;  
    }


    
        buf: Buffer;
        pin: DigitalPin;
        // TODO: encode as bytes instead of 32bit
        brightness: number;
        start: number; // start offset in LED strip
        _length: number; // number of LEDs
        _mode: NeoPixelMode;
        _matrixWidth: number; // number of leds in a matrix - if any

        /**
         * Shows all LEDs to a given color (range 0-255 for r, g, b).
         * @param rgb RGB color of the LED
         */
        //% blockId="neopixel_set_strip_color" block="%strip|show color %rgb=neopixel_colors"
        //% strip.defl=strip
        //% weight=85 blockGap=8
        //% parts="neopixel"
        export function showColor(rgb: number) {
            rgb = rgb >> 0;
            this.setAllRGB(rgb);
            this.show();
        }

        /**
         * Shows a rainbow pattern on all LEDs.
         * @param startHue the start hue value for the rainbow, eg: 1
         * @param endHue the end hue value for the rainbow, eg: 360
         */
        //% blockId="neopixel_set_strip_rainbow" block="%strip|show rainbow from %startHue|to %endHue"
        //% strip.defl=strip
        //% weight=85 blockGap=8
        //% parts="neopixel"
        export function showRainbow(startHue: number = 1, endHue: number = 360) {
            if (this._length <= 0) return;

            startHue = startHue >> 0;
            endHue = endHue >> 0;
            const saturation = 100;
            const luminance = 50;
            const steps = this._length;
            const direction = HueInterpolationDirection.Clockwise;

            //hue
            const h1 = startHue;
            const h2 = endHue;
            const hDistCW = ((h2 + 360) - h1) % 360;
            const hStepCW = Math.idiv((hDistCW * 100), steps);
            const hDistCCW = ((h1 + 360) - h2) % 360;
            const hStepCCW = Math.idiv(-(hDistCCW * 100), steps);
            let hStep: number;
            if (direction === HueInterpolationDirection.Clockwise) {
                hStep = hStepCW;
            } else if (direction === HueInterpolationDirection.CounterClockwise) {
                hStep = hStepCCW;
            } else {
                hStep = hDistCW < hDistCCW ? hStepCW : hStepCCW;
            }
            const h1_100 = h1 * 100; //we multiply by 100 so we keep more accurate results while doing interpolation

            //sat
            const s1 = saturation;
            const s2 = saturation;
            const sDist = s2 - s1;
            const sStep = Math.idiv(sDist, steps);
            const s1_100 = s1 * 100;

            //lum
            const l1 = luminance;
            const l2 = luminance;
            const lDist = l2 - l1;
            const lStep = Math.idiv(lDist, steps);
            const l1_100 = l1 * 100

            //interpolate
            if (steps === 1) {
                this.setPixelColor(0, hsl(h1 + hStep, s1 + sStep, l1 + lStep))
            } else {
                this.setPixelColor(0, hsl(startHue, saturation, luminance));
                for (let i = 1; i < steps - 1; i++) {
                    const h = Math.idiv((h1_100 + i * hStep), 100) + 360;
                    const s = Math.idiv((s1_100 + i * sStep), 100);
                    const l = Math.idiv((l1_100 + i * lStep), 100);
                    this.setPixelColor(i, hsl(h, s, l));
                }
                this.setPixelColor(steps - 1, hsl(endHue, saturation, luminance));
            }
            this.show();
        }

        /**
         * Displays a vertical bar graph based on the `value` and `high` value.
         * If `high` is 0, the chart gets adjusted automatically.
         * @param value current value to plot
         * @param high maximum value, eg: 255
         */
        //% weight=84
        //% blockId=neopixel_show_bar_graph block="%strip|show bar graph of %value|up to %high"
        //% strip.defl=strip
        //% icon="\uf080"
        //% parts="neopixel"
        export function showBarGraph(value: number, high: number): void {
            if (high <= 0) {
                this.clear();
                this.setPixelColor(0, NeoPixelColors.Yellow);
                this.show();
                return;
            }

            value = Math.abs(value);
            const n = this._length;
            const n1 = n - 1;
            let v = Math.idiv((value * n), high);
            if (v == 0) {
                this.setPixelColor(0, 0x666600);
                for (let i = 1; i < n; ++i)
                    this.setPixelColor(i, 0);
            } else {
                for (let i = 0; i < n; ++i) {
                    if (i <= v) {
                        const b = Math.idiv(i * 255, n1);
                        this.setPixelColor(i, neopixel.rgb(b, 0, 255 - b));
                    }
                    else this.setPixelColor(i, 0);
                }
            }
            this.show();
        }

        /**
         * Set LED to a given color (range 0-255 for r, g, b).
         * You need to call ``show`` to make the changes visible.
         * @param pixeloffset position of the NeoPixel in the strip
         * @param rgb RGB color of the LED
         */
        //% blockId="neopixel_set_pixel_color" block="%strip|set pixel color at %pixeloffset|to %rgb=neopixel_colors"
        //% strip.defl=strip
        //% blockGap=8
        //% weight=80
        //% parts="neopixel" advanced=true
        export function setPixelColor(pixeloffset: number, rgb: number): void {
            this.setPixelRGB(pixeloffset >> 0, rgb >> 0);
        }

        /**
         * Sets the number of pixels in a matrix shaped strip
         * @param width number of pixels in a row
         */
        //% blockId=neopixel_set_matrix_width block="%strip|set matrix width %width"
        //% strip.defl=strip
        //% blockGap=8
        //% weight=5
        //% parts="neopixel" advanced=true
        export function setMatrixWidth(width: number) {
            this._matrixWidth = Math.min(this._length, width >> 0);
        }

        /**
         * Set LED to a given color (range 0-255 for r, g, b) in a matrix shaped strip
         * You need to call ``show`` to make the changes visible.
         * @param x horizontal position
         * @param y horizontal position
         * @param rgb RGB color of the LED
         */
        //% blockId="neopixel_set_matrix_color" block="%strip|set matrix color at x %x|y %y|to %rgb=neopixel_colors"
        //% strip.defl=strip
        //% weight=4
        //% parts="neopixel" advanced=true
        export function setMatrixColor(x: number, y: number, rgb: number) {
            if (this._matrixWidth <= 0) return; // not a matrix, ignore
            x = x >> 0;
            y = y >> 0;
            rgb = rgb >> 0;
            const cols = Math.idiv(this._length, this._matrixWidth);
            if (x < 0 || x >= this._matrixWidth || y < 0 || y >= cols) return;
            let i = x + y * this._matrixWidth;
            this.setPixelColor(i, rgb);
        }

        /**
         * For NeoPixels with RGB+W LEDs, set the white LED brightness. This only works for RGB+W NeoPixels.
         * @param pixeloffset position of the LED in the strip
         * @param white brightness of the white LED
         */
        //% blockId="neopixel_set_pixel_white" block="%strip|set pixel white LED at %pixeloffset|to %white"
        //% strip.defl=strip
        //% blockGap=8
        //% weight=80
        //% parts="neopixel" advanced=true
        export function setPixelWhiteLED(pixeloffset: number, white: number): void {
            if (this._mode === NeoPixelMode.RGBW) {
                this.setPixelW(pixeloffset >> 0, white >> 0);
            }
        }

        /**
         * Send all the changes to the strip.
         */
        //% blockId="neopixel_show" block="%strip|show" blockGap=8
        //% strip.defl=strip
        //% weight=79
        //% parts="neopixel"
        export function show() {
            // only supported in beta
            // ws2812b.setBufferMode(this.pin, this._mode);
            ws2812b.sendBuffer(this.buf, this.pin);
        }

        /**
         * Turn off all LEDs.
         * You need to call ``show`` to make the changes visible.
         */
        //% blockId="neopixel_clear" block="%strip|clear"
        //% strip.defl=strip
        //% weight=76
        //% parts="neopixel"
        export function clear(): void {
            const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
            this.buf.fill(0, this.start * stride, this._length * stride);
        }

        /**
         * Gets the number of pixels declared on the strip
         */
        //% blockId="neopixel_length" block="%strip|length" blockGap=8
        //% strip.defl=strip
        //% weight=60 advanced=true
        export function length() {
            return this._length;
        }

        /**
         * Set the brightness of the strip. This flag only applies to future operation.
         * @param brightness a measure of LED brightness in 0-255. eg: 255
         */
        //% blockId="neopixel_set_brightness" block="%strip|set brightness %brightness" blockGap=8
        //% strip.defl=strip
        //% weight=59
        //% parts="neopixel" advanced=true
        export function setBrightness(brightness: number): void {
            this.brightness = brightness & 0xff;
        }

        /**
         * Apply brightness to current colors using a quadratic easing function.
         **/
        //% blockId="neopixel_each_brightness" block="%strip|ease brightness" blockGap=8
        //% strip.defl=strip
        //% weight=58
        //% parts="neopixel" advanced=true
        export function easeBrightness(): void {
            const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
            const br = this.brightness;
            const buf = this.buf;
            const end = this.start + this._length;
            const mid = Math.idiv(this._length, 2);
            for (let i = this.start; i < end; ++i) {
                const k = i - this.start;
                const ledoffset = i * stride;
                const br = k > mid
                    ? Math.idiv(255 * (this._length - 1 - k) * (this._length - 1 - k), (mid * mid))
                    : Math.idiv(255 * k * k, (mid * mid));
                const r = (buf[ledoffset + 0] * br) >> 8; buf[ledoffset + 0] = r;
                const g = (buf[ledoffset + 1] * br) >> 8; buf[ledoffset + 1] = g;
                const b = (buf[ledoffset + 2] * br) >> 8; buf[ledoffset + 2] = b;
                if (stride == 4) {
                    const w = (buf[ledoffset + 3] * br) >> 8; buf[ledoffset + 3] = w;
                }
            }
        }

        /**
         * Create a range of LEDs.
         * @param start offset in the LED strip to start the range
         * @param length number of LEDs in the range. eg: 4
         */
        //% weight=89
        //% blockId="neopixel_range" block="%strip|range from %start|with %length|leds"
        //% strip.defl=strip
        //% parts="neopixel"
        //% blockSetVariable=range
        range(start: number, length: number): Strip {
            start = start >> 0;
            length = length >> 0;
            let strip = new Strip();
            strip.buf = this.buf;
            strip.pin = this.pin;
            strip.brightness = this.brightness;
            strip.start = this.start + Math.clamp(0, this._length - 1, start);
            strip._length = Math.clamp(0, this._length - (strip.start - this.start), length);
            strip._matrixWidth = 0;
            strip._mode = this._mode;
            return strip;
        }

        /**
         * Shift LEDs forward and clear with zeros.
         * You need to call ``show`` to make the changes visible.
         * @param offset number of pixels to shift forward, eg: 1
         */
        //% blockId="neopixel_shift" block="%strip|shift pixels by %offset" blockGap=8
        //% strip.defl=strip
        //% weight=40
        //% parts="neopixel"
        shift(offset: number = 1): void {
            offset = offset >> 0;
            const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
            this.buf.shift(-offset * stride, this.start * stride, this._length * stride)
        }

        /**
         * Rotate LEDs forward.
         * You need to call ``show`` to make the changes visible.
         * @param offset number of pixels to rotate forward, eg: 1
         */
        //% blockId="neopixel_rotate" block="%strip|rotate pixels by %offset" blockGap=8
        //% strip.defl=strip
        //% weight=39
        //% parts="neopixel"
        rotate(offset: number = 1): void {
            offset = offset >> 0;
            const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
            this.buf.rotate(-offset * stride, this.start * stride, this._length * stride)
        }

        /**
         * Set the pin where the neopixel is connected, defaults to P0.
         */
        //% weight=10
        //% parts="neopixel" advanced=true
        setPin(pin: DigitalPin): void {
            this.pin = pin;
            pins.digitalWritePin(this.pin, 0);
            // don't yield to avoid races on initialization
        }

        /**
         * Estimates the electrical current (mA) consumed by the current light configuration.
         */
        //% weight=9 blockId=neopixel_power block="%strip|power (mA)"
        //% strip.defl=strip
        //% advanced=true
        power(): number {
            const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
            const end = this.start + this._length;
            let p = 0;
            for (let i = this.start; i < end; ++i) {
                const ledoffset = i * stride;
                for (let j = 0; j < stride; ++j) {
                    p += this.buf[i + j];
                }
            }
            return Math.idiv(this.length() * 7, 10) /* 0.7mA per neopixel */
                + Math.idiv(p * 480, 10000); /* rought approximation */
        }

        private setBufferRGB(offset: number, red: number, green: number, blue: number): void {
            if (this._mode === NeoPixelMode.RGB_RGB) {
                this.buf[offset + 0] = red;
                this.buf[offset + 1] = green;
            } else {
                this.buf[offset + 0] = green;
                this.buf[offset + 1] = red;
            }
            this.buf[offset + 2] = blue;
        }

        private setAllRGB(rgb: number) {
            let red = unpackR(rgb);
            let green = unpackG(rgb);
            let blue = unpackB(rgb);

            const br = this.brightness;
            if (br < 255) {
                red = (red * br) >> 8;
                green = (green * br) >> 8;
                blue = (blue * br) >> 8;
            }
            const end = this.start + this._length;
            const stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
            for (let i = this.start; i < end; ++i) {
                this.setBufferRGB(i * stride, red, green, blue)
            }
        }
        private setAllW(white: number) {
            if (this._mode !== NeoPixelMode.RGBW)
                return;

            let br = this.brightness;
            if (br < 255) {
                white = (white * br) >> 8;
            }
            let buf = this.buf;
            let end = this.start + this._length;
            for (let i = this.start; i < end; ++i) {
                let ledoffset = i * 4;
                buf[ledoffset + 3] = white;
            }
        }
        private setPixelRGB(pixeloffset: number, rgb: number): void {
            if (pixeloffset < 0
                || pixeloffset >= this._length)
                return;

            let stride = this._mode === NeoPixelMode.RGBW ? 4 : 3;
            pixeloffset = (pixeloffset + this.start) * stride;

            let red = unpackR(rgb);
            let green = unpackG(rgb);
            let blue = unpackB(rgb);

            let br = this.brightness;
            if (br < 255) {
                red = (red * br) >> 8;
                green = (green * br) >> 8;
                blue = (blue * br) >> 8;
            }
            this.setBufferRGB(pixeloffset, red, green, blue)
        }
        private setPixelW(pixeloffset: number, white: number): void {
            if (this._mode !== NeoPixelMode.RGBW)
                return;

            if (pixeloffset < 0
                || pixeloffset >= this._length)
                return;

            pixeloffset = (pixeloffset + this.start) * 4;

            let br = this.brightness;
            if (br < 255) {
                white = (white * br) >> 8;
            }
            let buf = this.buf;
            buf[pixeloffset + 3] = white;
        }
    

   
}
/*****************************************************************************************************************************************
 *  传感器类 ***************************************************************************************************************************** 
 ****************************************************************************************************************************************/

//% color="#87CEEB" weight=24 icon="\uf1b6"
namespace Aibot_传感器 {

//     export enum enVoice {
//         //% blockId="Voice" block="有声音"
//         Voice = 0,
//         //% blockId="NoVoice" block="无声音"
//         NoVoice = 1
//     }

//     export enum enIR {
//         //% blockId="Get" block="检测到"
//         Get = 0,
//         //% blockId="NoVoice" block="未检测"
//         NoGet = 1
//     }
    

//     //% blockId=cbit_Voice_Sensor block="声音传感器|引脚 %pin|返回 %value"
//     //% weight=100
//     //% blockGap=10
//     //% color="#87CEEB"
//     //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
//     export function Voice_Sensor(pin: DigitalPin, value: enVoice): boolean {

//         pins.setPull(pin, PinPullMode.PullUp);
//         if (pins.digitalReadPin(pin) == value) {
//             return true;
//         }
//         else {
//             return false;
//         }

//     }

//     function IR_send_38k() {
//         for (let i: number = 0; i < 8; i++) {
//             pins.digitalWritePin(DigitalPin.P9, 1);
//             control.waitMicros(13);
//             pins.digitalWritePin(DigitalPin.P9, 0);
//             control.waitMicros(13);
//         }
//     }
//     //% blockId=cbit_IR_Sensor block="红外传感器|引脚 %pin|  |%value|障碍物"
//     //% weight=100
//     //% blockGap=10
//     //% color="#87CEEB"
//     //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
//     export function IR_Sensor(pin: DigitalPin, value: enIR): boolean {

//         pins.setPull(pin, PinPullMode.PullUp);
//         //IR_send_38k();
//         if (pins.digitalReadPin(pin) == value) {
//             return true;
//         }
//         else {
//             return false;
//         }

//     }

//     //% blockId=cbit_IR_Send block="红外发射|引脚 %pin"
//     //% weight=100
//     //% blockGap=10
//     //% color="#87CEEB"
//     //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
//     export function IR_Send(pin: DigitalPin): void {

        
//         IR_send_38k();

//     }
   
//     //% blockId=cbit_ultrasonic block="超声波|发射管脚 %Trig|接收管脚 %Echo"
//     //% color="#87CEEB"
//     //% weight=100
//     //% blockGap=10
//     //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
//     export function Ultrasonic(Trig: DigitalPin, Echo: DigitalPin): number {

//         // send pulse
//         pins.setPull(Trig, PinPullMode.PullNone);
//         pins.digitalWritePin(Trig, 0);
//         control.waitMicros(2);
//         pins.digitalWritePin(Trig, 1);
//         control.waitMicros(10);
//         pins.digitalWritePin(Trig, 0);

//         // read pulse
//         let d = pins.pulseIn(Echo, PulseValue.High, 23200);
//         return d / 58;
//     }
    
    //% blockId=cbit_ultrasonic_car block="超声波传感器距离（cm）"
    //% color="#87CEEB"
    //% weight=98
    //% blockGap=10
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Ultrasonic_Car(): number {

        // send pulse
        pins.setPull(DigitalPin.P14, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P14, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P14, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P14, 0);

        // read pulse
        let d = pins.pulseIn(DigitalPin.P15, PulseValue.High, 43200);
        return d / 58;
    }

    export enum enPos {

        //% blockId="LeftState" block="左边"
        LeftState = 1,
        //% blockId="RightState" block="右边"
        RightState = 0
    }
    export enum enLineState {
        //% blockId="White" block="白"
        White = 0,
        //% blockId="Black" block="黑"
        Black = 1

    }

    let initialized = false
    const LED0_ON_L = 0x06
    const PCA9685_ADD = 0x41
    const MODE1 = 0x00
    const PRESCALE = 0xFE

    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    function setFreq(freq: number): void {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        let oldmode = i2cread(PCA9685_ADD, MODE1);
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        i2cwrite(PCA9685_ADD, MODE1, newmode); // go to sleep
        i2cwrite(PCA9685_ADD, PRESCALE, prescale); // set the prescaler
        i2cwrite(PCA9685_ADD, MODE1, oldmode);
        control.waitMicros(5000);
        i2cwrite(PCA9685_ADD, MODE1, oldmode | 0xa1);
    }
    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }
    function initPCA9685(): void {
        i2cwrite(PCA9685_ADD, MODE1, 0x00)
        setFreq(50);
        initialized = true
    }
    function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15)
            return;
        if (!initialized) {
            initPCA9685();
        }
        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADD, buf);
    }


    //% blockId=cbit_Line_Sensor block="巡线传感器|检测到 %direct|为 %value"
    //% weight=94
    //% blockGap=10
    //% color="#87CEEB"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    export function Line_Sensor(direct: enPos, value: enLineState): boolean {

        let temp: boolean = false;

        switch (direct) {
            case enPos.LeftState: {
                if (pins.analogReadPin(AnalogPin.P1) < 500) {
                    if (value == enLineState.White) {
                        temp = true;
                    }
                    setPwm(7, 0, 4095);
                }
                else {
                    if (value == enLineState.Black) {
                        temp = true;
                    }
                    setPwm(7, 0, 0);
                }
                break;
            }

            case enPos.RightState: {
                if (pins.analogReadPin(AnalogPin.P2) < 500) {
                    if (value == enLineState.White) {
                        temp = true;
                    }
                    setPwm(6, 0, 4095);
                }
                else {
                    if (value == enLineState.Black) {
                        temp = true;
                    }
                    setPwm(6, 0, 0);
                }
                break;
            }
        }
        return temp;

    }



}
/*****************************************************************************************************************************************
 *    音乐类 *****************************************************************************************************************************
 ****************************************************************************************************************************************/

//% color="#D2691E" weight=22 icon="\uf001"
namespace Aibot_声音 {
   
    export enum enMusic {

        dadadum = 0,
        entertainer,
        prelude,
        ode,
        nyan,
        ringtone,
        funk,
        blues,

        birthday,
        wedding,
        funereal,
        punchline,
        baddy,
        chase,
        ba_ding,
        wawawawaa,
        jump_up,
        jump_down,
        power_up,
        power_down
    }
    
    //% blockId=cbit_Music_Car block="Aibot小车播放音乐|%index"
    //% weight=97
    //% blockGap=10
    //% color="#D2691E"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=4
    export function Music_Car(index: enMusic): void {
        switch (index) {
            case enMusic.dadadum: music.beginMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once); break;
            case enMusic.birthday: music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once); break;
            case enMusic.entertainer: music.beginMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once); break;
            case enMusic.prelude: music.beginMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once); break;
            case enMusic.ode: music.beginMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once); break;
            case enMusic.nyan: music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once); break;
            case enMusic.ringtone: music.beginMelody(music.builtInMelody(Melodies.Ringtone), MelodyOptions.Once); break;
            case enMusic.funk: music.beginMelody(music.builtInMelody(Melodies.Funk), MelodyOptions.Once); break;
            case enMusic.blues: music.beginMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.Once); break;
            case enMusic.wedding: music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once); break;
            case enMusic.funereal: music.beginMelody(music.builtInMelody(Melodies.Funeral), MelodyOptions.Once); break;
            case enMusic.punchline: music.beginMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.Once); break;
            case enMusic.baddy: music.beginMelody(music.builtInMelody(Melodies.Baddy), MelodyOptions.Once); break;
            case enMusic.chase: music.beginMelody(music.builtInMelody(Melodies.Chase), MelodyOptions.Once); break;
            case enMusic.ba_ding: music.beginMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once); break;
            case enMusic.wawawawaa: music.beginMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once); break;
            case enMusic.jump_up: music.beginMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once); break;
            case enMusic.jump_down: music.beginMelody(music.builtInMelody(Melodies.JumpDown), MelodyOptions.Once); break;
            case enMusic.power_up: music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once); break;
            case enMusic.power_down: music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once); break;
        }
    }
}
/*****************************************************************************************************************************************
 *    小车类*****************************************************************************************************************************
 ****************************************************************************************************************************************/
//% color="#006400" weight=20 icon="\uf1b9"
namespace Aibot_运动 {

    const PCA9685_ADD = 0x41
    const MODE1 = 0x00
    const MODE2 = 0x01
    const SUBADR1 = 0x02
    const SUBADR2 = 0x03
    const SUBADR3 = 0x04

    const LED0_ON_L = 0x06
    const LED0_ON_H = 0x07
    const LED0_OFF_L = 0x08
    const LED0_OFF_H = 0x09

    const ALL_LED_ON_L = 0xFA
    const ALL_LED_ON_H = 0xFB
    const ALL_LED_OFF_L = 0xFC
    const ALL_LED_OFF_H = 0xFD

    const PRESCALE = 0xFE

    let initialized = false
    let yahStrip: neopixel.Strip;

    export enum enColor {

        //% blockId="OFF" block="灭"
        OFF = 0,
        //% blockId="Red" block="红色"
        Red,
        //% blockId="Green" block="绿色"
        Green,
        //% blockId="Blue" block="蓝色"
        Blue,
        //% blockId="White" block="白色"
        White,
        //% blockId="Cyan" block="青色"
        Cyan,
        //% blockId="Pinkish" block="品红"
        Pinkish,
        //% blockId="Green" block="黄色"
        Yellow,

    }
    export enum enMusic {

        dadadum = 0,
        entertainer,
        prelude,
        ode,
        nyan,
        ringtone,
        funk,
        blues,

        birthday,
        wedding,
        funereal,
        punchline,
        baddy,
        chase,
        ba_ding,
        wawawawaa,
        jump_up,
        jump_down,
        power_up,
        power_down
    }
    export enum enPos {

        //% blockId="LeftState" block="左边状态"
        LeftState = 1,
        //% blockId="RightState" block="右边状态"
        RightState = 0
    }

    export enum enLineState {
        //% blockId="White" block="白线"
        White = 0,
        //% blockId="Black" block="黑线"
        Black = 1

    }
    
    export enum enAvoidState {
        //% blockId="OBSTACLE" block="有障碍物"
        OBSTACLE = 0,
        //% blockId="NOOBSTACLE" block="无障碍物"
        NOOBSTACLE = 1

    }

    
    export enum enServo {
        
        S1 = 1,
        S2,
        S3
    }
    export enum CarState {
        //% blockId="Car_Run" block="前行"
        Car_Run = 1,
        //% blockId="Car_Back" block="后退"
        Car_Back = 2,
        //% blockId="Car_Left" block="左转"
        Car_Left = 3,
        //% blockId="Car_Right" block="右转"
        Car_Right = 4,
        //% blockId="Car_Stop" block="停止"
        Car_Stop = 5,
        //% blockId="Car_SpinLeft" block="原地左旋"
        Car_SpinLeft = 6,
        //% blockId="Car_SpinRight" block="原地右旋"
        Car_SpinRight = 7         
    }
    export enum AloneState {
        //% blockId="Right_Z_Motor" block="右侧电机正转"
        Right_Z_Motor = 1,
        //% blockId="Right_F_Motor" block="右侧电机反转"
        Right_F_Motor = 2,
        //% blockId="Left_Z_Motor" block="左侧电机正转"
        Left_Z_Motor = 3,
        //% blockId="Left_F_Motor" block="左侧电机反转"
        Left_F_Motor = 4       
    }

    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2ccmd(addr: number, value: number) {
        let buf = pins.createBuffer(1)
        buf[0] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    function initPCA9685(): void {
        i2cwrite(PCA9685_ADD, MODE1, 0x00)
        setFreq(50);
        initialized = true
    }

    function setFreq(freq: number): void {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        let oldmode = i2cread(PCA9685_ADD, MODE1);
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        i2cwrite(PCA9685_ADD, MODE1, newmode); // go to sleep
        i2cwrite(PCA9685_ADD, PRESCALE, prescale); // set the prescaler
        i2cwrite(PCA9685_ADD, MODE1, oldmode);
        control.waitMicros(5000);
        i2cwrite(PCA9685_ADD, MODE1, oldmode | 0xa1);
    }

    function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15)
            return;
        if (!initialized) {
            initPCA9685();
        }
        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADD, buf);
    }


    function Car_run(speed: number) {

        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096) {
            speed = 4095
        }
        if (speed <= 350) {
            speed = 350
        }

        setPwm(12, 0, speed);
        setPwm(13, 0, 0);

        setPwm(15, 0, speed);
        setPwm(14, 0, 0);
        //pins.digitalWritePin(DigitalPin.P16, 1);
       // pins.analogWritePin(AnalogPin.P1, 1023-speed); //速度控制

       // pins.analogWritePin(AnalogPin.P0, speed);//速度控制
       // pins.digitalWritePin(DigitalPin.P8, 0);
    }
   function Left_Z_run(speed: number) {

        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096) {
            speed = 4095
        }
        if (speed <= 350) {
            speed = 350
        }

        setPwm(12, 0, speed);
        setPwm(13, 0, 0);

        //setPwm(15, 0, 0);
        //setPwm(14, 0, 0);
    }
   function Left_F_run(speed: number) {

        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096) {
            speed = 4095
        }
        if (speed <= 350) {
            speed = 350
        }

        setPwm(12, 0, 0);
        setPwm(13, 0, speed);

        //setPwm(15, 0, 0);
        //setPwm(14, 0, 0);
    }    
     function Right_Z_run(speed: number) {

        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096) {
            speed = 4095
        }
        if (speed <= 350) {
            speed = 350
        }

       // setPwm(12, 0, 0);
       // setPwm(13, 0, 0);

        setPwm(15, 0, speed);
        setPwm(14, 0, 0);
    }
     function Right_F_run(speed: number) {

        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096) {
            speed = 4095
        }
        if (speed <= 350) {
            speed = 350
        }

       // setPwm(12, 0, 0);
       // setPwm(13, 0, 0);

        setPwm(15, 0, 0);
        setPwm(14, 0, speed);
    }    
    function Car_back(speed: number) {

        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096) {
            speed = 4095
        }
        if (speed <= 350 && speed != 0) {
            speed = 350
        }

        setPwm(12, 0, 0);
        setPwm(13, 0, speed);

        setPwm(15, 0, 0);
        setPwm(14, 0, speed);

        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.analogWritePin(AnalogPin.P1, speed); //速度控制

        //pins.analogWritePin(AnalogPin.P0, 1023 - speed);//速度控制
        //pins.digitalWritePin(DigitalPin.P8, 1);
    }

    function Car_left(speed: number) {

        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096) {
            speed = 4095
        }
        if (speed <= 350 && speed != 0) {
            speed = 350
        }
        setPwm(12, 0, 0);
        setPwm(13, 0, 0);

        setPwm(15, 0, speed);
        setPwm(14, 0, 0);

        //pins.analogWritePin(AnalogPin.P0, speed);
        //pins.digitalWritePin(DigitalPin.P8, 0);

        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.digitalWritePin(DigitalPin.P1, 0);
    }

    function Car_right(speed: number) {

        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096) {
            speed = 4095
        }
        if (speed <= 350 && speed != 0) {
            speed = 350
        }
        setPwm(12, 0, speed);
        setPwm(13, 0, 0);

        setPwm(15, 0, 0);
        setPwm(14, 0, 0);
        //pins.digitalWritePin(DigitalPin.P0, 0);
        //pins.digitalWritePin(DigitalPin.P8, 0);

        //pins.digitalWritePin(DigitalPin.P16, 1);
       // pins.analogWritePin(AnalogPin.P1, 1023 - speed);
    }

    function Car_stop() {
       
        setPwm(12, 0, 0);
        setPwm(13, 0, 0);

        setPwm(15, 0, 0);
        setPwm(14, 0, 0);
        //pins.digitalWritePin(DigitalPin.P0, 0);
        //pins.digitalWritePin(DigitalPin.P8, 0);
        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.digitalWritePin(DigitalPin.P1, 0);
    }

    function Car_spinleft(speed: number) {

        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096) {
            speed = 4095
        }
        if (speed <= 350 && speed != 0) {
            speed = 350
        }
        setPwm(12, 0, 0);
        setPwm(13, 0, speed);

        setPwm(15, 0, speed);
        setPwm(14, 0, 0);

        //pins.analogWritePin(AnalogPin.P0, speed);
        //pins.digitalWritePin(DigitalPin.P8, 0);

        //pins.digitalWritePin(DigitalPin.P16, 0);
        //pins.analogWritePin(AnalogPin.P1, speed);
    } 

    function Car_spinright(speed: number) {

        speed = speed * 16; // map 350 to 4096
        if (speed >= 4096) {
            speed = 4095
        }
        if (speed <= 350 && speed != 0) {
            speed = 350
        }
        setPwm(12, 0, speed);
        setPwm(13, 0, 0);

        setPwm(15, 0, 0);
        setPwm(14, 0, speed);
        //pins.analogWritePin(AnalogPin.P0, 1023-speed);
        //pins.digitalWritePin(DigitalPin.P8, 1);

        //pins.digitalWritePin(DigitalPin.P16, 1);
        //pins.analogWritePin(AnalogPin.P1, 1023-speed);

    }

    
    

 


    //% blockId=cbit_Servo_Car block="小车舵机|编号 %num|角度 %value"
    //% weight=96
    //% blockGap=10
    //% color="#006400"
    //% num.min=1 num.max=3 value.min=0 value.max=180
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
    // export function Servo_Car(num: enServo, value: number): void {

    //     // 50hz: 20,000 us
    //     let us = (value * 1800 / 180 + 600); // 0.6 ~ 2.4
    //     let pwm = us * 4096 / 20000;
    //     setPwm(num + 2, 0, pwm);

    // }

    //% blockId=cbit_Avoid_Sensor block="避障传感器|检测到 %value"
    //% weight=95
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=12
    // export function Avoid_Sensor(value: enAvoidState): boolean {

    //     let temp: boolean = false;
    //     pins.digitalWritePin(DigitalPin.P9, 0);
    //     switch (value) {
    //         case enAvoidState.OBSTACLE: {
    //             if (pins.analogReadPin(AnalogPin.P3) < 800) {
                
    //                 temp = true;
    //                 setPwm(8, 0, 0);
    //             }
    //             else {                 
    //                 temp = false;
    //                 setPwm(8, 0, 4095);
    //             }
    //             break;
    //         }

    //         case enAvoidState.NOOBSTACLE: {
    //             if (pins.analogReadPin(AnalogPin.P3) > 800) {

    //                 temp = true;
    //                 setPwm(8, 0, 4095);
    //             }
    //             else {
    //                 temp = false;
    //                 setPwm(8, 0, 0);
    //             }
    //             break;
    //         }
    //     }
    //     pins.digitalWritePin(DigitalPin.P9, 1);
    //     return temp;

    // }

   
    //% blockId=cbit_CarCtrl block="控制Aibot小车|%index"
    //% weight=93
    //% blockGap=10
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarCtrl(index: CarState): void {
        switch (index) {
            case CarState.Car_Run: Car_run(255); break;
            case CarState.Car_Back: Car_back(255); break;
            case CarState.Car_Left: Car_left(255); break;
            case CarState.Car_Right: Car_right(255); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(255); break;
            case CarState.Car_SpinRight: Car_spinright(255); break;
        }
    }
    //% blockId=cbit_CarCtrlSpeed block="控制Aibot小车|%index|速度 %speed"
    //% weight=92
    //% blockGap=10
    //% speed.min=0 speed.max=255
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function CarCtrlSpeed(index: CarState, speed: number): void {
        switch (index) {
            case CarState.Car_Run: Car_run(speed); break;
            case CarState.Car_Back: Car_back(speed); break;
            case CarState.Car_Left: Car_left(speed); break;
            case CarState.Car_Right: Car_right(speed); break;
            case CarState.Car_Stop: Car_stop(); break;
            case CarState.Car_SpinLeft: Car_spinleft(speed); break;
            case CarState.Car_SpinRight: Car_spinright(speed); break;
        }
    }
    //% blockId=cbit_AloneCtrlSpeed block="单独电机|%index|速度 %speed"
    //% weight=91
    //% blockGap=10
    //% speed.min=0 speed.max=255
    //% color="#006400"
    //% name.fieldEditor="gridpicker" name.fieldOptions.columns=10
    export function AloneCtrlSpeed(index: AloneState, speed: number): void {
        switch (index) {
            case AloneState.Right_Z_Motor: Right_Z_run(speed); break;
            case AloneState.Right_F_Motor: Right_F_run(speed); break;
            case AloneState.Left_Z_Motor: Left_Z_run(speed); break;
            case AloneState.Left_F_Motor: Left_F_run(speed); break;
        }
    }    
}

// /*****************************************************************************************************************************************
//  *  输入类 *****************************************************************************************************************************
//  ****************************************************************************************************************************************/

// //% color="#808080" weight=23 icon="\uf11c"
// namespace Aibot_输入类 {

//     export enum enRocker {
//         //% blockId="Nostate" block="无"
//         Nostate = 0,
//         //% blockId="Up" block="上"
//         Up,
//         //% blockId="Down" block="下"
//         Down,
//         //% blockId="Left" block="左"
//         Left,
//         //% blockId="Right" block="右"
//         Right,
//         //% blockId="Press" block="按下"
//         Press
//     }

//     export enum enTouch {
//         //% blockId="NoTouch" block="未触摸"
//         NoTouch = 0,
//         //% blockId="Touch" block="触摸"
//         Touch = 1
//     }
//     export enum enButton {
//         //% blockId="Press" block="按下"
//         Press = 0,
//         //% blockId="Realse" block="松开"
//         Realse = 1
//     }

//     //% blockId=cbit_TouchPad block="触摸开关|引脚 %pin|返回 %value"
//     //% weight=100
//     //% blockGap=10
//     //% color="#808080"
//     //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
//     export function TouchPad(pin: DigitalPin, value: enTouch): boolean {

//         pins.setPull(pin, PinPullMode.PullUp);
//         if (pins.digitalReadPin(pin) == value) {
//             return true;
//         }
//         else {
//             return false;
//         }

//     }
//     //% blockId=cbit_Rocker block="遥杆|VRX %pin1|VRY %pin2|SW %pin3|返回 %value"
//     //% weight=100
//     //% blockGap=10
//     //% color="#808080"
//     //% name.fieldEditor="gridpicker" name.fieldOptions.columns=6
//     export function Rocker(pin1: AnalogPin, pin2: AnalogPin, pin3: AnalogPin, value: enRocker): boolean {

//         //pins.setPull(pin3, PinPullMode.PullUp);
//         let x = pins.analogReadPin(pin1);
//         let y = pins.analogReadPin(pin2);
//         let z = pins.analogReadPin(pin3);
//         let now_state = enRocker.Nostate;

//         if (x <= 20) // 上
//         {

//             now_state = enRocker.Up;

//         }
//         if (x >= 1000) //
//         {

//             now_state = enRocker.Down;
//         }
//         if (y <= 50) //右
//         {
//             now_state = enRocker.Right;
//         }
//         if (y >= 1000) //左
//         {
//             now_state = enRocker.Left;
//         }
//         if (z <= 20)
//             now_state = enRocker.Press;
        
//         if (now_state == value)
//             return true;
//         else
//             return false;

//     }

//     //% blockId=cbit_Button block="按键|引脚 %pin|返回 %value"
//     //% weight=100
//     //% blockGap=10
//     //% color="#808080"
//     //% name.fieldEditor="gridpicker" name.fieldOptions.columns=5
//     export function Button(pin: DigitalPin, value: enButton): boolean {

//         pins.setPull(pin, PinPullMode.PullUp);
//         if (pins.digitalReadPin(pin) == value) {
//             return true;
//         }
//         else {
//             return false;
//         }

//     }  
// }



// /*****************************************************************************************************************************************
//  *    电机类 *****************************************************************************************************************************
//  ****************************************************************************************************************************************/

// //% color="#0000CD" weight=21 icon="\uf185"
// namespace Aibot_电机类 {
    // export enum enBuzzer {

    //     //% blockId="NoBeep" block="响"
    //     NoBeep = 0,
    //     //% blockId="Beep" block="不响"
    //     Beep
    // }

    // // % blockId=cbit_Buzzer block="有源蜂鸣器|引脚 %pin|值 %value"
    // // % weight=100
    // // % blockGap=10 
    // // % color="#D2691E"
    // // % value.min=0 value.max=1
    // // % name.fieldEditor="gridpicker" name.fieldOptions.columns=8
    // export function Buzzer(pin: DigitalPin, value: enBuzzer): void {

    //     pins.setPull(pin, PinPullMode.PullNone);
    //     pins.digitalWritePin(pin, value);

    // }


//     //% blockId=cbit_Fan block="风扇|引脚 %pin|速度 %value"
//     //% weight=100
//     //% blockGap=10
//     //% color="#0000CD"
//     //% value.min=0 value.max=1023
//     //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
//     export function Fan(pin: AnalogPin, value: number): void {

//         pins.analogWritePin(pin, value);

//     }

//     //% blockId=cbit_Servo block="舵机|引脚 %pin|角度 %value"
//     //% weight=100
//     //% blockGap=10
//     //% color="#0000CD"
//     //% value.min=0 value.max=180
//     //% name.fieldEditor="gridpicker" name.fieldOptions.columns=9
//     export function Servo(pin: AnalogPin, value: number): void {

//         pins.servoWritePin(pin, value);

//     }

// }


