import React from 'react';
import axios from 'axios';
import './ImageResult.css';

import InfoResult from './InfoResult';

const IMAGE_DESCRIBE_FUNC = 'http://localhost:7071/api/ImageDescribe';

class ImageResult extends React.Component {

    state = { 
        caption: '',
        categories: '',
        tags: ''
    }

    handleClick = async (event) => {
        event.preventDefault();
        console.dir(this.props.imageDetails);

        const headers = {
            'Content-Type': 'application/json'
        };

        const response = await axios.post(IMAGE_DESCRIBE_FUNC, {
            url: this.props.imageDetails.urls.regular
        }, {
            headers: headers
        });

        console.dir(response.data);
        if (response.data) {
            if (response.data.caption) {
                this.setState({ caption: response.data.caption })
            }
            if (response.data.categories) {
                this.setState({ categories: response.data.categories })
            }
            if (response.data.tags) {
                this.setState({ tags: response.data.tags })
            }
        }
    }

    render() {

        let infoElement;
        if (this.state.caption || this.state.categories || this.state.tags) {
            infoElement = <InfoResult info={this.state}/>
        } else {
            infoElement = <div />
        }

        return (
            <div className="imageResult">
                <img src={this.props.imageDetails.urls.regular} alt={this.props.imageDetails.alt_description} />
                <br />
                <button onClick={this.handleClick}>Describe Image</button>
                {infoElement}
            </div>
        )
    }
}

export default ImageResult;