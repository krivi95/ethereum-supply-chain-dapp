import React, { Component } from 'react';

// MaterialUI compoments
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

import AlertDialog from './AlertDialog'

class NewItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itemName: "",
            itemPrice: "",
            paymentAddress: "",
            showAlert: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.createNewItem = this.createNewItem.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.name === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    createNewItem = async (event) => {
        /**
         * Creating new pruduct based on user inputs and storing it on smart contract 
         */
        let result = await this.props.productManager.methods.createProduct(this.state.itemName, this.state.itemPrice).send({ from: this.props.account});
        this.setState({
            showAlert: true,
            paymentAddress: result.events.ProductStateChanged.returnValues.productPaymentAddress
        });
        
        // Updating list of products from parent component (so that table is automatically updated)
        this.props.updateProducts()
    }

    toggleAlert() {
        this.setState(state => ({
            showAlert: !state.showAlert
        }));
     }

    render() {
        return (
            <Container style={{ 'marginTop': '2%', 'width': '50%' }}>
                <Paper elevation={3} >
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h2>Add items to the inventory:</h2>
                        </Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={3} style={{ 'textAlign': 'right' }}>
                            <TextField required label='Price in Wei' variant='outlined' name="itemPrice" value={this.state.itemPrice} onChange={this.handleInputChange} />
                        </Grid>
                        <Grid item xs={3} style={{ 'textAlign': 'left' }}>
                            <TextField required label='Product name' variant='outlined' name="itemName" value={this.state.itemName} onChange={this.handleInputChange} />
                        </Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={12}>
                            <Button variant="outlined" color="primary" onClick={this.createNewItem}>
                                Create new product
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <AlertDialog show={this.state.showAlert} price={this.state.itemPrice} paymentAddress={this.state.paymentAddress} closeAlertDialog={this.toggleAlert}/>
            </Container>
        );
    }
}


export default NewItem;
