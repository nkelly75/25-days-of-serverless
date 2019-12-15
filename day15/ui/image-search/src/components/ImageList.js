import React from 'react';
import './ImageList.css';

const ImageList = (props) => {
    const imgs = props.foundImages.map(img => {
        return <div className="imageResult"><img key={img.id} src={img.urls.regular} alt={img.alt_description} /><button>Describe Image</button></div>
    });

    return (
        <div style={{textAlign: 'center'}}>{imgs}</div>
    )
}

export default ImageList;