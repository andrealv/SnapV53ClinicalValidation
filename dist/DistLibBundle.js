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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** @module B BaseObject*/

/**
 * Web Apps Javascript Distribution Library
 * Base implementation for the User Object
 *
 */
class BaseObject {

    constructor() {
        /**
         * Set of getProperty functions
         * the object key is the property name to be set/get
         *
         */
        this.getProperty = {
            width: (objName) => {
                return this.getElemFromName(objName).width();
            },
            height: (objName) => {
                return this.getElemFromName(objName).height();
            },
            x: (objName) => {
                var elem = this.getElemFromName(objName);
               // return Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[0], 10));  // elem.css('transform').split(',')[4])
                return elem.position().left;
            },
            y: (objName) => {
                var elem = this.getElemFromName(objName);
                //return Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[1], 10));  // elem.css('transform').split(',')[5])
                return elem.position().top;
            },
            Alpha: (objName) => {
                return this.getElemFromName(objName).css('opacity');
            },
            'Background color': (objName) => {
                return this.getElemFromName(objName).css('background-color');
            },
            'Horizontal scroll': (objName) => {
                return this.getElemFromName(objName).css('overflow-x');
            },
            'Vertical scroll': (objName) => {
                return this.getElemFromName(objName).css('overflow-y');
            },
        };

        /**
         * Set of setProperty functions
         * the object key is the property name to be set/get
         *
         */
        this.setProperty = {
            width: (objName, value) => {
                this.getElemFromName(objName).css('width', value + 'px');
            },
            height: (objName, value) => {
                this.getElemFromName(objName).css('height', value + 'px');
            },
            x: (objName, value) => {
                var elem = this.getElemFromName(objName);
                //var yPos = Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[1], 10)); // elem.css('transform').split(',')[5])
                var yPos = elem.position().top;
                // remove constraints
                this.removeConstraints(elem, 'x');
                elem.css('transform', 'translate(' + value + 'px,' + yPos + 'px)');
            },
            y: (objName, value) => {
                var elem = this.getElemFromName(objName);
                //var xPos = Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[0], 10)); // elem.css('transform').split(',')[4])
                var xPos = elem.position().left;
                // remove constraints if applied
                this.removeConstraints(elem, 'y');
                elem.css('transform', 'translate(' + xPos + 'px,' + value + 'px)');
            },
            Alpha: (objName, value) => {
                this.getElemFromName(objName).css('opacity', value/100 );
            },
            'Background color': (objName, value) => {
                this.getElemFromName(objName).css('background-color', value);
            },
            'Horizontal scroll': (objName, value) => {
                this.getElemFromName(objName).css('overflow-x', 'hidden');
                if (value) this.getElemFromName(objName).css('overflow-x', 'scroll');
            },
            'Vertical scroll': (objName, value) => {
                this.getElemFromName(objName).css('overflow-y', 'hidden');
                if (value) this.getElemFromName(objName).css('overflow-y', 'scroll');
            },
        };
    }

    /**
     * Remove all constraints if we move the object
     * @param objName
     * @param axis
     */
    removeConstraints (elem, axis) {
        if (elem.css('top') && axis == 'y') elem.css('top', '');
        if (elem.css('left') && axis == 'x') elem.css('left', '');
        if (elem.css('bottom') && axis == 'y') elem.css('bottom', '');
        if (elem.css('right') && axis == 'x') elem.css('right', '');
        // here restore the height and width params
        if (axis == 'y') elem.css('height', elem.attr('original-height') + 'px');
        else elem.css('width', elem.attr('original-width') + 'px');
    }

    /**
     * Retrieves the element with a given object-name attribute
     * @param objName
     * @returns {*|jQuery|HTMLElement}
     */
    getElemFromName (objName) {
        return $('[obj-name= "' + objName + '"]');
    }

    /**
     * Generic removeGesture block implementation
     * @param objName
     * @param gesture
     */
    removeGesture (objName, gesture) {
        try {
            var elem = this.getElemFromName(objName);
            var gestureStr = this.gestureStr(gesture);
            return elem.unbind(gestureStr);
        } catch (e) {
            throw(e);
        }
    }
    
    animationStart(objName, animation, onCompleteCallback) {
        var elem = this.getElemFromName(objName);
        let duration = animation.duration*1000;
        let options = {duration: duration, complete: onCompleteCallback, queue: animation.id};

        switch(animation.type) {
            case "move":
                elem.animate({left: '+=' + animation.dX + 'px', top: '+=' + animation.dY + 'px'}, options);
                elem.dequeue(animation.id);
                break;
            case "scale":
                let newWidth = elem.width() * animation.dX;
                let newHeight = elem.height() * animation.dY;
                let leftDelta = (newWidth - elem.width()) / 2;
                let topDelta = (newHeight - elem.height()) / 2;
                elem.animate({width:newWidth+'px', height:newHeight+'px', left: '-='+leftDelta+'px', top: '-='+topDelta+'px'}, options);
                elem.dequeue(animation.id);
                break;
            case "rotate":
                 let angle = animation.angle;
                 let currAngle = 0;
                 if( elem.attr('data-angle') ) {
                    currAngle = elem.attr('data-angle');
                 }
                 let finalAngle = parseInt(currAngle) + parseInt(angle);
                 elem.attr('data-angle', finalAngle);
                 var left = elem.position().left;
                 var top = elem.position().top;
                 
                 let stepFunc = function(now) {
                    elem.css({
                        'transform':'rotate('+now+'deg)',
                        'left': left+'px',
                        'top': top+'px'
                    });
                 };
                 
                 let completeFunc = function() {
                    //hs:traaping before calling scrip's callback incase you want to do any post processing on the data
                    onCompleteCallback();
                 }
                 options.step = stepFunc;
                 options.complete = completeFunc;
                 elem.animate({deg: finalAngle}, options);
                 elem.dequeue(animation.id);
                break;
            case "fade":
                let alpha = (animation.alpha / 100);
                elem.animate({opacity:alpha}, options);
                elem.dequeue(animation.id);
                break;
        }
    }

    animationCancel(objName, animation) {
        var elem = this.getElemFromName(objName);
        elem.stop(animation.id, false, false);
    }

    animationStop(objName, animation) {
        var elem = this.getElemFromName(objName);
        elem.stop(animation.id, true, true);
    }

    animationStopAll(objName) {
        var elem = this.getElemFromName(objName);
        elem.stop();
    }
}

/* harmony default export */ __webpack_exports__["a"] = (BaseObject);




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
// ES6 imports


class TextObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor(elemSelectorRef) {
        super();

        // Element selector
        this.elemSelectorRef = elemSelectorRef || '';

        var self = this;

        // Getting Text properties values

        this.getProperty = Object.assign(this.getProperty, {
            'Font size': (objName) => {
                return this.getTextElemFromName(objName).css('font-size');
            },
            Alpha: (objName) => {
                return this.getTextElemFromName(objName).css('opacity') * 100;
            },
            'Text Alignment': (objName) => {
                return this.getTextElemFromName(objName).css('text-align');
            },
            'Vertical Alignment': (objName) => {
                return this.getTextElemFromName(objName).css('vertical-align');
            },
            'Font style': (objName) => {
                return this.getTextElemFromName(objName).attr('fontStyle');
            },
            'Font family': (objName) => {
                return this.getTextElemFromName(objName).css('font-family');
            },
            'Background color': (objName) => {
                return this.getTextElemFromName(objName).css('background-color');
            },
            'Text color': (objName) => {
                return this.getTextElemFromName(objName).css('color');
            },
            Text: (objName) => {
                return this.getTextElemFromName(objName).html();
            }
        });

        this.setProperty = Object.assign(this.setProperty, {
            Text: (objName, value) => {
                this.getTextElemFromName(objName).html(value);
            },
            'Font size': (objName, value) => {
                this.getTextElemFromName(objName).css('font-size',value+'px');
            },
            Alpha: (objName, value) => {
                this.getTextElemFromName(objName).css('opacity',value/100);
            },
            'Text Alignment': (objName, value) => {
                this.getTextElemFromName(objName).css('text-align',value.toLowerCase());
            },
            'Vertical Alignment': (objName, value) => {
                this.getTextElemFromName(objName).css('vertical-align',value.toLowerCase());
            },
            'Font style': (objName, value) => {
                let property = 'font-style';
                if (value.toLowerCase() == 'bold') {
                    property = 'font-weight';
                }
                this.getTextElemFromName(objName).css(property,value.toLowerCase());
                this.getTextElemFromName(objName).attr('fontStyle',value.toLowerCase());
            },
            'Font family': (objName, value) => {
                this.getTextElemFromName(objName).css('font-family',value.toLowerCase());
            },
            'Background color': (objName, value) => {
                this.getTextElemFromName(objName).css('background-color',value);
            },
            'Text color': (objName, value) => {
                this.getTextElemFromName(objName).css('color',value);
            }
        });
    };

    /**
     * Retrieves the text element with a given object-name attribute
     * @param objName
     * @returns {*|jQuery|HTMLElement}
     */
    getTextElemFromName (objName) {
        return $('[obj-name= "' + objName + '"]' + this.elemSelectorRef);
    }

    init ( elemSelectorRefValue) {
        this.elemSelectorRef = elemSelectorRefValue;
    };

}

/* harmony default export */ __webpack_exports__["a"] = (TextObject);





/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Core {

    constructor() {}

    /**
     * With the new ES6 Dist Lib this file is referenced as external script
     * here the default 'production style' exception handling is defined
     */
    handleExceptionNative (e) {
        console.warn('Exception: ', e);

        if (window.parent) {
            window.parent.com.fc.JavaScriptGenerator.handleExceptionNative(e);
        }
    }

    reset () {
        let thisObject = this;
        Object.keys(thisObject).forEach( function(key) {
            if ((typeof thisObject[key].reset) === 'function') thisObject[key].reset();
            //console.log('type of:',typeof obj.reset);
        });
    }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (Core);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Audio Library Module
*/

class AudioLibraryObject {

    constructor() {
        this.currAudio = null;
    }

    createAudioFromResource (url) {
        console.log (url);
        let audio = document.createElement("AUDIO");
        let source = document.createElement("source");
        audio.appendChild(source);
        audio.crossOrigin = 'anonymous';
        source.src = url;
        return audio;
    }

    createAudioFromUrl (url, successCallBack, failureCallBack) {

        let audio = document.createElement("AUDIO");
        let source = document.createElement("source");
        audio.appendChild(source);
        audio.crossOrigin = 'anonymous';
        source.src = url;
        audio.onloadeddata = (e) => {
            successCallBack (audio);
        };

        audio.onerror = (e) => {
          console.log('createAudioFromUrl, load error', e);
          failureCallBack(e);
        }
    }

    getDuration (audio) {
        return audio.duration;
    }

    playAudio (audio, successCallBack) {
        audio.play();
        this.currAudio = audio;
        audio.onended = function(e) {
            successCallBack(e);
        };
    }

    playAudioFrom (audio,position,successCallBack) {
        audio.currentTime = position;
        audio.play();
        this.currAudio = audio;
        audio.onended = function(e) {
            successCallBack(e);
        };
    }

    play (audio) {
        try {
            this.currAudio.play();
        } catch (e) {
            console.log (e);
        } 
    }

    pause (audio) {
        try {
            this.currAudio.pause();
        } catch (e) {
            console.log (e);
        } 
    }

    stop (audio) {
         try {
            this.currAudio.pause();
            this.currAudio.currentTime = 0;
        } catch (e) {
            console.log (e);
        } 
        
    }


}

/* harmony default export */ __webpack_exports__["a"] = (AudioLibraryObject);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Created by Ravish on 1/05/2017 */

// ES6 imports

class ColourLibraryObject {

  constructor() {}

  getColourFromText (str) {
    return str;
  }

  getRgbFromColour (colour) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colour);
    let arr = [];
    arr.push(parseInt(result[1], 16));
    arr.push(parseInt(result[2], 16));
    arr.push(parseInt(result[3], 16));
    return arr;
  }

  getColourFromHsv (h,s,v) {
    let rgb = this.hsvToRgb(h,s,v);
    let hex = this.rgbToHex (rgb[0],rgb[1],rgb[2]);
    return hex;
  }

  getHsvFromColour (colour) {
    let rgb = this.getRgbFromColour(colour);
    let hsv = this.rgb2hsv (rgb[0],rgb[1],rgb[2]);
    return hsv;
  }

  isColourDark (colour) {
    let luma = this.getLuma (colour);
    if (luma < this.getLumaTreshold()) {
      return true;
    }
  }

  isColourLight (colour) {
   let luma = this.getLuma (colour);
   if (luma > this.getLumaTreshold()) {
      return true;
    }
  }

  getLuma (colour) {
    let c = colour.substring(1);  // strip #
    let rgb = parseInt(c, 16);   // convert rrggbb to decimal
    let r = (rgb >> 16) & 0xff;  // extract red
    let g = (rgb >>  8) & 0xff;  // extract green
    let b = (rgb >>  0) & 0xff;  // extract blue

    return 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
  }

  getLumaTreshold () {
    return 150;
  }

  getReadabilityTreshold () {
    return 120;
  }

  getLuminosity (colour) {
    return this.getLuma(colour);
  }

  rgb2hsv () {
    let rr, gg, bb,
      r = arguments[0] / 255,
      g = arguments[1] / 255,
      b = arguments[2] / 255,
      h, s,
      v = Math.max(r, g, b),
      diff = v - Math.min(r, g, b),
      diffc = function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };

    if (diff == 0) {
      h = s = 0;
    } else {
      s = diff / v;
      rr = diffc(r);
      gg = diffc(g);
      bb = diffc(b);

      if (r === v) {
        h = bb - gg;
      }else if (g === v) {
        h = (1 / 3) + rr - bb;
      }else if (b === v) {
        h = (2 / 3) + gg - rr;
      }
      if (h < 0) {
        h += 1;
      }else if (h > 1) {
        h -= 1;
      }
    }
    return [
      Math.round(h * 360),
      Math.round(s * 100),
      Math.round(v * 100)
    ];
  }

  hsvToRgb (h, s, v) {
    let r, g, b;
    let i;
    let f, p, q, t;
     
    // Make sure our arguments stay in-range
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));
     
    // We accept saturation and value arguments from 0 to 100 because that's
    // how Photoshop represents those values. Internally, however, the
    // saturation and value are calculated from a range of 0 to 1. We make
    // That conversion here.
    s /= 100;
    v /= 100;
     
    if(s == 0) {
      // Achromatic (grey)
      r = g = b = v;
      return [
        Math.round(r * 255), 
        Math.round(g * 255), 
        Math.round(b * 255)
      ];
    }
     
    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));
     
    switch(i) {
      case 0:
        r = v;
        g = t;
        b = p;
      break;
     
      case 1:
        r = q;
        g = v;
        b = p;
      break;
     
      case 2:
        r = p;
        g = v;
        b = t;
      break;
     
      case 3:
        r = p;
        g = q;
        b = v;
      break;
     
      case 4:
        r = t;
        g = p;
        b = v;
      break;
     
      default: // case 5:
        r = v;
        g = p;
        b = q;
    }
     
    return [
      Math.round(r * 255), 
      Math.round(g * 255), 
      Math.round(b * 255)
    ];
  }

  componentToHex(c) {
    let hex = Math.round(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  rgbToHex(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  isColour (colour) {
    let result  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(colour);
    return result;
  }

  mixColour (c1,c2,ratio) {
    return this.blendColours(c1,c2,ratio);
  }

  isReadableOn (c1,c2) {
    let luma1 = this.getLuma (c1);
    let luma2 = this.getLuma (c2);
    let diff = Math.abs(luma2 - luma1);
    console.log (luma1,luma2,diff);
    if (diff > this.getReadabilityTreshold()) {
      return true;
    }
  }

  blendColours(c1, c2, percentage) {
    // check input
    c1 = c1 || '#000000';
    c2 = c2 || '#ffffff';
    percentage = percentage || 0.5;

    // 1: validate input, make sure we have provided a valid hex
    if (c1.length != 4 && c1.length != 7)
      throw new error('colours must be provided as hexes');

    if (c2.length != 4 && c2.length != 7)
      throw new error('colours must be provided as hexes');    

    if (percentage > 1 || percentage < 0)
      throw new error('percentage must be between 0 and 1');


    // 2: check to see if we need to convert 3 char hex to 6 char hex, else slice off hash
    //      the three character hex is just a representation of the 6 hex where each character is repeated
    //      ie: #060 => #006600 (green)
    if (c1.length == 4)
      c1 = c1[1] + c1[1] + c1[2] + c1[2] + c1[3] + c1[3];
    else
      c1 = c1.substring(1);
    if (c2.length == 4)
      c2 = c2[1] + c2[1] + c2[2] + c2[2] + c2[3] + c2[3];
    else
      c2 = c2.substring(1);

    console.log('valid: c1 => ' + c1 + ', c2 => ' + c2);

    // 3: we have valid input, convert colors to rgb
    c1 = [parseInt(c1[0] + c1[1], 16), parseInt(c1[2] + c1[3], 16), parseInt(c1[4] + c1[5], 16)];
    c2 = [parseInt(c2[0] + c2[1], 16), parseInt(c2[2] + c2[3], 16), parseInt(c2[4] + c2[5], 16)];

    console.log('hex -> rgba: c1 => [' + c1.join(', ') + '], c2 => [' + c2.join(', ') + ']');

    // 4: blend
    let c3 = [ 
      (1 - percentage) * c1[0] + percentage * c2[0], 
      (1 - percentage) * c1[1] + percentage * c2[1], 
      (1 - percentage) * c1[2] + percentage * c2[2]
    ];

    console.log('c3 => [' + c3.join(', ') + ']');

    // 5: convert to hex
    c3 = '#' + this.componentToHex(c3[0]) + this.componentToHex(c3[1]) + this.componentToHex(c3[2]);

    console.log(c3);

    // return hex
    return c3;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (ColourLibraryObject);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
// ES6 imports


class ImageLibrary {

    constructor() {}

    // static createImageFromUrl(url, successCallBack) {
    //     successCallBack (url);
    // }

    createImageFromUrl(url, successCallBack, failureCallBack) {
        let img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = url;

        img.onload = (e) => {
            successCallBack (e.srcElement);
            // successCallBack (img);
        };

        img.onerror = (e) => {
          console.log('createImageFromUrl, losd error', e);
          failureCallBack(e);
        }
    }

    createImageFromResource(resourceUrl) {
        let img = new Image();
        img.crossOrigin = "anonymous";
        img.src = resourceUrl;
        return img;
    }

    /* async getWidth (image) {

        let img = new Image();
        // img.onload = this.getWidthAndHeight;

        img.src = image;
        let load = () => {
          return new Promise( (resolve,reject) => {
            img.onload = resolve;
          });
        };
        let event = await load();
        console.log('async getWidth, check:', event);

        let width = event.srcElement.width;
        console.log('async getWidth, width:', width);
        return width;

        // let img = document.createElement('img');
        // img.setAttribute('src', image);
        // let width = img.getAttribute('width');
        // return width;
    } */


    // getWidth (image) {
    //   let img = new Image();
    //   img.src = image;
    //   let width = img.width;
    //   return width;
    // }

    getWidth (image) {
        return image.width;
    }

    // getHeight (image) {
    //   let img = new Image();
    //   img.src = image;
    //   let height = img.height;
    //   return height;
    // }

    getHeight (image) {
        return image.height;
    }

    // isImage (image) {
    //     let img = new Image();
    //     img.src = image;
    //     let width = img.width;
    //     if (width > 0) {
    //         return true;
    //     }
    //     return false;
    // }

    isImage (image) {
        let name = image.constructor.name;
        if ( name === 'HTMLImageElement')
            return true;
        else
            return false;
    }

    // applyFilter (image, effect, obj) {
    //   let elemSelector = '[obj-name="'+obj+'"]';
    //   let elem = $(elemSelector + ' img');
    //   switch (effect) {
    //     case "B&W":
    //       $(elem).css('filter','grayscale(1)');
    //       break;
    //     case "SEPIA":
    //       $(elem).css('filter','sepia(1)');
    //       break;
    //   }
    //   return image;
    // }

    applyFilter (image, effect) {
        let clonedImage = image.cloneNode();
        // let clonedImage = image;
        switch (effect) {
            case "B&W":
                $(clonedImage).css('filter','grayscale(1)');
            break;
            case "SEPIA":
                $(clonedImage).css('filter','sepia(1)');
            break;
        }
        return clonedImage;
    }

    // resize (image,width,height,obj) {
    //     let elemSelector = '[obj-name="'+obj+'"]';
    //     let elem = $(elemSelector + ' img');
    //     $(elem).width(width);
    //     $(elem).height(height);
    //     return image;
    // }

    // resize (image, width, height) {
    //   // let elemSelector = '[obj-name="'+obj+'"]';
    //   // let elem = $(elemSelector + ' img');
    //   let elem = image;
    //   $(elem).width(width);
    //   $(elem).height(height);
    //   return image;
    // }

    resize (image, width, height) {

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        let newImage = new Image();
        newImage.crossOrigin = "anonymous";


        if (image.width > 0) {
          ctx.drawImage(image, 0, 0, width, height);
          let imageData = canvas.toDataURL("image/png");
          newImage.src = imageData;
        }
        else {
          image.onload = () => {
            ctx.drawImage(image, 0, 0, width, height);
            let imageData = canvas.toDataURL("image/png");
            newImage.src = imageData;
          }
        }
        return newImage;
    }

    isImageEqual (image1,image2) {
        // let firstImage = new Image();
        // let secondImage = new Image();
        // firstImage.src = image1;
        // secondImage.src = image2;
        let firstImage = image1;
        let secondImage = image2;
        if (this.getBase64Image(firstImage) === (this.getBase64Image(secondImage))) {
            return true;
        }
    }

    clone (image) {
        let clonedImage = image.cloneNode();
        return clonedImage;
    }


    getBase64Image(img) {
        // img.crossOrigin = "Anonymous";
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        let dataURL = canvas.toDataURL("image/png");
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }

    getAverageColourFromImage (image, success) {
        // let img = new Image ();
        // img.src = image;
        let img = image;
        let colour = this.getAverageRGB (img, 5);
        success (colour);
    }

    getAverageRGB(imgEl, size) {

        // imgEl.crossOrigin = "Anonymous";

        let blockSize = size, // only visit every <size> pixels
            defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
            canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = {r:0,g:0,b:0},
            count = 0;
        
        if (!context) {
            return defaultRGB;
        }
        
        height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
        width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
        
        context.drawImage(imgEl, 0, 0);
    
        try {
            data = context.getImageData(0, 0, width, height);
        } catch(e) {
            /* security error, img on diff domain */
            return defaultRGB;
        }
        
        length = data.data.length;
        
        while ( (i += blockSize * 4) < length ) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i+1];
            rgb.b += data.data[i+2];
        }
        
        // ~~ used to floor values
        rgb.r = ~~(rgb.r/count);
        rgb.g = ~~(rgb.g/count);
        rgb.b = ~~(rgb.b/count);
        
        return 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
    }

    getPrimaryColour (image, success) {
        // let img = new Image ();
        // img.src = image;
        let img = image;
        // img.crossOrigin = "Anonymous";
        let ele = $(img);
        var colorThief = new ColorThief();
        let palette = colorThief.getPalette(img, 2);
        let primaryColour = 'rgb('+palette[0][0]+','+palette[0][1]+','+palette[0][2]+')';
        success (primaryColour);
    }

    getSecondaryColour (image, success) {
        // let img = new Image ();
        // img.src = image;
        let img = image;
        // img.crossOrigin = "Anonymous";
        let ele = $(img);
        var colorThief = new ColorThief();
        let palette = colorThief.getPalette(img, 2);
        let secondaryColour = 'rgb('+palette[1][0]+','+palette[1][1]+','+palette[1][2]+')';
        success (secondaryColour);
    }

    ImageException(msg) {
        let error = new Error(msg);
        error.name = "ImageException";
        throw error;
    }

}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ImageLibrary);



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Code generator for the Math Library object
 ** Created by Oscar Rangel on 7/12/2016
 */

 // ES6 imports

class MathLibraryObject {

  constructor() {}

  toNumber (num) {
    if (this.isNumber(num)) {
        return Number(num);
    }
    return null;
  }

  isNumber (o) {
    return ! isNaN(o-0) && o !== null && o !== "" && o !== false && o !== true;
  }

  mathCompare (num1, comp, num2) {
    switch (comp) {
      case "EQ":
        return this.toNumber(num1) == this.toNumber(num2);
      case "NEQ":
        return this.toNumber(num1) != this.toNumber(num2);
      case "LT":
        return this.toNumber(num1) < this.toNumber(num2);
      case "LTE":
        return this.toNumber(num1) <= this.toNumber(num2);
      case "GT":
        return this.toNumber(num1) > this.toNumber(num2);
      case "GTE":
        return this.toNumber(num1) >= this.toNumber(num2);
      default:
        return false;
    }
  }

  mathMinMax (num1, comp, num2) {
    switch (comp) {
      case "MIN":
        return Math.min(this.toNumber(num1), this.toNumber(num2));
      case "MAX":
        return Math.max(this.toNumber(num1), this.toNumber(num2));
      default:
        return 0;
    }
  }

  mathModulo (num1, comp, num2) {
    switch (comp) {
      case "MODULO":
        return this.toNumber(num1)%this.toNumber(num2);
      case "QUOTIENT":
        return Math.floor(this.toNumber(num1)/this.toNumber(num2));
      default:
        return 0;
    }
  }

  mathConversionRadDeg (comp, num) {
    switch (comp) {
      case "DEGTORAD":
        return this.toNumber(num) * (Math.PI/180);
      case "RADTODEG":
        return this.toNumber(num) * (180/Math.PI);
      default:
        return 0;
    }
  }

  mathRoundPrecision (num,percision) {
    return Math.round(this.toNumber(num) * Math.pow(10, this.toNumber(percision))) / Math.pow(10, this.toNumber(percision))
  }

  //Define custom exceptions
}

/* harmony default export */ __webpack_exports__["a"] = (MathLibraryObject);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(1);
// ES6 imports




class TextLibraryObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */]{

