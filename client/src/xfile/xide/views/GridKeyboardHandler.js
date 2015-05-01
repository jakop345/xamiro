//>>built
define("xide/views/GridKeyboardHandler",["dojo/_base/declare","dojo/keys","dojo/has"],function(c,b,e){return c("xide.views.GridKeyboardHandler",null,{ctlrKeyDown:!1,onKeyUp:function(a){switch(a.keyCode){case b.META:case b.SHIFT:case b.ALT:case b.CTRL:this.ctlrKeyDown=!1}},onKey:function(a){var c=this;if(a.type&&"keyup"==a.type)return this.onKeyUp(a);if(a.keyCode==b.ENTER)this.ctlrKeyDown?this.openItemAlternate&&(a.preventDefault(),this.openItemAlternate(null)):-1==a.target.className.indexOf("dijitInputInner")&&
this.onEnter&&(this.onEnter(a),a.preventDefault());else switch(a.keyCode){case b.META:case b.ALT:case b.SHIFT:case b.CTRL:this.ctlrKeyDown=!0;setTimeout(function(){c.ctlrKeyDown=!1},2E3);break;case b.SPACE:this.onPreview&&(a.preventDefault(),this.onPreview());break;case b.RIGHT_ARROW:if(a.originalTarget&&-1!=a.originalTarget.className.indexOf("InputInner"))break;this.onRight&&(a.preventDefault(),this.onRight(a));break;case b.LEFT_ARROW:if(a.originalTarget&&-1!=a.originalTarget.className.indexOf("InputInner"))break;
this.onLeft&&(a.preventDefault(),this.onLeft(a));break;case b.F1:this.openSourceMenu&&(a.preventDefault(),this.openSourceMenu());break;case b.F2:this.onRename&&(a.preventDefault(),this.onRename());break;case b.TAB:this.onTab&&(this.onTab(a),a.preventDefault());break;case b.BACKSPACE:var d=!0;e("chrome")&&0==this.ctlrKeyDown&&(d=!1);d&&this.onBack&&(a.preventDefault(),this.onBack());break;case b.DELETE:this.deleteItem&&(a.preventDefault(),this.deleteItem());break;case 67:if(this.ctlrKeyDown&&this.onClipBoardCopy)this.onClipBoardCopy();
break;case 86:if(this.ctlrKeyDown&&this.onClipBoardPaste)this.onClipBoardPaste();break;case 88:if(this.ctlrKeyDown&&this.onClipBoardCut)this.onClipBoardCut()}}})});
//# sourceMappingURL=GridKeyboardHandler.js.map