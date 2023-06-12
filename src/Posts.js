import React, { useEffect, useState } from 'react';
import Image64 from "./image64";
import VideoComponent from './video';

const Posts = ({startDate,endDate,brands}) => {
    const [data, setData] = useState(null);
    const apiUrl = 'http://localhost:3001/posts';

    useEffect(() => {
        const fetchData = async () => {
           
            var startDate1 = startDate
            var endDate1 = endDate
            var selectedBrand1 = brands

            try {
                const requestBody = {
                    ...selectedBrand1,
                    startDate: startDate1,
                    endDate: endDate1,
                };
                console.log(requestBody)

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                const responseData = await response.json();
                setData(responseData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [startDate,endDate,brands]);

    return (
        <div>
            {data && (
                <div>
                    <h1>Total Posts: {data.total}</h1>
                    <ul>
                        {data.posts.map((post, index) => (
                            <li key={index} style={{display:"inline-block"}}>
                                {post.picture.base64 ?
                                    <div >
                                        {console.log(post)}
                                        <Image64 src={post} alt="Post" />
                                    </div>
                                    :
                                    <div >
                                        <VideoComponent videoUrl={post} />
                                    </div>
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Posts;
