The charts module registers a wrapper for the ChartJS via the dynamics system. 
You can instantiate it as follows (is recommendable to read the ChartJS Docs page - http://www.chartjs.org/docs/):


```javascript

	BetaJS.Dynamics.Dynamic.activate();

```


```html

<ba-chart-bars
           ba-title=""
           ba-legend=""
           ba-chartdata=""
           ba-chartlabels=""
           ba-options=""
           ba-randomcolors=""
           ba-customdataobj=""
           >
</ba-chart-bars>


```

There are multiple chart types, each one represented by a different dynamic. The currently supported types are:
  - ba-chart-bars (gives support for horizontal bar chart and mixed charts - bars and line)
  - ba-chart-pie
  - ba-chart-doughnut
  - ba-chart-line
  - ba-chart-polar
  - ba-chart-polar

Each one of these can be implemented with the following partials:
  - ba-title (*object|string*): Title to show on the chart. _false_ by default, can be configured with a string or with a json object with the following format (check more configuration options here http://www.chartjs.org/docs/#chart-configuration-title-configuration):
  ```json
    {
     display: true,
     text: "Title text."
    }
```
  - ba-legend (*object|boolean*): Wether to show the legends or not. Legends can be configured with a json object with the following format (http://www.chartjs.org/docs/#chart-configuration-legend-configuration):
  ```json
{
            display: true,
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        }
```
  - ba-chartdata* (*array*): Array of dataset objects. You can find how to put together a dataset on ChartJS docs. Usually, the minimun required configuration is:
   
   ```json
[{
label: "Dataset",
data: [1, 2, 3, 4, 5]
}]
```
  - ba-chartlabels* (*array*) : Labels for the dataset values. An array of strings with the following format:
  
  ```json
["January", "February", "March", "April"]
```

_*Note: both ba-chartdata and ba-chartlabels are mandatory if ba-customdataobj is null_


  - ba-options (*array*) : A set for chart options. It contains general options, and specific options for each chart type. Refer to ChartJS docs for more info. A small example could be the following:
  
  ```json
{
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
```

  - ba-randomcolors (*boolean*): If you don't want to configure specific colors for each dataset, you love life on multicolor or you just want to drive the user crazy changing chart colors each time the chart refresh, you must set this partial to _true_.
  
  - ba-customdataobj (*object*): A custom chart configuration object. Just put the object on this partial and it will display the chart as you want (No matter which partial you use). The object must contain all of the chart configuration.
  _Important!: all of the other configurations on other partials will be ignored, except for the ba-title and the ba-legend_ . Example, for a line chart:
  
  ```json
{
    type: 'line',
    data: {
        datasets: [{
            label: 'Scatter Dataset',
            data: [{
                x: -10,
                y: 0
            }, {
                x: 0,
                y: 10
            }, {
                x: 10,
                y: 5
            }]
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
}
```
or a bars chart:

```json
{
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
}
```

