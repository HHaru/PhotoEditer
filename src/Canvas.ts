import { FilterType } from "./FilterType";

//2値化するときの閾値
const threshold = 255 / 2;

//ガンマ値
const gamma = 2;

// キャンバスクラス
export class Canvas {
    // キャンバス
    protected canvas: HTMLCanvasElement;
    // コンテキスト
    protected context: CanvasRenderingContext2D;
    // コンテキストデータ
    protected contextData: ImageData;
    // ファイル
    protected file: HTMLElement;
    //バックアップ
    protected backup: ImageData;

    
    // コンストラクタ
    constructor(aWidth: number, aHeight: number) {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.canvas.width = aWidth;
        this.canvas.height = aHeight;
        this.context = this.canvas.getContext("2d");
        this.file = document.getElementById("file");
        this.onInputImage();
    }

    // コンテキストデータを取得する
    public getContextData(): CanvasRenderingContext2D {
        return this.context;
    }

    // 画像ファイルを読み込み時の処理
    public onInputImage(): void {
        this.file.addEventListener("change", function (event) {
            var files = (<HTMLInputElement>event.target).files;
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = function () { 
                var img = new Image();
                img.src = <string>reader.result;
                img.onload = function() {
                    this.setWidth(600);
                    this.setHeight(600);
                    this.getContextData().drawImage(img, 0, 0);
                }.bind(this);
            }.bind(this);
        }.bind(this));
    }

    // 画像を表示する
    public drawImage(type: FilterType): void {
        if (type == FilterType.Grayscale) {
            this.convertGrayscale();
        } else if (type == FilterType.ReveseColor) {
            this.reverseColor();
        } else if (type == FilterType.Blur) {
            this.applyBlur();
        } else if (type == FilterType.Threshold) {
            this.convertThreshold();
        } else if (type == FilterType.Sharpness) {
            this.applySharpFilter();
        } else if (type == FilterType.Gamma) {
            this.applyGammaFilter();
        }
    }

    // 画像を保存する
    public saveImage(): void {

    }

    // 高さを設定する
    public setHeight(aHeight: number): void {
        this.canvas.height = aHeight;
    }

    // 幅を設定する
    public setWidth(aWidth: number): void {
        this.canvas.width = aWidth;
    }

    // グレースケール変換する
    public convertGrayscale(): void {
        // 入力用データを取得する
        this.contextData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        var input = this.contextData.data;

        // 出力用のデータを作成する
        var output = new ImageData(this.contextData.width, this.contextData.height);
        
        for (let i = 0; i < input.length; i += 4) {
            // 入力用データを加工する
            var r = input[i] * 0.299;
            var g = input[i + 1] * 0.587;
            var b = input[i + 2] * 0.114;
            var y = Math.ceil(r + g + b);

            // 出力用データに入れる
            output.data[i] = y;
            output.data[i + 1] = y;
            output.data[i + 2] = y;
            output.data[i + 3] = input[i + 3]; 
        }

        // キャンバスに出力する
        this.context.putImageData(output, 0, 0);
    }
    //ネガポジ変換
    public reverseColor():void{
        //入力用データを取得
        this.contextData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        var input = this.contextData.data;

        //出力用データを作成する
        var output = new ImageData(this.contextData.width, this.contextData.height);

        for (let i = 0; i < input.length; i += 4) {

            //入力用データを加工する
            var r = 255 - input[i];
            var g = 255 - input[i + 1];
            var b = 255 - input[i + 2];
            
            //出力用データに入れる
            output.data[i]  = r;
            output.data[i + 1]  = g;
            output.data[i + 2]  = b;
            output.data[i + 3]  = input[i + 3];
        }
        //キャンバスに出力する
        this.context.putImageData(output, 0, 0);
    }
    //２値化する
    public convertThreshold():void{
        //入力用データを取得
        this.contextData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        var input = this.contextData.data;

        //出力用データを作成する
        var output = new ImageData(this.contextData.width, this.contextData.height);

        for (let i = 0; i < input.length; i += 4) {
            //入力用データを加工する
            var avg = (input[i] + input[i + 1] + input[i + 2]) / 3;
            var color;
            if (threshold < avg) { 
                color = 255;
            } else {
                color = 0;
            }
            var r = color;
            var g = color;
            var b = color;

            //出力用データに入れる
            output.data[i]  = r;
            output.data[i + 1]  = g;
            output.data[i + 2]  = b;
            output.data[i + 3]  = input[i + 3];
        }
    //キャンバスに出力する
    this.context.putImageData(output, 0, 0);
    }

    //ガンマ補正の結果を得る
    public evaluateGamma(color: number){
        return 255 * Math.pow(color / 255, 1 / gamma);
    }
    
    //ガンマ補正する
    public applyGammaFilter():void{
        //入力用データを取得
        this.contextData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        var input = this.contextData.data;

        //出力用データを作成する
        var output = new ImageData(this.contextData.width, this.contextData.height);

        for (let i = 0; i < input.length; i += 4) {
            //入力用データを加工する
            var r = this.evaluateGamma(input[i]);
            var g = this.evaluateGamma(input[i + 1]);
            var b = this.evaluateGamma(input[i + 2]);        

            //出力用データに入れる
            output.data[i]  = r;
            output.data[i + 1]  = g;
            output.data[i + 2]  = b;
            output.data[i + 3]  = input[i + 3];
        }
    //キャンバスに出力する
    this.context.putImageData(output, 0, 0);
    }

