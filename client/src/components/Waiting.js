import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';


export default function Waiting(props) {
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <div style={{margin: "20px", textAlign: 'center'}}>
          <CircularProgress/>
        </div>
        <div style={{margin: "20px", textAlign: 'center'}}>
          {props.displayText}
        </div>
      </Container>
    </React.Fragment>
  );
}