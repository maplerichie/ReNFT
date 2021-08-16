import React, { useEffect, createRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import api from '../utils/api';
import {
    Grid, Card, CardActionArea, CardMedia, Typography, ImageList, ImageListItem, Button
} from '@material-ui/core';
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

const myTheme = {
    'common.backgroundColor': '#fff',
};

function Burn(props) {
    const classes = useStyles();
    const { address } = props;
    let [data, setData] = React.useState([]);
    // let [selectedImage, setImage] = React.useState({ url: './logo.png', name: 'Logo' });
    const editorRef = createRef();

    const setEdit = async (name, url) => {
        let merged = await loadImage(name, url);
        editorRef.current.getInstance().loadImageFromURL(merged, name).then(result => {
            editorRef.current.getInstance().clearUndoStack();
            // console.log('old : ' + result.oldWidth + ', ' + result.oldHeight);
            console.log('new : ' + result.newWidth + ', ' + result.newHeight);
        });
    }

    const loadImage = async (name, url) => {
        let sourceImage = new Image();
        sourceImage.crossOrigin = "anonymous";
        sourceImage.src = url;
        await sourceImage.decode();

        let frameSrc;
        let innerX;
        let innerY;
        let nameX;
        let nameY;
        let dateX;
        let dateY;
        let innerWidth;
        let innerHeight;
        let targetWidth;
        let targetHeight;
        if (sourceImage.height / sourceImage.width >= 1.2) {
            frameSrc = './frame_43.png';
            innerWidth = 991;
            innerHeight = 1414;
            targetWidth = 1300;
            targetHeight = 1774;
            innerX = 154;
            innerY = 180;
            nameX = 155;
            nameY = 1594;
            dateX = 1144;
            dateY = 1594;
            /*
            Outer 1300x1774
            Inner 991x1414 p1: 154,180; p2: 1145,1594
            Text height: 125; 
            LX: 155, y1: 1594, y2: 1718
            RX: 1144
            */
        } else {
            frameSrc = './frame_11.png';
            innerWidth = 988;
            innerHeight = 988;
            targetWidth = 1300;
            targetHeight = 1300;
            innerX = 156;
            innerY = 155;
            nameX = 157;
            nameY = 1143;
            dateX = 1143;
            dateY = 1143;
            /*
            Outer1300x1300
            Inner 988x988  p1: 156,155; p2: 1144,1143
            Text height: 102; 
            LX: 157, y1: 1143, y2: 1244
            RX: 1143
            */
        }
        let frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.src = frameSrc;
        await frameImage.decode();
        let frameCanvas = document.createElement('canvas');// new HTMLCanvasElement(targetWidth, targetHeight);
        frameCanvas.width = targetWidth;
        frameCanvas.height = targetHeight;
        let frameCtx = frameCanvas.getContext('2d');
        frameCtx.drawImage(sourceImage, innerX, innerY, innerWidth, innerHeight);
        frameCtx.drawImage(frameImage, 0, 0);
        frameCtx.font = "48px Roboto";
        frameCtx.fillText(name, nameX, nameY + 48 + 24);
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        let today = new Date();
        frameCtx.font = "24px Roboto";
        let formattedDate = '- ' + today.toLocaleDateString("en-US", options);
        frameCtx.fillText(formattedDate, dateX - (12 * formattedDate.length), dateY + 48 + 24);

        return frameCanvas.toDataURL();
        // return blob;
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
        <div className={classes.root}>
            <Grid container className={classes.myCollection}>
                <Grid item>
                    <Typography>Select to burn</Typography>
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
                    menu: ['crop', 'flip', 'rotate', 'draw', 'text', 'filter'],
                    // menu: ['crop', 'flip', 'rotate', 'draw', 'shape', 'icon', 'text', 'mask', 'filter'],
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
            <Button variant="contained" color="secondary" size="large" className={classes.btnMint}>Burn and Mint</Button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        address: state.address,
    };
};

export default connect(mapStateToProps, {})(Burn);