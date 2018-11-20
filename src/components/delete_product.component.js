import React , { Component } from 'react'
import Header from './Header'

class DeleteProductComponent extends Component {
    constructor() {
        super()

        this.state ={
            titleHeader:'Delete Product',
            productName: '',
            affectedRows:0,
            message:''
        }

        this.onDelete =  this.onDelete.bind(this)
    }
    componentDidMount() {
        this.setState.message = this.props.message 
        this.mounted = true;
        let productId = this.props.productId;

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
            this.setState({productName: data.name })
          

        })
        // .then(response => )
       //  .then( this.state.products,  console.log(this.state.products))
        .catch(err => console.log(err))

    }

    onDelete() {
        let productId = this.props.productId;
        this.mounted = true;
        
        this.serverRequestProd = fetch(`http://localhost:5000/product/delete/${productId}`)
        .then((response) =>  {
            if (this.mounted) {
                return response.json()
            }
        }
        ).then((result) => {
            console.log(result)
            this.setState({affectedRows: result.data.affectedRows})
             // console.log(datas.affectedRows)
            this.props.changeAppMode('read')
            this.props.statusMessage('deleted')
            if(this.state.affectedRows > 0 ) {
                this.props.statusMessage('deleted')
            }
           
        })
    }

    render(){
        return(
            <div className='row'>
            <Header title={this.state.titleHeader} />
            <br/>
            <br/>
            <div className='col-md-3'> </div>
            <div className='col-md-6'>
                <div className='panel panel-default'>
                    <div className='panel-heading'></div>
                    <div className='panel-body text-align-center'>Are you sure delete {this.state.productName} ?</div>
                    <div className='panel-footer clearfix'>
                        <div className='text-align-center'>
                            <button onClick={this.onDelete}
                                className='btn btn-danger m-r-1em'>Yes</button>
                            <button onClick={() => this.props.changeAppMode('read')}
                                className='btn btn-primary'>No</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-3'></div>
        </div>
        )
    }


}

export default DeleteProductComponent