import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import api from '../utils/api';
import {
    Grid, Container, Avatar, Card, CardActionArea, CardMedia, Typography, Button, CardActions, CardContent, Tooltip, Box
} from '@material-ui/core';
import {
    withRouter,
} from "react-router-dom";


const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        marginTop: 5,
    },
    card: {
        maxWidth: 256,
    },
    media: {
        height: 256,
        width: 256,
    },
    actions: {
        justifyContent: 'space-between',
    },
    iconBtn: {
        marginLeft: 16,
        height: 48,
        width: 48,
        fontSize: 24,
        boxShadow: '0 2px 8px rgb(0 0 0 / 20%)',
    },
}));

function MyCollectibles(props) {
    const classes = useStyles();
    const { address, history } = props;
    let [data, setData] = React.useState([]);

    const handleLink = (url) => {
        history.push(url);
    }
    useEffect(() => {
        if (!address) return;
        api.getRaribleCollectibles(address).then((res) => {
            let collectibles = [];
            for (var collectible of res.data.items) {
                collectibles.push({
                    name: collectible.meta.name ? collectible.meta.name : '#' + collectible.tokenId,
                    image: collectible.meta.image.url.PREVIEW ? collectible.meta.image.url.PREVIEW : collectible.meta.image.url.ORIGINAL,
                    contract: collectible.contract,
                    token_id: collectible.tokenId,
                });
            }
            setData(collectibles);
        }).catch((err) => console.log(err));
    }, [address]);

    return (
        <Container>
            <Grid
                className={classes.root}
                container
                spacing={5}>
                {data.length > 0 && data.map((collectible, index) => (
                    <Grid item key={index}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={collectible.image ?? './logo.png'}
                                    title={collectible.name}
                                />
                                <CardContent>
                                    <Typography component="h2">
                                        {collectible.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions className={classes.actions}>
                                <Tooltip title="Go to Opensea">
                                    <iconBtn
                                        onClick={() => window.open('https://opensea.io/assets/' + collectible.contract + '/' + collectible.token_id, '_blank')}>
                                        <Avatar src={'./opensea.png'} />
                                    </iconBtn>
                                </Tooltip>
                                <Box>
                                    <Button variant="text" onClick={() => handleLink("/burn")}>Burn</Button>
                                    <Button variant="outlined" color="secondary">Create</Button>
                                    {/* <Tooltip title="Burn it!">
                                        <IconButton color="primary" className={classes.iconBtn}>🔥</IconButton>
                                    </Tooltip>
                                    <Tooltip title="Redesign it">
                                        <IconButton color="primary" className={classes.iconBtn}>🎨</IconButton>
                                    </Tooltip> */}
                                </Box>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        address: state.address,
    };
};

export default connect(mapStateToProps, {})(withRouter(MyCollectibles));