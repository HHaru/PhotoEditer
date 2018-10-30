/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Canvas.ts":
/*!***********************!*\
  !*** ./src/Canvas.ts ***!
  \***********************/
/*! exports provided: Canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Canvas", function() { return Canvas; });
/* harmony import */ var _FilterType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FilterType */ "./src/FilterType.ts");

//2値化するときの閾値
var threshold = 255 / 2;
//ガンマ値
var gamma = 2;
// キャンバスクラス
var Canvas = /** @class */ (function () {
    // コンストラクタ
    function Canvas(aWidth, aHeight) {
        this.canvas = document.getElementById("canvas");
        this.canvas.width = aWidth;
        this.canvas.height = aHeight;
        this.context = this.canvas.getContext("2d");
        this.file = document.getElementById("file");
        this.onInputImage();
    }
    // コンテキストデータを取得する
    Canvas.prototype.getContextData = function () {
        return this.context;
    };
    // バックアップを設定する
    Canvas.prototype.setBackup = function () {
        this.backup = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    };
    // バックアップから復旧する
    Canvas.prototype.restoreFromBackup = function () {
        this.context.putImageData(this.backup, 0, 0);
    };
    // 画像ファイルを読み込み時の処理
    Canvas.prototype.onInputImage = function () {
        this.file.addEventListener("change", function (event) {
            var files = event.target.files;
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = function () {
                var img = new Image();
                img.src = reader.result;
                img.onload = function () {
                    this.setWidth(600);
                    this.setHeight(600);
                    this.getContextData().drawImage(img, 0, 0);
                    this.setBackup();
                }.bind(this);
            }.bind(this);
        }.bind(this));
    };
    // 画像を表示する
    Canvas.prototype.drawImage = function (type) {
        this.restoreFromBackup();
        if (type == _FilterType__WEBPACK_IMPORTED_MODULE_0__["FilterType"].Grayscale) {
            this.convertGrayscale();
        }
        else if (type == _FilterType__WEBPACK_IMPORTED_MODULE_0__["FilterType"].ReveseColor) {
            this.reverseColor();
        }
        else if (type == _FilterType__WEBPACK_IMPORTED_MODULE_0__["FilterType"].Blur) {
            this.applyBlur();
        }
        else if (type == _FilterType__WEBPACK_IMPORTED_MODULE_0__["FilterType"].Threshold) {
            this.convertThreshold();
        }
        else if (type == _FilterType__WEBPACK_IMPORTED_MODULE_0__["FilterType"].Sharpness) {
            this.applySharpFilter();
        }
        else if (type == _FilterType__WEBPACK_IMPORTED_MODULE_0__["FilterType"].Gamma) {
            this.applyGammaFilter();
        }
    };
    // 画像を保存する
    Canvas.prototype.saveImage = function () {
    };
    // 高さを設定する
    Canvas.prototype.setHeight = function (aHeight) {
        this.canvas.height = aHeight;
    };
    // 幅を設定する
    Canvas.prototype.setWidth = function (aWidth) {
        this.canvas.width = aWidth;
    };
    // グレースケール変換する
    Canvas.prototype.convertGrayscale = function () {
        // 入力用データを取得する
        this.contextData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        var input = this.contextData.data;
        // 出力用のデータを作成する
        var output = new ImageData(this.contextData.width, this.contextData.height);
        for (var i = 0; i < input.length; i += 4) {
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
    };
    //ネガポジ変換
    Canvas.prototype.reverseColor = function () {
        //入力用データを取得
        this.contextData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        var input = this.contextData.data;
        //出力用データを作成する
        var output = new ImageData(this.contextData.width, this.contextData.height);
        for (var i = 0; i < input.length; i += 4) {
            //入力用データを加工する
            var r = 255 - input[i];
            var g = 255 - input[i + 1];
            var b = 255 - input[i + 2];
            //出力用データに入れる
            output.data[i] = r;
            output.data[i + 1] = g;
            output.data[i + 2] = b;
            output.data[i + 3] = input[i + 3];
        }
        //キャンバスに出力する
        this.context.putImageData(output, 0, 0);
    };
    //２値化する
    Canvas.prototype.convertThreshold = function () {
        //入力用データを取得
        this.contextData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        var input = this.contextData.data;
        //出力用データを作成する
        var output = new ImageData(this.contextData.width, this.contextData.height);
        for (var i = 0; i < input.length; i += 4) {
            //入力用データを加工する
            var avg = (input[i] + input[i + 1] + input[i + 2]) / 3;
            var color;
            if (threshold < avg) {
                color = 255;
            }
            else {
                color = 0;
            }
            var r = color;
            var g = color;
            var b = color;
            //出力用データに入れる
            output.data[i] = r;
            output.data[i + 1] = g;
            output.data[i + 2] = b;
            output.data[i + 3] = input[i + 3];
        }
        //キャンバスに出力する
        this.context.putImageData(output, 0, 0);
    };
    //ガンマ補正の結果を得る
    Canvas.prototype.evaluateGamma = function (color) {
        return 255 * Math.pow(color / 255, 1 / gamma);
    };
    //ガンマ補正する
    Canvas.prototype.applyGammaFilter = function () {
        //入力用データを取得
        this.contextData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        var input = this.contextData.data;
        //出力用データを作成する
        var output = new ImageData(this.contextData.width, this.contextData.height);
        for (var i = 0; i < input.length; i += 4) {
            //入力用データを加工する
            var r = this.evaluateGamma(input[i]);
            var g = this.evaluateGamma(input[i + 1]);
            var b = this.evaluateGamma(input[i + 2]);
            //出力用データに入れる
            output.data[i] = r;
            output.data[i + 1] = g;
            output.data[i + 2] = b;
            output.data[i + 3] = input[i + 3];
        }
        //キャンバスに出力する
        this.context.putImageData(output, 0, 0);
    };
    //有効なインデックスか
    Canvas.prototype.isEnableIndex = function (index, lastIndex) {
        return index > 0 && index < lastIndex;
    };
    //周囲の色の平均値を取る
    Canvas.prototype.getAverage = function (input, index, rgb) {
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
        var c6 = this.isEnableIndex(bLeft, lastIndex) ? input[bLeft] : input[center];
        ;
        var c7 = this.isEnableIndex(bCenter, lastIndex) ? input[bCenter] : input[center];
        var c8 = this.isEnableIndex(bRight, lastIndex) ? input[bRight] : input[center];
        // 総和
        var sum = c0 + c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8;
        // 平均
        return sum / 9;
    };
    //ボカシをかける
    Canvas.prototype.applyBlur = function () {
        // 入力用データを取得する
        this.contextData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        var input = this.contextData.data;
        // 出力用のデータを作成する
        var output = new ImageData(this.contextData.width, this.contextData.height);
        for (var i = 0; i < input.length; i += 4) {
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
    };
    //シャープかした色を取得する
    Canvas.prototype.getSharpColor = function (input, index, rgb) {
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
        var c6 = this.isEnableIndex(bLeft, lastIndex) ? input[bLeft] : input[center];
        ;
        var c7 = this.isEnableIndex(bCenter, lastIndex) ? input[bCenter] : input[center];
        var c8 = this.isEnableIndex(bRight, lastIndex) ? input[bRight] : input[center];
        // 総和
        var sum = -c0 - c1 - c2 - c3 + c4 * 10 - c5 - c6 - c7 - c8;
        // シャープ化した値
        return sum / 2;
    };
    //シャープ化する
    Canvas.prototype.applySharpFilter = function () {
        // 入力用データを取得する
        this.contextData = this.context.getImageData(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
        var input = this.contextData.data;
        // 出力用のデータを作成する
        var output = new ImageData(this.contextData.width, this.contextData.height);
        for (var i = 0; i < input.length; i += 4) {
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
    };
    return Canvas;
}());



/***/ }),

/***/ "./src/FilterType.ts":
/*!***************************!*\
  !*** ./src/FilterType.ts ***!
  \***************************/
/*! exports provided: FilterType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterType", function() { return FilterType; });
//フィルターのタイプ
var FilterType;
(function (FilterType) {
    FilterType[FilterType["None"] = 0] = "None";
    FilterType[FilterType["Grayscale"] = 1] = "Grayscale";
    FilterType[FilterType["ReveseColor"] = 2] = "ReveseColor";
    FilterType[FilterType["Threshold"] = 3] = "Threshold";
    FilterType[FilterType["Blur"] = 4] = "Blur";
    FilterType[FilterType["Sharpness"] = 5] = "Sharpness";
    FilterType[FilterType["Gamma"] = 6] = "Gamma";
})(FilterType || (FilterType = {}));


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Canvas */ "./src/Canvas.ts");
/* harmony import */ var _FilterType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FilterType */ "./src/FilterType.ts");


var canvas = new _Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"](500, 500);
document.getElementById("grayscale").onclick = function () {
    canvas.drawImage(_FilterType__WEBPACK_IMPORTED_MODULE_1__["FilterType"].Grayscale);
};
document.getElementById("reversecolor").onclick = function () {
    canvas.drawImage(_FilterType__WEBPACK_IMPORTED_MODULE_1__["FilterType"].ReveseColor);
};
document.getElementById("threshold").onclick = function () {
    canvas.drawImage(_FilterType__WEBPACK_IMPORTED_MODULE_1__["FilterType"].Threshold);
};
document.getElementById("gamma").onclick = function () {
    canvas.drawImage(_FilterType__WEBPACK_IMPORTED_MODULE_1__["FilterType"].Gamma);
};
document.getElementById("blur").onclick = function () {
    canvas.drawImage(_FilterType__WEBPACK_IMPORTED_MODULE_1__["FilterType"].Blur);
};
document.getElementById("sharpness").onclick = function () {
    canvas.drawImage(_FilterType__WEBPACK_IMPORTED_MODULE_1__["FilterType"].Sharpness);
};
document.getElementById("file");


/***/ })

/******/ });
//# sourceMappingURL=main.js.map