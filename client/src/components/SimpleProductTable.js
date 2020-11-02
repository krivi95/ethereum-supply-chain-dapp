// ReactJS imports
import React from 'react';

// MaterialUI imports
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
  tableContainer: {
    maxWidth: 750,
    marginTop: 20,  
    height: 300
  }
});


export default function SimpleProductTable(props) {
  const classes = useStyles();

  const shipProduct = async (event, productId) => {
    /**
     * Updating the state on the product from "Paid" to "Delivered"
     */
    await props.productManager.methods.triggerDelivery(productId).send({ from: props.account });

    // Updating list of products from parent component (so that table is automatically updated)
    props.updateProducts()
  }

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <h4 align="left">&nbsp;&nbsp;&nbsp;{props.title} products</h4>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" style={{ 'fontWeight': 'bold' }}>Name</TableCell>
            <TableCell align="right" style={{ 'fontWeight': 'bold' }}>Price</TableCell>
            <TableCell align="right" style={{ 'fontWeight': 'bold' }}>State</TableCell>
            <TableCell align="right" style={{ 'fontWeight': 'bold' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow key={row.paymentAddress}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.state}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" aria-label="add to shopping cart" size="small" onClick={(event) => shipProduct(event, row.id)}>
                  Ship product &nbsp;<LocalShippingIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}