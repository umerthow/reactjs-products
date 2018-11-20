/* eslint-disable jsx-a11y/anchor-is-valid */
import React , { Component } from 'react'
import Header from './Header'

class ReadOneProduct extends Component {

    constructor(){
        super();
     
        this.state = {
            id: 0,
            name: '',
            description:'',
            price: 0,
            category_name: '',
            titleHeader :'Read Product'
        };

      }

      componentDidMount() {
        this.mounted = true;
        var productId = this.props.productId;

        fetch(`http://localhost:5000/product/${productId}`)
        .then((response) =>  {
            if (this.mounted) {
                return response.json()
            }
        }
        ).then((result) => {
            console.log(result)
            let data = result.data[0]
            console.log(data.id)
            this.setState({id: data.id })
            this.setState({name: data.name })
            this.setState({description: data.description })
            this.setState({price: data.price })
            this.setState({category_name: data.category_name })

        })
        // .then(response => )
       //  .then( this.state.products,  console.log(this.state.products))
        .catch(err => console.log(err))

      }

      componentWillUnmount(){
        this.mounted = false;
      }



      render() {
          return (
            <div>
                <Header title={this.state.titleHeader} />
                <a onClick={() => this.props.changeAppMode('read')} 
                className='btn btn-primary' >Read Product </a>
                <br/>
                <br/>
                <table className='table table-bordered table-hover'>
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{this.state.name}</td>
                    </tr>
 
                    <tr>
                        <td>Description</td>
                        <td>{this.state.description}</td>
                    </tr>
 
                    <tr>
                        <td>Price ($)</td>
                        <td>${parseFloat(this.state.price).toFixed(2)}</td>
                    </tr>
 
                    <tr>
                        <td>Category</td>
                        <td>{this.state.category_name}</td>
                    </tr>
 
                    </tbody>
                </table>
 
            </div>
          )
          
      }
 }

 export default ReadOneProduct