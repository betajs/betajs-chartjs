Scoped.define("module:ChartJS", [
    "dynamics:Dynamic",
    "base:Strings"
], function (Dynamic, Strings, scoped) {

    var Cls = Dynamic.extend({scoped: scoped}, {

        template : "<div><canvas></canvas></div>",

        initial : {

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

            }
        },

        _init: function(type) {
            if (this.get("title"))
                this.__addTitle(this.get("title"));
            if (this.get("legend") !== true)
                this.__addLegend(this.get("legend"));
            if (this.get("customdataobj")) {
                var custom = this.get("customdataobj");
                if (custom.options)
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
            if (!this.get("options"))
                this.set("options", {});
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

    return Cls;
});
