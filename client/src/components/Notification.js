import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function SimpleSnackbar(props) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.open}
        autoHideDuration={6000}
        onClose={props.handleClose}
        message={props.message}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={props.handleClose}>
              Close
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={props.handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
