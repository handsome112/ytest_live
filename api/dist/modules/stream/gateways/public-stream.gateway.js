'use strict';const a538_0x503d=['5667OzcDyX','user','generateUuid','authId','../../user/services','UserDto','all','leave','../../../kernel/helpers/string.helper','conversationId','3435WJIEMP','log','__metadata','split','@nestjs/websockets','model-left','design:paramtypes','authService','join','findByPerformerId','message_created_conversation_','244395kdrHNx','542981Lecsot','SocketUserService','public-room-changed','guest','public-stream/live','PublicStreamWsGateway','username','handshake','PUBLIC_CHAT','../constant','metadata','performerService','length','emitToUsers','decorate','../../message/services','member','streamService','type','handleLeavePublicRoom','verifyJWT','../../performer/services','handleJoinPublicRoom','mongoose','69UnkZBO','setStreamingStatus','10673PBtAly','defineProperty','findByIds','142986RaImux','getSourceFromJWT','122ITXYto','public-stream/join','../../socket/services/socket-user.service','performer','object','handleReJoinPublicRoom','join-broadcaster','sourceId','findById','getOwnPropertyDescriptor','SubscribeMessage','@nestjs/common','../../auth/services','../../auth/dtos','_id','1dRTaBD','prototype','socketService','conversationService','updateStats','streamId','getRoomUserConnections','getConnectionValue','updateLastStreamingTime','design:returntype','Inject','model','removeConnectionFromRoom','map','UserService','pick','emitToRoom','WebSocketGateway','../providers/stream.provider','keys','streamModel','source','AuthService','forEach','design:type','function','userService','updateOne','ConversationService','serializeConversation','\x20has\x20joined\x20this\x20conversation','toResponse','\x20has\x20left\x20this\x20conversation','goLive','lodash','query','1695471QsHVxn','isStreaming','STREAM_MODEL_PROVIDER','addConnectionToRoom','push','../services','performerId','model-joined','getTime','toDate'];const a538_0xd4bcd5=a538_0x1930;function a538_0x1930(_0xd7e803,_0x30f9f3){return a538_0x1930=function(_0x503d5d,_0x193069){_0x503d5d=_0x503d5d-0xdc;let _0x435015=a538_0x503d[_0x503d5d];return _0x435015;},a538_0x1930(_0xd7e803,_0x30f9f3);}(function(_0xfd3e42,_0x4398d3){const _0x24aed7=a538_0x1930;while(!![]){try{const _0x36932e=-parseInt(_0x24aed7(0xed))+-parseInt(_0x24aed7(0x12c))*-parseInt(_0x24aed7(0xef))+parseInt(_0x24aed7(0x141))+parseInt(_0x24aed7(0xfe))*parseInt(_0x24aed7(0x142))+parseInt(_0x24aed7(0x136))+-parseInt(_0x24aed7(0xea))*-parseInt(_0x24aed7(0xe8))+-parseInt(_0x24aed7(0x122));if(_0x36932e===_0x4398d3)break;else _0xfd3e42['push'](_0xfd3e42['shift']());}catch(_0xbd40b7){_0xfd3e42['push'](_0xfd3e42['shift']());}}}(a538_0x503d,0x5cd05));var __decorate=this&&this['__decorate']||function(_0x235116,_0xb2aa08,_0x505ebd,_0x59ea5b){const _0x50000b=a538_0x1930;var _0x358055=arguments[_0x50000b(0xdc)],_0x1c44e8=_0x358055<0x3?_0xb2aa08:_0x59ea5b===null?_0x59ea5b=Object[_0x50000b(0xf8)](_0xb2aa08,_0x505ebd):_0x59ea5b,_0x1bd836;if(typeof Reflect===_0x50000b(0xf3)&&typeof Reflect[_0x50000b(0xde)]===_0x50000b(0x117))_0x1c44e8=Reflect['decorate'](_0x235116,_0xb2aa08,_0x505ebd,_0x59ea5b);else{for(var _0x122d9c=_0x235116[_0x50000b(0xdc)]-0x1;_0x122d9c>=0x0;_0x122d9c--)if(_0x1bd836=_0x235116[_0x122d9c])_0x1c44e8=(_0x358055<0x3?_0x1bd836(_0x1c44e8):_0x358055>0x3?_0x1bd836(_0xb2aa08,_0x505ebd,_0x1c44e8):_0x1bd836(_0xb2aa08,_0x505ebd))||_0x1c44e8;}return _0x358055>0x3&&_0x1c44e8&&Object[_0x50000b(0xeb)](_0xb2aa08,_0x505ebd,_0x1c44e8),_0x1c44e8;},__metadata=this&&this[a538_0xd4bcd5(0x138)]||function(_0x3780c9,_0x2f2c20){const _0x4d48af=a538_0xd4bcd5;if(typeof Reflect===_0x4d48af(0xf3)&&typeof Reflect['metadata']===_0x4d48af(0x117))return Reflect[_0x4d48af(0x14c)](_0x3780c9,_0x2f2c20);},__param=this&&this['__param']||function(_0x5e6623,_0x1f149b){return function(_0x2978d8,_0x15864b){_0x1f149b(_0x2978d8,_0x15864b,_0x5e6623);};};Object[a538_0xd4bcd5(0xeb)](exports,'__esModule',{'value':!![]}),exports['PublicStreamWsGateway']=void 0x0;const websockets_1=require(a538_0xd4bcd5(0x13a)),mongoose_1=require(a538_0xd4bcd5(0xe7)),common_1=require(a538_0xd4bcd5(0xfa)),services_1=require(a538_0xd4bcd5(0xfb)),services_2=require(a538_0xd4bcd5(0x127)),constant_1=require(a538_0xd4bcd5(0x14b)),socket_user_service_1=require(a538_0xd4bcd5(0xf1)),string_helper_1=require(a538_0xd4bcd5(0x134)),services_3=require(a538_0xd4bcd5(0x130)),dtos_1=require('../../user/dtos'),moment=require('moment'),services_4=require(a538_0xd4bcd5(0xe5)),services_5=require(a538_0xd4bcd5(0xdf)),lodash_1=require(a538_0xd4bcd5(0x120)),dtos_2=require(a538_0xd4bcd5(0xfc)),stream_provider_1=require(a538_0xd4bcd5(0x110));let PublicStreamWsGateway=class PublicStreamWsGateway{constructor(_0x537168,_0x34ebfe,_0x483f93,_0x2e4879,_0x4bc336,_0x257182,_0x243ed9){const _0x3857ba=a538_0xd4bcd5;this[_0x3857ba(0x112)]=_0x537168,this[_0x3857ba(0x13d)]=_0x34ebfe,this[_0x3857ba(0xe1)]=_0x483f93,this[_0x3857ba(0x100)]=_0x2e4879,this['userService']=_0x4bc336,this['performerService']=_0x257182,this[_0x3857ba(0x101)]=_0x243ed9;}async['goLive'](_0x31b294,_0x26f03b){const _0x57f052=a538_0xd4bcd5;try{const {conversationId:_0x2fc697}=_0x26f03b;if(!_0x2fc697)return;const _0x36d164=await this[_0x57f052(0x101)][_0x57f052(0xf7)](_0x2fc697);if(!_0x36d164)return;const {token:_0x54fdbd}=_0x31b294[_0x57f052(0x149)][_0x57f052(0x121)];if(!_0x54fdbd)return;const _0x5abc75=await this['authService'][_0x57f052(0xee)](_0x54fdbd);if(!_0x5abc75)return;const _0x88c0e3=this[_0x57f052(0x101)]['serializeConversation'](_0x36d164['_id'],_0x36d164[_0x57f052(0xe2)]);this['socketService']['emitToRoom'](_0x88c0e3,'join-broadcaster',{'performerId':_0x5abc75[_0x57f052(0xfd)]}),await Promise[_0x57f052(0x132)]([this[_0x57f052(0x14d)]['goLive'](_0x5abc75[_0x57f052(0xfd)]),this[_0x57f052(0x14d)][_0x57f052(0xe9)](_0x5abc75[_0x57f052(0xfd)],constant_1['PUBLIC_CHAT']),this['streamModel'][_0x57f052(0x119)]({'_id':_0x36d164[_0x57f052(0x103)]},{'$set':{'isStreaming':!![]}})]);}catch(_0x396ed2){console['log'](_0x396ed2);}}async[a538_0xd4bcd5(0xe6)](_0xb25781,_0x444cba){const _0x56d5d0=a538_0xd4bcd5;try{const {token:_0x577b70}=_0xb25781[_0x56d5d0(0x149)]['query'],{conversationId:_0x470b39}=_0x444cba;if(!_0x470b39)return;const _0x5b7eed=await this[_0x56d5d0(0x101)][_0x56d5d0(0xf7)](_0x470b39);if(!_0x5b7eed)return;const {performerId:_0x121b17,type:_0x27107b}=_0x5b7eed,_0x3cea6d=_0x577b70&&await this[_0x56d5d0(0x13d)][_0x56d5d0(0xe4)](_0x577b70);let _0x1f344f;const _0x5ac1c5=lodash_1[_0x56d5d0(0x10d)](_0x3cea6d,[_0x56d5d0(0x113),'sourceId',_0x56d5d0(0x12f)]);_0x5ac1c5&&_0x5ac1c5['source']==='user'&&(_0x1f344f=await this['userService'][_0x56d5d0(0xf7)](_0x5ac1c5[_0x56d5d0(0xf6)]));_0x5ac1c5&&_0x5ac1c5['source']===_0x56d5d0(0xf2)&&(_0x1f344f=await this[_0x56d5d0(0x14d)][_0x56d5d0(0xf7)](_0x5ac1c5[_0x56d5d0(0xf6)]));const _0x4063b2=this[_0x56d5d0(0x101)][_0x56d5d0(0x11b)](_0x470b39,_0x27107b);_0xb25781[_0x56d5d0(0x13e)](_0x4063b2);let _0xab5bff=_0x56d5d0(0x145);_0x1f344f&&(_0xab5bff=_0x5ac1c5&&_0x5ac1c5['source']===_0x56d5d0(0x12d)?_0x56d5d0(0xe0):'model',await this[_0x56d5d0(0x100)][_0x56d5d0(0x10e)](_0x4063b2,_0x56d5d0(0x140)+_0x5b7eed[_0x56d5d0(0xfd)],{'text':_0x1f344f[_0x56d5d0(0x148)]+'\x20has\x20joined\x20this\x20conversation','_id':string_helper_1[_0x56d5d0(0x12e)](),'conversationId':_0x5b7eed['_id'],'isSystem':!![]}));await this['socketService'][_0x56d5d0(0x125)](_0x4063b2,_0x1f344f?_0x1f344f['_id']:_0xb25781['id'],_0xab5bff);const _0x2522bc=await this[_0x56d5d0(0x100)]['getRoomUserConnections'](_0x4063b2),_0x4572aa=[];Object[_0x56d5d0(0x111)](_0x2522bc)['forEach'](_0x5affb1=>{const _0x521f39=_0x56d5d0,_0x58d6c4=_0x2522bc[_0x5affb1]['split'](',');_0x58d6c4[0x0]==='member'&&_0x4572aa[_0x521f39(0x126)](_0x5affb1);});_0x4572aa[_0x56d5d0(0xdc)]&&_0xab5bff==='model'&&''+_0x1f344f['_id']===''+_0x5b7eed[_0x56d5d0(0x128)]&&await this[_0x56d5d0(0x100)][_0x56d5d0(0xdd)](_0x4572aa,'model-joined',{'conversationId':_0x470b39});const _0x56db3a=_0x4572aa[_0x56d5d0(0xdc)]?await this[_0x56d5d0(0x118)][_0x56d5d0(0xec)](_0x4572aa):[],_0x52c6b7={'total':_0x56db3a['length'],'members':_0x56db3a[_0x56d5d0(0x10b)](_0x3f7aa5=>new dtos_1[(_0x56d5d0(0x131))](_0x3f7aa5)[_0x56d5d0(0x11d)]()),'conversationId':_0x470b39};this[_0x56d5d0(0x100)][_0x56d5d0(0x10e)](_0x4063b2,_0x56d5d0(0x144),_0x52c6b7);const _0x462b5c=await this[_0x56d5d0(0xe1)][_0x56d5d0(0x13f)](_0x121b17,{'type':constant_1[_0x56d5d0(0x14a)],'isStreaming':!![]});_0x462b5c&&this[_0x56d5d0(0x100)][_0x56d5d0(0x10e)](_0x4063b2,_0x56d5d0(0xf5),{'performerId':_0x121b17});}catch(_0x5f302a){console[_0x56d5d0(0x137)](_0x5f302a);}}async[a538_0xd4bcd5(0xf4)](_0x5dccc1,_0x2de772){const _0x4f9f8c=a538_0xd4bcd5;try{const {token:_0x4fcbcc}=_0x5dccc1['handshake'][_0x4f9f8c(0x121)],{conversationId:_0x2580a0}=_0x2de772;if(!_0x2580a0)return;const _0x4776c4=await this[_0x4f9f8c(0x101)]['findById'](_0x2580a0);if(!_0x4776c4)return;const {type:_0x5e79f4}=_0x4776c4,_0x24ddc=_0x4fcbcc&&await this[_0x4f9f8c(0x13d)][_0x4f9f8c(0xe4)](_0x4fcbcc);let _0x3cff9a;const _0x3afa2c=lodash_1[_0x4f9f8c(0x10d)](_0x24ddc,[_0x4f9f8c(0x113),_0x4f9f8c(0xf6),_0x4f9f8c(0x12f)]);_0x3afa2c&&_0x3afa2c['source']==='user'&&(_0x3cff9a=await this[_0x4f9f8c(0x118)][_0x4f9f8c(0xf7)](_0x3afa2c[_0x4f9f8c(0xf6)]));_0x3afa2c&&_0x3afa2c[_0x4f9f8c(0x113)]===_0x4f9f8c(0xf2)&&(_0x3cff9a=await this[_0x4f9f8c(0x14d)][_0x4f9f8c(0xf7)](_0x3afa2c[_0x4f9f8c(0xf6)]));const _0x5b4d77=this[_0x4f9f8c(0x101)][_0x4f9f8c(0x11b)](_0x2580a0,_0x5e79f4);!_0x5dccc1['rooms'][_0x5b4d77]&&_0x5dccc1['join'](_0x5b4d77);let _0x116945='guest';_0x3cff9a&&(_0x116945=_0x3afa2c&&_0x3afa2c[_0x4f9f8c(0x113)]==='user'?'member':_0x4f9f8c(0x109),await this[_0x4f9f8c(0x100)]['emitToRoom'](_0x5b4d77,'message_created_conversation_'+_0x4776c4[_0x4f9f8c(0xfd)],{'text':_0x3cff9a[_0x4f9f8c(0x148)]+_0x4f9f8c(0x11c),'_id':string_helper_1['generateUuid'](),'conversationId':_0x4776c4[_0x4f9f8c(0xfd)],'isSystem':!![]}));const _0x273f83=await this[_0x4f9f8c(0x100)][_0x4f9f8c(0x105)](_0x5b4d77,_0x3cff9a?_0x3cff9a[_0x4f9f8c(0xfd)]:_0x5dccc1['id']);!_0x273f83&&await this[_0x4f9f8c(0x100)][_0x4f9f8c(0x125)](_0x5b4d77,_0x3cff9a?_0x3cff9a[_0x4f9f8c(0xfd)]:_0x5dccc1['id'],_0x116945);const _0x5031ba=await this[_0x4f9f8c(0x100)][_0x4f9f8c(0x104)](_0x5b4d77),_0x21f4b4=[];Object['keys'](_0x5031ba)[_0x4f9f8c(0x115)](_0x166524=>{const _0x50913d=_0x4f9f8c,_0x19cb5d=_0x5031ba[_0x166524]['split'](',');_0x19cb5d[0x0]===_0x50913d(0xe0)&&_0x21f4b4['push'](_0x166524);});_0x21f4b4[_0x4f9f8c(0xdc)]&&_0x116945===_0x4f9f8c(0x109)&&''+_0x3cff9a[_0x4f9f8c(0xfd)]===''+_0x4776c4[_0x4f9f8c(0x128)]&&await this[_0x4f9f8c(0x100)][_0x4f9f8c(0xdd)](_0x21f4b4,_0x4f9f8c(0x129),{'conversationId':_0x2580a0});const _0x3dbeeb=_0x21f4b4[_0x4f9f8c(0xdc)]?await this[_0x4f9f8c(0x118)][_0x4f9f8c(0xec)](_0x21f4b4):[],_0x4f5a7c={'total':_0x3dbeeb[_0x4f9f8c(0xdc)],'members':_0x3dbeeb[_0x4f9f8c(0x10b)](_0x2c4ab6=>new dtos_1[(_0x4f9f8c(0x131))](_0x2c4ab6)['toResponse']()),'conversationId':_0x2580a0};this[_0x4f9f8c(0x100)][_0x4f9f8c(0x10e)](_0x5b4d77,_0x4f9f8c(0x144),_0x4f5a7c);}catch(_0x16b982){console[_0x4f9f8c(0x137)](_0x16b982);}}async[a538_0xd4bcd5(0xe3)](_0x3dca42,_0x47fce2){const _0x507547=a538_0xd4bcd5;try{const {token:_0x11d8b1}=_0x3dca42[_0x507547(0x149)][_0x507547(0x121)],{conversationId:_0x5b62b5}=_0x47fce2;if(!_0x5b62b5)return;const _0x3302fe=_0x47fce2[_0x507547(0x135)]&&await this[_0x507547(0x101)]['findById'](_0x5b62b5);if(!_0x3302fe)return;const {performerId:_0x339859,type:_0x43e9a1}=_0x3302fe,[_0x1f09dc]=await Promise['all']([_0x11d8b1&&this[_0x507547(0x13d)]['getSourceFromJWT'](_0x11d8b1)]),_0xd91d12=this[_0x507547(0x101)][_0x507547(0x11b)](_0x5b62b5,_0x43e9a1);_0x3dca42[_0x507547(0x133)](_0xd91d12);const [_0x2ea79e]=await Promise['all']([this['streamService']['findByPerformerId'](_0x339859,{'type':constant_1[_0x507547(0x14a)]})]);if(_0x1f09dc){await this[_0x507547(0x100)][_0x507547(0x10e)](_0xd91d12,_0x507547(0x140)+_0x47fce2[_0x507547(0x135)],{'text':_0x1f09dc[_0x507547(0x148)]+_0x507547(0x11e),'_id':string_helper_1['generateUuid'](),'conversationId':_0x47fce2['conversationId'],'isSystem':!![]});const _0x49173d=await this[_0x507547(0x100)][_0x507547(0x105)](_0xd91d12,_0x1f09dc[_0x507547(0xfd)]);if(_0x49173d){const _0x540c33=_0x49173d[_0x507547(0x139)](','),_0x2b04e3=_0x540c33[0x1]?parseInt(_0x540c33[0x1],0xa):null,_0x2c52be=_0x540c33[0x0];if(_0x2b04e3){const _0x5f5b15=moment()[_0x507547(0x12b)]()[_0x507547(0x12a)]()-_0x2b04e3;if(_0x2c52be===_0x507547(0x109)&&''+_0x1f09dc['_id']===''+_0x339859)await Promise[_0x507547(0x132)]([this[_0x507547(0x14d)][_0x507547(0x106)](_0x1f09dc[_0x507547(0xfd)],_0x5f5b15),_0x2ea79e&&_0x2ea79e[_0x507547(0x123)]&&this[_0x507547(0x112)][_0x507547(0x119)]({'_id':_0x2ea79e[_0x507547(0xfd)]},{'$set':{'lastStreamingTime':new Date(),'isStreaming':![]}}),this[_0x507547(0x100)][_0x507547(0x10e)](_0xd91d12,_0x507547(0x13b),{'performerId':_0x339859})]);else _0x2c52be===_0x507547(0xe0)&&await this[_0x507547(0x118)][_0x507547(0x102)](_0x1f09dc[_0x507547(0xfd)],{'stats.totalViewTime':_0x5f5b15});}}}await this[_0x507547(0x100)][_0x507547(0x10a)](_0xd91d12,_0x1f09dc?_0x1f09dc[_0x507547(0xfd)]:_0x3dca42['id']);const _0x19431f=await this[_0x507547(0x100)]['getRoomUserConnections'](_0xd91d12),_0x20f9c5=[];Object['keys'](_0x19431f)[_0x507547(0x115)](_0x158a69=>{const _0x1868c9=_0x507547,_0x16e6e1=_0x19431f[_0x158a69][_0x1868c9(0x139)](',');_0x16e6e1[0x0]===_0x1868c9(0xe0)&&_0x20f9c5[_0x1868c9(0x126)](_0x158a69);});const _0x23cc76=_0x20f9c5['length']?await this[_0x507547(0x118)]['findByIds'](_0x20f9c5):[],_0x49f3e9={'total':_0x23cc76['length'],'members':_0x23cc76[_0x507547(0x10b)](_0x187d7f=>new dtos_1['UserDto'](_0x187d7f)['toResponse']()),'conversationId':_0x5b62b5};await this[_0x507547(0x100)]['emitToRoom'](_0xd91d12,'public-room-changed',_0x49f3e9);}catch(_0x4eda8d){}}};__decorate([websockets_1[a538_0xd4bcd5(0xf9)](a538_0xd4bcd5(0x146)),__metadata(a538_0xd4bcd5(0x116),Function),__metadata(a538_0xd4bcd5(0x13c),[Object,Object]),__metadata(a538_0xd4bcd5(0x107),Promise)],PublicStreamWsGateway[a538_0xd4bcd5(0xff)],a538_0xd4bcd5(0x11f),null),__decorate([websockets_1[a538_0xd4bcd5(0xf9)](a538_0xd4bcd5(0xf0)),__metadata('design:type',Function),__metadata(a538_0xd4bcd5(0x13c),[Object,Object]),__metadata(a538_0xd4bcd5(0x107),Promise)],PublicStreamWsGateway[a538_0xd4bcd5(0xff)],a538_0xd4bcd5(0xe6),null),__decorate([websockets_1[a538_0xd4bcd5(0xf9)]('public-stream/rejoin'),__metadata(a538_0xd4bcd5(0x116),Function),__metadata('design:paramtypes',[Object,Object]),__metadata(a538_0xd4bcd5(0x107),Promise)],PublicStreamWsGateway[a538_0xd4bcd5(0xff)],a538_0xd4bcd5(0xf4),null),__decorate([websockets_1[a538_0xd4bcd5(0xf9)]('public-stream/leave'),__metadata(a538_0xd4bcd5(0x116),Function),__metadata('design:paramtypes',[Object,Object]),__metadata(a538_0xd4bcd5(0x107),Promise)],PublicStreamWsGateway['prototype'],a538_0xd4bcd5(0xe3),null),PublicStreamWsGateway=__decorate([websockets_1[a538_0xd4bcd5(0x10f)](),__param(0x0,common_1[a538_0xd4bcd5(0x108)](stream_provider_1[a538_0xd4bcd5(0x124)])),__metadata(a538_0xd4bcd5(0x13c),[mongoose_1['Model'],services_1[a538_0xd4bcd5(0x114)],services_2['StreamService'],socket_user_service_1[a538_0xd4bcd5(0x143)],services_3[a538_0xd4bcd5(0x10c)],services_4['PerformerService'],services_5[a538_0xd4bcd5(0x11a)]])],PublicStreamWsGateway),exports[a538_0xd4bcd5(0x147)]=PublicStreamWsGateway;