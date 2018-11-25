(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/DSAalgorithm/DSA.ts":
/*!*************************************!*\
  !*** ./src/app/DSAalgorithm/DSA.ts ***!
  \*************************************/
/*! exports provided: DSA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DSA", function() { return DSA; });
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SHA512_224__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SHA512_224 */ "./src/app/DSAalgorithm/SHA512_224.ts");
/* harmony import */ var _Signature__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Signature */ "./src/app/DSAalgorithm/Signature.ts");



var DSA = /** @class */ (function () {
    function DSA() {
        this.q = big_integer__WEBPACK_IMPORTED_MODULE_0__("800000000000000000000000000000000000000000000000000000BD", 16);
        this.p = big_integer__WEBPACK_IMPORTED_MODULE_0__('4000000000000000000000000000000000000000000000000000005E9', 16);
        this.g = big_integer__WEBPACK_IMPORTED_MODULE_0__(2).pow(this.p.prev().divide(this.q)).mod(this.p);
    }
    DSA.prototype.getSignature = function (message, privateKey) {
        var x = big_integer__WEBPACK_IMPORTED_MODULE_0__(privateKey, 10);
        if ((x.compare(this.q) > -1) || (x.compare(0) < 1)) {
            return undefined;
        }
        var openKey = this.g.modPow(x, this.p);
        var k = big_integer__WEBPACK_IMPORTED_MODULE_0__["randBetween"](0, this.q);
        var r = (this.g.modPow(k, this.p)).mod(this.q);
        var hash = big_integer__WEBPACK_IMPORTED_MODULE_0__(_SHA512_224__WEBPACK_IMPORTED_MODULE_1__["Sha512_224"].getHash(message), 16);
        var s = (k.modInv(this.q).multiply(hash.plus(x.multiply(r)))).mod(this.q);
        return new _Signature__WEBPACK_IMPORTED_MODULE_2__["Signature"](r, s, openKey);
    };
    DSA.prototype.verify = function (message, signature) {
        var w = signature.s.modInv(this.q);
        var hash = big_integer__WEBPACK_IMPORTED_MODULE_0__(_SHA512_224__WEBPACK_IMPORTED_MODULE_1__["Sha512_224"].getHash(message), 16);
        var u1 = hash.multiply(w).mod(this.q);
        var u2 = signature.r.multiply(w).mod(this.q);
        var v = (this.g.modPow(u1, this.p).multiply(signature.openKey.modPow(u2, this.p)).mod(this.p)).mod(this.q);
        return v.equals(signature.r);
    };
    return DSA;
}());



/***/ }),

/***/ "./src/app/DSAalgorithm/SHA512_224.ts":
/*!********************************************!*\
  !*** ./src/app/DSAalgorithm/SHA512_224.ts ***!
  \********************************************/
