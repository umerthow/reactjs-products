/* eslint-disable jsx-a11y/anchor-is-valid */
import React , { Component } from 'react'
import Header from './Header'

class UpdateProductComponent extends Component {

    constructor(){
        super();
     
        this.state = {
            categories: [],
            selectedCategoryId: 0,
            id: 0,
            name: '',
            description: '',
            price: 0,
            successUpdate: null,
            titleHeader: 'Update Product',
            categoryId: 0,
        };

        this.onCategoryChange =  this.onCategoryChange.bind(this)
        this.onNameChange =  this.onNameChange.bind(this)
        this.onDescriptionChange =  this.onDescriptionChange.bind(this)
        this.onPriceChange =  this.onPriceChange.bind(this)
        this.onSave =  this.onSave.bind(this)
    }

    componentDidMount(){
        const controller = new AbortController()
        const signal = controller.signal

        this.mounted= true

        this.serverRequestCat = fetch('http://localhost:5000/categories',{signal})
        .then((response) =>  {
            if (this.mounted) {
                return response.json()
            }
            
        }).then((result) => {
            console.log(result)
            this.setState({categories : result.data})
        })
        .catch(err => console.log(err))

        var productId = this.props.productId

        //get One data

        this.serverRequestProd = fetch(`http://localhost:5000/product/${productId}`)
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
            this.setState({categoryId: data.category_id })
        })
    }

    componentWillUnmount(){
        this.serverRequestCat = false
        this.serverRequestProd =  false
    }

    onCategoryChange(e){
        this.setState({ categoryId: e.target.value })
    }

    onNameChange(e) {
        this.setState({ name: e.target.value })
    }

    onDescriptionChange(e) {
        this.setState({ description: e.target.value })
    }
    onPriceChange(e){
        this.setState({ price: e.target.value })
    }

    onSave(e){
        var form_data = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            category_id: this.state.categoryId
        }

        fetch("http://localhost:5000/product/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form_data)
          })
          .then((response) =>  {
            return response.json()
          }).then((result) => {
            console.log(result)
                // api message
            this.setState({successUpdate: result.message});
            console.log(result)
         })
        .catch(err => console.log(err))
        
        e.preventDefault()
    }


    render() {
        var categoriesOptions = this.state.categories.map((category)=> {
            return (
                <option key={category.category_id} value={category.category_id}>{category.category_name}</option> 
            )
        })

        return (
                <div>
                     <Header title={this.state.titleHeader} />
                    {
                        this.state.successUpdate === "Product was updated" ?
                            <div className='alert alert-success'>
                                Product was updated.
                            </div>
                        : null
                    }
        
                    {
                        this.state.successUpdate === "Unable to update product." ?
                            <div className='alert alert-danger'>
                                Unable to update product. Please try again.
                            </div>
                        : null
                    }
        
                    <a href='#'
                        onClick={() => this.props.changeAppMode('read')}
                        className='btn btn-primary margin-bottom-1em'>
                        Read Products
                    </a>
                    <br/>
                    <br/>
                    <form onSubmit={this.onSave}>
                        <table className='table table-bordered table-hover'>
                            <tbody>
                            <tr>
                                <td>Name</td>
                                <td>
                                    <input
                                        type='text'
                                        className='form-control'
                                        value={this.state.name}
                                        required
                                        onChange={this.onNameChange} />
                                </td>
                            </tr>
        
                            <tr>
                                <td>Description</td>
                                <td>
                                    <textarea
                                        type='text'
                                        className='form-control'
                                        required
                                        value={this.state.description}
                                        onChange={this.onDescriptionChange}></textarea>
                                </td>
                            </tr>
        
                            <tr>
                                <td>Price ($)</td>
                                <td>
                                    <input
                                        type='number'
                                        step="0.01"
                                        className='form-control'
                                        value={this.state.price}
                                        required
                                        onChange={this.onPriceChange}/>
                                </td>
                            </tr>
        
                            <tr>
                                <td>Category</td>
                                <td>
                                    <select
                                        onChange={this.onCategoryChange}
                                        className='form-control'
                                        value={this.state.categoryId}>
                                        <option value="-1">Select category...</option>
                                        {categoriesOptions}
                                        </select>
                                </td>
                            </tr>
        
                            <tr>
                                <td></td>
                                <td>
                                    <button
                                        className='btn btn-primary'
                                        onClick={this.onSave}>Save Changes</button>
                                </td>
                            </tr>
        
                            </tbody>
                        </table>
                    </form>
                </div>
            );
        
    }
}

export default UpdateProductComponent;