        constructor(){
            super(' TextLibraryObject');
        }

    textComparison (text1, comp, text2) {
    switch (comp) {
        case "LESS":
            return text1.toString() < text2.toString();
        case "EQUAL":
            return text1.toString() == text2.toString();
        case "GREATER":
            return text1.toString() > text2.toString();
        default:
            return false;
        }
    }

    textTrim(text){
        return text.toString().trim().replace(/&nbsp;/g, '').replace(/\<br\s*[\/]?>/gi, '');
    }

    textChangeCase(text, comp) {
    switch (comp) {
        case "UPPERCASE":
            return text.toString().toUpperCase();
        case "LOWERCASE":
            return text.toString().toLowerCase();
        default:
            return "";
        }
    }

    textSubstring(text, from, length){
    return text.toString().substring(Number(from),Number(from) + Number(length));
    }


    textContains(string, substring) {
    return ((string.toString().indexOf(substring)) !== -1);
    }

    textIndexOf(string, substring) {
    return string.toString().indexOf(substring);
    }

    textSplitAt(text, index) {
    return [text.toString().substring(0, Number(index)), text.toString().substring(Number(index))];
    }

    textSplitWith(string, separator) {
    return string.toString().split(separator.toString());
    }

    textReplace(textFrom, textTo, textSource){
    var returnText = textSource.toString();
    while (returnText.indexOf(textFrom.toString()) !== -1){
        returnText = returnText.toString().replace(textFrom.toString(),textTo.toString());
    }
    return returnText;
    }

    isText(text) {
    return (typeof text === 'string' || text instanceof String);
    }

    convertToText(data) {
    if( jQuery.isXMLDoc( data ) ) {
        return  (new XMLSerializer()).serializeToString(data);
    }
    else if( jQuery.isArray( data ) )  {
        return data.toString();
    }
    else if( typeof data == 'string' ) {
        return data;
    }
    else {
        return JSON.stringify(data);
    }
}

}
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (TextLibraryObject);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by Oscar Rangel on 21/12/16.
*/

class TimeLibraryObject {

    constructor() {}

    createTime (time) {

        return new Date (time);
    }

    createTimeNow () {
        return new Date();
    }

    createTimeFromTimestamp (timestamp) {
        return new Date(Number(timestamp));
    }

    createTimestampFromTime (time) {
        return new Date(time).getTime();
    }


    textFromTime (time, op) {
      var dateTime =  new Date(time);

      switch(op){
        case "DATE_TIME_12":
            var H = dateTime.getHours();
            var M = dateTime.getMinutes();
            var m = dateTime.getMonth()+1;
            var d = dateTime.getDate();
            var y = dateTime.getFullYear();
            var a = "AM";
            if (H>12){
                H = H-12;
                a = "PM"
            }
            if (M.toString().length == 1) {
                M = "0" + M;
            }
            return H + ":" + M + " " + a + " " + d + "/" + m + "/" + y;

        case "DATE_TIME_12_US":
            var H = dateTime.getHours();
            var M = dateTime.getMinutes();
            var m = dateTime.getMonth()+1;
            var d = dateTime.getDate();
            var y = dateTime.getFullYear();
            var a = "AM";
            if (H>12){
                H = H-12;
                a = "PM"
            }
            if (M.toString().length == 1) {
                M = "0" + M;
            }
            return H + ":" + M + " " + a + " " + m + "/" + d + "/" + y;

        case "DATE_TIME_24":
            var H = dateTime.getHours();
            var M = dateTime.getMinutes();
            var m = dateTime.getMonth()+1;
            var d = dateTime.getDate();
            var y = dateTime.getFullYear();
            if (M.toString().length == 1) {
                M = "0" + M;
            }
            return H + ":" + M + " " + d + "/" + m + "/" + y;

        case "DATE_TIME_24_US":
            var H = dateTime.getHours();
            var M = dateTime.getMinutes();
            var m = dateTime.getMonth()+1;
            var d = dateTime.getDate();
            var y = dateTime.getFullYear();
            if (M.toString().length == 1) {
                M = "0" + M;
            }
            return H + ":" + M + " " + m + "/" + d + "/" + y;

        case "TIME_12":
            var H = dateTime.getHours();
            var M = dateTime.getMinutes();
            var a = "AM";
            if (H>12){
                H = H-12;
                a = "PM"
            }
            return H + ":" + M + " " + a;

        case "TIME_24":
            var H = dateTime.getHours();
            var M = dateTime.getMinutes();
            return H + ":" + M;

        case "DATE":
            var m = dateTime.getMonth()+1;
            var d = dateTime.getDate();
            var y = dateTime.getFullYear();
            return d + "/" + m + "/" + y;

        case "DATE_US":
            var m = dateTime.getMonth()+1;
            var d = dateTime.getDate();
            var y = dateTime.getFullYear();
            return m + "/" + d + "/" + y;

        default:
            return "";
      }
    }

    elapsedComponent (timestamp, num) {
        return Math.floor(timestamp/num);
    }

    elapsedComponentsFromTime (time, components) {
        var dateTime =  new Date(time.getTime());
        var dateZeroTime = new Date(0);
        var y = dateTime.getUTCFullYear() - dateZeroTime.getUTCFullYear();
        var m =  dateTime.getUTCMonth() - dateZeroTime.getUTCMonth();
        var d =  dateTime.getUTCDate() - dateZeroTime.getUTCDate();
        var h =  dateTime.getUTCHours() - dateZeroTime.getUTCHours();
        var M =  dateTime.getUTCMinutes() - dateZeroTime.getUTCMinutes();
        var s =  dateTime.getUTCSeconds() - dateZeroTime.getUTCSeconds();

        switch(components) {
            case "S":
                return [s];
            case "SM":
                return [M,s];
            case "SMH":
                return [h,M,s];
            case "SMHD":
                return [d,h,M,s];
            case "SMHDM":
                return [m,d,h,M,s];
            case "SMHDMY":
                return [y,m,d,h,M,s];
            default:
                return [];
        }
    }

    componentsFromTime (time, components) {
        var dateTime =  new Date(time);
        switch(components) {
            case "S":
                return [dateTime.getSeconds()];
            case "SM":
                return [dateTime.getMinutes(), dateTime.getSeconds()];
            case "SMH":
                return [dateTime.getHours(), dateTime.getMinutes(), dateTime.getSeconds()];
            case "SMHD":
                return [dateTime.getDate(), dateTime.getHours(), dateTime.getMinutes(), dateTime.getSeconds()];
            case "SMHDM":
                return [dateTime.getMonth()+1, dateTime.getDate(), dateTime.getHours(), dateTime.getMinutes(), dateTime.getSeconds()];
            case "SMHDMY":
                return [dateTime.getFullYear(), dateTime.getMonth()+1, dateTime.getDate(), dateTime.getHours(), dateTime.getMinutes(), dateTime.getSeconds()];
            default:
                return [];
        }
    }

    numberDayOfWeekFromDate (time) {
        var dateTime =  new Date(time);
        if (dateTime.getDay() == 0)
            return 7;
        return dateTime.getDay();

    }

    stringDayOfWeekFromDate (time) {
        var dateTime =  new Date(time);
        var ar = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
        return ar[dateTime.getDay()];
    }
    createTimeInterval ( sec, min, hou, day, mon, yea) {
        return [sec,min,hou,day,mon,yea];
    }

    addIntervalFromTime (time, timeInt) {
        if (timeInt.constructor !== Array || timeInt.length != 6){
            return new Date(time);
        }
        var elap = this.componentsFromTime(time, "SMHDMY");
        var year = elap[0] + Number(timeInt[5]);
        var month = (elap[1] - 1) + Number(timeInt[4]);
        var day = elap[2] + Number(timeInt[3]);
        var hours = elap[3] + Number(timeInt[2]);
        var min =elap[4] + Number(timeInt[1]);
        var sec = elap[5] + Number(timeInt[0]);
        return new Date(year, month, day, hours, min, sec);
        //var retTime = new Date(time);
        //retTime.setSeconds(retTime.getSeconds() + Number(timeInt[0]));
        //retTime.setMinutes(retTime.getMinutes() + Number(timeInt[1]));
        //retTime.setHours(retTime.getHours() + Number(timeInt[2]));
        //retTime.setDate(retTime.getDate() + Number(timeInt[3]));
        //retTime.setMonth(retTime.getMonth() + Number(timeInt[4]));
        //retTime.setFullYear(retTime.getFullYear() + Number(timeInt[5]));
        //return retTime;
    }
    subtractIntervalFromTime (time, timeInt) {
        if (timeInt.constructor !== Array || timeInt.length != 6){
            return time;
        }
        var elap = this.componentsFromTime(time, "SMHDMY");
        var year = elap[0] - Number(timeInt[5]);
        var month = (elap[1] - 1) - Number(timeInt[4]);
        var day = elap[2] - Number(timeInt[3]);
        var hours = elap[3] - Number(timeInt[2]);
        var min =elap[4] - Number(timeInt[1]);
        var sec = elap[5] - Number(timeInt[0]);
        return new Date(year, month, day, hours, min, sec);
        //var retTime = new Date(time);
        //retTime.setSeconds(retTime.getSeconds() - Number(timeInt[0]));
        //retTime.setMinutes(retTime.getMinutes() - Number(timeInt[1]));
        //retTime.setHours(retTime.getHours() - Number(timeInt[2]));
        //retTime.setDate(retTime.getDate() - Number(timeInt[3]));
        //retTime.setMonth(retTime.getMonth() - Number(timeInt[4]));
        //retTime.setFullYear(retTime.getFullYear() - Number(timeInt[5]));
        //return retTime;
    }

    dateFormat (dateObj,format){
      var keys = {
        'yyyy': '1',
        'yy':'2',
        'y':'3',
        'MMMM':'4',
        'MMM':'5',
        'MM':'6',
        'M':'7',
        'dd':'8',
        'd':'9',
        'EEEE':'10',
        'EEE':'11',
        'HH':'12',
        'H':'13',
        'hh':'14',
        'h':'15',
        'mm':'16',
        'm':'17',
        'ssss':'18',
        'ss':'19',
        's':'20',
        'a':'21'
      };

      var result = format;
      var fullyear = dateObj.getFullYear();
      var year2dgt =  String(fullyear % 100);
      var month = String(dateObj.getMonth() + 1);
      var monthLit = ['January','February','March','April','May','June','July','August','September','October','November','December'][dateObj.getMonth()];
      var day = String(dateObj.getDate());
      var weekday = String(dateObj.getDay());
      var weekdayLit = ['Sunday','Monday','Thursday','Wednesday','Tuesday','Friday','Saturday'][dateObj.getDay()];
      var min = String(dateObj.getMinutes());
      var hour24 = String(dateObj.getHours());
      var hour12 = (Number(dateObj.getHours()) % 12).toString();
      var sc= String(dateObj.getSeconds());
      var msec = String(dateObj.getMilliseconds());
      var am_pm = (Number(dateObj.getHours()) >= 12)?'PM':'AM';

      // generate escape code
      var escChar = '%';
      while (format.search(escChar)>=0) escChar += '%';

      if (year2dgt.length==1) year2dgt = '0' + year2dgt;
      if (month.length==1) month = '0' + month;
      if (day.length==1) day = '0' + day;
      if (min.length==1) min = '0' + min;
      if (hour24.length==1) hour24 = '0' + hour24;
      if (hour12.length==1) hour12 = '0' + hour12;
      if (sc.length==1) sc = '0' + sc;
      if (msec.length==1) msec = '00' + msec;
      if (msec.length==2) msec = '0' + msec;

      if (Number(hour12) == 0) hour12 = '12';

      var escapeKey = function(string,key){
        return string.replace(key, escapedKey(key));
      }
      var escapedKey = function(key){
        return escChar + keys[key] + escChar;
      }
      var isolateKeys = function(format){
        var isolated = format;

        isolated = escapeKey(isolated,'yyyy');
        isolated = escapeKey(isolated,'yy');
        isolated = escapeKey(isolated,'y');
        isolated = escapeKey(isolated,'MMMM');
        isolated = escapeKey(isolated,'MMM');
        isolated = escapeKey(isolated,'MM');
        isolated = escapeKey(isolated,'M');
        isolated = escapeKey(isolated,'dd');
        isolated = escapeKey(isolated,'d');
        isolated = escapeKey(isolated,'EEEE');
        isolated = escapeKey(isolated,'EEE');
        isolated = escapeKey(isolated,'HH');
        isolated = escapeKey(isolated,'H');
        isolated = escapeKey(isolated,'hh');
        isolated = escapeKey(isolated,'h');
        isolated = escapeKey(isolated,'mm');
        isolated = escapeKey(isolated,'m');
        isolated = escapeKey(isolated,'ssss');
        isolated = escapeKey(isolated,'ss');
        isolated = escapeKey(isolated,'s');
        isolated = escapeKey(isolated,'a');
        return isolated;
      };

      result = isolateKeys(result);

      result = result.replace(escapedKey('yyyy'),fullyear);
      result = result.replace(escapedKey('yy'),year2dgt);
      result = result.replace(escapedKey('y'),Number(fullyear));

      result = result.replace(escapedKey('MMMM'),monthLit);
      result = result.replace(escapedKey('MMM'),monthLit.substr(0,3));
      result = result.replace(escapedKey('MM'),month);
      result = result.replace(escapedKey('M'),Number(month));

      result = result.replace(escapedKey('dd'),day);
      result = result.replace(escapedKey('d'),Number(day));

      result = result.replace(escapedKey('EEEE'),weekdayLit);
      result = result.replace(escapedKey('EEE'),weekdayLit.substr(0,3));

      result = result.replace(escapedKey('HH'),hour24);
      result = result.replace(escapedKey('H'),Number(hour24));

      result = result.replace(escapedKey('hh'),hour12);
      result = result.replace(escapedKey('h'),Number(hour12));

      result = result.replace(escapedKey('mm'),min);
      result = result.replace(escapedKey('m'),Number(min));

      result = result.replace(escapedKey('ssss'),msec);

      result = result.replace(escapedKey('ss'),sc);
      result = result.replace(escapedKey('s'),Number(sc));

      result = result.replace(escapedKey('a'),am_pm);

      return result;
    }

    getTimeFromTimezone (tz) {
        return new Date().toLocaleString('en-US', { timeZone: tz });
    }


}

/* harmony default export */ __webpack_exports__["a"] = (TimeLibraryObject);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by Ravish S on 16/10/17.
*/

class VideoLibraryObject {

    constructor() {}

    createVideoFromResource (url) {
        let vid = document.createElement("VIDEO");
        let source = document.createElement("source");
        vid.appendChild(source);
        vid.crossOrigin = 'anonymous';
        source.src = url;
        return vid;
    }

    createVideoFromUrl (url, successCallBack, failureCallBack) {
        let vid = document.createElement("VIDEO");
        let source = document.createElement("source");
        vid.appendChild(source);
        vid.crossOrigin = 'anonymous';
        source.src = url;
        console.log (vid);
        vid.onloadeddata = (e) => {
            successCallBack (vid);
        };

        vid.onerror = (e) => {
          console.log('createVideoFromUrl, load error', e);
          failureCallBack(e);
        }
    }

    getDuration (video) {
        return video.duration;
    }

    playVideo (video, successCallBack) {
        video.play();
        video.onended = function(e) {
            successCallBack(e);
        };
    }

    playVideoFrom (video,position,successCallBack) {
        video.currentTime = position;
        video.play();
        video.onended = function(e) {
            successCallBack(e);
        };
    }


}

/* harmony default export */ __webpack_exports__["a"] = (VideoLibraryObject);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class AnimationObject {

  constructor() {}

  animationMove(id, dX, dY, duration) {
    var anim = {};
    anim.id = id;
    anim.type = "move";
    anim.dX = dX;
    anim.dY = dY;
    anim.duration = duration;
    return anim;
  }

  animationRotate(id, angle, duration) {
    var anim = {};
    anim.id = id;
    anim.type = "rotate";
    anim.angle = angle;
    anim.duration = duration;
    return anim;
  }

  animationScale(id, dX, dY, duration) {
    var anim = {};
    anim.id = id;
    anim.type = "scale";
    anim.dX = dX;
    anim.dY = dY;
    anim.duration = duration;
    return anim;
  }

  animationFade(id, alpha, duration) {
    var anim = {};
    anim.id = id;
    anim.type = "fade";
    anim.alpha = alpha;
    anim.duration = duration;
    return anim;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (AnimationObject);



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ApplicationObject {

  constructor() {}

  bringToForeground() {
    /*hs: not implementing this for now
    window.blur();
    setTimeout(window.focus, 0);
    */
  }

  sendToBackground() {
    /* hs: not implementing this for now.
    window.blur();
    */
  }

  getAppName() {
    return window.document.title;
  }

  quitApp() {
    window.close();
  }

  registerEvent(event, callback) {
  	switch(event) {
  		case 'start':
         console.log("Registering Started Event");
         $(window).ready(function() {
          if( callback != undefined ) {
            console.log("Application Started Event");
            callback();
          }
        });
  			break;
  		case 'in_background':
  			console.log("Registering background event");
        $(window).blur(function() {
           console.log("Application is in background");
           if( callback != undefined ) {
              callback();
           }
        });
        break;
  		case 'in_foreground':
        console.log("Registering foreground event");
        $(window).focus(function() {
           console.log("Application is in foreground");
           if( callback != undefined ) {
              callback();
           }
        });
  			break;
  		case 'back_button_press':
  			console.log("Registering back button press event");
        if (window.history && window.history.pushState) {
            window.history.pushState('forward', null, './#forward');
            $(window).on('popstate', function() {
              window.history.back();
              console.log("Back button event triggered");
              callback();
            });

        }
  			break;
  	}
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ApplicationObject);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ES6 imports

class BluetoothObject {

  constructor() {
    this.devices = {};
  }

  configure(scansuccesscallback, scanfailcallback, devicedisconnectcallback, characteristicchangecallback) {
    this.scansuccesscallback = scansuccesscallback;
    this.scanfailcallback = scanfailcallback;
    this.devicedisconnectcallback = devicedisconnectcallback;
    this.characteristicchangecallback = characteristicchangecallback;
  }

  scanStart(timeout) {
    let parent = this;
    return navigator.bluetooth.requestDevice({filters:[{services:[ 'heart_rate' ]}]})
    .then(device => {
      parent.devices[device.id] = device;
      parent.scansuccesscallback(device.id);
    });
  }

  scanStop() {
  
  }

  getDeviceNameForAddress(address) {
    if( this.device[address] != undefined ) {
      return this.devices[address].name;  
    }
    else {
      return "";
    }
    
  }

  connectToDevice(address, successcallback, failurecallback) {
    
  }

  disconnectFromDevice(address) {

  }

  getServicesForDevice(address, successcallback, failurecallback) {
    
  }

  getCharacteristicsForService(address, service) {

  }

  readCharacteristic(address, serviceUUID, characteristicUUID, format, successcallback, failurecallback) {

  }

  writeCharacteristic(address, serviceUUID, characteristicUUID, format, value, successcallback, failurecallback) {

  }

  notifyCharacteristicChange(address, serviceUUID, characteristicUUID, state) {

  } 
}

/* harmony default export */ __webpack_exports__["a"] = (BluetoothObject);


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(1);
// ES6 imports


class ButtonObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */] {

    constructor() {
        super(' .btn');

        const self = this;

        // Set default behaviours
        $(document).ready(function() {
            let buttonEls = $('.element.fc.Button');
            // console.log('ButtonObject, buttonEls: ', buttonEls);
            buttonEls.each((i, obj) => {
                // console.log('.element.fc.Button: ', obj);
                let elements = obj.getElementsByClassName('foreground');
                let image = (elements.length > 0) ? elements[0] : null;

                elements = obj.getElementsByClassName('highlight');
                let imageHighlight = (elements.length > 0) ? elements[0] : null;
                // if (imageHighlight) console.log('ButtonObject, imageHighlight element', imageHighlight);

                if (imageHighlight) {
                    obj.onmousedown = () => {
                        console.log('onmousedown, button', obj.getAttribute('obj-name'));
                        imageHighlight.style.display = '';
                        image.style.display = 'none';
                    };
                    obj.onmouseup = () => {
                        console.log('onmouseup, button', obj.getAttribute('obj-name'));
                        image.style.display = '';
                        imageHighlight.style.display = 'none';
                    };
                }
                else {
                    let button = obj.getElementsByClassName('btn')[0]
                    let color = button.style.backgroundColor;
                    let invertedColor = self.invertColor(color);
                    console.log('Standard case, button color', color);

                    obj.onmousedown = () => {
                        console.log('onmousedown, button', obj.getAttribute('obj-name'));
                        button.style.backgroundColor = invertedColor;
                    };
                    obj.onmouseup = () => {
                        console.log('onmouseup or out, button', obj.getAttribute('obj-name'));
                        button.style.backgroundColor = color;
                    };
                }

            });
        });

        this.getProperty.Text = (objName) => {
            let buttonTextEl = this.getTextElemFromName(objName).find('.text');
            return buttonTextEl.html();
        };

        this.setProperty.Text = (objName, value) => {
            let buttonTextEl = this.getTextElemFromName(objName).find('.text');
            buttonTextEl.html(value);
        };

        this.setProperty['Text Alignment'] = (objName, value) => {
            let buttonEl = this.getTextElemFromName(objName);
            buttonEl.css('text-align', value.toLowerCase());
            buttonEl.css('justify-content', this.toFlex(value.toLowerCase()));
        }
    }

    toFlex(align) {
        if (align === 'left')
            return 'flex-start';
        else if (align === 'right')
            return 'flex-end';
        else
            return 'center';
    }

    invertColor(color) {
        // console.log('invertColor input:', color);
        let rgbin = color.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
        if (!rgbin)
          rgbin = color.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
        if (!rgbin) {
            console.error('invertColor: unable to detect color')
            return rgbin;
        }
        if (rgbin.length === 4)
            rgbin.splice(0, 1);
        else
            return color;
        let rgbout = [];
        for (let col of rgbin) {
            let val = parseInt(col);
            rgbout.push( (val >= 128) ? (val - 32 ) : (val + 32) );
        }

        let result = `rgb(${rgbout[0]}, ${rgbout[1]}, ${rgbout[2]})`;
        if (rgbout[3]) {
          result = `rgba(${rgbout[0]}, ${rgbout[1]}, ${rgbout[2]}, ${rgbout[3]})`;
        }
        return result;
    }

    touchmove_x_y(elemSelector, callback){
        $(elemSelector).on("mousedown touchstart", function(event) {
            $(document.body).on("mousemove touchmove", function(touchmove){
                var ose = $(document.body).offset();
                var mousemove = touchmove.type === 'mousedown'||touchmove.type === 'touchstart',
                    pageX = mousemove ? touchmove.targetTouches[0].clientX : touchmove.clientX - ose.left,
                    pageY = mousemove ? touchmove.targetTouches[0].clientY : touchmove.clientY - ose.top;
                if(pageX<0 ||pageY<0){
                    pageX = 0;
                    callback(pageX,pageY);
                }else{
                    callback(pageX,pageY);
                }

            });
            $(document.body).on("mouseup touchend", function(release){
                $(document.body).off("mousemove touchmove"),
                    $(document.body).off("mousedown touchstart");
            });
        });
    }

    longclick_ev(elemSelector,callback){
        var timeout_id = 0,
            hold_time = 500;
        $(elemSelector).on("mousedown touchstart",function(e) {
            e.stopPropagation();
            timeout_id = setTimeout(function(){
                callback();
            },hold_time);
        }).bind('mouseup mouseleave touchend', function(ev) {
            clearTimeout(timeout_id);
        });
    }

    getElemFromName (objName) {
        return $('[obj-name= "' + objName + '"]');
    }
}
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ButtonObject);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Created on 23/11/2017 */

class ClockObject {

  constructor() {}

  createTimer (interval,repeats) {
    let timerVar = setInterval(function(){ 
    },interval);

    return [timerVar,interval,repeats];

  }

  startTimer (timer,callback) {

    let count = 0; // Counter
    let timerVar = timer[0];
    let interval = timer[1] * 1000; //Convert to ms
    let repeats = timer[2];

    //Clear the above created one
    clearInterval(timerVar);

    timerVar = setInterval(function(){ 
      callback(timerVar);

      if (++count === repeats) {
        clearInterval(timerVar);
        $(`#timer-${timer[0]}`).attr('timer-status',false);
      }

    },interval);
    $('body').append(`<input id = "timer-${timer[0]}" value = "${timerVar}" type = "hidden" />`); // keeping the reference of the new ID
    $(`#timer-${timer[0]}`).attr('timer-status',true);
  }

  stopTimer (timer) {
    let timerId = $(`#timer-${timer[0]}`).val();
    clearInterval(timerId);
    $(`#timer-${timer[0]}`).attr('timer-status',false);
  }

  isTimerComplete (timer) {
    let result = $(`#timer-${timer[0]}`).attr('timer-status');
    
    if (result == "true") {
      return false;
    }
    return true;
    
  }

}

/* harmony default export */ __webpack_exports__["a"] = (ClockObject);



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Stub for connio object
** Created by Harish Shanthi Kumar on 16/12/2016
*/

class ConnioObject extends com.fc.JavaScriptDistLib.ConnioCore {

  constructor() {
    super();
    this.MQTTClient = null,
    this.MQTTMessageRecvCallback =  null
  }

  configureMQTT() {
    let parent = this;
    if ( !this.MQTTClient ) {
      try {
        if( this.config.BaseURL === '' || this.config.KEY === '' || this.config.Secret === '' ) {
          console.log("Please go to File -> Connio Properties and set credentials.");
        }

        if( this.config.MQTTHost !== '' && this.config.MQTTPort !== '' && this.config.MQTTCientID !== '' &&
          this.config.MQTTUsername !== '' && this.config.MQTTPassword !== '' && this.config.App !== '' ) {
          this.MQTTClient = new Paho.MQTT.Client(this.config.MQTTHost, this.config.MQTTPort, this.config.MQTTCientID);
          // set callback handlers
          this.MQTTClient.onConnectionLost = function(responseObject) {
            parent.handleMQTTConnectionLost(responseObject);
          };
          this.MQTTClient.onMessageArrived = function(message) {
            parent.handleMQTTMessage(message);
          };
        }
        else {
          console.log("Please go to File -> Connio Properties and set credentials.");
        }
      }
      catch(e) {
        console.log("Some of the properties are missing. Go to File->Connio Properties");
      }
    }

  }
  //HS: Deploy Alert!! All runtime objects needs to be reset here!
  reset() {
    this.MQTTClient = null;
    this.MQTTMessageRecvCallback = null;
  }

  connioStartTrackingPropertyChanges(callback) {
    this.configure();
    this.configureMQTT();
    this.MQTTMessageRecvCallback = callback;
    this.connio_mqtt_connect();
  }

  connioStopTrackingPropertyChanges() {
    this.connio_mqtt_disconnect();
  }


  connioReadData(device, successcallback, failurecallback) {
    let parent = this;
    this.configure();
    let url = this.config.BaseURL + "/v2/data/devices/" + device;
    $.ajax(
      {
        url: url,
        type: 'GET',
        headers: {
          "Authorization": "Basic " + btoa(this.config.KEY + ":" + this.config.Secret)
        },
        success: (response) => {
          successcallback(response);
        },
        error: (xhr, code, msg) => {
          failurecallback(msg);
          console.log("Could not read data.");
        }
      });
  }

  connionGetValue(data, valueType, propertyName) {
    this.configure();
    let properties = data.properties;
    if( (properties !== undefined) && (properties.length>0) ) {
      for(let i=0; i<properties.length; i++) {
        let property = properties[i];
        let qname = property.descriptors.qname;

        if( qname.indexOf(propertyName) !== -1)  {
          let value = property.value[valueType];
          if( value!==undefined ) {
            return value;
          }
        }
      }
    }
    return "";
  }

  connioGetDeviceName(data, id) {
    this.configure();
    let devices = data.results;
    try {
      for(let i=0; i<devices.length; i++) {
        let device = devices[i];
        if( device.id === id ) {
          return device.name;
        }
      }
    }
    catch(e) {

    }

    return "";
  }

  connioGetDeviceLocation(data, id) {
    this.configure();
    let devices = data.results;
    try {
      for(let i=0; i<devices.length; i++) {
        let device = devices[i];
        if( (device.id === id) || (device.name === id) ) {
          let locationObj = {lat: device.location.geo.lat, lng: device.location.geo.lon};
          return locationObj;
        }
      }
    }
    catch(e) {
    }

    return "";
  }

  connioWriteData(device, value, property, successcallback, failurecallback) {
    let parent = this;
    this.configure();
    let url = this.config.BaseURL + "/v2/data/devices/" + device + "/properties/" + property;
    let data = {};
    data.dps = [];
    let val = {};
    val.t = new Date().toISOString();
    val.v = value;
    data.dps.push(val);

    $.ajax(
      {
        url: url,
        type: 'POST',
        headers: {
          "Authorization": "Basic " + btoa(this.config.KEY + ":" + this.config.Secret),
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        dataType: "json",
        data: JSON.stringify(data),
        success: function (response) {
          successcallback(response);
        },
        error: function(xhr, code, msg) {
          failurecallback(msg);
          console.log("Could not write data.");
        }
      });
  }

  connioExecuteMethod(device, method, data, successcallback, failurecallback) {
    this.configure();
  }

  connioReadHistorical(device, property, timeStart, timeEnd, descending, limit, successcallback, failurecallback) {
    let parent = this;
    this.configure();
    let url = this.config.BaseURL + "/v2/data/devices/" + device + "/properties/" + property + "?";

    if( descending ) {
      let sorting = (descending ? "-" : "") + "source.time";
      url += "sort=" + sorting;
    }
    else {
      url += "sort=-source.time";
    }

    if( limit ) {
      url += "&limit=" + limit;
    }

    if (timeStart && timeEnd) {
      url += "&q=source.time:(" + timeStart.toISOString() + "+TO+" + timeEnd.toISOString() + ")";
    }

    $.ajax(
      {
        url: url,
        type: 'GET',
        headers: {
          "Authorization": "Basic " + btoa(this.config.KEY + ":" + this.config.Secret)
        },
        success: (response) => {
          let timeList = jsonPath(response, "$.results[:].t");
          let valueList = jsonPath(response, "$.results[:].v");
          let formattedTimeList = [];
          for (let i=0;i<timeList.length;i++) {
            formattedTimeList.push(com.fc.JavaScriptDistLib.TimeLibrary.dateFormat(new Date (timeList[i]),'MMM-d HH:mm a'));
          }
          timeList.reverse();
          formattedTimeList.reverse();
          successcallback(formattedTimeList, valueList);
        },
        error: (xhr, code, msg) => {
          failurecallback(msg);
          console.log("Could not read historical.");
        }
      });
  }

  connio_mqtt_connect() {
    console.log("Connecting to Connio MQTT...");
    let parent = this;
    try {
      this.MQTTClient.connect( {
        onSuccess: function() {
          console.log("Connected to Connio MQTT...");
          parent.subscribeToTopic();
        },
        userName : this.config.MQTTUsername,
        password : this.config.MQTTPassword,
        keepAliveInterval: 25,
        timeout: 60,
        useSSL: true
      });
    }
    catch(e) {
      console.log("Connio MQTT connection failed.")
    }
  }

  connio_mqtt_disconnect() {
    console.log("Disconnecting Connio MQTT...");
    this.MQTTClient.disconnect();
  }

  subscribeToTopic() {
    console.log("Subscribing to topic...");
    let parent = this;
    let subscribeOptions = {
      qos: 0,  // QoS
      invocationContext: {foo: true},
      onSuccess: (context) => {
        parent.handleMQTTSubscribeSuccess(context);
      },
      onFailure: (context) => {
        parent.handleMQTTSubscribeFailed(context);
        console.log("Could not subscribe to topic");
      },
      timeout: 10
    };

    this.MQTTClient.subscribe(this.config.MQTTTopic, subscribeOptions);
  }

  handleMQTTConnectionLost(responseObject) {
    console.log("Connection Lost: " + responseObject.errorMessage);
  }

  handleMQTTSubscribeSuccess(context) {
    console.log("Subscribe success");
  }

  handleMQTTSubscribeFailed(context) {
    console.log("Subscribe failed");
  }

  handleMQTTMessage(message) {
    //console.log("Connio MQTT Message Arrived: " + message.destinationName + " " + message.payloadString);
    if( this.MQTTMessageRecvCallback ) {
      let messageArray = message.destinationName.split("/");
      this.MQTTMessageRecvCallback(messageArray[4], messageArray[6], message.payloadString);
    }
  }

  ConnioConfigException(snappMessage, msg) {
    this.name = "ConnioConfigException";
    this.snappMessage = snappMessage;
    //custom message from smapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  }

  ConnioNetworkException(snappMessage, msg) {
    this.name = "ConnioNetworkException";
    this.snappMessage = snappMessage;
    //custom message from smapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  }


  ConnioMQTTException(snappMessage, msg) {
    this.name = "ConnioMQTTException";
    this.snappMessage = snappMessage;
    //custom message from smapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  }

}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ConnioObject);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
/**
 * Created by lorenzo on 05/04/17.
 */



class ContainerObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor() {

        super(' .container');
    }
}

// ES6 exports

/* harmony default export */ __webpack_exports__["a"] = (ContainerObject);


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by Ravish S on 21/11/17.
*/

class DialogObject {
    
    constructor() {
        this.closeText = "Close";
        this.actionText = "Button";
    }

    create (title,message) {
        let dialog = 
            $(`<div id="modal" class="modal fade">
                <div class="modal-dialog-sm" style = "position:relative;background:#fff;margin:50px;">
                     
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">${title}</h4>
                    </div>
                    <div class="modal-body">
                        <p>${message}</p>                
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default cancel-btn" data-dismiss="modal">${this.closeText}</button>
                        <button type="button" class="btn btn-primary action-btn">${this.actionText}</button>
                    </div>
                </div>    
            `);
        return dialog;
    }

    addCancelBtn (title,dialog) {
       this.closeText = title.replace(/'/g,"");
    } 

    addBtn (title,dialog) {
        this.actionText = title.replace(/'/g,"");
    }

    show (dialog,success) {
        $(dialog).modal('show');
        $(dialog).find(".cancel-btn").text(this.closeText);
        $(dialog).find(".action-btn").text(this.actionText);
        $(dialog).find(".action-btn").click(function(e) {
            $(dialog).modal('hide');
            success($(this).html());
        });
    }

}

/* harmony default export */ __webpack_exports__["a"] = (DialogObject);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ES6 imports

class DictionaryObject {

  constructor() {}

  createEmptyDictionary () {
    var dict = {};
    return dict;
  }

  createDictionary(key, value) {
    var dict = {};
    for (var i=0; i < key.length; i++){
      dict[key[i]] = value[i];
    }
    return dict;
  }

  removeAllKeys (dictionary) {
    for( var key in dictionary ) {
      delete dictionary[key];
    }
    return dictionary;
  }

  getKeys (dictionary) {
    var keys = [];
    for( var key in dictionary ) {
      keys.push(key);
    }
    return keys;
  }

  getDictValue (dictionary,key) {
    if( dictionary != undefined ) {
      return dictionary[key];  
    }
    else {
      return "";
    }
    
  }

  setDictValue (dictionary,key,value) {
    if( dictionary != undefined ) {
      dictionary[key] = value;  
    }
  }

  removeDictKey (dictionary,key) {
    if( dictionary != undefined ) {
      delete dictionary[key];  
    }
  }

  conatinedInDict (dictionary,key) {
    if( dictionary != undefined ) {
      return (dictionary[key] != undefined ) ? true : false;  
    }
    else {
      return false;
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (DictionaryObject);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
/**
 * Created by Luca Latini on 24/04/17.
 */

// ES6 imports


class GaugeObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {


    constructor() {
        super();

        const self = this;
        this.gauge = [];

        $(document).ready(function() {
            //setTimeout( function() {
            $('.element.fc.Gauge').each(function (obj) {
                let objName = $(this)[0].getAttribute('obj-name');
                self.gauge[objName] = self.init(objName);
                //    self.graph[objName].unload();    this is used to hide the Graph when the preview has been loaded
            });
            //   }, 1000);
        });

        this.getProperty = Object.assign(this.getProperty, {
            'Alpha': (objName) => {
                return $(this.getGaugeElemFromName(objName)).css('opacity') * 100;
            },

            'Background color': (objName) => {
                return $(this.getGaugeElemFromName(objName)[0]).css("background-color");
            },

            'Current Value': (objName) => {
               return this.gauge[objName].data()[0].values[0].value;
            },

            'Maximum Value': (objName) => {
                return this.gauge[objName].internal.config.gauge_max;
            },

            'Minimum Value': (objName) => {
                return this.gauge[objName].internal.config.gauge_min;
            },

            'track color': (objName) => {
                var elemSelector = '[obj-name="' + objName + '"]';
                return d3.selectAll(elemSelector + ' path.c3-chart-arcs-background').style('fill');

            },

            'pointer color': (objName) => {
                return d3.selectAll(this.getGaugeElemFromName(objName)).select('path.c3-arc-data').style('fill');

            },

            'track width': (objName) => {
                return this.gauge[objName].internal.config.gauge_width;

            }

        });

        this.setProperty = Object.assign(this.setProperty, {
            'Alpha': (objName, value) => {
                d3.selectAll(this.getGaugeElemFromName(objName)).style('opacity', value/100)


            },

            'Background color': (objName, value) => {
                var elemSelector = '[obj-name="' + objName + '"]';
                $(elemSelector + ' svg').css("background-color",value);


            },

            'Current Value': (objName, value) => {
                this.gauge[objName].load({columns: [['data', value]]});
                var el = this.gauge[objName];
               // this.gauge[objName] = this.gaugeRender(objName)


            },

            'Maximum Value': (objName, value) => {
                this.gauge[objName].internal.config.gauge_max = value;
                var gaugeData = this.gauge[objName].data();
                var gaugeCurrVal = gaugeData[0].values[0].value;
                this.gauge[objName].load({columns: [['data', gaugeCurrVal]]});

            },

            'Minimum Value': (objName, value) => {

                this.gauge[objName].internal.config.gauge_min = value;
                var gaugeData = this.gauge[objName].data();
                var gaugeCurrVal = gaugeData[0].values[0].value;
                this.gauge[objName].load({columns: [['data', gaugeCurrVal]]});
            },

            'track color': (objName, value) => {
                var elemSelector = '[obj-name="' + objName + '"]';
                d3.selectAll(elemSelector + ' path.c3-chart-arcs-background').style('fill', value)


            },

            'pointer color': (objName, value) => {
                d3.selectAll(this.getGaugeElemFromName(objName)).select('path.c3-arc-data').style('fill', value);


            },

            'track width': (objName, value) => {
                this.gauge[objName].internal.config.gauge_width = value;
                var gaugeData = this.gauge[objName].data();
                var gaugeCurrVal = gaugeData[0].values[0].value;
                this.gauge[objName].load({columns: [['data', gaugeCurrVal]]});

            }
        });

    }

    getGaugeElemFromName (objName) {
        return this.getElemFromName(objName).find('#fcGauge');
    }

    init(objName) {

        var $is = this.getGaugeElemFromName(objName)[0];
        var ele = $is;

        //    this.$el.css({
        //      "opacity": this.getGaugeElemFromName(objName)[0].getAttribute('opacity')
        //});


        var bg = this.getProperty["Background color"](objName);
        var gaugeMin = this.getGaugeElemFromName(objName)[0].getAttribute('gaugeMin');
        var gaugeMax = this.getGaugeElemFromName(objName)[0].getAttribute('gaugeMax');
        var gaugeVal = this.getGaugeElemFromName(objName)[0].getAttribute('gaugeVal');
        var gaugeTrackWidth = this.getGaugeElemFromName(objName)[0].getAttribute('gaugeTrackWidth');
        var gaugeTrackColor = this.getProperty["track color"](objName);
        var gaugePointerColor = this.getProperty["pointer color"](objName);

        const self = this;

        // let gaugeRender2 = function(objName) {
        //
        //     if (self.gauge[objName]) {
        //         bg = self.getProperty["Background color"](objName);
        //         gaugeMin = self.getProperty["Minimum Value"](objName);
        //         gaugeMax = self.getProperty["Maximum Value"](objName);
        //         gaugeVal = self.getProperty["Current Value"](objName);
        //         gaugeTrackColor = self.getProperty["track color"](objName);
        //         gaugePointerColor = self.getProperty["pointer color"](objName );
        //         self.setProperty["pointer color"](objName, gaugePointerColor);
        //         self.setProperty["track color"](objName, gaugeTrackColor);
        //     }
        // };

        this.getGaugeElemFromName(objName).css({
            "background-color": bg
        });


        var gauge = c3.generate({
            bindto:$is,
            data: {
                columns: [
                    ['data', gaugeVal]
                ],
                type: 'gauge',
                color: function (color, d) {
                        return self.getProperty["pointer color"](objName) == 'none' ? color : self.getProperty["pointer color"](objName);
            }
            },
            oninit: function() {
                d3.select(ele).selectAll('path.c3-chart-arcs-background').style("fill", self.getProperty["track color"](objName));
            },
            gauge: {
                min: gaugeMin,
                max: gaugeMax,
                width: gaugeTrackWidth, // for adjusting arc thickness,
                expand: true,
                startingAngle:0,
                label: {
                    format: function(value, ratio) {
                        return "";
                    },
                    show: false
                },

            },
            color: {
                pattern: [gaugePointerColor]
            },
            size: {
                height: self.getProperty["height"](objName) / 2,
                width: self.getProperty["width"](objName)
            },
            tooltip: {
                show: false
            }
        });

        return gauge;


    }

    // animationStart(objName, animation, onCompleteCallback) {
    //     if (animation.type === 'scale') {
    //         let duration = animation.duration*1000;
    //         let options = {duration: duration, complete: onCompleteCallback, queue: animation.id};
    //         let elemDiv = this.getElemFromName(objName);
    //         let elemSvg = $('[obj-name="'+objName+'"] svg');
    //         let newWidth = elemDiv.width() * animation.dX;
    //         let newHeight = elemDiv.height() * animation.dY;
    //         let leftDelta = (newWidth - elemDiv.width()) / 2;
    //         let topDelta = (newHeight - elemDiv.height()) / 2;
    //         var zoom = elemDiv[0].style.transform +' scaleX('+animation.dX+') scaleY('+animation.dY+')';
    //         elemDiv.animate({'transform': zoom}, options);
    //         //
    //         //  newWidth = elemSvg.width() * animation.dX;
    //         //  newHeight = elemSvg.height() * animation.dY;
    //         //  leftDelta = (newWidth - elemSvg.width()) / 2;
    //         //  topDelta = (newHeight - elemSvg.height()) / 2;
    //         // elemSvg.animate({width:newWidth+'px', height:newHeight+'px', left: '-='+leftDelta+'px', top: '-='+topDelta+'px'}, options);
    //         // elemDiv.dequeue(animation.id);
    //         elemDiv.dequeue(animation.id);
    //     }
    //     else  super.animationStart(objName, animation, onCompleteCallback)
    // };
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (GaugeObject);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
/**
 * Created by Luca Latini on 19/04/17.
 */

// ES6 imports


class GraphContainerObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {


    constructor() {
        super();
        // this.this.getGraphElemFromName(objName)Ref = this.getGraphElemFromName(objName)Ref || '';
        const self = this;
        this.graph = [];
        $(document).ready(function() {
            //setTimeout( function() {
                $('.element.fc.GraphContainer').each(function (obj) {
                    let objName = $(this)[0].getAttribute('obj-name');
                    let chartData = {};
                    chartData.columns = [['Data', 10, 20, 30, 40, 50]]
                    chartData.unload = true;
                    self.graph[objName] = self.init(chartData, objName);
                //    self.graph[objName].unload();    this is used to hide the Graph when the preview has been loaded
                });
         //   }, 1000);
        });

        this.getProperty = Object.assign(this.getProperty, {
            'BG Color': (objName) => {
                return this.getGraphElemFromName(objName).css('background-color');
            },

            'Type': (objName) => {
                return this.getGraphElemFromName(objName)[0].getAttribute('graphType');
            },
            'Legends': (objName) => {
               // let val = d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-legend-item').style("visibility") == 'visible'? true : false ;
               // return val;
                return this.getGraphElemFromName(objName)[0].getAttribute('legendShow') === 'true'
            },

            'Grid': (objName) => {
               // let val = d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-grid').style('visibility') == 'visible'? true : false ;
              //  return val;
                return this.getGraphElemFromName(objName)[0].getAttribute('gridShow') === 'true'
            },

            'X Axis Text': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('text').html();
            },

            'Y Axis Text': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('text').html();
            },

            'X Axis Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('path').style("stroke");
            },

            'Y Axis Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('path').style("stroke");
            },

            'X Axis Text Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style("fill");
            },

            'Y Axis Text Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style("fill");
            },

            'X Axis Line Width': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('path').style("stroke-width");
            },

            'Y Axis Line Width': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('path').style("stroke-width");
            },

            'Legend Text': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('text.c3-axis-x-label').style("stroke");
            },

            'Fill Alpha': (objName) => {
                let type = this.getProperty["Type"](objName);
                if (type == 'line')
                    return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('.c3-area ').style('opacity') * 100;
                else return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-bars ').selectAll('path').style('opacity') * 100;
            },

            'Fill Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('.c3-area ').style('fill');
            },

            'Bar Color': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-bar').selectAll('path').style('fill');
            },

            'Line Width': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-lines').selectAll('path').style("stroke-width");
            },

            'Line Circle Color': (objName) => {
                    return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('circle').style("fill");
            },

            'Line Filled': (objName) => {
                return this.getGraphElemFromName(objName)[0].getAttribute('linePlotDrawfilled') === 'true';
            },

            'Smooth Line': (objName) => {
                return this.getGraphElemFromName(objName)[0].getAttribute('linePlotSmoothline') === 'true';
            },

            'Circle Radius': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('circle').attr('r');
            },

            'Draw Line Values': (objName) => {
                let val = d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-text').selectAll('text').style("visibility") == 'visible'? true : false ;
                return val;
            },

            'Draw Values': (objName) => {
                return this.getProperty['Draw Line Values'](objName); //d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-text').style("opacity");
            },

            'Axis Font Size': (objName) => {
                return d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style('font-size');
            }
        });

        this.setProperty = Object.assign(this.setProperty, {

            'BG Color': (objName, value) => {
                this.getGraphElemFromName(objName).css('background-color',value);
            },

            'Type': (objName, value) => {
                this.getGraphElemFromName(objName).attr('graphType', value);
                this.graph[objName].transform(value);
            },

            'Legends': (objName, value) => {
                let show = 'visible';
                if (!value)
                    show = 'hidden';
                this.getGraphElemFromName(objName).attr('legendShow', value)
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-legend-item').style("visibility", show);
            },

            'Grid': (objName, value) => {
                let show = 'visible';
                if (!value)
                    show = 'hidden';
                this.getGraphElemFromName(objName).attr('gridShow', value)
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-grid').style('visibility',show);
            },

            'X Axis Text': (objName, value) => {
                this.graph[objName].axis.labels({x: value});
            },

            'Y Axis Text': (objName, value) => {
                this.graph[objName].axis.labels({y: value});
            },

            'X Axis Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('path').style("stroke", value);
            },

            'Y Axis Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('path').style("stroke", value);
            },

            'X Axis Text Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style("fill", value);
            },

            'Y Axis Text Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style("fill", value);
            },

            'X Axis Line Width': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('path').style("stroke-width", value);
            },

            'Y Axis Line Width': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('path').style("stroke-width", value);
            },

            'Legend Text': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('text.c3-axis-x-label').style("stroke", value);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('text.c3-axis-y-label').style("stroke", value);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-legend-item').selectAll('text').style("stroke", value);
            },

            'Fill Alpha': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('.c3-area ').style('opacity',value/100);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-bars ').selectAll('path').style('opacity',value/100);
            },

            'Fill Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('.c3-area ').style('fill',value);
            },

            'Bar Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-bar').selectAll('path').style('fill',value)
            },

            'Line Width': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-lines').selectAll('path').style("stroke-width", value);
            },

            'Line Circle Color': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('circle').style("stroke", value);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('circle').style("fill", value);
            },

            'Circle Radius': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('circle').attr('r',value);
            },

            'Draw Line Values': (objName, value) => {
                let show = 'visible';
                if (!value)
                    show = 'hidden';
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-chart-text').selectAll('text').style("visibility", show);
            },

            'Draw Values': (objName, value) => {
                this.setProperty["Draw Line Values"](objName, value);
            },

            'Axis Font Size': (objName, value) => {
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style('font-size',value);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style('font-size',value);
                d3.select(this.getGraphElemFromName(objName)[0]).selectAll('text.c3-text').style('font-size',value);
            },

            'Line Filled': (objName, value) => {
                if (value)
                    this.graph[objName].transform('area');
                else
                    this.graph[objName].transform('line');
                this.getGraphElemFromName(objName).attr('linePlotDrawfilled', value)
            },

            'Smooth Line': (objName, value) => {
                if (value)
                    this.graph[objName].transform('area-spline');
                else
                    this.graph[objName].transform('area');
                this.getGraphElemFromName(objName).attr('linePlotSmoothline', value)
            }
        });
    }

    getGraphElemFromName (objName) {
        return this.getElemFromName(objName).find('#fcLine');
    }
    
    createChartWithList(objName,xArr,yArr,name) {

        let graph = this.graph[objName];
        let xAxisData = [];
        let yAxisData = [];

        if( yArr!=null ) {

            let populateXAxis = false;

            if( xArr!=null ) {
                for(let xIndex=0; xIndex<xArr.length; xIndex++) {
                    xAxisData.push(xArr[xIndex]);
                }
            }
            else {
                populateXAxis = true;
            }

            yAxisData.push(name);
            for(let i=0; i<yArr.length; i++) {
                yAxisData.push(yArr[i]);
                if( populateXAxis )
                    xAxisData.push(i);
            }

            let chartData = {};
            chartData.columns = [];
            chartData.columns.push(yAxisData);
            chartData.categories = xAxisData;
            chartData.unload = true;

            return graph.load(chartData);

        } else { throw this.graphException(e); }
    }

    addChartTransition(objName,x,y) {

        let graph = this.graph[objName];
        let dataArr = [graph.data()[0].id];
        let graphInitArr = [graph.data()[0].id];

        for (let i=0;i<graph.data()[0].values.length;i++) {
            graphInitArr.push(0); // ReInit the Graph
        }
        for (let i=0;i<graph.data()[0].values.length;i++) {
            dataArr.push(graph.data()[0].values[i].value);
        }
        let initGraph = graph.load({
            columns: [graphInitArr]
        });

        let updatedGraph = setTimeout(function () {
            graph.load({  columns: [dataArr]  });
        }, x);

        return [initGraph,updatedGraph];
    }

    addValuesToChart(objName,xVal,yVal,name) {

        let graph = this.graph[objName];
        let xAxisArr = graph.categories();
        xAxisArr.push(xVal);
        let yAxisArr = [name];
        let graphData = graph.data()[0].values;

        for (let i=0;i<graphData.length;i++) {
            yAxisArr.push(graphData[i].value);
        }

        yAxisArr.push(yVal);
        let chartData = {};
        chartData.columns = [];
        chartData.columns.push(yAxisArr);
        chartData.categories = xAxisArr;
        chartData.unload = true;
    
        return graph.load(chartData);
    }

    graphException(snappMessage, msg) {
        this.name = "GraphException";
        this.snappMessage = snappMessage;
        //custom message from snapp.
        this.message = msg || snappMessage;
        this.stack = (new Error()).stack;
    }

    init(chartData, objName) {

        let ele = this.getGraphElemFromName(objName)[0];
        let graphType  = ele.getAttribute('graphType');
        let circleColor = '';
        if (graphType !== 'bar') {
            circleColor = this.getProperty["Line Circle Color"](objName);
        }
        let fillAlpha;
        let fillColor = graphType == 'bar' ? this.getProperty["Bar Color"](objName) : this.getProperty["Fill Color"](objName);
        let linePlotWidth = graphType == 'line' ? this.getProperty["Line Width"](objName) : '';
        let axisFontSize = this.getProperty["Axis Font Size"](objName);
        let xAxisLabelText = this.getProperty["X Axis Text"](objName);
        let yAxisLabelText = this.getProperty["Y Axis Text"](objName);
        let xAxisColor = this.getProperty["X Axis Color"](objName);
        let yAxisColor = this.getProperty["Y Axis Color"](objName);
        let xAxisTextColor = this.getProperty["X Axis Text Color"](objName);
        let yAxisTextColor = this.getProperty["Y Axis Text Color"](objName);
        let xAxisLineWidth = this.getProperty["X Axis Line Width"](objName);
        let yAxisLineWidth = this.getProperty["Y Axis Line Width"](objName);
        let legendTextColor = this.getProperty["Legend Text"](objName);
        let drawLineValues = this.getProperty["Draw Line Values"](objName);
        let drawBarValues = this.getProperty["Draw Values"](objName);
        let legendShow = this.getProperty["Legends"](objName);
        let gridShow = this.getProperty["Grid"](objName);
        let circleRadius = graphType == 'line' ? this.getProperty["Circle Radius"](objName) : '';
        let fillBarAlpha;
        let chartType;
        if (graphType == 'line') {
            if (ele.getAttribute('linePlotSmoothline') == 'true') {
                if (ele.getAttribute('linePlotDrawfilled') == 'true')
                    chartType = "area-spline";
                else
                    chartType = "spline";
            } else {
                if (ele.getAttribute('linePlotDrawfilled') == 'true')
                    chartType = "area";
                else
                    chartType = "line";
            }
        } else {
            //BAR
            chartType = "bar";
        }

        const self = this;

        let lineInit = function(objName) {

            if (self.graph[objName]) {
                ele = self.getGraphElemFromName(objName)[0];
                graphType  = self.getProperty["Type"](objName);
                circleColor = '';
                if (graphType !== 'bar') {
                    circleColor = ele.getAttribute('circleColor');
                }
                fillAlpha = ele.getAttribute('fillLineAlpha');
                fillColor = graphType == 'bar' ? self.getProperty["Bar Color"](objName) : self.getProperty["Fill Color"](objName);
                linePlotWidth = graphType == 'line' ? self.getProperty["Line Width"](objName): '';
                axisFontSize = self.getProperty["Axis Font Size"](objName);
                xAxisLabelText = self.getProperty["X Axis Text"](objName);
                yAxisLabelText = self.getProperty["Y Axis Text"](objName);
                xAxisColor = self.getProperty["X Axis Color"](objName);
                yAxisColor = self.getProperty["Y Axis Color"](objName);
                xAxisTextColor = self.getProperty["X Axis Text Color"](objName);
                yAxisTextColor = self.getProperty["Y Axis Text Color"](objName);
                xAxisLineWidth = self.getProperty["X Axis Line Width"](objName);
                yAxisLineWidth = self.getProperty["Y Axis Line Width"](objName);
                legendTextColor = self.getProperty["Legend Text"](objName);
                drawLineValues = self.getProperty["Draw Line Values"](objName);
                drawBarValues = self.getProperty["Draw Values"](objName);
                legendShow = self.getProperty["Legends"](objName);
                gridShow = self.getProperty["Grid"](objName);
                circleRadius = graphType == 'line' ? self.getProperty["Circle Radius"](objName) : '';
                fillBarAlpha = ele.getAttribute('fillBarAlpha');

            }

            d3.select(ele).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style("fill", xAxisTextColor);
            d3.select(ele).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style("fill", yAxisTextColor);
            d3.select(ele).selectAll('text.c3-axis-x-label').style("stroke", legendTextColor);
            d3.select(ele).selectAll('text.c3-axis-y-label').style("stroke", legendTextColor);
            d3.select(ele).selectAll('g.c3-legend-item').selectAll('text').style("stroke", legendTextColor);
            d3.select(ele).selectAll('g.c3-texts').selectAll('text').style("fill", legendTextColor);
            d3.select(ele).selectAll('g.c3-axis-x').selectAll('path').style("stroke", xAxisColor);
            d3.select(ele).selectAll('g.c3-axis-y').selectAll('path').style("stroke", yAxisColor);
            d3.select(ele).selectAll('g.c3-axis-x').selectAll('g.tick').selectAll('line').style("stroke", xAxisColor);
            d3.select(ele).selectAll('g.c3-axis-y').selectAll('g.tick').selectAll('line').style("stroke", yAxisColor);
            d3.select(ele).selectAll('g.c3-axis-x').selectAll('path').style("stroke-width", xAxisLineWidth);
            d3.select(ele).selectAll('g.c3-axis-y').selectAll('path').style("stroke-width", yAxisLineWidth);

            if (legendShow) {
                d3.select(ele).selectAll('text.c3-axis-x-label').style("visibility", 'visible');
                d3.select(ele).selectAll('text.c3-axis-y-label').style("visibility", 'visible');
                d3.select(ele).selectAll('g.c3-legend-item').style("visibility", 'visible');
            } else {
                d3.select(ele).selectAll('g.c3-legend-item').style("visibility", 'hidden');
            }

            if (gridShow)
                d3.select(ele).selectAll('g.c3-grid').style('visibility', 'visible');
            else
                d3.select(ele).selectAll('g.c3-grid').style('visibility', 'hidden');

            //Draw Values
            if (graphType != 'bar') {
                if (drawLineValues)
                    d3.select(ele).selectAll('g.c3-chart-text').selectAll('text').style("visibility", 'visible');
                else
                    d3.select(ele).selectAll('g.c3-chart-text').selectAll('text').style("visibility", 'hidden');
            }

            if (graphType == 'bar') {
                if (drawBarValues)
                    d3.select(ele).selectAll('g.c3-chart-text').selectAll('text').style("visibility", 'visible');
                else
                    d3.select(ele).selectAll('g.c3-chart-text').selectAll('text').style("visibility", 'hidden');
            }
            setTimeout( function() {
                d3.select(ele).selectAll('circle').style("stroke", circleColor);
                d3.select(ele).selectAll('circle').style("fill", circleColor);
            },100);
            d3.select(ele).selectAll('g.c3-chart-lines ').selectAll('path').style('opacity', fillAlpha);
            d3.select(ele).selectAll('.c3-area ').style('fill', fillColor);
            d3.select(ele).selectAll('.c3-shape ').style('stroke', fillColor);
            d3.select(ele).selectAll('path.c3-line').style('stroke-width', linePlotWidth);
            //Bar
            d3.select(ele).selectAll('g.c3-chart-bars ').selectAll('path').style('opacity', fillBarAlpha);
            d3.select(ele).selectAll('g.c3-chart-bar').selectAll('path').style('fill', fillColor);
            //Font Size
            d3.select(ele).selectAll('g.c3-axis-x').selectAll('text').selectAll('tspan').style('font-size', axisFontSize);
            d3.select(ele).selectAll('g.c3-axis-y').selectAll('text').selectAll('tspan').style('font-size', axisFontSize);
            d3.select(ele).selectAll('text.c3-text').style('font-size', axisFontSize);
        };

        this.getGraphElemFromName(objName).css({
            "background-color": this.getProperty["BG Color"](objName)
        });

        let graph = c3.generate({
            bindto: ele,
            data: {
                columns: chartData.columns,
                labels: true,
                type: chartType,
                colors: {
                    Data : fillColor
                }
            },
            size: {
                width: parseInt(this.getElemFromName(objName)[0].style['width'], 10),
                height: parseInt(this.getElemFromName(objName)[0].style['height'], 10)
            },
            color: {
                pattern: [fillColor]
            },
            onrendered: function () {
                try {
                    lineInit(objName);
                }  catch (e) {
                    console.log (e);
                }
            },
            point: {r:circleRadius},
            transition: {
                duration: 350
            },
            grid: {
                x : {
                    show:true
                },
                y: {
                    show:true
                }
            },
            axis: {
                x: {
                    type: 'category',
                    categories: ['1', '2','3','4','5'],
                    min:0,
                    label: {
                        text: xAxisLabelText
                    }
                },
                y: {
                    label: {
                        text: yAxisLabelText
                    },
                    tick: {
                        format: d3.format('.0f')
                    }
                }
            }
        });

        return graph;
    }

}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (GraphContainerObject);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
// ES6 imports


class GridViewObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {


    constructor() {
        super();
        this.objectNameMap = {};
        this.templateCell = null;

        this.getProperty = Object.assign(this.getProperty, {
            'Horizontal separator thick': (objName) => {
                let ele = '[obj-name= "' + objName + '"]';
                return $(ele).css("border-bottom-width");
            },
            'separator color': (objName) => {
                let ele = '[obj-name= "' + objName + '"]';
                return $(ele).css("border-bottom-color");
            },
            'Highlight cell color': (objName) => {
                let ele = '[obj-name= "' + objName + '"]';
                return $(ele).attr("cell-highlight-color");
            },
            'Highlight cell': (objName) => {
                let ele = '[obj-name= "' + objName + '"]';
                return $(ele).attr("cell-highlight");
            },
            width: (obj) => {
                return $(obj).width();
            },
            height: (obj) => {
                return $(obj).height();
            },
            x: (obj) => {
                var elem = $(obj);
                return elem.position().left;
            },
            y: (obj) => {
                var elem = $(obj);
                return elem.position().top;
            },
            Alpha: (obj) => {
                return $(obj).css('opacity');
            },
            'Background color': (obj) => {
                return $(obj).css('background-color');
            },
            'Horizontal scroll': (obj) => {
                return $(obj).css('overflow-x');
            },
            'Vertical scroll': (obj) => {
                return $(obj).css('overflow-y');
            },
        });

        this.setProperty = Object.assign(this.setProperty, {
            'height': (objName, value) => {
                if (objName == 'GridViewCell') {
                    let ele = '[obj-name= "' + objName + '"]';
                    $(ele).each(function(i) {
                        $(this).css("height",value+'px');
                        $(this).css('top',value*(i));
                    });
                }
            },
            'Horizontal separator thick': (objName, value) => {
                let ele = '[obj-name= "' + objName + '"]';
                $(ele).css("border-bottom-width",value+"px");
            },
            'separator color': (objName, value) => {
                let ele = '[obj-name= "' + objName + '"]';
                $(ele).css("border-bottom-color",value);
            },
            'Highlight cell color': (objName, value) => {
                let ele = '[obj-name= "' + objName + '"]';
                if ($(ele).attr("cell-highlight") == "true") {
                    $(ele).mouseenter(function() {
                        $(this).css("background-color",value);
                    }).mouseleave(function() {
                        $(this).css("background-color",$(ele).attr("cell-bg-color"));
                    });
                } else {
                    $(ele).unbind("mouseenter");
                }
            },
            'Highlight cell': (objName, value) => {
                let ele = '[obj-name= "' + objName + '"]';
                $(ele).attr("cell-highlight",value);
            },
            width: (obj, value) => {
                $(obj).css('width', value + 'px');
            },
            height: (obj, value) => {
                $(obj).css('height', value + 'px');
            },
            x: (obj, value) => {
                var elem = $(obj);
                //var yPos = Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[1], 10)); // elem.css('transform').split(',')[5])
                var yPos = elem.position().top;
                // remove constraints
                this.removeConstraints(elem, 'x');
                elem.css('transform', 'translate(' + value + 'px,' + yPos + 'px)');
            },
            y: (obj, value) => {
                var elem = $(obj);
                //var xPos = Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[0], 10)); // elem.css('transform').split(',')[4])
                var xPos = elem.position().left;
                // remove constraints if applied
                this.removeConstraints(elem, 'y');
                elem.css('transform', 'translate(' + xPos + 'px,' + value + 'px)');
            },
            Alpha: (obj, value) => {
                $(obj).css('opacity', value/100 );
            },
            'Background color' : (obj, value) => {
                $(obj).css("background-color", value);
            },
            'Horizontal scroll': (obj, value) => {
                $(obj).css('overflow-x', 'hidden');
                if (value) $(obj).css('overflow-x', 'scroll');
            },
            'Vertical scroll': (obj, value) => {
                $(obj).css('overflow-y', 'hidden');
                if (value) $(obj).css('overflow-y', 'scroll');
            }
        });
    }

    getGridElemFromName (objName) {
        return this.getElemFromName(objName).find('.GridView');
    }

    configureCells (objName, cellLength, clickcallback) {
        var parent = this;
        var index = 0;
        var ele = '[obj-name="' + objName + '"]';
        var cellsTobeAdded = cellLength-1; //First one exists
        var firstElement = $(ele).children().eq(1);
        if( this.templateCell == null ) {
            this.templateCell = firstElement.clone();
        }
        else {
            firstElement = this.templateCell;
            $(ele).children().eq(1).replaceWith(firstElement);
        }
        
        for (let i=0;i<cellsTobeAdded;i++) {
            let cellView = firstElement.clone();
            //The elements are absolutely positioned. Change their 'top' attr
            $(cellView).css('left',firstElement.width()*(i+1));
            //Change ID for these elements
            let firstCellId = parseInt(firstElement.attr('id').replace("j_",""));
            $(cellView).attr("id","j_"+parseInt(firstCellId+i+1));
            
            //Now rename the children
            $(cellView).children().each(function () {
                index++;
                let currName = $(this).attr("obj-name");
                if( currName != undefined ) {
                    let newId = "gc_" + index;
                    let newName = currName + "_GC_" + index;
                    $(this).attr("id", newId);
                    $(this).attr("obj-name", newName);
                    parent.objectNameMap[newId] = newName;
                }
            });

            $(cellView).attr("listindex", i+1);
            $(cellView).click( function() {
                console.log("clicked ", $(this).attr("listindex"));
                parent.setContext($(this));
                //callback here
                if( clickcallback != null ) {
                    clickcallback($(this), $(this).attr("listindex"));
                }
                parent.resetContext($(this));
            });

            $(ele).append(cellView);
        }
        firstElement.children().each(function () {
            index++;
            let currName = $(this).attr("obj-name");
            if( currName != undefined ) {
                let newId = "gc_" + index;
                let newName = currName + "_GC_" + index;
                $(this).attr("id", newId);
                $(this).attr("obj-name", newName);
                parent.objectNameMap[newId] = newName;
            }
        });

        firstElement.attr("listindex", 0);
            firstElement.click( function() {
                console.log("clicked ", $(this).attr("listindex"));
                parent.setContext($(this));
                //callback here
                if( clickcallback!= null ) {
                    clickcallback($(this), $(this).attr("listindex"));
                }
                parent.resetContext($(this));
            });
    }

    removeCell(cell) {
        cell.remove();
    }

    setContext(objName) {
        console.log(objName);
        objName.children().each(function () {
            let currName = $(this).attr("obj-name");
            if( currName != undefined ) {
                let charIndex = currName.indexOf('_GC_');
                if( charIndex != -1 ) {
                    var newName = currName.substr(0, charIndex);
                    $(this).attr("obj-name", newName);
                }
                
            }
        });
    }

    resetContext(objName) {
        var parent = this;
        objName.children().each(function () {
            let currName = $(this).attr("obj-name");
            let currId = $(this).attr("id");

            if( currName != undefined ) {
                $(this).attr("obj-name", parent.objectNameMap[currId]);
            }
        });
    }

    removeAllCells(objName) {
        var parent = this;
        let ele = '[obj-name="' + objName + '"]';
        $(ele).children().each(function (i) {
            if( i > 1 ) {
                $(this).remove();    
            }
        });
        parent.objectNameMap = {};
    }

    scrollTo (objName,cellNum,animated) {
        let ele = '[obj-name="' + objName + '"]';
        let scrollSpeed = 500;
        if (!animated) {
            scrollSpeed = 0;
        }
        $(ele).animate({
            scrollTop: $(ele).find(".GridViewCell:nth-child("+cellNum+")" ).offset().top}
        ,scrollSpeed);
    }

    isCellVisible (objName,cellNum) {
        let ele = '[obj-name="' + objName + '"]';
        let cell = $(ele).find(".GridViewCell:nth-child("+cellNum+")" );
        let contHeight = $(ele).height();
        let contTop = $(ele).scrollTop();
        let contBottom = contTop + contHeight;
        let elemTop = cell.offset().top - $(ele).offset().top;
        let elemBottom = elemTop + cell.height();

        return elemTop >= 0 && elemBottom <=contHeight;
    }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (GridViewObject);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
// ES6 imports


class ImageObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor() {
        super(' image');

        var self = this;

        // this.getProperty['Image'] = function(objName) {
        //   return this.getElemFromName(objName).attr('src');
        // };

        this.getProperty['Image'] = function(objName) {
            let elemSelector = self.getElemFromName(objName);
            let el = $(elemSelector).find('img');
            return el.get()[0];
        };

        this.getProperty['Scaling'] = function(objName) {
            return self.getElemFromName(objName).attr('scale-type');
        };

        // this.setProperty['Image'] = function(objName, value) {
        //     let elemSelector = '[obj-name="' + objName + '"]';
        //     let elem = $(elemSelector);
        //     elem.find('img').attr('src',value);
        // };

        this.setProperty['Image'] = function(objName, image) {

            // let elemSelector = '[obj-name="' + objName + '"]';
            // let elem = $('[obj-name="' + objName + '"]').find('img')
            // elem.attr('src', image.src);

            // getting the native element
            let $oldElem = $('[obj-name="' + objName + '"]').find('img');
            let oldElem = $oldElem.get()[0]; // getting the native element

            // make a copy of the input image
            // this copy will replace the current immage
            let newElem = image.cloneNode();

            // copy all existing img attributes to the new element except src
            for (let i = 0; i < oldElem.attributes.length; i++)
            {
              let attribute = oldElem.attributes[i];
              if (! newElem.getAttribute(attribute.name))
                newElem.setAttribute(attribute.name, attribute.value);
            }
            $oldElem.replaceWith(newElem);
        };

