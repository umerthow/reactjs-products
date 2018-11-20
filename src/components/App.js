import React, { Component } from 'react';
import ReadProductsComponent from './read_products.component';
import CreateProductComponent from './create_product.component'
import ReadOneProductComponent from './read_one_product.component'
import UpdateProductComponent from './update_one_priduct.component'
import DeleteProductComponent from './delete_product.component'

import '../App.css';



class App extends Component {

  constructor(){
    super();
    
    this.state = {
      currentMode: 'read',
      productId: null,
      message: ''
    };

    this.changeAppMode =  this.changeAppMode.bind(this)
    this.statusMessage =  this.statusMessage.bind(this)
  }



  changeAppMode = (newMode, productId) => {
    this.setState({ currentMode: newMode });
    this.setState({message: ''});
    if( productId !== undefined ) {
      this.setState({ productId: productId });
    }
  }

 

  statusMessage = (message) => {
    this.setState({message: message});
  }

   // renderProduct = ({ id, name }) => <div key={id}>{name}</div>;

  render() {
    var modeComponent = 
    <ReadProductsComponent changeAppMode={this.changeAppMode} />
 

    switch (this.state.currentMode) {
      case 'read' :
        modeComponent = <ReadProductsComponent status={this.state.message} changeAppMode={this.changeAppMode} statusMessage={this.statusMessage} />
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
      case 'delete':
        modeComponent = <DeleteProductComponent productId={this.state.productId} status={this.state.message} changeAppMode={this.changeAppMode} statusMessage={this.statusMessage}/>;
        break;
      default :
        break;
      
      }


    return modeComponent;
  }

}

export default App;
