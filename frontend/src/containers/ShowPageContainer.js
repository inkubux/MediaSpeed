import React, {Component} from 'react';
import {connect} from "react-redux";
import {selectShowHash, selectSeasonsForCurrentShow} from "../reducers/index";
import ShowPage from "../components/ShowPage";
import {fetchSeasonsIfNeeded} from "../actions/seasonsActions";


class ShowPageContainer extends Component {

    componentDidMount() {
        if (this.props.show) {
            this.props.fetchSeasons(this.props.show);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.show !== this.props.show) {
            this.props.fetchSeasons(this.props.show);
        }
    }

    render() {
        return <ShowPage {...this.props} />
    }
}

function mapStateToProps(state, ownProps) {
    return {
        show: selectShowHash(state)[ownProps['show-uid']],
        seasons: selectSeasonsForCurrentShow(state, ownProps['show-uid']),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchSeasons: (show) => dispatch(fetchSeasonsIfNeeded(show))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowPageContainer)
