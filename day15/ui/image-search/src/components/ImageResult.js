import React from 'react';
import './ImageResult.css';

class ImageResult extends React.Component {

    handleClick = (event) => {
        event.preventDefault();
        console.dir(this.props.imageDetails);
    }

    render() {
        // console.dir(this.props.imageDetails);
        
        return (
            <div className="imageResult">
                <img src={this.props.imageDetails.urls.regular} alt={this.props.imageDetails.alt_description} />
                <br />
                <button onClick={this.handleClick}>Describe Image</button>
            </div>
        )
    }
}

export default ImageResult;