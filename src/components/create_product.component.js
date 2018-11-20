/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import Header from './Header'

class CreateProductComponent extends Component {

    constructor(){
        super();
     
        this.state = {
            categories: [],
            selectedCategoryId: -1,
            name: '',
            description: '',
            price: 0,
            successCreation: null,
            titleHeader: 'Create Product'
        };
        
        this.onCategoryChange =  this.onCategoryChange.bind(this)
        this.onNameChange =  this.onNameChange.bind(this)
        this.onDescriptionChange =  this.onDescriptionChange.bind(this)
        this.onPriceChange =  this.onPriceChange.bind(this)
        this.onSave =  this.onSave.bind(this)

      }



    componentDidMount() {
        this.mounted = true;
        fetch('http://localhost:5000/categories')
        .then((response) =>  {
            if (this.mounted) {
                return response.json()
            }
            
        }).then((result) => {
            console.log(result)
            this.setState({categories : result.data})
        })
        .catch(err => console.log(err))
       
    }

    componentWillUnmount() {
        // this.serverRequest.abort();
        this.mounted = false;
    }

    onCategoryChange(e){
        this.setState({ selectedCategoryId: e.target.value })
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
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            category_id: this.state.selectedCategoryId
        }

        fetch("http://localhost:5000/product/store", {
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
            this.setState({successCreation: result.message});
            console.log(result)
 
            // empty form
            this.setState({name: ""});
            this.setState({description: ""});
            this.setState({price: ""});
            this.setState({selectedCategoryId: -1});
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
        return(
            <div>
             <Header title={this.state.titleHeader} />
             {
                 this.state.successCreation === "Product was created" ?
                 <div className='alert alert-success'>
                    Product was saved.
                </div>
                : null
             }

             {
 
                this.state.successCreation === "Unable to create product." ?
                    <div className='alert alert-danger'>
                        Unable to save product. Please try again.
                    </div>
                : null
            }

            <a onClick={() => this.props.changeAppMode('read')} 
             className='btn btn-primary' >Read Product </a>
        
           
            <br/>
            <br/>
            <form onSubmit={this.onSave} >
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
                        onChange={this.onDescriptionChange}>
                        </textarea>
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
                        value={this.state.selectedCategoryId}>
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
                        onClick={this.onSave}>Save</button>
                    </td>
                </tr>
                </tbody>
            </table>
            </form>


            </div>
           
        )
    }
}


export default CreateProductComponent;