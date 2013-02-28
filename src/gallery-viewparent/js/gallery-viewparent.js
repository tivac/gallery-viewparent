/*jshint yui:true */
"use strict";

var ViewParent;

ViewParent = function() {};
ViewParent.ATTRS = {
    children  : {
        value : false
    }
};

ViewParent.prototype = {
    initializer : function() {
        this._viewParentHandles = [
            // Make sure new child views bubble
            this.on("childrenChange", this._childrenChange, this),
            
            // Stick children into rendered DOM after the parent has rendered itself
            Y.Do.after(this._renderChildren, this, "render", this)
        ];
        
        
        // Catch initial values of views ATTR
        this._childrenChange({
            newVal : this.get("children")
        });
    },
    
    // Destroy child views & clean up all handles
    destructor : function() {
        Y.Object.each(this.get("children"), function(view) {
            view.destroy();
        });
        
        new Y.EventTarget(this._viewParentHandles).detach();
        
        this._viewParentHandles = null;
    },
    
    renderChild : function(name, view) {
        var parent = this.get("container"),
            slot   = parent.one("[data-child=\"" + name + "\"]");
        
        if(!slot) {
            return;
        }
        
        view.render();
        
        // abuses the chainability of .addClass a little
        slot.replace(
            view.get("container")
                .addClass("child " + name + " " + slot.get("className"))
        );
    },
    
    // Render all the child views & inject them into the placeholders
    _renderChildren : function() {
        var children = this.get("children"),
            name;
        
        if(!children) {
            return;
        }
        
        this.get("container").addClass("parent");
        
        for(name in children) {
            this.renderChild(name, children[name]);
        }
    },
    
    // Make sure custom events from child views bubble to parent view
    _childrenChange : function(e) {
        var self = this;
        
        Y.Object.each(e.newVal, function(view) {
            Y.stamp(view, true);
            
            view.addTarget(self);
        });
    }
};

Y.ViewParent = ViewParent;
