import { useCallback, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { ethers, providers } from "ethers";
import Web3Modal from "web3modal";
import { setWeb3Provider, resetWeb3Provider, setAddress, setBalance } from "./actions";
import { NETWORK, NETWORKS, ellipseAddress } from "./utils/chain";
import { makeStyles } from '@material-ui/core/styles';
import {
   Button, IconButton, ListItemIcon, Typography, 
  Divider, Tooltip, Grid, AppBar, Toolbar, MenuItem, Link,
  Popper, Grow, Paper, MenuList, ClickAwayListener
} from '@material-ui/core';
import { Instagram, Image, InsertInvitation, ZoomIn, PermIdentity } from '@material-ui/icons';
import {
  Link as RouterLink,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Home from './pages/Home';
import MyCollectibles from './pages/MyCollectibles';
import MyDesigns from './pages/MyDesigns';
import NewDesign from './pages/NewDesign';
import Burn from './pages/Burn';
import Identicon from 'react-identicons';

// const ERROR_CODE_TX_REJECTED_BY_USER = 4001;
const targetNetwork = NETWORKS[NETWORK];

const web3Modal = new Web3Modal({
  network: NETWORK,
  cacheProvider: true,
});


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: 'white',
  },
  appBarContainer: {
    flexGrow: 1,
  },
  logo: {
    marginTop: 7,
    height: 56,
    objectFit: 'contain',
  },
  networkStatus: {
    marginRight: 16,
  },
  btnBurn: {
    backgroundColor: 'white',
    marginRight: 16,
    height: 48,
    width: 48,
    fontSize: 24,
    boxShadow: '0 2px 8px rgb(0 0 0 / 20%)',
  },
  identicon: {
    height: 48,
    width: 48,
    boxShadow: '0 2px 8px rgb(0 0 0 / 20%)',
  },
  address: {
    fontSize: '0.9em',
  },
  balance: {
    fontSize: '0.7em',
  },
}));

