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
