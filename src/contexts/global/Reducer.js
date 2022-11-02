import GlobalActions from './Actions'

const GlobalReducer = (state, action) => {
    switch (action.type) {
        case GlobalActions.APP_DRAWER.SELECT_PAGE:
            return {
                ...state,
                selectedPage: action.payload.selectedPage,
            };
        case GlobalActions.GENERIC_SNACKBAR.OPEN:
            return {
                ...state,
                genericSnackBar: {
                    ...state.genericSnackBar,
                    open: true,
                    duration: action.payload.duration || state.genericSnackBar.duration,
                    message: action.payload.message || state.genericSnackBar.message,
                    handleClose: action.payload.handleClose || state.genericSnackBar.handleClose,
                }
            }
        case GlobalActions.GENERIC_SNACKBAR.CLOSE:
            return {
                ...state,
                genericSnackBar: {
                    ...state.genericSnackBar,
                    open: false,
                    message: "Done",
                }
            }
        default:
            return state;
    }
};

export default GlobalReducer;