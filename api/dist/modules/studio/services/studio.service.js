'use strict';const a576_0x5f2c=['QueueEventService','fileService','assign','FileService','STUDIO_EVENT_NAME','../../file/services','mongoose','EmailExistedException','path','decorate','defineProperty','STUDIO_MODEL_PROVIDER','StudioService','$and','roles','193919PNYCOt','getOwnPropertyDescriptor','1607XjUgCO','290hWlQfV','updateVerificationStatus','documentVerification','Inject','register','stats','find','studioModel','countDocuments','forwardRef','_id','updateOne','queueEventService','1860575dxSXif','status','mimeType','length','toLowerCase','lean','findByIds','studio-document','../../performer/exceptions','FileDto','../constants','STUDIO_CHANNEL','function','1642007VFVEcV','totalHoursOnlineStat','uploadDocument','search','CREATED','findByEmail','detail','sortBy','Verification\x20Document\x20is\x20not\x20found!','design:paramtypes','studio','ACTIVE','sort','publish','addRef','STUDIO_STATUES','push','585916Bixhfv','findById','map','__decorate','106dyEULE','StudioDto','14yZPPJg','../../file','name','?documentId=','../dtos','findOne','email','__metadata','getPublicUrl','remove','@nestjs/common','&token=','trim','Injectable','Model','offset','updateStats','1743403FFLRRb','all','documentVerificationFile','../../user/exceptions','documentVerificationId','EntityNotFoundException','performerService','limit'];const a576_0x385c5a=a576_0x1af2;(function(_0xddcb65,_0x22b62a){const _0x470231=a576_0x1af2;while(!![]){try{const _0x47f63a=parseInt(_0x470231(0x12a))+-parseInt(_0x470231(0x13a))+parseInt(_0x470231(0x12d))*-parseInt(_0x470231(0x102))+parseInt(_0x470231(0xeb))+parseInt(_0x470231(0x113))+-parseInt(_0x470231(0xfc))+-parseInt(_0x470231(0x12c))*parseInt(_0x470231(0x100));if(_0x47f63a===_0x22b62a)break;else _0xddcb65['push'](_0xddcb65['shift']());}catch(_0x2d59ba){_0xddcb65['push'](_0xddcb65['shift']());}}}(a576_0x5f2c,0xe9fe4));var __decorate=this&&this[a576_0x385c5a(0xff)]||function(_0x1d2e41,_0xd1cd42,_0x422b6b,_0x3767f3){const _0x5355a5=a576_0x385c5a;var _0x373467=arguments[_0x5355a5(0xe1)],_0x1e919c=_0x373467<0x3?_0xd1cd42:_0x3767f3===null?_0x3767f3=Object[_0x5355a5(0x12b)](_0xd1cd42,_0x422b6b):_0x3767f3,_0xf2c9b9;if(typeof Reflect==='object'&&typeof Reflect[_0x5355a5(0x124)]===_0x5355a5(0xea))_0x1e919c=Reflect[_0x5355a5(0x124)](_0x1d2e41,_0xd1cd42,_0x422b6b,_0x3767f3);else{for(var _0x292f79=_0x1d2e41['length']-0x1;_0x292f79>=0x0;_0x292f79--)if(_0xf2c9b9=_0x1d2e41[_0x292f79])_0x1e919c=(_0x373467<0x3?_0xf2c9b9(_0x1e919c):_0x373467>0x3?_0xf2c9b9(_0xd1cd42,_0x422b6b,_0x1e919c):_0xf2c9b9(_0xd1cd42,_0x422b6b))||_0x1e919c;}return _0x373467>0x3&&_0x1e919c&&Object[_0x5355a5(0x125)](_0xd1cd42,_0x422b6b,_0x1e919c),_0x1e919c;},__metadata=this&&this[a576_0x385c5a(0x109)]||function(_0x3e602f,_0x4ce746){const _0xde799f=a576_0x385c5a;if(typeof Reflect==='object'&&typeof Reflect['metadata']===_0xde799f(0xea))return Reflect['metadata'](_0x3e602f,_0x4ce746);},__param=this&&this['__param']||function(_0x1db9e6,_0x1f069b){return function(_0x54a93a,_0xbfd71d){_0x1f069b(_0x54a93a,_0xbfd71d,_0x1db9e6);};};Object[a576_0x385c5a(0x125)](exports,'__esModule',{'value':!![]}),exports[a576_0x385c5a(0x127)]=void 0x0;const common_1=require(a576_0x385c5a(0x10c)),services_1=require('../../performer/services'),mongoose_1=require(a576_0x385c5a(0x121)),exceptions_1=require(a576_0x385c5a(0x116)),exceptions_2=require(a576_0x385c5a(0xe6)),kernel_1=require('../../../kernel'),services_2=require(a576_0x385c5a(0x120)),file_1=require(a576_0x385c5a(0x103)),dtos_1=require(a576_0x385c5a(0x106)),providers_1=require('../providers'),constants_1=require(a576_0x385c5a(0xe8));let StudioService=class StudioService{constructor(_0x45a2e5,_0x3b031e,_0x28d5a1,_0x3c59f1){const _0x4daa90=a576_0x385c5a;this[_0x4daa90(0x119)]=_0x45a2e5,this[_0x4daa90(0x134)]=_0x3b031e,this['fileService']=_0x28d5a1,this[_0x4daa90(0x139)]=_0x3c59f1;}async[a576_0x385c5a(0xfd)](_0x3c0418){const _0x7647ea=a576_0x385c5a,_0x215808=await this['studioModel'][_0x7647ea(0xfd)](_0x3c0418);return new dtos_1[(_0x7647ea(0x101))](_0x215808);}async['find'](_0x2083ed={}){const _0x5f40f3=a576_0x385c5a;return this[_0x5f40f3(0x134)]['find'](_0x2083ed);}async[a576_0x385c5a(0xe4)](_0x15a264){const _0x4c8acc=a576_0x385c5a,_0xde57b3=await this['studioModel'][_0x4c8acc(0x133)]({'_id':{'$in':_0x15a264}})[_0x4c8acc(0xe3)]()['exec']();return _0xde57b3[_0x4c8acc(0xfe)](_0x2c2837=>new dtos_1[(_0x4c8acc(0x101))](_0x2c2837));}async[a576_0x385c5a(0xf0)](_0x409354){const _0x5f3120=a576_0x385c5a;return this[_0x5f3120(0x134)][_0x5f3120(0x107)]({'email':_0x409354[_0x5f3120(0xe2)]()});}async[a576_0x385c5a(0x131)](_0x31a40a){const _0x5c374e=a576_0x385c5a,_0x2f963e=Object[_0x5c374e(0x11d)](Object[_0x5c374e(0x11d)]({},_0x31a40a),{'roles':_0x31a40a[_0x5c374e(0x129)]||[_0x5c374e(0xf5)],'updatedAt':new Date(),'createdAt':new Date()}),_0x5dd5b3=await this[_0x5c374e(0x134)]['countDocuments']({'username':_0x31a40a['username'][_0x5c374e(0x10e)]()});if(_0x5dd5b3)throw new exceptions_1['UsernameExistedException']();const _0x40db59=await this['studioModel'][_0x5c374e(0x135)]({'email':_0x31a40a[_0x5c374e(0x108)]['toLowerCase']()[_0x5c374e(0x10e)]()});if(_0x40db59)throw new exceptions_2[(_0x5c374e(0x122))]();if(_0x31a40a[_0x5c374e(0x117)]){const _0x24afe5=await this[_0x5c374e(0x11c)]['findById'](_0x31a40a[_0x5c374e(0x117)]);if(!_0x24afe5)throw new kernel_1[(_0x5c374e(0x118))](_0x5c374e(0xf3));}const _0x4e2548=await this[_0x5c374e(0x134)]['create'](_0x2f963e);_0x31a40a[_0x5c374e(0x117)]&&await this[_0x5c374e(0x11c)][_0x5c374e(0xf9)](_0x31a40a[_0x5c374e(0x117)],{'itemId':_0x4e2548[_0x5c374e(0x137)],'itemType':_0x5c374e(0xe5)});const _0x13378f={'channel':constants_1[_0x5c374e(0xe9)],'eventName':constants_1[_0x5c374e(0x11f)][_0x5c374e(0xef)],'data':_0x4e2548};return await this['queueEventService'][_0x5c374e(0xf8)](_0x13378f),new dtos_1['StudioDto'](_0x4e2548);}async['update'](_0x5ede4f,_0x579fbd){const _0x23e9e0=a576_0x385c5a,_0x298530=Object[_0x23e9e0(0x11d)]({},_0x579fbd);if(_0x579fbd[_0x23e9e0(0x117)]){const _0x4c55ee=await this[_0x23e9e0(0x11c)][_0x23e9e0(0xfd)](_0x579fbd[_0x23e9e0(0x117)]);if(!_0x4c55ee)throw new kernel_1['EntityNotFoundException'](_0x23e9e0(0xf3));}return this[_0x23e9e0(0x134)][_0x23e9e0(0x138)]({'_id':_0x5ede4f},_0x298530,{'new':!![]});}async[a576_0x385c5a(0x112)](_0x4de527,_0x1534a5){const _0x502ff2=a576_0x385c5a;return this[_0x502ff2(0x134)][_0x502ff2(0x138)]({'_id':_0x4de527},{'$inc':_0x1534a5});}async[a576_0x385c5a(0xed)](_0x238096,_0x23060d){const _0x1d1e87=a576_0x385c5a;return await this[_0x1d1e87(0x134)]['updateOne']({'_id':_0x238096[_0x1d1e87(0x137)]},{'$set':{'documentVerificationId':_0x23060d}}),await Promise[_0x1d1e87(0x114)]([this[_0x1d1e87(0x11c)][_0x1d1e87(0xf9)](_0x23060d,{'itemId':_0x238096[_0x1d1e87(0x137)],'itemType':'studio-document'}),_0x238096[_0x1d1e87(0x117)]&&this[_0x1d1e87(0x11c)][_0x1d1e87(0x10b)](_0x238096['documentVerificationId'])]),!![];}async[a576_0x385c5a(0xee)](_0x1d7f26){const _0x2e61f8=a576_0x385c5a,_0x71c15e={};_0x1d7f26['q']&&(!_0x71c15e['$and']&&(_0x71c15e[_0x2e61f8(0x128)]=[]),_0x71c15e[_0x2e61f8(0x128)]['push']({'$or':[{'name':{'$regex':_0x1d7f26['q']}},{'username':{'$regex':_0x1d7f26['q']}},{'email':{'$regex':_0x1d7f26['q']}}]}));_0x1d7f26[_0x2e61f8(0x13b)]&&(_0x1d7f26[_0x2e61f8(0x13b)]===constants_1[_0x2e61f8(0xfa)]['PENDING']?(!_0x71c15e[_0x2e61f8(0x128)]&&(_0x71c15e[_0x2e61f8(0x128)]=[]),_0x71c15e['$and'][_0x2e61f8(0xfb)]({'$or':[{'status':_0x1d7f26[_0x2e61f8(0x13b)]},{'emailVerified':![]}]})):_0x71c15e['status']=_0x1d7f26[_0x2e61f8(0x13b)]);let _0x19f327={};_0x1d7f26[_0x2e61f8(0xf7)]&&_0x1d7f26[_0x2e61f8(0xf2)]&&(_0x19f327={[_0x1d7f26[_0x2e61f8(0xf2)]]:_0x1d7f26[_0x2e61f8(0xf7)]});const [_0x5cef0e,_0x5d3e6f]=await Promise[_0x2e61f8(0x114)]([this['studioModel'][_0x2e61f8(0x133)](_0x71c15e)[_0x2e61f8(0xe3)]()[_0x2e61f8(0xf7)](_0x19f327)[_0x2e61f8(0x11a)](parseInt(_0x1d7f26[_0x2e61f8(0x11a)],0xa))['skip'](parseInt(_0x1d7f26[_0x2e61f8(0x111)],0xa)),this[_0x2e61f8(0x134)][_0x2e61f8(0x135)](_0x71c15e)]);return{'data':_0x5cef0e,'total':_0x5d3e6f};}async[a576_0x385c5a(0x132)](_0x15ced6){const _0x381239=a576_0x385c5a,_0x1bc845=await this[_0x381239(0xfd)](_0x15ced6);if(!_0x1bc845)throw new kernel_1['EntityNotFoundException']();const _0x21f791=new dtos_1['StudioDto'](_0x1bc845),{stats:_0x41d26d,_id:_0x10e8ec}=_0x21f791,[_0x420916,_0x2847de]=await Promise[_0x381239(0x114)]([this['performerService']['totalOnlineTodayStat'](_0x10e8ec),this[_0x381239(0x119)][_0x381239(0xec)](_0x10e8ec)]);return Object['assign'](Object[_0x381239(0x11d)]({},_0x41d26d),{'totalOnlineToday':_0x420916,'totalHoursOnline':_0x2847de});}async[a576_0x385c5a(0xf1)](_0x2cc55f,_0x5485d1){const _0x59e487=a576_0x385c5a,_0x56e430=await this[_0x59e487(0xfd)](_0x2cc55f),_0xb131a=new dtos_1[(_0x59e487(0x101))](_0x56e430)['toResponse'](!![]);if(_0xb131a['documentVerificationId']){const _0x3f5049=await this[_0x59e487(0x11c)][_0x59e487(0xfd)](_0xb131a[_0x59e487(0x117)]);if(_0x3f5049){const _0x3c5fe6=_0x5485d1?file_1[_0x59e487(0xe7)]['getPublicUrl'](_0x3f5049[_0x59e487(0x123)])+_0x59e487(0x105)+_0x3f5049[_0x59e487(0x137)]+_0x59e487(0x10d)+_0x5485d1:file_1[_0x59e487(0xe7)][_0x59e487(0x10a)](_0x3f5049[_0x59e487(0x123)]);_0xb131a[_0x59e487(0x115)]=_0x3c5fe6,_0xb131a[_0x59e487(0x12f)]={'_id':_0x3f5049[_0x59e487(0x137)],'name':_0x3f5049[_0x59e487(0x104)],'url':_0x3c5fe6,'mimeType':_0x3f5049[_0x59e487(0xe0)]};}}return _0xb131a;}async['updateBalance'](_0x2584a2,_0x1a3f1d){const _0x1c58d3=a576_0x385c5a;return this[_0x1c58d3(0x134)][_0x1c58d3(0x138)]({'_id':_0x2584a2},{'$inc':{'balance':_0x1a3f1d,'stats.totalTokenEarned':_0x1a3f1d>0x0?_0x1a3f1d:0x0,'stats.totalTokenSpent':_0x1a3f1d<=0x0?_0x1a3f1d:0x0}});}async[a576_0x385c5a(0x12e)](_0x5a1586){const _0x366148=a576_0x385c5a;return this[_0x366148(0x134)]['updateOne']({'_id':_0x5a1586},{'status':constants_1['STUDIO_STATUES'][_0x366148(0xf6)],'emailVerified':!![]},{'new':!![]});}};function a576_0x1af2(_0x530d2f,_0x34e719){return a576_0x1af2=function(_0x5f2c13,_0x1af205){_0x5f2c13=_0x5f2c13-0xe0;let _0x4126a9=a576_0x5f2c[_0x5f2c13];return _0x4126a9;},a576_0x1af2(_0x530d2f,_0x34e719);}StudioService=__decorate([common_1[a576_0x385c5a(0x10f)](),__param(0x1,common_1[a576_0x385c5a(0x130)](providers_1[a576_0x385c5a(0x126)])),__param(0x2,common_1[a576_0x385c5a(0x130)](common_1[a576_0x385c5a(0x136)](()=>services_2['FileService']))),__metadata(a576_0x385c5a(0xf4),[services_1['PerformerService'],mongoose_1[a576_0x385c5a(0x110)],services_2[a576_0x385c5a(0x11e)],kernel_1[a576_0x385c5a(0x11b)]])],StudioService),exports[a576_0x385c5a(0x127)]=StudioService;