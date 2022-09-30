import GlobalActions from './Actions'

const GlobalReducer = (state, action) => {
    switch (action.type) {
        case GlobalActions.APP_DRAWER.SELECT_PAGE:
            return {
                ...state,
                selectedPage: action.payload.selectedPage,
            };
            
        default:
            return state;
    }
};

export default GlobalReducer;