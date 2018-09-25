import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Alert } from 'reactstrap';
import { APP } from "./util";
import axios from 'axios';


class ProductForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            product: null,
            description: null,
            image: null,
            price: null,
            errorMessage:null,
            error: false,
            isLoading: false
        };
        this.fileChangeHandler = this.fileChangeHandler.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    fileChangeHandler(e) {
        this.setState({
            image: e.target.files[0]
        });
    };


    submitForm(e) {
        e.preventDefault();
        this.setState({
            isLoading: true,
            error: false,
            errorMessage: ''
        });

        const body = new FormData(Form);
        body.append("product", e.target.product.value);
        body.append("description", e.target.description.value);
        body.append("price", e.target.price.value);
        body.append("image", this.state.image);
        this._uploadToServer(body);
    }

    _uploadToServer(body) {
        axios.post(`${APP.BASE_URL}/${APP.CREATE_PRODUCT_URL}`, body)
            .then(response => {
                this.setState({
                    product: '',
                    isLoading: false,
                    error: false,
                    errorMessage: ''
                });
                this.props.addProduct(response.data)
            }).catch(err => {
            this.setState({
                isLoading: false,
                error: true,
                errorMessage: err.errors
            });
        });
    }

    render() {
        return (
            <Form onSubmit={this.submitForm}>
                <FormGroup>
                    <label>Title</label>
                    <input type={'text'} name={'product'} placeholder='Enter the product name' className={'form-control'}/>
                </FormGroup>

                <FormGroup>
                    <label>Description</label>
                    <input type={'text'} name={'description'} placeholder='Enter product description' className={'form-control'} />
                </FormGroup>

                <FormGroup>
                    <label>Price</label>
                    <input type={'text'} name={'price'} placeholder='Price' className={'form-control'}/>
                </FormGroup>

                <FormGroup>
                    <Label for="imageFile">Image</Label>
                    <Input type="file" name="file" id="imageFile" onChange={this.fileChangeHandler}/>
                </FormGroup>

                { this.state.error &&
                <Alert color="danger">
                    {this.state.errorMessage}
                </Alert>
                }
                <Button type='submit' outline color="success">Add Product</Button>

            </Form>
        )
    }
}

export default ProductForm;