        this.setProperty['Scaling'] = function(objName, value) {
            let elemSelector = '[obj-name="' + objName + '"]';
            let elem = $(elemSelector);
            
            switch (value) {
              case "stretch":
                $(elemSelector + ' img').css('width','inherit');
                $(elemSelector + ' img').css('height','inherit');
                $(elemSelector + ' img').attr('scale-type','stretch');
                break;
              case "fit":
                $(elemSelector + ' img').css('width','inherit');
                $(elemSelector + ' img').css('height','initial');
                $(elemSelector + ' img').attr('scale-type','fit');
                break;
              case "crop":
                $(elemSelector + ' img').css('width','initial');
                $(elemSelector + ' img').css('height','initial');
                $(elemSelector + ' img').attr('scale-type','crop');
                break;
          }
        };
    }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ImageObject);



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class JsonObject {

  constructor() {}

  parseJSONDataForPath (data, path) {
    let jsonObject = {};
    if( typeof(data) == 'string' ) {
      try {
        jsonObject = JSON.parse(data);
      }
      catch(e) {
      }
    }
    else if( typeof(data) == 'object') {
      jsonObject = data;
    }
    let jsonPathObject = jsonPath(jsonObject, path);
    //=== is very important. Otherwise 0 will be treated as false as well.
    if( jsonPathObject === false ) {
      jsonObject = {};
      return jsonObject;
    }
    else {
      return jsonPathObject;
    }
  }

  parseJSONDataWithCallback (data, successcallback, failurecallback) {
    let jsonObject = {};
    if( typeof(data) == 'string' ) {
      try {
        jsonObject = JSON.parse(data);
        successcallback(jsonObject);
      }
      catch(e) {
        failurecallback(e);
      }
    }
    else if( typeof(data) == 'object') {
      successcallback(data);
    }
    else {
      failurecallback("Not a valid JSON");
    }
  }

  parseJSONData (data) {
    let jsonObject = {};
    if( typeof(data) == 'string' ) {
      try {
        jsonObject = JSON.parse(data);
      }
      catch(e) {
        //e['snappMessage'] = 'The input data does not seem a JSON object';
        //throw (e);
      }
      return jsonObject;
    }
    else if( typeof(data) == 'object') {
      return data;
    }
    else {
      return jsonObject;
    }
  }

  isValidJSON (data) {
    let jsonObject = {};
    if( typeof(data) == 'string' ) {
      try {
        jsonObject = JSON.parse(data);
        return true;
      }
      catch(e) {
        return false;
      }
    }
    else if( typeof(data) == 'object') {
      return true;
    }
    else {
      return false;
    }
  }

  covertToJSON (data) {
    // return this.parseJSONData(data);
    return JSON.stringify(data);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (JsonObject);



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(1);
// ES6 imports


class LabelObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */] {

    constructor() {
        super(' .label');
        // this.elemSelectorRef = elemSelectorRef || '';
        var self = this;

        this.getProperty = Object.assign(this.getProperty, {
            Text: (objName) => {
                let textFormat = this.getTextElemFromName(objName)[0].getAttribute('textFormat');
                if (textFormat == 'Plain Text') {
                    return this.getTextElemFromName(objName)[0].getAttribute('plain_text');
                } else return this.getTextElemFromName(objName).html();
            },
            'Max lines': (objName) => {
                return this.getElemFromName(objName).css('-webkit-line-clamp');
            }
        });
        this.setProperty = Object.assign(this.setProperty, {
            Text: (objName, value) => {
                let textFormat = this.getTextElemFromName(objName)[0].getAttribute('textFormat');
                if (textFormat == 'Plain Text') {
                    this.getTextElemFromName(objName).attr('plain_text', value)
                    // var data = $('<div>').text(value.replace(RegExp('\\\\n', 'g'), '\n').replace(RegExp('\\\\t', 'g'), '\t')).html().replace(/\n/g,"<br />").replace(/\t/g,"&nbsp;");
                    // this.getTextElemFromName(objName).html(data);
                    var data = $('<div>').html(value);
                    this.getTextElemFromName(objName).html($(data).text());
                } else  {
                    this.getTextElemFromName(objName).html(value.replace(RegExp('\\\\n|\\\\t|\\\\r|\\\\r\\\\n', 'g'), ''));
                }
            },
            'Max lines': (objName, value) => {
                var elemSelector2 = '[obj-name= "' + objName + '"]';
                if (value > 0) {
                    $(elemSelector2 + ' div.label').css({
                        'overflow': 'hidden',
                        'text-overflow': 'ellipsis',
                        'display': '-webkit-box',
                        '-webkit-line-clamp': value.toString(),
                        '-webkit-box-orient': 'vertical',
                        'height': 'auto',
                        'padding': '0'
                    })
                } else {
                    $(elemSelector2 + ' div.label').css({
                        'text-overflow': 'clip',
                        'display': '',
                        '-webkit-line-clamp': '0',
                        '-webkit-box-orient': '',
                        'padding': 'inherit'
                    })
                }
            }
        });

    };

    //
    //this.getProperty['Max lines'] = function(objName) {
    //    return this.getElemFromName(objName).css('-webkit-line-clamp');
    //};
    //
    //this.setProperty['Max lines'] = function(objName, value) {
    //    var elemSelector2 = '[obj-name= "' + objName + '"]';
    //    $(elemSelector2 + ' div.label').css({
    //      'overflow': 'hidden',
    //      'text-overflow': 'ellipsis',
    //      'display': '-webkit-box',
    //      '-webkit-line-clamp': value.toString(),
    //      '-webkit-box-orient': 'vertical',
    //      'height': 'auto',
    //      'padding':'0'
    //});
};

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (LabelObject);

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Code generator for list object
** Created by Harish Shanthi Kumar on 09/12/2016
*/

// ES6 imports

class ListsObject {

  constructor() {}

  listAdd (list,item) {
    return list.push(item);
  }

  listContains (list,item) {
    return (list.indexOf(item) > -1) ? true : false;
  }

  listAppend (list1,list2) {
    return list1.concat(list2);
  }

  listCheck (list) {
    return (list instanceof Array) ? true: false;
  }

  listEmpty (list) {
    return list.length = 0;
  }

  listOrder (list,order) {
    list.sort(function(a, b){
      if( order == "ASCENDING" ) {
        return a-b;
      }
      else {
        return b-a;
      }
    });
  }

  //Define custom exceptions pertaining to network module here.
  ListsUnsupportedRequest (msg) {
    let error = new Error(msg);
    error.name = 'ListsUnsupportedRequest';
    //error.snappMessage = "something?";
    throw error;
  }

  //Define custom exceptions pertaining to network module here.
  ListsNetworkException (msg) {
    let error = new Error(msg);
    error.name = 'ListsNetworkException';
    //error.snappMessage = "something?";
    throw error;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ListsObject);

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
/**
 * Created by Ravi on 18/07/2017
 */

// ES6 imports


class ListViewObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {


    constructor() {

        super();
        this.objectNameMap = {};
        this.templateCell = null;
        this.configCallbacks = {};
        this.clickCallbacks = {};

        this.getProperty = Object.assign(this.getProperty, {
            'Show scrollbar': (objName) => {
                let ele = '[obj-name= "' + objName + '"]';
                return $(ele).css("overflow-y");
            },
            'Horizontal separator thick': (objName) => {
                let ele = '[obj-name= "' + objName + '"]';
                return $(ele).css("border-bottom-width");
            },
            'separator color': (objName) => {
                let ele = '[obj-name= "' + objName + '"]';
                return $(ele).css("border-bottom-color");
            },
            'Highlight cell color': (objName) => {
                let ele = '[obj-name= "' + objName + '"]';
                return $(ele).attr("cell-highlight-color");
            },
            'Highlight cell': (objName) => {
                let ele = '[obj-name= "' + objName + '"]';
                return $(ele).attr("cell-highlight");
            },
            width: (obj) => {
                let ele = '[obj-name= "' + objName + '"]';
                return $(ele).width();
            },
            height: (obj) => {
                let ele = '[obj-name= "' + objName + '"]';
                return $(ele).height();
            },
            x: (obj) => {
                let ele = '[obj-name= "' + objName + '"]';
                return ele.position().left;
            },
            y: (obj) => {
                let ele = '[obj-name= "' + objName + '"]';
                return ele.position().top;
            },
            Alpha: (obj) => {
                let ele = '[obj-name= "' + objName + '"]';
                return $(ele).css('opacity');
            },
            'Background color': (obj) => {
                let ele = '[obj-name= "' + objName + '"]';
                return $(ele).css('background-color');
            },
            'Horizontal scroll': (obj) => {
                let ele = '[obj-name= "' + objName + '"]';
                return $(ele).css('overflow-x');
            },
            'Vertical scroll': (obj) => {
                let ele = '[obj-name= "' + objName + '"]';
                return $(ele).css('overflow-y');
            },
        });

        this.setProperty = Object.assign(this.setProperty, {
            'Show scrollbar': (objName, value) => {
                let overflow = "auto";
                if (value.toLowerCase() == 'never') {
                    overflow = "hidden";
                }
                let ele = '[obj-name= "' + objName + '"]';
                $(ele).css("overflow-y",overflow);
            },
            'height': (objName, value) => {
                if (objName == 'ListViewCell') {
                    let ele = '[obj-name= "' + objName + '"]';
                    $(ele).each(function(i) {
                        $(this).css("height",value+'px');
                        $(this).css('top',value*(i));
                    });
                }
            },
            'Horizontal separator thick': (objName, value) => {
                let ele = '[obj-name= "' + objName + '"]';
                $(ele).css("border-bottom-width",value+"px");
            },
            'separator color': (objName, value) => {
                let ele = '[obj-name= "' + objName + '"]';
                $(ele).css("border-bottom-color",value);
            },
            'Highlight cell color': (objName, value) => {
                let ele = '[obj-name= "' + objName + '"]';
                if ($(ele).attr("cell-highlight") == "YES") {
                    $(ele).mouseenter(function() {
                        $(this).css("background-color",value);
                    }).mouseleave(function() {
                        $(this).css("background-color",$(ele).attr("cell-bg-color"));
                    });
                } else {
                    $(ele).unbind("mouseenter");
                }
            },
            'Highlight cell': (objName, value) => {
                let ele = '[obj-name= "' + objName + '"]';
                $(ele).attr("cell-highlight",value);
            },
            width: (obj, value) => {
                let ele = '[obj-name= "' + obj + '"]';
                $(ele).css('width', value + 'px');
            },
            height: (obj, value) => {
                let ele = '[obj-name= "' + obj + '"]';
                $(ele).css('height', value + 'px');
            },
            x: (obj, value) => {
                let ele = '[obj-name= "' + obj + '"]';
                //var yPos = Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[1], 10)); // elem.css('transform').split(',')[5])
                var yPos = elem.position().top;
                // remove constraints
                this.removeConstraints(elem, 'x');
                elem.css('transform', 'translate(' + value + 'px,' + yPos + 'px)');
            },
            y: (obj, value) => {
                let ele = '[obj-name= "' + obj + '"]';
                //var xPos = Math.round(parseFloat(($(elem)[0].style.transform.split('(')[1].split(')')[0].split(','))[0], 10)); // elem.css('transform').split(',')[4])
                var xPos = ele.position().left;
                // remove constraints if applied
                this.removeConstraints(ele, 'y');
                elem.css('transform', 'translate(' + xPos + 'px,' + value + 'px)');
            },
            Alpha: (obj, value) => {
                let ele = '[obj-name= "' + obj + '"]';
                $(ele).css('opacity', value/100 );
            },
            'Background color' : (obj, value) => {
                let ele = '[obj-name= "' + obj + '"]';
                $(ele).css("background-color", value);
            },
            'Horizontal scroll': (obj, value) => {
                let ele = '[obj-name= "' + obj + '"]';
                $(ele).css('overflow-x', 'hidden');
                if (value) $(ele).css('overflow-x', 'scroll');
            },
            'Vertical scroll': (obj, value) => {
                let ele = '[obj-name= "' + obj + '"]';
                $(ele).css('overflow-y', 'hidden');
                if (value) $(obj).css('overflow-y', 'scroll');
            }
        });
    }

    getListElemFromName (objName) {
        return this.getElemFromName(objName).find('.ListView');
    }

    configureCells (objName, cellLength) {
        var parent = this;
        var index = 0;
        var ele = '[obj-name="' + objName + '"]';
        var cellsTobeAdded = cellLength-1; //First one exists
        var firstElement = $(ele).children().eq(1);

        if( this.templateCell == null ) {
            this.templateCell = firstElement.clone();
        }
        else {
            firstElement = this.templateCell;
            //$(ele).children().eq(1).replaceWith(firstElement);
        }
        
        for (let i=0;i<cellsTobeAdded;i++) {
            let cellView = firstElement.clone();
            //The elements are absolutely positioned. Change their 'top' attr
            $(cellView).css('top',firstElement.height()*(i+1));
            //Change ID for these elements
            let firstCellId = parseInt(firstElement.attr('id').replace("j_",""));
            $(cellView).attr("id","j_"+parseInt(firstCellId+i+1));
            
            //Now rename the children
            $(cellView).children().each(function () {
                index++;
                let currName = $(this).attr("obj-name");
                if( currName != undefined ) {
                    let newId = "lc_" + index;
                    let newName = currName + "_LC_" + index;
                    $(this).attr("id", newId);
                    $(this).attr("obj-name", newName);
                    parent.objectNameMap[newId] = newName;
                }
            });

            $(cellView).attr("listindex", i+1);
            $(cellView).click( function() {
                console.log("clicked ", $(this).attr("listindex"));
                parent.setContext($(this));
                //callback here
                let callback = parent.clickCallbacks[$(this).attr("obj-name")];
                if( callback != null ) {
                    callback($(this), $(this).attr("listindex"));
                }
                parent.resetContext($(this));
            });

            $(ele).append(cellView);

        }
        firstElement.children().each(function () {
            index++;
            let currName = $(this).attr("obj-name");
            if( currName != undefined ) {
                let newId = "lc_" + index;
                let newName = currName + "_LC_" + index;
                $(this).attr("id", newId);
                $(this).attr("obj-name", newName);
                parent.objectNameMap[newId] = newName;
            }
        });

        firstElement.attr("listindex", 0);
            firstElement.click( function() {
                console.log("clicked ", $(this).attr("listindex"));
                parent.setContext($(this));
                let callback = parent.clickCallbacks[$(this).attr("obj-name")];
                //callback here
                if( callback!= null ) {
                    callback($(this), $(this).attr("listindex"));
                }
                parent.resetContext($(this));
            });


        $(ele).find(".ListViewCell").each(function (obj) {
            let elem = $(this);
            if ($(elem).attr("cell-highlight") == "YES") {
                $(elem).mouseenter(function() {
                    $(elem).attr("cell-bg-color",$(elem).css("background-color"));
                    $(elem).css("background-color",$(elem).attr("cell-highlight-color"));
                }).mouseleave(function() {
                    $(elem).css("background-color",$(elem).attr("cell-bg-color"));
                });
            }
        });
        
    }

    removeCell(cell) {
        cell.remove();
    }

    setContext(objName) {
        console.log(objName);
        objName.children().each(function () {
            let currName = $(this).attr("obj-name");
            if( currName != undefined ) {
                let charIndex = currName.indexOf('_LC_');
                if( charIndex != -1 ) {
                    var newName = currName.substr(0, charIndex);
                    $(this).attr("obj-name", newName);
                }
                
            }
        });
    }

    setClickCallback(objName, callback) {
        this.clickCallbacks[objName] = callback;
    }

    setConfigCallback(objName, callback) {
        this.configCallbacks[objName] = callback;
    }

    executeConfigCallback(objName, position) {
        var ele = '[obj-name="' + objName + '"]';
        var cellName = $(ele).children().eq(1).attr('obj-name');
        console.log("Cellname = " + cellName);
        let callback = this.configCallbacks[cellName];
        console.log("callback = " + callback);
        callback(cellName, position);
    }

    resetContext(objName) {
        var parent = this;
        objName.children().each(function () {
            let currName = $(this).attr("obj-name");
            let currId = $(this).attr("id");

            if( currName != undefined ) {
                $(this).attr("obj-name", parent.objectNameMap[currId]);
            }
        });
    }

    removeAllCells(objName) {
        var parent = this;
        let ele = '[obj-name="' + objName + '"]';
        $(ele).children().each(function (i) {
            if( i > 1 ) {
                $(this).remove();    
            }
        });
        parent.objectNameMap = {};
    }

    scrollTo (objName,cellNum,animated) {
        let ele = '[obj-name="' + objName + '"]';
        let scrollSpeed = 500;
        if (!animated) {
            scrollSpeed = 0;
        }
        $(ele).animate({
            scrollTop: $(ele).find(".ListViewCell:nth-child("+cellNum+")" ).offset().top}
        ,scrollSpeed);
    }

    isCellVisible (objName,cellNum) {
        let ele = '[obj-name="' + objName + '"]';
        let cell = $(ele).find(".ListViewCell:nth-child("+cellNum+")" );
        let contHeight = $(ele).height();
        let contTop = $(ele).scrollTop();
        let contBottom = contTop + contHeight;
        let elemTop = cell.offset().top - $(ele).offset().top;
        let elemBottom = elemTop + cell.height();

        return elemTop >= 0 && elemBottom <=contHeight;
    }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (ListViewObject);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* Location Module
** Created by Harish Shanthi Kumar on 18/14/2017
*/
class LocationObject {
  
  	constructor() {
  		this.watchID = null;
  	}

	locationCreate (lat,lng) {
	  var locationObj = {lat: lat, lng: lng};
	  return locationObj;
	}

	locationCreateFull(lat, lng, altitude, speed) {
	  var locationObj = {lat: lat, lng: lng, altitude: altitude, speed: speed};
	  return locationObj;
	}

	locationCreateHere() {
		var locationObj = {lat: 0.0, lng: 0.0};
		return locationObj;
	}

	locationGetLatitude(loc) {
		return loc.lat;
	}

	locationGetLongitude(loc) {
		return loc.lng;
	}

	locationGetAltitude(loc) {
		return loc.altitude;
	}

	locationGetSpeed(loc) {
		return loc.speed;
	}

	locationGetDistance(loc1, loc2) {
	  var p = 0.017453292519943295;    // Math.PI / 180
	  var c = Math.cos;
	  var a = 0.5 - c((loc2.lat - loc1.lat) * p)/2 + 
	          c(loc1.lat * p) * c(loc2.lat * p) * 
	          (1 - c((loc2.lng - loc1.lng) * p))/2;
	  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
	}

	createLocationFromText(text, successCallback, errorCallback) {
		console.log ("createLocationFromText " + text);
		var locationArr = text.split(",");
		if( locationArr.length == 2 ) {
			console.log (locationArr);
			var latitude = locationArr[0];
			var longitude = locationArr[1];
			var locationObj = {lat: latitude, lng: longitude};
			successCallback (locationObj);
		}
		else {
			errorCallback ("Invalid Location");
		}
	}

	locationStartTrack(precision, successCallback) {
		var locCallback = function(position) {
			var locationObj = {lat: position.coords.latitude, lng: position.coords.longitude};
			successCallback(locationObj);
		}
		this.watchID = navigator.geolocation.watchPosition(locCallback);
	}

	locationStopTrack() {
		navigator.geolocation.clearWatch(this.watchID);
	}

	locationCheckGPS() {
		return navigator.geolocation;
	}
}

/* harmony default export */ __webpack_exports__["a"] = (LocationObject);



/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);


class MapViewObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {
  
  constructor() {
    super(' map view');
    const self = this;
    this.maps = [];
    this.markers = [];
    this.getProperty = Object.assign(this.getProperty, {
            'API key': (objName) => {
                return this.getGraphElemFromName(objName)[0].getAttribute('google-map-api-key');
            },
            'Show User Location': (objName) => {
                return this.getGraphElemFromName(objName)[0].getAttribute('show-user-location');
            }
        });
        this.setProperty = Object.assign(this.setProperty, {
            'API key': (objName, value) => {
                this.getGraphElemFromName(objName).attr('google-map-api-key', value);
            },
            'Show User Location': (objName, value) => {
                this.getGraphElemFromName(objName).attr('show-user-location', value);
            }
        });
  }

  reset() {
   
  }

  mapViewSetZoom(mapName, zoom) {
    return this.maps[mapName].setZoom(zoom);
  }

  toggleMapUserInteraction(mapName, interaction) {
    var options = {
      draggable: false,
      scrollwheel: false,
      panControl: false,
      zoom: this.maps[mapName].getZoom(),
    };
    if (interaction) {
      var options = {
        draggable: true,
        scrollwheel: true,
        panControl: true,
        zoom: this.maps[mapName].getZoom(),
      };
    }
    var newOptions = this.maps[mapName].setOptions(options);
    return newOptions;
  }

  createMarkerWithImage(image, label) {
    var marker = {};
    var ref = new google.maps.Marker({ title: label, icon: image });
    marker.ref = ref;
    this.markers.push(marker);
    return marker;
  }

  setLocationForMarker(marker, location) {
    var latlng = new google.maps.LatLng(location.lat, location.lng);
    marker.ref.setPosition(latlng);
  }

  addMarkerToMap(mapName, marker) {
    marker.mapName = mapName;
    marker.ref.setMap(this.maps[mapName]);
    this.centerMarkers(mapName);
  }

  setMarkerLabel(text, marker) {
    return marker.ref.setTitle(text);
  }

  setMarkerImage(image, marker) {
    return marker.ref.setIcon(image);
  }

  removeMarker(marker) {
    marker.ref.setMap(null);
    var index = this.markers.indexOf(marker);
    if (index >= 0) {
      this.markers.splice( index, 1 );
    }
    this.centerMarkers(marker.mapName);
  }

  mapViewSetLocation(mapName, location, animation) {
    var latlng = new google.maps.LatLng(location.lat, location.lng);
    this.maps[mapName].setCenter(latlng);
  }

  centerMarkers(mapName) {
    var bounds = new google.maps.LatLngBounds();
    for(var i=0; i<this.markers.length; i++) {
      bounds.extend(this.markers[i].ref.getPosition());
    }

    this.maps[mapName].setCenter(bounds.getCenter());
    this.maps[mapName].fitBounds(bounds);
    this.maps[mapName].setZoom(this.maps[mapName].getZoom()-1);
  }

  MapException(snappMessage, msg) {
    this.name = "MapException";
    this.snappMessage = snappMessage;
    //custom message from snapp.
    this.message = msg || snappMessage;
    this.stack = (new Error()).stack;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MapViewObject);




/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ES6 imports

class NetworkObject {

  constructor() {}

  createHTTPRequest (url, method) {
    let request = {};
    let protocol = url.split(':')[0];
    if( (method === 'GET' || method === 'POST' || method === 'PUT' || method === 'DELETE') &&
        (protocol === 'http' || protocol === 'https') ) {
      request.url = url;
      request.method = method;
      request.headers = {};
      request.data = {};
      return request;
    }
    else {
      this.HTTPUnsupportedRequest("We support basic http/https operations.<br>Request type can be one of GET/POST/PUT or DELETE");
      return request;
    }
  }

  addHTTPHeader (request, key , value) {
    request.headers[key] = value;
  }

  addHTTPParams (request, key, value) {
    request.data[key] = value;
  }

  setHTTPBody (request, body) {
    if( typeof body == 'object' ) {
      request.data = JSON.stringify(body);
    }
    else if (typeof body == 'string') {
      request.data = body;
    }
    else {
      request.data = "";
      throw new IllegalArgumentException("Body can be currently only of type string or json");
    }
  }

  setDataType (request, type) {
    request.dataType = type;
  }

  setProxyState (request, state) {
    request.proxy = state;
  }

  sendHTTPRequest (request, successcallback, failurecallback) {
    // let url = this.getSanitizedURL(request); // use to use the proxy
    let url = request.url;
    let method = request.method;
    let data = request.data;
    let dataType = request.dataType;
    let headers = request.headers;
    let parent = this;

    $.ajax(
      {
        url: url,
        type: method,
        headers: headers,
        dataType: dataType,
        data: data,
        success: function (response) {
          successcallback(response);
        },
        error: function(xhr, code, msg) {
          failurecallback(code + ': '+ msg);
        }
      });
  }

  getSanitizedURL (request) {
    let proxyUrl = "https://iot.snapp.click:8443/"; // backup 1337
    let isProxyRequired = true; //default is proxy required
    let url = request.url;

    if( (request.proxy != undefined) && (request.proxy === false) ) {
      isProxyRequired = false;
    }

    let sanitizedUrl = url;
    if (isProxyRequired) {
      // url = url.replace(/^.+:\/\//, ""); //Removes all possible protocols - NOTE: not needed with the latest proxy implementation
      sanitizedUrl = proxyUrl + url;
      return sanitizedUrl;
    } else {
      return url;
    }
  }

  //Define custom exceptions pertaining to network module here.

  HTTPUnsupportedRequest (msg) {
    let error = new Error(msg);
    error.name = 'HTTPUnsupportedRequest';
    //error.snappMessage = "something?";
    throw error;
  }

  //Define custom exceptions pertaining to network module here.
  HTTPNetworkException (msg) {
    let error = new Error(msg);
    error.name = 'HTTPNetworkException';
    //error.snappMessage = "something?";
    throw error;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (NetworkObject);


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
/**
 * Created by Luca Latini on 27/03/17.
 */

// ES6 imports


class ScreenObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor(elemSelectorRef) {
        super();
        const self = this;
        $(document).ready(function() {
            setTimeout( function() {
                let firstScreen = $('.element.fc.Screen:visible');
                let object_name = firstScreen[0].getAttribute('obj-name');
                let callbackScreen = 'show' + object_name;
                if (self.screenDict[callbackScreen]) {
                    history.pushState({'view': `${object_name}`}, `${object_name}`, `${object_name}`);
                    self.screenDict[callbackScreen]();
                }
            }, 500);
        });

        // Element selector
        this.elemSelectorRef = elemSelectorRef || '';

        // Getting Text properties values

        this.getProperty = Object.assign(this.getProperty, {
            'Background image': (objName) => {
                let img = new Image();
                img.src = this.getScreenElemFromName(objName).css('background-image');
                return img;
            },
            x: (objName) => { return 0; }, // some properties of the base-object has been overwritten because
            y: (objName) => { return 0; }  // html5 must have the same behaviour of the android and ios platforms
        });

        this.setProperty = Object.assign(this.setProperty, {
            'Background color': (objName, value) => {
                this.getScreenElemFromName(objName).css({
                    'background-color': value,
                    'background-image': '',
                    'background-size': '',
                    'background-repeat': ''
                });
            },
            'Background image': (objName, image) => {
                 this.getScreenElemFromName(objName).css({
                    'background-image': "url('" + image.src + "')",
                    'background-size': 'contain',
                    'background-color': '',
                    'background-repeat': 'no-repeat'
                });
            },
            width: (objName, value) => {},
            height: (objName, value) => {},
            x: (objName, value) => {},
            y: (objName, value) => {},

            'Loader Visible':(objName, value) => {
                var ele = this.getScreenElemFromName(objName);
                if (value) {
                    var overlayColor = $(ele).attr("overlay-color");
                    var spinnerUrl = $(ele).attr("spinner-url");
                    $(ele).append("<div class = 'spinner-overlay' style = 'background:"+overlayColor+";position:absolute;top:0;left:0;width:100%;height:100%;text-align:center;z-index:1;'><img src = '"+spinnerUrl+"' style = 'position: relative;top: 50%;transform: translateY(-50%);'/></div>");
                } else {
                    $(ele).find(".spinner-overlay").remove();
                }
            }
        });

        this.screenDict = {};
    };

    /**
     * Retrieves the screen element with a given object-name attribute
     * @param objName
     * @returns {*|jQuery|HTMLElement}
     */
    getScreenElemFromName (objName) {
        return $('[obj-name= "' + objName + '"]' + this.elemSelectorRef);
    }

    init ( elemSelectorRefValue) {
        this.elemSelectorRef = elemSelectorRefValue;
    };

    screenPopInit () {
        const self = this.screenDict;
        window.addEventListener('popstate', function (e) {
            let currentScreen = $('.HTML5-deploy-wrapper .Screen:visible');
            let currentScreenName = currentScreen[0].getAttribute('obj-name');
            let callbackScreen =  'back' + currentScreenName;
               if (self[callbackScreen]) {
                   history.pushState({'view': currentScreenName}, currentScreenName, currentScreenName);
                   self[callbackScreen]();
              }  else {
                  currentScreen.hide();
                  $('[obj-name="' + e.state.view + '"]').show();
                }
        });
    };

    screenOrientationInit () {
        const self = this.screenDict;
        window.addEventListener( 'orientationchange', function( e ) {
            let currentScreen = $('.HTML5-deploy-wrapper .Screen:visible');
            let currentScreenName = currentScreen[0].getAttribute('obj-name');
            let callbackScreen = 'orientation' + currentScreenName;
            if (self[callbackScreen]) {
                let getOrientation = '';
                switch(window.orientation) {
                    case -90:
                    case 90:
                        getOrientation = 'landscape';
                        break;
                    default:
                        getOrientation = 'portrait';
                        break;
                }
                self[callbackScreen](getOrientation);
            }
        });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ScreenObject);



/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(1);
// ES6 imports


class SliderObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */] {

    constructor() {
        super('.Slider');

        var self = this;

        $(document).ready(function() {
            $('.element.fc.Slider').each(function (obj) {
                var ele = $(this).find("#fcSlider")[0];
                $(this).find('.range-bar').remove();
                new Powerange(ele, {
                    'hideRange': true,
                    'min':$(ele).attr("min"),
                    'max':$(ele).attr("max"),
                    'start':$(ele).attr("curpos")
                });
                var sliderpos = ($(ele).attr("curpos")/$(ele).attr("max"))*100;
                $(this).find(".range-bar").find(".range-quantity").css('width',sliderpos+'%');
                $(this).find(".range-bar").find(".range-handle").css('left',sliderpos+'%');
                $(this).find("#fcSlider").attr('value',sliderpos);

                //Track
                $(this).find(".range-bar").css("background-color", $(ele).attr("track-color"));
                $(this).find(".range-quantity").css("background-color", $(ele).attr("selection-color"));

                //Left & right icons
                if ($(ele).attr("left-icon")) {
                    $(this).find(".range-min").css({
                        "background-image": "url(" + $(ele).attr("left-icon") + ")"
                    });
                }
                if ($(ele).attr("right-icon")) {
                    $(this).find(".range-max").css({
                        "background-image": "url(" + $(ele).attr("right-icon") + ")"
                    });
                }
                if ($(ele).attr("thumb-icon")) {
                    $(this).find(".range-handle").addClass("custom");
                    $(this).find(".range-handle").css({
                        "background-image": "url(" + $(ele).attr("thumb-icon") + ")"
                    });
                }

                //BG and selection images
                if ($(ele).attr("bg-image")) {
                    $(this).find(".range-bar").css({
                        "background-image": "url(" + $(ele).attr("bg-image") + ")"
                    });
                }
                if ($(ele).attr("selection-image")) {
                    $(this).find(".range-quantity").css({
                        "background-image": "url(" + $(ele).attr("selection-image") + ")"
                    });   
                }
            });
        });

        this.getProperty = Object.assign(this.getProperty, {
            'Current value': (objName) => {
                var ele = '[obj-name= "' + objName + '"]';
                return $(ele).find("#fcSlider").attr("curpos");
            },
            'Minimum value': (objName) => {
                var ele = '[obj-name= "' + objName + '"]';
                return $(ele).find("#fcSlider").attr("min");
            },
            'Maximum value': (objName) => {
                var ele = '[obj-name= "' + objName + '"]';
                return $(ele).find("#fcSlider").attr("max");
            },
            'Left icon': (objName) => {
                var ele = '[obj-name= "' + objName + '"]';
                return $(ele).find(".range-min").css("background-image");
            },
            'Right icon': (objName) => {
                var ele = '[obj-name= "' + objName + '"]';
                return $(ele).find(".range-max").css("background-image");
            },
            'Thumb icon': (objName) => {
                var ele = '[obj-name= "' + objName + '"]';
                return $(ele).find(".range-handle").css("background-image");
            },
            'Background color': (objName) => {
                var ele = '[obj-name= "' + objName + '"]';
                return $(ele).find(".range-bar").css("background-color");
            },
            'Selection color': (objName) => {
                var ele = '[obj-name= "' + objName + '"]';
                return $(ele).find(".range-quantity").css("background-color");
            },
            'Background image': (objName) => {
                var ele = '[obj-name= "' + objName + '"]';
                return $(ele).find(".range-bar").css("background-image");
            },
            'Selection image': (objName) => {
                var ele = '[obj-name= "' + objName + '"]';
                return $(ele).find(".range-quantity").css("background-image");
            },
        });
        this.setProperty = Object.assign(this.setProperty, {
            'Current value': (objName, value) => {
               var ele = '[obj-name= "' + objName + '"]';
               var max = $(ele).find("#fcSlider").attr("max");
               var currval = (value/max)*100;
               $(ele).find(".range-bar").find(".range-quantity").css('width',currval+'%');
               $(ele).find(".range-bar").find(".range-handle").css('left',currval+'%');
               //$(ele).find("#fcSlider").val(value).trigger('change');
                $(ele).find("#fcSlider").attr('curpos',value);
            },
            'Minimum value': (objName,value) => {
                var ele = '[obj-name= "' + objName + '"]';
                $(ele).find("#fcSlider").attr("min",value);
            },
            'Maximum value': (objName,value) => {
                var ele = '[obj-name= "' + objName + '"]';
                $(ele).find("#fcSlider").attr("max",value);
            },
            'Left icon': (objName,value) => {
                var ele = '[obj-name= "' + objName + '"]';
                $(ele).find(".range-min").css({
                    "background-image": "url(" + $(value).attr('src') + ")"
                });
            },
            'Right icon': (objName,value) => {
                var ele = '[obj-name= "' + objName + '"]';
                $(ele).find(".range-max").css({
                    "background-image": "url(" + $(value).attr('src') + ")"
                });
            },
            'Thumb icon': (objName,value) => {
                var ele = '[obj-name= "' + objName + '"]';
                $(ele).find(".range-handle").addClass("custom");
                $(ele).find(".range-handle").css({
                    "background-image": "url(" + $(value).attr('src') + ")",
                    "background-color":"transparent",
                    "border-radius":0,
                    "background-size":"contain",
                    "background-repeat":"no-repeat",
                    "background-position":"center center",
                    "box-shadow":"none"
                });
            },
            'Background color': (objName,value) => {
                var ele = '[obj-name= "' + objName + '"]';
                $(ele).find(".range-bar").css("background-color", value);
            },
            'Selection color': (objName,value) => {
                var ele = '[obj-name= "' + objName + '"]';
                $(ele).find(".range-quantity").css("background-color", value);
            },
            'Background image': (objName,value) => {
                var ele = '[obj-name= "' + objName + '"]';
                $(ele).find(".range-bar").css({
                    "background-image": "url(" + $(value).attr('src') + ")"
                });
            },
            'Selection image': (objName,value) => {
                var ele = '[obj-name= "' + objName + '"]';
                $(ele).find(".range-quantity").css({
                    "background-image": "url(" + $(value).attr('src') + ")"
                });
            },
        });

    };
};

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (SliderObject);

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_snapClinical_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__libs_snapClinical_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__libs_snapClinical_js__);
/* Stub for connio object
** Created by Harish Shanthi Kumar on 16/12/2016
*/


class SnappClinicalObject {
    constructor() {
        this.config = {
            baseUrl: '',
            username: '',
            password: '',
            userid: ''
        };

        this.devices = {};
        this._characteristics = new Map();
    }

    configure(config) {

        let properties;
        if (config) {
            properties = JSON.parse(config);
        }
        else if (!this.config.BaseURL) {
            let snappClinicalSO = Creator.currentProject.serviceModel.getServiceObject('SnappClinical');
            properties = snappClinicalSO.attributes.attrs;
        }
        if (properties) {
          let baseUrl = properties.api.url;
          if(baseUrl){
            this.config.baseUrl = properties.api.url;
          }else{
            this.config.baseUrl =  'https://staging.snapclinical.net:8443';
          }
            this.config.username = properties.api.username;
            this.config.password = properties.api.password;
            this.config.userid = properties.api.userid;
        }
    }

  configureDevices(deviceFoundCallback, deviceDisconnectedCallback, deviceDataChangedCallback) {
    this.deviceFoundCallback = deviceFoundCallback;
    this.deviceDisconnectedCallback = deviceDisconnectedCallback;
    this.deviceDataChangedCallback = deviceDataChangedCallback;
  }

  snappClinicalConfigure(username, password, userid, frontEndKey, baseUrl){
    //this.configure();
    this.config.username = username;
    this.config.password = password;
    this.config.userid = userid;
    this.config.baseUrl = baseUrl;
    // client.apiBaseUrl = 'https://staging.snapclinical.net:8443';
    const user = new __WEBPACK_IMPORTED_MODULE_0__libs_snapClinical_js__["User"]();
    user.accountName = username;
    user.password = password;
    __WEBPACK_IMPORTED_MODULE_0__libs_snapClinical_js__["client"].personalId = userid;
    __WEBPACK_IMPORTED_MODULE_0__libs_snapClinical_js__["client"].frontEndKey = frontEndKey;
    __WEBPACK_IMPORTED_MODULE_0__libs_snapClinical_js__["client"].apiBaseUrl = baseUrl;
  }

  async snappClinicalcreateNewInstanceAndGetFirstTask(processDefKey, qualifier, successcallback, failurecallback) {
    console.log("snappClinicalcreateNewInstanceAndGetFirstTask");

    let parent = this;
    let taskData;
    try {
      taskData = await __WEBPACK_IMPORTED_MODULE_0__libs_snapClinical_js__["flowService"].createNewInstanceAndGetFirstTask(processDefKey, qualifier);
      console.log('snappClinicalcreateNewInstanceAndGetFirstTask variables', taskData.variables);
      console.log('snappClinicalcreateNewInstanceAndGetFirstTask fields', taskData.fields);
      console.log('snappClinicalcreateNewInstanceAndGetFirstTask outcomes', taskData.outcomes);
    }
    catch(e) {
      console.log('Error in createNewInstanceAndGetFirstTask');
      console.log(e);
      failurecallback(e);
      return;
    }
    let vars, flds, outcms;
    vars = flds = outcms = [];

    if (taskData) {
      vars = taskData.variables;
      flds = taskData.fields;
      outcms = taskData.outcomes;
    }
    successcallback(vars, flds, outcms);
  }

  async snappClinicalGetNextTaskOnProcess(processDefKey, successcallback, failurecallback) {
    console.log("snappClinicalGetNextTaskOnProcess");
    let parent = this;
    let taskData;
    try {
      taskData = await __WEBPACK_IMPORTED_MODULE_0__libs_snapClinical_js__["flowService"].getNextTask(processDefKey, []);
      console.log('snappClinicalGetNextTaskOnProcess variables', taskData.variables);
      console.log('snappClinicalGetNextTaskOnProcess fields', taskData.fields);
      console.log('snappClinicalGetNextTaskOnProcess outcomes', taskData.outcomes);
    }
    catch(e) {
      console.log('Error in GetNextTaskOnProces');
      console.log(e);
      failurecallback(e);
      return;
    }
    let vars, flds, outcms;
    vars = flds = outcms = [];

    if (taskData) {
      vars = taskData.variables;
      flds = taskData.fields;
      outcms = taskData.outcomes;
    }
    successcallback(vars, flds, outcms);
  }

  async snappClinicalSaveTaskVariables(variables, fields, outcomes, successcallback, failurecallback) {
    console.log("snappClinicalSaveTaskVariables");
    let parent = this;
    try {
      await __WEBPACK_IMPORTED_MODULE_0__libs_snapClinical_js__["flowService"].saveVariables(variables, fields || [], outcomes);
    }
    catch(e) {
      console.log('Error in SaveTaskVariables');
      console.log(e);
      failurecallback(e);
      return;
    }
    successcallback();
  }

  async snappClinicalMoveToNextTask(successcallback, failurecallback) {
    console.log("snappClinicalMoveToNextTask");
    let parent = this;
    let taskData;
    try {
      taskData = await __WEBPACK_IMPORTED_MODULE_0__libs_snapClinical_js__["flowService"].moveToNextTask();
      console.log("snappClinicalMoveToNextTask::got response");
      if( taskData != null ) {
          console.log('snappClinicalMoveToNextTask variables' ,taskData.variables);
          console.log('snappClinicalMoveToNextTask fields' ,taskData.fields);
          console.log('snappClinicalMoveToNextTask outcomes', taskData.outcomes);
      }
      else {
          console.log('snappClinicalMoveToNextTask NULL, this means the flow process ends.');
      }
    }
    catch(e) {
      console.log('Error in MoveToNextTask');
      console.log(e);
      failurecallback(e);
      return;
    }
    let vars, flds, outcms;
    vars = flds = outcms = [];

    if (taskData) {
      vars = taskData.variables;
      flds = taskData.fields;
      outcms = taskData.outcomes;
    }
    successcallback(vars, flds, outcms);
  }

  startDiscovery(deviceType, timeout) {
    let parent = this;
    return navigator.bluetooth.requestDevice({filters:[{services:[ deviceType ]}]})
    .then(device => {
      device.type = deviceType;
      parent.devices[device.id] = device;
      parent.deviceFoundCallback(device.id);
    });
  }

  stopDiscovery() {
  }

  getDeviceNameForAddress(address) {
    if( this.devices[address] != undefined ) {
      return this.devices[address].name;  
    }
    else {
      return "";
    }
    
  }


  startDiscovery(deviceType, timeout) {
    let parent = this;
    return navigator.bluetooth.requestDevice({filters:[{services:[ deviceType ]}]})
    .then(device => {
      device.type = deviceType;
      parent.devices[device.id] = device;
      parent.deviceFoundCallback(device.id);
    });
  }

  stopDiscovery() {
  
  }

  getDeviceNameForAddress(address) {
    if( this.devices[address] != undefined ) {
      return this.devices[address].name;  
    }
    else {
      return "";
    }
    
  }

  connectToDevice(address, successcallback, failurecallback) {
    let device = this.devices[address];
    let parent = this;
    device.gatt.connect()
      .then(server => server.getPrimaryService('heart_rate'))
      .then(service => service.getCharacteristic('heart_rate_measurement'))
      .then(characteristic => characteristic.startNotifications())
      .then(characteristic => {
        characteristic.addEventListener('characteristicvaluechanged',
                                  event => {
          var parsedHRData = parent._parseHeartRate(event.target.value);
          parent.deviceDataChangedCallback(address, parsedHRData.heartRate);
          console.log(parsedHRData.heartRate);
        });
        console.log('Notifications have been started.');
        successcallback();
      })
      .catch(error => { 
        console.log(error);
        failurecallback();
      });
  }

  disconnectFromDevice(address) {

  }

  readDataFromDevice(address, successcallback, failurecallback) {

  }

  _parseHeartRate(value) {
    // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
    value = value.buffer ? value : new DataView(value);
    let flags = value.getUint8(0);
    console.log(flags);
    let rate16Bits = flags & 0x1;
    let result = {};
    let index = 1;
    if (rate16Bits) {
      result.heartRate = value.getUint16(index, /*littleEndian=*/true);
      index += 2;
    } else {
      result.heartRate = value.getUint8(index);
      index += 1;
    }
    let contactDetected = flags & 0x2;
    let contactSensorPresent = flags & 0x4;
    if (contactSensorPresent) {
      result.contactDetected = !!contactDetected;
    }
    let energyPresent = flags & 0x8;
    if (energyPresent) {
      result.energyExpended = value.getUint16(index, /*littleEndian=*/true);
      index += 2;
    }
    let rrIntervalPresent = flags & 0x10;
    if (rrIntervalPresent) {
      let rrIntervals = [];
      for (; index + 1 < value.byteLength; index += 2) {
        rrIntervals.push(value.getUint16(index, /*littleEndian=*/true));
      }
      result.rrIntervals = rrIntervals;
    }
    return result;
  }

  _cacheCharacteristic(service, characteristicUuid) {
    return service.getCharacteristic(characteristicUuid)
    .then(characteristic => {
      this._characteristics.set(characteristicUuid, characteristic);
    });
  }
  
  _readCharacteristicValue(characteristicUuid) {
    let characteristic = this._characteristics.get(characteristicUuid);
    return characteristic.readValue()
    .then(value => {
      // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
      value = value.buffer ? value : new DataView(value);
      return value;
    });
  }

  _writeCharacteristicValue(characteristicUuid, value) {
    let characteristic = this._characteristics.get(characteristicUuid);
    return characteristic.writeValue(value);
  }
  
  _startNotifications(characteristicUuid, callback) {
    let parent = this;
    let characteristic = this._characteristics.get(characteristicUuid);
    characteristic.startNotifications()
      .then(characteristic => {
        characteristic.addEventListener('characteristicvaluechanged', event => {
          var parsedHRData = parent._parseHeartRate(event.target.value);
          callback(parsedHRData);
        });
    }); 
  }

  _stopNotifications(characteristicUuid) {
    let characteristic = this._characteristics.get(characteristicUuid);
    // Returns characteristic to remove characteristicvaluechanged event
    // handlers in the resolved promise.
    return characteristic.stopNotifications()
    .then(() => characteristic);
  }

  _handleCharacteristicValueChanged(event) {
    var value = event.target.value;
    console.log('Received ' + value);
    var parsedHRData = this._parseHeartRate(value);
    this.deviceDataChangedCallback(parsedHRData);
  }



}
// export class to a global variable for use of the JavaScriptDistLib (only)
var com = com || {};
com.fc = com.fc || {};
com.fc.JavaScriptDistLib = com.fc.JavaScriptDistLib || {};
com.fc.JavaScriptDistLib.SnappCinical = SnappClinicalObject;
// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (SnappClinicalObject);

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ES6 imports

class StorageObject {

  constructor() {}

  add (key,value) {
    return localStorage.setItem(key,value);
  }

  remove (key) {
    return localStorage.removeItem(key);
  }

  clear (key) {
    return localStorage.clear();
  }

  getValue (key) {
    return localStorage.getItem(key);
  }

  getAllKeys () {
    return Object.keys(localStorage);
  }

  //Define custom exceptions pertaining to storage module here.
}

/* harmony default export */ __webpack_exports__["a"] = (StorageObject);


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__ = __webpack_require__(1);
// ES6 imports


class TextboxObject extends __WEBPACK_IMPORTED_MODULE_0__text_object_text_object_module_js__["a" /* default */] {

    constructor() {
        super(' input.textView');
        var self = this;
        this.getProperty = Object.assign(this.getProperty, {
            Text: (objName) => {
               return this.getElemFromName(objName).find('input.textView').val();
            },
            'Max chars': (objName) => {
                return this.getElemFromName(objName).find('input.textView').attr('maxlength');
            },
            'Password chars': (objName) => {
                let type = this.getElemFromName(objName).find('input.textView').attr('type');
                if (type == 'password') {
                    return true;
                }
                return false;
            },
            'Enabled': (objName) => {
                let result = this.getElemFromName(objName).find('input.textView').attr('disabled');
                return !result;
            },
            'Input type': (objName) => {
                return this.getElemFromName(objName).find('input.textView').attr('type');
            },
            'Border color': (objName) => {
                this.getElemFromName(objName).find('input.textView').css('border-color');
            },
            'Border Type': (objName) => {
                this.getElemFromName(objName).find('input.textView').css('box-shadow');
            }
        });
        this.setProperty = Object.assign(this.setProperty, {
            Text: (objName, value) => {
                this.getElemFromName(objName).find('input.textView').val(value);
            },
            'Max chars': (objName,value) => {
                this.getElemFromName(objName).find('input.textView').attr('maxlength',value);
            },
            'Password chars': (objName,value) => {
                let type = "text";
                if (value) {
                    type = "password";
                }
                this.getElemFromName(objName).find('input.textView').attr('type',type);
            },
            'Enabled': (objName,value) => {
                this.getElemFromName(objName).find('input.textView').attr('disabled',!value);
            },
            'Input type': (objName,value) => {
                var inputType = "text";
                switch (value) {
                    case "numeric":
                        inputType = "number";
                    break;
                    case "email":
                        inputType = "email";
                    break;
                }
                this.getElemFromName(objName).find('input.textView').attr('type',inputType);
            },
            'Border color': (objName,value) => {
                this.getElemFromName(objName).find('input.textView').css('border-color',value);
            },

            'Border Type': (objName,value) => {                
                let borderColor = this.getElemFromName(objName).find('input.textView').css("border-color");
                if (value == "raised") {
                    this.getElemFromName(objName).find('input.textView').css({
                        "box-shadow":"2px 5px 20px "+borderColor
                    });
                } else if (value == "sunken") {
                    this.getElemFromName(objName).find('input.textView').css({
                        "box-shadow":"inset 2px 5px 20px "+borderColor
                    });
                } else {
                    this.getElemFromName(objName).find('input.textView').css({
                        "box-shadow":"none"
                    });
                }
            }
            
        });

    };
};

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (TextboxObject);

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
// ES6 imports


class VideoObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor() {
        super('');

        var self = this;

        this.setProperty = Object.assign(this.setProperty, {
            'Video': (objName, value) => {
                console.log (value);
                let elemSelector = '[obj-name="' + objName + '"]';
                $(elemSelector).html(value);
            },
        });

    }

    getElemFromObj(objName) {
        let elemSelector = '[obj-name="' + objName + '"]';
        let elem = $(elemSelector).find('video');
        console.log (elem);
        return elem;
    }
    play (objName) {
        let elem = this.getElemFromObj(objName);
        $(elem).get(0).play();
    }

    pause (objName) {
        let elem = this.getElemFromObj(objName);
        $(elem).get(0).pause();  
    }

    stop (objName) {
        let elem = this.getElemFromObj(objName);
        $(elem).get(0).pause();
        $(elem).get(0).currentTime = 0;
    }

    getElapsedTime (objName) {
        let elem = this.getElemFromObj(objName);
        return $(elem).get(0).currentTime;
    }

    getVolume (objName) {
        let elem = this.getElemFromObj(objName);
        return $(elem).get(0).volume;   
    }

    setVolume (objName,vol) {
        let elem = this.getElemFromObj(objName);
        return $(elem).get(0).volume = vol; 
    }

    playFromPosition (objName,pos) {
        let elem = this.getElemFromObj(objName);
        $(elem).get(0).currentTime = pos;
        $(elem).get(0).play();
    }

    skipToPosition (objName,pos) {
        let elem = this.getElemFromObj(objName);
        $(elem).get(0).currentTime = pos;
    }

}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (VideoObject);



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__ = __webpack_require__(0);
// ES6 imports


class WebViewObject extends __WEBPACK_IMPORTED_MODULE_0__base_object_base_object_module_js__["a" /* default */] {

    constructor() {
        super(' web view');

        var self = this;

        this.setProperty['URL'] = function(objName, value) {
            let elem =  $('[obj-name= "' + objName + '"]');
            $(elem).find('iframe').attr('src',value);        
        };

        this.getProperty['URL'] = function(objName) {
            let elem =  $('[obj-name= "' + objName + '"]');
            return $(elem).find('iframe').attr('src');        
        };
    }

    refresh (objName) {
        let elem =  $('[obj-name= "' + objName + '"]');
        let url = $(elem).find('iframe').attr('src');
        $(elem).find('iframe').attr('src',url);
    }


    WebViewException(msg) {
      let error = new Error(msg);
      error.name = "WebViewException";
      throw error;
    }
}

// ES6 exports
/* harmony default export */ __webpack_exports__["a"] = (WebViewObject);



/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("snapClinical", [], factory);
	else if(typeof exports === 'object')
		exports["snapClinical"] = factory();
	else
		root["snapClinical"] = factory();
})(this, function() {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return client; });
/**
 * Client is the base class that is used for setting system wide information about
 * connection, device, and general SDK settings.
 */
