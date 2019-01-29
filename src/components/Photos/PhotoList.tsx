import React, { Component } from "react";
import {
  TagInput,
  Tag,
  Button,
  Popover,
  Menu,
  MenuItem,
  Position,
  Intent
} from "@blueprintjs/core";
import { connect } from "react-redux";
import Moment from "react-moment";
import Gallery from "react-grid-gallery";
import * as actions from "../../actions";
import * as Photos from "../../styles/AppStyles";
import { tagStyles } from "../../styles/AppStyles";
import baseUrl from "../../api/baseurl";
import history from "../../history";

class AllPhotos extends Component<any, any> {
  state = {
    pageNum: 1,
    redirect: false,
    tag: "",
    tagInput: [],
    isMain: true
  };

  componentDidMount() {
    this.props.fetchPhotos(this.state.pageNum);
  }

  componentDidUpdate() {
    if (
      this.state.pageNum === this.props.nextPage ||
      this.state.pageNum === this.props.prevPage
    ) {
      this.props.fetchPhotos(this.state.pageNum);
    }
  }

  handleOnClick = tag => {
    this.setState({ redirect: true, tag });
  };

  renderTags(tags) {
    return tags.map((tag, id) => {
      return (
        <div key={id}>
          <Tag
            round
            interactive
            large
            onClick={() => this.handleOnClick(tag.tag)}
          >
            {tag.tag}
          </Tag>
        </div>
      );
    });
  }

  renderPhotos() {
    if (this.props.photos) {
      return this.props.photos.map((photo, id) => {
        return (
          <Photos.TagRow key={id}>
            <img src={photo.id} alt="" />
            <Photos.Client>{photo.client}</Photos.Client>
            <Photos.Date>
              <Moment format="MMMM D, YYYY">{photo.datetime}</Moment>
            </Photos.Date>
            {this.renderTags(photo.metadata)}
          </Photos.TagRow>
        );
      });
    }
  }

  prevPage = () => {
    this.setState({ pageNum: this.props.prevPage });
  };

  nextPage = () => {
    this.setState({ pageNum: this.props.nextPage });
  };

  filterPhotos = value => {
    const filterString = `${value}`;
    if (!filterString) {
      this.props.fetchPhotos(this.state.pageNum);
    } else {
      this.props.filterPhotos(filterString);
    }
    this.setState({ tagInput: value });
  };

  getGalleryPhotos = allImages => {
    const images = [];
    allImages.forEach(function(object) {
      images.push({
        src: baseUrl + "/photos/image/" + object._id,
        thumbnail: baseUrl + "/photos/image/" + object._id,
        thumbnailWidth: "20%",
        thumbnailHeight: "20%",
        caption: object.tags.map(tags => {
          const labels = tags.label.split(",").join(", ");
          return (
            <Tag
              interactive
              style={tagStyles}
              onClick={() =>
                history.push(
                  `/tags/${tags.label
                    .split(",")
                    .map(tag => tag)
                    .join(",")}`
                )
              }
            >
              {labels}
            </Tag>
          );
        }),
        tags: object.tags.map(tags => {
          const label = tags.label.split(",");
          return { value: label[0] };
        })
      });
    });
    return images;
  };

  render() {
    const images = this.getGalleryPhotos(this.props.images);
    const filterMenu = (
      <Menu>
        <MenuItem icon="calendar" text="By Date" />
        <MenuItem icon="sort-alphabetical" text="A-Z" />
      </Menu>
    );

    return (
      <Photos.Container>
        <Photos.Wrapper>
          <Photos.Header>
            <Photos.SearchForm>
              <TagInput
                values={this.state.tagInput}
                onChange={value => this.filterPhotos(value)}
                className="search-tags"
                addOnBlur
                fill
                large
                leftIcon="tag"
                placeholder="Filter by tags"
              />
            </Photos.SearchForm>
            <Popover content={filterMenu} position={Position.BOTTOM}>
              <Button intent={Intent.PRIMARY} icon="filter" text="Filter" />
            </Popover>
          </Photos.Header>
          <div>
            <Gallery images={images} backdropClosesModal tagStyle={tagStyles} />
            {this.state.tagInput[0] && images.length === 0 && (
              <h2>NO PHOTOS FOUND!</h2>
            )}
          </div>
          {!this.state.tagInput[0] && (
            <Photos.Pagination>
              <Button
                icon="arrow-left"
                text="Back"
                disabled={!this.props.hasPrevPage}
                onClick={this.prevPage}
              />

              <Button
                rightIcon="arrow-right"
                className="btn-next"
                text="Next"
                disabled={!this.props.hasNextPage}
                onClick={this.nextPage}
              />
            </Photos.Pagination>
          )}
        </Photos.Wrapper>
      </Photos.Container>
    );
  }
}

const mapStateToProps = state => ({
  photos: state.photos.data.docs,
  page: state.photos.data.page,
  nextPage: state.photos.data.nextPage,
  prevPage: state.photos.data.prevPage,
  hasPrevPage: state.photos.data.hasPrevPage,
  hasNextPage: state.photos.data.hasNextPage,
  images: state.photos.images
});

export default connect(
  mapStateToProps,
  actions
)(AllPhotos);