/*! exports provided: Sha512_224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sha512_224", function() { return Sha512_224; });
var Sha512_224 = /** @class */ (function () {
    function Sha512_224() {
    }
    Sha512_224.getHash = function (text) {
        //константы
        var K = [
            '428a2f98d728ae22', '7137449123ef65cd', 'b5c0fbcfec4d3b2f', 'e9b5dba58189dbbc',
            '3956c25bf348b538', '59f111f1b605d019', '923f82a4af194f9b', 'ab1c5ed5da6d8118',
            'd807aa98a3030242', '12835b0145706fbe', '243185be4ee4b28c', '550c7dc3d5ffb4e2',
            '72be5d74f27b896f', '80deb1fe3b1696b1', '9bdc06a725c71235', 'c19bf174cf692694',
            'e49b69c19ef14ad2', 'efbe4786384f25e3', '0fc19dc68b8cd5b5', '240ca1cc77ac9c65',
            '2de92c6f592b0275', '4a7484aa6ea6e483', '5cb0a9dcbd41fbd4', '76f988da831153b5',
            '983e5152ee66dfab', 'a831c66d2db43210', 'b00327c898fb213f', 'bf597fc7beef0ee4',
            'c6e00bf33da88fc2', 'd5a79147930aa725', '06ca6351e003826f', '142929670a0e6e70',
            '27b70a8546d22ffc', '2e1b21385c26c926', '4d2c6dfc5ac42aed', '53380d139d95b3df',
            '650a73548baf63de', '766a0abb3c77b2a8', '81c2c92e47edaee6', '92722c851482353b',
            'a2bfe8a14cf10364', 'a81a664bbc423001', 'c24b8b70d0f89791', 'c76c51a30654be30',
            'd192e819d6ef5218', 'd69906245565a910', 'f40e35855771202a', '106aa07032bbd1b8',
            '19a4c116b8d2d0c8', '1e376c085141ab53', '2748774cdf8eeb99', '34b0bcb5e19b48a8',
            '391c0cb3c5c95a63', '4ed8aa4ae3418acb', '5b9cca4f7763e373', '682e6ff3d6b2b8a3',
            '748f82ee5defb2fc', '78a5636f43172f60', '84c87814a1f0ab72', '8cc702081a6439ec',
            '90befffa23631e28', 'a4506cebde82bde9', 'bef9a3f7b2c67915', 'c67178f2e372532b',
            'ca273eceea26619c', 'd186b8c721c0c207', 'eada7dd6cde0eb1e', 'f57d4f7fee6ed178',
            '06f067aa72176fba', '0a637dc5a2c898a6', '113f9804bef90dae', '1b710b35131c471b',
            '28db77f523047d84', '32caab7b40c72493', '3c9ebe0a15c9bebc', '431d67c49c100d4c',
            '4cc5d4becb3e42b6', '597f299cfc657e2a', '5fcb6fab3ad6faec', '6c44198c4a475817',
        ].map(function (k) { return LongNumber.fromString(k); });
        var H = [
            '0x8C3D37C819544DA2', '0x73E1996689DCD4D6', '0x1DFAB7AE32FF9C82',
            '0x679DD514582F9FCF', '0x0F6D2B697BD44DA8', '0x77E36F7304C48942',
            '0x3F9D85A86A1D36C8', '0x1112E6AD91D692A1'
        ].map(function (h) { return LongNumber.fromString(h); });
        //переводит, заданный текст, в строку битов
        function toBinStr(text) {
            var binStr = "";
            for (var i_1 = 0; i_1 < text.length; i_1++) {
                var symbol = text.charCodeAt(i_1).toString(2), len = Math.ceil(symbol.length / 8);
                symbol = "00000000" + symbol;
                binStr += symbol.slice(-8 * len);
            }
            return binStr;
        }
        //дополнение сообщения
        function makeMessage(text) {
            var message = toBinStr(text);
            var l = message.length.toString(2);
            message += "1"; //добавление 1
            //добавление нулевых бит для кратности 896
            var div = Math.floor(message.length / 896);
            var k = 1024 - message.length % 896;
            if (div == 0) {
                k = 896 - message.length;
            }
            while (k != 0) {
                message += "0";
                k--;
            }
            //перевод размера исходного текста в 128-битовое представление 
            var s = "";
            for (var i = 0; i < 128 - l.length; i++) {
                s += "0";
            }
            message += s + l;
            return message;
        }
        //разбиение дополненного сообщения на блоки
        function splitMessege(message) {
            var Mn = [];
            var N = Math.ceil(message.length / 1024);
            for (var i = 0; i < N; i++) {
                Mn[i] = [];
                for (var j = 0; j < 16; j++) {
                    var s = 64 * j + 1024 * i;
                    var f = 64 * (j + 1) + 1024 * i;
                    var str = message.slice(s, f);
                    Mn[i][j] = LongNumber.fromBin(str);
                }
            }
            return Mn;
        }
        var Mn = splitMessege(makeMessage(text));
        for (var i = 0; i < Mn.length; i++) {
            //1
            var W = [];
            var t = 0;
            while (t != 16) {
                W[t] = Mn[i][t];
                t++;
            }
            while (t != 80) {
                W[t] = (Sha512_224.σ1(W[t - 2]).add(W[t - 7]).add(Sha512_224.σ0(W[t - 15])).add(W[t - 16]));
                t++;
            }
            //2
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            var e = H[4];
            var f = H[5];
            var g = H[6];
            var h = H[7];
            //3 
            for (t = 0; t < 80; t++) {
                var temp1 = h.add(Sha512_224.Σ1(e)).add(Sha512_224.Ch(e, f, g)).add(K[t]).add(W[t]);
                var temp2 = Sha512_224.Σ0(a).add(Sha512_224.Maj(a, b, c));
                h = g;
                g = f;
                f = e;
                e = d.add(temp1);
                d = c;
                c = b;
                b = a;
                a = temp1.add(temp2);
            }
            //4
            H[0] = H[0].add(a);
            H[1] = H[1].add(b);
            H[2] = H[2].add(c);
            H[3] = H[3].add(d);
            H[4] = H[4].add(e);
            H[5] = H[5].add(f);
            H[6] = H[6].add(g);
            H[7] = H[7].add(h);
        }
        var hash = "";
        for (var h_1 = 0; h_1 < 3; h_1++)
            hash += H[h_1].toString();
        hash += H[3].toString().slice(0, 8);
        return hash;
    };
    Sha512_224.ROTR = function (x, n) {
        var _a;
        if (n == 0)
            return x;
        if (n == 32)
            return new LongNumber(x.lo, x.hi);
        var hi = x.hi, lo = x.lo;
        if (n > 32) {
            _a = [hi, lo], lo = _a[0], hi = _a[1]; // swap hi/lo
            n -= 32;
        }
        var hi1 = (hi >>> n) | (lo << (32 - n));
        var lo1 = (lo >>> n) | (hi << (32 - n));
        return new LongNumber(hi1, lo1);
    };
    Sha512_224.Σ0 = function (x) { return Sha512_224.ROTR(x, 28).xor(Sha512_224.ROTR(x, 34)).xor(Sha512_224.ROTR(x, 39)); };
    Sha512_224.Σ1 = function (x) { return Sha512_224.ROTR(x, 14).xor(Sha512_224.ROTR(x, 18)).xor(Sha512_224.ROTR(x, 41)); };
    Sha512_224.σ0 = function (x) { return Sha512_224.ROTR(x, 1).xor(Sha512_224.ROTR(x, 8)).xor(x.shr(7)); };
    Sha512_224.σ1 = function (x) { return Sha512_224.ROTR(x, 19).xor(Sha512_224.ROTR(x, 61)).xor(x.shr(6)); };
    Sha512_224.Ch = function (x, y, z) { return (x.and(y)).xor(x.not().and(z)); }; // 'choice'
    Sha512_224.Maj = function (x, y, z) { return (x.and(y)).xor(x.and(z)).xor(y.and(z)); }; // 'majority'
    return Sha512_224;
}());