class Client {

    /**
     * Constructor
     *
     */
    constructor() {
        this._config = {
            apiBaseUrl: undefined,
            basicCredentials: undefined,
            personalId: undefined,
            frontEndKey: undefined
        };
    }

    /**
     * Gets the apiBaseUrl
     *
     * @type {string} - Current apiBaseUrl - the base url for api client requests
     */
    get apiBaseUrl() {
        return this._config.apiBaseUrl;
    }

    /**
     * Sets the apiBaseUrl
     *
     * @param {string} url
     */
    set apiBaseUrl(url) {
        let data = url;
        if (typeof data !== 'string') {
            throw new Error('Error : apiBaseUrl must be a string');
        }
        if (data[data.length - 1] === '/') {
            data = data.slice(0, -1);
        }
        this._config.apiBaseUrl = data;
    }

    /**
     * Gets the basicCredentials - the credential string for Basic Authentication
     *
     * @type {string} - Current apiBaseUrl
     */
    get basicCredentials() {
        return this._config.basicCredentials;
    }

    /**
     * Sets the basicCredentials
     *
     * @param {string} credentials
     */
    set basicCredentials(credentials) {
        this._config.basicCredentials = credentials;
    }

    /**
    * Gets the configuration information
    *
    * @type {Object} - the information in a key value object
    * @property {String} config.apiBaseUrl - url
    * @property {String} config.basicCredentials - the credential string for Basic Authentication
    */
    get config() {
        return this._config;
    }

    /**
     * Sets the configuration for Clinical6
     *
     * @param {Object} data - the information in a key value object
     * @property {String} config.apiBaseUrl - url
     * @property {String} config.basicAuthentication - the credential string for Basic Authentication
     */
    set config(data) {
        Object.assign(this._config, data);
    }

    /**
     * Gets the personalId
     *
     * @type {Object} - Current personalId
     */
    get personalId() {
      return this._config.personalId;
    }

    /**
     * Sets the personalId
     *
     * @param {Object} personalId
     */
    set personalId(personalId) {
      this._config.personalId = personalId;
    }

    /**
     * Gets the frontEndKey
     *
     * @type {Object} - Current frontEndKey
     */
    get frontEndKey() {
      return this._config.frontEndKey;
    }

    /**
     * Sets the frontEndKey
     *
     * @param {Object} frontEndKey
     */
    set frontEndKey(frontEndKey) {
      this._config.frontEndKey = frontEndKey;
    }

  /**
     * Send HTTP request to API
     *
     * @param {!String} url       - Path to the endpoint starting with '/'
     * @param {?String} [method]  - HTTP Method (DELETE|GET|POST|PUT)
     * @param {?Object} [params]  - Key/Value list of url parameters
     * @param {?Object} [body]    - a Blob, BufferSource, FormData, URLSearchParams, or USVString object
     *                              In case of a json body, this can be created with something like:
     *                              new Blob(body, {type : 'application/json'});
     * @param {?Object} [headers] - Key/Value list of headers. If not present it default to `{
     *                                'Accept' : 'application/json',
     *                              }`
     * @return {Promise}          - Resolves on HTTP 200. Rejects on all else.
     */
    async fetch(url, method = 'GET', params = {}, body = undefined, headers) {

        // Determine if method is valid
        if ((['POST', 'PUT', 'PATCH'].indexOf(method.toUpperCase()) !== -1) && !body) {
            throw new Error('fetch error: invalid PUT/POST/PATCH request, no data given');
        }

        // Initialize parameters
        let fetchParams = new URLSearchParams();
        for (let key in params) {
            fetchParams.append(key, params[key]);
        }
        const fetchParamsString = fetchParams.toString();

        // Initialize headers

        // Default headers
        let fetchHeaders = headers;
        if (!fetchHeaders)
            fetchHeaders = {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            };
        // Add the Basic Authentication header
        if (this._config.basicCredentials)
            fetchHeaders['Authorization'] = 'Basic '+ this._config.basicCredentials;

        let requestData = {
            method: method,
            headers: new Headers(fetchHeaders),
            mode: 'cors',
            cache: 'default',
            body: body
        };

        const fetchUrl = this._config.apiBaseUrl + url +
            (fetchParamsString.length > 0 ? '?' + fetchParamsString : '');

        let fetchRequest = new Request(fetchUrl, requestData);

        return fetch(fetchRequest);
            // .then( response => response);
            // .then( response => {
            //     // if (response.body) console.log(response.body)
            //     return response.json();
            // })
            // .then(json => {
            //     console.log('fetch reply', json);
            //     return json;
            // } );
    }

}

const client = new Client();

