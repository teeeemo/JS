(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("AdbUpload", [], factory);
	else if(typeof exports === 'object')
		exports["AdbUpload"] = factory();
	else
		root["AdbUpload"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass AdbUpload {\n    constructor(option = {}) {\n        this.imageLimit = option.imageLimit || 2100000;\n        this.videoLimit = option.videoLimit || 1e20;\n        this.name = option.name || 12138;\n        this.isUploading = false;\n        this.supportImage = ['emf', 'wmf', 'jpg', 'jpeg', 'jfif', 'jpe', 'png', 'bmp', 'dib', 'rle', 'gif', 'emz', 'wmz', 'pcz', 'cgm', 'eps', 'pct', 'pict', 'wpg'];\n\n        this.segment = option.segment || 5 * 1024 * 1024;\n    }\n\n    /**\n     * 对外接口，上传图片\n     * @param {*} file \n     * @param {*} onSuccess \n     * @param {*} onFail \n     */\n    uploadImage(file, onSuccess, onFail) {\n        this.__checkCover(file, () => {\n            // 如果check成功\n            this.__uploadImage(file, onSuccess, onFail);\n        }, onFail);\n    }\n\n    /**\n     * 对外接口，上传视频\n     * @param {*} file \n     * @param {*} onSuccess \n     * @param {*} onFail \n     */\n    uploadVideo(file, onSuccess, onFail) {\n        this.__checkVideo(file, () => {\n            // 如果check成功\n            this.__uploadVideo(file, onSuccess, onFail);\n        }, onFail);\n    }\n\n    /**\n     * 检测上传的图片是否合法\n     */\n    __checkCover(file, onSuccess, onFail) {\n        // 检测该图片类型是否支持\n        if (!this.__checkCoverSupport(file)) {\n            onFail && onFail({\n                errCode: 1001,\n                content: '不支持的图片'\n            });\n\n            return;\n        }\n\n        // 检测图片大小有没有超出\n        if (file.size > this.imageLimit) {\n            onFail && onFail({\n                errCode: 1001,\n                content: '图片过大'\n            });\n\n            return;\n        }\n\n        let reader = new FileReader();\n\n        reader.onload = function (e) {\n            let data = e.target.result;\n            let image = new Image();\n\n            image.onerror = function () {\n                onFail && onFail({\n                    errCode: 1003,\n                    content: '非标准图片'\n                });\n            };\n\n            image.onload = function () {\n                onSuccess && onSuccess(reader.result);\n            };\n\n            image.src = data;\n        };\n\n        reader.readAsDataURL(file);\n    }\n\n    /**\n     * 检测上传的图片是否支持\n     */\n    __checkCoverSupport(file) {\n        let type = file.type.replace('image/', '');\n\n        if (this.supportImage.indexOf(type) === -1) {\n            // 不支持\n            return false;\n        }\n\n        return true;\n    }\n\n    /**\n     * 检测上传的视频是否合法\n     */\n    __checkVideo(file, onSuccess, onFail) {\n        // 检测视频是否过大\n        if (file.size > this.videoLimit) {\n            onFail && onFail({\n                errCode: 2001,\n                content: '视频过大'\n            });\n        }\n\n        let reader = new FileReader();\n        reader.onload = function (e) {\n            let data = e.target.result;\n            let video = document.createElement('video');\n\n            video.onload = function () {};\n            video.onerror = function () {\n                onFail && onFail({\n                    errCode: 2002,\n                    content: '非标准视频'\n                });\n            };\n            video.oncanplaythrough = function () {\n                // 这个需要一点时间\n                onSuccess && onSuccess(file);\n            };\n\n            video.src = data;\n        };\n\n        reader.readAsDataURL(file);\n    }\n\n    /**\n     * 真实上传图片的函数\n     * @param {*} file \n     * @param {*} onSuccess \n     * @param {*} onFail \n     */\n    __uploadImage(file, onSuccess, onFail) {\n        onSuccess();\n    }\n\n    /**\n     * 真实上传视频的函数\n     * @param {*} file \n     * @param {*} onSuccess \n     * @param {*} onFail \n     */\n    __uploadVideo(file, onSuccess, onFail) {\n        if (this.isUploading) {\n            onFail && onFail({\n                errCode: 3001,\n                content: '上传内容中'\n            });\n\n            return;\n        }\n\n        this.isUploading = true;\n\n        let self = this;\n        let start = 0;\n        // 文件名\n        let name = this.name + file.name.split('.')[1];\n        let percent = 0;\n        let clock = null;\n\n        clock = setInterval(upload, 1000);\n\n        function upload() {\n            if (start >= file.size) {\n                clearInterval(clock);\n                return;\n            }\n\n            let end = self.segment + start;\n            let blob = file.slice(start, end);\n            let fd = new FormData();\n\n            fd.append('fragment', blob);\n            fd.append('name', name);\n\n            percent = 100 * end / file.size;\n\n            if (percent >= 100) {\n                fd.append('end', 1);\n                this.isUploading = true;\n                onSuccess();\n            }\n\n            /**\n             * 这里有真正发送请求的代码\n             */\n            // let xhr = new XMLHttpRequest();\n            // xhr.open();\n            // xhr.send();\n            // 需要通知上传成功，调用onSuccess\n\n            start = end;\n        }\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (AdbUpload);\n\n//# sourceURL=webpack://AdbUpload/./src/index.js?");

/***/ })

/******/ })["default"];
});