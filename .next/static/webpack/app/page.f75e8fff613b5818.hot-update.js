"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./src/components/Products.tsx":
/*!*************************************!*\
  !*** ./src/components/Products.tsx ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/data */ \"(app-pages-browser)/./src/data/index.ts\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/dist/api/image.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\n\n\nconst Products = ()=>{\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"min-w-screen py-12 bg-black max-w-[100vw]\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"mt-2 \",\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center\",\n                children: _data__WEBPACK_IMPORTED_MODULE_1__.products.map((item, i)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex justify-center\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                            src: item.img,\n                            alt: \"\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\ameyp\\\\Desktop\\\\amey-new\\\\next\\\\next-test\\\\src\\\\components\\\\Products.tsx\",\n                            lineNumber: 23,\n                            columnNumber: 15\n                        }, undefined)\n                    }, i, false, {\n                        fileName: \"C:\\\\Users\\\\ameyp\\\\Desktop\\\\amey-new\\\\next\\\\next-test\\\\src\\\\components\\\\Products.tsx\",\n                        lineNumber: 15,\n                        columnNumber: 13\n                    }, undefined))\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\ameyp\\\\Desktop\\\\amey-new\\\\next\\\\next-test\\\\src\\\\components\\\\Products.tsx\",\n                lineNumber: 13,\n                columnNumber: 9\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\ameyp\\\\Desktop\\\\amey-new\\\\next\\\\next-test\\\\src\\\\components\\\\Products.tsx\",\n            lineNumber: 12,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\ameyp\\\\Desktop\\\\amey-new\\\\next\\\\next-test\\\\src\\\\components\\\\Products.tsx\",\n        lineNumber: 11,\n        columnNumber: 5\n    }, undefined);\n};\n_c = Products;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Products);\nvar _c;\n$RefreshReg$(_c, \"Products\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL1Byb2R1Y3RzLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ2tDO0FBRVI7QUFHSztBQUUvQixNQUFNRyxXQUFXO0lBQ2YscUJBQ0UsOERBQUNDO1FBQUlDLFdBQVU7a0JBQ2IsNEVBQUNEO1lBQUlDLFdBQVU7c0JBQ2IsNEVBQUNEO2dCQUFJQyxXQUFVOzBCQUNaTCwyQ0FBUUEsQ0FBQ00sR0FBRyxDQUFDLENBQUNDLE1BQU1DLGtCQUNuQiw4REFBQ0o7d0JBQVlDLFdBQVU7a0NBUXJCLDRFQUFDSCxrREFBS0E7NEJBQUNPLEtBQUtGLEtBQUtHLEdBQUc7NEJBQUVDLEtBQUk7Ozs7Ozt1QkFSbEJIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThCdEI7S0FwQ01MO0FBc0NOLCtEQUFlQSxRQUFRQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL1Byb2R1Y3RzLnRzeD9iYTdkIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xyXG5pbXBvcnQgeyBwcm9kdWN0cyB9IGZyb20gXCJAL2RhdGFcIjtcclxuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IFBpbkNvbnRhaW5lciB9IGZyb20gXCIuL3VpLzNkLXBpblwiO1xyXG5pbXBvcnQgeyBCYWNrZ3JvdW5kR3JhZGllbnQgfSBmcm9tIFwiLi91aS9iYWNrZ3JvdW5kLWdyYWRpZW50XCI7XHJcbmltcG9ydCBJbWFnZSBmcm9tIFwibmV4dC9pbWFnZVwiO1xyXG5cclxuY29uc3QgUHJvZHVjdHMgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLXctc2NyZWVuIHB5LTEyIGJnLWJsYWNrIG1heC13LVsxMDB2d11cIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yIFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtNCBnYXAtOCBqdXN0aWZ5LWNlbnRlclwiPlxyXG4gICAgICAgICAge3Byb2R1Y3RzLm1hcCgoaXRlbSwgaSkgPT4gKFxyXG4gICAgICAgICAgICA8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgIHsvKiA8UGluQ29udGFpbmVyIHRpdGxlPXtpdGVtLnRpdGxlfSBocmVmPXtpdGVtLnVybH0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggYmFzaXMtZnVsbCBmbGV4LWNvbCBwLTQgdHJhY2tpbmctdGlnaHQgdGV4dC1zbGF0ZS0xMDAvNTAgc206YmFzaXMtMS8yIHctWzIwcmVtXSBoLVsyMHJlbV0gXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwPntpdGVtLnRpdGxlfTwvcD5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCIgZmxleCBmbGV4LTEgdy1mdWxsIHJvdW5kZWQtbGcgbXQtNCBcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvUGluQ29udGFpbmVyPiAqL31cclxuXHJcbiAgICAgICAgICAgICAgPEltYWdlIHNyYz17aXRlbS5pbWd9IGFsdD1cIlwiIC8+XHJcblxyXG4gICAgICAgICAgICAgIHsvKiA8QmFja2dyb3VuZEdyYWRpZW50PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGJhc2lzLWZ1bGwgZmxleC1jb2wgcC00IHRyYWNraW5nLXRpZ2h0IHRleHQtc2xhdGUtMTAwLzUwIHNtOmJhc2lzLTEvMiB3LVsyMHJlbV0gaC1bMjByZW1dIFwiPlxyXG4gICAgICAgICAgICAgICAgICA8cD57aXRlbS50aXRsZX08L3A+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiIGZsZXggZmxleC0xIHctZnVsbCByb3VuZGVkLWxnIG10LTQgXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L0JhY2tncm91bmRHcmFkaWVudD4gKi99XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICB7LyogPGRpdiBjbGFzc05hbWU9XCJtdC0xNiB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgIDxMaW5rXHJcbiAgICAgICAgICBocmVmPXtcIi9wcm9kdWN0c1wifVxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1uZXV0cmFsLTYwMCB0ZXh0LW5ldXRyYWwtNzAwIGJnLXdoaXRlIGhvdmVyOmJnLWdyYXktMTAwIHRyYW5zaXRpb24gZHVyYXRpb24tMjAwXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICBWaWV3IEFsbCBQcm9kdWN0c1xyXG4gICAgICAgIDwvTGluaz5cclxuICAgICAgPC9kaXY+ICovfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RzO1xyXG4iXSwibmFtZXMiOlsicHJvZHVjdHMiLCJSZWFjdCIsIkltYWdlIiwiUHJvZHVjdHMiLCJkaXYiLCJjbGFzc05hbWUiLCJtYXAiLCJpdGVtIiwiaSIsInNyYyIsImltZyIsImFsdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/Products.tsx\n"));

/***/ })

});