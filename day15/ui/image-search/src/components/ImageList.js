import React from 'react';

import ImageResult from './ImageResult';

// const emptyInfo = {
//     caption: '',
//     categories: '',
//     tags: ''
// };

const ImageList = (props) => {
    const imgs = props.foundImages.map(img => {
        return <ImageResult imageDetails={img} key={img.id}/>
    });

    return (
        <div style={{textAlign: 'center'}}>{imgs}</div>
    )
}

export default ImageList;