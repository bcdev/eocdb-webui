import { SearchFormState, newSearchFormState } from '../states/searchFormState';
import {
    SearchFormAction, START_LOADING, STOP_LOADING,
    UPDATE_DATASET_QUERY,
    UPDATE_FOUND_DATASETS,
    UPDATE_SEARCH_HISTORY
} from '../actions/searchFormActions';

const initialState = newSearchFormState();

export function searchFormReducer(state: SearchFormState, action: SearchFormAction): SearchFormState {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
        case UPDATE_DATASET_QUERY: {
            return {...state, datasetQuery: action.datasetQuery};
        }
        case UPDATE_FOUND_DATASETS: {
            return {...state, foundDatasets: action.foundDatasets};
        }
        case UPDATE_SEARCH_HISTORY: {
            return {...state, searchHistory: action.searchHistory}
        }
        case START_LOADING: {
            return {...state, loading: action.loading}
        }
        case STOP_LOADING:
            return {...state, loading: action.loading}
    }
    return state;
}