// export default Client;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "user", function() { return user; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processService", function() { return processService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "taskService", function() { return taskService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formService", function() { return formService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flowService", function() { return flowService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers_User__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_ProcessService__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_TaskService__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_FormService__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_FlowService__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utility_Version__ = __webpack_require__(17);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "client", function() { return __WEBPACK_IMPORTED_MODULE_0__Client__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return __WEBPACK_IMPORTED_MODULE_1__helpers_User__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ProcessService", function() { return __WEBPACK_IMPORTED_MODULE_2__services_ProcessService__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TaskService", function() { return __WEBPACK_IMPORTED_MODULE_3__services_TaskService__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FormService", function() { return __WEBPACK_IMPORTED_MODULE_4__services_FormService__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FlowService", function() { return __WEBPACK_IMPORTED_MODULE_5__services_FlowService__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Version", function() { return __WEBPACK_IMPORTED_MODULE_6__utility_Version__["a"]; });








/** @type {User} */
const user = new __WEBPACK_IMPORTED_MODULE_1__helpers_User__["a" /* default */]();

/** @type {ProcessService} */
const processService = new __WEBPACK_IMPORTED_MODULE_2__services_ProcessService__["a" /* default */]();

/** @type {TaskService} */
const taskService = new __WEBPACK_IMPORTED_MODULE_3__services_TaskService__["a" /* default */]();

/** @type {FormService} */
const formService = new __WEBPACK_IMPORTED_MODULE_4__services_FormService__["a" /* default */]();

/** @type {FlowService} */
const flowService = new __WEBPACK_IMPORTED_MODULE_5__services_FlowService__["a" /* default */]();



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Model representing a user profile.
 */
class BaseModel {
    /**
     * @param {Object}          response            - JSON formatted response of base object.
     * @param {String|Number}   response.id         - The base ID value
     */
    constructor(response = {}) {
        const _response = response['data'] || response;

        /** @type {String} */
        this._id = _response.id;
        this._response = _response;

        // Add any other fields in the response
        // for (let prop in _response) {
        //     this['_' + prop] = _response[prop];
        // }
    }

    /**
     * Gets the id
     *
     * @type {String}
     */
    get id() {
        return this._id;
    }

    /**
     * Sets the id
     *
     * @param {String} id
     */
    set id(id) {
        this._id = id;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (BaseModel);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return hasAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return hasCredentials; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return isA; });
/* unused harmony export isDate */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return isRequired; });
/* unused harmony export isValid */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return validate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return hasPersonalId; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(0);


/**
 * If there is no token, a message is returned.
 * @param  {String}  msg - Message to return if validation fails
 * @return {String}      - A message if the validation fails and is blank if it passes
 */
function hasCredentials(msg = 'requires Basic Authentication credentials') { return (__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].basicCredentials) ? '' : msg; }

/**
 * If the value is not a date, a message is returned.
 * @param  {Object}  date - The target value to see if it is a date.
 * @param  {String}  msg  - Message to return if validation fails
 * @return {String}       - A message if the validation fails and is blank if it passes
 */
function isDate(date, msg = 'requires valid date') { return (Date.parse(date)) ? '' : msg; }

/**
 * If the required item does not exist, a message is returned.
 * @param  {Object}  p   - The target value to see if it exists, to be
 *                         Must contain a { key: value } to be the target of validation
 * @param  {String}  msg - Message to return if validation fails
 * @return {String}      - A message if the validation fails and is blank if it passes
 */
function isRequired(p, msg = 'is not defined') {
    return Object.keys(p)
        .map(key => ({ key, value: p[key] }))
        .filter(obj => (obj.value === null || obj.value === undefined))
        .map(value => `${value.key} ${msg}`)
        .join(' and ');
}

/**
 * If the parameter is not of primitive type 'type', a message is returned.
 * @param  {Object}  p    - The target value to see if the type exists.
 *                          Must contain a { key: value } to be the target of validation
 * @param  {Object}  type - The type is the class the target is an instance of (example Array, String, etc.).
 * @param  {String}  msg  - Message to return if validation fails
 * @return {String}       - A message if the validation fails and is blank if it passes
 */
function isA(p, type, msg = 'is not a') {
    if (isRequired(p).length > 0) { return ''; }
    return Object.keys(p)
        .map(key => ({ key, value: p[key] }))
        .filter(obj => ((typeof type !== 'function' && typeof obj.value !== type)
            || (typeof obj.value === 'object' && !(obj.value instanceof type))))
        .map(value => `${value.key} ${msg} ${type}`).join(' and ');
}

/**
 * If the parameter does not have the attribute, a message is returned
 * @param  {Object}  p             - The target value to see if it has attributes
 *                                   Must contain a { key: value } to be the target of validation
 * @param  {String}  attributeName - Must be a string to validate p
 * @param  {String}  msg           - Message to return if validation fails
 * @return {String}                - A message if the validation fails and blank if it passes
 */
function hasAttribute(p, attributeName, msg = 'does not have') {
    if (isRequired(p).length > 0) { return ''; }
    return Object.keys(p)
        .map(key => ({ key, value: p[key] }))
        .filter(obj => !{}.hasOwnProperty.call(obj.value, attributeName))
        .map(value => `${value.key} ${msg} ${attributeName}`)
        .join(' and ');
}

/**
 * If the boolean statement is false, return a message, otherwise return an empty string
 * @param  {Boolean} booleanStatement - Any boolean statement that should be true
 * @param  {String}  msg              - Message to return if validation fails
 * @return {String}                   - A message if the validation fails and blank if it passes
 */
function isValid(booleanStatement, msg = 'is not true') { return (booleanStatement) ? '' : msg; }

/**
 * Checks if the client has stored personalId information
 * @param  {String}  msg           - Message to return if validation fails
 * @return {String}                - A message if the validation fails and blank if it passes
 */
function hasPersonalId(msg = 'requires personalId') { return (__WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId) ? '' : msg; }

/**
 * Loops through each validation item and throws an error if something fails (a message exists)
 * @param  {String}    module  - The location that calls this method.
 * @param  {...Object} results - An array of functions to test.
 */
function validate(module, ...results) {
    const uniqueResults = results.filter(result => result);
    if (uniqueResults.length > 0) {
        const messages = uniqueResults.join(' and ');
        throw new Error(`${module} error: ${messages}`, module);
    }
}

// Original, substitued methods, TODO: remove

/**
 * If the required item does not exist, a message is returned.
 * @param  {Object}  p    - The target value to see if it exists.
 * @param  {String}  msg - Message to return if validation fails
 * @return {String}      - A message if the validation fails and is blank if it passes
 */
function isRequiredOrig(p, msg = 'is not defined') {
    return Object.keys(p)
        .map(key => ({ key, value: p[key] }))
        .filter(obj => !obj.value)
        .map(value => `${value.key} ${msg}`)
        .join(' and ');
}







/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(2);


/**
 * Model representing a process definition.
 */
class Form extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */]{
    /**
     * @param {Object}  response                        - JSON formatted response of process definition.
     * @param {String}  response.id                     - The process definition ID value
     */
    constructor(response = {}) {
        super(response);
    }

    /**
     * Gets the formKey
     *
     * @type {String}
     */
    get formKey() {
        return this._response.formKey;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Form);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Form__ = __webpack_require__(4);


/**
 * Model representing a process definition.
 */
class FormModel extends __WEBPACK_IMPORTED_MODULE_0__Form__["a" /* default */] {
    /**
     * @param {Object}  response            - JSON formatted response of a form model.
     *                  response.id         - The form model ID value
     */
    constructor(response) {
        super(response);
    }

    /**
     * Gets the fields
     *
     * @type {Array}
     */
    get fields() {
        return this._response.fields;
    }

    /**
     * Gets the outcomes
     *
     * @type {Array}
     */
    get outcomes() {
        return this._response.outcomes;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (FormModel);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_User__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Client__ = __webpack_require__(0);



/**
 * Helper class representing a user MobileUser.
 */
// class User extends aggregate(UserModel, Helper) {
class User extends __WEBPACK_IMPORTED_MODULE_0__models_User__["a" /* default */] {

    /**
     * Constructor for helper class representing a MobileUser
     *
     * @param {Object} json - response from server
     */
    constructor(json = {}) {
        super(json);

        this.updateCredentials();
    }

    /**
     * Sets the accountName
     *
     * @param {string} name
     */
    set accountName(name) {
        super.accountName = name;

        this.updateCredentials();
    }

    /**
     * Sets the password
     *
     * @param {string} pwd
     */
    set password(pwd) {
        super.password = pwd;

        this.updateCredentials();
    }

    updateCredentials() {
        if (this._accountName && this._password) {
            __WEBPACK_IMPORTED_MODULE_1__Client__["a" /* client */].basicCredentials = window.btoa(this._accountName + ':' + this._password);
        }
    }

    /**
     * Sets the personalId
     *
     * @param {string} personalId
     */
    set personalId(personalId) {
        super.personalId = personalId;

        __WEBPACK_IMPORTED_MODULE_1__Client__["a" /* client */].personalId = personalId;
    }
}
/* harmony default export */ __webpack_exports__["a"] = (User);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(2);


/**
 * Model representing a user profile.
 */
class UserModel extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */]{

    /**
     * @param {Object}  response                        - JSON formatted response of a user profile.
     *                  response.account_name           - Account name (usually a number)
     *                  response.password               - Account password
     *                  response.email                  - The email address
     *                  response.personal_id            - The email address
     */
    constructor(response) {
        super(response);

        /** @type {String} */
        this._accountName = this._response['account_name'];

        /** @type {String} */
        this._password = this._response['password'];

        /** @type {String} */
        this._email = this._response['email'];

        /** @type {String} */
        this._email = this._response['personal_id'];
    }

    /**
     * Gets the accountName
     *
     * @type {string}
     */
    get accountName() {
        return this._accountName;
    }

    /**
     * Sets the accountName
     *
     * @param {string} name
     */
    set accountName(name) {
        this._accountName = name;
    }

    /**
     * Gets the email
     *
     * @type {string}
     */
    get personalId() {
        return this._personalId;
    }

    /**
     * Sets the personalId
     *
     * @param {string} personalId
     */
    set personalId(personalId) {
        this._personalId = personalId;
    }

    /**
     * Sets the password
     *
     * @param {string} pwd
     */
    set password(pwd) {
        this._password = pwd;
    }

    /**
     * Gets the email
     *
     * @type {string}
     */
    get email() {
        return this._email;
    }

    /**
     * Sets the password
     *
     * @param {string} email
     */
    set email(email) {
        this._email = email;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (UserModel);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_ProcessDefinition__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_ProcessInstance__ = __webpack_require__(11);





/**
 * Service handling Process specific endpoints.
 *
 */
class ProcessService {

    constructor() {}

    /**
     * Gets the Latest Process Definition with the give Process Definition key
     *
     * @param  {String} processDefKey           - Process Definition key
     * @throws {Error}                          - If missing credential or missing required parameters
     * @return {Promise<ProcessDefinition>}     - Promise returning a ProcessDefinition object
     *
     * @example
     * import { processService } from 'snapClinical';
     * processService.getLastProcessDefinition('SnapClinicalDemo3')
     *
     */
    async getLastProcessDefinition(processDefKey) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getLastProcessDefinition',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({processDefKey}),
            // isA(processDefKey, 'string')
        );

        const params = {
            key : processDefKey,
            size : 5,
            sort : 'version',
            order : 'desc'
        };

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch('/flowable-task/process-api/repository/process-definitions', 'GET', params)
            .then( resp => resp.json() )
            .then( response => {
                // Return the top most project definition process definition
                // console.log('getLastProcessDefinition - response:', response);
                if (response.data && Array.isArray(response.data))
                    if ( response.data.length > 0 )
                        return new __WEBPACK_IMPORTED_MODULE_2__models_ProcessDefinition__["a" /* default */](response.data[0]);
                    else
                        return null;
                else throw new Error ( 'getLastProcessDefinition failed', response );
            });
    }

    /**
     * Gets the Last Process Instance with the given Process Definition Id
     *
     * @param  {String} procDefID               - Process Definition Id
     * @throws {Error}                          - If missing credential or missing required parameters
     * @return {Promise<ProcessInstance>}       - Promise returning a ProcessInstance object
     *
     */
    async queryLastProcessInstance(procDefID) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.queryLastProcessInstance',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({procDefID}),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["c" /* hasPersonalId */])()
        );

        const body = JSON.stringify({
            'processDefinitionId': procDefID,
            'includeProcessVariables': 'true',
            'variables':
                [
                    {
                        'name': 'initiator',
                        'value': __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId,
                        'operation': 'equals'
                    }
                ]
        });

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch('/flowable-task/process-api/query/process-instances', 'POST', null, body)
            .then( resp => resp.json() )
            .then( response => {
                // console.log('queryLastProcessInstances - response:', response);
                if (response.data && Array.isArray(response.data))
                    if ( response.data.length > 0 )
                        return new __WEBPACK_IMPORTED_MODULE_3__models_ProcessInstance__["a" /* default */](response.data[0]);
                    else
                        return null;
                else throw new Error ( 'queryLastProcessInstance returned empty data', response );
            });
    }

    /**
     * Starts a New Process Instance with the given Process Definition Id
     *
     * @param  {String} procDefID               - Process Definition Id
     * @throws {Error}                          - If missing credential or missing required parameters
     * @return {Promise<ProcessInstance>}       - Promise returning a ProcessInstance object
     *
     */
    async startNewProcessInstance(procDefID) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.startNewProcessInstance',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({procDefID}),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["c" /* hasPersonalId */])()
        );

        const body = JSON.stringify({
            'processDefinitionId':procDefID,
            'businessKey':'myBusinessKey',
            'returnVariables': 'true',
            'variables': [
                {
                    'name': 'initiator',
                    'type': 'string',
                    'value': __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId,
                    'scope': 'local'
                },
                {
                    'name': 'frontEndKey',
                    'type': 'string',
                    'value': __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].frontEndKey,
                    'scope': 'local'
                }
            ]
        });

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch('/flowable-task/process-api/runtime/process-instances', 'POST', null, body)
            .then( resp => resp.json() )
            .then( response => {
                // console.log('startNewProcessInstance - response:', response);
                if (response.id)
                    return new __WEBPACK_IMPORTED_MODULE_3__models_ProcessInstance__["a" /* default */](response);
                else
                    return null;
            });
    }

    /**
     * Queries Historic Process Instances with the given Process Definition Id and returns the most recent one
     *
     * @param  {String} procDefID               - Process Definition Id
     * @param  {Object} query                   - Query data
     * @throws {Error}                          - If missing credential or missing required parameters
     * @return {Promise<ProcessInstance>}       - Promise returning a ProcessInstance object
     *
     */
    async queryHistoricProcessInstances(procDefID, query) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.queryHistoricProcessInstances',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({procDefID}),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["c" /* hasPersonalId */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({query}, Array)
        );
        for (let queryElement of query) {
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.queryHistoricProcessInstances',
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({queryElement}, 'name'),
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({queryElement}, 'value'),
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({queryElement}, 'operation')
            );
        }

        const params = {
            size : 50,
            order : 'asc'
        };

        let variables = [
            {
                'name': 'initiator',
                'value': __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId,
                'operation': 'equals'
            }
        ];
        // add query to variables
        if (query) variables = variables.concat(query);

        const body = JSON.stringify({
            'processDefinitionId': procDefID,
            'includeProcessVariables': 'true',
            'variables': variables
        });

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch('/flowable-task/process-api/query/historic-process-instances', 'POST', params, body)
            .then( resp => resp.json() )
            .then( response => {
                // console.log('queryHistoricProcessInstances - response:', response);
                if (response.data && Array.isArray(response.data) && response.data.length > 0){

                    // here return the list of variables
                    let historicProcessInstances = [];
                    for (let instance of response.data) {
                        historicProcessInstances.push(new __WEBPACK_IMPORTED_MODULE_3__models_ProcessInstance__["a" /* default */](instance));
                    }
                    return historicProcessInstances;
                }
                else throw new Error ( 'queryHistoricProcessInstances returned empty data', response );
            });
    }

    /**
     * Save Process variables for a given Process Instance
     *
     * @param  {String} procInstID          - Process Instance Id
     * @param  {Array} variables            - Array of variables
     * @throws {Error}                      - If missing credential or missing required parameters
     * @return {Promise<Boolean>}           - Promise returning a Boolean
     *
     * @example
     * The array of Variables needs to be in the following format:
     * [
     *  {
     *    'name': 'variablename',
     *    'type': 'variabletype',
     *    'value': 'variablevalue',
     *    'scope': 'local'
     *  }
     * ]
     *
     */
    async saveProcessVariables(procInstID, variables) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.startNewProcessInstance',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({procInstID}),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({variables}, Array)
        );
        for (let variable of variables) {
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.saveFormProperties',
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({variable}, 'name'),
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({variable}, 'type'),
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({variable}, 'value'),
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({variable}, 'scope')
            );
        }
        const body = JSON.stringify(variables);

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/flowable-task/process-api/runtime/process-instances/${procInstID}/variables`, 'PUT', null, body)
            .then( response => {
                // console.log('saveProcessVariable:', response);
                if (response.status === 201) { // 201 Created
                    return response.json();
                }
                else throw new Error ('Save Process Variable failed', response );
            });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ProcessService);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(2);


/**
 * Model representing a process definition.
 */
class ProcessDefinition extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */]{
    /**
     * @param {Object}  response                        - JSON formatted response of process definition.
     * @param {String}  response.id                     - The process definition ID value
     */
    constructor(response = {}) {
        super(response);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ProcessDefinition);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(2);


/**
 * Model representing a process definition.
 */
class ProcessInstanceModel extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */] {
    /**
     * @param {Object}  response                        - JSON formatted response of process definition.
     * @param {String}  response.id                     - The process definition ID value
     */
    constructor(response = {}) {
        super(response);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ProcessInstanceModel);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_Task__ = __webpack_require__(13);




/**
 * Service handling Task specific endpoints.
 *
 */
class TaskService {

    constructor() {
    }

    /**
     * Gets the Taskf from the given Process Definition Id
     *
     * @param  {Number} procInstID          - Process Definition Id
     * @throws {Error}                      - If missing credential or missing required parameters
     * @return {Promise<Task>}              - Promise returning a Task object
     *
     */
    async getTask(procInstID) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getTask', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(), Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({procInstID}));

        const params = {
            processInstanceId : procInstID,
            includeProcessVariables : true
        };

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch('/flowable-task/process-api/runtime/tasks', 'GET', params)
            .then( resp => resp.json() )
            .then( response => {
                // console.log('getTask - response:', response);
                if (response.data && Array.isArray(response.data))
                    if (response.data.length > 0 )
                        return new __WEBPACK_IMPORTED_MODULE_2__models_Task__["a" /* default */](response.data[0]);
                    else
                        return null;
                else throw new Error ( 'getTask returned empty data', response );
            });
    }

    /**
     * Performs a specific action on a Task
     *
     * @param  {Number} taskId          - Task Id
     * @param  {String} action          - action identifier to be perfomed on the task, like 'claim'
     * @throws {Error}                  - If missing credential or missing required parameters
     * @return {Promise<Boolean>}       - Promise returning true when action completes successfully
     *
     */
    async action(taskId, action) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.action', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(), Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["c" /* hasPersonalId */])(), Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({taskId, action}));

        const body = JSON.stringify({
            'action' : action,
            'assignee' : __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId
        });


        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch('/flowable-task/process-api/runtime/tasks/' + taskId.toString(), 'POST', null, body)
            .then( response => {

                // console.log('Task action - response:', response);
                if (response.status === 200) {
                    return true;
                }
                else throw new Error ('Task action failed', response );
            });
    }

}

/* harmony default export */ __webpack_exports__["a"] = (TaskService);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Base__ = __webpack_require__(2);



/**
 * Model representing a task.
 */
class TaskModel extends __WEBPACK_IMPORTED_MODULE_0__Base__["a" /* default */] {
    /**
     * @param {Object} response                   - JSON formatted response of a task instance.
     * @param {Number} response.id                - The profile ID value

     */
    constructor(response = {}) {
        super(response);
    }

    /**
     * Gets the name
     *
     * @type {String}
     */
    get name() {
        return this._response['name'];
    }

    /**
     * Gets the taskDefinitionKey
     *
     * @type {String}
     */
    get taskDefinitionKey() {
        return this._response['taskDefinitionKey'];
    }

    /**
     * Gets the formKey
     *
     * @type {String}
     */
    get formKey() {
        return this._response['formKey'];
    }

    /**
     * Gets the process Instance Variables
     *
     * @type {Array}
     */
    get procInstVars() {
        return this._response['variables'];
    }
}

/* harmony default export */ __webpack_exports__["a"] = (TaskModel);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_Form__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_FormModel__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__index__ = __webpack_require__(1);






/**
 * Service handling the Form endpoints
 */
class FormService {

    constructor() {
    }

    /**
     * Gets the Form data, including the variables, from the given Task Id
     *
     * @param  {Number} taskId          - Task Id
     * @throws {Error}                  - If missing credential or missing required parameters
     * @return {Promise<Form>}          - Promise returning a Form object
     *
     */
    getFormProperties(taskId) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getFormProperties',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({taskId})
        );

        const params = {
            taskId : taskId
        };

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch('/flowable-task/process-api/form/form-data', 'GET', params)
            .then( resp => resp.json() )
            .then( response => {
                // Return the top most project definition process definition
                // console.log('getFormProperties - response:', response);
                return new __WEBPACK_IMPORTED_MODULE_2__models_Form__["a" /* default */](response);
            });
    }

    /**
     * Gets the Form data, including the fields, from the given Deployment Id and Form Key
     *
     * @param  {String} deploymentId    - Deployment Id
     * @param  {String} formKey         - Form Key
     * @throws {Error}                  - If missing credential or missing required parameters
     * @return {Promise<FormModel>}     - Promise returning a Form object
     *
     */
    getFormFields(deploymentId, formKey) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getFormFields',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({deploymentId, formKey})
        );

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/flowable-task/process-api/repository/deployments/${deploymentId}/resourcedata/form-${formKey}.form`, 'GET')
            .then( resp => resp.json() )
            .then( response => {
                // Return the top most project definition process definition
                // console.log('getFormProperties - response:', response);
                return new __WEBPACK_IMPORTED_MODULE_3__models_FormModel__["a" /* default */](response);
            });
    }


    /**
     * Gets the Form Instance data, including the fields, from the given Task Id, Process Instance Id and Form Key
     *
     * @param  {Number|String} taskId               - Task Id
     * @param  {Number|String} processInstanceId    - Process Instance Id
     * @param  {String} formKey                     - Form Definition Key
     * @throws {Error}                              - If missing credential or missing required parameters
     * @return {Promise<FormModel>}                 - Promise returning a Form object
     *
     */
    getFormInstanceFields(taskId, processInstanceId, formKey) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getFormInstanceFields',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({taskId, processInstanceId, formKey})
        );

        const body = JSON.stringify({
            'taskId': taskId,
            'processInstanceId': processInstanceId,
            'formDefinitionKey': formKey
        });

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch(`/flowable-task/form-api/form/form-instance-model`, 'POST', null, body)
            .then( resp => resp.json() )
            .then( response => {
                // Return the form model
                // console.log('getFormProperties - response:', response);
                return new __WEBPACK_IMPORTED_MODULE_3__models_FormModel__["a" /* default */](response);
            });
    }

    /**
     * Creates a Form Instance data for a given Task Id, Process Instance Id, Form Key and fields
     *
     * @param  {Number|String} taskId               - Task Id
     * @param  {String} formKey                     - Form Definition Key
     * @param  {Number|String} processInstanceId    - Process Instance Id (optional)
     * @param  {Array} fields                       - fields, an array of objects each with id and value fields, for example
     *                                                [ { id: 'someid', value: 'somevalue' } ]
     * @throws {Error}                              - If missing credential or missing required parameters
     * @return {Promise<Boolean>}                   - Promise returning true if
     *
     */
    createFormInstance(taskId, formKey, processInstanceId, fields) { // , parentDeploymentId) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.createFormInstance',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({taskId, formKey, fields}),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({fields}, Array)
        );
        for (let field of fields) {
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.createFormInstance',
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({field}, 'id'),
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({field}, 'value')
            );
        }

        //remap the fields into an hashmap variables object
        const variables = {};
        fields.forEach(field => (variables[field.id] = field.value));

        let bodyObj = {
            'taskId': taskId,
            'formDefinitionKey': formKey,
            'variables': variables
        };
        if (processInstanceId) bodyObj['processInstanceId'] = processInstanceId;
        const body = JSON.stringify(bodyObj);


        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch('/flowable-task/form-api/form/form-instances', 'POST', null, body)
            .then( response => {
                if (response.status === 201 || response.status === 200) { // 201 Created
                    return true;
                }
                else throw new Error ('Create Instance Fields failed', response );
            });
    }

    /**
     * Updates a Form Instance data for a given Task Id, Process Instance Id, Form Key and fields
     *
     * @param  {Number|String} taskId               - Task Id
     * @param  {String} formKey                     - Form Definition Key
     * @param  {Number|String} processInstanceId    - Process Instance Id (optional)
     * @param  {Array} fields                       - fields, an array of objects each with id and value fields, for example
     *                                                [ { id: 'someid', value: 'somevalue' } ]
     * @throws {Error}                              - If missing credential or missing required parameters
     * @return {Promise<Boolean>}                   - Promise returning true if
     *
     */
    updateFormInstance(taskId, formKey, processInstanceId, fields) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.updateFormInstance',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({taskId, formKey, fields}),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({fields}, Array)
        );
        for (let field of fields) {
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.updateFormInstance',
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({field}, 'id'),
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["a" /* hasAttribute */])({field}, 'value')
            );
        }

        //remap the fields into an hashmap variables object
        const variables = {};
        fields.forEach(field => (variables[field.id] = field.value));

        let bodyObj = {
            'taskId': taskId,
            'formDefinitionKey': formKey,
            'variables': variables
        };
        if (processInstanceId) bodyObj['processInstanceId'] = processInstanceId;
        const body = JSON.stringify(bodyObj);

        return __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].fetch('/flowable-task/form-api/form/form-instances', 'PUT', null, body)
            .then( response => {
                if (response.status === 200 || response.status === 204) { // 204 No Content
                    return true;
                }
                else throw new Error ('Update Instance Fields failed', response );
            });
    }

    /**
     * Save Form Outcome for a given Process Instance and formKey
     *
     * @param  {String} procInstID          - Process Instance Id
     * @param  {String} outcome             - Value of the outcome variable
     *                                        a name selected among the form outcome array
     * @param  {String} formKey             - Form Definition Key
     * @throws {Error}                      - If missing credential or missing required parameters
     * @return {Promise<Boolean>}           - Promise returning a Boolean
     *
     * @example
     * A new Variable will be created:
     * [
     *  {
     *    'name': 'form_formKey_outcome',
     *    'type': 'string',
     *    'value': 'outcome',
     *    'scope': 'local'
     *  }
     * ]
     *
     */
    async saveFormOutcome(procInstID, outcome, formKey) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.saveFormOutcome',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({outcome}, {formKey}),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({outcome}, String),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({formKey}, String)
        );

        const variables = [
            {
            'name': `form_${formKey}_outcome`,
            'type': 'string',
            'value': outcome,
            'scope': 'local'
        }];

        return __WEBPACK_IMPORTED_MODULE_4__index__["processService"].saveProcessVariables(procInstID, variables);
    }

}

