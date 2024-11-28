import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const PlotComponent = ({ dataset }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/data/timeSeries`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();

                console.log('Fetched Data:', result); // Debugging to check the JSON response

                // Validate and parse the data
                if (result.timeSeries && Array.isArray(result.timeSeries)) {
                    // Convert to Date objects and format dates (e.g., "YYYY-MM-DD")
                    const formattedDates = result.timeSeries.map((entry) =>
                        new Date(entry).toISOString().split('T')[0]
                    );

                    // Aggregate counts by date
                    const dateCounts = formattedDates.reduce((acc, date) => {
                        acc[date] = (acc[date] || 0) + 1;
                        return acc;
                    }, {});

                    const xData = Object.keys(dateCounts); // Unique dates
                    const yData = Object.values(dateCounts); // Corresponding counts

                    setData([
                        {
                            x: xData,
                            y: yData,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'blue' },
                        },
                    ]);
                } else {
                    console.error('timeSeries is not an array or is missing in the response.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dataset]);

    const layout = {
        title: `${dataset} Earthquake Tweets`,
        xaxis: { title: 'Date' },
        yaxis: { title: 'Count' },
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {data.length > 0 ? <Plot data={data} layout={layout} /> : <p>No data available.</p>}
        </div>
    );
};

export default PlotComponent;
