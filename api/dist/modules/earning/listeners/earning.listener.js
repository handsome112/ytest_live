'use strict';const a123_0x3ac0=['../../payment/constants','type','EARNING_CHANNEL','853219NxYPAR','../../purchased-item/constants','USER','getKeyValue','target','privateCallCommission','../../settings','PerformerCommissionService','create','_id','SETTING_KEYS','mongoose','../../purchased-item/dtos','performerService','metadata','commission','10484yYhTWm','SALE_VIDEO','233JCrAmU','PRODUCT','subscribe','studioCommission','set','performerId','__decorate','@nestjs/common','netPrice','../../performer/services','earningModel','studioId','totalPrice','function','__param','env','sellerId','Inject','PERFORMER','TIP','ROLE','1329984CAjCxS','findOne','116tWZpSZ','EARNING_MODEL_PROVIDER','memberCommission','STUDIO','PRIVATE','videoCommission','number','status','queueEventService','STUDIO_COMMISSION','albumCommission','SUCCESS','85147GmVtXV','decorate','1087TpIqZP','Model','2447FdBUzn','../../../kernel/constants','COMMISSION_RATE','476185ZLdIZO','GROUP','groupCallCommission','object','TransactionEarningListener','transactionStatus','targetId','sourceId','../../../kernel','data','../../settings/constants','grossPrice','CREATED','../providers/earning.provider','PURCHASE_ITEM_TYPE','settingService','findById','tipCommission','PURCHASED_ITEM_SUCCESS_CHANNEL','defineProperty','productCommission','userId','conversionRate','__metadata','894xdJURU','source','createdAt','performerCommission','transactionTokenId','CONVERSION_RATE','bind','handleListenEarning','get','Injectable','QueueEventService','__esModule'];const a123_0x3f2470=a123_0x3c1b;function a123_0x3c1b(_0xe24273,_0xca304a){return a123_0x3c1b=function(_0x3ac0d7,_0x3c1bc9){_0x3ac0d7=_0x3ac0d7-0x128;let _0x46a131=a123_0x3ac0[_0x3ac0d7];return _0x46a131;},a123_0x3c1b(_0xe24273,_0xca304a);}(function(_0x8acee0,_0x659e8a){const _0x593200=a123_0x3c1b;while(!![]){try{const _0x56a17b=-parseInt(_0x593200(0x152))*-parseInt(_0x593200(0x135))+-parseInt(_0x593200(0x13a))+parseInt(_0x593200(0x161))+parseInt(_0x593200(0x188))+-parseInt(_0x593200(0x133))+parseInt(_0x593200(0x173))*-parseInt(_0x593200(0x137))+-parseInt(_0x593200(0x18a))*parseInt(_0x593200(0x171));if(_0x56a17b===_0x659e8a)break;else _0x8acee0['push'](_0x8acee0['shift']());}catch(_0x527189){_0x8acee0['push'](_0x8acee0['shift']());}}}(a123_0x3ac0,0xc51ba));var __decorate=this&&this[a123_0x3f2470(0x179)]||function(_0x110e82,_0x462f1e,_0x50e878,_0x31a633){const _0x48acbb=a123_0x3f2470;var _0x40cc46=arguments['length'],_0x5c234e=_0x40cc46<0x3?_0x462f1e:_0x31a633===null?_0x31a633=Object['getOwnPropertyDescriptor'](_0x462f1e,_0x50e878):_0x31a633,_0xe318c3;if(typeof Reflect===_0x48acbb(0x13d)&&typeof Reflect[_0x48acbb(0x134)]===_0x48acbb(0x180))_0x5c234e=Reflect[_0x48acbb(0x134)](_0x110e82,_0x462f1e,_0x50e878,_0x31a633);else{for(var _0x33234d=_0x110e82['length']-0x1;_0x33234d>=0x0;_0x33234d--)if(_0xe318c3=_0x110e82[_0x33234d])_0x5c234e=(_0x40cc46<0x3?_0xe318c3(_0x5c234e):_0x40cc46>0x3?_0xe318c3(_0x462f1e,_0x50e878,_0x5c234e):_0xe318c3(_0x462f1e,_0x50e878))||_0x5c234e;}return _0x40cc46>0x3&&_0x5c234e&&Object['defineProperty'](_0x462f1e,_0x50e878,_0x5c234e),_0x5c234e;},__metadata=this&&this[a123_0x3f2470(0x151)]||function(_0x2ce6ec,_0x1cd946){const _0x46965e=a123_0x3f2470;if(typeof Reflect===_0x46965e(0x13d)&&typeof Reflect[_0x46965e(0x16f)]==='function')return Reflect[_0x46965e(0x16f)](_0x2ce6ec,_0x1cd946);},__param=this&&this[a123_0x3f2470(0x181)]||function(_0x5c8565,_0x59139d){return function(_0x3da703,_0x24ce9c){_0x59139d(_0x3da703,_0x24ce9c,_0x5c8565);};};Object[a123_0x3f2470(0x14d)](exports,a123_0x3f2470(0x15d),{'value':!![]}),exports['TransactionEarningListener']=void 0x0;const common_1=require(a123_0x3f2470(0x17a)),mongoose_1=require(a123_0x3f2470(0x16c)),kernel_1=require(a123_0x3f2470(0x142)),constants_1=require(a123_0x3f2470(0x162)),constants_2=require(a123_0x3f2470(0x138)),services_1=require(a123_0x3f2470(0x17c)),settings_1=require(a123_0x3f2470(0x167)),dtos_1=require(a123_0x3f2470(0x16d)),constants_3=require(a123_0x3f2470(0x15e)),constants_4=require(a123_0x3f2470(0x144)),earning_provider_1=require(a123_0x3f2470(0x147)),UPDATE_EARNING_CHANNEL=a123_0x3f2470(0x160);let TransactionEarningListener=class TransactionEarningListener{constructor(_0x29e13a,_0x4526fd,_0x1b0a87,_0x5e1413,_0x2e87aa){const _0x3f9a2f=a123_0x3f2470;this[_0x3f9a2f(0x17d)]=_0x29e13a,this['queueEventService']=_0x4526fd,this['performerService']=_0x1b0a87,this[_0x3f9a2f(0x149)]=_0x5e1413,this[_0x3f9a2f(0x155)]=_0x2e87aa,this[_0x3f9a2f(0x12f)][_0x3f9a2f(0x175)](constants_1[_0x3f9a2f(0x14c)],UPDATE_EARNING_CHANNEL,this[_0x3f9a2f(0x159)][_0x3f9a2f(0x158)](this));}async[a123_0x3f2470(0x159)](_0x30fe58){const _0x23c8ed=a123_0x3f2470;try{const _0x19440d=_0x30fe58[_0x23c8ed(0x143)];if(_0x30fe58['eventName']!==constants_2['EVENT'][_0x23c8ed(0x146)]||(_0x19440d===null||_0x19440d===void 0x0?void 0x0:_0x19440d[_0x23c8ed(0x12e)])!==constants_3['PAYMENT_STATUS'][_0x23c8ed(0x132)])return;const _0x563d02=_0x19440d['sellerId'],_0x42ad38=await this[_0x23c8ed(0x16e)][_0x23c8ed(0x14a)](_0x563d02);if(!_0x42ad38)return;let _0x56d08b=0x0,_0x2525b6=0x0;const [_0xd265e8,_0x2ff834,_0x44a42f,_0x38e652]=await Promise['all']([this[_0x23c8ed(0x149)][_0x23c8ed(0x15a)](constants_4[_0x23c8ed(0x16b)]['PERFORMER_COMMISSION']),this[_0x23c8ed(0x149)][_0x23c8ed(0x164)](constants_4[_0x23c8ed(0x16b)][_0x23c8ed(0x130)]),this[_0x23c8ed(0x155)][_0x23c8ed(0x189)]({'performerId':_0x42ad38[_0x23c8ed(0x16a)]}),this[_0x23c8ed(0x149)][_0x23c8ed(0x164)](constants_4[_0x23c8ed(0x16b)][_0x23c8ed(0x157)])]);if(_0x42ad38['studioId']){_0x2525b6=_0x44a42f&&typeof _0x44a42f[_0x23c8ed(0x176)]===_0x23c8ed(0x12d)?_0x44a42f[_0x23c8ed(0x176)]:_0x2ff834,_0x56d08b=_0x44a42f&&typeof _0x44a42f[_0x23c8ed(0x129)]==='number'?_0x44a42f['memberCommission']:parseInt(process[_0x23c8ed(0x182)][_0x23c8ed(0x139)],0xa);const _0x26e8e8={'conversionRate':_0x38e652||parseInt(process[_0x23c8ed(0x182)]['CONVERSION_RATE'],0xa),'grossPrice':_0x19440d[_0x23c8ed(0x17f)],'commission':_0x2525b6,'netPrice':_0x19440d[_0x23c8ed(0x17f)]*(_0x2525b6/0x64),'performerId':_0x19440d['sellerId'],'userId':_0x19440d['sourceId'],'transactionTokenId':_0x19440d[_0x23c8ed(0x16a)],'type':_0x19440d[_0x23c8ed(0x15f)],'createdAt':_0x19440d['createdAt'],'transactionStatus':_0x19440d[_0x23c8ed(0x12e)],'sourceId':_0x19440d[_0x23c8ed(0x183)],'source':constants_2['ROLE'][_0x23c8ed(0x185)],'target':constants_2[_0x23c8ed(0x187)][_0x23c8ed(0x12a)],'targetId':_0x42ad38[_0x23c8ed(0x17e)]};await this['earningModel'][_0x23c8ed(0x169)](_0x26e8e8);}else{if(_0x44a42f)switch(_0x19440d[_0x23c8ed(0x15f)]){case constants_1[_0x23c8ed(0x148)][_0x23c8ed(0x13b)]:_0x56d08b=_0x44a42f[_0x23c8ed(0x13c)];break;case constants_1[_0x23c8ed(0x148)][_0x23c8ed(0x12b)]:_0x56d08b=_0x44a42f[_0x23c8ed(0x166)];break;case constants_1['PURCHASE_ITEM_TYPE'][_0x23c8ed(0x186)]:_0x56d08b=_0x44a42f[_0x23c8ed(0x14b)];break;case constants_1[_0x23c8ed(0x148)][_0x23c8ed(0x174)]:_0x56d08b=_0x44a42f[_0x23c8ed(0x14e)];break;case constants_1['PURCHASE_ITEM_TYPE']['PHOTO']:_0x56d08b=_0x44a42f[_0x23c8ed(0x131)];break;case constants_1[_0x23c8ed(0x148)][_0x23c8ed(0x172)]:_0x56d08b=_0x44a42f[_0x23c8ed(0x12c)];break;default:break;}else _0x56d08b=_0xd265e8['getValue']();}const _0x3372fa=_0x42ad38[_0x23c8ed(0x17e)]?_0x19440d['totalPrice']*(_0x2525b6/0x64):_0x19440d[_0x23c8ed(0x17f)],_0x26ec88=_0x3372fa*(_0x56d08b/0x64),_0x18b3f3=new this[(_0x23c8ed(0x17d))]();_0x18b3f3[_0x23c8ed(0x177)](_0x23c8ed(0x150),_0x38e652||parseInt(process[_0x23c8ed(0x182)][_0x23c8ed(0x157)],0xa)),_0x18b3f3[_0x23c8ed(0x177)](_0x23c8ed(0x145),_0x3372fa),_0x18b3f3['set'](_0x23c8ed(0x170),_0x56d08b),_0x18b3f3[_0x23c8ed(0x177)](_0x23c8ed(0x17b),_0x26ec88),_0x18b3f3[_0x23c8ed(0x177)](_0x23c8ed(0x178),_0x19440d[_0x23c8ed(0x183)]),_0x18b3f3['set'](_0x23c8ed(0x14f),_0x19440d[_0x23c8ed(0x141)]),_0x18b3f3[_0x23c8ed(0x177)](_0x23c8ed(0x156),_0x19440d[_0x23c8ed(0x16a)]),_0x18b3f3['set'](_0x23c8ed(0x15f),_0x19440d[_0x23c8ed(0x15f)]),_0x18b3f3[_0x23c8ed(0x177)](_0x23c8ed(0x154),_0x19440d[_0x23c8ed(0x154)]),_0x18b3f3[_0x23c8ed(0x177)](_0x23c8ed(0x13f),_0x19440d[_0x23c8ed(0x12e)]),_0x18b3f3[_0x23c8ed(0x177)](_0x23c8ed(0x141),_0x19440d['sourceId']),_0x18b3f3['set'](_0x23c8ed(0x140),_0x19440d[_0x23c8ed(0x183)]),_0x18b3f3[_0x23c8ed(0x177)](_0x23c8ed(0x153),constants_2[_0x23c8ed(0x187)][_0x23c8ed(0x163)]),_0x18b3f3[_0x23c8ed(0x177)](_0x23c8ed(0x165),constants_2['ROLE'][_0x23c8ed(0x185)]),await _0x18b3f3['save']();}catch(_0x1039cb){console['log'](_0x1039cb);}}};TransactionEarningListener=__decorate([common_1[a123_0x3f2470(0x15b)](),__param(0x0,common_1[a123_0x3f2470(0x184)](earning_provider_1[a123_0x3f2470(0x128)])),__metadata('design:paramtypes',[mongoose_1[a123_0x3f2470(0x136)],kernel_1[a123_0x3f2470(0x15c)],services_1['PerformerService'],settings_1['SettingService'],services_1[a123_0x3f2470(0x168)]])],TransactionEarningListener),exports[a123_0x3f2470(0x13e)]=TransactionEarningListener;