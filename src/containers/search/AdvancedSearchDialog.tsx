import { connect } from "react-redux";
import { AppState } from "../../states/appState";
import AdvancedSearchDialog from "../../components/search/AdvancedSearchDialog";
import { bboxChange, updateSelectedWavelength } from "../../actions/advancedSearchActions";


const mapStateToProps = (state: AppState) => {
    return {
        selectedBounds: state.advancedSearchState.selectedBounds,
        selectedWavelength: state.advancedSearchState.selectedWavelength,
    };
};


const mapDispatchToProps = {
    onBBoxChange: bboxChange,
    onWavelengthSelect: updateSelectedWavelength,
};


export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchDialog);