'use strict';const a622_0x5280=['2eXYjXU','ObjectId','15908PRjPFU','UserSchema','1198diOWZU','1519UMlIkJ','1fOwpbY','now','548116drwZCo','516970lEwotr','defineProperty','ROLE_USER','Schema','../constants','mongodb','271132jldGPu','287rzPBZl','STATUS_ACTIVE','5357jhVwkk','917509kAlDVQ'];const a622_0x2dd970=a622_0x5505;function a622_0x5505(_0x17106f,_0x24d0c0){return a622_0x5505=function(_0x528059,_0x550501){_0x528059=_0x528059-0x18d;let _0x1fac97=a622_0x5280[_0x528059];return _0x1fac97;},a622_0x5505(_0x17106f,_0x24d0c0);}(function(_0x22729a,_0x1a5f1c){const _0x44bf6d=a622_0x5505;while(!![]){try{const _0xb59631=-parseInt(_0x44bf6d(0x192))+-parseInt(_0x44bf6d(0x19d))*-parseInt(_0x44bf6d(0x196))+-parseInt(_0x44bf6d(0x1a0))+-parseInt(_0x44bf6d(0x195))*-parseInt(_0x44bf6d(0x193))+parseInt(_0x44bf6d(0x199))+-parseInt(_0x44bf6d(0x197))*-parseInt(_0x44bf6d(0x19f))+parseInt(_0x44bf6d(0x19c))*-parseInt(_0x44bf6d(0x19b));if(_0xb59631===_0x1a5f1c)break;else _0x22729a['push'](_0x22729a['shift']());}catch(_0x2b965c){_0x22729a['push'](_0x22729a['shift']());}}}(a622_0x5280,0xea30c));Object[a622_0x2dd970(0x18d)](exports,'__esModule',{'value':!![]}),exports[a622_0x2dd970(0x19a)]=void 0x0;const mongoose=require('mongoose'),mongodb_1=require(a622_0x2dd970(0x191)),constants_1=require(a622_0x2dd970(0x190));exports['UserSchema']=new mongoose[(a622_0x2dd970(0x18f))]({'name':String,'firstName':String,'lastName':String,'city':String,'state':String,'username':{'type':String,'index':!![],'lowercase':!![],'unique':!![],'trim':!![],'sparse':!![]},'email':{'type':String,'index':!![],'unique':!![],'lowercase':!![],'trim':!![],'sparse':!![]},'phone':{'type':String},'roles':[{'type':String,'default':constants_1[a622_0x2dd970(0x18e)]}],'emailVerified':{'type':Boolean,'default':![]},'avatarId':mongodb_1[a622_0x2dd970(0x198)],'avatarPath':String,'status':{'type':String,'default':constants_1[a622_0x2dd970(0x194)]},'gender':{'type':String},'balance':{'type':Number,'default':0x0},'country':{'type':String},'timezone':{'type':String},'dateOfBirth':Date,'isOnline':{'type':Boolean,'default':![]},'onlineAt':{'type':Date},'offlineAt':{'type':Date},'totalOnlineTime':{'type':Number,'default':0x0},'stats':{'totalViewTime':{'type':Number,'default':0x0},'totalTokenEarned':{'type':Number,'default':0x0},'totalTokenSpent':{'type':Number,'default':0x0}},'createdAt':{'type':Date,'default':Date[a622_0x2dd970(0x19e)]},'updatedAt':{'type':Date,'default':Date['now']}});