var LongNumber = /** @class */ (function () {
    function LongNumber(hi, lo) {
        this.hi = hi >>> 0;
        this.lo = lo >>> 0;
    }
    LongNumber.fromString = function (str) {
        var hi = parseInt(str.slice(0, -8), 16);
        var lo = parseInt(str.slice(-8), 16);
        return new LongNumber(hi, lo);
    };
    LongNumber.fromBin = function (str) {
        var hi = parseInt(str.slice(0, 32), 2);
        var lo = parseInt(str.slice(-32), 2);
        return new LongNumber(hi, lo);
    };
    LongNumber.prototype.toString = function () {
        var hi = ('00000000' + this.hi.toString(16)).slice(-8);
        var lo = ('00000000' + this.lo.toString(16)).slice(-8);
        return hi + lo;
    };
    LongNumber.prototype.add = function (that) {
        var lo = this.lo + that.lo;
        var hi = this.hi + that.hi + (lo > 0x100000000 ? 1 : 0); // carry top bit if lo > 2^32
        return new LongNumber(hi >>> 0, lo >>> 0);
    };
    LongNumber.prototype.and = function (that) {
        return new LongNumber(this.hi & that.hi, this.lo & that.lo);
    };
    LongNumber.prototype.xor = function (that) {
        return new LongNumber(this.hi ^ that.hi, this.lo ^ that.lo);
    };
    LongNumber.prototype.not = function () {
        return new LongNumber(~this.hi, ~this.lo);
    };
    LongNumber.prototype.shr = function (n) {
        if (n == 0)
            return this;
        if (n == 32)
            return new LongNumber(0, this.hi);
        if (n > 32)
            return new LongNumber(0, this.hi >>> n - 32);
        /* n < 32 */ return new LongNumber(this.hi >>> n, this.lo >>> n | this.hi << (32 - n));
    };
    return LongNumber;
}());


/***/ }),

/***/ "./src/app/DSAalgorithm/Signature.ts":
/*!*******************************************!*\
  !*** ./src/app/DSAalgorithm/Signature.ts ***!
  \*******************************************/
