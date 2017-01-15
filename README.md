# betajs-chartjs 1.0.7
[![Code Climate](https://codeclimate.com/github/betajs/betajs-chartjs/badges/gpa.svg)](https://codeclimate.com/github/betajs/betajs-chartjs)
[![NPM](https://img.shields.io/npm/v/betajs-chartjs.svg?style=flat)](https://www.npmjs.com/package/betajs-chartjs)


BetaJS-ChartJS is a ChartJS Plugin for the BetaJS Framework.



## Getting Started


You can use the library in the browser and compile it as well.

#### Browser

```javascript
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="chartjs/chartjs.js"></script>
	<script src="betajs/dist/betajs.min.js"></script>
	<script src="betajs-browser/dist/betajs-browser.min.js"></script>
	<script src="betajs-dynamics/dist/betajs-dynamics.min.js"></script>
	<script src="betajs-chartjs/dist/betajs-chartjs.min.js"></script>
``` 

#### Compile

```sh
	git clone https://github.com/betajs/betajs-chartjs.git
	npm install
	grunt
```



## Basic Usage


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
  
  - ba-customdataobj (*object*): A custom chart configuration object. Just put the object on this partial and it will display the chart as you want (No matter which partial you use). The object must contain all of the chart configuration. This is ment to be used for very specific user demands.
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
#### Demos

You can find demos for each dynamic and partial on the demos folder, but I give you a small pie chart example (Remember to load the libraries!):

```html
<ba-chart-pie
		ba-chartdata="{{
            [
                {
                label: 'My example dataset',
                data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
	    }}"
		ba-chartlabels="{{['January', 'February', 'March', 'April', 'May', 'June', 'July']}}"
		ba-randomcolors="{{true}}"
>
</ba-chart-pie>
<script>
BetaJS.Dynamics.Dynamic.activate();
</script>
```

and that previous bar chart using the custom data object:

```html
<ba-chart-pie
		ba-customdataobj="{{{
               type: 'bar',
               data: {
                   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
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
           }}}"
>
</ba-chart-pie>
<script>
BetaJS.Dynamics.Dynamic.activate();
</script>
```
_Note that it doesn't matter if I put a bar chart config on the ba-chart-pie dynamic, as this overrides all of the configs._


## Links
| Resource   | URL |
| :--------- | --: |
| Homepage   | [http://betajs.com](http://betajs.com) |
| Git        | [git://github.com/betajs/betajs-chartjs.git](git://github.com/betajs/betajs-chartjs.git) |
| Repository | [https://github.com/betajs/betajs-chartjs](https://github.com/betajs/betajs-chartjs) |
| Blog       | [http://blog.betajs.com](http://blog.betajs.com) | 
| Twitter    | [http://twitter.com/thebetajs](http://twitter.com/thebetajs) | 
 






## Dependencies
| Name | URL |
| :----- | -------: |
| betajs | [Open](https://github.com/betajs/betajs) |
| betajs-browser | [Open](https://github.com/betajs/betajs-browser) |
| betajs-dynamics | [Open](https://github.com/betajs/betajs-dynamics) |


## Weak Dependencies
| Name | URL |
| :----- | -------: |
| betajs-scoped | [Open](https://github.com/betajs/betajs-scoped) |


## Main Contributors

- Pablo Iglesias

## License

Apache-2.0







