'use strict';const a328_0xde1b=['82VMrTFR','../../../kernel','bind','../providers','length','metadata','performer','performerModel','__metadata','../../socket/services/socket-user.service','findOne','function','1672oOfSII','OFFLINE','__decorate','object','design:paramtypes','Model','@nestjs/common','socketUserService','toSearchResponse','2353346irXMPH','DISCONNECTED','../dtos','89913dflNCr','33049hHUdLR','__param','7rLCric','QueueEventService','__esModule','13502ynqjex','queueEventService','mongoose','USER_SOCKET_EVENT','Inject','../../socket/constants','PerformerConnectedListener','359985lRphbc','decorate','1402944iHEgAx','updateOne','eventName','7axKXvA','defineProperty','HANDLE_PERFORMER_ONLINE_OFFLINE','subscribe','PERFORMER_MODEL_PROVIDER','getOwnPropertyDescriptor','data','826bRaXcE','modelUpdateStatus','CONNECTED','handleOnlineOffline'];function a328_0x174b(_0x29f65e,_0x283a1b){return a328_0x174b=function(_0xde1bec,_0x174bb1){_0xde1bec=_0xde1bec-0x12b;let _0x37124f=a328_0xde1b[_0xde1bec];return _0x37124f;},a328_0x174b(_0x29f65e,_0x283a1b);}const a328_0x471948=a328_0x174b;(function(_0x4c10ed,_0x1ba3d0){const _0x4e4d06=a328_0x174b;while(!![]){try{const _0x5a35e8=-parseInt(_0x4e4d06(0x144))+parseInt(_0x4e4d06(0x15e))*parseInt(_0x4e4d06(0x14e))+parseInt(_0x4e4d06(0x142))+-parseInt(_0x4e4d06(0x152))*parseInt(_0x4e4d06(0x13b))+parseInt(_0x4e4d06(0x136))*-parseInt(_0x4e4d06(0x147))+parseInt(_0x4e4d06(0x138))*-parseInt(_0x4e4d06(0x135))+parseInt(_0x4e4d06(0x132));if(_0x5a35e8===_0x1ba3d0)break;else _0x4c10ed['push'](_0x4c10ed['shift']());}catch(_0x1b4bf1){_0x4c10ed['push'](_0x4c10ed['shift']());}}}(a328_0xde1b,0xb0a69));var __decorate=this&&this[a328_0x471948(0x12b)]||function(_0x5238db,_0x23c724,_0x2cb1a4,_0x70ec50){const _0x223738=a328_0x471948;var _0x5ad57e=arguments[_0x223738(0x156)],_0x5d89b9=_0x5ad57e<0x3?_0x23c724:_0x70ec50===null?_0x70ec50=Object[_0x223738(0x14c)](_0x23c724,_0x2cb1a4):_0x70ec50,_0x23a35a;if(typeof Reflect===_0x223738(0x12c)&&typeof Reflect[_0x223738(0x143)]===_0x223738(0x15d))_0x5d89b9=Reflect[_0x223738(0x143)](_0x5238db,_0x23c724,_0x2cb1a4,_0x70ec50);else{for(var _0xac2470=_0x5238db[_0x223738(0x156)]-0x1;_0xac2470>=0x0;_0xac2470--)if(_0x23a35a=_0x5238db[_0xac2470])_0x5d89b9=(_0x5ad57e<0x3?_0x23a35a(_0x5d89b9):_0x5ad57e>0x3?_0x23a35a(_0x23c724,_0x2cb1a4,_0x5d89b9):_0x23a35a(_0x23c724,_0x2cb1a4))||_0x5d89b9;}return _0x5ad57e>0x3&&_0x5d89b9&&Object[_0x223738(0x148)](_0x23c724,_0x2cb1a4,_0x5d89b9),_0x5d89b9;},__metadata=this&&this[a328_0x471948(0x15a)]||function(_0x14c88c,_0x2f4fec){const _0x3ec3ff=a328_0x471948;if(typeof Reflect===_0x3ec3ff(0x12c)&&typeof Reflect[_0x3ec3ff(0x157)]===_0x3ec3ff(0x15d))return Reflect['metadata'](_0x14c88c,_0x2f4fec);},__param=this&&this[a328_0x471948(0x137)]||function(_0x51caa0,_0x34c3d8){return function(_0x606261,_0x2f773c){_0x34c3d8(_0x606261,_0x2f773c,_0x51caa0);};};Object['defineProperty'](exports,a328_0x471948(0x13a),{'value':!![]}),exports[a328_0x471948(0x141)]=void 0x0;const common_1=require(a328_0x471948(0x12f)),kernel_1=require(a328_0x471948(0x153)),mongoose_1=require(a328_0x471948(0x13d)),constants_1=require(a328_0x471948(0x140)),socket_user_service_1=require(a328_0x471948(0x15b)),constant_1=require('../../stream/constant'),providers_1=require(a328_0x471948(0x155)),dtos_1=require(a328_0x471948(0x134)),HANDLE_PERFORMER_ONLINE_OFFLINE=a328_0x471948(0x149);let PerformerConnectedListener=class PerformerConnectedListener{constructor(_0xace48c,_0x1dfb62,_0x4337ca){const _0x1ad07c=a328_0x471948;this[_0x1ad07c(0x13c)]=_0xace48c,this[_0x1ad07c(0x130)]=_0x1dfb62,this[_0x1ad07c(0x159)]=_0x4337ca,this[_0x1ad07c(0x13c)][_0x1ad07c(0x14a)](constants_1['PERFORMER_SOCKET_CONNECTED_CHANNEL'],HANDLE_PERFORMER_ONLINE_OFFLINE,this['handleOnlineOffline'][_0x1ad07c(0x154)](this));}async[a328_0x471948(0x151)](_0x4fdc20){const _0x80684d=a328_0x471948,{source:_0x115726,sourceId:_0xc1d85a}=_0x4fdc20[_0x80684d(0x14d)];if(_0x115726!==_0x80684d(0x158))return;const _0x20c415=await this[_0x80684d(0x159)][_0x80684d(0x15c)]({'_id':_0xc1d85a});if(!_0x20c415)return;let _0x41a049={};switch(_0x4fdc20[_0x80684d(0x146)]){case constants_1[_0x80684d(0x13e)][_0x80684d(0x150)]:_0x41a049={'isOnline':!![],'onlineAt':new Date(),'offlineAt':null};break;case constants_1[_0x80684d(0x13e)][_0x80684d(0x133)]:_0x41a049={'isOnline':![],'streamingStatus':constant_1[_0x80684d(0x15f)],'onlineAt':null,'offlineAt':new Date()};break;default:return;}await this[_0x80684d(0x159)][_0x80684d(0x145)]({'_id':_0xc1d85a},_0x41a049,{'upsert':![]}),await this['socketUserService']['emitToConnectedUsers'](_0x80684d(0x14f),{'status':_0x4fdc20[_0x80684d(0x146)],'performer':new dtos_1['PerformerDto'](_0x20c415)[_0x80684d(0x131)](),'id':_0xc1d85a});}};PerformerConnectedListener=__decorate([common_1['Injectable'](),__param(0x2,common_1[a328_0x471948(0x13f)](providers_1[a328_0x471948(0x14b)])),__metadata(a328_0x471948(0x12d),[kernel_1[a328_0x471948(0x139)],socket_user_service_1['SocketUserService'],mongoose_1[a328_0x471948(0x12e)]])],PerformerConnectedListener),exports[a328_0x471948(0x141)]=PerformerConnectedListener;