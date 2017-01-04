Scoped.define("module:ChartJS.Line", [
    "module:ChartJS",
    "base:Strings"
], function (ChartsElem, Strings, scoped) {
	
	var Cls = ChartsElem.extend({scoped: scoped}, {
		
		initial : {
            create : function() {
                this._init();
                var element = this.element().find("canvas").get(0);

                this.graph = new Chart(element, {
                    type: "line",
                    data: this.get("chartdata"),
                    options: this.get("options")
                });
            }
		}
	
	});

	Cls.register("ba-chart-line");
	
	return Cls;

});
