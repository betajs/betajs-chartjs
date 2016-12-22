Scoped.define("module:ChartJS", [
    "dynamics:Dynamic",
    "base:Strings"
], function (Dynamic, Strings, scoped) {

    return Dynamic.extend({scoped: scoped}, {
		
		template : "<div><canvas></canvas></div>",

        _validateData: function() {
            if (!this.get("chart-data"))
                throw "Chart data must be set";
            var data = this.get("chart-data");
            if (!data.labels)
                console.warn("You might be missing the data labels");
            this._validateDataSets();

        },

        _validateDataSets: function() {
            var data = this.get("chart-data");
            if (!data.datasets)
                console.warn("You might be missing the datasets");

            data.datasets.forEach(function(current, index, main) {
                if (!current.label)
                    console.warn("A dataset doesn't have a label");
                if (data.labels && (!current.data || current.data.length !== data.labels.length))
                    console.warn("The amount of data points doesn't match chart labels");
            });
        }
	
	});
});
