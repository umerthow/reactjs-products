import React , { Component } from 'react'
import TopActionsComponents from './top_actions.component'
import ProductsTable from './products_table.component'
import Header from './Header'

class ReadProductsComponent extends Component {

    state = {
        products : [],
        titleHeader :'All Products'
    }

    componentDidMount() {

        fetch('http://localhost:5000/products')
        .then((response) =>  {
            return response.json()
        }
        ).then((result) => {
            console.log(result)
            this.setState({products : result.data })
        })
        // .then(response => )
       //  .then( this.state.products,  console.log(this.state.products))
        .catch(err => console.log(err))
    }

    render() {
        var filteredProducts = this.state.products;
        // $('.page-header h1').text('Read Products')
        return (
            <div className='overflow-hidder'>
               <Header title={this.state.titleHeader} />
                <TopActionsComponents changeAppMode={this.props.changeAppMode} />
                <br/>
                <ProductsTable  
                    products={filteredProducts}
                    changeAppMode={this.props.changeAppMode}
                />
            </div>
        )

    }


}

export default ReadProductsComponent ;