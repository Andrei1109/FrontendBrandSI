import React from 'react';
const extractDomain = (link) => {
    const regex = /www\.(.*?)\.com/;
    const match = link.match(regex);
    if (match && match.length > 1) {
      return match[1];
    }
    return null;
  };

const ImageDisplay = (props) => {

    const decodeBase64Image = (image) => {
        // Decode the base64 image to binary data
        const binaryImageData = atob(image);
        // Create an ArrayBuffer from the binary data
        const buffer = new ArrayBuffer(binaryImageData.length);
        const view = new Uint8Array(buffer);
        for (let i = 0; i < binaryImageData.length; i++) {
            view[i] = binaryImageData.charCodeAt(i);
        }

        // Create a Blob from the ArrayBuffer
        const blob = new Blob([buffer], { type: 'image/jpeg' });

        // Create a data URL for the image
        const imageUrl = URL.createObjectURL(blob);

        return imageUrl;
    };

    const imageUrl = decodeBase64Image(props.src.picture.base64);


    return (
        <div>
            {console.log(props)}
            <h2>Platform: {extractDomain(props.src.permalink)}</h2>
            <p>Page Name: {extractDomain(props.src.permalink)}</p>
            <p>Caption: {props.src.caption}</p>
            <p>Engagement: {props.src.engagement}</p>
            <img style={{ width: "300px", height: "350px" }} src={imageUrl} alt="Base64 Image" />
        </div>
    );
};

export default ImageDisplay;