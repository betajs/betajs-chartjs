Scoped.define("module:ChartJS.Pie", [
    "module:ChartJS",
    "base:Strings"
], function (ChartsElem, Strings, scoped) {

    var Cls = ChartsElem.extend({scoped: scoped}, {
	    
        create : function() {
            this._init("pie");
            var chart = new Chart(this.getCanvas(), this.get("chartobj"));
            this.set("chart", chart);
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
