'use strict';const a238_0x100c=['EntityNotFoundException','233245LSgWAa','PUBLIC','__esModule','3Hzrgij','sourceId','toResponse','658914xkvsOS','performer','UserService','countDocuments','toObjectId','../providers','searchByKeyword','filter','recipientInfo','119893SoFtjT','keyword','../dtos','deserializeConversationId','__decorate','recipients','CONVERSATION_MODEL_PROVIDER','239uGzkoa','object','findOne','../../../kernel/helpers/string.helper','1kOapkS','performerService','../constants','findByIds','exec','conversationModel','all','find','stream_','UserDto','Inject','Model','../../performer/services','user','defineProperty','UserSearchService','getList','390333UXnoVc','performerId','split','Injectable','userService','__param','1HDYKEz','length','NOTIFICATION_MESSAGE_MODEL_PROVIDER','sort','findDetail','ConversationDto','ConversationService','PRIVATE','findPerformerPublicConversation','NotFoundException','conversationId','performerSearchService','255682OszJXB','140wCOWJs','1073ZrjdXg','forwardRef','_id','3124LZjaxA','source','decorate','design:paramtypes','../../performer/dtos','metadata','findById','CONVERSATION_TYPE','conversation:','recipientId','PerformerService','type','getPrivateConversationByStreamId','PerformerSearchService','assign','_performerId_','notiticationMessageModel','updateOne','3IZSjje','function','map','lean','../../stream/dtos','__metadata','create','getOwnPropertyDescriptor','userSearchService','toString','../../user/dtos','PerformerDto','createPrivateConversation'];const a238_0x21ad8f=a238_0x16bc;(function(_0x39502b,_0x4e6ae5){const _0x312c42=a238_0x16bc;while(!![]){try{const _0x17893b=parseInt(_0x312c42(0xc0))*-parseInt(_0x312c42(0xc4))+-parseInt(_0x312c42(0xfe))*parseInt(_0x312c42(0xea))+-parseInt(_0x312c42(0xf3))*-parseInt(_0x312c42(0xe7))+parseInt(_0x312c42(0xd6))*parseInt(_0x312c42(0xe4))+parseInt(_0x312c42(0x10f))+-parseInt(_0x312c42(0xb3))*parseInt(_0x312c42(0xbf))+parseInt(_0x312c42(0xfa))*parseInt(_0x312c42(0xc1));if(_0x17893b===_0x4e6ae5)break;else _0x39502b['push'](_0x39502b['shift']());}catch(_0x54dba6){_0x39502b['push'](_0x39502b['shift']());}}}(a238_0x100c,0x567be));var __decorate=this&&this[a238_0x21ad8f(0xf7)]||function(_0x3143cc,_0x438d27,_0x54cfbb,_0x3bc220){const _0x415b76=a238_0x21ad8f;var _0x32a7cc=arguments['length'],_0x395771=_0x32a7cc<0x3?_0x438d27:_0x3bc220===null?_0x3bc220=Object[_0x415b76(0xdd)](_0x438d27,_0x54cfbb):_0x3bc220,_0x36ac46;if(typeof Reflect==='object'&&typeof Reflect[_0x415b76(0xc6)]===_0x415b76(0xd7))_0x395771=Reflect[_0x415b76(0xc6)](_0x3143cc,_0x438d27,_0x54cfbb,_0x3bc220);else{for(var _0xb94d31=_0x3143cc[_0x415b76(0xb4)]-0x1;_0xb94d31>=0x0;_0xb94d31--)if(_0x36ac46=_0x3143cc[_0xb94d31])_0x395771=(_0x32a7cc<0x3?_0x36ac46(_0x395771):_0x32a7cc>0x3?_0x36ac46(_0x438d27,_0x54cfbb,_0x395771):_0x36ac46(_0x438d27,_0x54cfbb))||_0x395771;}return _0x32a7cc>0x3&&_0x395771&&Object[_0x415b76(0x10c)](_0x438d27,_0x54cfbb,_0x395771),_0x395771;},__metadata=this&&this[a238_0x21ad8f(0xdb)]||function(_0x1faca6,_0x14b6e1){const _0x3b742f=a238_0x21ad8f;if(typeof Reflect===_0x3b742f(0xfb)&&typeof Reflect[_0x3b742f(0xc9)]==='function')return Reflect[_0x3b742f(0xc9)](_0x1faca6,_0x14b6e1);},__param=this&&this[a238_0x21ad8f(0xb2)]||function(_0x38ce08,_0x379cf1){return function(_0x427fbe,_0x2e86d3){_0x379cf1(_0x427fbe,_0x2e86d3,_0x38ce08);};};Object[a238_0x21ad8f(0x10c)](exports,a238_0x21ad8f(0xe6),{'value':!![]}),exports[a238_0x21ad8f(0xb9)]=void 0x0;const common_1=require('@nestjs/common'),mongoose_1=require('mongoose'),string_helper_1=require(a238_0x21ad8f(0xfd)),services_1=require('../../user/services'),services_2=require(a238_0x21ad8f(0x10a)),dtos_1=require(a238_0x21ad8f(0xe0)),dtos_2=require(a238_0x21ad8f(0xc8)),dtos_3=require(a238_0x21ad8f(0xda)),kernel_1=require('../../../kernel'),dtos_4=require(a238_0x21ad8f(0xf5)),constants_1=require(a238_0x21ad8f(0x100)),providers_1=require(a238_0x21ad8f(0xef));function a238_0x16bc(_0x3d7744,_0x1c9e5d){return a238_0x16bc=function(_0x100cd2,_0x16bc24){_0x100cd2=_0x100cd2-0xb2;let _0x5a581a=a238_0x100c[_0x100cd2];return _0x5a581a;},a238_0x16bc(_0x3d7744,_0x1c9e5d);}let ConversationService=class ConversationService{constructor(_0x5261a2,_0x59654f,_0xd4c184,_0x54716f,_0x1d53f6,_0x2e7353){const _0x432864=a238_0x21ad8f;this[_0x432864(0x103)]=_0x5261a2,this[_0x432864(0x113)]=_0x59654f,this[_0x432864(0xde)]=_0xd4c184,this[_0x432864(0xbe)]=_0x54716f,this[_0x432864(0xff)]=_0x1d53f6,this[_0x432864(0xd4)]=_0x2e7353;}async[a238_0x21ad8f(0x105)](_0x8a27b9){const _0x5934d3=a238_0x21ad8f;return this[_0x5934d3(0x103)][_0x5934d3(0x105)](_0x8a27b9);}async[a238_0x21ad8f(0xfc)](_0x468d10){const _0x3fea4d=a238_0x21ad8f;return this[_0x3fea4d(0x103)][_0x3fea4d(0xfc)](_0x468d10);}async[a238_0x21ad8f(0xe2)](_0x3da86e,_0x15c312){const _0x22982f=a238_0x21ad8f;let _0x21492e=await this[_0x22982f(0x103)][_0x22982f(0xfc)]({'type':constants_1[_0x22982f(0xcb)]['PRIVATE'],'recipients':{'$all':[{'source':_0x3da86e[_0x22982f(0xc5)],'sourceId':string_helper_1['toObjectId'](_0x3da86e[_0x22982f(0xe8)])},{'source':_0x15c312[_0x22982f(0xc5)],'sourceId':_0x15c312[_0x22982f(0xe8)]}]}})[_0x22982f(0xd9)]()[_0x22982f(0x102)]();!_0x21492e&&(_0x21492e=await this[_0x22982f(0x103)][_0x22982f(0xdc)]({'type':constants_1[_0x22982f(0xcb)][_0x22982f(0xba)],'recipients':[_0x3da86e,_0x15c312],'createdAt':new Date(),'updatedAt':new Date()}));const _0x1d67ba=new dtos_4[(_0x22982f(0xb8))](_0x21492e);_0x1d67ba['totalNotSeenMessages']=0x0;if(_0x15c312[_0x22982f(0xc5)]===_0x22982f(0xeb)){const _0x451fce=await this[_0x22982f(0xff)]['findById'](_0x15c312[_0x22982f(0xe8)]);_0x451fce&&(_0x1d67ba[_0x22982f(0xf2)]=new dtos_2[(_0x22982f(0xe1))](_0x451fce)['toResponse'](![]));}if(_0x15c312[_0x22982f(0xc5)]==='user'){const _0x21bf6c=await this[_0x22982f(0x113)][_0x22982f(0xca)](_0x15c312[_0x22982f(0xe8)]);if(_0x21bf6c)_0x1d67ba[_0x22982f(0xf2)]=new dtos_1[(_0x22982f(0x107))](_0x21bf6c)[_0x22982f(0xe9)](![]);}return _0x1d67ba;}async[a238_0x21ad8f(0x10e)](_0xd0365,_0x5f0d7c){const _0x6e7dea=a238_0x21ad8f;let _0x5469aa={'recipients':{'$elemMatch':{'source':_0x5f0d7c[_0x6e7dea(0xc5)],'sourceId':string_helper_1[_0x6e7dea(0xee)](_0x5f0d7c['sourceId'])}}};if(_0xd0365[_0x6e7dea(0xf4)]){let _0x41319e=null;_0x5f0d7c[_0x6e7dea(0xc5)]===_0x6e7dea(0x10b)&&(_0x41319e=await this[_0x6e7dea(0xbe)][_0x6e7dea(0xf0)]({'q':_0xd0365[_0x6e7dea(0xf4)]}));_0x5f0d7c[_0x6e7dea(0xc5)]===_0x6e7dea(0xeb)&&(_0x41319e=await this['userSearchService'][_0x6e7dea(0xf0)]({'q':_0xd0365[_0x6e7dea(0xf4)]}));const _0x4ce1f7=_0x41319e&&_0x41319e?_0x41319e[_0x6e7dea(0xd8)](_0x9ef01d=>_0x9ef01d['_id']):[];_0x5469aa={'$and':[{'recipients':{'$elemMatch':{'source':_0x5f0d7c['source']===_0x6e7dea(0x10b)?_0x6e7dea(0xeb):_0x6e7dea(0x10b),'sourceId':{'$in':_0x4ce1f7}}}},{'recipients':{'$elemMatch':{'source':_0x5f0d7c[_0x6e7dea(0xc5)],'sourceId':string_helper_1[_0x6e7dea(0xee)](_0x5f0d7c['sourceId'])}}}]};}_0xd0365['type']&&(_0x5469aa[_0x6e7dea(0xcf)]=_0xd0365[_0x6e7dea(0xcf)]);const [_0x52204f,_0x40dc21]=await Promise[_0x6e7dea(0x104)]([this[_0x6e7dea(0x103)][_0x6e7dea(0x105)](_0x5469aa)[_0x6e7dea(0xd9)]()[_0x6e7dea(0xb6)]({'lastMessageCreatedAt':-0x1,'updatedAt':-0x1}),this[_0x6e7dea(0x103)][_0x6e7dea(0xed)](_0x5469aa)]),_0x258010=_0x52204f['map'](_0x3b32eb=>{const _0x5ca46c=_0x6e7dea,_0x5b1089=_0x3b32eb[_0x5ca46c(0xf8)][_0x5ca46c(0x105)](_0x17e8f4=>_0x17e8f4['sourceId']['toString']()!==_0x5f0d7c[_0x5ca46c(0xe8)]['toString']());return _0x5b1089&&_0x5b1089[_0x5ca46c(0xe8)];}),_0x2c484f=_0x52204f[_0x6e7dea(0xd8)](_0x29c28d=>_0x29c28d[_0x6e7dea(0xc3)]);let _0x191b25=[],_0x3d638f=[];const _0x5d4d3d=_0x2c484f[_0x6e7dea(0xb4)]?await this[_0x6e7dea(0xd4)][_0x6e7dea(0x105)]({'conversationId':{'$in':_0x2c484f}}):[];_0x5f0d7c[_0x6e7dea(0xc5)]===_0x6e7dea(0x10b)&&(_0x3d638f=_0x258010[_0x6e7dea(0xb4)]?await this['performerService']['findByIds'](_0x258010):[]);_0x5f0d7c[_0x6e7dea(0xc5)]===_0x6e7dea(0xeb)&&(_0x191b25=_0x258010[_0x6e7dea(0xb4)]?await this[_0x6e7dea(0x113)]['findByIds'](_0x258010):[]);const _0xa569ec=_0x52204f[_0x6e7dea(0xd8)](_0x1bbe85=>{const _0x197499=_0x6e7dea,_0x1ac69d=new dtos_4[(_0x197499(0xb8))](_0x1bbe85),_0x4ecdcc=_0x1ac69d[_0x197499(0xf8)]['find'](_0x1286fe=>_0x1286fe[_0x197499(0xe8)][_0x197499(0xdf)]()!==_0x5f0d7c[_0x197499(0xe8)][_0x197499(0xdf)]());let _0x1d5d7c=null;if(_0x4ecdcc){_0x191b25[_0x197499(0xb4)]&&(_0x1d5d7c=_0x191b25['find'](_0x419633=>_0x419633[_0x197499(0xc3)]['toString']()===_0x4ecdcc[_0x197499(0xe8)][_0x197499(0xdf)]()));_0x3d638f['length']&&(_0x1d5d7c=_0x3d638f[_0x197499(0x105)](_0x129736=>_0x129736[_0x197499(0xc3)][_0x197499(0xdf)]()===_0x4ecdcc['sourceId'][_0x197499(0xdf)]()));const _0x4230e1=_0x5d4d3d[_0x197499(0xb4)]&&_0x5d4d3d[_0x197499(0xf1)](_0x219ed1=>_0x219ed1[_0x197499(0xbd)][_0x197499(0xdf)]()===_0x1ac69d[_0x197499(0xc3)]['toString']()),_0x292f96=_0x4230e1&&_0x4230e1[_0x197499(0x105)](_0x11cd2a=>_0x11cd2a[_0x197499(0xcd)][_0x197499(0xdf)]()===_0x5f0d7c[_0x197499(0xe8)][_0x197499(0xdf)]());return Object[_0x197499(0xd2)](Object[_0x197499(0xd2)]({},_0x1ac69d),{'recipientInfo':new dtos_1[(_0x197499(0x107))](_0x1d5d7c)[_0x197499(0xe9)](),'totalNotSeenMessages':_0x292f96?_0x292f96['totalNotReadMessage']:0x0});}return _0x1ac69d;});return{'data':_0xa569ec,'total':_0x40dc21};}async[a238_0x21ad8f(0xca)](_0x2df887){const _0x674ba2=a238_0x21ad8f;return this[_0x674ba2(0x103)][_0x674ba2(0xfc)]({'_id':_0x2df887})[_0x674ba2(0xd9)]()['exec']();}async[a238_0x21ad8f(0x101)](_0x1e0dbc){const _0x4f1254=a238_0x21ad8f;return this['conversationModel'][_0x4f1254(0x105)]({'_id':{'$in':_0x1e0dbc}});}async[a238_0x21ad8f(0xb7)](_0xa5b780,_0x462336){const _0x5047c3=a238_0x21ad8f,_0x151914=await this['conversationModel'][_0x5047c3(0xfc)]({'_id':_0xa5b780});if(!_0x151914)throw new kernel_1[(_0x5047c3(0xe3))]();const _0x270d61=_0x151914[_0x5047c3(0xf8)][_0x5047c3(0xf1)](_0x5f1e60=>_0x462336[_0x5047c3(0xc5)]!==_0x5f1e60[_0x5047c3(0xc5)])[_0x5047c3(0xd8)](_0x14b429=>_0x14b429[_0x5047c3(0xe8)]);let _0x271c02=[];_0x270d61[_0x5047c3(0xb4)]&&_0x462336[_0x5047c3(0xc5)]==='user'&&(_0x271c02=await this[_0x5047c3(0xff)][_0x5047c3(0x101)](_0x270d61));_0x270d61[_0x5047c3(0xb4)]&&_0x462336[_0x5047c3(0xc5)]===_0x5047c3(0xeb)&&(_0x271c02=await this[_0x5047c3(0x113)][_0x5047c3(0x101)](_0x270d61));const _0x56ba86=new dtos_4['ConversationDto'](_0x151914);return _0x271c02[_0x5047c3(0xb4)]&&(_0x56ba86[_0x5047c3(0xf2)]=new dtos_1[(_0x5047c3(0x107))](_0x271c02[0x0])[_0x5047c3(0xe9)]()),_0x56ba86;}async[a238_0x21ad8f(0xbb)](_0x55db07){const _0x28c930=a238_0x21ad8f;return this[_0x28c930(0x103)][_0x28c930(0xfc)]({'type':'stream_'+constants_1[_0x28c930(0xcb)][_0x28c930(0xe5)],'performerId':_0x55db07})['lean']()[_0x28c930(0x102)]();}async['createStreamConversation'](_0x19115a,_0x21a55a){const _0x2f084a=a238_0x21ad8f;return this[_0x2f084a(0x103)][_0x2f084a(0xdc)]({'streamId':_0x19115a['_id'],'performerId':_0x19115a[_0x2f084a(0x110)]?_0x19115a[_0x2f084a(0x110)]:null,'recipients':_0x21a55a||[],'name':_0x2f084a(0x106)+_0x19115a[_0x2f084a(0xcf)]+_0x2f084a(0xd3)+_0x19115a[_0x2f084a(0x110)],'type':_0x2f084a(0x106)+_0x19115a[_0x2f084a(0xcf)],'createdAt':new Date(),'updatedAt':new Date()});}async[a238_0x21ad8f(0xd0)](_0x43ad20){const _0x53bd1d=a238_0x21ad8f,_0x3c2e1f=await this['conversationModel'][_0x53bd1d(0xfc)]({'streamId':_0x43ad20});if(!_0x3c2e1f)throw new common_1[(_0x53bd1d(0xbc))]();return new dtos_4[(_0x53bd1d(0xb8))](_0x3c2e1f);}async['addRecipient'](_0x3ff1a1,_0x244296){const _0x225efe=a238_0x21ad8f;return this[_0x225efe(0x103)][_0x225efe(0xd5)]({'_id':_0x3ff1a1},{'$addToSet':{'recipients':_0x244296}});}['serializeConversation'](_0x1f44ce,_0x6861b5){const _0x2c3832=a238_0x21ad8f;return _0x2c3832(0xcc)+_0x6861b5+':'+_0x1f44ce;}[a238_0x21ad8f(0xf6)](_0x12ca77){const _0x8fb740=a238_0x21ad8f,_0x2de7c0=_0x12ca77[_0x8fb740(0x111)](':');if(!_0x2de7c0[_0x8fb740(0xb4)])return'';return _0x2de7c0[_0x2de7c0[_0x8fb740(0xb4)]-0x1];}};ConversationService=__decorate([common_1[a238_0x21ad8f(0x112)](),__param(0x0,common_1[a238_0x21ad8f(0x108)](providers_1[a238_0x21ad8f(0xf9)])),__param(0x1,common_1['Inject'](common_1[a238_0x21ad8f(0xc2)](()=>services_1[a238_0x21ad8f(0xec)]))),__param(0x2,common_1[a238_0x21ad8f(0x108)](common_1[a238_0x21ad8f(0xc2)](()=>services_1['UserSearchService']))),__param(0x3,common_1[a238_0x21ad8f(0x108)](common_1[a238_0x21ad8f(0xc2)](()=>services_2[a238_0x21ad8f(0xd1)]))),__param(0x4,common_1[a238_0x21ad8f(0x108)](common_1[a238_0x21ad8f(0xc2)](()=>services_2[a238_0x21ad8f(0xce)]))),__param(0x5,common_1[a238_0x21ad8f(0x108)](providers_1[a238_0x21ad8f(0xb5)])),__metadata(a238_0x21ad8f(0xc7),[mongoose_1[a238_0x21ad8f(0x109)],services_1['UserService'],services_1[a238_0x21ad8f(0x10d)],services_2[a238_0x21ad8f(0xd1)],services_2[a238_0x21ad8f(0xce)],mongoose_1[a238_0x21ad8f(0x109)]])],ConversationService),exports['ConversationService']=ConversationService;