    //有効なインデックスか
    public isEnableIndex(index: number, lastIndex:number):boolean{
        return index > 0 && index < lastIndex;
    }

    //周囲の色の平均値を取る
    public getAverage(input: Uint8ClampedArray, index:number, rgb:number) :number{
        //一行真上のインデックス
        var upIndex = index - (this.canvas.width * 4);
        //一行真下のインデックス
        var bottomIndex = index + (this.canvas.width * 4);
        //最後尾のインデックス
        var lastIndex = input.length - 1;

        // 上の行
        var uLeft = upIndex - 4 + rgb;
        var uCenter = upIndex + rgb;
        var uRight = upIndex + 4 + rgb;
        var c0 = this.isEnableIndex(uLeft, lastIndex) ? input[uLeft] : input[center];
        var c1 = this.isEnableIndex(uCenter, lastIndex) ? input[uCenter] : input[center];
        var c2 = this.isEnableIndex(uRight, lastIndex) ? input[uRight] : input[center];

        // 真ん中の行
        var left = index - 4 + rgb;
        var center = index + rgb;
        var right = index + 4 + rgb;
        var c3 = this.isEnableIndex(left, lastIndex) ? input[left] : input[center];
        var c4 = input[center];
        var c5 = this.isEnableIndex(right, lastIndex) ? input[right] : input[center];

        // 下の行
        var bLeft = bottomIndex - 4 + rgb;
        var bCenter = bottomIndex + rgb;
        var bRight = bottomIndex + 4 + rgb;
        var c6 = this.isEnableIndex(bLeft, lastIndex) ? input[bLeft] : input[center];;
        var c7 = this.isEnableIndex(bCenter, lastIndex) ? input[bCenter] : input[center];
        var c8 = this.isEnableIndex(bRight, lastIndex) ? input[bRight] : input[center];

         // 総和
         var sum = c0 + c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8;
         // 平均
         return sum / 9;
    }

    //ボカシをかける
    public applyBlur():void{
        // 入力用データを取得する
        this.contextData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        var input = this.contextData.data;

        // 出力用のデータを作成する
        var output = new ImageData(this.contextData.width, this.contextData.height);

        for (let i = 0; i < input.length; i += 4) {
            // 入力用データを加工する
            var r = this.getAverage(input, i, 0);
            var g = this.getAverage(input, i, 1);
            var b = this.getAverage(input, i, 2);

            // 出力用データに入れる
            output.data[i] = r;
            output.data[i + 1] = g;
            output.data[i + 2] = b;
            output.data[i + 3] = input[i + 3]; 
        }

        // キャンバスに出力する
        this.context.putImageData(output, 0, 0);
    }
    //シャープかした色を取得する
    protected getSharpColor(input: Uint8ClampedArray, index: number, rgb: number):number{
        //一行真上のインデックス
        var upIndex = index - (this.canvas.width * 4);
        //一行真下のインデックス
        var bottomIndex = index + (this.canvas.width * 4);
        //最後尾のインデックス
        var lastIndex = input.length - 1;

        // 上の行
        var uLeft = upIndex - 4 + rgb;
        var uCenter = upIndex + rgb;
        var uRight = upIndex + 4 + rgb;
        var c0 = this.isEnableIndex(uLeft, lastIndex) ? input[uLeft] : input[center];
        var c1 = this.isEnableIndex(uCenter, lastIndex) ? input[uCenter] : input[center];
        var c2 = this.isEnableIndex(uRight, lastIndex) ? input[uRight] : input[center];

        // 真ん中の行
        var left = index - 4 + rgb;
        var center = index + rgb;
        var right = index + 4 + rgb;
        var c3 = this.isEnableIndex(left, lastIndex) ? input[left] : input[center];
        var c4 = input[center];
        var c5 = this.isEnableIndex(right, lastIndex) ? input[right] : input[center];

        // 下の行
        var bLeft = bottomIndex - 4 + rgb;
        var bCenter = bottomIndex + rgb;
        var bRight = bottomIndex + 4 + rgb;
        var c6 = this.isEnableIndex(bLeft, lastIndex) ? input[bLeft] : input[center];;
        var c7 = this.isEnableIndex(bCenter, lastIndex) ? input[bCenter] : input[center];
        var c8 = this.isEnableIndex(bRight, lastIndex) ? input[bRight] : input[center];

        // 総和
        var sum = -c0 -c1 -c2 -c3 + c4*10 -c5 -c6 -c7 -c8;
        // シャープ化した値
        return sum / 2;
    }

    //シャープ化する
    public applySharpFilter():void{
        // 入力用データを取得する
        this.contextData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        var input = this.contextData.data;

        // 出力用のデータを作成する
        var output = new ImageData(this.contextData.width, this.contextData.height);

        for (let i = 0; i < input.length; i += 4) {
            // 入力用データを加工する
            var r = this.getSharpColor(input, i, 0);
            var g = this.getSharpColor(input, i, 1);
            var b = this.getSharpColor(input, i, 2);

            // 出力用データに入れる
            output.data[i] = r;
            output.data[i + 1] = g;
            output.data[i + 2] = b;
            output.data[i + 3] = input[i + 3]; 
        }
    // キャンバスに出力する
    this.context.putImageData(output, 0, 0);
    }
}
