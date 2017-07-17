Scoped.define("module:ChartJS.Bars", [
    "module:ChartJS",
    "base:Strings"
], function (ChartsElem, Strings, scoped) {

    var Cls = ChartsElem.extend({scoped: scoped}, {
    
        attrs: {
            horizontal : false
        },

        create : function() {
            var type = "bar";
            if (this.get("horizontal")) {
                type = "horizontalBar";
            }

            this._init(type);

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
