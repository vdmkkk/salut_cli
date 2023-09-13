export const SET_FILTERS = 'SET_FILTERS';
export const SET_PROFILE = 'SET_PROFILE'

export const setFilters = filters => dispatch => {
    dispatch({
        type: SET_FILTERS,
        payload: filters,
    });
};
export const setProfile = profile => dispatch => {
    dispatch({
        type: SET_PROFILE,
        payload: profile,
    });
};