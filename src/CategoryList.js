import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class Category extends Component {
  state = {
    categories: [],
  };
  componentDidMount() {
    //component yerleşti
    this.getCategories(); //categoryleri doldur
  }

  getCategories = () => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json()) //gelen response'u jsona çeviriyoruz
      .then((data) => this.setState({ categories: data })); //json a dönmüş data buraya geliyor
  };

  render() {
    return (
      <div>
        <h3>{this.props.info.title}</h3>
        <ListGroup>
          {this.state.categories.map((category) => (
            <ListGroupItem
              active={ //aktif olan mavi oluyor
                category.categoryName === this.props.currentCategory
                  ? true
                  : false
              }
              onClick={() => this.props.changeCategory(category)}
              key={category.id}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
        {/* <h4>{this.props.currentCategory}</h4> */}
      </div>
    );
  }
}
