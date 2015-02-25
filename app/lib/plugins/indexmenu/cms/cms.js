CompleteMenuSolution=function(){var i=this;var I=null;var l=[];var o=[];var O=[];var Q={'root':'CmsListMenu','folder':'CmsMenuItemFolder','folderOpen':'CmsMenuItemFolderExpanded','folderClosed':'CmsMenuItemFolderCollapsed','menuItem':'CmsMenuItemFile','evenLevel':'CmsMenuItemEvenLevel','oddLevel':'CmsMenuItemOddLevel','menuLevel':'CmsMenuItemLevel'};var _={'theme':{'name':'','options':{}},'transitions':{},themeRootPath:null,maxDepth:0,maxOpenDepth:0,forceSkipTransitions:false,interval:10,length:100,openTimeout:0,closeTimeout:0,toggleMenuOnClick:0,closeSiblings:true,incrementalConvert:true,handlers:{onOpen:[],onClose:[],onChangeState:[]},stripCssClasses:{'root':[],'ul':[],'li':[],'a':[]},flagOpenClass:Q['folderOpen'],flagClosedClass:Q['folderClosed'],appendTemplateSuffix:false,dummy:null};var c={'cmsSelf':'__cmsSelf','openFlag':'__isOpen','interval':'__interval','timeout':'__timeout','isRoot':'__isRoot','isFolder':'__isFolder','parentNode':'__parentNode','submenu':'__submenu','menuLevel':'__menuLevel','activator':'__activator'};var C;this.setMenuOption=function(e,K){if(_[e]&&typeof _[e]!=typeof K)return false;_[e]=K;return true};this.initMenu=function(e,K){I=e;_.theme.merge(K.theme);if(K.themeRootPath)_.themeRootPath=K.themeRootPath;X.init(K);S();};this.getThemePath=function(e){if(!/^[-a-z0-9\/]*$/.test(name.toLowerCase()))return false;var K=_.theme.name.split('/');return gluePath(_.themeRootPath?_.themeRootPath:gluePath(i.cmsRoot,'templates'),(e?_.theme.name:K[0]));};this.reinitSubmenu=function(e){if(!e||!e.tagName)return;var K=_.maxDepth;switch(e.tagName.toLowerCase()){case"li":_.maxDepth=e[c['parentNode']][c['menuLevel']]+2;W(e[c['submenu']],e[c['parentNode']][c['menuLevel']]+1);break}_.maxDepth=K};var v;var V=function(K,q){try{for(var E=K.length;E>=0;E--){if(_.stripCssClasses[q].indexOf(K[E])<0)continue;K.splice(E,1);}}catch(e){};return K};var x=function(e,K){var q={};if(isUndefined(K)||'string'!=typeof K)K=e.tagName.toLowerCase();for(var E=0,r=O.length;E<r;E++){if(i.modifier[O[E]].runat!=K||!isUndefined(q[O[E]]))continue;i.modifier[O[E]].mod.call(i.modifier[O[E]],e,c,Q,_);q[O[E]]=true}q=null};var X=new function(){var e=this;var K=null;var q=document.getElementsByTagName('head')[0];var E=function(R){if(!isUndefined(i.loadedStylesheets[R]))return;q.appendChild(document.createElementExt('link',{'param':{'rel':'stylesheet','type':'text/css','href':R}}));i.loadedStylesheets[R]=true};var r=function(R){if(!isUndefined(i.loadedJS[R]))return;q.appendChild(document.createElementExt('script',{'param':{'type':'text/javascript','defer':true,'src':R}}));i.loadedJS[R]=true};this.transitionOnload=function(R,t){if(t>=10000){i.transition[R]=true;return}if(!i.transition[R]){setTimeout(function(){e.transitionOnload(R,t+10)},10);return}o[o.length]=i.transition[R];if('function'==typeof i.transition[R].init)i.transition[R].init.call(i.transition[R],_,Q,c);};this.themeOnload=function(R){o=[i.transition['default']];_.merge(K);for(var t in _.transitions){if(!_.transitions.hasOwnProperty(t))continue;if(!i.transition[t])r(gluePath(i.cmsRoot,'transitions',t+'.js'));playTimeout(this.transitionOnload,1,[t,0]);}if(_.modifiers&&_.modifiers.length>0){for(var t=0,T=_.modifiers.length;t<T;t++){if(!i.modifier[_.modifiers[t]]){if(isUndefined(i.modifier[_.modifiers[t]]))i.modifier[_.modifiers[t]]=_.modifiers[t];r(gluePath(i.cmsRoot,'modifiers',_.modifiers[t]+'.js'));}l[l.length]=['modifier',_.modifiers[t]];O.push(_.modifiers[t]);}}};this.init=function(R){K=R;E(gluePath(i.getThemePath(),'layout.css'));E(gluePath(i.getThemePath(true),'design.css'));r(gluePath(i.getThemePath(),'template.js'));var t=_.theme.name.split('/');if(isUndefined(i.theme[t[0]]))i.theme[t[0]]=t[0];l[l.length]=['theme',t[0]]}};var z=function(e){var K=getParent(e.srcElement||e.target,c.isRoot,true);if(K[c.cmsSelf]!=i)return;var q=getParent(e.srcElement||e.target,'li');if(!getParent(q,K))return;K=null;var E=q;while(q&&!q[c['parentNode']]&&E!=(E=getParent(q,c['isFolder'],true)))i.reinitSubmenu(E);if(!q)return;switch(e.type.toLowerCase()){case"mouseover":case"mouseout":while(!q[c['isRoot']]){if(q[c['isFolder']]){if(parseInt(q[c['timeout']]))clearTimeout(q[c['timeout']]);q[c['timeout']]=null;switch(e.type.toLowerCase()){case'mouseover':if(!q[c['openFlag']])q[c['timeout']]=playTimeout(Z,_.openTimeout,[q,'open']);break;case'mouseout':if(q[c['openFlag']]&&parseInt(_.closeTimeout))q[c['timeout']]=playTimeout(Z,_.closeTimeout,[q,'close']);break}}q=q[c['parentNode']]}break;case"mouseup":if(!q[c['isFolder']]||(q[c['submenu']][c['interval']]&&q[c['submenu']][c['interval']].interval))return;clearTimeout(q[c['timeout']]);if(_['toggleMenuOnClick']&&(_['toggleMenuOnClick']^q[c['openFlag']]*2))Z(q,'toggle');break}};var Z=function(K,q){var E,r,R;if(q!='toggle'&&K[c['openFlag']]==(q=='open'))return;switch(q.toLowerCase()){case'open':q='Open';break;case'close':q='Close';break;case'toggle':q=K[c['openFlag']]?'Close':'Open';break;default:return}if(K[c['openFlag']]!=(q=='Open'))w(K,q);if(null==K[c['submenu']][c['menuLevel']])i.reinitSubmenu(K);E=K[c['openFlag']]=(q=='Open');if(_['closeSiblings']&&E)for(r=0,sL=K[c['parentNode']][c['submenu']].length;r<sL;r++)if(K[c['parentNode']][c['submenu']][r][c['openFlag']]&&K[c['parentNode']][c['submenu']][r]!=K&&K[c['parentNode']][c['submenu']][r][c['isFolder']])Z(K[c['parentNode']][c['submenu']][r],'close');K=K[c['submenu']];R=function(K,y,Y){var r,e=y.length,t=Y.length;var u=(new Date).valueOf();K[c['interval']].pg=Math.round(K[c['interval']].pg+(u-K[c['interval']].start)*100/_.length);K[c['interval']].start=u;if(K[c['interval']].pg>100)K[c['interval']].pg=100;K[c['interval']].pg_delta=K[c['interval']].pg/100;for(r=0;r<e;r++){if(null==y[r])continue;if(!y[r][0].call(y[r][1],K,_,Q,c)){y.splice(r,1);r--;e--}}if(0==y.length){for(r=0;r<t;r++)Y[r][0].call(Y[r][1],K,_,Q,c);clearInterval(K[c['interval']].interval);K[c['interval']].interval=false;_['forceSkipTransitions']=false}};if(K[c['interval']]){clearInterval(K[c['interval']].interval);K[c['interval']].pg=100-K[c['interval']].pg;K[c['interval']].pg_delta=K[c['interval']].pg/100}else{K[c['interval']]={'pg':0,'pg_delta':0}}var T,y=[],Y=[];for(r=0,mL=o.length;r<mL;r++){T=o[r]['init'+q];if(typeof T=='function')T.call(o[r],K,_,Q,c);T=o[r]['play'+q];if(!_['forceSkipTransitions']&&typeof T=='function')y[y.length]=[T,o[r]];T=o[r]['finish'+q];if(typeof T=='function')Y[Y.length]=[T,o[r]]}K[c['interval']].start=(new Date).valueOf();K[c['interval']].interval=setInterval(function(){R(K,y,Y)},_.interval);};var w=function(K,q){if(!_.handlers)return;var E=function(K,r){if(_.handlers[r]instanceof Array){for(var R=0,t=_.handlers[r].length;R<t;R++){try{_.handlers[r][R][1].call(_.handlers[r][R][0],K,c,Q,_);}catch(e){}}}};var r='on'+q;E(K,r);E(K,'onChangeState');};var W=function(e,K){if(_.maxDepth&&K>_.maxDepth-1&&(e[c.parentNode]&&e[c.parentNode][c.openFlag]===false))return;e[c.menuLevel]=K;var q=document.createElement('div');e.parentNode.replaceChild(q,e);K++;e[c.submenu]=[];for(var E=0,r=e.childNodes.length;E<r;E++){if(!e.childNodes[E].tagName||e.childNodes[E].tagName.toLowerCase()!='li')continue;e[c.submenu][e[c.submenu].length]=e.childNodes[E];e.style.display='';e.childNodes[E][c.parentNode]=e;var R=e.childNodes[E].className.split(' ');e.childNodes[E][c.openFlag]=((K<_.maxOpenDepth||R.indexOf(_.flagOpenClass)>-1)&&R.indexOf(_.flagClosedClass)<0);R=V(R,'li');s(e.childNodes[E],K);if(!isUndefined(e.childNodes[E][c.submenu])){R[R.length]=Q['folder'];R[R.length]=Q[e.childNodes[E][c.openFlag]?'folderOpen':'folderClosed'];e.childNodes[E][c.isFolder]=true}else{R[R.length]=Q.menuItem;e.childNodes[E][c.isFolder]=false}R[R.length]=Q.menuLevel.split(" ").map(function(e){return e+K}).join(" ");R[R.length]=Q[K%2?'evenLevel':'oddLevel'];e.childNodes[E].className=R.join(' ');x(e.childNodes[E]);var t=e.childNodes[E].firstChild;while(null!=t&&(!t.tagName||(t.tagName&&t.tagName.toLowerCase()!='a')))t=t.nextSibling;if(t){e.childNodes[E][c.activator]=t;t[c.parentNode]=e.childNodes[E];var R=t.className.split(' ');R=V(R,'a');t.className=R.join(" ");x(t);}}if(e[c['submenu']].length<1&&e[c.parentNode]){e[c.parentNode][c.openFlag]=false}q.parentNode.replaceChild(e,q);q=null};var s=function(e,K){for(var q=0,E=e.childNodes.length;q<E;q++){if(!e.childNodes[q].tagName||e.childNodes[q].tagName.toLowerCase()!='ul')continue;var r=e.childNodes[q].className.split(" ");r=V(r,'ul');e.childNodes[q].className=r.join(" ");e[c['submenu']]=e.childNodes[q];e.childNodes[q][c['parentNode']]=e;if(!_.incrementalConvert||e[c['openFlag']]||K<_['maxDepth']-1)W(e[c['submenu']],K);x(e.childNodes[q]);}};var S=function(){var e=document.getElementById(I);if(!e||!k()){setTimeout(S,10);return}_.stripCssClasses.li.push(_.flagOpenClass);_.stripCssClasses.li.push(_.flagClosedClass);if(_.appendTemplateSuffix){var K=_.theme.name.split("/");var q=K[0];var K=K.join("");for(var E in Q){if(Q.hasOwnProperty(E)&&'root'!=E)Q[E]=Q[E]+q+' '+Q[E]+K}}var r=e.className.split(" ");r=V(r,'root');r[r.length]=Q.root;var K=_.theme.name.split("/");var q="";for(var E=0,R=K.length;E<R;E++){q+=K[E];r[r.length]=Q.root+q}e.className=r.join(" ");e[c['isRoot']]=true;W(e,-1);if(_.openTimeout){e.attachEvent('onmouseover',z);e.attachEvent('onmouseout',z);}e.attachEvent('onmouseup',z);e.style.display='';x(e,'root');e[c['cmsSelf']]=i};var k=function(){var e,K=l.length,q;for(e=0;e<K;e++){if(isNaN(l[e][3]))l[e][3]=0;q=i[l[e][0]][l[e][1]];if('string'!=typeof q){if(q.menuOptions)_.merge(q.menuOptions,l[e][0]=='theme');if(q.init)q.init.call(q,_,Q,c);if(X[l[e][0]+'Onload'])X[l[e][0]+'Onload'](l[e][1]);l.splice(e,1);e--;K--}else if(l[e][3]>=10000){throw Error("Resource could not be loaded: "+l[e][0]+" - "+l[e][1]);}else{l[e][3]+=10}}return!l.length}};CompleteMenuSolution.prototype.cmsRoot=findPath('cms.js');CompleteMenuSolution.prototype.loadedStylesheets={};CompleteMenuSolution.prototype.loadedJS={};CompleteMenuSolution.prototype.theme={};CompleteMenuSolution.prototype.transition={'default':{'initOpen':function(i,I,l,o){i=i[o['parentNode']];var O=i.className.split(" "),Q=l.folderClosed.split(" "),_;for(var c=0,C=Q.length;c<C;c++){_=O.indexOf(Q[c]);if(_>-1)O.splice(_,1);}Q=l.folderOpen.split(" ");for(var c=0,C=Q.length;c<C;c++){_=O.indexOf(Q[c]);if(_>-1)O.splice(_,1);}O[O.length]=l.folderOpen;i.className=O.join(" ");},'finishClose':function(i,I,l,o){i=i[o['parentNode']];var O=i.className.split(" "),Q=l.folderOpen.split(" "),_;for(var c=0,C=Q.length;c<C;c++){_=O.indexOf(Q[c]);if(_>-1)O.splice(_,1);}Q=l.folderClosed.split(" ");for(var c=0,C=Q.length;c<C;c++){_=O.indexOf(Q[c]);if(_>-1)O.splice(_,1);}O[O.length]=l.folderClosed;i.className=O.join(" ");}}};CompleteMenuSolution.prototype.modifier={};CompleteMenuSolution.prototype.requires=['extensions/helpers.js','extensions/objectextensions.js','extensions/functionextensions.js','extensions/arrayextensions.js','extensions/domextensions.js'];for(var i=0,cL=CompleteMenuSolution.prototype.requires.length;i<cL;i++){try{document.write("<scr"+"ipt type=\"text/javascript\" src=\""+CompleteMenuSolution.prototype.cmsRoot+CompleteMenuSolution.prototype.requires[i]+"\" ></script>");}catch(e){var el=document.getElementsByTagName('head')[0],s=document.createElement('script');s.type="text/javascript";s.src=CompleteMenuSolution.prototype.cmsRoot+CompleteMenuSolution.prototype.requires[i];el.appendChild(s);}}function findPath(i){var I=document.getElementsByTagName('script'),l=new RegExp('^(.*/|)('+i+')([#?]|$)');for(var o=0,O=I.length;o<O;o++){var Q=String(I[o].src).match(l);if(Q){if(Q[1].match(/^((https?|file)\:\/{2,}|\w:[\\])/))return Q[1];if(Q[1].indexOf("/")==0)return Q[1];b=document.getElementsByTagName('base');if(b[0]&&b[0].href)return b[0].href+Q[1];return(document.location.pathname.match(/(.*[\/\\])/)[0]+Q[1]).replace(/^\/+(?=\w:)/,"");}}return null}