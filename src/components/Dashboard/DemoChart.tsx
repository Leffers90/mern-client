import React, { Component } from "react";
import Chart from "react-apexcharts";

class DemoChart extends Component {
  state = {
    selection: "one_year",
    options: {
      legend: {
        show: true
      },
      chart: {
        id: "Photo Analytics"
      },
      grid: {
        show: false
      },
      xaxis: {
        type: "date",
        min: new Date("01 Jan 2018").getTime(),
        tickAmount: 6,
        categories: [
          "2018-01-01",
          "2018-02-01",
          "2018-03-01",
          "2018-04-01",
          "2018-05-01",
          "2018-06-01",
          "2018-07-01",
          "2018-08-01",
          "2018-09-01",
          "2018-10-01",
          "2018-11-01",
          "2018-12-01"
        ]
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy"
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      },
      theme: {
        palette: "palette1"
      }
    },
    // END OF OPTIONS

    series: [
      {
        name: "Tags Generated",
        type: "bar",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 65, 45, 34, 44]
      },
      {
        name: "Photos Uploaded",
        type: "line",
        data: [18, 32, 18, 50, 67, 23, 75, 70, 65, 45, 34, 44]
      }
    ]
  };

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="line"
      />
    );
  }
}

export default DemoChart;
