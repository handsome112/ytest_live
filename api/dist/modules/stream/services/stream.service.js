'use strict';const a552_0x5c85=['../../performer/services','GROUP_CHAT','1476242lRGgrc','balance','isStreaming','1yITjQe','PUBLIC_CHAT','find','object','findById','performerService','mongodb','PerformerService','requestService','map','type','socketUserService','BroadcastType','StreamOfflineException','sessionId','ParticipantJoinLimitException','save','_id','../exceptions','includes','Inject','group','create','514963VJKGed','keys','streamId','webhook','push','indexOf','PRIVATE_CHAT','StreamDto','queueEventService','performer','user','performerId','length','@nestjs/common','decorate','toString','generateOneTimeToken','../../../kernel/infras/queue','__esModule','757048UKiHfA','1704978qpkwIX','source','getSessionId','../dtos','createStreamConversation','metadata','RequestService','Injectable','lastStreamingTime','ObjectId','status','4268134GjwfXg','EntityNotFoundException','all','goLive','../../socket/services/socket-user.service','SocketUserService','1618854FpoCMt','StreamServerErrorException','finished','conversationService','sourceId','QueueEventService','1479851lEXMyB','2MTKMrm','streamModel','stream_public','set','findByPerformerId','assign','findOne','uuid','forwardRef','TokenNotEnoughException','../constant','./request.service','__decorate','Model','addRecipient','recipients','data','joinPublicChat','findBySessionId','message','ForbiddenException','mongoose','startGroupChat','split','../providers/stream.provider','LiveStream','defaultStreamValue','StreamService','getOwnPropertyDescriptor','joinGroupChat','design:paramtypes','liveStreamStarted','__metadata','getRoomUserConnections','STREAM_MODEL_PROVIDER','forEach'];const a552_0x194c62=a552_0x4a84;function a552_0x4a84(_0x4e8c82,_0x4bc89b){return a552_0x4a84=function(_0x5c854e,_0x4a842e){_0x5c854e=_0x5c854e-0x195;let _0x49d60e=a552_0x5c85[_0x5c854e];return _0x49d60e;},a552_0x4a84(_0x4e8c82,_0x4bc89b);}(function(_0x106631,_0x2e5f25){const _0x17cbb3=a552_0x4a84;while(!![]){try{const _0x2e9997=parseInt(_0x17cbb3(0x1be))*-parseInt(_0x17cbb3(0x1c1))+-parseInt(_0x17cbb3(0x1ec))+parseInt(_0x17cbb3(0x1eb))+-parseInt(_0x17cbb3(0x1d8))*parseInt(_0x17cbb3(0x198))+parseInt(_0x17cbb3(0x1fd))+-parseInt(_0x17cbb3(0x197))+parseInt(_0x17cbb3(0x1f7));if(_0x2e9997===_0x2e5f25)break;else _0x106631['push'](_0x106631['shift']());}catch(_0x16de34){_0x106631['push'](_0x106631['shift']());}}}(a552_0x5c85,0xe8acf));var __decorate=this&&this[a552_0x194c62(0x1a4)]||function(_0x3331bb,_0x3bdcc4,_0x4c8039,_0x162344){const _0x3727f9=a552_0x194c62;var _0x2f6c51=arguments[_0x3727f9(0x1e4)],_0x12beb3=_0x2f6c51<0x3?_0x3bdcc4:_0x162344===null?_0x162344=Object[_0x3727f9(0x1b4)](_0x3bdcc4,_0x4c8039):_0x162344,_0x4217d5;if(typeof Reflect===_0x3727f9(0x1c4)&&typeof Reflect[_0x3727f9(0x1e6)]==='function')_0x12beb3=Reflect['decorate'](_0x3331bb,_0x3bdcc4,_0x4c8039,_0x162344);else{for(var _0x38aab6=_0x3331bb[_0x3727f9(0x1e4)]-0x1;_0x38aab6>=0x0;_0x38aab6--)if(_0x4217d5=_0x3331bb[_0x38aab6])_0x12beb3=(_0x2f6c51<0x3?_0x4217d5(_0x12beb3):_0x2f6c51>0x3?_0x4217d5(_0x3bdcc4,_0x4c8039,_0x12beb3):_0x4217d5(_0x3bdcc4,_0x4c8039))||_0x12beb3;}return _0x2f6c51>0x3&&_0x12beb3&&Object['defineProperty'](_0x3bdcc4,_0x4c8039,_0x12beb3),_0x12beb3;},__metadata=this&&this[a552_0x194c62(0x1b8)]||function(_0x4c9874,_0xa535df){const _0x11b9ad=a552_0x194c62;if(typeof Reflect===_0x11b9ad(0x1c4)&&typeof Reflect[_0x11b9ad(0x1f1)]==='function')return Reflect[_0x11b9ad(0x1f1)](_0x4c9874,_0xa535df);},__param=this&&this['__param']||function(_0x4b2c2b,_0x22b154){return function(_0xd53e4,_0x5a85c0){_0x22b154(_0xd53e4,_0x5a85c0,_0x4b2c2b);};};Object['defineProperty'](exports,a552_0x194c62(0x1ea),{'value':!![]}),exports[a552_0x194c62(0x1b3)]=void 0x0;const common_1=require(a552_0x194c62(0x1e5)),services_1=require(a552_0x194c62(0x1bc)),mongoose_1=require(a552_0x194c62(0x1ad)),mongodb_1=require(a552_0x194c62(0x1c7)),kernel_1=require('../../../kernel'),uuid_1=require(a552_0x194c62(0x19f)),services_2=require('../../message/services'),queue_1=require(a552_0x194c62(0x1e9)),dtos_1=require('../../user/dtos'),request_service_1=require(a552_0x194c62(0x1a3)),socket_user_service_1=require(a552_0x194c62(0x1fb)),constant_1=require(a552_0x194c62(0x1a2)),dtos_2=require(a552_0x194c62(0x1ef)),stream_provider_1=require(a552_0x194c62(0x1b0)),exceptions_1=require(a552_0x194c62(0x1d3)),token_not_enough_1=require('../exceptions/token-not-enough');let StreamService=class StreamService{constructor(_0x48f2db,_0x684c0c,_0x102a16,_0x3ad282,_0x25bb16,_0x194119){const _0x429fc2=a552_0x194c62;this[_0x429fc2(0x1c6)]=_0x48f2db,this[_0x429fc2(0x199)]=_0x684c0c,this['conversationService']=_0x102a16,this[_0x429fc2(0x1cc)]=_0x3ad282,this[_0x429fc2(0x1c9)]=_0x25bb16,this[_0x429fc2(0x1e0)]=_0x194119;}async['findById'](_0x5cba9e){const _0x3f62b5=a552_0x194c62,_0x3e80d8=await this[_0x3f62b5(0x199)]['findOne']({'_id':_0x5cba9e});if(!_0x3e80d8)throw new kernel_1[(_0x3f62b5(0x1f8))]();return _0x3e80d8;}async[a552_0x194c62(0x1aa)](_0x4755b4){const _0x5962fd=a552_0x194c62,_0x2a9e1b=await this[_0x5962fd(0x199)][_0x5962fd(0x19e)]({'sessionId':_0x4755b4});if(!_0x2a9e1b)throw new kernel_1[(_0x5962fd(0x1f8))]();return _0x2a9e1b;}async[a552_0x194c62(0x19c)](_0x8a4842,_0x20a5c6){const _0x34c4a8=a552_0x194c62,_0x26f8e0=await this[_0x34c4a8(0x199)][_0x34c4a8(0x19e)](Object['assign']({'performerId':_0x8a4842},_0x20a5c6));return _0x26f8e0;}async[a552_0x194c62(0x1ee)](_0x4d1e57,_0x5752e6){const _0x28bd33=a552_0x194c62;let _0x484568=await this['streamModel']['findOne']({'performerId':_0x4d1e57,'type':_0x5752e6});if(!_0x484568){const _0x246987={'sessionId':uuid_1['v4'](),'performerId':_0x4d1e57,'type':_0x5752e6};_0x484568=await this[_0x28bd33(0x199)][_0x28bd33(0x1d7)](_0x246987);}return _0x484568[_0x28bd33(0x1cf)];}async[a552_0x194c62(0x1d7)](_0x1ba75a){const _0x2b110e=a552_0x194c62;return this[_0x2b110e(0x199)][_0x2b110e(0x1d7)](_0x1ba75a);}async[a552_0x194c62(0x1fa)](_0x1af1fe){const _0xe7c729=a552_0x194c62;var _0x18e47a,_0x1fa22d,_0x89a4c1;let _0x40fee3=await this[_0xe7c729(0x199)][_0xe7c729(0x19e)]({'performerId':_0x1af1fe,'type':constant_1[_0xe7c729(0x1c2)]});if(!_0x40fee3){const _0xe03651={'sessionId':uuid_1['v4'](),'performerId':_0x1af1fe,'type':constant_1['PUBLIC_CHAT']};_0x40fee3=await this[_0xe7c729(0x199)][_0xe7c729(0x1d7)](_0xe03651);}let _0x5ba76a=await this[_0xe7c729(0x200)][_0xe7c729(0x19e)]({'type':_0xe7c729(0x19a),'performerId':_0x1af1fe});!_0x5ba76a&&(_0x5ba76a=await this[_0xe7c729(0x200)][_0xe7c729(0x1f0)](new dtos_2[(_0xe7c729(0x1df))](_0x40fee3)));const _0x151e9c=Object[_0xe7c729(0x19d)](Object[_0xe7c729(0x19d)]({},constant_1[_0xe7c729(0x1b2)]),{'streamId':_0x40fee3['_id'],'name':_0x40fee3[_0xe7c729(0x1d2)],'description':'','type':constant_1[_0xe7c729(0x1cd)][_0xe7c729(0x1b1)],'status':_0xe7c729(0x1ff)}),_0x5ce396=await this[_0xe7c729(0x1c9)][_0xe7c729(0x1d7)](_0x151e9c);if(_0x5ce396[_0xe7c729(0x1f6)])throw new exceptions_1[(_0xe7c729(0x1fe))]({'message':(_0x1fa22d=(_0x18e47a=_0x5ce396[_0xe7c729(0x1a8)])===null||_0x18e47a===void 0x0?void 0x0:_0x18e47a['data'])===null||_0x1fa22d===void 0x0?void 0x0:_0x1fa22d[_0xe7c729(0x1ab)],'error':_0x5ce396[_0xe7c729(0x1a8)],'status':(_0x89a4c1=_0x5ce396[_0xe7c729(0x1a8)])===null||_0x89a4c1===void 0x0?void 0x0:_0x89a4c1[_0xe7c729(0x1f6)]});return{'conversation':_0x5ba76a,'sessionId':_0x40fee3[_0xe7c729(0x1d2)]};}async[a552_0x194c62(0x1a9)](_0x41792d){const _0x3eda2e=a552_0x194c62,_0xe52b85=await this[_0x3eda2e(0x199)]['findOne']({'performerId':_0x41792d,'type':constant_1[_0x3eda2e(0x1c2)]});if(!_0xe52b85)throw new kernel_1[(_0x3eda2e(0x1f8))]();if(!_0xe52b85[_0x3eda2e(0x1c0)])throw new exceptions_1[(_0x3eda2e(0x1ce))]();return{'sessionId':_0xe52b85['_id']};}async['requestPrivateChat'](_0x38a009,_0x4bb4bc){const _0x2ea9ba=a552_0x194c62,_0x648567=await this['performerService']['findById'](_0x4bb4bc);if(!_0x648567)throw new kernel_1[(_0x2ea9ba(0x1f8))]();if(_0x38a009['balance']<_0x648567['privateCallPrice'])throw new token_not_enough_1[(_0x2ea9ba(0x1a1))]();const _0x1914b8={'sessionId':uuid_1['v4'](),'performerId':_0x4bb4bc,'userIds':[_0x38a009[_0x2ea9ba(0x1d2)]],'type':constant_1[_0x2ea9ba(0x1de)],'isStreaming':!![]},_0x3ee248=await this[_0x2ea9ba(0x199)][_0x2ea9ba(0x1d7)](_0x1914b8),_0x302ac8=[{'source':_0x2ea9ba(0x1e1),'sourceId':new mongodb_1[(_0x2ea9ba(0x1f5))](_0x4bb4bc)},{'source':_0x2ea9ba(0x1e2),'sourceId':_0x38a009[_0x2ea9ba(0x1d2)]}],_0x355a57=await this[_0x2ea9ba(0x200)]['createStreamConversation'](new dtos_2[(_0x2ea9ba(0x1df))](_0x3ee248),_0x302ac8);return{'conversation':_0x355a57,'sessionId':_0x3ee248['sessionId']};}async['accpetPrivateChat'](_0x4afb6d,_0x3af196){const _0x264657=a552_0x194c62,_0x19fafb=await this[_0x264657(0x200)]['findById'](_0x4afb6d);if(!_0x19fafb)throw new kernel_1[(_0x264657(0x1f8))]();const _0x52fced=_0x19fafb[_0x264657(0x1a7)]['find'](_0x324f40=>_0x324f40[_0x264657(0x195)][_0x264657(0x1e7)]()===_0x3af196['toString']()&&_0x324f40[_0x264657(0x1ed)]===_0x264657(0x1e1));if(!_0x52fced)throw new common_1['ForbiddenException']();const _0x159d6c=await this[_0x264657(0x1c5)](_0x19fafb[_0x264657(0x1da)]);if(!_0x159d6c&&_0x159d6c[_0x264657(0x1e3)]!==_0x3af196)throw new kernel_1[(_0x264657(0x1f8))]();if(!_0x159d6c[_0x264657(0x1c0)])throw new exceptions_1['StreamOfflineException']();return{'conversation':_0x19fafb,'sessionId':_0x159d6c['sessionId']};}async[a552_0x194c62(0x1ae)](_0x499380){const _0x3cc544=a552_0x194c62,_0x4c39f5=await this[_0x3cc544(0x199)][_0x3cc544(0x1c3)]({'performerId':_0x499380,'type':constant_1[_0x3cc544(0x1bd)],'isStreaming':!![]});_0x4c39f5[_0x3cc544(0x1e4)]&&Promise[_0x3cc544(0x1f9)](_0x4c39f5[_0x3cc544(0x1ca)](_0x495218=>{const _0x28c038=_0x3cc544;return _0x495218[_0x28c038(0x19b)]('isStreaming',![]),_0x495218[_0x28c038(0x1d1)]();}));const _0x1ee613={'sessionId':uuid_1['v4'](),'performerId':_0x499380,'userIds':[],'type':constant_1['GROUP_CHAT'],'isStreaming':!![]},_0x11229d=await this[_0x3cc544(0x199)][_0x3cc544(0x1d7)](_0x1ee613),_0x109f93=[{'source':_0x3cc544(0x1e1),'sourceId':_0x499380}],_0x1651f8=await this[_0x3cc544(0x200)][_0x3cc544(0x1f0)](new dtos_2['StreamDto'](_0x11229d),_0x109f93);return{'conversation':_0x1651f8,'sessionId':_0x11229d[_0x3cc544(0x1cf)]};}async[a552_0x194c62(0x1b5)](_0x31afe5,_0x595bfc){const _0x3403fd=a552_0x194c62,_0x420d0a=await this[_0x3403fd(0x1c6)]['findById'](_0x31afe5);if(!_0x420d0a)throw new kernel_1['EntityNotFoundException']();if(_0x595bfc[_0x3403fd(0x1bf)]<_0x420d0a['groupCallPrice'])throw new token_not_enough_1[(_0x3403fd(0x1a1))]();const _0x546cf2=await this[_0x3403fd(0x199)][_0x3403fd(0x19e)]({'performerId':_0x31afe5,'type':constant_1[_0x3403fd(0x1bd)],'isStreaming':!![]});if(!_0x546cf2||_0x546cf2&&!_0x546cf2[_0x3403fd(0x1c0)])throw new exceptions_1['StreamOfflineException']();const _0x302e01=await this['conversationService'][_0x3403fd(0x19e)]({'streamId':_0x546cf2[_0x3403fd(0x1d2)]});if(!_0x302e01)throw new kernel_1['EntityNotFoundException']();const _0x38ad2b=_0x302e01[_0x3403fd(0x1a7)]['length']-0x1,{maxParticipantsAllowed:_0xb1549f}=_0x420d0a;if(_0xb1549f&&_0x38ad2b>_0xb1549f)throw new exceptions_1[(_0x3403fd(0x1d0))]();const _0x3b07c4=_0x302e01[_0x3403fd(0x1a7)][_0x3403fd(0x1c3)](_0x1539bf=>_0x1539bf[_0x3403fd(0x195)]['toString']()===_0x595bfc['_id'][_0x3403fd(0x1e7)]());if(!_0x3b07c4){const _0x7d338a={'source':_0x3403fd(0x1e2),'sourceId':_0x595bfc[_0x3403fd(0x1d2)]};await this[_0x3403fd(0x200)][_0x3403fd(0x1a6)](_0x302e01[_0x3403fd(0x1d2)],_0x7d338a);}return{'conversation':_0x302e01,'sessionId':_0x546cf2[_0x3403fd(0x1cf)]};}async[a552_0x194c62(0x1db)](_0x378c2f,_0xecbbba){const _0x4ba003=a552_0x194c62,_0x8e6b02=await this['streamModel']['findOne']({'sessionId':_0x378c2f});if(!_0x8e6b02)return;switch(_0xecbbba['action']){case _0x4ba003(0x1b7):if(_0x8e6b02[_0x4ba003(0x1cb)]===constant_1[_0x4ba003(0x1c2)])_0x8e6b02[_0x4ba003(0x1c0)]=!![];break;case'liveStreamEnded':_0x8e6b02['type']===constant_1[_0x4ba003(0x1c2)]&&(_0x8e6b02[_0x4ba003(0x1c0)]=![],_0x8e6b02[_0x4ba003(0x1f4)]=new Date());break;default:break;}await _0x8e6b02[_0x4ba003(0x1d1)]();}async['getOneTimeToken'](_0x2a598c,_0x2716b3){const _0x64b295=a552_0x194c62,{id:_0x3d4a24}=_0x2a598c;let _0x1d92ed=_0x3d4a24;(_0x3d4a24[_0x64b295(0x1dd)](constant_1['PRIVATE_CHAT'])===0x0||_0x3d4a24[_0x64b295(0x1dd)](_0x64b295(0x1d6))===0x0)&&([,_0x1d92ed]=_0x3d4a24[_0x64b295(0x1af)]('-'));const [_0x572cab,_0x44a3ba]=await Promise[_0x64b295(0x1f9)]([this['streamModel']['findOne']({'_id':_0x1d92ed}),this[_0x64b295(0x200)][_0x64b295(0x19e)]({'streamId':_0x1d92ed})]);if(!_0x572cab||!_0x44a3ba)throw new kernel_1[(_0x64b295(0x1f8))]();const _0x4bd06a=this[_0x64b295(0x200)]['serializeConversation'](_0x44a3ba[_0x64b295(0x1d2)],_0x44a3ba['type']),_0x5bb4ae=await this[_0x64b295(0x1cc)][_0x64b295(0x1b9)](_0x4bd06a),_0xed5b3b=[];Object[_0x64b295(0x1d9)](_0x5bb4ae)[_0x64b295(0x1bb)](_0xd4e05f=>{const _0x5a2a3f=_0x64b295;_0xed5b3b[_0x5a2a3f(0x1dc)](_0xd4e05f);});if(!_0xed5b3b[_0x64b295(0x1d4)](_0x2716b3))throw new common_1[(_0x64b295(0x1ac))]();const _0x569f06=await this['requestService'][_0x64b295(0x1e8)](_0x3d4a24,_0x2a598c);return _0x569f06['data'];}};StreamService=__decorate([common_1[a552_0x194c62(0x1f3)](),__param(0x0,common_1['Inject'](common_1[a552_0x194c62(0x1a0)](()=>services_1[a552_0x194c62(0x1c8)]))),__param(0x1,common_1[a552_0x194c62(0x1d5)](stream_provider_1[a552_0x194c62(0x1ba)])),__metadata(a552_0x194c62(0x1b6),[services_1[a552_0x194c62(0x1c8)],mongoose_1[a552_0x194c62(0x1a5)],services_2['ConversationService'],socket_user_service_1[a552_0x194c62(0x1fc)],request_service_1[a552_0x194c62(0x1f2)],queue_1[a552_0x194c62(0x196)]])],StreamService),exports[a552_0x194c62(0x1b3)]=StreamService;