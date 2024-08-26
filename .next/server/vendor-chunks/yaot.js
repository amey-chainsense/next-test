/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/yaot";
exports.ids = ["vendor-chunks/yaot"];
exports.modules = {

/***/ "(ssr)/./node_modules/yaot/index.js":
/*!************************************!*\
  !*** ./node_modules/yaot/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/**\n * Represents octree data structure\n *\n * https://en.wikipedia.org/wiki/Octree\n */\nvar Bounds3 = __webpack_require__(/*! ./lib/bounds3.js */ \"(ssr)/./node_modules/yaot/lib/bounds3.js\");\nvar TreeNode = __webpack_require__(/*! ./lib/treeNode.js */ \"(ssr)/./node_modules/yaot/lib/treeNode.js\");\nvar EmptyRegion = new Bounds3();\nvar asyncFor = __webpack_require__(/*! rafor */ \"(ssr)/./node_modules/rafor/index.js\");\n\nmodule.exports = createTree;\n\nfunction createTree(options) {\n  options = options || {};\n  var noPoints = [];\n\n  var root;\n  var originalArray;\n  var api = {\n    /**\n     * Initializes tree asynchronously. Very useful when you have millions\n     * of points and do not want to block rendering thread for too long.\n     *\n     * @param {number[]} points array of points for which we are building the\n     * tree. Flat sequence of (x, y, z) coordinates. Array length should be\n     * multiple of 3.\n     *\n     * @param {Function=} doneCallback called when tree is initialized. The\n     * callback will be called with single argument which represent current\n     * tree.\n     */\n    initAsync: initAsync,\n\n    /**\n     * Synchronous version of `initAsync()`. Should only be used for small\n     * trees (less than 50-70k of points).\n     *\n     * @param {number[]} points array of points for which we are building the\n     * tree. Flat sequence of (x, y, z) coordinates. Array length should be\n     * multiple of 3.\n     */\n    init: init,\n\n    /**\n     * Gets bounds of the root node. Bounds are represented by center of the\n     * node (x, y, z) and `half` attribute - distance from the center to an\n     * edge of the root node.\n     */\n    bounds: getBounds,\n\n    /**\n     * Fires a ray from `rayOrigin` into `rayDirection` and collects all points\n     * that lie in the octants intersected by the ray.\n     *\n     * This method implements An Efficient Parametric Algorithm for Octree Traversal\n     * described in http://wscg.zcu.cz/wscg2000/Papers_2000/X31.pdf\n     *\n     * @param {Vector3} rayOrigin x,y,z coordinates where ray starts\n     * @param {Vector3} rayDirection normalized x,y,z direction where ray shoots.\n     * @param {number+} near minimum distance from the ray origin. 0 by default.\n     * @param {number+} far maximum length of the ray. POSITIVE_INFINITY by default\n     *\n     * @return {Array} of indices in the source array. Each index represnts a start\n     * of the x,y,z triplet of a point, that lies in the intersected octant.\n     */\n    intersectRay: intersectRay,\n\n    /**\n     * Once you have collected points from the octants intersected by a ray\n     * (`intersectRay()` method), it may be worth to query points from the surrouning\n     * area.\n     */\n    intersectSphere: intersectSphere,\n\n    /**\n     * Gets root node of the tree\n     */\n    getRoot: getRoot\n  };\n\n  return api;\n\n  function getRoot() {\n    return root;\n  }\n\n  function intersectSphere(cx, cy, cz, r) {\n    if (!root) {\n      // Most likely we are not initialized yet\n      return noPoints;\n    }\n    var indices = [];\n    var r2 = r * r;\n    root.query(indices, originalArray, intersectCheck, preciseCheck);\n    return indices;\n\n    // http://stackoverflow.com/questions/4578967/cube-sphere-intersection-test\n    function intersectCheck(candidate) {\n      var dist = r2;\n      var half = candidate.half;\n      if (cx < candidate.x - half) dist -= sqr(cx - (candidate.x - half));\n      else if (cx > candidate.x + half) dist -= sqr(cx - (candidate.x + half));\n\n      if (cy < candidate.y - half) dist -= sqr(cy - (candidate.y - half));\n      else if (cy > candidate.y + half) dist -= sqr(cy - (candidate.y + half));\n\n      if (cz < candidate.z - half) dist -= sqr(cz - (candidate.z - half));\n      else if (cz > candidate.z + half) dist -= sqr(cz - (candidate.z + half));\n      return dist > 0;\n    }\n\n    function preciseCheck(x, y, z) {\n      return sqr(x - cx) + sqr(y - cy) + sqr(z - cz) < r2;\n    }\n  }\n\n  function sqr(x) {\n    return x * x;\n  }\n\n  function intersectRay(rayOrigin, rayDirection, near, far) {\n    if (!root) {\n      // Most likely we are not initialized yet\n      return noPoints;\n    }\n\n    if (near === undefined) near = 0;\n    if (far === undefined) far = Number.POSITIVE_INFINITY;\n    // we save as squar, to avoid expensive sqrt() operation\n    near *= near;\n    far *= far;\n\n    var indices = [];\n    root.query(indices, originalArray, intersectCheck, farEnough);\n    return indices.sort(byDistanceToCamera);\n\n    function intersectCheck(candidate) {\n      // using http://wscg.zcu.cz/wscg2000/Papers_2000/X31.pdf\n      var half = candidate.half;\n      var t1 = (candidate.x - half - rayOrigin.x) / rayDirection.x,\n        t2 = (candidate.x + half - rayOrigin.x) / rayDirection.x,\n        t3 = (candidate.y + half - rayOrigin.y) / rayDirection.y,\n        t4 = (candidate.y - half - rayOrigin.y) / rayDirection.y,\n        t5 = (candidate.z - half - rayOrigin.z) / rayDirection.z,\n        t6 = (candidate.z + half - rayOrigin.z) / rayDirection.z,\n        tmax = Math.min(Math.min(Math.max(t1, t2), Math.max(t3, t4)), Math.max(t5, t6)),\n        tmin;\n\n      if (tmax < 0) return false;\n\n      tmin = Math.max(Math.max(Math.min(t1, t2), Math.min(t3, t4)), Math.min(t5, t6));\n      return tmin <= tmax && tmin <= far;\n    }\n\n    function farEnough(x, y, z) {\n      var dist = (x - rayOrigin.x) * (x - rayOrigin.x) +\n                 (y - rayOrigin.y) * (y - rayOrigin.y) +\n                 (z - rayOrigin.z) * (z - rayOrigin.z);\n      return near <= dist && dist <= far;\n    }\n\n    function byDistanceToCamera(idx0, idx1) {\n      var x0 = rayOrigin[idx0];\n      var y0 = rayOrigin[idx0 + 1];\n      var z0 = rayOrigin[idx0 + 2];\n      var dist0 = (x0 - rayOrigin.x) * (x0 - rayOrigin.x) +\n                  (y0 - rayOrigin.y) * (y0 - rayOrigin.y) +\n                  (z0 - rayOrigin.z) * (z0 - rayOrigin.z);\n\n      var x1 = rayOrigin[idx1];\n      var y1 = rayOrigin[idx1 + 1];\n      var z1 = rayOrigin[idx1 + 2];\n\n      var dist1 = (x1 - rayOrigin.x) * (x1 - rayOrigin.x) +\n                  (y1 - rayOrigin.y) * (y1 - rayOrigin.y) +\n                  (z1 - rayOrigin.z) * (z1 - rayOrigin.z);\n      return dist0 - dist1;\n    }\n  }\n\n  function init(points) {\n    verifyPointsInvariant(points);\n    originalArray = points;\n    root = createRootNode(points);\n    for (var i = 0; i < points.length; i += 3) {\n      root.insert(i, originalArray, 0);\n    }\n  }\n\n  function initAsync(points, doneCallback) {\n    verifyPointsInvariant(points);\n\n    var tempRoot = createRootNode(points);\n    asyncFor(points, insertToRoot, doneInternal, { step: 3 });\n\n    function insertToRoot(element, i) {\n      tempRoot.insert(i, points, 0);\n    }\n\n    function doneInternal() {\n      originalArray = points;\n      root = tempRoot;\n      if (typeof doneCallback === 'function') {\n        doneCallback(api);\n      }\n    }\n  }\n\n  function verifyPointsInvariant(points) {\n    if (!points) throw new Error('Points array is required for quadtree to work');\n    if (typeof points.length !== 'number') throw new Error('Points should be array-like object');\n    if (points.length % 3 !== 0) throw new Error('Points array should consist of series of x,y,z coordinates and be multiple of 3');\n  }\n\n  function getBounds() {\n    if (!root) return EmptyRegion;\n    return root.bounds;\n  }\n\n  function createRootNode(points) {\n    // Edge case deserves empty region:\n    if (points.length === 0) {\n      var empty = new Bounds3();\n      return new TreeNode(empty);\n    }\n\n    // Otherwise let's figure out how big should be the root region\n    var minX = Number.POSITIVE_INFINITY;\n    var minY = Number.POSITIVE_INFINITY;\n    var minZ = Number.POSITIVE_INFINITY;\n    var maxX = Number.NEGATIVE_INFINITY;\n    var maxY = Number.NEGATIVE_INFINITY;\n    var maxZ = Number.NEGATIVE_INFINITY;\n    for (var i = 0; i < points.length; i += 3) {\n      var x = points[i],\n        y = points[i + 1],\n        z = points[i + 2];\n      if (x < minX) minX = x;\n      if (x > maxX) maxX = x;\n      if (y < minY) minY = y;\n      if (y > maxY) maxY = y;\n      if (z < minZ) minZ = z;\n      if (z > maxZ) maxZ = z;\n    }\n\n    // Make bounds square:\n    var side = Math.max(Math.max(maxX - minX, maxY - minY), maxZ - minZ);\n    // since we need to have both sides inside the area, let's artificially\n    // grow the root region:\n    side += 2;\n    minX -= 1;\n    minY -= 1;\n    minZ -= 1;\n    var half = side / 2;\n\n    var bounds = new Bounds3(minX + half, minY + half, minZ + half, half);\n    return new TreeNode(bounds);\n  }\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMveWFvdC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLGtFQUFrQjtBQUN4QyxlQUFlLG1CQUFPLENBQUMsb0VBQW1CO0FBQzFDO0FBQ0EsZUFBZSxtQkFBTyxDQUFDLGtEQUFPOztBQUU5Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFVBQVU7QUFDekI7QUFDQTtBQUNBO0FBQ0EsZUFBZSxXQUFXO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxVQUFVO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QixlQUFlLFNBQVM7QUFDeEIsZUFBZSxTQUFTO0FBQ3hCLGVBQWUsU0FBUztBQUN4QjtBQUNBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFtQjtBQUN2QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUFtRCxTQUFTOztBQUU1RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixtQkFBbUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dC10ZXN0Ly4vbm9kZV9tb2R1bGVzL3lhb3QvaW5kZXguanM/YzgyOCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFJlcHJlc2VudHMgb2N0cmVlIGRhdGEgc3RydWN0dXJlXG4gKlxuICogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvT2N0cmVlXG4gKi9cbnZhciBCb3VuZHMzID0gcmVxdWlyZSgnLi9saWIvYm91bmRzMy5qcycpO1xudmFyIFRyZWVOb2RlID0gcmVxdWlyZSgnLi9saWIvdHJlZU5vZGUuanMnKTtcbnZhciBFbXB0eVJlZ2lvbiA9IG5ldyBCb3VuZHMzKCk7XG52YXIgYXN5bmNGb3IgPSByZXF1aXJlKCdyYWZvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVRyZWU7XG5cbmZ1bmN0aW9uIGNyZWF0ZVRyZWUob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIG5vUG9pbnRzID0gW107XG5cbiAgdmFyIHJvb3Q7XG4gIHZhciBvcmlnaW5hbEFycmF5O1xuICB2YXIgYXBpID0ge1xuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIHRyZWUgYXN5bmNocm9ub3VzbHkuIFZlcnkgdXNlZnVsIHdoZW4geW91IGhhdmUgbWlsbGlvbnNcbiAgICAgKiBvZiBwb2ludHMgYW5kIGRvIG5vdCB3YW50IHRvIGJsb2NrIHJlbmRlcmluZyB0aHJlYWQgZm9yIHRvbyBsb25nLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gcG9pbnRzIGFycmF5IG9mIHBvaW50cyBmb3Igd2hpY2ggd2UgYXJlIGJ1aWxkaW5nIHRoZVxuICAgICAqIHRyZWUuIEZsYXQgc2VxdWVuY2Ugb2YgKHgsIHksIHopIGNvb3JkaW5hdGVzLiBBcnJheSBsZW5ndGggc2hvdWxkIGJlXG4gICAgICogbXVsdGlwbGUgb2YgMy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb249fSBkb25lQ2FsbGJhY2sgY2FsbGVkIHdoZW4gdHJlZSBpcyBpbml0aWFsaXplZC4gVGhlXG4gICAgICogY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgd2l0aCBzaW5nbGUgYXJndW1lbnQgd2hpY2ggcmVwcmVzZW50IGN1cnJlbnRcbiAgICAgKiB0cmVlLlxuICAgICAqL1xuICAgIGluaXRBc3luYzogaW5pdEFzeW5jLFxuXG4gICAgLyoqXG4gICAgICogU3luY2hyb25vdXMgdmVyc2lvbiBvZiBgaW5pdEFzeW5jKClgLiBTaG91bGQgb25seSBiZSB1c2VkIGZvciBzbWFsbFxuICAgICAqIHRyZWVzIChsZXNzIHRoYW4gNTAtNzBrIG9mIHBvaW50cykuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSBwb2ludHMgYXJyYXkgb2YgcG9pbnRzIGZvciB3aGljaCB3ZSBhcmUgYnVpbGRpbmcgdGhlXG4gICAgICogdHJlZS4gRmxhdCBzZXF1ZW5jZSBvZiAoeCwgeSwgeikgY29vcmRpbmF0ZXMuIEFycmF5IGxlbmd0aCBzaG91bGQgYmVcbiAgICAgKiBtdWx0aXBsZSBvZiAzLlxuICAgICAqL1xuICAgIGluaXQ6IGluaXQsXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGJvdW5kcyBvZiB0aGUgcm9vdCBub2RlLiBCb3VuZHMgYXJlIHJlcHJlc2VudGVkIGJ5IGNlbnRlciBvZiB0aGVcbiAgICAgKiBub2RlICh4LCB5LCB6KSBhbmQgYGhhbGZgIGF0dHJpYnV0ZSAtIGRpc3RhbmNlIGZyb20gdGhlIGNlbnRlciB0byBhblxuICAgICAqIGVkZ2Ugb2YgdGhlIHJvb3Qgbm9kZS5cbiAgICAgKi9cbiAgICBib3VuZHM6IGdldEJvdW5kcyxcblxuICAgIC8qKlxuICAgICAqIEZpcmVzIGEgcmF5IGZyb20gYHJheU9yaWdpbmAgaW50byBgcmF5RGlyZWN0aW9uYCBhbmQgY29sbGVjdHMgYWxsIHBvaW50c1xuICAgICAqIHRoYXQgbGllIGluIHRoZSBvY3RhbnRzIGludGVyc2VjdGVkIGJ5IHRoZSByYXkuXG4gICAgICpcbiAgICAgKiBUaGlzIG1ldGhvZCBpbXBsZW1lbnRzIEFuIEVmZmljaWVudCBQYXJhbWV0cmljIEFsZ29yaXRobSBmb3IgT2N0cmVlIFRyYXZlcnNhbFxuICAgICAqIGRlc2NyaWJlZCBpbiBodHRwOi8vd3NjZy56Y3UuY3ovd3NjZzIwMDAvUGFwZXJzXzIwMDAvWDMxLnBkZlxuICAgICAqXG4gICAgICogQHBhcmFtIHtWZWN0b3IzfSByYXlPcmlnaW4geCx5LHogY29vcmRpbmF0ZXMgd2hlcmUgcmF5IHN0YXJ0c1xuICAgICAqIEBwYXJhbSB7VmVjdG9yM30gcmF5RGlyZWN0aW9uIG5vcm1hbGl6ZWQgeCx5LHogZGlyZWN0aW9uIHdoZXJlIHJheSBzaG9vdHMuXG4gICAgICogQHBhcmFtIHtudW1iZXIrfSBuZWFyIG1pbmltdW0gZGlzdGFuY2UgZnJvbSB0aGUgcmF5IG9yaWdpbi4gMCBieSBkZWZhdWx0LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyK30gZmFyIG1heGltdW0gbGVuZ3RoIG9mIHRoZSByYXkuIFBPU0lUSVZFX0lORklOSVRZIGJ5IGRlZmF1bHRcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBvZiBpbmRpY2VzIGluIHRoZSBzb3VyY2UgYXJyYXkuIEVhY2ggaW5kZXggcmVwcmVzbnRzIGEgc3RhcnRcbiAgICAgKiBvZiB0aGUgeCx5LHogdHJpcGxldCBvZiBhIHBvaW50LCB0aGF0IGxpZXMgaW4gdGhlIGludGVyc2VjdGVkIG9jdGFudC5cbiAgICAgKi9cbiAgICBpbnRlcnNlY3RSYXk6IGludGVyc2VjdFJheSxcblxuICAgIC8qKlxuICAgICAqIE9uY2UgeW91IGhhdmUgY29sbGVjdGVkIHBvaW50cyBmcm9tIHRoZSBvY3RhbnRzIGludGVyc2VjdGVkIGJ5IGEgcmF5XG4gICAgICogKGBpbnRlcnNlY3RSYXkoKWAgbWV0aG9kKSwgaXQgbWF5IGJlIHdvcnRoIHRvIHF1ZXJ5IHBvaW50cyBmcm9tIHRoZSBzdXJyb3VuaW5nXG4gICAgICogYXJlYS5cbiAgICAgKi9cbiAgICBpbnRlcnNlY3RTcGhlcmU6IGludGVyc2VjdFNwaGVyZSxcblxuICAgIC8qKlxuICAgICAqIEdldHMgcm9vdCBub2RlIG9mIHRoZSB0cmVlXG4gICAgICovXG4gICAgZ2V0Um9vdDogZ2V0Um9vdFxuICB9O1xuXG4gIHJldHVybiBhcGk7XG5cbiAgZnVuY3Rpb24gZ2V0Um9vdCgpIHtcbiAgICByZXR1cm4gcm9vdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGludGVyc2VjdFNwaGVyZShjeCwgY3ksIGN6LCByKSB7XG4gICAgaWYgKCFyb290KSB7XG4gICAgICAvLyBNb3N0IGxpa2VseSB3ZSBhcmUgbm90IGluaXRpYWxpemVkIHlldFxuICAgICAgcmV0dXJuIG5vUG9pbnRzO1xuICAgIH1cbiAgICB2YXIgaW5kaWNlcyA9IFtdO1xuICAgIHZhciByMiA9IHIgKiByO1xuICAgIHJvb3QucXVlcnkoaW5kaWNlcywgb3JpZ2luYWxBcnJheSwgaW50ZXJzZWN0Q2hlY2ssIHByZWNpc2VDaGVjayk7XG4gICAgcmV0dXJuIGluZGljZXM7XG5cbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ1Nzg5NjcvY3ViZS1zcGhlcmUtaW50ZXJzZWN0aW9uLXRlc3RcbiAgICBmdW5jdGlvbiBpbnRlcnNlY3RDaGVjayhjYW5kaWRhdGUpIHtcbiAgICAgIHZhciBkaXN0ID0gcjI7XG4gICAgICB2YXIgaGFsZiA9IGNhbmRpZGF0ZS5oYWxmO1xuICAgICAgaWYgKGN4IDwgY2FuZGlkYXRlLnggLSBoYWxmKSBkaXN0IC09IHNxcihjeCAtIChjYW5kaWRhdGUueCAtIGhhbGYpKTtcbiAgICAgIGVsc2UgaWYgKGN4ID4gY2FuZGlkYXRlLnggKyBoYWxmKSBkaXN0IC09IHNxcihjeCAtIChjYW5kaWRhdGUueCArIGhhbGYpKTtcblxuICAgICAgaWYgKGN5IDwgY2FuZGlkYXRlLnkgLSBoYWxmKSBkaXN0IC09IHNxcihjeSAtIChjYW5kaWRhdGUueSAtIGhhbGYpKTtcbiAgICAgIGVsc2UgaWYgKGN5ID4gY2FuZGlkYXRlLnkgKyBoYWxmKSBkaXN0IC09IHNxcihjeSAtIChjYW5kaWRhdGUueSArIGhhbGYpKTtcblxuICAgICAgaWYgKGN6IDwgY2FuZGlkYXRlLnogLSBoYWxmKSBkaXN0IC09IHNxcihjeiAtIChjYW5kaWRhdGUueiAtIGhhbGYpKTtcbiAgICAgIGVsc2UgaWYgKGN6ID4gY2FuZGlkYXRlLnogKyBoYWxmKSBkaXN0IC09IHNxcihjeiAtIChjYW5kaWRhdGUueiArIGhhbGYpKTtcbiAgICAgIHJldHVybiBkaXN0ID4gMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmVjaXNlQ2hlY2soeCwgeSwgeikge1xuICAgICAgcmV0dXJuIHNxcih4IC0gY3gpICsgc3FyKHkgLSBjeSkgKyBzcXIoeiAtIGN6KSA8IHIyO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNxcih4KSB7XG4gICAgcmV0dXJuIHggKiB4O1xuICB9XG5cbiAgZnVuY3Rpb24gaW50ZXJzZWN0UmF5KHJheU9yaWdpbiwgcmF5RGlyZWN0aW9uLCBuZWFyLCBmYXIpIHtcbiAgICBpZiAoIXJvb3QpIHtcbiAgICAgIC8vIE1vc3QgbGlrZWx5IHdlIGFyZSBub3QgaW5pdGlhbGl6ZWQgeWV0XG4gICAgICByZXR1cm4gbm9Qb2ludHM7XG4gICAgfVxuXG4gICAgaWYgKG5lYXIgPT09IHVuZGVmaW5lZCkgbmVhciA9IDA7XG4gICAgaWYgKGZhciA9PT0gdW5kZWZpbmVkKSBmYXIgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gICAgLy8gd2Ugc2F2ZSBhcyBzcXVhciwgdG8gYXZvaWQgZXhwZW5zaXZlIHNxcnQoKSBvcGVyYXRpb25cbiAgICBuZWFyICo9IG5lYXI7XG4gICAgZmFyICo9IGZhcjtcblxuICAgIHZhciBpbmRpY2VzID0gW107XG4gICAgcm9vdC5xdWVyeShpbmRpY2VzLCBvcmlnaW5hbEFycmF5LCBpbnRlcnNlY3RDaGVjaywgZmFyRW5vdWdoKTtcbiAgICByZXR1cm4gaW5kaWNlcy5zb3J0KGJ5RGlzdGFuY2VUb0NhbWVyYSk7XG5cbiAgICBmdW5jdGlvbiBpbnRlcnNlY3RDaGVjayhjYW5kaWRhdGUpIHtcbiAgICAgIC8vIHVzaW5nIGh0dHA6Ly93c2NnLnpjdS5jei93c2NnMjAwMC9QYXBlcnNfMjAwMC9YMzEucGRmXG4gICAgICB2YXIgaGFsZiA9IGNhbmRpZGF0ZS5oYWxmO1xuICAgICAgdmFyIHQxID0gKGNhbmRpZGF0ZS54IC0gaGFsZiAtIHJheU9yaWdpbi54KSAvIHJheURpcmVjdGlvbi54LFxuICAgICAgICB0MiA9IChjYW5kaWRhdGUueCArIGhhbGYgLSByYXlPcmlnaW4ueCkgLyByYXlEaXJlY3Rpb24ueCxcbiAgICAgICAgdDMgPSAoY2FuZGlkYXRlLnkgKyBoYWxmIC0gcmF5T3JpZ2luLnkpIC8gcmF5RGlyZWN0aW9uLnksXG4gICAgICAgIHQ0ID0gKGNhbmRpZGF0ZS55IC0gaGFsZiAtIHJheU9yaWdpbi55KSAvIHJheURpcmVjdGlvbi55LFxuICAgICAgICB0NSA9IChjYW5kaWRhdGUueiAtIGhhbGYgLSByYXlPcmlnaW4ueikgLyByYXlEaXJlY3Rpb24ueixcbiAgICAgICAgdDYgPSAoY2FuZGlkYXRlLnogKyBoYWxmIC0gcmF5T3JpZ2luLnopIC8gcmF5RGlyZWN0aW9uLnosXG4gICAgICAgIHRtYXggPSBNYXRoLm1pbihNYXRoLm1pbihNYXRoLm1heCh0MSwgdDIpLCBNYXRoLm1heCh0MywgdDQpKSwgTWF0aC5tYXgodDUsIHQ2KSksXG4gICAgICAgIHRtaW47XG5cbiAgICAgIGlmICh0bWF4IDwgMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICB0bWluID0gTWF0aC5tYXgoTWF0aC5tYXgoTWF0aC5taW4odDEsIHQyKSwgTWF0aC5taW4odDMsIHQ0KSksIE1hdGgubWluKHQ1LCB0NikpO1xuICAgICAgcmV0dXJuIHRtaW4gPD0gdG1heCAmJiB0bWluIDw9IGZhcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmYXJFbm91Z2goeCwgeSwgeikge1xuICAgICAgdmFyIGRpc3QgPSAoeCAtIHJheU9yaWdpbi54KSAqICh4IC0gcmF5T3JpZ2luLngpICtcbiAgICAgICAgICAgICAgICAgKHkgLSByYXlPcmlnaW4ueSkgKiAoeSAtIHJheU9yaWdpbi55KSArXG4gICAgICAgICAgICAgICAgICh6IC0gcmF5T3JpZ2luLnopICogKHogLSByYXlPcmlnaW4ueik7XG4gICAgICByZXR1cm4gbmVhciA8PSBkaXN0ICYmIGRpc3QgPD0gZmFyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ5RGlzdGFuY2VUb0NhbWVyYShpZHgwLCBpZHgxKSB7XG4gICAgICB2YXIgeDAgPSByYXlPcmlnaW5baWR4MF07XG4gICAgICB2YXIgeTAgPSByYXlPcmlnaW5baWR4MCArIDFdO1xuICAgICAgdmFyIHowID0gcmF5T3JpZ2luW2lkeDAgKyAyXTtcbiAgICAgIHZhciBkaXN0MCA9ICh4MCAtIHJheU9yaWdpbi54KSAqICh4MCAtIHJheU9yaWdpbi54KSArXG4gICAgICAgICAgICAgICAgICAoeTAgLSByYXlPcmlnaW4ueSkgKiAoeTAgLSByYXlPcmlnaW4ueSkgK1xuICAgICAgICAgICAgICAgICAgKHowIC0gcmF5T3JpZ2luLnopICogKHowIC0gcmF5T3JpZ2luLnopO1xuXG4gICAgICB2YXIgeDEgPSByYXlPcmlnaW5baWR4MV07XG4gICAgICB2YXIgeTEgPSByYXlPcmlnaW5baWR4MSArIDFdO1xuICAgICAgdmFyIHoxID0gcmF5T3JpZ2luW2lkeDEgKyAyXTtcblxuICAgICAgdmFyIGRpc3QxID0gKHgxIC0gcmF5T3JpZ2luLngpICogKHgxIC0gcmF5T3JpZ2luLngpICtcbiAgICAgICAgICAgICAgICAgICh5MSAtIHJheU9yaWdpbi55KSAqICh5MSAtIHJheU9yaWdpbi55KSArXG4gICAgICAgICAgICAgICAgICAoejEgLSByYXlPcmlnaW4ueikgKiAoejEgLSByYXlPcmlnaW4ueik7XG4gICAgICByZXR1cm4gZGlzdDAgLSBkaXN0MTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KHBvaW50cykge1xuICAgIHZlcmlmeVBvaW50c0ludmFyaWFudChwb2ludHMpO1xuICAgIG9yaWdpbmFsQXJyYXkgPSBwb2ludHM7XG4gICAgcm9vdCA9IGNyZWF0ZVJvb3ROb2RlKHBvaW50cyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpICs9IDMpIHtcbiAgICAgIHJvb3QuaW5zZXJ0KGksIG9yaWdpbmFsQXJyYXksIDApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRBc3luYyhwb2ludHMsIGRvbmVDYWxsYmFjaykge1xuICAgIHZlcmlmeVBvaW50c0ludmFyaWFudChwb2ludHMpO1xuXG4gICAgdmFyIHRlbXBSb290ID0gY3JlYXRlUm9vdE5vZGUocG9pbnRzKTtcbiAgICBhc3luY0Zvcihwb2ludHMsIGluc2VydFRvUm9vdCwgZG9uZUludGVybmFsLCB7IHN0ZXA6IDMgfSk7XG5cbiAgICBmdW5jdGlvbiBpbnNlcnRUb1Jvb3QoZWxlbWVudCwgaSkge1xuICAgICAgdGVtcFJvb3QuaW5zZXJ0KGksIHBvaW50cywgMCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZG9uZUludGVybmFsKCkge1xuICAgICAgb3JpZ2luYWxBcnJheSA9IHBvaW50cztcbiAgICAgIHJvb3QgPSB0ZW1wUm9vdDtcbiAgICAgIGlmICh0eXBlb2YgZG9uZUNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGRvbmVDYWxsYmFjayhhcGkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHZlcmlmeVBvaW50c0ludmFyaWFudChwb2ludHMpIHtcbiAgICBpZiAoIXBvaW50cykgdGhyb3cgbmV3IEVycm9yKCdQb2ludHMgYXJyYXkgaXMgcmVxdWlyZWQgZm9yIHF1YWR0cmVlIHRvIHdvcmsnKTtcbiAgICBpZiAodHlwZW9mIHBvaW50cy5sZW5ndGggIT09ICdudW1iZXInKSB0aHJvdyBuZXcgRXJyb3IoJ1BvaW50cyBzaG91bGQgYmUgYXJyYXktbGlrZSBvYmplY3QnKTtcbiAgICBpZiAocG9pbnRzLmxlbmd0aCAlIDMgIT09IDApIHRocm93IG5ldyBFcnJvcignUG9pbnRzIGFycmF5IHNob3VsZCBjb25zaXN0IG9mIHNlcmllcyBvZiB4LHkseiBjb29yZGluYXRlcyBhbmQgYmUgbXVsdGlwbGUgb2YgMycpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Qm91bmRzKCkge1xuICAgIGlmICghcm9vdCkgcmV0dXJuIEVtcHR5UmVnaW9uO1xuICAgIHJldHVybiByb290LmJvdW5kcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVJvb3ROb2RlKHBvaW50cykge1xuICAgIC8vIEVkZ2UgY2FzZSBkZXNlcnZlcyBlbXB0eSByZWdpb246XG4gICAgaWYgKHBvaW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHZhciBlbXB0eSA9IG5ldyBCb3VuZHMzKCk7XG4gICAgICByZXR1cm4gbmV3IFRyZWVOb2RlKGVtcHR5KTtcbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2UgbGV0J3MgZmlndXJlIG91dCBob3cgYmlnIHNob3VsZCBiZSB0aGUgcm9vdCByZWdpb25cbiAgICB2YXIgbWluWCA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgICB2YXIgbWluWSA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgICB2YXIgbWluWiA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgICB2YXIgbWF4WCA9IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcbiAgICB2YXIgbWF4WSA9IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcbiAgICB2YXIgbWF4WiA9IE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkgKz0gMykge1xuICAgICAgdmFyIHggPSBwb2ludHNbaV0sXG4gICAgICAgIHkgPSBwb2ludHNbaSArIDFdLFxuICAgICAgICB6ID0gcG9pbnRzW2kgKyAyXTtcbiAgICAgIGlmICh4IDwgbWluWCkgbWluWCA9IHg7XG4gICAgICBpZiAoeCA+IG1heFgpIG1heFggPSB4O1xuICAgICAgaWYgKHkgPCBtaW5ZKSBtaW5ZID0geTtcbiAgICAgIGlmICh5ID4gbWF4WSkgbWF4WSA9IHk7XG4gICAgICBpZiAoeiA8IG1pblopIG1pblogPSB6O1xuICAgICAgaWYgKHogPiBtYXhaKSBtYXhaID0gejtcbiAgICB9XG5cbiAgICAvLyBNYWtlIGJvdW5kcyBzcXVhcmU6XG4gICAgdmFyIHNpZGUgPSBNYXRoLm1heChNYXRoLm1heChtYXhYIC0gbWluWCwgbWF4WSAtIG1pblkpLCBtYXhaIC0gbWluWik7XG4gICAgLy8gc2luY2Ugd2UgbmVlZCB0byBoYXZlIGJvdGggc2lkZXMgaW5zaWRlIHRoZSBhcmVhLCBsZXQncyBhcnRpZmljaWFsbHlcbiAgICAvLyBncm93IHRoZSByb290IHJlZ2lvbjpcbiAgICBzaWRlICs9IDI7XG4gICAgbWluWCAtPSAxO1xuICAgIG1pblkgLT0gMTtcbiAgICBtaW5aIC09IDE7XG4gICAgdmFyIGhhbGYgPSBzaWRlIC8gMjtcblxuICAgIHZhciBib3VuZHMgPSBuZXcgQm91bmRzMyhtaW5YICsgaGFsZiwgbWluWSArIGhhbGYsIG1pblogKyBoYWxmLCBoYWxmKTtcbiAgICByZXR1cm4gbmV3IFRyZWVOb2RlKGJvdW5kcyk7XG4gIH1cbn1cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/yaot/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/yaot/lib/bounds3.js":
/*!******************************************!*\
  !*** ./node_modules/yaot/lib/bounds3.js ***!
  \******************************************/
/***/ ((module) => {

eval("module.exports = Bounds3;\n\nfunction Bounds3(x, y, z, half) {\n  this.x = typeof x === 'number' ? x : 0;\n  this.y = typeof y === 'number' ? y : 0;\n  this.z = typeof z === 'number' ? z : 0;\n  this.half = typeof half === 'number' ? half : 0;\n}\n\nBounds3.prototype.contains = function contains(x, y, z) {\n  var half = this.half;\n  return this.x - half <= x && x < this.x + half &&\n    this.y - half <= y && y < this.y + half &&\n    this.z - half <= z && z < this.z + half;\n};\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMveWFvdC9saWIvYm91bmRzMy5qcyIsIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dC10ZXN0Ly4vbm9kZV9tb2R1bGVzL3lhb3QvbGliL2JvdW5kczMuanM/Yzg1ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IEJvdW5kczM7XG5cbmZ1bmN0aW9uIEJvdW5kczMoeCwgeSwgeiwgaGFsZikge1xuICB0aGlzLnggPSB0eXBlb2YgeCA9PT0gJ251bWJlcicgPyB4IDogMDtcbiAgdGhpcy55ID0gdHlwZW9mIHkgPT09ICdudW1iZXInID8geSA6IDA7XG4gIHRoaXMueiA9IHR5cGVvZiB6ID09PSAnbnVtYmVyJyA/IHogOiAwO1xuICB0aGlzLmhhbGYgPSB0eXBlb2YgaGFsZiA9PT0gJ251bWJlcicgPyBoYWxmIDogMDtcbn1cblxuQm91bmRzMy5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiBjb250YWlucyh4LCB5LCB6KSB7XG4gIHZhciBoYWxmID0gdGhpcy5oYWxmO1xuICByZXR1cm4gdGhpcy54IC0gaGFsZiA8PSB4ICYmIHggPCB0aGlzLnggKyBoYWxmICYmXG4gICAgdGhpcy55IC0gaGFsZiA8PSB5ICYmIHkgPCB0aGlzLnkgKyBoYWxmICYmXG4gICAgdGhpcy56IC0gaGFsZiA8PSB6ICYmIHogPCB0aGlzLnogKyBoYWxmO1xufTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/yaot/lib/bounds3.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/yaot/lib/treeNode.js":
/*!*******************************************!*\
  !*** ./node_modules/yaot/lib/treeNode.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var Bounds3 = __webpack_require__(/*! ./bounds3.js */ \"(ssr)/./node_modules/yaot/lib/bounds3.js\");\nvar MAX_ITEMS = 4;\n\nmodule.exports = TreeNode;\n\nfunction TreeNode(bounds) {\n  this.bounds = bounds;\n  this.q0 = null;\n  this.q1 = null;\n  this.q2 = null;\n  this.q3 = null;\n  this.q4 = null;\n  this.q5 = null;\n  this.q6 = null;\n  this.q7 = null;\n  this.items = null;\n}\n\nTreeNode.prototype.subdivide = function subdivide() {\n  var bounds = this.bounds;\n  var quarter = bounds.half / 2;\n\n  this.q0 = new TreeNode(new Bounds3(bounds.x - quarter, bounds.y - quarter, bounds.z - quarter, quarter));\n  this.q1 = new TreeNode(new Bounds3(bounds.x + quarter, bounds.y - quarter, bounds.z - quarter, quarter));\n  this.q2 = new TreeNode(new Bounds3(bounds.x - quarter, bounds.y + quarter, bounds.z - quarter, quarter));\n  this.q3 = new TreeNode(new Bounds3(bounds.x + quarter, bounds.y + quarter, bounds.z - quarter, quarter));\n  this.q4 = new TreeNode(new Bounds3(bounds.x - quarter, bounds.y - quarter, bounds.z + quarter, quarter));\n  this.q5 = new TreeNode(new Bounds3(bounds.x + quarter, bounds.y - quarter, bounds.z + quarter, quarter));\n  this.q6 = new TreeNode(new Bounds3(bounds.x - quarter, bounds.y + quarter, bounds.z + quarter, quarter));\n  this.q7 = new TreeNode(new Bounds3(bounds.x + quarter, bounds.y + quarter, bounds.z + quarter, quarter));\n};\n\nTreeNode.prototype.insert = function insert(idx, array, depth) {\n  var isLeaf = this.q0 === null;\n  if (isLeaf) {\n    // TODO: this memory could be recycled to avoid GC\n    if (this.items === null) {\n      this.items = [idx];\n    } else {\n      this.items.push(idx);\n    }\n    if (this.items.length >= MAX_ITEMS && depth < 16) {\n      this.subdivide();\n      for (var i = 0; i < this.items.length; ++i) {\n        this.insert(this.items[i], array, depth + 1);\n      }\n      this.items = null;\n    }\n  } else {\n    var x = array[idx],\n      y = array[idx + 1],\n      z = array[idx + 2];\n    var bounds = this.bounds;\n    var quadIdx = 0; // assume NW\n    if (x > bounds.x) {\n      quadIdx += 1; // nope, we are in E part\n    }\n    if (y > bounds.y) {\n      quadIdx += 2; // Somewhere south.\n    }\n    if (z > bounds.z) {\n      quadIdx += 4; // Somewhere far\n    }\n\n    var child = getChild(this, quadIdx);\n    child.insert(idx, array, depth + 1);\n  }\n};\n\nTreeNode.prototype.query = function queryBounds(results, sourceArray, intersects, preciseCheck) {\n  if (!intersects(this.bounds)) return;\n  var items = this.items;\n  var needsCheck = typeof preciseCheck === 'function';\n  if (items) {\n    for (var i = 0; i < items.length; ++i) {\n      var idx = items[i];\n      if (needsCheck) {\n        if (preciseCheck(sourceArray[idx], sourceArray[idx + 1], sourceArray[idx + 2])) {\n          results.push(idx);\n        }\n      } else {\n        results.push(idx);\n      }\n    }\n  }\n\n  if (!this.q0) return;\n\n  this.q0.query(results, sourceArray, intersects, preciseCheck);\n  this.q1.query(results, sourceArray, intersects, preciseCheck);\n  this.q2.query(results, sourceArray, intersects, preciseCheck);\n  this.q3.query(results, sourceArray, intersects, preciseCheck);\n  this.q4.query(results, sourceArray, intersects, preciseCheck);\n  this.q5.query(results, sourceArray, intersects, preciseCheck);\n  this.q6.query(results, sourceArray, intersects, preciseCheck);\n  this.q7.query(results, sourceArray, intersects, preciseCheck);\n};\n\nfunction getChild(node, idx) {\n  if (idx === 0) return node.q0;\n  if (idx === 1) return node.q1;\n  if (idx === 2) return node.q2;\n  if (idx === 3) return node.q3;\n  if (idx === 4) return node.q4;\n  if (idx === 5) return node.q5;\n  if (idx === 6) return node.q6;\n  if (idx === 7) return node.q7;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMveWFvdC9saWIvdHJlZU5vZGUuanMiLCJtYXBwaW5ncyI6IkFBQUEsY0FBYyxtQkFBTyxDQUFDLDhEQUFjO0FBQ3BDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix1QkFBdUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dC10ZXN0Ly4vbm9kZV9tb2R1bGVzL3lhb3QvbGliL3RyZWVOb2RlLmpzP2Q2NzgiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIEJvdW5kczMgPSByZXF1aXJlKCcuL2JvdW5kczMuanMnKTtcbnZhciBNQVhfSVRFTVMgPSA0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyZWVOb2RlO1xuXG5mdW5jdGlvbiBUcmVlTm9kZShib3VuZHMpIHtcbiAgdGhpcy5ib3VuZHMgPSBib3VuZHM7XG4gIHRoaXMucTAgPSBudWxsO1xuICB0aGlzLnExID0gbnVsbDtcbiAgdGhpcy5xMiA9IG51bGw7XG4gIHRoaXMucTMgPSBudWxsO1xuICB0aGlzLnE0ID0gbnVsbDtcbiAgdGhpcy5xNSA9IG51bGw7XG4gIHRoaXMucTYgPSBudWxsO1xuICB0aGlzLnE3ID0gbnVsbDtcbiAgdGhpcy5pdGVtcyA9IG51bGw7XG59XG5cblRyZWVOb2RlLnByb3RvdHlwZS5zdWJkaXZpZGUgPSBmdW5jdGlvbiBzdWJkaXZpZGUoKSB7XG4gIHZhciBib3VuZHMgPSB0aGlzLmJvdW5kcztcbiAgdmFyIHF1YXJ0ZXIgPSBib3VuZHMuaGFsZiAvIDI7XG5cbiAgdGhpcy5xMCA9IG5ldyBUcmVlTm9kZShuZXcgQm91bmRzMyhib3VuZHMueCAtIHF1YXJ0ZXIsIGJvdW5kcy55IC0gcXVhcnRlciwgYm91bmRzLnogLSBxdWFydGVyLCBxdWFydGVyKSk7XG4gIHRoaXMucTEgPSBuZXcgVHJlZU5vZGUobmV3IEJvdW5kczMoYm91bmRzLnggKyBxdWFydGVyLCBib3VuZHMueSAtIHF1YXJ0ZXIsIGJvdW5kcy56IC0gcXVhcnRlciwgcXVhcnRlcikpO1xuICB0aGlzLnEyID0gbmV3IFRyZWVOb2RlKG5ldyBCb3VuZHMzKGJvdW5kcy54IC0gcXVhcnRlciwgYm91bmRzLnkgKyBxdWFydGVyLCBib3VuZHMueiAtIHF1YXJ0ZXIsIHF1YXJ0ZXIpKTtcbiAgdGhpcy5xMyA9IG5ldyBUcmVlTm9kZShuZXcgQm91bmRzMyhib3VuZHMueCArIHF1YXJ0ZXIsIGJvdW5kcy55ICsgcXVhcnRlciwgYm91bmRzLnogLSBxdWFydGVyLCBxdWFydGVyKSk7XG4gIHRoaXMucTQgPSBuZXcgVHJlZU5vZGUobmV3IEJvdW5kczMoYm91bmRzLnggLSBxdWFydGVyLCBib3VuZHMueSAtIHF1YXJ0ZXIsIGJvdW5kcy56ICsgcXVhcnRlciwgcXVhcnRlcikpO1xuICB0aGlzLnE1ID0gbmV3IFRyZWVOb2RlKG5ldyBCb3VuZHMzKGJvdW5kcy54ICsgcXVhcnRlciwgYm91bmRzLnkgLSBxdWFydGVyLCBib3VuZHMueiArIHF1YXJ0ZXIsIHF1YXJ0ZXIpKTtcbiAgdGhpcy5xNiA9IG5ldyBUcmVlTm9kZShuZXcgQm91bmRzMyhib3VuZHMueCAtIHF1YXJ0ZXIsIGJvdW5kcy55ICsgcXVhcnRlciwgYm91bmRzLnogKyBxdWFydGVyLCBxdWFydGVyKSk7XG4gIHRoaXMucTcgPSBuZXcgVHJlZU5vZGUobmV3IEJvdW5kczMoYm91bmRzLnggKyBxdWFydGVyLCBib3VuZHMueSArIHF1YXJ0ZXIsIGJvdW5kcy56ICsgcXVhcnRlciwgcXVhcnRlcikpO1xufTtcblxuVHJlZU5vZGUucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uIGluc2VydChpZHgsIGFycmF5LCBkZXB0aCkge1xuICB2YXIgaXNMZWFmID0gdGhpcy5xMCA9PT0gbnVsbDtcbiAgaWYgKGlzTGVhZikge1xuICAgIC8vIFRPRE86IHRoaXMgbWVtb3J5IGNvdWxkIGJlIHJlY3ljbGVkIHRvIGF2b2lkIEdDXG4gICAgaWYgKHRoaXMuaXRlbXMgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuaXRlbXMgPSBbaWR4XTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pdGVtcy5wdXNoKGlkeCk7XG4gICAgfVxuICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aCA+PSBNQVhfSVRFTVMgJiYgZGVwdGggPCAxNikge1xuICAgICAgdGhpcy5zdWJkaXZpZGUoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7ICsraSkge1xuICAgICAgICB0aGlzLmluc2VydCh0aGlzLml0ZW1zW2ldLCBhcnJheSwgZGVwdGggKyAxKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuaXRlbXMgPSBudWxsO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgeCA9IGFycmF5W2lkeF0sXG4gICAgICB5ID0gYXJyYXlbaWR4ICsgMV0sXG4gICAgICB6ID0gYXJyYXlbaWR4ICsgMl07XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuYm91bmRzO1xuICAgIHZhciBxdWFkSWR4ID0gMDsgLy8gYXNzdW1lIE5XXG4gICAgaWYgKHggPiBib3VuZHMueCkge1xuICAgICAgcXVhZElkeCArPSAxOyAvLyBub3BlLCB3ZSBhcmUgaW4gRSBwYXJ0XG4gICAgfVxuICAgIGlmICh5ID4gYm91bmRzLnkpIHtcbiAgICAgIHF1YWRJZHggKz0gMjsgLy8gU29tZXdoZXJlIHNvdXRoLlxuICAgIH1cbiAgICBpZiAoeiA+IGJvdW5kcy56KSB7XG4gICAgICBxdWFkSWR4ICs9IDQ7IC8vIFNvbWV3aGVyZSBmYXJcbiAgICB9XG5cbiAgICB2YXIgY2hpbGQgPSBnZXRDaGlsZCh0aGlzLCBxdWFkSWR4KTtcbiAgICBjaGlsZC5pbnNlcnQoaWR4LCBhcnJheSwgZGVwdGggKyAxKTtcbiAgfVxufTtcblxuVHJlZU5vZGUucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24gcXVlcnlCb3VuZHMocmVzdWx0cywgc291cmNlQXJyYXksIGludGVyc2VjdHMsIHByZWNpc2VDaGVjaykge1xuICBpZiAoIWludGVyc2VjdHModGhpcy5ib3VuZHMpKSByZXR1cm47XG4gIHZhciBpdGVtcyA9IHRoaXMuaXRlbXM7XG4gIHZhciBuZWVkc0NoZWNrID0gdHlwZW9mIHByZWNpc2VDaGVjayA9PT0gJ2Z1bmN0aW9uJztcbiAgaWYgKGl0ZW1zKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGlkeCA9IGl0ZW1zW2ldO1xuICAgICAgaWYgKG5lZWRzQ2hlY2spIHtcbiAgICAgICAgaWYgKHByZWNpc2VDaGVjayhzb3VyY2VBcnJheVtpZHhdLCBzb3VyY2VBcnJheVtpZHggKyAxXSwgc291cmNlQXJyYXlbaWR4ICsgMl0pKSB7XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKGlkeCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdHMucHVzaChpZHgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmICghdGhpcy5xMCkgcmV0dXJuO1xuXG4gIHRoaXMucTAucXVlcnkocmVzdWx0cywgc291cmNlQXJyYXksIGludGVyc2VjdHMsIHByZWNpc2VDaGVjayk7XG4gIHRoaXMucTEucXVlcnkocmVzdWx0cywgc291cmNlQXJyYXksIGludGVyc2VjdHMsIHByZWNpc2VDaGVjayk7XG4gIHRoaXMucTIucXVlcnkocmVzdWx0cywgc291cmNlQXJyYXksIGludGVyc2VjdHMsIHByZWNpc2VDaGVjayk7XG4gIHRoaXMucTMucXVlcnkocmVzdWx0cywgc291cmNlQXJyYXksIGludGVyc2VjdHMsIHByZWNpc2VDaGVjayk7XG4gIHRoaXMucTQucXVlcnkocmVzdWx0cywgc291cmNlQXJyYXksIGludGVyc2VjdHMsIHByZWNpc2VDaGVjayk7XG4gIHRoaXMucTUucXVlcnkocmVzdWx0cywgc291cmNlQXJyYXksIGludGVyc2VjdHMsIHByZWNpc2VDaGVjayk7XG4gIHRoaXMucTYucXVlcnkocmVzdWx0cywgc291cmNlQXJyYXksIGludGVyc2VjdHMsIHByZWNpc2VDaGVjayk7XG4gIHRoaXMucTcucXVlcnkocmVzdWx0cywgc291cmNlQXJyYXksIGludGVyc2VjdHMsIHByZWNpc2VDaGVjayk7XG59O1xuXG5mdW5jdGlvbiBnZXRDaGlsZChub2RlLCBpZHgpIHtcbiAgaWYgKGlkeCA9PT0gMCkgcmV0dXJuIG5vZGUucTA7XG4gIGlmIChpZHggPT09IDEpIHJldHVybiBub2RlLnExO1xuICBpZiAoaWR4ID09PSAyKSByZXR1cm4gbm9kZS5xMjtcbiAgaWYgKGlkeCA9PT0gMykgcmV0dXJuIG5vZGUucTM7XG4gIGlmIChpZHggPT09IDQpIHJldHVybiBub2RlLnE0O1xuICBpZiAoaWR4ID09PSA1KSByZXR1cm4gbm9kZS5xNTtcbiAgaWYgKGlkeCA9PT0gNikgcmV0dXJuIG5vZGUucTY7XG4gIGlmIChpZHggPT09IDcpIHJldHVybiBub2RlLnE3O1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/yaot/lib/treeNode.js\n");

/***/ })

};
;