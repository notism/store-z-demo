export const handleEnqueueSnackbar = (enqueueSnackbar, msg, variant ) => {
  enqueueSnackbar(msg, { 
    variant: variant,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
  });
}