/* harmony default export */ __webpack_exports__["a"] = (FormService);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Client__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utility_ArrayUtility__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_FormModel__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__index__ = __webpack_require__(1);









/**
 * Service handling the overal Flow Service
 *
 */
class FlowService {

    constructor() {
        this._lastProcessDef = undefined;
        this._lastProcessInst = undefined;
        this._task = undefined;
        this._processDefKey = undefined;
    }
    /**
     * Gets the current process Definition Key
     *
     * @type {String}
     */
    get processDefKey() {
      return this._processDefKey;
    }

    /**
     * Sets the current process Definition Key
     *
     * @param {String} defKey
     */
    set processDefKey(defKey) {
      this._processDefKey = defKey;
    }

    /**
     * Gets the current task
     *
     * @type {String|Number}
     */
    get task() {
        return this._task;
    }

    /**
     * Sets the current task
     *
     * @param {String|Number} task
     */
    set task(task) {
        this._task = task;
    }


    /**
     * Gets the next Task for a given Process Definition Key
     *
     * @param  {String} processDefKey       - Process Definition Key
     * @param  {Object} qualifier           - Object used to check if the current user is qualified for the flow
     *                                        This input needs to be in the following format:
     *
     *     {
     *       'name': 'somename',
     *       'value': 'somevalue,
     *       'operation': 'equals'|'notEquals'|'equalsIgnoreCase'|'notEqualsIgnoreCase'|
     *                    'lessThan'|'greaterThan'|'lessThanOrEquals'|'greaterThanOrEquals'|'like'
     *     }
     *
     * @throws {Error}                      - If missing credential or missing required parameters
     * @return {Promise<Object>}            - Promise returning an object with the variables, form fields and outcomes
     *                                        specified for the current task. The output object is as follows:
     *
     *     {
     *       variables: [
     *           {
     *               'id': 'someid',
     *               'name': 'somename',
     *               'type': 'string'|'short'|'integer'|'long'|'double'|'boolean'|'date',
     *               'value': somevalue,
     *               'readable': true|false,
     *               'writable': true|false,
     *               'required': true|false,
     *               'datePattern': 'somedatepattern',
     *               'enumValues': [ some array of enum Values like
     *                    {
     *                       'id': 'someid',
     *                       'name': 'somename'
     *                    },
     *                    ...
     *                ]
     *           },
     *           ...
     *       ],
     *       fields: [
     *           {
     *               'fieldType': 'FormField'|'ExpressionFormField'|'OptionFormField',
     *               'id': 'someid',
     *               'name': 'somename',
     *               'type': 'text'|'multi-line-text'|'integer'|'decimal'|'date'|'boolean'|'hyperlink'|
     *                       'expression'|'radio-buttons'|'dropdown',
     *               'value': 'somevalue',
     *               'required': true|false,
     *               'readOnly': true|false,
     *               'overrideId': true|false,
     *               'placeholder': 'someplaceholder',
     *               'params': {
     *                      'minLength': 'somevalue',
     *                      'maxLength': 'somevalue',
     *                      'regexPattern': 'someregex',
     *                      'mask': 'somemask'
     *                   },
     *               'layout': 'somelayout'
     *           },
     *           ...
     *       ],
     *       outcomes: [
     *           {
     *               'id': 'someid',       can be null
     *               'name': 'somename',   outcome value
     *           },
     *           ...
     *       ]
     *     }
     *
     *
     */
    async getNextTask(processDefKey, qualifier) {
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getNextTask', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(), Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["c" /* hasPersonalId */])(), Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({processDefKey}));

        const lastProcessDef = await __WEBPACK_IMPORTED_MODULE_4__index__["processService"].getLastProcessDefinition(processDefKey);
        if (!lastProcessDef)
            throw new Error('Could not find the Process Definition Key');
        this._lastProcessDef = lastProcessDef;
        this.processDefKey = processDefKey;
        // console.log('FlowService, getNextTask latestProcessDef:', latestProcessDef);

        // Check if the user has already started the flow
        let lastProcessInst = await __WEBPACK_IMPORTED_MODULE_4__index__["processService"].queryLastProcessInstance(lastProcessDef.id);
        // console.log('FlowService, getNextTask lastProcessInst:', lastProcessInst);

        if (!lastProcessInst) {
            // Check if the user is qualified for the process
            const qualified = this.checkQualification(qualifier);
            if (qualified) {
                lastProcessInst = await __WEBPACK_IMPORTED_MODULE_4__index__["processService"].startNewProcessInstance(lastProcessDef.id);
                console.log('FlowService getNextTask BE SURE THAT WE TEST THIS');
            }
            else
                throw Error ('User not qualified for the flow process');
        }
        this._lastProcessInst = lastProcessInst;

        return this.getNextTaskAndFormData();
    }

  /**
   * Same as getNextTask, but it doesn't reuse an old session
   * @param processDefKey
   * @param qualifier
   * @return {Promise.<Object>}
   */
  async createNewInstanceAndGetFirstTask(processDefKey, qualifier) {
      Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.createNewInstanceAndGetFirstTask', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(), Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["c" /* hasPersonalId */])(), Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({processDefKey}));

      const lastProcessDef = await __WEBPACK_IMPORTED_MODULE_4__index__["processService"].getLastProcessDefinition(processDefKey);
      if (!lastProcessDef)
        throw new Error('Could not find the Process Definition Key');
      this._lastProcessDef = lastProcessDef;
      this.processDefKey = processDefKey;

      // Check if the user is qualified for the process
      const qualified = this.checkQualification(qualifier);
      let lastProcessInst;

      if (qualified) {
        lastProcessInst = await __WEBPACK_IMPORTED_MODULE_4__index__["processService"].startNewProcessInstance(lastProcessDef.id);
        console.log('FlowService createNewInstanceAndGetFirstTask BE SURE THAT WE TEST THIS');
      }
      else
        throw Error ('User not qualified for the flow process');

      this._lastProcessInst = lastProcessInst;

      return this.getNextTaskAndFormData();
    }


    /**
     * Gets the next Task using the stored last Process Instance
     *
     * @throws {Error}                      - If missing credential or missing required parameters
     * @return {Promise<Object>}            - Promise returning an object with three arrays of objects:
     *                                        variables (form properties),
     *                                        fields (form fields)
     *                                        outcomes (form buttons)
     *                                        See getNextTask method for more information on the object format.
     *
     */
    async getNextTaskAndFormData() {
        const lastProcessInst = this._lastProcessInst;
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getTaskAndFormData', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({lastProcessInst}) );

        const task = await __WEBPACK_IMPORTED_MODULE_4__index__["taskService"].getTask(lastProcessInst.id);
        if (!task) {
            // This process instance has no active tasks, returning null
            console.log('FlowService ' + __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId + ' get last process instance:  returning null values');
            return null;
        }
        this._task = task;

        const procVariables = task.procInstVars;

        await __WEBPACK_IMPORTED_MODULE_4__index__["taskService"].action(task.id, 'claim');
        // console.log('FlowService, getTaskAndFormData action claim');
        console.log('FlowService ' + __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId + ' claims task ' + task.name);

        const formVariables = await __WEBPACK_IMPORTED_MODULE_4__index__["formService"].getFormProperties(task.id);

        let formData = new __WEBPACK_IMPORTED_MODULE_3__models_FormModel__["a" /* default */]({ fields:[], outcomes:[] });

        if (task.formKey) {
            formData = await __WEBPACK_IMPORTED_MODULE_4__index__["formService"].getFormInstanceFields(task.id, lastProcessInst.id, task.formKey);
            // console.log('FlowService  formkey: '+ task.formKey + ' - fields: ' + JSON.stringify(formData.fields) + ' - variables: ' + JSON.stringify(procVariables));

           if ( formData.fields && formData.fields.length > 0 && procVariables && procVariables.length > 0) {

                // getting the list of Fields with null value that potentially can be setted by a process variable
                let listOfFieldsIds = formData.fields
                    .filter(el => (!el.value && el.type !== 'expression' && el.type !== 'hyperlink'))
                    .map( el => ({id: el.id}) );

                // console.log('FlowService list of fields to be setted:  ' + JSON.stringify(listOfFieldsIds))

                // getting the list of ProcVariables with valid value and matching ids
                let sublistOfProcVariables = procVariables
                    .filter( el1 => listOfFieldsIds.find( el2 => el1.name === el2.id ))
                    .map(el => FlowService.mapVariablesToFields(el));

                // console.log('FlowService list of variables with matching ids:  ' + JSON.stringify(sublistOfProcVariables))

                // updating the null values of the Fields matchimg with valid variables
                formData.fields.forEach( el => {
                    let i = sublistOfProcVariables.findIndex(el2 => el.id === el2.id);
                    if (i > -1)
                        el.value = sublistOfProcVariables[i].value;
                });

                // console.log('FlowService list of Fields updated:  ' + JSON.stringify(formData.fields))

            }

        }

        return {
            id: task.id,
            name: task.name,
            processInstanceId: lastProcessInst.id,
            definitionKey: task.taskDefinitionKey,
            formKey: task.formKey,
            variables: formVariables._response['formProperties'],
            fields: formData.fields,
            outcomes: formData.outcomes
        };
    }

    /**
     * Checks if the current user is qualified for executing the process identified by the current Process Definition
     *
     * @param  {Object} qualifier           - Object used to check if the current user is qualified for the flow
     *                                        This input needs to be in the following format:
     *
     *     {
     *       'name': 'somename',
     *       'value': 'somevalue,
     *       'operation': 'equals'|'notEquals'|'equalsIgnoreCase'|'notEqualsIgnoreCase'|
     *                    'lessThan'|'greaterThan'|'lessThanOrEquals'|'greaterThanOrEquals'|'like'
     *     }
     *
     * @return {Promise<Boolean>}            - Promise returning an Boolean indicating if the user is qualified
     *
     */
    async checkQualification (qualifier) {
        const lastProcessDef = this._lastProcessDef;
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getTaskAndFormData', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({lastProcessDef, qualifier}) );

        const processInstances = await __WEBPACK_IMPORTED_MODULE_4__index__["processService"].queryHistoricProcessInstances(lastProcessDef.id, qualifier);
        // logic to check if the user is qualified
        let qualified = false;
        if (processInstances.length > 0) qualified = true;
        console.log('FlowService, getNextTask qualified:', qualified);
        return qualified;
    }

    /**
     * Save variables, fields and outcome (single string value) for the current TaskId
     *
     * @param  {Array} variables            - Array of variables (formProperties)
     * @param  {Array} fields               - Array of fields (fields in the Form)
     * @param  {String} outcome             - outcome name selected among the form outcome array
     * @throws {Error}                      - If missing credential or missing required parameters
     *
     * @example
     * The array of Variables needs to be in the following format:
     *
     *   [
     *        {
     *            id: 'variablename',
     *            name: 'something', (optional)
     *            type: 'string',
     *            value: null,
     *            readable: true,
     *            writable: true,
     *            required: false,
     *            datePattern: null,
     *            enumValues: []
     *       },
     *       ...
     *   ]
     */
    async saveVariables(variables, fields, outcome) {
        const lastProcessInst = this._lastProcessInst;
        const task = this._task;
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.saveVariables',
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["b" /* hasCredentials */])(),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({variables, fields, lastProcessInst, task}),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({variables}, Array),
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({fields}, Array)
        );

        // SAVE fields
        // Note: the /form/form-instance-model does not properly handle the readOnly property, which is always true
        // const filteredFields = fields.filter(el => (el.readOnly !== undefined) ? !el.readOnly && el.value : el.value);
        const filteredFields = fields.filter(el => el.value && (el.type !== 'expression') && (el.type !== 'hyperlink'));

        if (filteredFields.length > 0)
            await __WEBPACK_IMPORTED_MODULE_4__index__["formService"].updateFormInstance(task.id, task.formKey, lastProcessInst.id,  filteredFields);

        // SAVE variables
        // map input variables and fields in a format like
        // [
        //     {
        //         'name': 'variablename',
        //         'type': 'variabletype',
        //         'value': 'variablevalue',
        //         'scope': 'local'
        //     },
        //     ...
        // ]
        let mappedVariables = variables
            .filter( el => (el.writable !== undefined) ? el.writable && el.value : el.value )
            .map( el => ({name: el.id, type: el.type, value: el.value, scope: 'local'}) );

        if (outcome && task.formKey) {
            Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.saveVariables',
                Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["d" /* isA */])({outcome}, String)
            );

            mappedVariables.push(
                {
                    'name': `form_${task.formKey}_outcome`,
                    'type': 'string',
                    'value': outcome,
                    'scope': 'local'
                });

        }

        const mappedFields = filteredFields
            .map( el => FlowService.mapFieldsToVariables(el));
        // Remove the common elements, taking the fields elements as
        // Join the two arrays and remove duplicates, the fields elements take the precedence
        const processVariables = Object(__WEBPACK_IMPORTED_MODULE_2__utility_ArrayUtility__["a" /* union */])(mappedVariables, mappedFields, (x, y) => x.name === y.name );

        if (processVariables.length > 0)
            await __WEBPACK_IMPORTED_MODULE_4__index__["processService"].saveProcessVariables(lastProcessInst.id, processVariables);
    }

    /**
     * Moves to the next Task using the stored last Process Instance
     *
     * @throws {Error}                      - If missing credential or missing required parameters
     * @return {Promise<Object>}            - Promise returning an object with three arrays of objects:
     *                                        variables (form properties),
     *                                        fields (form fields)
     *                                        outcomes (form buttons)
     *                                        See getNextTask method for more information on the object format.
     *
     */
    async moveToNextTask() {
        const lastProcessInst = this._lastProcessInst;
        const task = this._task;
        Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["f" /* validate */])( this.constructor.name + '.getTaskAndFormData', Object(__WEBPACK_IMPORTED_MODULE_1__utility_ValidationUtility__["e" /* isRequired */])({lastProcessInst, task}) );

        await __WEBPACK_IMPORTED_MODULE_4__index__["taskService"].action(task.id, 'complete');
        // console.log('FlowService, moveToNextTask action complete');
        console.log('FlowService   ' + __WEBPACK_IMPORTED_MODULE_0__Client__["a" /* client */].personalId + ' completes task ' + task.name);

        return this.getNextTaskAndFormData();
    }

    /**
     * Helper method used to map a field object into an object that can be stored as a variable
     *
     * @param  {Object} el          - Field object
     * @return {Object}             - Variable object
     *
     */
    static mapFieldsToVariables(el) {
        let type = el.type;
        if (type === 'text') type = 'string';
        if (type === 'multi-line-text') type = 'string';
        if (type === 'integer') type = 'long';
        if (type === 'decimal') type = 'double';
        let value = el.value;
        if (type === 'boolean') {
            if (value === 'true') value = true;
            if (value === 'false') value = false;
        }
        return {
            name: el.id,
            type: type,
            value: value,
            scope: 'local'
        }
    }

    /**
     * Helper method used to map a variable object into an object that can be stored as a field value
     *
     * @param  {Object} el          - Variable object
     * @return {Object}             - Field object
     *
     */
    static mapVariablesToFields(el) {
        let value = el.value;
        let type = el.type;
        if (type === 'boolean') {
            if (value === 'true') value = true;
            if (value === 'false') value = false;
        }
        return {
            id: el.name,
            value: value,
        }
    }


}

/* harmony default export */ __webpack_exports__["a"] = (FlowService);

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return union; });
/* unused harmony export unique */
/* unused harmony export arrayToObject */
/**
 * http://stackoverflow.com/a/13319168
 * arr1 and arr2 are arrays of any length; eqFn is a function which
 * can compare two items and return true if they're equal and false otherwise
 * @param {Array} arr1 - Array of any length
 * @param {Array} arr2 - Array of any length
 * @param {Function<Boolean>} eqFn - Function which returns a Boolean
 */
function union(arr1, arr2, eqFn) {
    return unique(arr1.concat(arr2), eqFn);
}

/* // Note, original from http://stackoverflow.com/a/13319168
function union(arr1, arr2, equalityFunc) {
    let union = arr1.concat(arr2);

    for (let i = 0; i < union.length; i++) {
        for (let j = i+1; j < union.length; j++) {
            if (equalityFunc(union[i], union[j])) {
                union.splice(j, 1);
                j--;
            }
        }
    }
    return union;
}
*/

/**
 * Returns an array with unique values given the Eq Function
 * @param {Array} arr - Array that may contain duplicates
 * @param {Function<Boolean>} eqFn - A function that returns a Boolean
 */
function unique(arr, eqFn) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (eqFn(arr[i], arr[j])) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}

/**
 * Convert the Array to an object
 *
 * @param  {Array}  _array    - The array to convert to an object
 * @param  {Object} [options] - Options on how to conver the array
 * @return {Object}           - The resulting object from the array
 */
function arrayToObject(_array, options = undefined) {
    const _obj = {};
    let i = 0;
    _array.forEach((obj) => {
        const key = (options && options.key) ? obj[options.key] : obj.id || ++i;
        if (key !== undefined && key !== null) {
            _obj[key] = obj;
        }
    });
    return _obj;
}




/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Print current lib version on the console log
 */
class Version {
    /**
     * Prints the current lib version on the console log
     */
    static print() {
        console.log("snapClinical JS SDK Version: " + "0.1.6" );
    }

    /**
     * Return the current lib version
     * @return (String)     - the current js sdk library version
     */
    static get() {
        return ("snapClinical JS SDK Version: " + "0.1.6" );
    }

}


/* harmony default export */ __webpack_exports__["a"] = (Version);

/***/ })
/******/ ]);
});

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__JavascriptDistLib_core_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__objects_label_label_module_js__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objects_button_button_module_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__objects_network_network_module_js__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__objects_json_json_module_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__objects_connio_connio_module_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__objects_animation_animation_module_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__objects_screen_screen_module_js__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__objects_dictionary_dictionary_module_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__objects_TextLibrary_TextLibrary_module_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__objects_image_image_module_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__objects_ImageLibrary_ImageLibrary_module_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__objects_container_container_module_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__objects_location_location_module_js__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__objects_MathLibrary_MathLibrary_module_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__objects_lists_lists_module_js__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__objects_application_application_module_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__objects_graphview_graphview_module_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__objects_storage_storage_module_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__objects_gauge_gauge_module_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__objects_webview_webview_module_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__objects_ColourLibrary_colourlibrary_module_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__objects_TimeLibrary_timelibrary_module_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__objects_mapview_mapview_module_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__objects_textbox_textbox_module_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__objects_slider_slider_module_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__objects_videoview_videoview_module_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__objects_VideoLibrary_videolibrary_module_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__objects_snappclinical_snappclinical_module_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__objects_dialog_dialog_module_js__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__objects_bluetooth_bluetooth_module_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__objects_gridview_gridview_module_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__objects_clock_clock_module_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__objects_listview_listview_module_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__objects_AudioLibrary_audiolibrary_module_js__ = __webpack_require__(3);
// ES6 imports






































var distLib = new __WEBPACK_IMPORTED_MODULE_0__JavascriptDistLib_core_js__["a" /* default */]();
distLib.Animation = new __WEBPACK_IMPORTED_MODULE_6__objects_animation_animation_module_js__["a" /* default */]();
distLib.Button = new __WEBPACK_IMPORTED_MODULE_2__objects_button_button_module_js__["a" /* default */]();
distLib.Connio = new __WEBPACK_IMPORTED_MODULE_5__objects_connio_connio_module_js__["a" /* default */]();
distLib.Container = new __WEBPACK_IMPORTED_MODULE_12__objects_container_container_module_js__["a" /* default */]();
distLib.Dictionary = new __WEBPACK_IMPORTED_MODULE_8__objects_dictionary_dictionary_module_js__["a" /* default */]();
distLib.Image = new __WEBPACK_IMPORTED_MODULE_10__objects_image_image_module_js__["a" /* default */]();
distLib.ImageLibrary = new __WEBPACK_IMPORTED_MODULE_11__objects_ImageLibrary_ImageLibrary_module_js__["a" /* default */]();
distLib.JSON = new __WEBPACK_IMPORTED_MODULE_4__objects_json_json_module_js__["a" /* default */]();
distLib.Label = new __WEBPACK_IMPORTED_MODULE_1__objects_label_label_module_js__["a" /* default */]();
distLib.ListLibrary = new __WEBPACK_IMPORTED_MODULE_15__objects_lists_lists_module_js__["a" /* default */]();
distLib.Location = new __WEBPACK_IMPORTED_MODULE_13__objects_location_location_module_js__["a" /* default */]();
distLib.MathLibrary = new __WEBPACK_IMPORTED_MODULE_14__objects_MathLibrary_MathLibrary_module_js__["a" /* default */]();
distLib.GraphContainer = new __WEBPACK_IMPORTED_MODULE_17__objects_graphview_graphview_module_js__["a" /* default */]();
distLib.Network = new __WEBPACK_IMPORTED_MODULE_3__objects_network_network_module_js__["a" /* default */]();
distLib.Screen = new __WEBPACK_IMPORTED_MODULE_7__objects_screen_screen_module_js__["a" /* default */]();
distLib.TextLib = new __WEBPACK_IMPORTED_MODULE_9__objects_TextLibrary_TextLibrary_module_js__["a" /* default */]();
distLib.Application = new __WEBPACK_IMPORTED_MODULE_16__objects_application_application_module_js__["a" /* default */]();
distLib.Storage = new __WEBPACK_IMPORTED_MODULE_18__objects_storage_storage_module_js__["a" /* default */]();
distLib.Gauge = new __WEBPACK_IMPORTED_MODULE_19__objects_gauge_gauge_module_js__["a" /* default */]();
distLib.WebContainer = new __WEBPACK_IMPORTED_MODULE_20__objects_webview_webview_module_js__["a" /* default */]();
distLib.ColourLibrary = new __WEBPACK_IMPORTED_MODULE_21__objects_ColourLibrary_colourlibrary_module_js__["a" /* default */]();
distLib.TimeLibrary = new __WEBPACK_IMPORTED_MODULE_22__objects_TimeLibrary_timelibrary_module_js__["a" /* default */]();
distLib.MapContainer = new __WEBPACK_IMPORTED_MODULE_23__objects_mapview_mapview_module_js__["a" /* default */]();
distLib.Textbox = new __WEBPACK_IMPORTED_MODULE_24__objects_textbox_textbox_module_js__["a" /* default */]();
distLib.Slider = new __WEBPACK_IMPORTED_MODULE_25__objects_slider_slider_module_js__["a" /* default */]();
distLib.VideoView = new __WEBPACK_IMPORTED_MODULE_26__objects_videoview_videoview_module_js__["a" /* default */]();
distLib.VideoLibrary = new __WEBPACK_IMPORTED_MODULE_27__objects_VideoLibrary_videolibrary_module_js__["a" /* default */]();
distLib.SnappClinical = new __WEBPACK_IMPORTED_MODULE_28__objects_snappclinical_snappclinical_module_js__["a" /* default */]();
distLib.Clock = new __WEBPACK_IMPORTED_MODULE_32__objects_clock_clock_module_js__["a" /* default */]();
distLib.Dialog = new __WEBPACK_IMPORTED_MODULE_29__objects_dialog_dialog_module_js__["a" /* default */]();
distLib.Bluetooth = new __WEBPACK_IMPORTED_MODULE_30__objects_bluetooth_bluetooth_module_js__["a" /* default */]();
distLib.GridView = new __WEBPACK_IMPORTED_MODULE_31__objects_gridview_gridview_module_js__["a" /* default */]();
distLib.ListView = new __WEBPACK_IMPORTED_MODULE_33__objects_listview_listview_module_js__["a" /* default */]();

distLib.AudioLibrary = new __WEBPACK_IMPORTED_MODULE_34__objects_AudioLibrary_audiolibrary_module_js__["a" /* default */]();

// setting the global variable
com = com || {};
com.fc = com.fc || {};
com.fc.JavaScriptDistLib = distLib;

/***/ })
/******/ ]);