'use strict';const a55_0x24e1=['redirect','667404oZqmjO','users/register','decorate','_id','ROLE_USER','function','user','getValueByKey','userRegister','email','949700kaXwcZ','../../../kernel','SettingService','design:returntype','UserRegisterPayload','37441wpAbiw','RegisterController','794414GzTfzo','15iQFvlz','auth','432477lonjXy','HttpCode','../services','STATUS','1wmrPCc','defineProperty','username','design:paramtypes','../dtos','AuthCreateDto','HttpStatus','userService','sendVerificationEmail','token','12693fvyERr','lodash','metadata','../../../kernel/constants','object','password','404.html','Get','requireEmailVerification','omit','USER_URL','prototype','512024DASdfr','render','43fkdmEs','getOwnPropertyDescriptor','create','Body','verificationService','ACTIVE','verifyEmail','We\x20have\x20sent\x20an\x20email\x20to\x20verify\x20your\x20email,\x20please\x20check\x20your\x20inbox.','all','EXCLUDE_FIELDS','length','design:type','__param','UserService','DataResponse','authService','Controller','@nestjs/common'];function a55_0x80e9(_0x79352b,_0xc5f95e){return a55_0x80e9=function(_0x24e1cf,_0x80e945){_0x24e1cf=_0x24e1cf-0x198;let _0x36d4ca=a55_0x24e1[_0x24e1cf];return _0x36d4ca;},a55_0x80e9(_0x79352b,_0xc5f95e);}const a55_0x15c62d=a55_0x80e9;(function(_0x523a77,_0x181923){const _0x7d8417=a55_0x80e9;while(!![]){try{const _0x59e8aa=parseInt(_0x7d8417(0x19e))*parseInt(_0x7d8417(0x1a1))+parseInt(_0x7d8417(0x1a0))+-parseInt(_0x7d8417(0x199))+parseInt(_0x7d8417(0x1d2))+-parseInt(_0x7d8417(0x1b1))*-parseInt(_0x7d8417(0x1bf))+parseInt(_0x7d8417(0x1a7))*-parseInt(_0x7d8417(0x1a3))+-parseInt(_0x7d8417(0x1bd));if(_0x59e8aa===_0x181923)break;else _0x523a77['push'](_0x523a77['shift']());}catch(_0x48ba94){_0x523a77['push'](_0x523a77['shift']());}}}(a55_0x24e1,0xa4cd7));var __decorate=this&&this['__decorate']||function(_0x339f0a,_0x3183b6,_0x132996,_0x4e009a){const _0x5ce602=a55_0x80e9;var _0x27d74f=arguments[_0x5ce602(0x1c9)],_0x5078df=_0x27d74f<0x3?_0x3183b6:_0x4e009a===null?_0x4e009a=Object[_0x5ce602(0x1c0)](_0x3183b6,_0x132996):_0x4e009a,_0x1133c1;if(typeof Reflect===_0x5ce602(0x1b5)&&typeof Reflect[_0x5ce602(0x1d4)]===_0x5ce602(0x1d7))_0x5078df=Reflect[_0x5ce602(0x1d4)](_0x339f0a,_0x3183b6,_0x132996,_0x4e009a);else{for(var _0x4bb05e=_0x339f0a[_0x5ce602(0x1c9)]-0x1;_0x4bb05e>=0x0;_0x4bb05e--)if(_0x1133c1=_0x339f0a[_0x4bb05e])_0x5078df=(_0x27d74f<0x3?_0x1133c1(_0x5078df):_0x27d74f>0x3?_0x1133c1(_0x3183b6,_0x132996,_0x5078df):_0x1133c1(_0x3183b6,_0x132996))||_0x5078df;}return _0x27d74f>0x3&&_0x5078df&&Object[_0x5ce602(0x1a8)](_0x3183b6,_0x132996,_0x5078df),_0x5078df;},__metadata=this&&this['__metadata']||function(_0x49d353,_0x401e2c){const _0x4ecae2=a55_0x80e9;if(typeof Reflect===_0x4ecae2(0x1b5)&&typeof Reflect[_0x4ecae2(0x1b3)]===_0x4ecae2(0x1d7))return Reflect[_0x4ecae2(0x1b3)](_0x49d353,_0x401e2c);},__param=this&&this[a55_0x15c62d(0x1cb)]||function(_0xb81b41,_0x5f0a60){return function(_0x54302a,_0x2ef2e9){_0x5f0a60(_0x54302a,_0x2ef2e9,_0xb81b41);};};Object[a55_0x15c62d(0x1a8)](exports,'__esModule',{'value':!![]}),exports['RegisterController']=void 0x0;const common_1=require(a55_0x15c62d(0x1d0)),services_1=require('../../user/services'),kernel_1=require(a55_0x15c62d(0x19a)),settings_1=require('../../settings'),constants_1=require('../../user/constants'),lodash_1=require(a55_0x15c62d(0x1b2)),constants_2=require(a55_0x15c62d(0x1b4)),dtos_1=require(a55_0x15c62d(0x1ab)),payloads_1=require('../payloads'),services_2=require(a55_0x15c62d(0x1a5));let RegisterController=class RegisterController{constructor(_0x2601a9,_0x202865,_0x336f21){const _0x1d443c=a55_0x15c62d;this['userService']=_0x2601a9,this['authService']=_0x202865,this[_0x1d443c(0x1c3)]=_0x336f21;}async[a55_0x15c62d(0x1da)](_0x1c3921){const _0x5dc2bd=a55_0x15c62d,_0x316bb1=settings_1[_0x5dc2bd(0x19b)][_0x5dc2bd(0x1d9)](_0x5dc2bd(0x1b9)),_0x3c2da6=await this[_0x5dc2bd(0x1ae)][_0x5dc2bd(0x1c1)](lodash_1[_0x5dc2bd(0x1ba)](_0x1c3921,constants_2[_0x5dc2bd(0x1c8)]),{'status':_0x316bb1?constants_1[_0x5dc2bd(0x1a6)]['PENDING']:constants_1[_0x5dc2bd(0x1a6)][_0x5dc2bd(0x1c4)],'roles':constants_1[_0x5dc2bd(0x1d6)],'emailVerified':!_0x316bb1});return await Promise[_0x5dc2bd(0x1c7)]([this[_0x5dc2bd(0x1ce)][_0x5dc2bd(0x1c1)](new dtos_1['AuthCreateDto']({'source':_0x5dc2bd(0x1d8),'sourceId':_0x3c2da6[_0x5dc2bd(0x1d5)],'type':_0x5dc2bd(0x198),'value':_0x1c3921[_0x5dc2bd(0x1b6)],'key':_0x1c3921[_0x5dc2bd(0x198)]})),_0x1c3921[_0x5dc2bd(0x1a9)]&&this[_0x5dc2bd(0x1ce)][_0x5dc2bd(0x1c1)](new dtos_1[(_0x5dc2bd(0x1ac))]({'source':_0x5dc2bd(0x1d8),'sourceId':_0x3c2da6['_id'],'type':_0x5dc2bd(0x1a9),'value':_0x1c3921['password'],'key':_0x1c3921['username']}))]),_0x316bb1&&await this[_0x5dc2bd(0x1c3)][_0x5dc2bd(0x1af)](_0x3c2da6[_0x5dc2bd(0x1d5)],_0x3c2da6[_0x5dc2bd(0x198)],'user'),kernel_1[_0x5dc2bd(0x1cd)]['ok']({'message':_0x316bb1?_0x5dc2bd(0x1c6):'Your\x20register\x20has\x20been\x20successfully.'});}async['verifyEmail'](_0x596bce,_0x3bc0df){const _0x5f0a45=a55_0x15c62d;if(!_0x3bc0df)return _0x596bce[_0x5f0a45(0x1be)](_0x5f0a45(0x1b7));return await this[_0x5f0a45(0x1c3)][_0x5f0a45(0x1c5)](_0x3bc0df),_0x596bce[_0x5f0a45(0x1d1)](process['env'][_0x5f0a45(0x1bb)]);}};__decorate([common_1['Post'](a55_0x15c62d(0x1d3)),common_1[a55_0x15c62d(0x1a4)](common_1[a55_0x15c62d(0x1ad)]['OK']),__param(0x0,common_1[a55_0x15c62d(0x1c2)]()),__metadata('design:type',Function),__metadata(a55_0x15c62d(0x1aa),[payloads_1[a55_0x15c62d(0x19d)]]),__metadata(a55_0x15c62d(0x19c),Promise)],RegisterController[a55_0x15c62d(0x1bc)],a55_0x15c62d(0x1da),null),__decorate([common_1[a55_0x15c62d(0x1b8)]('email-verification'),__param(0x0,common_1['Res']()),__param(0x1,common_1['Query'](a55_0x15c62d(0x1b0))),__metadata(a55_0x15c62d(0x1ca),Function),__metadata(a55_0x15c62d(0x1aa),[Object,String]),__metadata(a55_0x15c62d(0x19c),Promise)],RegisterController[a55_0x15c62d(0x1bc)],a55_0x15c62d(0x1c5),null),RegisterController=__decorate([common_1[a55_0x15c62d(0x1cf)](a55_0x15c62d(0x1a2)),__metadata('design:paramtypes',[services_1[a55_0x15c62d(0x1cc)],services_2['AuthService'],services_2['VerificationService']])],RegisterController),exports[a55_0x15c62d(0x19f)]=RegisterController;