'use strict';const a363_0x4150=['performerService','design:paramtypes','redisService','SocketUserService','__esModule','define','@nestjs/common','metadata','124WMwtRh','find','142225HjwpAE','305395DyhkhJ','agendaService','206374tUqxoY','data','socketUserService','function','PerformerService','getOwnPropertyDescriptor','srem','offline','log','../../socket/services/socket-user.service','121531CvLPoX','PerformerTask','forEach','assign','decorate','../../../kernel/infras/agenda','length','2\x20minutes','modelOnlineStatusHandler','2mNwCcj','../services','197207kzurFW','5631ELnWRB','194274zfvNAr','__metadata','CHECK_ONLINE_STATUS_SCHEDULE','object','RedisService','smembers','getConnectedSocket','bind','all','attrs','keys','every','_id','map'];const a363_0x57f1e4=a363_0x4d0d;(function(_0x5a35da,_0xd6df3a){const _0x39443f=a363_0x4d0d;while(!![]){try{const _0x5ec6d8=parseInt(_0x39443f(0x20d))+parseInt(_0x39443f(0x1f3))+parseInt(_0x39443f(0x20b))+-parseInt(_0x39443f(0x1f6))+-parseInt(_0x39443f(0x200))*-parseInt(_0x39443f(0x209))+parseInt(_0x39443f(0x1f4))+-parseInt(_0x39443f(0x1f1))*parseInt(_0x39443f(0x20c));if(_0x5ec6d8===_0xd6df3a)break;else _0x5a35da['push'](_0x5a35da['shift']());}catch(_0x2f75de){_0x5a35da['push'](_0x5a35da['shift']());}}}(a363_0x4150,0x2b589));function a363_0x4d0d(_0x2fbabc,_0xc7b55b){return a363_0x4d0d=function(_0x415034,_0x4d0d70){_0x415034=_0x415034-0x1de;let _0x2ac5f6=a363_0x4150[_0x415034];return _0x2ac5f6;},a363_0x4d0d(_0x2fbabc,_0xc7b55b);}var __decorate=this&&this['__decorate']||function(_0x4121c9,_0x3cbb11,_0x3bcfd8,_0x18f2ef){const _0x291f32=a363_0x4d0d;var _0x2268c3=arguments['length'],_0x59a0b6=_0x2268c3<0x3?_0x3cbb11:_0x18f2ef===null?_0x18f2ef=Object[_0x291f32(0x1fb)](_0x3cbb11,_0x3bcfd8):_0x18f2ef,_0x28b340;if(typeof Reflect===_0x291f32(0x1de)&&typeof Reflect[_0x291f32(0x204)]==='function')_0x59a0b6=Reflect[_0x291f32(0x204)](_0x4121c9,_0x3cbb11,_0x3bcfd8,_0x18f2ef);else{for(var _0x633dc9=_0x4121c9['length']-0x1;_0x633dc9>=0x0;_0x633dc9--)if(_0x28b340=_0x4121c9[_0x633dc9])_0x59a0b6=(_0x2268c3<0x3?_0x28b340(_0x59a0b6):_0x2268c3>0x3?_0x28b340(_0x3cbb11,_0x3bcfd8,_0x59a0b6):_0x28b340(_0x3cbb11,_0x3bcfd8))||_0x59a0b6;}return _0x2268c3>0x3&&_0x59a0b6&&Object['defineProperty'](_0x3cbb11,_0x3bcfd8,_0x59a0b6),_0x59a0b6;},__metadata=this&&this[a363_0x57f1e4(0x20e)]||function(_0x32a2cb,_0x3409e8){const _0x4fbd39=a363_0x57f1e4;if(typeof Reflect===_0x4fbd39(0x1de)&&typeof Reflect[_0x4fbd39(0x1f0)]===_0x4fbd39(0x1f9))return Reflect[_0x4fbd39(0x1f0)](_0x32a2cb,_0x3409e8);};Object['defineProperty'](exports,a363_0x57f1e4(0x1ed),{'value':!![]}),exports['PerformerTask']=exports['CHECK_ONLINE_STATUS_SCHEDULE']=void 0x0;const common_1=require(a363_0x57f1e4(0x1ef)),agenda_1=require(a363_0x57f1e4(0x205)),lodash_1=require('lodash'),nestjs_redis_1=require('nestjs-redis'),socket_user_service_1=require(a363_0x57f1e4(0x1ff)),services_1=require(a363_0x57f1e4(0x20a));exports[a363_0x57f1e4(0x20f)]=a363_0x57f1e4(0x20f);let PerformerTask=class PerformerTask{constructor(_0x202f8b,_0xa6a4c,_0x2afba1,_0x170eaf){const _0x5cb17a=a363_0x57f1e4;this[_0x5cb17a(0x1eb)]=_0x202f8b,this[_0x5cb17a(0x1f5)]=_0xa6a4c,this['socketUserService']=_0x2afba1,this[_0x5cb17a(0x1e9)]=_0x170eaf,this[_0x5cb17a(0x1f5)][_0x5cb17a(0x1ee)](exports[_0x5cb17a(0x20f)],{},this['modelOnlineStatusHandler'][_0x5cb17a(0x1e2)](this)),this[_0x5cb17a(0x1f5)][_0x5cb17a(0x1e6)](_0x5cb17a(0x207),exports[_0x5cb17a(0x20f)]);}async[a363_0x57f1e4(0x208)](_0x5e7000,_0xbf3bfb){const _0x361706=a363_0x57f1e4;try{const _0x50a468=_0x5e7000[_0x361706(0x1e4)][_0x361706(0x1f7)],_0xffc87=await this[_0x361706(0x1e9)][_0x361706(0x1f2)](Object['assign'](Object[_0x361706(0x203)]({},_0x50a468),{'isOnline':!![]}));if(!_0xffc87[_0x361706(0x206)])return;const _0x12e4b0=this[_0x361706(0x1eb)]['getClient'](),_0x3d1bb2=[],_0x1a9729=await this[_0x361706(0x1f8)][_0x361706(0x1e1)](),_0x42b619=Object[_0x361706(0x1e5)](_0x1a9729)[_0x361706(0x1e8)](_0x176dd6=>_0x176dd6),_0x3b4112={};let _0x2fcd8e=await Promise['all'](_0xffc87['map'](_0x183592=>_0x12e4b0['smembers'](_0x183592[_0x361706(0x1e7)])));_0x2fcd8e['forEach']((_0x40849e,_0x2b0529)=>{const _0x2e171c=_0x361706;_0x3b4112[_0xffc87[_0x2b0529][_0x2e171c(0x1e7)]]=_0x40849e;}),!_0x42b619[_0x361706(0x206)]?await Promise[_0x361706(0x1e3)](_0xffc87[_0x361706(0x1e8)](_0x3614d3=>_0x3b4112[_0x3614d3[_0x361706(0x1e7)]][_0x361706(0x206)]&&_0x12e4b0[_0x361706(0x1fc)](_0x3614d3[_0x361706(0x1e7)],_0x3b4112[_0x3614d3['_id']]))):(Object['keys'](_0x3b4112)[_0x361706(0x202)](_0x500090=>{const _0x6ca070=_0x361706,_0x4d4262=lodash_1['difference'](_0x3b4112[_0x500090],_0x42b619);_0x4d4262[_0x6ca070(0x206)]&&_0x3d1bb2['push'](_0x12e4b0[_0x6ca070(0x1fc)](_0x500090,_0x4d4262));}),await Promise[_0x361706(0x1e3)](_0x3d1bb2)),_0x2fcd8e=await Promise[_0x361706(0x1e3)](_0xffc87[_0x361706(0x1e8)](_0x328b1a=>_0x12e4b0[_0x361706(0x1e0)](_0x328b1a[_0x361706(0x1e7)]))),_0x2fcd8e[_0x361706(0x202)]((_0x1c2951,_0x4fd47c)=>{const _0xf93c8=_0x361706;_0x3b4112[_0xffc87[_0x4fd47c][_0xf93c8(0x1e7)]]=_0x1c2951;}),await Promise[_0x361706(0x1e3)](Object[_0x361706(0x1e5)](_0x3b4112)['map'](_0x18b22c=>{const _0x8b3718=_0x361706;if(!_0x3b4112[_0x18b22c]['length'])return this[_0x8b3718(0x1e9)][_0x8b3718(0x1fd)](_0x18b22c);return null;}));}catch(_0x37b053){console[_0x361706(0x1fe)](_0x37b053);}finally{_0xbf3bfb();}}};PerformerTask=__decorate([common_1['Injectable'](),__metadata(a363_0x57f1e4(0x1ea),[nestjs_redis_1[a363_0x57f1e4(0x1df)],agenda_1['AgendaService'],socket_user_service_1[a363_0x57f1e4(0x1ec)],services_1[a363_0x57f1e4(0x1fa)]])],PerformerTask),exports[a363_0x57f1e4(0x201)]=PerformerTask;