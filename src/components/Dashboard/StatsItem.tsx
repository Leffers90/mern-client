import React, { Component } from "react";
import { StatsItem as Stats } from "../../styles/AppStyles";
import api from "../../api/index";
import { Icon } from "@blueprintjs/core";

export default class StatsItem extends Component<any, any> {
  state = {
    title: "Fetching Data",
    avgPhotos: 0,
    avgTags: 0,
    photos: 0,
    tags: 0
  };

  componentDidMount() {
    console.log(this.props.name);
    switch (this.props.name) {
      case "Average Tags Per Day":
        api
          .get("/tags/stats/get/avgtags")
          .then(res => {
            this.setState({
              title: this.props.name,
              avgTags: res.data
            });
          })
          .catch(err => console.error(err));
        break;
      case "Average Photos Per Day":
        api
          .get("/photos/stats/get/avgphotos")
          .then(res => {
            this.setState({
              title: this.props.name,
              avgPhotos: res.data
            });
          })
          .catch(err => console.error(err));
        break;
      case "Photos":
        this.setState({
          title: this.props.name,
          photos: this.props.value
        });
        console.log("Photos");
        console.log(this.state);
        break;
      case "Tags":
        this.setState({
          title: this.props.name,
          tags: this.props.value
        });
        console.log("Tags");
        console.log(this.state);
        break;
    }
  }

  renderStats = () => {
    if (this.props.value) {
      return this.props.value;
    } else {
      return this.props.name === "Average Tags Per Day"
        ? this.state.avgTags
        : this.state.avgPhotos;
    }
  };

  render() {
    if (this.props.mainIcon) {
      return (
        <Stats>
          <Icon icon={this.props.mainIcon} iconSize={75} />
          <span>{this.renderStats()}</span>
        </Stats>
      );
    } else {
      return (
        <div className="avg-stats-single">
          <div className="avg-stats-icon">
            <Icon icon={this.props.statsIcon} iconSize={100} />
          </div>
          <div className="avg-stats-details">
            <h2>{this.state.title}</h2>
            <span>{this.renderStats()}</span>
          </div>
        </div>
      );
    }
  }
}
