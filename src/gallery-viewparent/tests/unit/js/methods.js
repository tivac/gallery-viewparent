YUI.add("method-tests", function(Y) {

    var suite = new Y.Test.Suite("gallery-viewparent"),
        Assert = Y.Assert;

    suite.add(
        new Y.Test.Case({
            name: "Method Tests",
            
            "Y.ViewParent hooks `render` methods" : function() {
                Assert.fail("write something here dummy");
            }
        })
    );

    Y.Test.Runner.add(suite);


},"", { requires: [ "test", "base", "base-build", "gallery-viewparent" ] });