/*! exports provided: Signature */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Signature", function() { return Signature; });
var Signature = /** @class */ (function () {
    function Signature(r, s, openKey) {
        this.r = r;
        this.s = s;
        this.openKey = openKey;
    }
    Signature.prototype.getStingR = function () {
        return this.r.toString(16);
    };
    Signature.prototype.getStingS = function () {
        return this.s.toString(16);
    };
    Signature.prototype.getStingOpenKey = function () {
        return this.openKey.toString(16);
    };
    return Signature;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var routes = [];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n\n    <!-- \n        <button class=\"checkbox icon\" (click)=\"onToggle()\">\n         <i class=\"material-icons\">{{todo.completed ? 'check_box' : 'check_box_outline_blank'}} </i>\n     </button>\n     \n     \n -->\n \n        \n\n <main>\n        <div class=\"header-h1\">\n                <h1>Алгоритм цифровой подписи DSA</h1>\n              </div>\n    \n<signature></signature>\n<verify></verify>\n<div class=\"author\">\n    <h2>Выполнил студент группы 4413 Симонов А.В.</h2>\n</div>\n</main>\n\n\n\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".material-icons {\n  font-family: 'Material Icons';\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  /* Preferred icon size */\n  display: inline-block;\n  line-height: 1;\n  text-transform: none;\n  letter-spacing: normal;\n  word-wrap: normal;\n  white-space: nowrap;\n  direction: ltr;\n  /* Support for all WebKit browsers. */\n  -webkit-font-smoothing: antialiased;\n  /* Support for Safari and Chrome. */\n  text-rendering: optimizeLegibility;\n  /* Support for Firefox. */\n  -moz-osx-font-smoothing: grayscale;\n  /* Support for IE. */\n  -webkit-font-feature-settings: 'liga';\n          font-feature-settings: 'liga'; }\n\n@font-face {\n  font-family: 'Material Icons';\n  font-style: normal;\n  font-weight: 400;\n  src: url(https://example.com/MaterialIcons-Regular.eot);\n  /* For IE6-8 */\n  src: local(\"Material Icons\"), local(\"MaterialIcons-Regular\"), url(https://example.com/MaterialIcons-Regular.woff2) format(\"woff2\"), url(https://example.com/MaterialIcons-Regular.woff) format(\"woff\"), url(https://example.com/MaterialIcons-Regular.ttf) format(\"truetype\"); }\n\n.header-h1 h1 {\n  position: relative;\n  padding-bottom: .5rem;\n  font-size: 1.5rem;\n  text-transform: uppercase;\n  text-align: center;\n  color: #b60c75; }\n\n.header-h1 h1::before {\n  content: \"\";\n  position: absolute;\n  border-bottom: 2px solid #faa341;\n  bottom: .25rem;\n  left: 50%;\n  width: 30%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%); }\n\n.header-h1 h1::after {\n  content: \"\";\n  position: absolute;\n  border-bottom: 2px solid #41e781;\n  bottom: 0;\n  left: 50%;\n  width: 15%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%); }\n\n.author h2 {\n  font-weight: 200;\n  margin: 0 0 0 10px;\n  color: #e428da;\n  text-align: center;\n  margin-bottom: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvQzpcXGRzYVxcZHNhL3NyY1xcYXBwXFxhcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDSSw4QkFBNkI7RUFDN0Isb0JBQW1CO0VBQ25CLG1CQUFrQjtFQUNsQixnQkFBZTtFQUFHLHlCQUF5QjtFQUMzQyxzQkFBcUI7RUFDckIsZUFBYztFQUNkLHFCQUFvQjtFQUNwQix1QkFBc0I7RUFDdEIsa0JBQWlCO0VBQ2pCLG9CQUFtQjtFQUNuQixlQUFjO0VBR2Qsc0NBQXNDO0VBQ3RDLG9DQUFtQztFQUNuQyxvQ0FBb0M7RUFDcEMsbUNBQWtDO0VBRWxDLDBCQUEwQjtFQUMxQixtQ0FBa0M7RUFFbEMscUJBQXFCO0VBQ3JCLHNDQUE2QjtVQUE3Qiw4QkFBNkIsRUFDOUI7O0FBQ0g7RUFDSSw4QkFBNkI7RUFDN0IsbUJBQWtCO0VBQ2xCLGlCQUFnQjtFQUNoQix3REFBdUQ7RUFBRSxlQUFlO0VBQ3hFLDhRQUl1RSxFQUFBOztBQUV6RTtFQUNFLG1CQUFrQjtFQUNsQixzQkFBcUI7RUFDckIsa0JBQWlCO0VBQ2pCLDBCQUF5QjtFQUN6QixtQkFBa0I7RUFDbEIsZUFBYyxFQUNmOztBQUNEO0VBQ0UsWUFBVztFQUNYLG1CQUFrQjtFQUNsQixpQ0FBZ0M7RUFDaEMsZUFBYztFQUNkLFVBQVM7RUFDVCxXQUFVO0VBQ1Ysb0NBQTJCO1VBQTNCLDRCQUEyQixFQUM1Qjs7QUFDRDtFQUNFLFlBQVc7RUFDWCxtQkFBa0I7RUFDbEIsaUNBQWdDO0VBQ2hDLFVBQVM7RUFDVCxVQUFTO0VBQ1QsV0FBVTtFQUNWLG9DQUEyQjtVQUEzQiw0QkFBMkIsRUFDNUI7O0FBRUQ7RUFDRSxpQkFBZ0I7RUFDaEIsbUJBQWtCO0VBQ2xCLGVBQXdCO0VBQ3hCLG1CQUFrQjtFQUNsQixvQkFBbUIsRUFDcEIiLCJmaWxlIjoic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbi5tYXRlcmlhbC1pY29ucyB7XHJcbiAgICBmb250LWZhbWlseTogJ01hdGVyaWFsIEljb25zJztcclxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBmb250LXNpemU6IDI0cHg7ICAvKiBQcmVmZXJyZWQgaWNvbiBzaXplICovXHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBsaW5lLWhlaWdodDogMTtcclxuICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IG5vcm1hbDtcclxuICAgIHdvcmQtd3JhcDogbm9ybWFsO1xyXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgIGRpcmVjdGlvbjogbHRyO1xyXG5cclxuICBcclxuICAgIC8qIFN1cHBvcnQgZm9yIGFsbCBXZWJLaXQgYnJvd3NlcnMuICovXHJcbiAgICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcclxuICAgIC8qIFN1cHBvcnQgZm9yIFNhZmFyaSBhbmQgQ2hyb21lLiAqL1xyXG4gICAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcclxuICBcclxuICAgIC8qIFN1cHBvcnQgZm9yIEZpcmVmb3guICovXHJcbiAgICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xyXG4gIFxyXG4gICAgLyogU3VwcG9ydCBmb3IgSUUuICovXHJcbiAgICBmb250LWZlYXR1cmUtc2V0dGluZ3M6ICdsaWdhJztcclxuICB9XHJcbkBmb250LWZhY2Uge1xyXG4gICAgZm9udC1mYW1pbHk6ICdNYXRlcmlhbCBJY29ucyc7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBmb250LXdlaWdodDogNDAwO1xyXG4gICAgc3JjOiB1cmwoaHR0cHM6Ly9leGFtcGxlLmNvbS9NYXRlcmlhbEljb25zLVJlZ3VsYXIuZW90KTsgLyogRm9yIElFNi04ICovXHJcbiAgICBzcmM6IGxvY2FsKCdNYXRlcmlhbCBJY29ucycpLFxyXG4gICAgICBsb2NhbCgnTWF0ZXJpYWxJY29ucy1SZWd1bGFyJyksXHJcbiAgICAgIHVybChodHRwczovL2V4YW1wbGUuY29tL01hdGVyaWFsSWNvbnMtUmVndWxhci53b2ZmMikgZm9ybWF0KCd3b2ZmMicpLFxyXG4gICAgICB1cmwoaHR0cHM6Ly9leGFtcGxlLmNvbS9NYXRlcmlhbEljb25zLVJlZ3VsYXIud29mZikgZm9ybWF0KCd3b2ZmJyksXHJcbiAgICAgIHVybChodHRwczovL2V4YW1wbGUuY29tL01hdGVyaWFsSWNvbnMtUmVndWxhci50dGYpIGZvcm1hdCgndHJ1ZXR5cGUnKTtcclxuICB9XHJcbiAgLmhlYWRlci1oMSBoMSB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogLjVyZW07XHJcbiAgICBmb250LXNpemU6IDEuNXJlbTtcclxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBjb2xvcjogI2I2MGM3NTtcclxuICB9XHJcbiAgLmhlYWRlci1oMSBoMTo6YmVmb3JlIHtcclxuICAgIGNvbnRlbnQ6IFwiXCI7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgI2ZhYTM0MTtcclxuICAgIGJvdHRvbTogLjI1cmVtO1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgd2lkdGg6IDMwJTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcclxuICB9XHJcbiAgLmhlYWRlci1oMSBoMTo6YWZ0ZXIge1xyXG4gICAgY29udGVudDogXCJcIjtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjNDFlNzgxO1xyXG4gICAgYm90dG9tOiAwO1xyXG4gICAgbGVmdDogNTAlO1xyXG4gICAgd2lkdGg6IDE1JTtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcclxuICB9XHJcbiAgXHJcbiAgLmF1dGhvciBoMntcclxuICAgIGZvbnQtd2VpZ2h0OiAyMDA7XHJcbiAgICBtYXJnaW46IDAgMCAwIDEwcHg7XHJcbiAgICBjb2xvcjogcmdiKDIyOCwgNDAsIDIxOCk7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gIH0iXX0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _verify_verify_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./verify/verify.component */ "./src/app/verify/verify.component.ts");
/* harmony import */ var _signature_signature_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./signature/signature.component */ "./src/app/signature/signature.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _verify_verify_component__WEBPACK_IMPORTED_MODULE_5__["VerifyComponent"],
                _signature_signature_component__WEBPACK_IMPORTED_MODULE_6__["SignatureComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/signature/signature.component.html":
/*!****************************************************!*\
  !*** ./src/app/signature/signature.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\"\r\n      rel=\"stylesheet\">\r\n<form class=\"signature\">\r\n  <h1>ПОДПИСЬ СООБЩЕНИЯ</h1>\r\n  <div>\r\n          <span>Введите текст, который требуется подписать</span>\r\n          <textarea name=\"title1\" [(ngModel)]=\"message\" type= \"text\" required=\"true\"></textarea> \r\n  </div>\r\n  <div>\r\n          <span class=\"title\">Придумайте пароль.  Пароль должен содержать только цифры</span>\r\n          <input  name=\"title2\" [(ngModel)]=\"privateKey\" type= \"password\" required=\"true\">\r\n         \r\n                      \r\n  </div>\r\n  <div>\r\n          <span class=\"title\">Открытый ключ   </span>\r\n          <textarea name=\"title3\"  type= \"text\" [(ngModel)]=\"openKey\" readonly=true> </textarea>\r\n  </div>\r\n  <div>\r\n          <span class=\"title\">подпись (r, s)   </span>\r\n          <textarea name=\"title4\" type= \"text\" [(ngModel)]=\"signR\" readonly=true></textarea>\r\n          <textarea name=\"title5\" type= \"text\" [(ngModel)]=\"signS\" readonly=true></textarea>\r\n         \r\n  </div>\r\n  <div class=\"but\" >\r\n          <button type=\"button\" class=\"getSignature\" (click)=\"getSignature()\" >Подписать</button>\r\n  </div>\r\n  </form>\r\n  "

/***/ }),

/***/ "./src/app/signature/signature.component.scss":
/*!****************************************************!*\
  !*** ./src/app/signature/signature.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".signature {\n  display: flex;\n  padding: 1em;\n  flex-direction: column;\n  margin-bottom: 1em;\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  border-radius: 2px;\n  width: 60%;\n  background-color: white;\n  height: 100%;\n  border-radius: 2px;\n  margin: auto; }\n\n.signature div {\n  width: 100%;\n  height: 40px; }\n\n.signature hr {\n  clear: #58a3ee;\n  width: 100%;\n  size: 2px; }\n\n.signature input {\n  float: right;\n  margin-left: 30px;\n  float: right;\n  width: 250px; }\n\n.signature textarea {\n  overflow: auto;\n  flex-direction: row;\n  margin-left: 30px;\n  float: right;\n  height: 30px;\n  width: 250px;\n  resize: none; }\n\n.signature input:focus {\n  border: 1px solid #1976D2;\n  align-items: flex-end;\n  align-self: flex-end; }\n\n.but {\n  text-align: center;\n  margin-bottom: 30px; }\n\n.signature input:focus.ng-invalid.ng-dirty {\n  border: 1px solid #dd0031; }\n\n.signature button {\n  margin: 0 auto;\n  display: inline-block;\n  margin: 10px;\n  padding: 8px 15px;\n  background: #B8ED01;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n  transition: all 0.3s ease-out;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 2px 2px rgba(0, 0, 0, 0.3), 0 0 4px 1px rgba(0, 0, 0, 0.2);\n  /* Font styles */\n  text-decoration: none;\n  text-shadow: 0 1px rgba(255, 255, 255, 0.7);\n  width: -webkit-min-content;\n  width: -moz-min-content;\n  width: min-content;\n  height: 35px; }\n\n.signature h1 {\n  font-weight: 400;\n  margin: 0 0 0 10px;\n  color: #c91986;\n  text-align: center;\n  margin-bottom: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2lnbmF0dXJlL0M6XFxkc2FcXGRzYS9zcmNcXGFwcFxcc2lnbmF0dXJlXFxzaWduYXR1cmUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxjQUFhO0VBQ2IsYUFBWTtFQUNaLHVCQUFzQjtFQUN0QixtQkFBa0I7RUFDbEIsZ0hBQWlHO0VBQ2pHLG1CQUFrQjtFQUNsQixXQUFVO0VBQ1Ysd0JBQXVCO0VBQ3ZCLGFBQVk7RUFDWixtQkFBa0I7RUFDbEIsYUFBVyxFQUVkOztBQUVEO0VBQ0ksWUFBVztFQUNYLGFBQVksRUFFZjs7QUFFRDtFQUNJLGVBQXdCO0VBQ3hCLFlBQVc7RUFDWCxVQUFTLEVBQ1o7O0FBQ0Q7RUFFSSxhQUFZO0VBQ1osa0JBQWlCO0VBQ2pCLGFBQVk7RUFDWixhQUFZLEVBRWY7O0FBQ0Q7RUFDSSxlQUFjO0VBQ2Qsb0JBQW1CO0VBQ25CLGtCQUFpQjtFQUNqQixhQUFZO0VBQ1osYUFBWTtFQUNaLGFBQVk7RUFDWixhQUFZLEVBRWY7O0FBRUQ7RUFDSSwwQkFBeUI7RUFDekIsc0JBQXFCO0VBQ3JCLHFCQUFvQixFQUV2Qjs7QUFFRDtFQUNJLG1CQUFrQjtFQUNsQixvQkFBbUIsRUFFdEI7O0FBRUQ7RUFDSSwwQkFBeUIsRUFDNUI7O0FBRUQ7RUFDRSxlQUFjO0VBQ1osc0JBQXFCO0VBQ3JCLGFBQVk7RUFDWixrQkFBaUI7RUFDakIsb0JBQW1CO0VBQ25CLHNDQUFrQztFQUNsQyxtQkFBa0I7RUFDbEIsOEJBQTZCO0VBQzdCLGlIQUcrQjtFQUMvQixpQkFBaUI7RUFDakIsc0JBQXFCO0VBQ3JCLDRDQUF3QztFQUN4QywyQkFBa0I7RUFBbEIsd0JBQWtCO0VBQWxCLG1CQUFrQjtFQUNsQixhQUFZLEVBRWY7O0FBR0Q7RUFDSSxpQkFBZ0I7RUFDaEIsbUJBQWtCO0VBQ2xCLGVBQXdCO0VBQ3hCLG1CQUFrQjtFQUNsQixvQkFBbUIsRUFDdEIiLCJmaWxlIjoic3JjL2FwcC9zaWduYXR1cmUvc2lnbmF0dXJlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNpZ25hdHVyZSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgcGFkZGluZzogMWVtO1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIG1hcmdpbi1ib3R0b206IDFlbTtcclxuICAgIGJveC1zaGFkb3c6IDAgMnB4IDJweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDNweCAxcHggLTJweCByZ2JhKDAsMCwwLC4yKSwwIDFweCA1cHggMCByZ2JhKDAsMCwwLC4xMik7XHJcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XHJcbiAgICB3aWR0aDogNjAlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XHJcbiAgICBtYXJnaW46YXV0bztcclxuXHJcbn1cclxuXHJcbi5zaWduYXR1cmUgZGl2e1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcblxyXG59IFxyXG5cclxuLnNpZ25hdHVyZSBocntcclxuICAgIGNsZWFyOiByZ2IoODgsIDE2MywgMjM4KTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgc2l6ZTogMnB4O1xyXG59XHJcbi5zaWduYXR1cmUgaW5wdXQge1xyXG5cclxuICAgIGZsb2F0OiByaWdodDtcclxuICAgIG1hcmdpbi1sZWZ0OiAzMHB4O1xyXG4gICAgZmxvYXQ6IHJpZ2h0O1xyXG4gICAgd2lkdGg6IDI1MHB4O1xyXG5cclxufVxyXG4uc2lnbmF0dXJlIHRleHRhcmVhe1xyXG4gICAgb3ZlcmZsb3c6IGF1dG87XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gICAgbWFyZ2luLWxlZnQ6IDMwcHg7XHJcbiAgICBmbG9hdDogcmlnaHQ7XHJcbiAgICBoZWlnaHQ6IDMwcHg7XHJcbiAgICB3aWR0aDogMjUwcHg7XHJcbiAgICByZXNpemU6IG5vbmU7XHJcbiAgICBcclxufVxyXG5cclxuLnNpZ25hdHVyZSBpbnB1dDpmb2N1cyB7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMTk3NkQyO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG4gICAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XHJcbiAgICBcclxufVxyXG5cclxuLmJ1dHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcblxyXG59XHJcblxyXG4uc2lnbmF0dXJlIGlucHV0OmZvY3VzLm5nLWludmFsaWQubmctZGlydHkge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgI2RkMDAzMTtcclxufVxyXG5cclxuLnNpZ25hdHVyZSBidXR0b24ge1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgbWFyZ2luOiAxMHB4O1xyXG4gICAgcGFkZGluZzogOHB4IDE1cHg7XHJcbiAgICBiYWNrZ3JvdW5kOiAjQjhFRDAxO1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLDAsMCwwLjE1KTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2Utb3V0O1xyXG4gICAgYm94LXNoYWRvdzogXHJcbiAgICAgICAgaW5zZXQgMCAxcHggMCByZ2JhKDI1NSwyNTUsMjU1LDAuNSksIFxyXG4gICAgICAgIDAgMnB4IDJweCByZ2JhKDAsMCwwLDAuMyksIFxyXG4gICAgICAgIDAgMCA0cHggMXB4IHJnYmEoMCwwLDAsMC4yKTsgXHJcbiAgICAvKiBGb250IHN0eWxlcyAqL1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgdGV4dC1zaGFkb3c6IDAgMXB4IHJnYmEoMjU1LDI1NSwyNTUsMC43KTtcclxuICAgIHdpZHRoOiBtaW4tY29udGVudDtcclxuICAgIGhlaWdodDogMzVweDtcclxuXHJcbn1cclxuXHJcblxyXG4uc2lnbmF0dXJlIGgxIHtcclxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XHJcbiAgICBtYXJnaW46IDAgMCAwIDEwcHg7XHJcbiAgICBjb2xvcjogcmdiKDIwMSwgMjUsIDEzNCk7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/signature/signature.component.ts":
/*!**************************************************!*\
  !*** ./src/app/signature/signature.component.ts ***!
  \**************************************************/
/*! exports provided: SignatureComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignatureComponent", function() { return SignatureComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _DSAalgorithm_DSA__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DSAalgorithm/DSA */ "./src/app/DSAalgorithm/DSA.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var SignatureComponent = /** @class */ (function () {
    function SignatureComponent() {
    }
    SignatureComponent.prototype.getSignature = function () {
        var dsa = new _DSAalgorithm_DSA__WEBPACK_IMPORTED_MODULE_1__["DSA"]();
        var sign = dsa.getSignature(this.message, this.privateKey);
        this.openKey = sign.getStingOpenKey();
        this.signR = sign.getStingR();
        this.signS = sign.getStingS();
        console.log('ok');
    };
    SignatureComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'signature',
            template: __webpack_require__(/*! ./signature.component.html */ "./src/app/signature/signature.component.html"),
            styles: [__webpack_require__(/*! ./signature.component.scss */ "./src/app/signature/signature.component.scss")]
        })
    ], SignatureComponent);
    return SignatureComponent;
}());



