'use strict';const a57_0x1796=['all','create','HttpStatus','studioService','27236xOVmUc','getOwnPropertyDescriptor','prototype','1ukbrxg','../../../kernel/constants','132939GJRgyd','verificationService','sendVerificationEmail','_id','VerificationService','4usBpZQ','documentDir','43231AxggOJ','479262jdVBJr','object','design:paramtypes','getConfig','328886OSkhun','../services','FileUploaded','studio','19cvFXuL','password','StudioService','function','__param','../../studio/payloads','assign','omit','SettingService','username','../exceptions','StudioCreatePayload','email','getValueByKey','register','FileDto','StudioRegisterController','PENDING','__metadata','HttpCode','documentVerification','SETTING_KEYS','metadata','3401ZbHNNE','STATUS','151658tgChGP','DataResponse','../../file','length','Body','defineProperty','Controller','file','__decorate','FileUploadInterceptor','ACTIVE','authService','decorate','design:returntype','document-verification','../../../kernel'];const a57_0x2c29fb=a57_0x191f;(function(_0x1a9c31,_0x4f738a){const _0x1d0691=a57_0x191f;while(!![]){try{const _0x2d6c60=-parseInt(_0x1d0691(0x17c))*parseInt(_0x1d0691(0x17e))+parseInt(_0x1d0691(0x165))+-parseInt(_0x1d0691(0x148))+-parseInt(_0x1d0691(0x179))+parseInt(_0x1d0691(0x141))*parseInt(_0x1d0691(0x143))+parseInt(_0x1d0691(0x144))+-parseInt(_0x1d0691(0x163))*parseInt(_0x1d0691(0x14c));if(_0x2d6c60===_0x4f738a)break;else _0x1a9c31['push'](_0x1a9c31['shift']());}catch(_0x3912af){_0x1a9c31['push'](_0x1a9c31['shift']());}}}(a57_0x1796,0x3d134));var __decorate=this&&this[a57_0x2c29fb(0x16d)]||function(_0x2bd8ff,_0x32d978,_0x23eadc,_0x2119ce){const _0x2ab9dd=a57_0x2c29fb;var _0x3148d5=arguments[_0x2ab9dd(0x168)],_0x21dd47=_0x3148d5<0x3?_0x32d978:_0x2119ce===null?_0x2119ce=Object[_0x2ab9dd(0x17a)](_0x32d978,_0x23eadc):_0x2119ce,_0x9c5115;if(typeof Reflect==='object'&&typeof Reflect[_0x2ab9dd(0x171)]==='function')_0x21dd47=Reflect[_0x2ab9dd(0x171)](_0x2bd8ff,_0x32d978,_0x23eadc,_0x2119ce);else{for(var _0x4663e3=_0x2bd8ff[_0x2ab9dd(0x168)]-0x1;_0x4663e3>=0x0;_0x4663e3--)if(_0x9c5115=_0x2bd8ff[_0x4663e3])_0x21dd47=(_0x3148d5<0x3?_0x9c5115(_0x21dd47):_0x3148d5>0x3?_0x9c5115(_0x32d978,_0x23eadc,_0x21dd47):_0x9c5115(_0x32d978,_0x23eadc))||_0x21dd47;}return _0x3148d5>0x3&&_0x21dd47&&Object[_0x2ab9dd(0x16a)](_0x32d978,_0x23eadc,_0x21dd47),_0x21dd47;},__metadata=this&&this[a57_0x2c29fb(0x15e)]||function(_0x42adbf,_0xd32a71){const _0x1bf382=a57_0x2c29fb;if(typeof Reflect===_0x1bf382(0x145)&&typeof Reflect[_0x1bf382(0x162)]===_0x1bf382(0x14f))return Reflect[_0x1bf382(0x162)](_0x42adbf,_0xd32a71);},__param=this&&this[a57_0x2c29fb(0x150)]||function(_0x52832f,_0x30d271){return function(_0x53f62f,_0xad0681){_0x30d271(_0x53f62f,_0xad0681,_0x52832f);};};Object[a57_0x2c29fb(0x16a)](exports,'__esModule',{'value':!![]}),exports[a57_0x2c29fb(0x15c)]=void 0x0;const common_1=require('@nestjs/common'),kernel_1=require(a57_0x2c29fb(0x174)),settings_1=require('../../settings'),services_1=require('../../studio/services'),payloads_1=require(a57_0x2c29fb(0x151)),file_1=require(a57_0x2c29fb(0x167)),constants_1=require('../../settings/constants'),lodash_1=require('lodash'),constants_2=require(a57_0x2c29fb(0x17d)),exceptions_1=require(a57_0x2c29fb(0x156)),services_2=require(a57_0x2c29fb(0x149));function a57_0x191f(_0x5cd1ea,_0x1163d1){return a57_0x191f=function(_0x179613,_0x191f09){_0x179613=_0x179613-0x13f;let _0x1b7097=a57_0x1796[_0x179613];return _0x1b7097;},a57_0x191f(_0x5cd1ea,_0x1163d1);}let StudioRegisterController=class StudioRegisterController{constructor(_0x428cc8,_0x47167e,_0x24c6ed){const _0x76977a=a57_0x2c29fb;this[_0x76977a(0x178)]=_0x428cc8,this['authService']=_0x47167e,this[_0x76977a(0x17f)]=_0x24c6ed;}async[a57_0x2c29fb(0x15a)](_0x32ac14,_0xaa6256){const _0x4bc26f=a57_0x2c29fb;if(_0xaa6256['type']!=='document-verification')throw new exceptions_1['DocumentMissiongException']();const _0x14fdae=settings_1[_0x4bc26f(0x154)][_0x4bc26f(0x159)](constants_1[_0x4bc26f(0x161)]['REQUIRE_EMAIL_VERIFICATION']),_0x5adf90=await this[_0x4bc26f(0x178)][_0x4bc26f(0x15a)](Object[_0x4bc26f(0x152)](Object[_0x4bc26f(0x152)]({},lodash_1[_0x4bc26f(0x153)](_0x32ac14,constants_2['EXCLUDE_FIELDS'])),{'documentVerificationId':_0xaa6256[_0x4bc26f(0x13f)],'emailVerified':!_0x14fdae,'status':_0x14fdae?constants_2[_0x4bc26f(0x164)][_0x4bc26f(0x15d)]:constants_2[_0x4bc26f(0x164)][_0x4bc26f(0x16f)]}));return await Promise[_0x4bc26f(0x175)]([this[_0x4bc26f(0x170)]['create']({'source':_0x4bc26f(0x14b),'sourceId':_0x5adf90[_0x4bc26f(0x13f)],'type':_0x4bc26f(0x158),'key':_0x5adf90[_0x4bc26f(0x158)],'value':_0x32ac14[_0x4bc26f(0x14d)]}),this[_0x4bc26f(0x170)][_0x4bc26f(0x176)]({'source':_0x4bc26f(0x14b),'sourceId':_0x5adf90[_0x4bc26f(0x13f)],'type':_0x4bc26f(0x155),'key':_0x5adf90['username'],'value':_0x32ac14[_0x4bc26f(0x14d)]})]),_0x14fdae&&await this[_0x4bc26f(0x17f)][_0x4bc26f(0x180)](_0x5adf90[_0x4bc26f(0x13f)],_0x5adf90[_0x4bc26f(0x158)],'studio'),kernel_1[_0x4bc26f(0x166)]['ok']({'message':_0x14fdae?'We\x20have\x20sent\x20an\x20email\x20to\x20verify\x20your\x20email,\x20please\x20check\x20your\x20inbox.':'Your\x20register\x20has\x20been\x20successfully.'});}};__decorate([common_1['Post'](a57_0x2c29fb(0x15a)),common_1[a57_0x2c29fb(0x15f)](common_1[a57_0x2c29fb(0x177)]['OK']),common_1['UseInterceptors'](file_1[a57_0x2c29fb(0x16e)](a57_0x2c29fb(0x173),a57_0x2c29fb(0x160),{'destination':kernel_1[a57_0x2c29fb(0x147)](a57_0x2c29fb(0x16c))[a57_0x2c29fb(0x142)]})),__param(0x0,common_1[a57_0x2c29fb(0x169)]()),__param(0x1,file_1[a57_0x2c29fb(0x14a)]()),__metadata('design:type',Function),__metadata(a57_0x2c29fb(0x146),[payloads_1[a57_0x2c29fb(0x157)],file_1[a57_0x2c29fb(0x15b)]]),__metadata(a57_0x2c29fb(0x172),Promise)],StudioRegisterController[a57_0x2c29fb(0x17b)],'register',null),StudioRegisterController=__decorate([common_1[a57_0x2c29fb(0x16b)]('auth/studio'),__metadata('design:paramtypes',[services_1[a57_0x2c29fb(0x14e)],services_2['AuthService'],services_2[a57_0x2c29fb(0x140)]])],StudioRegisterController),exports[a57_0x2c29fb(0x15c)]=StudioRegisterController;