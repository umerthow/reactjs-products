/* eslint-disable jsx-a11y/anchor-is-valid */
import React , { Component } from 'react'


class ProductRow extends Component {

    render(){
        return (
            
            <tr>
            <td>{this.props.product.name}</td>
            <td>{this.props.product.description}</td>
            <td>${parseFloat(this.props.product.price).toFixed(2)}</td>
            <td>{this.props.product.category_name}</td>
            <td>
                <a onClick={() => this.props.changeAppMode('readOne', this.props.product.id)}
                    className='btn btn-info m-r-1em'> Read One
                </a>
                <a onClick={() => this.props.changeAppMode('update', this.props.product.id)}
                    className='btn btn-primary m-r-1em'> Edit
                </a>
                <a onClick={() => this.props.changeAppMode('delete', this.props.product.id)}
                    className='btn btn-danger'> Delete
                </a>
            </td>
        </tr>
        )
    }
}

export default ProductRow;