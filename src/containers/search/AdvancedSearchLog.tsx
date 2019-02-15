import { connect } from "react-redux";
import { AppState } from "../../states/appState";
import AdvancedSearchLog from "../../components/search/AdvancedSearchLog";
import {updateBBox, updateWavelength, updateWaterDepth} from "../../actions/advancedSearchActions";


const mapStateToProps = (state: AppState) => {
    return {
        selectedBounds: state.advancedSearchState.selectedBounds,
        selectedWavelength: state.advancedSearchState.selectedWavelength,
        waterDepth: state.advancedSearchState.waterDepth,
    };
};

const mapDispatchToProps = {
    updateBBox,
    updateWavelength,
    updateWaterDepth,
};


export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchLog);