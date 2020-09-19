import React, { Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";

export default class App extends Component {
  componentDidMount() {
    this.getProducts();
  }

  state = { currentCategory: "", products: [], cart:[] };
  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id); //alttaki kodu sağlasın diye burda çağırdık
  };

  getProducts = (categoryId) => {
    //filtreleme yapıyoruz
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url = url + "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };
  addToCart = (product) => {
    let newCart = this.state.cart;
   var addedItem = newCart.find(c=>c.product.id === product.id);
   if(addedItem){
     addedItem.quantity+=1
   }else{
    newCart.push({product:product, quantity:1}); //newCart'a push ile eleman ekledik
   }
   
   this.setState({cart:newCart});//state'i de bu şekilde set ettik
  }
  render() {
    let categoryInfo = { title: "CategoryList" };
    let productInfo = { title: "ProductList" };
    return (
      <div>
        <Container>
          <Navi cart={this.state.cart} />
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <ProductList
                products={this.state.products}
                addToCart = {this.addToCart}
                currentCategory={this.state.currentCategory}
                info={productInfo}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
