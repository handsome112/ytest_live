'use strict';const a418_0x9c56=['2490ecNVRu','ProductDto','function','all','4dTjlXB','lodash','PRODUCT_TYPE','updateOne','updateStock','digitalFile','type','checkAuth','status','PERFORMER_PRODUCT_CHANNEL','length','71424ooBcTB','13341ClOBrs','addRef','exec','stock','remove','ProductService','imageId','InvalidFileException','findById','getUrl','create','PerformerService','performer-product','roles','findOne','decorate','__decorate','Injectable','DIGITAL','&token=','performerService','mongoose','PRODUCT','../../user/dtos','Inject','197366PeoTzC','updatedBy','FileService','getDetails','276103YVFOmU','ProductModel','publish','update','find','object','../../purchased-item/constants','design:paramtypes','PhysicalProductStockException','uniq','save','../../../kernel','queueEventService','../dtos','admin','QueueEvent','__param','fileService','digitalFileId','_id','lean','../../file/services','../../file','map','118786tUkrsA','101267dOyDgt','performerId','PaymentTokenService','EntityNotFoundException','productId','push','paymentTokenService','__metadata','../../performer/services','includes','assign','toString','../exceptions','QueueEventService','username','UPDATED','performer','__esModule','PERFORMER_PRODUCT_MODEL_PROVIDER','delete','findByPerformerIds','metadata','createdBy','EVENT','PHYSICAL','DELETED','../../purchased-item/services','forwardRef','1ZYsNDI','Missing\x20digital\x20file'];const a418_0x5557c6=a418_0x5d03;(function(_0x489177,_0x452a63){const _0x5d8d78=a418_0x5d03;while(!![]){try{const _0x27f9c6=-parseInt(_0x5d8d78(0x177))*parseInt(_0x5d8d78(0x1cf))+parseInt(_0x5d8d78(0x1c9))*-parseInt(_0x5d8d78(0x1ad))+parseInt(_0x5d8d78(0x190))+-parseInt(_0x5d8d78(0x1da))+parseInt(_0x5d8d78(0x1cb))+-parseInt(_0x5d8d78(0x1ac))+parseInt(_0x5d8d78(0x194));if(_0x27f9c6===_0x452a63)break;else _0x489177['push'](_0x489177['shift']());}catch(_0xa0badd){_0x489177['push'](_0x489177['shift']());}}}(a418_0x9c56,0x2002e));function a418_0x5d03(_0x14b42f,_0x494606){return a418_0x5d03=function(_0x9c563,_0x5d0395){_0x9c563=_0x9c563-0x177;let _0x1c7c43=a418_0x9c56[_0x9c563];return _0x1c7c43;},a418_0x5d03(_0x14b42f,_0x494606);}var __decorate=this&&this[a418_0x5557c6(0x187)]||function(_0x30069d,_0x1882e2,_0x28c8af,_0x817752){const _0x205fef=a418_0x5557c6;var _0x3e2c9a=arguments[_0x205fef(0x1d9)],_0x583bc4=_0x3e2c9a<0x3?_0x1882e2:_0x817752===null?_0x817752=Object['getOwnPropertyDescriptor'](_0x1882e2,_0x28c8af):_0x817752,_0x51e944;if(typeof Reflect===_0x205fef(0x199)&&typeof Reflect[_0x205fef(0x186)]===_0x205fef(0x1cd))_0x583bc4=Reflect[_0x205fef(0x186)](_0x30069d,_0x1882e2,_0x28c8af,_0x817752);else{for(var _0x5d6745=_0x30069d[_0x205fef(0x1d9)]-0x1;_0x5d6745>=0x0;_0x5d6745--)if(_0x51e944=_0x30069d[_0x5d6745])_0x583bc4=(_0x3e2c9a<0x3?_0x51e944(_0x583bc4):_0x3e2c9a>0x3?_0x51e944(_0x1882e2,_0x28c8af,_0x583bc4):_0x51e944(_0x1882e2,_0x28c8af))||_0x583bc4;}return _0x3e2c9a>0x3&&_0x583bc4&&Object['defineProperty'](_0x1882e2,_0x28c8af,_0x583bc4),_0x583bc4;},__metadata=this&&this[a418_0x5557c6(0x1b4)]||function(_0x159a56,_0x48d1cb){const _0x376692=a418_0x5557c6;if(typeof Reflect===_0x376692(0x199)&&typeof Reflect['metadata']==='function')return Reflect[_0x376692(0x1c2)](_0x159a56,_0x48d1cb);},__param=this&&this[a418_0x5557c6(0x1a4)]||function(_0x559816,_0x1c4108){return function(_0x337b09,_0x56a283){_0x1c4108(_0x337b09,_0x56a283,_0x559816);};};Object['defineProperty'](exports,a418_0x5557c6(0x1be),{'value':!![]}),exports[a418_0x5557c6(0x17c)]=void 0x0;const common_1=require('@nestjs/common'),mongoose_1=require(a418_0x5557c6(0x18c)),kernel_1=require(a418_0x5557c6(0x19f)),file_1=require(a418_0x5557c6(0x1aa)),dtos_1=require(a418_0x5557c6(0x18e)),services_1=require(a418_0x5557c6(0x1a9)),services_2=require(a418_0x5557c6(0x1b5)),lodash_1=require(a418_0x5557c6(0x1d0)),constants_1=require('../../../kernel/constants'),services_3=require(a418_0x5557c6(0x1c7)),constants_2=require(a418_0x5557c6(0x19a)),constants_3=require('../constants'),dtos_2=require(a418_0x5557c6(0x1a1)),exceptions_1=require(a418_0x5557c6(0x1b9)),providers_1=require('../providers');let ProductService=class ProductService{constructor(_0x54cc13,_0x18700d,_0x489dfd,_0x55bf43,_0x5d8050){const _0x214e90=a418_0x5557c6;this[_0x214e90(0x195)]=_0x54cc13,this[_0x214e90(0x18b)]=_0x18700d,this[_0x214e90(0x1a5)]=_0x489dfd,this[_0x214e90(0x1a0)]=_0x55bf43,this[_0x214e90(0x1b3)]=_0x5d8050;}async[a418_0x5557c6(0x181)](_0x586d82,_0x59d74c,_0x400591,_0x50e11b){const _0x3a8eff=a418_0x5557c6;if(_0x586d82[_0x3a8eff(0x1d5)]===constants_3['PRODUCT_TYPE'][_0x3a8eff(0x189)]&&!_0x59d74c){_0x400591&&this['fileService'][_0x3a8eff(0x17b)](_0x400591[_0x3a8eff(0x1a7)]);throw new exceptions_1[(_0x3a8eff(0x17e))](_0x3a8eff(0x1ca));}if(_0x586d82['type']===constants_3['PRODUCT_TYPE']['PHYSICAL']&&!_0x586d82[_0x3a8eff(0x17a)])throw new exceptions_1[(_0x3a8eff(0x19c))]();const _0x4210f5=new this[(_0x3a8eff(0x195))](_0x586d82);if(_0x59d74c)_0x4210f5[_0x3a8eff(0x1a6)]=_0x59d74c[_0x3a8eff(0x1a7)];if(_0x400591)_0x4210f5[_0x3a8eff(0x17d)]=_0x400591[_0x3a8eff(0x1a7)];_0x50e11b&&(_0x4210f5[_0x3a8eff(0x1c3)]=_0x50e11b[_0x3a8eff(0x1a7)],_0x4210f5[_0x3a8eff(0x191)]=_0x50e11b[_0x3a8eff(0x1a7)]);await _0x4210f5[_0x3a8eff(0x19e)](),await Promise['all']([_0x59d74c&&this[_0x3a8eff(0x1a5)][_0x3a8eff(0x178)](_0x59d74c['_id'],{'itemId':_0x4210f5[_0x3a8eff(0x1a7)],'itemType':'digital-product'}),_0x400591&&this['fileService'][_0x3a8eff(0x178)](_0x400591[_0x3a8eff(0x1a7)],{'itemId':_0x4210f5[_0x3a8eff(0x1a7)],'itemType':_0x3a8eff(0x183)})]);const _0x29015d=new dtos_2[(_0x3a8eff(0x1cc))](_0x4210f5);return await this[_0x3a8eff(0x1a0)][_0x3a8eff(0x196)](new kernel_1[(_0x3a8eff(0x1a3))]({'channel':constants_3[_0x3a8eff(0x1d8)],'eventName':constants_1['EVENT']['CREATED'],'data':_0x29015d})),_0x29015d;}async[a418_0x5557c6(0x197)](_0x46974c,_0x785165,_0x2fd5ab,_0x2761eb,_0x934f8a){const _0x130d45=a418_0x5557c6,_0x44073a=await this[_0x130d45(0x195)]['findOne']({'_id':_0x46974c});if(!_0x44073a)throw new kernel_1[(_0x130d45(0x1b0))]();const _0x13aab2=_0x44073a[_0x130d45(0x1d7)];if(_0x785165[_0x130d45(0x1d5)]===constants_3[_0x130d45(0x1d1)][_0x130d45(0x189)]&&!_0x44073a[_0x130d45(0x1a6)]&&!_0x2fd5ab)throw new exceptions_1[(_0x130d45(0x17e))](_0x130d45(0x1ca));if(_0x785165[_0x130d45(0x1d5)]===constants_3[_0x130d45(0x1d1)][_0x130d45(0x1c5)]&&!_0x785165[_0x130d45(0x17a)])throw new exceptions_1[(_0x130d45(0x19c))]();lodash_1['merge'](_0x44073a,_0x785165);const _0x4c76cb=[];_0x2fd5ab&&(_0x44073a['digitalFileId']&&_0x4c76cb[_0x130d45(0x1b2)](_0x44073a[_0x130d45(0x1a6)]),_0x44073a[_0x130d45(0x1a6)]=_0x2fd5ab[_0x130d45(0x1a7)]);_0x2761eb&&(_0x44073a['imageId']&&_0x4c76cb[_0x130d45(0x1b2)](_0x44073a['imageId']),_0x44073a[_0x130d45(0x17d)]=_0x2761eb[_0x130d45(0x1a7)]);if(_0x934f8a)_0x44073a['updatedBy']=_0x934f8a[_0x130d45(0x1a7)];await _0x44073a[_0x130d45(0x19e)](),_0x4c76cb[_0x130d45(0x1d9)]&&await Promise['all'](_0x4c76cb[_0x130d45(0x1ab)](_0x3feddf=>this[_0x130d45(0x1a5)][_0x130d45(0x17b)](_0x3feddf)));const _0x48dcd7=new dtos_2[(_0x130d45(0x1cc))](_0x44073a);return await this['queueEventService'][_0x130d45(0x196)](new kernel_1[(_0x130d45(0x1a3))]({'channel':constants_3[_0x130d45(0x1d8)],'eventName':constants_1[_0x130d45(0x1c4)][_0x130d45(0x1bc)],'data':Object['assign'](Object[_0x130d45(0x1b7)]({},_0x48dcd7),{'oldStatus':_0x13aab2})})),_0x48dcd7;}async[a418_0x5557c6(0x1c0)](_0x420998){const _0xce4ca0=a418_0x5557c6,_0x368584=await this[_0xce4ca0(0x195)][_0xce4ca0(0x185)]({'_id':_0x420998});if(!_0x368584)throw new kernel_1[(_0xce4ca0(0x1b0))]();return await _0x368584['remove'](),_0x368584[_0xce4ca0(0x1a6)]&&await this[_0xce4ca0(0x1a5)]['remove'](_0x368584[_0xce4ca0(0x1a6)]),_0x368584[_0xce4ca0(0x17d)]&&await this[_0xce4ca0(0x1a5)]['remove'](_0x368584[_0xce4ca0(0x17d)]),await this['queueEventService'][_0xce4ca0(0x196)](new kernel_1[(_0xce4ca0(0x1a3))]({'channel':constants_3[_0xce4ca0(0x1d8)],'eventName':constants_1['EVENT'][_0xce4ca0(0x1c6)],'data':new dtos_2['ProductDto'](_0x368584)})),!![];}async[a418_0x5557c6(0x193)](_0x16e8da){const _0x29a4b5=a418_0x5557c6,_0x2ad810=await this[_0x29a4b5(0x195)]['findOne']({'_id':_0x16e8da});if(!_0x2ad810)throw new kernel_1['EntityNotFoundException']();const [_0x1ba216,_0x86fc07]=await Promise[_0x29a4b5(0x1ce)]([this['performerService'][_0x29a4b5(0x17f)](_0x2ad810[_0x29a4b5(0x1ae)]),_0x2ad810[_0x29a4b5(0x17d)]?this[_0x29a4b5(0x1a5)][_0x29a4b5(0x17f)](_0x2ad810[_0x29a4b5(0x17d)]):null]),_0x4542c4=new dtos_2[(_0x29a4b5(0x1cc))](_0x2ad810);return _0x4542c4['image']=_0x86fc07?_0x86fc07['getUrl']():null,_0x4542c4[_0x29a4b5(0x1bd)]={'username':_0x1ba216[_0x29a4b5(0x1bb)]},_0x4542c4;}async['performerGetDetails'](_0x2fdfca,_0x264d54){const _0x21a1e0=a418_0x5557c6,_0x563ca2=await this[_0x21a1e0(0x195)][_0x21a1e0(0x185)]({'_id':_0x2fdfca});if(!_0x563ca2)throw new kernel_1[(_0x21a1e0(0x1b0))]();const [_0x38b77d,_0x2f5bb7,_0x289056]=await Promise['all']([this[_0x21a1e0(0x18b)][_0x21a1e0(0x17f)](_0x563ca2[_0x21a1e0(0x1ae)]),_0x563ca2['type']===constants_3['PRODUCT_TYPE'][_0x21a1e0(0x189)]&&_0x563ca2[_0x21a1e0(0x1a6)]?this['fileService'][_0x21a1e0(0x17f)](_0x563ca2[_0x21a1e0(0x1a6)]):null,_0x563ca2[_0x21a1e0(0x17d)]?this[_0x21a1e0(0x1a5)][_0x21a1e0(0x17f)](_0x563ca2[_0x21a1e0(0x17d)]):null]),_0x3cb036=new dtos_2[(_0x21a1e0(0x1cc))](_0x563ca2);return _0x3cb036['image']=_0x289056?_0x289056[_0x21a1e0(0x180)]():null,_0x3cb036[_0x21a1e0(0x1d4)]=_0x2f5bb7?_0x2f5bb7[_0x21a1e0(0x180)]()+'?productId='+_0x563ca2[_0x21a1e0(0x1a7)]+_0x21a1e0(0x18a)+_0x264d54:null,_0x3cb036[_0x21a1e0(0x1bd)]={'username':_0x38b77d['username']},_0x3cb036;}async['findByIds'](_0x4185e2){const _0x27741f=a418_0x5557c6,_0x1d45ad=lodash_1[_0x27741f(0x19d)](_0x4185e2['map'](_0xbbcb1=>_0xbbcb1[_0x27741f(0x1b8)]())),_0x3d0677=await this[_0x27741f(0x195)][_0x27741f(0x198)]({'_id':{'$in':_0x1d45ad}})[_0x27741f(0x1a8)]()[_0x27741f(0x179)]();return _0x3d0677[_0x27741f(0x1ab)](_0x2b7547=>new dtos_2['ProductDto'](_0x2b7547));}async[a418_0x5557c6(0x17f)](_0x4bc106){const _0x5cd341=a418_0x5557c6,_0x3e5f34=await this[_0x5cd341(0x195)]['findById'](_0x4bc106);return new dtos_2[(_0x5cd341(0x1cc))](_0x3e5f34);}async[a418_0x5557c6(0x1c1)](_0x3b9cb3){const _0x4564f5=a418_0x5557c6;return this[_0x4564f5(0x195)][_0x4564f5(0x198)]({'performerId':{'$in':_0x3b9cb3}})['lean']()['exec']();}async[a418_0x5557c6(0x1d3)](_0x2bb7f7,_0x3543a7=-0x1){const _0x3f0ee9=a418_0x5557c6;return this[_0x3f0ee9(0x195)][_0x3f0ee9(0x1d2)]({'_id':_0x2bb7f7},{'$inc':{'stock':_0x3543a7}});}async[a418_0x5557c6(0x1d6)](_0x53be9a,_0x1c72c0){const _0xb33e55=a418_0x5557c6,{query:_0x7d2009}=_0x53be9a;if(!_0x7d2009[_0xb33e55(0x1b1)])return![];if(_0x1c72c0[_0xb33e55(0x184)]&&_0x1c72c0[_0xb33e55(0x184)][_0xb33e55(0x1b6)](_0xb33e55(0x1a2)))return!![];const _0x4297a6=await this[_0xb33e55(0x195)][_0xb33e55(0x17f)](_0x7d2009[_0xb33e55(0x1b1)]);if(!_0x4297a6)return![];if(_0x1c72c0[_0xb33e55(0x1a7)][_0xb33e55(0x1b8)]()===_0x4297a6[_0xb33e55(0x1ae)]['toString']())return!![];if(_0x4297a6[_0xb33e55(0x1d5)]!==constants_3[_0xb33e55(0x1d1)][_0xb33e55(0x189)])return!![];const _0x2b2f10=await this[_0xb33e55(0x1b3)]['checkBought'](_0x4297a6[_0xb33e55(0x1a7)],constants_2['PurchaseItemType'][_0xb33e55(0x18d)],_0x1c72c0);if(_0x2b2f10)return!![];return![];}};ProductService=__decorate([common_1[a418_0x5557c6(0x188)](),__param(0x0,common_1['Inject'](providers_1[a418_0x5557c6(0x1bf)])),__param(0x2,common_1[a418_0x5557c6(0x18f)](common_1[a418_0x5557c6(0x1c8)](()=>services_1[a418_0x5557c6(0x192)]))),__param(0x4,common_1[a418_0x5557c6(0x18f)](common_1['forwardRef'](()=>services_3[a418_0x5557c6(0x1af)]))),__metadata(a418_0x5557c6(0x19b),[mongoose_1['Model'],services_2[a418_0x5557c6(0x182)],services_1[a418_0x5557c6(0x192)],kernel_1[a418_0x5557c6(0x1ba)],services_3[a418_0x5557c6(0x1af)]])],ProductService),exports[a418_0x5557c6(0x17c)]=ProductService;