//>>built
require({cache:{"xide/utils":function(){define(["dojo/_base/declare"],function(b){return b("xide.utils",null,{})})},"xide/mixins/ReferenceMixin":function(){define(["dojo/_base/declare","xide/types","xide/utils","dijit/registry"],function(b,d,e,f){return b("xide.mixins.ReferenceMixin",null,{skipWidgetCSSClasses:"dijitButtonHover dijitHover dijit dijitInline dijitReset dijitCheckBoxChecked dijitChecked dijitLeft".split(" "),_cssClassesToQuery:function(a){var b="";if(a){a=a.split(" ");for(var c=0;c<
a.length;c++)-1<e.contains(this.skipWidgetCSSClasses,a[c])||-1<a[c].toLowerCase().indexOf("hover")||(b+="."+a[c])}return b.trim()},resolveReference:function(a){if(!a||!a.reference||!a.reference.length)return null;switch(a.mode){case d.WIDGET_REFERENCE_MODE.BY_ID:return[f.byId(a.reference)];case d.WIDGET_REFERENCE_MODE.BY_CLASS:if(a=dojo.getObject(a.reference))return[a];break;case d.WIDGET_REFERENCE_MODE.BY_CSS:if(a=this._cssClassesToQuery(a.reference),a=e.find(a,null,!1))return a}return null}})})},
"xide/main":function(){},"xide/types":function(){define(["dojo/_base/declare"],function(b){return b("xide/types",null,{})})}}});
//# sourceMappingURL=xide.js.map