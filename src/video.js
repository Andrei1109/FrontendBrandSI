import React from 'react';

const extractDomain = (link) => {
    const regex = /www\.(.*?)\.com/;
    const match = link.match(regex);
    if (match && match.length > 1) {
      return match[1];
    }
    return null;
  };

const VideoComponent = (props) => {
    return (
        <div>
            {console.log(props)}
            <h2>Platform: {extractDomain(props.videoUrl.permalink)}</h2>
            <p>Page Name: {extractDomain(props.videoUrl.permalink)}</p>
            <p>Caption: {props.videoUrl.caption}</p>
            <p>Engagement: {props.videoUrl.engagement}</p>
            <video controls style={{ width: "300px", height: "350px" }}>
                <source src={props.videoUrl.picture} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoComponent;