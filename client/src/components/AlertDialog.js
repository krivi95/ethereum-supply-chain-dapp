import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {

    return (
        <div>
            <Dialog
                open={props.show}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Successfully added new item to the inventory"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please inform customer with following details: <br />
                        Product price (Wei): {props.price} <br />
                        Payment address: {props.paymentAddress} <br />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.closeAlertDialog} color="primary" autoFocus>
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}