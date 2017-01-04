Scoped.define("module:ChartJS", [
    "dynamics:Dynamic",
    "base:Strings"
], function (Dynamic, Strings, scoped) {

    return Dynamic.extend({scoped: scoped}, {
		
		template : "<div><canvas></canvas></div>",

        attrs: {
		    title: false,
            legend: true,
            colors: [],
            chartdata: null,
            options: {}

        },

        _init: function() {
		    if (this.get("title"))
		        this.__addTitle(this.get("title"));
		    if (this.get("legend") !== true)
                this.__addLegend(this.get("legend"));

		    this.__validateData();
        },

        __validateData: function() {
            if (!this.get("chartdata"))
                throw "Chart chartdata must be set";
            var chartdata = this.get("chartdata");
            if (!chartdata.labels)
                console.warn("You might be missing the data labels");
            this.__validateDataSets();

        },

        __validateDataSets: function() {
            var chartdata = this.get("chartdata");
            if (!chartdata.datasets)
                console.warn("You might be missing the datasets");

            chartdata.datasets.forEach(function(current, index, main) {
                if (!current.label)
                    console.warn("A dataset doesn't have a label");
                if (chartdata.labels && (!current.data || current.data.length !== chartdata.labels.length))
                    console.warn("The amount of data points doesn't match chart labels");
            });
        },

        __addTitle: function (value) {
            var title = "";
            if (typeof value !== "object") {
                title = {
                    display: true,
                    text: value
                };
            } else {
                title = value;
            }
            this.__addOption("title", title);
        },

        __addLegend: function (value) {
		    var legend = "";
		    if (typeof value === "object") {
                legend = value;
            } else {
                if (!value)
                    legend = {
                        display: false
                    };
            }
            this.__addOption("legend", legend);
        },

        __addOption: function (key, value) {
            this.setProp("options." + key, value);
        }
	
	});
});
