import React, { Component } from 'react';
import { Form, Button,Badge } from 'reactstrap'
import { APP } from './util'
import axios from 'axios';

class Favorite extends Component {

    constructor (props) {
        super(props);
        this.state = {
            id: props.productId,
            count: props.favoriteCount,
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.state.count++;

        axios.post(`${APP.BASE_URL}/${APP.PRODUCTS_URL}/${this.state.id}/count`).then(res => {
            this.props.favoriteIncrease(res.data, this.state.id)
        });
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Button type='submit' color="primary" outline>
                    Favorite <Badge color="secondary">{ this.state.count }</Badge>
                </Button>
            </Form>
        )
    }
}

export default Favorite;