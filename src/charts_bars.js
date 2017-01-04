Scoped.define("module:ChartJS.Bars", [
    "module:ChartJS",
    "base:Strings"
], function (ChartsElem, Strings, scoped) {

    var Cls = ChartsElem.extend({scoped: scoped}, {

        initial : {
            attrs: {
                horizontal : false
            }
        }

    });

    Cls.register("ba-chart-bars");

    return Cls;

});
