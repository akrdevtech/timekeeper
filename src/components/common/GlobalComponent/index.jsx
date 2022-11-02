import React, { useContext } from 'react'
import GlobalActions from '../../../contexts/global/Actions';
import { GlobalContext } from '../../../contexts/global/Store';
import GenericSnackBar from '../GenericSnackBar'

const GlobalComponent = () => {
    const [state, dispatch] = useContext(GlobalContext);
    const { genericSnackBar } = state;

    const handleSnackBarClose = () => {
        dispatch({ type: GlobalActions.GENERIC_SNACKBAR.CLOSE, })
    }

    return (
        <>
            <GenericSnackBar {...genericSnackBar} handleClose={handleSnackBarClose} />
        </>
    )
}

export default GlobalComponent