/***/ }),

/***/ "./src/app/verify/verify.component.html":
/*!**********************************************!*\
  !*** ./src/app/verify/verify.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\"\r\n      rel=\"stylesheet\">\r\n<form class=\"verify\">\r\n<h1>ПРОВЕРКА ПОДПИСИ</h1>\r\n<div>\r\n    <span class=\"title\">Введите текст, подлинность \r\n        <br> которого требуется проверить    </span>\r\n    <textarea name=\"title6\" [(ngModel)]=\"message\" type= \"text\" required=\"true\"></textarea> \r\n</div>\r\n<div>\r\n    <span class=\"title\">подпись (r, s)</span>\r\n    <textarea name=\"title7\" [(ngModel)]=\"signR\" type= \"text\" required=\"true\"></textarea> \r\n    <textarea name=\"title8\" [(ngModel)]=\"signS\" type= \"text\" required=\"true\"></textarea> \r\n</div>\r\n<div>\r\n    <span class=\"title\">Открытый ключ   </span>\r\n    <textarea name=\"title9\" [(ngModel)]=\"openKey\" type= \"text\" required=\"true\"></textarea> \r\n</div>\r\n<div>\r\n    <span class=\"title\">Результат</span>\r\n    <input name=\"title10\" type= \"text\" [(ngModel)]=\"isVerified\" readonly=true>  \r\n</div>\r\n     <div class=\"but\">\r\n     <button type=\"button\" class=\"verify\" (click)=\"verify()\">Проверить</button>\r\n</div>\r\n<span class=\"warning\">*Для проверки данные можно скопировать из поля выше</span>\r\n\r\n</form>     \r\n"

/***/ }),

