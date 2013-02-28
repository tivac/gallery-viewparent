YUI.add("basic-tests", function(Y) {

    var suite = new Y.Test.Suite("gallery-viewparent"),
        Assert = Y.Assert;

    suite.add(
        new Y.Test.Case({
            name: "Basic Tests",
            
            "Y.ViewParent exists": function() {
                Assert.isNotUndefined(Y.ViewParent);
                Assert.isFunction(Y.ViewParent);
            },
            
            "Y.ViewParent is usable as an extension" : function() {
                var Base = Y.Base.create("base", Y.Base, [ Y.ViewParent ]),
                    base;
                    
                base = new Base();
            },
            
            "Y.ViewParent adds a 'children' attribute" : function() {
                var Base = Y.Base.create("base", Y.Base, [ Y.ViewParent ]),
                    base;
                    
                base = new Base();
                
                console.log(base.getAttrs()); //TODO: REMOVE DEBUGGING
                
                Assert.isFalse(base.get("children"));
            }
        })
    );

    Y.Test.Runner.add(suite);


},"", { requires: [ "test", "base", "base-build", "gallery-viewparent" ] });
