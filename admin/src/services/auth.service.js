'use strict';const a51_0x441f=['getToken','removeToken','7lDQHui','setToken','AuthService','428367uMyuyK','1600180pHwNYt','getItem','/auth/users/me/password','get','setAuthHeaderToken','1FJXPVn','__esModule','post','/auth/users/login','put','/auth/users/forgot','./api-request','forgotPassword','set','4ECzgsm','1OlcHek','authService','224614TpGInc','APIRequest','400578cxzzGQ','browser','1gvMTPG','default','updatePassword','js-cookie','7211ffPfLC','defineProperty','setItem','34873SCaJnG','1194047ozcsqB','TOKEN'];const a51_0x420696=a51_0x138a;(function(_0x184cd9,_0x381f86){const _0x219c84=a51_0x138a;while(!![]){try{const _0x3302b5=-parseInt(_0x219c84(0x1f3))*-parseInt(_0x219c84(0x1f8))+-parseInt(_0x219c84(0x20b))*parseInt(_0x219c84(0x1f4))+-parseInt(_0x219c84(0x201))*parseInt(_0x219c84(0x20f))+-parseInt(_0x219c84(0x1fb))*-parseInt(_0x219c84(0x1ec))+parseInt(_0x219c84(0x1f0))*parseInt(_0x219c84(0x20a))+parseInt(_0x219c84(0x20d))+parseInt(_0x219c84(0x1fc));if(_0x3302b5===_0x381f86)break;else _0x184cd9['push'](_0x184cd9['shift']());}catch(_0x1d8d47){_0x184cd9['push'](_0x184cd9['shift']());}}}(a51_0x441f,0xe36a3));function a51_0x138a(_0x37e739,_0x4cf067){return a51_0x138a=function(_0x441f08,_0x138ad9){_0x441f08=_0x441f08-0x1eb;let _0x51e709=a51_0x441f[_0x441f08];return _0x51e709;},a51_0x138a(_0x37e739,_0x4cf067);}var __importDefault=this&&this['__importDefault']||function(_0x4123da){const _0x2b23af=a51_0x138a;return _0x4123da&&_0x4123da[_0x2b23af(0x202)]?_0x4123da:{'default':_0x4123da};};Object[a51_0x420696(0x1f1)](exports,'__esModule',{'value':!![]}),exports[a51_0x420696(0x20c)]=exports[a51_0x420696(0x1fa)]=void 0x0;const js_cookie_1=__importDefault(require(a51_0x420696(0x1ef))),api_request_1=require(a51_0x420696(0x207));class AuthService extends api_request_1[a51_0x420696(0x20e)]{async['login'](_0x32e826){const _0x3bd42d=a51_0x420696;return this['post'](_0x3bd42d(0x204),_0x32e826);}[a51_0x420696(0x1f9)](_0x265d3e){const _0x58b078=a51_0x420696;process[_0x58b078(0x1eb)]&&localStorage[_0x58b078(0x1f2)](api_request_1[_0x58b078(0x1f5)],_0x265d3e),js_cookie_1['default'][_0x58b078(0x209)](api_request_1[_0x58b078(0x1f5)],_0x265d3e),this[_0x58b078(0x200)](_0x265d3e);}[a51_0x420696(0x1f6)](){const _0x49f95c=a51_0x420696,_0x5d6593=js_cookie_1[_0x49f95c(0x1ed)][_0x49f95c(0x1ff)](api_request_1[_0x49f95c(0x1f5)]);if(_0x5d6593)return _0x5d6593;return!_0x5d6593&&process[_0x49f95c(0x1eb)]?localStorage[_0x49f95c(0x1fd)](api_request_1[_0x49f95c(0x1f5)]):null;}[a51_0x420696(0x1f7)](){const _0x4992d0=a51_0x420696;js_cookie_1[_0x4992d0(0x1ed)]['remove'](api_request_1[_0x4992d0(0x1f5)]),process[_0x4992d0(0x1eb)]&&localStorage['removeItem'](api_request_1[_0x4992d0(0x1f5)]);}[a51_0x420696(0x1ee)](_0x2b2c29,_0x1ca330,_0x5ee8b0){const _0x102e77=a51_0x420696,_0x4cdfb9=_0x1ca330?'/auth/users/password':_0x102e77(0x1fe);return this[_0x102e77(0x205)](_0x4cdfb9,{'userId':_0x1ca330,'password':_0x2b2c29,'source':_0x5ee8b0});}[a51_0x420696(0x208)](_0x545690,_0x3430cb){const _0x16bc8b=a51_0x420696,_0x3aefcd={'email':_0x545690,'type':_0x3430cb};return this[_0x16bc8b(0x203)](_0x16bc8b(0x206),_0x3aefcd);}}exports[a51_0x420696(0x1fa)]=AuthService,exports[a51_0x420696(0x20c)]=new AuthService();