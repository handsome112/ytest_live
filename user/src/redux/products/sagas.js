'use strict';const a66_0x24ae=['lodash','put','gettingPerformerProduct','7942qSztuw','reduce','42043jSCILy','length','54KFbvaK','defineProperty','getPerformerProductsFail','187765GJRFOs','getPerformerProducts','flatten','productService','59rcMdHm','createSagas','1OvtnJI','map','435062EwAxkv','redux-saga/effects','10FePiHV','@services/product.service','data','_id','getPerformerProductsSuccess','1619026EFCHlG','assign','4969SmubWP','__esModule','464600ezKLbS','src/lib','./actions'];const a66_0x503e87=a66_0x3f82;(function(_0x3ffedc,_0x16f6ab){const _0x2093f6=a66_0x3f82;while(!![]){try{const _0x2f00f4=parseInt(_0x2093f6(0xaf))*-parseInt(_0x2093f6(0x9e))+-parseInt(_0x2093f6(0xa7))+parseInt(_0x2093f6(0xb8))*-parseInt(_0x2093f6(0xa5))+parseInt(_0x2093f6(0xb1))*-parseInt(_0x2093f6(0xad))+-parseInt(_0x2093f6(0xb4))+parseInt(_0x2093f6(0x9c))+parseInt(_0x2093f6(0xba))*parseInt(_0x2093f6(0xa3));if(_0x2f00f4===_0x16f6ab)break;else _0x3ffedc['push'](_0x3ffedc['shift']());}catch(_0x35b5cc){_0x3ffedc['push'](_0x3ffedc['shift']());}}}(a66_0x24ae,0x3f4b6));Object[a66_0x503e87(0xb2)](exports,a66_0x503e87(0xa6),{'value':!![]});const lib_1=require(a66_0x503e87(0xa8)),redux_1=require('@lib/redux'),product_service_1=require(a66_0x503e87(0x9f)),lodash_1=require(a66_0x503e87(0xaa)),effects_1=require(a66_0x503e87(0x9d)),actions_1=require(a66_0x503e87(0xa9)),productSagas=[{'on':actions_1[a66_0x503e87(0xb5)],*'worker'(_0x53b678){const _0x34205f=a66_0x503e87;try{yield effects_1[_0x34205f(0xab)](actions_1[_0x34205f(0xac)]());const _0x46865e=yield product_service_1[_0x34205f(0xb7)]['search'](_0x53b678['payload']),_0x4e7f54=_0x46865e[_0x34205f(0xa0)][_0x34205f(0xa0)],_0x78216a=_0x4e7f54[_0x34205f(0x9b)](_0x3bb5de=>_0x3bb5de['_id']),_0x42cee1=_0x4e7f54[_0x34205f(0xb0)]&&(_0x4e7f54[_0x34205f(0xb0)]>0x1?_0x4e7f54[_0x34205f(0xae)]((_0x25f916,_0x2f1f51,_0x269b1e)=>{const _0xfab02c=_0x34205f;if(_0x269b1e===0x1)return{[_0x25f916[_0xfab02c(0xa1)]]:_0x25f916,[_0x2f1f51[_0xfab02c(0xa1)]]:_0x2f1f51};const _0x2b7c01=Object[_0xfab02c(0xa4)]({},_0x25f916);return _0x2b7c01[_0x2f1f51[_0xfab02c(0xa1)]]=_0x2f1f51,_0x2b7c01;}):{[_0x4e7f54[0x0][_0x34205f(0xa1)]]:_0x4e7f54[0x0]});yield effects_1[_0x34205f(0xab)](actions_1[_0x34205f(0xa2)]({'data':_0x42cee1,'total':_0x46865e[_0x34205f(0xa0)]['total'],'ids':_0x78216a}));}catch(_0x11143e){const _0x19afa9=lib_1['getResponseError'](_0x11143e);yield effects_1[_0x34205f(0xab)](actions_1[_0x34205f(0xb3)](_0x19afa9));}}}];function a66_0x3f82(_0x3dea92,_0x1297ea){return a66_0x3f82=function(_0x24ae5b,_0x3f826a){_0x24ae5b=_0x24ae5b-0x9b;let _0x42a124=a66_0x24ae[_0x24ae5b];return _0x42a124;},a66_0x3f82(_0x3dea92,_0x1297ea);}exports['default']=lodash_1[a66_0x503e87(0xb6)]([redux_1[a66_0x503e87(0xb9)](productSagas)]);