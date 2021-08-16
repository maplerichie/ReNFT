import React, {createRef, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import api from '../utils/api';
import {
    Grid, Card, CardActionArea, CardMedia, Typography, ImageList, ImageListItem, Button
} from '@material-ui/core';
import { useLocation } from "react-router-dom";
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';

const useStyles = makeStyles(() => ({
    root: {
        // flexGrow: 1,
        marginTop: 5,
        height: 'calc(100vh - 75px)',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        overflow: 'hidden',
    },
    myCollection: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 8,
        paddingRight: 8,
        width: 208,
    },
    imageList: {
        height: 'calc(100vh - 105px)',
        width: 208,
    },
    card: {
        maxWidth: 192,
    },
    media: {
        height: 192,
        width: 192,
    },
    btnMint: {
        position: 'absolute',
        right: 8,
        top: 80,
    }
}));

// function useQuery() {
//     return new URLSearchParams(useLocation().search);
// }

const myTheme = {
    'common.backgroundColor': '#fff',
};


function NewDesign(props) {
    // let query = useQuery();
    const classes = useStyles();
    const { address } = props;
    let [data, setData] = React.useState([]);
    const editorRef = createRef();

    const setEdit = async (name, url) => {
        // console.log(query.get('type'));
        editorRef.current.getInstance().loadImageFromURL(url, name).then(result => {
            editorRef.current.getInstance().clearUndoStack();
            // console.log('old : ' + result.oldWidth + ', ' + result.oldHeight);
            console.log('new : ' + result.newWidth + ', ' + result.newHeight);
        });
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

    // <Typography>{query.get('type')}</Typography>
    return (
        <div className={classes.root}>
            <Grid container className={classes.myCollection}>
                <Grid item>
                    <Typography>My NFTs</Typography>
                </Grid>
                <ImageList className={classes.imageList} cols={1}>
                    {data.length > 0 && data.map((collectible, index) => (
                        <ImageListItem key={index} cols={1}>
                            <Card className={classes.card}>
                                <CardActionArea onClick={() => setEdit(collectible.name, collectible.image)}>
                                    <CardMedia
                                        className={classes.media}
                                        image={collectible.image ?? './logo.png'}
                                        title={collectible.name}
                                    />
                                </CardActionArea>
                            </Card>
                        </ImageListItem>
                    ))}
                </ImageList>
            </Grid>
            <ImageEditor
                ref={editorRef}
                includeUI={{
                    loadImage: { path: './logo.png', name: 'ReNFT' },
                    theme: myTheme,
                    // menu: ['crop', 'flip', 'rotate', 'draw', 'text', 'filter'],
                    menu: ['crop', 'flip', 'rotate', 'draw', 'shape', 'icon', 'text', 'mask', 'filter'],
                    // initMenu: 'crop',
                    uiSize: {
                        width: 'calc(100vw - 208px)',
                        // height: 'calc(100vh - 75px)',
                    },
                    menuBarPosition: 'bottom',
                }}
                // cssMaxHeight={500}
                // cssMaxWidth={700}
                selectionStyle={{
                    cornerSize: 20,
                    rotatingPointOffset: 70,
                }}
                usageStatistics={false}
            />
            <Button variant="contained" color="secondary" size="large" className={classes.btnMint}>Mint</Button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        address: state.address,
    };
};

export default connect(mapStateToProps, {})(NewDesign);