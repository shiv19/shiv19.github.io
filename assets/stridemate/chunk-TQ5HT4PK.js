import{a}from"./chunk-M34F6KWL.js";import{k as m}from"./chunk-LJFOPSFK.js";import{c as p}from"./chunk-O5W3WRYB.js";import"./chunk-MSQWPY7B.js";var x=(n,g,X,f,w)=>{let c=n.ownerDocument.defaultView,o=a(n),v=t=>{let{startX:e}=t;return o?e>=c.innerWidth-50:e<=50},l=t=>o?-t.deltaX:t.deltaX,y=t=>o?-t.velocityX:t.velocityX;return p({el:n,gestureName:"goback-swipe",gesturePriority:101,threshold:10,canStart:t=>(o=a(n),v(t)&&g()),onStart:X,onMove:t=>{let e=l(t)/c.innerWidth;f(e)},onEnd:t=>{let s=l(t),e=c.innerWidth,r=s/e,i=y(t),D=e/2,u=i>=0&&(i>.2||s>D),d=(u?1-r:r)*e,h=0;if(d>5){let M=d/Math.abs(i);h=Math.min(M,540)}w(u,r<=0?.01:m(0,r,.9999),h)}})};export{x as createSwipeBackGesture};