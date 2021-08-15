import React, { createContext, useContext, useState, forwardRef } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  CircularProgress,
  Slide
} from '@material-ui/core';

// const getRGB = (color) => {
//   switch (color) {
//     case 'primary':
//       return '#3f50b5';
//     case 'secondary':
//       return '#f44336';
//     default:
//       return color;
//   }
// }

const DIALOG_CONTEXT = {
  openConfirm: (options) => { },
  openAlert: (options) => { },
  openMessage: (options) => { },
  openLoading: (options) => { },
  close: () => { }
}

const DialogContext = createContext(DIALOG_CONTEXT);

export const useDialog = () => useContext(DialogContext);

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const DialogProvider = ({ context, children }) => {

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState({
    title: 'Title',
    message: 'Consectetur alias molestiae facere sunt quia et nihil totam. Consequatur eius unde voluptas perspiciatis quos voluptas impedit quas modi. Alias suscipit ipsam et qui.',
    className: 'dialog',
    element: null,
    loading: false,
    okColor: 'primary',
    okText: 'Submit',
    onOk: () => { },
    hideOk: false,
    cancelColor: 'primary',
    cancelText: 'Cancel',
    onCancel: () => { },
  });
  const {
    title,
    message,
    className,
    element,
    loading,
    okColor,
    okText,
    onOk,
    hideOk,
    cancelColor,
    cancelText,
    onCancel
  } = options

  const html = {
    __html: message || ''
  }

  const confirmHandler = (options) => {
    setOptions(options)
    setOpen(true)
  }

  const alertHandler = (options) => {
    setOptions({
      ...options,
      hideOk: true,
    })
    setOpen(true)
  }

  const messageHandler = (options) => {
    setOptions({
      ...options,
      hideOk: true,
    })
    setOpen(true)
  }

  const okHandler = () => {
    setOpen(false)
    if (onOk) {
      onOk()
    }
  }

  const loadingHandler = (options) => {
    // options.title = options.title.length > 0 ? options.title : '';
    // options.message = options.message.length > 0 ? options.message : '';
    setOptions({
      ...options,
      loading: true,
    })
    setOpen(true)
  }

  const closeHandler = () => {
    setOpen(false)
    if (onCancel) {
      onCancel()
    }
  }

  const provider = {
    openConfirm: confirmHandler,
    openAlert: alertHandler,
    openMessage: messageHandler,
    openLoading: loadingHandler,
    close: closeHandler
  }

  if (context) {
    console.log(context);
    context(provider)
  }

  return (
    <DialogContext.Provider value={provider}>
      {children}
      <Dialog
        TransitionComponent={Transition}
        keepMounted
        open={open}
        onClose={closeHandler}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        {
          title &&
          <DialogTitle
            id="dialog-title"
          >
            {title}
          </DialogTitle>
        }
        {
          message &&
          <DialogContent>
            <DialogContentText id="confirm-dialog-description">
              <span dangerouslySetInnerHTML={html} />
            </DialogContentText>
          </DialogContent>
        }
        {
          loading &&
          <Box className={className} style={{width: '160px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress disableShrink/>
          </Box>
        }
        {
          element &&
          <Box className={className}>
            {element}
          </Box>
        }
        {
          !loading && <>
            <Divider />
            <DialogActions>
              {
                !hideOk &&
                <Button
                  color={okColor || 'primary'}
                  onClick={okHandler}
                >
                  {okText}
                </Button>
              }
              <Button
                color={cancelColor || 'primary'}
                onClick={closeHandler}
              >
                {cancelText}
              </Button>
            </DialogActions>
          </>
        }
      </Dialog>
    </DialogContext.Provider>
  )
}