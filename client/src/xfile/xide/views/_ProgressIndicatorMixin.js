//>>built
define("xide/views/_ProgressIndicatorMixin",["dojo/_base/declare","dojo/dom-class","dojo/_base/window","xide/widgets/Standby"],function(e,c,f,g){return e("xide.views._ProgressIndicatorMixin",null,{hasProgress:!0,_progressNode:null,_progressTemplate:"",showStandBy:function(a,d,c){if(d){if(a&&!a.standby){var b=g({target:a,color:"white",opacity:.5},dojo.doc.createElement("div"));dojo.place(b.domNode,f.body(),"last");b.startup();a.standby=b}else b=a.standby;0<=c&&setTimeout(function(){b.hide()},c);b.show();
return b}a&&a.standby&&a.standby.hide();return null},showProgress:function(a,d){!0===a?c.add(d,"loading"):c.remove(d,"loading")},startup:function(){this.inherited(arguments)}})});
//# sourceMappingURL=_ProgressIndicatorMixin.js.map