"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
// import '../App.css'
const performanceDisplay = () => {
    return (react_1.default.createElement("div", { id: 'performanceDisplay' },
        "Inside performance display",
        react_1.default.createElement("div", { id: 'performanceTop' },
            "Top",
            react_1.default.createElement("div", { id: 'performanceGraphs' }, "Graphs"),
            react_1.default.createElement("div", { id: 'performanceComponents' }, "Components")),
        react_1.default.createElement("div", { id: 'performanceBottom' }, "Bottom")));
};
exports.default = performanceDisplay;
//# sourceMappingURL=performanceDisplay.js.map