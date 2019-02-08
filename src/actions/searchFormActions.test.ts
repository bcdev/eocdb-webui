import configureMockStore from 'redux-mock-store'
import thunk from "redux-thunk";
import * as fetchMock from 'fetch-mock'

import {
    searchDatasets,
    START_LOADING,
    startLoading,
    STOP_LOADING,
    stopLoading,
    UPDATE_DATASET_QUERY, UPDATE_FOUND_DATASETS, UPDATE_SEARCH_HISTORY,
    updateDatasetQuery, updateFoundDatasets
} from "./searchFormActions";
import { DEFAULT_API_SERVER_URL } from "../api/config";
import { LatLng } from "leaflet";


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const EUMETSAT_LAT_LNG = new LatLng(49.858996564, 8.622830842);

const initState = {
    configState: {apiServerUrl: DEFAULT_API_SERVER_URL},
    searchFormState: {
        datasetQuery: {
            startDate: "1980-01-01",
            endDate: "2020-01-01",
            geojson: true,
        },
        searchHistory: [],
        foundDatasets: {
            locations: new Map(),
            datasets: [],
            query: {
                mtype: '',
                shallow: '',
                wdepth: '',
            },
            total_count: 0,
        },
        loading: false,
    },
    searchMapState: {
        position: EUMETSAT_LAT_LNG,
        zoom: 4,
    },
    advancedSearchState: {
        left: 0,
        bottom: 0,
        right: 0,
        top: 0,
        filterLog: [],
    },
    dataTableState: {
        page: 0,
        rowsPerPage: 5,

        metaInfoDialogOpen: false,
        plotDialogOpen: false,
        downloadDocs: false,

        dataset: {
            id: "",
            path: '',
            metadata: new Map(),
            records: [],
            longitudes: [],
            latiudes: [],
            attributes: [],
            times: [],
        },
    },
};

describe('searchFormActions', () => {
    afterEach(() => {
        fetchMock.restore()
    });

    it('should create a startLoading action', () => {
        const expectedAction = {
            type: START_LOADING,
            loading: true,
        };

        expect(startLoading()).toEqual(expectedAction);
    });

    it('should create a stopLoading action', () => {
        const expectedAction = {
            type: STOP_LOADING,
            loading: false,
        };

        expect(stopLoading()).toEqual(expectedAction);
    });

    it('updateFoundDatasets', () => {
        const foundDatasets = {
            locations: new Map(),
            datasets: [],
            query: {
                mtype: '',
                shallow: '',
                wdepth: '',
            },
            total_count: 0,
        };

        const expectedAction = {
            type: UPDATE_FOUND_DATASETS,
            foundDatasets,
        };

        expect(updateFoundDatasets(foundDatasets)).toEqual(expectedAction);
    });

    it('should create a updateDatasetQuery action', () => {
        const datasetQuery = {
            startDate: "1980-01-01",
            endDate: "2020-01-01",
            geojson: true,
        };
        const expectedAction = {
            type: UPDATE_DATASET_QUERY,
            datasetQuery
        };

        expect(updateDatasetQuery(datasetQuery)).toEqual(expectedAction);
    });

    it('Should fetch datasets', () => {
        const queryComponents = '?start_time=1980-01-01&end_time=2020-01-01&offset=1&count=5&geojson=true';
        const apiServerUrl = DEFAULT_API_SERVER_URL + '/datasets' + queryComponents;

        fetchMock.getOnce(apiServerUrl, {
            body: {todos: ['do something']},
            headers: {'content-type': 'application/json'}
        });

        const expectedActions = [
            {foundDatasets: {todos: ["do something"]}, type: UPDATE_FOUND_DATASETS},
            {searchHistory: [], type: UPDATE_SEARCH_HISTORY},
            {loading: false, type: STOP_LOADING},
            {messageText: "Data Loaded", messageType: "success", type: "POST_MESSAGE"}
            ];

        const store = mockStore(initState);

        return store.dispatch(searchDatasets() as any).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    });
});



