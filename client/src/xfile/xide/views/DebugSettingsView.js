//>>built
define("xide/views/DebugSettingsView",["dojo/_base/declare","xide/widgets/TemplatedWidgetBase","xide/factory"],function(a,b,d){return a("xide.views.DebugSettingsView",[b],{root:null,dst:null,src:null,delegate:null,selectButton:null,value:null,settings:{script:null,host:null,port:"9090",debug_port:"5858"},formEdits:{script:null,host:null,port:null,debug_port:null},templateString:"\x3cdiv\x3e\x3cdiv data-dojo-attach-point\x3d'root' data-dojo-type\x3d'dijit.layout.ContentPane'\x3e\x3c/div\x3e\x3c/div\x3e",
createEdit:function(a,b){var c=d.createEditBox(this.root.containerNode,"",a+":",b,null,this.delegate);c.owner=this;return c},createWidgets:function(){this.formEdits.script=this.createEdit("Script Path",this.settings.script);this.formEdits.host=this.createEdit("Debugger server Host",this.settings.host);this.formEdits.port=this.createEdit("Debugger server Port",this.settings.port);this.formEdits.debug_port=this.createEdit("Debugger server Debug Port",this.settings.debug_port)},getValue:function(){this.settings.script=
this.formEdits.script.get("value");this.settings.host=this.formEdits.host.get("value");this.settings.port=this.formEdits.port.get("value");this.settings.debug_port=this.formEdits.debug_port.get("value");return this.settings},startup:function(){this.didStartup||(this.inherited(arguments),this.settings&&this.createWidgets(),this.didStartup=!0,this.formEdits.script.focus())}})});
//# sourceMappingURL=DebugSettingsView.js.map