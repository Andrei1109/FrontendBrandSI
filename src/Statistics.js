import React, { useEffect, useState } from 'react';
import MultiLineChart from './MultiLineChart';
import PieChart from './pieChart';

function transformData(data) {
    const transformedData = [];

    // Iterate over the object properties
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            // Extract the date and value from each property
            const date = key;
            const value = data[key];

            // Create an object with the transformed structure
            const transformedItem = { date: formatDate(date), value };

            // Add the transformed item to the array
            transformedData.push(transformedItem);
        }
    }

    return transformedData;
}

function formatDate(dateString) {
    // Split the date string into day, month, and year
    const [day, month, year] = dateString.split('-');

    // Format the date as 'YYYY-MM-DD'
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}
function getHighestFollowers(data) {
    const followersData = {};

    // Iterate over the properties of the data object
    for (const platform in data) {
        if (data.hasOwnProperty(platform)) {
            const platformData = data[platform];

            // Filter out undefined or missing follower values
            const validFollowers = platformData
                .map(item => item.followers)
                .filter(followers => typeof followers === 'number');

            // Find the highest number of followers for the current platform
            const highestFollowers = Math.max(...validFollowers);

            // Store the highest followers in the object
            followersData[platform] = highestFollowers;
        }
    }

    return followersData;
}


const App = ({startDate,endDate,brands}) => {
    const [data, setData] = useState(null);
    const [dataPieChart, setDataPieChart] = useState(null);

    const apiUrl = 'http://localhost:3001/statistics';

    useEffect(() => {
        const fetchData = async () => {
      
            var startDate1 = startDate
            var endDate1 = endDate
            var selectedBrand1 = brands

            console.log(startDate1)
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

                var { total } = responseData;
                delete responseData.total;
                const array = Object.values(responseData);


                var obj = {};

                array.map((element1) => {
                    const keys = Object.keys(element1);
                    const firstKey = keys[0];
                    const result = Object.entries(element1[firstKey]).map(([date, data]) => ({
                        date: formatDate(date),
                        value: data.engagement,
                        followers: data.followers
                    }));

                    function formatDate(dateString) {
                        const [day, month, year] = dateString.split('-');
                        return `${year}-${month}-${day}`;
                    }
                    obj = {
                        ...obj,
                        [firstKey]: result
                    }


                })

                var FinalPieChartData = getHighestFollowers(obj)
                setDataPieChart(FinalPieChartData)


                total = transformData(total)
                obj = { ...obj, total }
                setData(obj);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [startDate,endDate,brands]);

    return (
        <div>
            {data ?
                <div>
                    <MultiLineChart data={data} />
                    <PieChart data={dataPieChart} />
                </div>
                : null}
        </div>
    );
};

export default App;