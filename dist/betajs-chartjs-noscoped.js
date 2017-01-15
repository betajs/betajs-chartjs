/*!
betajs-chartjs - v1.0.7 - 2017-01-15
Copyright (c) Pablo Iglesias
Apache-2.0 Software License.
*/

(function () {
var Scoped = this.subScope();
Scoped.binding('module', 'global:BetaJS.Dynamics.ChartJS');
Scoped.binding('base', 'global:BetaJS');
Scoped.binding('dynamics', 'global:BetaJS.Dynamics');
Scoped.binding('jquery', 'global:jQuery');
Scoped.define("module:", function () {
	return {
    "guid": "3f11db99-8d84-486b-845c-ce2280ed4446",
    "version": "1.0.7"
};
});
Scoped.assumeVersion('base:version', '~1.0.96');
Scoped.assumeVersion('dynamics:version', '~0.0.83');
Scoped.define("module:ChartJS.Bars", [
    "module:ChartJS",
    "base:Strings"
], function (ChartsElem, Strings, scoped) {

    var Cls = ChartsElem.extend({scoped: scoped}, {

        initial : {
            attrs: {
                horizontal : false
            },

            create : function() {
                var type = "bar";
                if (this.get("horizontal")) {
                    type = "horizontalBar";
                }

                this._init(type);

                new Chart(this.getCanvas(), this.get("chartobj"));
            }
        },

        _getColors: function() {
            if (this.get("randomcolors")) {
                var chardatalength = this.get("chartdata")[0].data.length;
                var colors = this.__getRandomColors(chardatalength);
                var backgroundColors = [];
                var lineColors = [];
                colors.forEach(function(color, index) {
                    var bgColor = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", 0.2)";
                    var lineColor = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", 1)";
                    backgroundColors.push(bgColor);
                    lineColors.push(lineColor);
                });

                return {"backgroundColors" : backgroundColors, "lineColors": lineColors};
            }
        },

        _addRandomColors: function(dataset) {
            var colors = this._getColors();
            if (!dataset.backgroundColor)
                dataset.backgroundColor = colors.backgroundColors;
            if (!dataset.borderColor) {
                dataset.borderColor = colors.lineColors;
                dataset.borderWidth = 1;
            }

            return dataset;
        }
    });

    Cls.register("ba-chart-bars");

    return Cls;

});

Scoped.define("module:ChartJS", [
    "dynamics:Dynamic",
    "base:Strings"
], function (Dynamic, Strings, scoped) {

    return Dynamic.extend({scoped: scoped}, {

        template : "<div><canvas></canvas></div>",


        attrs: {
            type: "",
            title: false,
            legend: true,
            colors: [],
            chartdata: null,
            chartlabels: null,
            customdataobj: null,
            options: null,
            chartobj: null,
            colorset: null


        },
        
        getCanvas: function () {
        	return this.activeElement().getElementsByTagName("CANVAS")[0];
        },

        _init: function(type) {
            if (this.get("title"))
                this.__addTitle(this.get("title"));
            if (this.get("legend") !== true)
                this.__addLegend(this.get("legend"));
            if (this.get("customdataobj")) {
                var custom = this.get("customdataobj");
                if (custom.options && this.get("options"))
                    custom.options = Object.assign(this.get("options"), custom.options);
                this.set("chartobj", custom);
                return true;
            }

            this.__validateData();

            this.set("chartobj", {});

            if (type !== undefined)
                this.setProp("chartobj.type", type);
            var data = {
                labels: this.get("chartlabels"),
                datasets: this.get("chartdata")
            };
            this.setProp("chartobj.options", this.get("options"));
            this.setProp("chartobj.data", data);
        },

        __validateData: function() {
            if (!this.get("chartdata"))
                throw "Chart chartdata must be set";
            var chartdata = this.get("chartdata");
            if (!this.get("chartlabels"))
                console.warn("You might be missing the data labels");
            this.__validateDataSets();

        },

        __validateDataSets: function() {
            var chartdata = this.get("chartdata");
            var dyn = this;
            chartdata.forEach(function(current, index, main) {
                if (!current.label)
                    console.warn("A dataset doesn't have a label");
                if (dyn.get("chartlabels") && (!current.data || current.data.length !== dyn.get("chartlabels").length))
                    console.warn("The amount of data points doesn't match chart labels");
                if (dyn.get("randomcolors")) {
                    main[index] = dyn._addRandomColors(current);
                }
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
            if (!this.get("options"))
                this.set("options", {});
            this.setProp("options." + key, value);
        },

        __getRandomColors: function(amount) {
            var colors = [];
            for (var i = 1; i <= amount; i ++) {
                var color = [(Math.floor(Math.random() * 256)), (Math.floor(Math.random() * 256)), (Math.floor(Math.random() * 256))];
                colors.push(color);
            }
            return colors;
        }
    });

});

Scoped.define("module:ChartJS.Doughnut", [
    "module:ChartJS",
    "base:Strings"
], function (ChartsElem, Strings, scoped) {

    var Cls = ChartsElem.extend({scoped: scoped}, {

        initial : {
            create : function() {

                this._init("doughnut");
                new Chart(this.getCanvas(), this.get("chartobj"));
            }
        },

        _getColors: function() {
            if (this.get("randomcolors")) {
                var chardatalength = this.get("chartdata")[0].data.length;
                var colors = this.__getRandomColors(chardatalength);
                var backgroundColors = [];
                var lineColors = [];
                colors.forEach(function(color, index) {
                    var bgColor = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", 0.2)";
                    backgroundColors.push(bgColor);
                });

                return {"backgroundColors" : backgroundColors, "lineColors": lineColors};
            }
        },

        _addRandomColors: function(dataset) {
            var colors = this._getColors();
            if (!dataset.backgroundColor)
                dataset.backgroundColor = colors.backgroundColors;

            return dataset;
        }
    });

    Cls.register("ba-chart-doughnut");

    return Cls;

});

Scoped.define("module:ChartJS.Line", [
    "module:ChartJS",
    "base:Strings"
], function (ChartsElem, Strings, scoped) {
	
	var Cls = ChartsElem.extend({scoped: scoped}, {

        initial : {
            create : function() {
                this._init("line");
                new Chart(this.getCanvas(), this.get("chartobj"));
            }
        },

        _getColors: function() {
            if (this.get("randomcolors")) {
                var chardatalength = 1;
                var colors = this.__getRandomColors(chardatalength);
                var backgroundColor;
                var lineColor;
                colors.forEach(function(color, index) {
                    var bgColor = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", 0.2)";
                    var lnColor = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", 1)";
                    backgroundColor  = bgColor;
                    lineColor = lnColor;
                });

                return {"backgroundColors" : backgroundColor, "lineColors": lineColor};
            }
        },

        _addRandomColors: function(dataset) {
            var colors = this._getColors();
            if (!dataset.backgroundColor)
                dataset.backgroundColor = colors.backgroundColors;
            if (!dataset.borderColor) {
                dataset.borderColor = colors.lineColors;
                dataset.borderWidth = 1;
            }
            dataset.pointBackgroundColor = colors.backgroundColors;
            dataset.pointBorderColor = '#fff';
            dataset.pointHoverBackgroundColor = '#fff';
            dataset.pointHoverBorderColor = colors.backgroundColors;

            return dataset;
        }
	});

	Cls.register("ba-chart-line");
	
	return Cls;

});

Scoped.define("module:ChartJS.Pie", [
    "module:ChartJS",
    "base:Strings"
], function (ChartsElem, Strings, scoped) {

    var Cls = ChartsElem.extend({scoped: scoped}, {

        initial : {
            create : function() {

                this._init("pie");
                new Chart(this.getCanvas(), this.get("chartobj"));
            }
        },

        _getColors: function() {
            if (this.get("randomcolors")) {
                var chardatalength = this.get("chartdata")[0].data.length;
                var colors = this.__getRandomColors(chardatalength);
                var backgroundColors = [];
                var lineColors = [];
                colors.forEach(function(color, index) {
                    var bgColor = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", 0.2)";
                    backgroundColors.push(bgColor);
                });

                return {"backgroundColors" : backgroundColors, "lineColors": lineColors};
            }
        },

        _addRandomColors: function(dataset) {
            var colors = this._getColors();
            if (!dataset.backgroundColor)
                dataset.backgroundColor = colors.backgroundColors;

            return dataset;
        }
    });

    Cls.register("ba-chart-pie");

    return Cls;

});

Scoped.define("module:ChartJS.Polar", [
    "module:ChartJS",
    "base:Strings"
], function (ChartsElem, Strings, scoped) {

    var Cls = ChartsElem.extend({scoped: scoped}, {

        initial : {
            create : function() {

                this._init("polarArea");
                new Chart(this.getCanvas(), this.get("chartobj"));
            }
        },

        _getColors: function() {
            if (this.get("randomcolors")) {
                var chardatalength = this.get("chartdata")[0].data.length;
                var colors = this.__getRandomColors(chardatalength);
                var backgroundColors = [];
                var lineColors = [];
                colors.forEach(function(color, index) {
                    var bgColor = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", 0.2)";
                    backgroundColors.push(bgColor);
                });

                return {"backgroundColors" : backgroundColors, "lineColors": lineColors};
            }
        },

        _addRandomColors: function(dataset) {
            var colors = this._getColors();
            if (!dataset.backgroundColor)
                dataset.backgroundColor = colors.backgroundColors;

            return dataset;
        }
    });

    Cls.register("ba-chart-polar");

    return Cls;

});

Scoped.define("module:ChartJS.Radar", [
    "module:ChartJS",
    "base:Strings"
], function (ChartsElem, Strings, scoped) {

    var Cls = ChartsElem.extend({scoped: scoped}, {

        initial : {
            create : function() {
                this._init("radar");
                new Chart(this.getCanvas(), this.get("chartobj"));
            }
        },

        _getColors: function() {
            if (this.get("randomcolors")) {
                var chardatalength = 1;
                var colors = this.__getRandomColors(chardatalength);
                var backgroundColor;
                var lineColor;
                colors.forEach(function(color, index) {
                    var bgColor = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", 0.2)";
                    var lnColor = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", 1)";
                    backgroundColor  = bgColor;
                    lineColor = lnColor;
                });

                return {"backgroundColors" : backgroundColor, "lineColors": lineColor};
            }
        },

        _addRandomColors: function(dataset) {
            var colors = this._getColors();
            if (!dataset.backgroundColor)
                dataset.backgroundColor = colors.backgroundColors;
            if (!dataset.borderColor) {
                dataset.borderColor = colors.lineColors;
                dataset.borderWidth = 1;
            }
            dataset.pointBackgroundColor = colors.backgroundColors;
            dataset.pointBorderColor = '#fff';
            dataset.pointHoverBackgroundColor = '#fff';
            dataset.pointHoverBorderColor = colors.backgroundColors;

            return dataset;
        }
    });

    Cls.register("ba-chart-radar");

    return Cls;

});

}).call(Scoped);