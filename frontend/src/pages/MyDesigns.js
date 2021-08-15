import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';


// const useStyles = makeStyles(() => ({
//     root: {
//         flexGrow: 1,
//         marginTop: 5,
//     },
// }));

function MyDesigns(props) {
    // const classes = useStyles();

    return (
        <Container>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        // address: state.address,
        // chainId: state.chainId,
    };
};

export default connect(mapStateToProps, {})(MyDesigns);