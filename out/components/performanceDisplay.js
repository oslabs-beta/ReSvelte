"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("../styles.scss");
const performanceDisplay = (props) => {
    return (react_1.default.createElement("div", { id: 'performanceDisplay' },
        react_1.default.createElement("h1", null, "App Performance"),
        react_1.default.createElement("div", { id: 'mainContainer' },
            react_1.default.createElement("div", { id: 'Top' },
                react_1.default.createElement("div", { id: 'Graphs', className: 'display' }, "Graphs"),
                react_1.default.createElement("div", { id: 'Components', className: 'display' },
                    "Components",
                    react_1.default.createElement("div", { id: 'componentStatsDisplays' },
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("p", null, "Total"),
                            props.totalComponents),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("p", null, "Re-rendering"),
                            props.totalRerendering)))),
            react_1.default.createElement("div", { id: 'errorDisplay', className: 'display' },
                "Error Log",
                props.errorLog))));
};
exports.default = performanceDisplay;
//# sourceMappingURL=performanceDisplay.js.map