/***/ "./src/app/verify/verify.component.scss":
/*!**********************************************!*\
  !*** ./src/app/verify/verify.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".verify {\n  display: flex;\n  padding: 1em;\n  flex-direction: column;\n  margin-bottom: 1em;\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  border-radius: 2px;\n  width: 60%;\n  background-color: white;\n  height: 100%;\n  border-radius: 2px;\n  margin: auto;\n  margin-top: 20px; }\n\n.verify span.warning {\n  color: #f13860; }\n\n.verify div {\n  width: 100%;\n  height: 40px;\n  margin-bottom: 20px; }\n\n.verify hr {\n  clear: #58a3ee;\n  width: 100%;\n  size: 2px; }\n\n.verify input {\n  float: right;\n  margin-left: 30px;\n  float: right;\n  width: 250px; }\n\n.verify textarea {\n  overflow: auto;\n  flex-direction: row;\n  margin-left: 30px;\n  float: right;\n  height: 30px;\n  width: 250px;\n  resize: none; }\n\n.verify input:focus {\n  border: 1px solid #1976D2;\n  align-items: flex-end;\n  align-self: flex-end; }\n\n.but {\n  text-align: center;\n  margin-bottom: 30px; }\n\n.verify input:focus.ng-invalid.ng-dirty {\n  border: 1px solid #dd0031; }\n\n.verify button {\n  margin: 0 auto;\n  display: inline-block;\n  margin: 10px;\n  padding: 8px 15px;\n  background: #B8ED01;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 4px;\n  transition: all 0.3s ease-out;\n  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 2px 2px rgba(0, 0, 0, 0.3), 0 0 4px 1px rgba(0, 0, 0, 0.2);\n  /* Font styles */\n  text-decoration: none;\n  text-shadow: 0 1px rgba(255, 255, 255, 0.7);\n  width: -webkit-min-content;\n  width: -moz-min-content;\n  width: min-content;\n  height: 35px; }\n\n.verify h1 {\n  font-weight: 400;\n  margin: 0 0 0 10px;\n  color: #c91986;\n  text-align: center;\n  margin-bottom: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmVyaWZ5L0M6XFxkc2FcXGRzYS9zcmNcXGFwcFxcdmVyaWZ5XFx2ZXJpZnkuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxjQUFhO0VBQ2IsYUFBWTtFQUNaLHVCQUFzQjtFQUN0QixtQkFBa0I7RUFDbEIsZ0hBQWlHO0VBQ2pHLG1CQUFrQjtFQUNsQixXQUFVO0VBQ1Ysd0JBQXVCO0VBQ3ZCLGFBQVk7RUFDWixtQkFBa0I7RUFDbEIsYUFBVztFQUNYLGlCQUFnQixFQUVuQjs7QUFDRDtFQUNBLGVBRUEsRUFBQzs7QUFDRDtFQUNJLFlBQVc7RUFDWCxhQUFZO0VBQ1osb0JBQW1CLEVBRXRCOztBQUVEO0VBQ0ksZUFBd0I7RUFDeEIsWUFBVztFQUNYLFVBQVMsRUFDWjs7QUFDRDtFQUVJLGFBQVk7RUFDWixrQkFBaUI7RUFDakIsYUFBWTtFQUNaLGFBQVksRUFFZjs7QUFDRDtFQUNJLGVBQWM7RUFDZCxvQkFBbUI7RUFDbkIsa0JBQWlCO0VBQ2pCLGFBQVk7RUFDWixhQUFZO0VBQ1osYUFBWTtFQUNaLGFBQVksRUFFZjs7QUFFRDtFQUNJLDBCQUF5QjtFQUN6QixzQkFBcUI7RUFDckIscUJBQW9CLEVBRXZCOztBQUVEO0VBQ0ksbUJBQWtCO0VBQ2xCLG9CQUFtQixFQUV0Qjs7QUFFRDtFQUNJLDBCQUF5QixFQUM1Qjs7QUFFRDtFQUNFLGVBQWM7RUFDWixzQkFBcUI7RUFDckIsYUFBWTtFQUNaLGtCQUFpQjtFQUNqQixvQkFBbUI7RUFDbkIsc0NBQWtDO0VBQ2xDLG1CQUFrQjtFQUNsQiw4QkFBNkI7RUFDN0IsaUhBRytCO0VBQy9CLGlCQUFpQjtFQUNqQixzQkFBcUI7RUFDckIsNENBQXdDO0VBQ3hDLDJCQUFrQjtFQUFsQix3QkFBa0I7RUFBbEIsbUJBQWtCO0VBQ2xCLGFBQVksRUFFZjs7QUFHRDtFQUNJLGlCQUFnQjtFQUNoQixtQkFBa0I7RUFDbEIsZUFBd0I7RUFDeEIsbUJBQWtCO0VBQ2xCLG9CQUFtQixFQUN0QiIsImZpbGUiOiJzcmMvYXBwL3ZlcmlmeS92ZXJpZnkuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudmVyaWZ5IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBwYWRkaW5nOiAxZW07XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMWVtO1xyXG4gICAgYm94LXNoYWRvdzogMCAycHggMnB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgM3B4IDFweCAtMnB4IHJnYmEoMCwwLDAsLjIpLDAgMXB4IDVweCAwIHJnYmEoMCwwLDAsLjEyKTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcclxuICAgIHdpZHRoOiA2MCU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcclxuICAgIG1hcmdpbjphdXRvO1xyXG4gICAgbWFyZ2luLXRvcDogMjBweDtcclxuXHJcbn1cclxuLnZlcmlmeSBzcGFuLndhcm5pbmd7XHJcbmNvbG9yOiAjZjEzODYwXHJcblxyXG59XHJcbi52ZXJpZnkgZGl2e1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG5cclxufSBcclxuXHJcbi52ZXJpZnkgaHJ7XHJcbiAgICBjbGVhcjogcmdiKDg4LCAxNjMsIDIzOCk7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIHNpemU6IDJweDtcclxufVxyXG4udmVyaWZ5IGlucHV0IHtcclxuXHJcbiAgICBmbG9hdDogcmlnaHQ7XHJcbiAgICBtYXJnaW4tbGVmdDogMzBweDtcclxuICAgIGZsb2F0OiByaWdodDtcclxuICAgIHdpZHRoOiAyNTBweDtcclxuXHJcbn1cclxuLnZlcmlmeSB0ZXh0YXJlYXtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcclxuICAgIG1hcmdpbi1sZWZ0OiAzMHB4O1xyXG4gICAgZmxvYXQ6IHJpZ2h0O1xyXG4gICAgaGVpZ2h0OiAzMHB4O1xyXG4gICAgd2lkdGg6IDI1MHB4O1xyXG4gICAgcmVzaXplOiBub25lO1xyXG4gICAgXHJcbn1cclxuXHJcbi52ZXJpZnkgaW5wdXQ6Zm9jdXMge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgIzE5NzZEMjtcclxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcclxuICAgIGFsaWduLXNlbGY6IGZsZXgtZW5kO1xyXG4gICAgXHJcbn1cclxuXHJcbi5idXR7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG5cclxufVxyXG5cclxuLnZlcmlmeSBpbnB1dDpmb2N1cy5uZy1pbnZhbGlkLm5nLWRpcnR5IHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZDAwMzE7XHJcbn1cclxuXHJcbi52ZXJpZnkgYnV0dG9uIHtcclxuICBtYXJnaW46IDAgYXV0bztcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIG1hcmdpbjogMTBweDtcclxuICAgIHBhZGRpbmc6IDhweCAxNXB4O1xyXG4gICAgYmFja2dyb3VuZDogI0I4RUQwMTtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4xNSk7XHJcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLW91dDtcclxuICAgIGJveC1zaGFkb3c6IFxyXG4gICAgICAgIGluc2V0IDAgMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwwLjUpLCBcclxuICAgICAgICAwIDJweCAycHggcmdiYSgwLDAsMCwwLjMpLCBcclxuICAgICAgICAwIDAgNHB4IDFweCByZ2JhKDAsMCwwLDAuMik7IFxyXG4gICAgLyogRm9udCBzdHlsZXMgKi9cclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIHRleHQtc2hhZG93OiAwIDFweCByZ2JhKDI1NSwyNTUsMjU1LDAuNyk7XHJcbiAgICB3aWR0aDogbWluLWNvbnRlbnQ7XHJcbiAgICBoZWlnaHQ6IDM1cHg7XHJcblxyXG59XHJcblxyXG5cclxuLnZlcmlmeSBoMSB7XHJcbiAgICBmb250LXdlaWdodDogNDAwO1xyXG4gICAgbWFyZ2luOiAwIDAgMCAxMHB4O1xyXG4gICAgY29sb3I6IHJnYigyMDEsIDI1LCAxMzQpO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/verify/verify.component.ts":
/*!********************************************!*\
  !*** ./src/app/verify/verify.component.ts ***!
  \********************************************/
/*! exports provided: VerifyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerifyComponent", function() { return VerifyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _DSAalgorithm_DSA__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../DSAalgorithm/DSA */ "./src/app/DSAalgorithm/DSA.ts");
/* harmony import */ var _DSAalgorithm_Signature__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DSAalgorithm/Signature */ "./src/app/DSAalgorithm/Signature.ts");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! big-integer */ "./node_modules/big-integer/BigInteger.js");
/* harmony import */ var big_integer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(big_integer__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var VerifyComponent = /** @class */ (function () {
    function VerifyComponent() {
    }
    VerifyComponent.prototype.verify = function () {
        var dsa = new _DSAalgorithm_DSA__WEBPACK_IMPORTED_MODULE_1__["DSA"]();
        var isVerified = dsa.verify(this.message, new _DSAalgorithm_Signature__WEBPACK_IMPORTED_MODULE_2__["Signature"](big_integer__WEBPACK_IMPORTED_MODULE_3__(this.signR, 16), big_integer__WEBPACK_IMPORTED_MODULE_3__(this.signS, 16), big_integer__WEBPACK_IMPORTED_MODULE_3__(this.openKey, 16)));
        if (isVerified == true)
            this.isVerified = "Текст подлинный";
        else
            this.isVerified = "Текст подделан";
        console.log('ok');
    };
    VerifyComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'verify',
            template: __webpack_require__(/*! ./verify.component.html */ "./src/app/verify/verify.component.html"),
            styles: [__webpack_require__(/*! ./verify.component.scss */ "./src/app/verify/verify.component.scss")]
        })
    ], VerifyComponent);
    return VerifyComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\dsa\dsa\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map