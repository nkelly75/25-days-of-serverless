import React from 'react';
import axios from 'axios';
import './ImageResult.css';

const IMAGE_DESCRIBE_FUNC = 'http://localhost:7071/api/ImageDescribe';

class ImageResult extends React.Component {

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
            let msgs = [];
            if (response.data.caption) {
                msgs.push('Caption: ' + response.data.caption);
            }
            if (response.data.categories) {
                msgs.push('Categories: ' + response.data.categories);
            }
            if (response.data.tags) {
                msgs.push('Tags: ' + response.data.tags);
            }
            if (msgs.length > 0) {
                alert(msgs.join(', '));
            }
        }
    }

    render() {
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