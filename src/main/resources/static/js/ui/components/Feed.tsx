import * as React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'


class Feed extends React.Component {

    public render() {
        return (
            <div>

            </div>
        );
    }

} 

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({

}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Feed);