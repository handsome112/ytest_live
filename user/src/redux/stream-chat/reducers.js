'use strict';const a75_0x5d6c=['./actions','findIndex','loadStreamMessagesSuccess','receiveStreamMessageSuccess','19TLDOQh','loadMoreStreamMessagesSuccess','364672MxDIjI','2rCtYKi','__esModule','lodash','conversationMap','getStreamConversationSuccess','resetStreamMessage','createReducers','188033nYgLIS','723068axYjwK','assign','Message\x20deleted','reverse','_id','items','16471tCZTzh','68969eEAwqr','116455KcgXkZ','defineProperty','5uPjhsD','payload','1yGAsGX','fetchingStreamMessage','default','merge','39158HAmVLW','text','sendStreamMessageSuccess','sendStreamMessageFail','deleteMessageSuccess','streamMessage'];function a75_0x4c8c(_0x4f0d1b,_0x136994){return a75_0x4c8c=function(_0x5d6c28,_0x4c8c13){_0x5d6c28=_0x5d6c28-0xbb;let _0x68db1c=a75_0x5d6c[_0x5d6c28];return _0x68db1c;},a75_0x4c8c(_0x4f0d1b,_0x136994);}const a75_0x347884=a75_0x4c8c;(function(_0x182070,_0x84493e){const _0x156a4e=a75_0x4c8c;while(!![]){try{const _0x54a906=-parseInt(_0x156a4e(0xc1))*-parseInt(_0x156a4e(0xd2))+-parseInt(_0x156a4e(0xd8))*-parseInt(_0x156a4e(0xd3))+parseInt(_0x156a4e(0xc3))+parseInt(_0x156a4e(0xcc))+-parseInt(_0x156a4e(0xdc))+-parseInt(_0x156a4e(0xd6))*parseInt(_0x156a4e(0xd4))+parseInt(_0x156a4e(0xcb))*-parseInt(_0x156a4e(0xc4));if(_0x54a906===_0x84493e)break;else _0x182070['push'](_0x182070['shift']());}catch(_0xc8f58a){_0x182070['push'](_0x182070['shift']());}}}(a75_0x5d6c,0x7345f));Object[a75_0x347884(0xd5)](exports,a75_0x347884(0xc5),{'value':!![]});const lodash_1=require(a75_0x347884(0xc6)),redux_1=require('@lib/redux'),actions_1=require(a75_0x347884(0xbd)),initialMessageState={'activeConversation':{},'sendMessage':{'sending':![]},'receiveMessage':{},'conversationMap':{}},streamMessageReducer=[{'on':actions_1['getStreamConversation'],'reducer'(_0x43a85c){const _0x377f73=a75_0x347884;return Object['assign'](Object[_0x377f73(0xcd)]({},_0x43a85c),{'activeConversation':{'fetching':!![]}});}},{'on':actions_1[a75_0x347884(0xc8)],'reducer'(_0x11484b,_0x5c58c4){const _0x4c4143=a75_0x347884;return Object[_0x4c4143(0xcd)](Object[_0x4c4143(0xcd)]({},_0x11484b),{'activeConversation':{'fetching':![],'data':_0x5c58c4[_0x4c4143(0xd7)]['data']}});}},{'on':actions_1[a75_0x347884(0xd9)],'reducer'(_0x4443dd,_0x1d6c8b){const _0x3b1d30=a75_0x347884,{conversationMap:_0x2ca233}=_0x4443dd,{conversationId:_0x2da9f4}=_0x1d6c8b[_0x3b1d30(0xd7)];return _0x2ca233[_0x2da9f4]=Object[_0x3b1d30(0xcd)](Object[_0x3b1d30(0xcd)]({},_0x2ca233[_0x2da9f4]),{'fetching':!![]}),Object[_0x3b1d30(0xcd)]({},_0x4443dd);}},{'on':actions_1[a75_0x347884(0xbf)],'reducer'(_0x456ddb,_0x32104d){const _0x3c5f6e=a75_0x347884,{conversationMap:_0x2d2ada}=_0x456ddb,{conversationId:_0x79baf0,items:_0x4d66b3,total:_0x16dc62}=_0x32104d['payload'];return _0x2d2ada[_0x79baf0]={'items':[..._0x4d66b3[_0x3c5f6e(0xcf)]()],'total':_0x16dc62,'fetching':![]},Object[_0x3c5f6e(0xcd)]({},_0x456ddb);}},{'on':actions_1[a75_0x347884(0xc2)],'reducer'(_0x363580,_0x44ee08){const _0x22a643=a75_0x347884,{conversationMap:_0x5ee3ee}=_0x363580,{conversationId:_0x1023b1,items:_0x332519,total:_0x1f9e34}=_0x44ee08[_0x22a643(0xd7)];return _0x5ee3ee[_0x1023b1]={'items':[..._0x332519['reverse'](),..._0x5ee3ee[_0x1023b1]['items']||[]],'total':_0x1f9e34,'fetching':![]},Object[_0x22a643(0xcd)]({},_0x363580);}},{'on':actions_1['sendStreamMessage'],'reducer'(_0x24c0cc){const _0x3ded2d=a75_0x347884;return Object[_0x3ded2d(0xcd)](Object[_0x3ded2d(0xcd)]({},_0x24c0cc),{'sendMessage':{'sending':!![],'success':![],'data':null}});}},{'on':actions_1[a75_0x347884(0xde)],'reducer'(_0x2a0c62,_0x9929ba){const _0x272214=a75_0x347884,_0x4c19cc=Object[_0x272214(0xcd)]({},_0x2a0c62);return Object[_0x272214(0xcd)](Object[_0x272214(0xcd)]({},_0x4c19cc),{'sendMessage':{'sending':![],'success':!![],'data':_0x9929ba[_0x272214(0xd7)]}});}},{'on':actions_1[a75_0x347884(0xdf)],'reducer'(_0x16960f,_0x1262d1){const _0x1ea8ca=a75_0x347884;return Object[_0x1ea8ca(0xcd)](Object[_0x1ea8ca(0xcd)]({},_0x16960f),{'sendMessage':{'sending':![],'success':![],'error':_0x1262d1[_0x1ea8ca(0xd7)]}});}},{'on':actions_1[a75_0x347884(0xc0)],'reducer'(_0x54d40c,_0x5c8f14){const _0x80991e=a75_0x347884,_0x42954d=Object[_0x80991e(0xcd)]({},_0x54d40c),{conversationId:_0x5adff8}=_0x5c8f14['payload'];return(!_0x42954d[_0x80991e(0xc7)][_0x5adff8]||!_0x42954d[_0x80991e(0xc7)][_0x5adff8]['items'])&&(_0x42954d['conversationMap'][_0x5adff8]={'items':[]}),_0x42954d[_0x80991e(0xc7)][_0x5adff8][_0x80991e(0xd1)]=[..._0x42954d['conversationMap'][_0x5adff8][_0x80991e(0xd1)],_0x5c8f14[_0x80991e(0xd7)]],Object[_0x80991e(0xcd)](Object[_0x80991e(0xcd)]({},_0x42954d),{'receiveMessage':_0x5c8f14[_0x80991e(0xd7)]});}},{'on':actions_1[a75_0x347884(0xc9)],'reducer'(_0xf5f281){const _0x2ef553=Object['assign']({},_0xf5f281);return Object['assign'](Object['assign']({},_0x2ef553),{'activeConversation':{},'sendMessage':{'sending':![]},'receiveMessage':{},'conversationMap':{}});}},{'on':actions_1['resetAllStreamMessage'],'reducer'(_0x55f769,_0x327bd1){const _0x2c5156=a75_0x347884,_0x3796cc=Object[_0x2c5156(0xcd)]({},_0x55f769),{conversationId:_0x565a59}=_0x327bd1['payload'];return _0x3796cc[_0x2c5156(0xc7)][_0x565a59]={'items':[]},Object[_0x2c5156(0xcd)]({},_0x3796cc);}},{'on':actions_1[a75_0x347884(0xbb)],'reducer'(_0x24c564,_0x12476e){const _0x45588e=a75_0x347884,_0xaf37e3=Object[_0x45588e(0xcd)]({},_0x24c564),{conversationId:_0xe909b7,_id:_0x5d886a}=_0x12476e[_0x45588e(0xd7)],_0x558001=lodash_1[_0x45588e(0xbe)](_0xaf37e3[_0x45588e(0xc7)][_0xe909b7][_0x45588e(0xd1)],_0x131339=>_0x131339&&_0x131339[_0x45588e(0xd0)]===_0x5d886a);return _0xaf37e3[_0x45588e(0xc7)][_0xe909b7][_0x45588e(0xd1)]&&_0xaf37e3[_0x45588e(0xc7)][_0xe909b7]['items'][_0x558001]&&(_0xaf37e3[_0x45588e(0xc7)][_0xe909b7][_0x45588e(0xd1)][_0x558001][_0x45588e(0xdd)]=_0x45588e(0xce),_0xaf37e3[_0x45588e(0xc7)][_0xe909b7][_0x45588e(0xd1)][_0x558001]['isDeleted']=!![]),Object[_0x45588e(0xcd)]({},_0xaf37e3);}}];exports[a75_0x347884(0xda)]=lodash_1[a75_0x347884(0xdb)]({},redux_1[a75_0x347884(0xca)](a75_0x347884(0xbc),[streamMessageReducer],initialMessageState));