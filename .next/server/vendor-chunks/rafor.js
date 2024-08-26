/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/rafor";
exports.ids = ["vendor-chunks/rafor"];
exports.modules = {

/***/ "(ssr)/./node_modules/rafor/index.js":
/*!*************************************!*\
  !*** ./node_modules/rafor/index.js ***!
  \*************************************/
/***/ ((module) => {

eval("module.exports = asyncFor;\n\n/**\n * Iterates over array in async manner. This function attempts to maximize\n * number of elements visited within single event loop cycle, while at the\n * same time tries to not exceed a time threshold allowed to stay within\n * event loop.\n *\n * @param {Array} array which needs to be iterated. Array-like objects are OK too.\n * @param {VisitCalback} visitCallback called for every element within for loop.\n * @param {DoneCallback} doneCallback called when iterator has reached end of array.\n * @param {Object=} options - additional configuration:\n * @param {number} [options.step=1] - default iteration step\n * @param {number} [options.maxTimeMS=8] - maximum time (in milliseconds) which\n *   iterator should spend within single event loop.\n * @param {number} [options.probeElements=5000] - how many elements should iterator\n *   visit to measure its iteration speed.\n */\nfunction asyncFor(array, visitCallback, doneCallback, options) {\n  var start = 0;\n  var elapsed = 0;\n  options = options || {};\n  var step = options.step || 1;\n  var maxTimeMS = options.maxTimeMS || 8;\n  var pointsPerLoopCycle = options.probeElements || 5000;\n  // we should never block main thread for too long...\n  setTimeout(processSubset, 0);\n\n  function processSubset() {\n    var finish = Math.min(array.length, start + pointsPerLoopCycle);\n    var i = start;\n    var timeStart = new Date();\n    for (i = start; i < finish; i += step) {\n      visitCallback(array[i], i, array);\n    }\n    if (i < array.length) {\n      elapsed += (new Date() - timeStart);\n      start = i;\n\n      pointsPerLoopCycle = Math.round(start * maxTimeMS/elapsed);\n      setTimeout(processSubset, 0);\n    } else {\n      doneCallback(array);\n    }\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmFmb3IvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsY0FBYztBQUN6QixXQUFXLGNBQWM7QUFDekIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL25leHQtdGVzdC8uL25vZGVfbW9kdWxlcy9yYWZvci9pbmRleC5qcz85Y2ViIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gYXN5bmNGb3I7XG5cbi8qKlxuICogSXRlcmF0ZXMgb3ZlciBhcnJheSBpbiBhc3luYyBtYW5uZXIuIFRoaXMgZnVuY3Rpb24gYXR0ZW1wdHMgdG8gbWF4aW1pemVcbiAqIG51bWJlciBvZiBlbGVtZW50cyB2aXNpdGVkIHdpdGhpbiBzaW5nbGUgZXZlbnQgbG9vcCBjeWNsZSwgd2hpbGUgYXQgdGhlXG4gKiBzYW1lIHRpbWUgdHJpZXMgdG8gbm90IGV4Y2VlZCBhIHRpbWUgdGhyZXNob2xkIGFsbG93ZWQgdG8gc3RheSB3aXRoaW5cbiAqIGV2ZW50IGxvb3AuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgd2hpY2ggbmVlZHMgdG8gYmUgaXRlcmF0ZWQuIEFycmF5LWxpa2Ugb2JqZWN0cyBhcmUgT0sgdG9vLlxuICogQHBhcmFtIHtWaXNpdENhbGJhY2t9IHZpc2l0Q2FsbGJhY2sgY2FsbGVkIGZvciBldmVyeSBlbGVtZW50IHdpdGhpbiBmb3IgbG9vcC5cbiAqIEBwYXJhbSB7RG9uZUNhbGxiYWNrfSBkb25lQ2FsbGJhY2sgY2FsbGVkIHdoZW4gaXRlcmF0b3IgaGFzIHJlYWNoZWQgZW5kIG9mIGFycmF5LlxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zIC0gYWRkaXRpb25hbCBjb25maWd1cmF0aW9uOlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLnN0ZXA9MV0gLSBkZWZhdWx0IGl0ZXJhdGlvbiBzdGVwXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4VGltZU1TPThdIC0gbWF4aW11bSB0aW1lIChpbiBtaWxsaXNlY29uZHMpIHdoaWNoXG4gKiAgIGl0ZXJhdG9yIHNob3VsZCBzcGVuZCB3aXRoaW4gc2luZ2xlIGV2ZW50IGxvb3AuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMucHJvYmVFbGVtZW50cz01MDAwXSAtIGhvdyBtYW55IGVsZW1lbnRzIHNob3VsZCBpdGVyYXRvclxuICogICB2aXNpdCB0byBtZWFzdXJlIGl0cyBpdGVyYXRpb24gc3BlZWQuXG4gKi9cbmZ1bmN0aW9uIGFzeW5jRm9yKGFycmF5LCB2aXNpdENhbGxiYWNrLCBkb25lQ2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgdmFyIHN0YXJ0ID0gMDtcbiAgdmFyIGVsYXBzZWQgPSAwO1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHN0ZXAgPSBvcHRpb25zLnN0ZXAgfHwgMTtcbiAgdmFyIG1heFRpbWVNUyA9IG9wdGlvbnMubWF4VGltZU1TIHx8IDg7XG4gIHZhciBwb2ludHNQZXJMb29wQ3ljbGUgPSBvcHRpb25zLnByb2JlRWxlbWVudHMgfHwgNTAwMDtcbiAgLy8gd2Ugc2hvdWxkIG5ldmVyIGJsb2NrIG1haW4gdGhyZWFkIGZvciB0b28gbG9uZy4uLlxuICBzZXRUaW1lb3V0KHByb2Nlc3NTdWJzZXQsIDApO1xuXG4gIGZ1bmN0aW9uIHByb2Nlc3NTdWJzZXQoKSB7XG4gICAgdmFyIGZpbmlzaCA9IE1hdGgubWluKGFycmF5Lmxlbmd0aCwgc3RhcnQgKyBwb2ludHNQZXJMb29wQ3ljbGUpO1xuICAgIHZhciBpID0gc3RhcnQ7XG4gICAgdmFyIHRpbWVTdGFydCA9IG5ldyBEYXRlKCk7XG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBmaW5pc2g7IGkgKz0gc3RlcCkge1xuICAgICAgdmlzaXRDYWxsYmFjayhhcnJheVtpXSwgaSwgYXJyYXkpO1xuICAgIH1cbiAgICBpZiAoaSA8IGFycmF5Lmxlbmd0aCkge1xuICAgICAgZWxhcHNlZCArPSAobmV3IERhdGUoKSAtIHRpbWVTdGFydCk7XG4gICAgICBzdGFydCA9IGk7XG5cbiAgICAgIHBvaW50c1Blckxvb3BDeWNsZSA9IE1hdGgucm91bmQoc3RhcnQgKiBtYXhUaW1lTVMvZWxhcHNlZCk7XG4gICAgICBzZXRUaW1lb3V0KHByb2Nlc3NTdWJzZXQsIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb25lQ2FsbGJhY2soYXJyYXkpO1xuICAgIH1cbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/rafor/index.js\n");

/***/ })

};
;