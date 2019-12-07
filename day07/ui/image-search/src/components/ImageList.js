import React from 'react';

const ImageList = (props) => {
    // console.log(props.foundImages);
    const imgs = props.foundImages.map(img => {
        return <img key={img.id} src={img.urls.regular} alt={img.alt_description} />
    });

    return (
        <div style={{textAlign: 'center'}}>{imgs}</div>
    )
}

export default ImageList;