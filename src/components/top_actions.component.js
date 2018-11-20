/* eslint-disable jsx-a11y/anchor-is-valid */
import React , { Component } from 'react'

class TopActionsComponents extends Component {

    render() {
        return(
            <div>
            <a href="#" onClick={() => this.props.changeAppMode('create')}
                className='btn btn-primary margin-bottom-1em'> Create product
            </a>
        </div>
        )
    }
}

export default TopActionsComponents;