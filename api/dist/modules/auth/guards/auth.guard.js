'use strict';const a73_0x399d=['1SGBjFY','decorate','1489361brFHJP','118983asbOkN','design:paramtypes','length','defineProperty','authUser','AuthService','609511NOrdGf','17qCTLEU','authorization','canActivate','getSourceFromJWT','headers','824242ygXgjz','1bjRxzx','verifyJWT','user','21IeTnRM','13758WuWqnx','function','metadata','1wZiTtF','34601ZYxwop','__esModule','authService','1343971OzlJqY','object','jwToken','AuthGuard','38rKZCkt','active','__metadata','switchToHttp','@nestjs/common','getRequest','__decorate'];const a73_0x47c9e0=a73_0x57a6;(function(_0x2f71c3,_0x396be6){const _0x4da42b=a73_0x57a6;while(!![]){try{const _0x4fdd92=-parseInt(_0x4da42b(0x157))*-parseInt(_0x4da42b(0x14c))+-parseInt(_0x4da42b(0x153))+-parseInt(_0x4da42b(0x160))*-parseInt(_0x4da42b(0x15e))+-parseInt(_0x4da42b(0x14b))*-parseInt(_0x4da42b(0x150))+-parseInt(_0x4da42b(0x147))*-parseInt(_0x4da42b(0x148))+parseInt(_0x4da42b(0x167))*parseInt(_0x4da42b(0x14f))+parseInt(_0x4da42b(0x161))*-parseInt(_0x4da42b(0x168));if(_0x4fdd92===_0x396be6)break;else _0x2f71c3['push'](_0x2f71c3['shift']());}catch(_0x1696a3){_0x2f71c3['push'](_0x2f71c3['shift']());}}}(a73_0x399d,0xc4be1));var __decorate=this&&this[a73_0x47c9e0(0x15d)]||function(_0x9aacf7,_0x5ac08b,_0x251b92,_0x14e42a){const _0x109106=a73_0x47c9e0;var _0x108fe4=arguments[_0x109106(0x163)],_0x41900c=_0x108fe4<0x3?_0x5ac08b:_0x14e42a===null?_0x14e42a=Object['getOwnPropertyDescriptor'](_0x5ac08b,_0x251b92):_0x14e42a,_0xf7e731;if(typeof Reflect===_0x109106(0x154)&&typeof Reflect['decorate']===_0x109106(0x14d))_0x41900c=Reflect[_0x109106(0x15f)](_0x9aacf7,_0x5ac08b,_0x251b92,_0x14e42a);else{for(var _0x55c170=_0x9aacf7['length']-0x1;_0x55c170>=0x0;_0x55c170--)if(_0xf7e731=_0x9aacf7[_0x55c170])_0x41900c=(_0x108fe4<0x3?_0xf7e731(_0x41900c):_0x108fe4>0x3?_0xf7e731(_0x5ac08b,_0x251b92,_0x41900c):_0xf7e731(_0x5ac08b,_0x251b92))||_0x41900c;}return _0x108fe4>0x3&&_0x41900c&&Object[_0x109106(0x164)](_0x5ac08b,_0x251b92,_0x41900c),_0x41900c;},__metadata=this&&this[a73_0x47c9e0(0x159)]||function(_0x3b6f3f,_0x41461c){const _0x4eca8d=a73_0x47c9e0;if(typeof Reflect===_0x4eca8d(0x154)&&typeof Reflect[_0x4eca8d(0x14e)]===_0x4eca8d(0x14d))return Reflect[_0x4eca8d(0x14e)](_0x3b6f3f,_0x41461c);};function a73_0x57a6(_0x5b364f,_0x4e974c){return a73_0x57a6=function(_0x399dbf,_0x57a681){_0x399dbf=_0x399dbf-0x147;let _0x3ee8a9=a73_0x399d[_0x399dbf];return _0x3ee8a9;},a73_0x57a6(_0x5b364f,_0x4e974c);}Object[a73_0x47c9e0(0x164)](exports,a73_0x47c9e0(0x151),{'value':!![]}),exports[a73_0x47c9e0(0x156)]=void 0x0;const common_1=require(a73_0x47c9e0(0x15b)),services_1=require('../services');let AuthGuard=class AuthGuard{constructor(_0x5b196b){const _0x2db6d6=a73_0x47c9e0;this[_0x2db6d6(0x152)]=_0x5b196b;}async[a73_0x47c9e0(0x16a)](_0x1f338e){const _0x2e50fd=a73_0x47c9e0,_0x5d07f6=_0x1f338e[_0x2e50fd(0x15a)]()[_0x2e50fd(0x15c)]();if(!_0x5d07f6[_0x2e50fd(0x16c)]['authorization'])return![];const _0x99bfdd=this[_0x2e50fd(0x152)][_0x2e50fd(0x149)](_0x5d07f6[_0x2e50fd(0x16c)][_0x2e50fd(0x169)]);if(!_0x99bfdd)return![];const _0x3cc84b=_0x5d07f6[_0x2e50fd(0x14a)]||await this['authService'][_0x2e50fd(0x16b)](_0x5d07f6[_0x2e50fd(0x16c)]['authorization']);if(!_0x3cc84b||_0x3cc84b['status']!==_0x2e50fd(0x158))return![];return _0x5d07f6['user']=_0x5d07f6[_0x2e50fd(0x14a)]||_0x3cc84b,_0x5d07f6['authUser']=_0x5d07f6[_0x2e50fd(0x165)]||_0x99bfdd,_0x5d07f6[_0x2e50fd(0x155)]=_0x5d07f6[_0x2e50fd(0x155)]||_0x5d07f6[_0x2e50fd(0x16c)][_0x2e50fd(0x169)],!![];}};AuthGuard=__decorate([common_1['Injectable'](),__metadata(a73_0x47c9e0(0x162),[services_1[a73_0x47c9e0(0x166)]])],AuthGuard),exports['AuthGuard']=AuthGuard;