import React, { Component } from 'react';
import ReadProductsComponent from './read_products.component';
import CreateProductComponent from './create_product.component'
import ReadOneProductComponent from './read_one_product.component'
import UpdateProductComponent from './update_one_priduct.component'

import '../App.css';



class App extends Component {

  constructor(){
    super();
    
    this.state = {
      currentMode: 'read',
      productId: null
    };

    this.changeAppMode =  this.changeAppMode.bind(this)
  }



  changeAppMode = (newMode, productId) => {
    this.setState({ currentMode: newMode });
    if( productId !== undefined ) {
      this.setState({ productId: productId });
    }
  }

   // renderProduct = ({ id, name }) => <div key={id}>{name}</div>;

  render() {
    var modeComponent = 
    <ReadProductsComponent changeAppMode={this.changeAppMode} />
 

    switch (this.state.currentMode) {
      case 'read' :
        modeComponent = <ReadProductsComponent changeAppMode={this.changeAppMode} />
        break;
       case 'readOne' :
        modeComponent = <ReadOneProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode} />
        break;
      case 'create' :
        modeComponent =  <CreateProductComponent  changeAppMode={this.changeAppMode} />
        break;
      case 'update' :
        modeComponent =  <UpdateProductComponent productId={this.state.productId} changeAppMode={this.changeAppMode} />
        break;
      default :
        break;
      
      }


    return modeComponent;
  }

}

export default App;