function App(props) {
  const classes = useStyles();
  const {
    setWeb3Provider, resetWeb3Provider, setAddress,
    provider, web3Provider, address, balance, setBalance, history } = props;
  const [openCreate, setOpenCreate] = useState(false);
  const createAnchorRef = useRef(null);
  const [openProfile, setOpenProfile] = useState(false);
  const profileAnchorRef = useRef(null);

  const handleLink = (url) => {
    setOpenCreate(false);
    setOpenProfile(false);
    history.push(url);
  }

  const handleCreateToggle = () => {
    setOpenProfile(false);
    setOpenCreate((prevOpen) => !prevOpen);
  };

  const handleCreateClose = (event) => {
    if (profileAnchorRef.current && profileAnchorRef.current.contains(event.target)) {
      return;
    }
    setOpenCreate(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenCreate(false);
      setOpenProfile(false);
    }
  }

  const handleProfileToggle = () => {
    setOpenCreate(false);
    setOpenProfile((prevOpen) => !prevOpen);
  };

  const handleProfileClose = (event) => {
    if (profileAnchorRef.current && profileAnchorRef.current.contains(event.target)) {
      return;
    }
    setOpenProfile(false);
  };

  const connect = useCallback(async function () {
    setOpenCreate(false);
    setOpenProfile(false);
    // console.log('App:connect');
    const provider = await web3Modal.connect();

    const web3Provider = new providers.Web3Provider(provider);

    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    const balance = await web3Provider.getBalance(address);
    const network = await web3Provider.getNetwork();

    if (network.chainId === targetNetwork.chainId) {

      setWeb3Provider({
        provider,
        web3Provider,
        address,
        balance: balance,
        chainId: network.chainId
      });

    } else {
      console.log(network);
    }
  }, [setWeb3Provider]);

  const disconnect = useCallback(
    async function () {
      // console.log('App:disconnect');
      await web3Modal.clearCachedProvider()
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect()
      }
      resetWeb3Provider();
    },
    [provider, resetWeb3Provider]
  );

  useEffect(() => {
    // console.log('App:provider onchanged');
    if (provider?.on) {
      const handleAccountsChanged = (account) => {
        setAddress(account[0]);
        updateBalance(account[0]);
      }

      const handleChainChanged = (chainId) => {
        console.log(chainId);
        if (chainId === targetNetwork.chainId) {
          // setAddress(chain[0]);
        } else {
          alert('Unsupported chain: ' + chainId);
        }
      }

      const handleDisconnect = (error) => {
        console.log('disconnect', error)
        disconnect();
      }

      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
      provider.on('disconnect', handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged);
          provider.removeListener('chainChanged', handleChainChanged);
          provider.removeListener('disconnect', handleDisconnect);
        }
      }
    }
  }, [provider, disconnect, setAddress]);

  const updateBalance = async (addr) => {
    addr = addr ? addr : address;
    const balance = await web3Provider.getBalance(addr);
    setBalance(balance);
  }

  useEffect(() => {
    // console.log('App:init');
    if (web3Modal.cachedProvider) {
      connect()
    }
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // alert('Mobile device is not supported at the moment.');
    } else {
      console.log('Non-mobile device detected!');
    }
  }, [connect]);

  return (
    <div className={classes.root}>
      <AppBar position="static"
        className={classes.appBar}>
        <Toolbar>
          <div edge="start" className={classes.appBarContainer}>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <img className={classes.logo} alt="logo" src={'./logo.png'} />
              </Grid>
              <Grid item>
                <RouterLink to="/">
                  <Link
                    component="button"
                    variant="body1"
                    color="initial">
                    Home
                  </Link>
                </RouterLink>
              </Grid>
              <Grid item>
                <RouterLink to="/designs">
                  <Link
                    component="button"
                    variant="body1"
                    color="initial">
                    My designs
                  </Link>
                </RouterLink>
              </Grid>
            </Grid>
          </div>
          <Typography className={classes.networkStatus}>
            {web3Provider ?
              <>
                <Tooltip title="Burn a NFT">
                  <IconButton color="primary" className={classes.btnBurn} onClick={() => handleLink("/burn")}>🔥</IconButton>
                </Tooltip>
                <Button variant="contained" color="primary"
                  ref={createAnchorRef}
                  aria-controls={openCreate ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                  onClick={handleCreateToggle}>Create a design</Button>
                <Popper open={openCreate} anchorEl={createAnchorRef.current} role={undefined} transition>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleCreateClose}>
                          <MenuList autoFocusItem={openCreate} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            <MenuItem onClick={() => handleLink("/new?type=insta")}>
                              <ListItemIcon>
                                <Instagram />
                              </ListItemIcon>
                              <Typography variant="inherit">Instagram Post</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => handleLink("/new?type=postcard")}>
                              <ListItemIcon>
                                <Image />
                              </ListItemIcon>
                              <Typography variant="inherit">Postcard</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => handleLink("/new?type=invitation")}>
                              <ListItemIcon>
                                <InsertInvitation />
                              </ListItemIcon>
                              <Typography variant="inherit">Invitation</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => handleLink("/new?type=zoom")}>
                              <ListItemIcon>
                                <ZoomIn />
                              </ListItemIcon>
                              <Typography variant="inherit">Zoom Virtual Background</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => handleLink("/new?type=identity")}>
                              <ListItemIcon>
                                <PermIdentity />
                              </ListItemIcon>
                              <Typography variant="inherit">ID Card</Typography>
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </> : targetNetwork.name}
          </Typography>
          {web3Provider ? (
            <>
              <IconButton
                ref={profileAnchorRef}
                aria-controls={openProfile ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleProfileToggle}
                color="inherit"
                className={classes.identicon}>
                <Identicon string={address} size="32" />
              </IconButton>
              <Popper open={openProfile} anchorEl={profileAnchorRef.current} role={undefined} transition >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleProfileClose}>
                        <MenuList autoFocusItem={openProfile} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                          <MenuItem>
                            <Grid container direction="row" spacing={3} wrap="nowrap">
                              <Grid item>
                                <Identicon string={address} size="48" />
                              </Grid>
                              <Grid container direction="column" justifyContent="center">
                                <Grid item className={classes.address}>
                                  {ellipseAddress(address)}
                                </Grid>
                                <Grid item className={classes.balance}>
                                  {ethers.utils.formatEther(balance) + " " + targetNetwork.symbol}
                                </Grid>
                              </Grid>
                            </Grid>
                          </MenuItem>
                          <Divider />
                          <MenuItem onClick={() => handleLink("/collectibles")}>My Collectibles</MenuItem>
                          <MenuItem onClick={disconnect}>Disconnect</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={connect}>
              Connect wallet
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <main>
        <Switch>
          <Route exact from="/" render={props => <Home {...props} />} />
          <Route exact path="/collectibles" render={props => <MyCollectibles {...props} />} />
          <Route exact path="/designs" render={props => <MyDesigns {...props} />} />
          <Route exact path="/new" render={props => <NewDesign {...props} />} />
          <Route exact path="/burn" render={props => <Burn {...props} />} />
        </Switch>
      </main>
    </div >
  );
}

const mapStateToProps = (state) => {
  return {
    provider: state.provider,
    web3Provider: state.web3Provider,
    address: state.address,
    chainId: state.chainId,
    balance: state.balance,
  };
};

export default connect(mapStateToProps, { setWeb3Provider, resetWeb3Provider, setAddress, setBalance })(withRouter(App));