'use strict';const a518_0x1ada=['disconnect','forEach','metadata','__decorate','../services/socket-user.service','2\x20minutes','getOwnPropertyDescriptor','socketUserService','function','../../auth/services','Injectable','handler','__esModule','defineProperty','log','agendaService','handshake','getConnectedSocket','35599iBZhjk','1575421xlpvCg','define','decorate','length','SocketUserTask','__param','1242717BSSDXN','AuthService','authService','120679WMfxYH','AgendaService','DISCONENNCT_OFFLINE_SOCKET_ISCHEDULE','Inject','__metadata','object','512885RhYOkh','design:paramtypes','forwardRef','4BjXgVH','token','map','verifyJWT','query','238979tQYdod','938768fcRqhF','SocketUserService','@nestjs/common','bind','1eFiMDl'];const a518_0x5677c8=a518_0x1608;(function(_0x3d07c7,_0xe955b1){const _0x5a15ac=a518_0x1608;while(!![]){try{const _0x4f02ee=parseInt(_0x5a15ac(0x177))*-parseInt(_0x5a15ac(0x180))+-parseInt(_0x5a15ac(0x155))+parseInt(_0x5a15ac(0x16d))+parseInt(_0x5a15ac(0x174))+-parseInt(_0x5a15ac(0x17d))+-parseInt(_0x5a15ac(0x156))+parseInt(_0x5a15ac(0x15a))*parseInt(_0x5a15ac(0x16e));if(_0x4f02ee===_0xe955b1)break;else _0x3d07c7['push'](_0x3d07c7['shift']());}catch(_0x56a3c8){_0x3d07c7['push'](_0x3d07c7['shift']());}}}(a518_0x1ada,0xa61c5));var __decorate=this&&this[a518_0x5677c8(0x15e)]||function(_0x4ac423,_0x3e0bfc,_0x4c1677,_0xf65b95){const _0x1a0d41=a518_0x5677c8;var _0x2ab0de=arguments[_0x1a0d41(0x171)],_0x95dae7=_0x2ab0de<0x3?_0x3e0bfc:_0xf65b95===null?_0xf65b95=Object[_0x1a0d41(0x161)](_0x3e0bfc,_0x4c1677):_0xf65b95,_0x5c0177;if(typeof Reflect==='object'&&typeof Reflect[_0x1a0d41(0x170)]===_0x1a0d41(0x163))_0x95dae7=Reflect['decorate'](_0x4ac423,_0x3e0bfc,_0x4c1677,_0xf65b95);else{for(var _0x2aa013=_0x4ac423['length']-0x1;_0x2aa013>=0x0;_0x2aa013--)if(_0x5c0177=_0x4ac423[_0x2aa013])_0x95dae7=(_0x2ab0de<0x3?_0x5c0177(_0x95dae7):_0x2ab0de>0x3?_0x5c0177(_0x3e0bfc,_0x4c1677,_0x95dae7):_0x5c0177(_0x3e0bfc,_0x4c1677))||_0x95dae7;}return _0x2ab0de>0x3&&_0x95dae7&&Object[_0x1a0d41(0x168)](_0x3e0bfc,_0x4c1677,_0x95dae7),_0x95dae7;},__metadata=this&&this[a518_0x5677c8(0x17b)]||function(_0x1aa3c2,_0x195dfa){const _0x5db67d=a518_0x5677c8;if(typeof Reflect===_0x5db67d(0x17c)&&typeof Reflect[_0x5db67d(0x15d)]===_0x5db67d(0x163))return Reflect['metadata'](_0x1aa3c2,_0x195dfa);},__param=this&&this[a518_0x5677c8(0x173)]||function(_0x60dbd9,_0x59a208){return function(_0x25f6e3,_0x597310){_0x59a208(_0x25f6e3,_0x597310,_0x60dbd9);};};Object[a518_0x5677c8(0x168)](exports,a518_0x5677c8(0x167),{'value':!![]}),exports[a518_0x5677c8(0x172)]=exports[a518_0x5677c8(0x179)]=void 0x0;const common_1=require(a518_0x5677c8(0x158)),agenda_1=require('../../../kernel/infras/agenda'),services_1=require(a518_0x5677c8(0x164)),socket_user_service_1=require(a518_0x5677c8(0x15f));function a518_0x1608(_0x1f0bea,_0x5da41a){return a518_0x1608=function(_0x1ada5a,_0x1608ec){_0x1ada5a=_0x1ada5a-0x153;let _0x1ab0e0=a518_0x1ada[_0x1ada5a];return _0x1ab0e0;},a518_0x1608(_0x1f0bea,_0x5da41a);}exports[a518_0x5677c8(0x179)]=a518_0x5677c8(0x179);let SocketUserTask=class SocketUserTask{constructor(_0xb916f4,_0x451a83,_0x27c224){const _0xeffa99=a518_0x5677c8;this['authService']=_0xb916f4,this[_0xeffa99(0x16a)]=_0x451a83,this[_0xeffa99(0x162)]=_0x27c224,this['agendaService'][_0xeffa99(0x16f)](exports[_0xeffa99(0x179)],{},this[_0xeffa99(0x166)][_0xeffa99(0x159)](this)),this[_0xeffa99(0x16a)]['every'](_0xeffa99(0x160),exports[_0xeffa99(0x179)]);}async[a518_0x5677c8(0x166)](_0x42568f,_0x470655){const _0x484368=a518_0x5677c8;try{const _0x302882=await this['socketUserService'][_0x484368(0x16c)](),_0xd87619=Object['keys'](_0x302882)[_0x484368(0x182)](_0x3f50a1=>_0x3f50a1);_0xd87619[_0x484368(0x171)]&&_0xd87619[_0x484368(0x15c)](_0x154001=>{const _0x2d2d19=_0x484368;if(_0x302882[_0x154001][_0x2d2d19(0x16b)][_0x2d2d19(0x154)]['token']){const _0x4c1421=this[_0x2d2d19(0x176)][_0x2d2d19(0x153)](_0x302882[_0x154001][_0x2d2d19(0x16b)][_0x2d2d19(0x154)][_0x2d2d19(0x181)]);!_0x4c1421&&_0x302882[_0x154001][_0x2d2d19(0x15b)](!![]);}});}catch(_0x480b9e){console[_0x484368(0x169)](_0x480b9e);}finally{_0x470655();}}};SocketUserTask=__decorate([common_1[a518_0x5677c8(0x165)](),__param(0x0,common_1[a518_0x5677c8(0x17a)](common_1[a518_0x5677c8(0x17f)](()=>services_1['AuthService']))),__metadata(a518_0x5677c8(0x17e),[services_1[a518_0x5677c8(0x175)],agenda_1[a518_0x5677c8(0x178)],socket_user_service_1[a518_0x5677c8(0x157)]])],SocketUserTask),exports['SocketUserTask']=SocketUserTask;