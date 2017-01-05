Scoped.define("module:ChartJS.Line", [
    "module:ChartJS",
    "base:Strings"
], function (ChartsElem, Strings, scoped) {
	
	var Cls = ChartsElem.extend({scoped: scoped}, {
		
		initial : {

		}
	});

	Cls.register("ba-chart-line");
	
	return Cls;

});
