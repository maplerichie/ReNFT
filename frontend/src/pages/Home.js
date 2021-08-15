import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Container, Typography, Grid } from '@material-ui/core';


const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        marginTop: 5,
    },
    img1: {
        width: '30vw',
    },
    img2: {
        width: '100%',
    },
    imgs: {
        width: 128,
        height: 64,
        objectFit: 'contain'
    },
    techs: {
        alignContent: 'center',
        textAlign: 'center',
    }
}));

function Home(props) {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <img alt="0" src="./0.jpg" />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h3">What is NFT?</Typography>
                    <Typography>A non-fungible token is a unit of data stored on a digital ledger, called a blockchain, that certifies a digital asset to be unique and therefore not interchangeable. NFTs can be used to represent items such as photos, videos, audio, and other types of digital files. People are spending from hundred to million for the digital assets daily. Some people not even understand the reason behind this action.</Typography>
                </Grid>
                <Grid item xs={6}>
                    <img className={classes.img1} alt="1" src="./1.jpg" />
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5">What? Just a JPEG from internet cost thousand to million??? </Typography>
                    <Typography>ABSOLUTELY NOT! NFTs are not just these digital files, not just avatar, or keep repeating audio, video files.</Typography>
                </Grid>
                <Grid item xs={12}>
                    <img className={classes.img2} alt="2" src="./2.png" />
                </Grid>
                <Grid item xs={12}>
                    <Typography>In ReNFT, you can turn your NFT to something more valuable, it can be an invitation card, postcard, and as NFT and send them to your friend. Furthermore, you create a key to your friends to join into the Web 3.0 world!</Typography>
                    <Typography>NFTs to validate your invitation to private party? NFTs for social? Combine your music NFTs to JPEG NFTs?</Typography>
                    <Typography variant="h5">Reimagine NFTs! Unlimied possibilities!</Typography>
                </Grid>
                <Grid item xs={12} className={classes.techs}>
                    <Typography variant="h4">Technology Providers</Typography>
                </Grid>
                <Grid item xs={12} className={classes.techs}>
                    <img className={classes.imgs} alt="a" src="./audius.png" />
                    <img className={classes.imgs} alt="b" src="./covalent.png" />
                    <img className={classes.imgs} alt="c" src="./ENS.png" />
                    <img className={classes.imgs} alt="d" src="./nftstorage.png" />
                    <img className={classes.imgs} alt="e" src="./opensea.png" />
                    <img className={classes.imgs} alt="f" src="./unlock.jpg" />
                </Grid>
            </Grid>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        // address: state.address,
        // chainId: state.chainId,
    };
};

export default connect(mapStateToProps, {})(Home);