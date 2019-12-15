import React from 'react';

class InfoResult extends React.Component {

    render() {
        return (
            <div className="infoResult">
                <p><strong>Caption: </strong>{this.props.info.caption}</p>
                <p><strong>Categories: </strong>{this.props.info.categories}</p>
                <p><strong>Tags: </strong>{this.props.info.tags}</p>
            </div>
        )
    }
}

export default InfoResult;