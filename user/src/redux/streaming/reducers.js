'use strict';const a78_0x42b2=['default','createReducers','hls','2707sytNwd','763773cYuopv','updateLiveStreamSettings','5263STYBto','307KevURU','@lib/redux','./actions','33RQPgok','692525mTOays','1lDyQjE','7mijvMv','4939ByvsFM','30509YgTYCa','addPrivateRequest','settings','merge','1knkyxP','defineProperty','payload','3mcTtvB','streaming','assign','695104WXHDKG','lodash'];const a78_0x57fec7=a78_0x3e14;(function(_0x326cd4,_0x5dee83){const _0x29b4e5=a78_0x3e14;while(!![]){try{const _0x51f163=-parseInt(_0x29b4e5(0x157))*parseInt(_0x29b4e5(0x152))+-parseInt(_0x29b4e5(0x14b))*parseInt(_0x29b4e5(0x147))+-parseInt(_0x29b4e5(0x148))+parseInt(_0x29b4e5(0x14e))*-parseInt(_0x29b4e5(0x14a))+parseInt(_0x29b4e5(0x151))*-parseInt(_0x29b4e5(0x153))+parseInt(_0x29b4e5(0x150))*parseInt(_0x29b4e5(0x15d))+parseInt(_0x29b4e5(0x15a))*parseInt(_0x29b4e5(0x14f));if(_0x51f163===_0x5dee83)break;else _0x326cd4['push'](_0x326cd4['shift']());}catch(_0x479b5e){_0x326cd4['push'](_0x326cd4['shift']());}}}(a78_0x42b2,0xbfd0c));function a78_0x3e14(_0x26f37e,_0x21a751){return a78_0x3e14=function(_0x42b2cd,_0x3e147b){_0x42b2cd=_0x42b2cd-0x144;let _0x2589c0=a78_0x42b2[_0x42b2cd];return _0x2589c0;},a78_0x3e14(_0x26f37e,_0x21a751);}Object[a78_0x57fec7(0x158)](exports,'__esModule',{'value':!![]});const lodash_1=require(a78_0x57fec7(0x15e)),redux_1=require(a78_0x57fec7(0x14c)),actions_1=require(a78_0x57fec7(0x14d)),initialState={'privateRequests':[],'settings':{'viewerURL':'','publisherURL':'','optionForBroadcast':a78_0x57fec7(0x146),'optionForPrivate':a78_0x57fec7(0x146),'secureOption':![]}},reducers=[{'on':actions_1[a78_0x57fec7(0x154)],'reducer'(_0x235814,_0x528aff){const _0x4c6507=a78_0x57fec7;return Object[_0x4c6507(0x15c)](Object['assign']({},_0x235814),{'privateRequests':[..._0x235814['privateRequests'],_0x528aff[_0x4c6507(0x159)]]});}},{'on':actions_1['accessPrivateRequest'],'reducer'(_0x474093,_0x2cac14){const _0x28553e=a78_0x57fec7;return Object[_0x28553e(0x15c)](Object[_0x28553e(0x15c)]({},_0x474093),{'privateRequests':_0x474093['privateRequests']['filter'](_0x112674=>_0x112674['conversationId']!==_0x2cac14[_0x28553e(0x159)])});}},{'on':actions_1[a78_0x57fec7(0x149)],'reducer'(_0x34411b,_0x3b1fd7){const _0x35bac5=a78_0x57fec7;return Object[_0x35bac5(0x15c)](Object[_0x35bac5(0x15c)]({},_0x34411b),{'settings':Object['assign'](Object[_0x35bac5(0x15c)]({},_0x34411b[_0x35bac5(0x155)]),_0x3b1fd7[_0x35bac5(0x159)])});}}];exports[a78_0x57fec7(0x144)]=lodash_1[a78_0x57fec7(0x156)]({},redux_1[a78_0x57fec7(0x145)](a78_0x57fec7(0x15b),[reducers],initialState));