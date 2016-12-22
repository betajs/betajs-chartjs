Scoped.define("module:ChartJS.Bars", [
    "module:ChartJS",
    "base:Strings"
], function (ChartsElem, Strings, scoped) {
	
	var Cls = ChartsElem.extend({scoped: scoped}, {
		
		initial : {

            create : function() {
                this._validateData();
                var element = this.element().find("canvas").get(0);

                this.graph = new Chart(element, {
                    type: "bar",
                    data: this.get("chart-data"),
                    options: this.get("chart-options")
                });
            }
		}
	
	});

	Cls.register("ba-chart-bars");
	
	return Cls;

});
