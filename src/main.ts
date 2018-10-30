import { Canvas } from "./Canvas";
import { FilterType } from "./FilterType";

let canvas = new Canvas(500, 500);

document.getElementById("grayscale").onclick = function(){
    canvas.drawImage(FilterType.Grayscale);
};

document.getElementById("reversecolor").onclick = function(){
    canvas.drawImage(FilterType.ReveseColor);
};

document.getElementById("threshold").onclick = function () {
    canvas.drawImage(FilterType.Threshold);
};

document.getElementById("gamma").onclick = function(){
    canvas.drawImage(FilterType.Gamma);
};

document.getElementById("blur").onclick = function(){
    canvas.drawImage(FilterType.Blur);
};

document.getElementById("sharpness").onclick = function(){
    canvas.drawImage(FilterType.Sharpness);
};

document.getElementById("file");