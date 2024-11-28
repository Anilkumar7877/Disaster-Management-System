"use client";
import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import PlotComponent from './PlotComponent';
import axios from 'axios';
const Papa = require('papaparse');

const Dashboard = () => {
    const [mapData, setMapData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("Japan"); // Default to Japan
    const [selectedDataset, setSelectedDataset] = useState("Time Series"); // Default to "timeSeries"
    const [response, setResponse] = useState("");
    const [mapContent, setMapContent] = useState("");

    // Array of countries and their datasets
    const countries = [
        { label: "Japan", dataset: "japan_predictions" },
        { label: "Haiti", dataset: "haiti_predictions" },
        { label: "Iraq-Iran", dataset: "iraq_iran_predictions" },
        { label: "Turkey", dataset: "turkey_predictions" },
        { label: "Mexico", dataset: "mexico_predictions" },
    ];

    useEffect(() => {
        const runPythonScript = async () => {
            try {
                const response = await fetch("http://localhost:5000/runPyscript");
                const result = await response.json();
                if (response.ok) {
                    console.log("Python script executed:", result.message);
                } else {
                    console.error("Error executing Python script:", result.message);
                }
            } catch (error) {
                console.error("Error making request to Flask server:", error);
            }
        };
    
        // Call the function to trigger the Python script
        runPythonScript();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:5000/shakemap_data");
            const textData = await response.text();
            const safeTextData = textData.replace(/\bNaN\b/g, "null");
            const data = JSON.parse(safeTextData);
            setMapData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Handle country selection changes
    const handleCountryChange = (e) => {
        const country = e.target.value;
        setSelectedCountry(country);

        // Find the dataset for the selected country
        const countryData = countries.find((c) => c.label === country);
        if (countryData) {
            setSelectedDataset(countryData.dataset);
        }
    };
    useEffect(() => {
        // Trigger the file upload and parsing process when the page loads
        const processCsvData = async () => {
            const filePath = '/tweets (1).csv'; // Update this with the correct path if needed
            const response = await fetch(filePath);

            if (response.ok) {
                const csvData = await response.text();
                const parsedData = parseCsv(csvData);
                console.log("Tweets: ", parsedData);
                await saveTweetsToDatabase(parsedData);
            } else {
                console.error('Failed to fetch CSV data');
            }
        };

        // Trigger the function
        processCsvData();

    }, []);

    const parseCsv = (csvData) => {
        // Parse the CSV with PapaParse (automatic handling of commas and quotes)
        const result = Papa.parse(csvData, {
            header: true, // use the first row as headers
            skipEmptyLines: true, // skip any empty lines
            dynamicTyping: true, // automatically type data when possible
        });

        // Check for parsing errors
        if (result.errors.length > 0) {
            console.error("Parsing errors:", result.errors);
            return [];
        }

        return result.data;
    };

    const cleanTweets = tweets => {
        return tweets.filter(tweet => {
            // Ensure tweet has all required fields
            return tweet.handle && tweet.timestamp && tweet.tweet && tweet.username;
        }).map(tweet => {
            // Clean any escaped characters if needed (e.g., removing backslashes)
            tweet.tweet = tweet.tweet.replace(/\\"/g, '"');
            return tweet;
        });
    };

    const saveTweetsToDatabase = async (tweets) => {
        try {
            const cleanData = cleanTweets(tweets); // Clean and filter the tweets
            // Assuming cleanData is an array of tweet objects
            console.log("cleaned data is ", cleanData);
            for (const tweet of cleanData) {
                console.log("each tweet is ", tweet);
                // Ensure each object contains the required fields
                console.log("tweet=", tweet.tweet, "username=", tweet.username, "timestamp=", tweet.timestamp);
                if (tweet.tweet && tweet.username && tweet.timestamp) {
                    const response = await axios.post('/api/saveTweets', {
                        tweetText: tweet.tweet,  // Mapping 'tweet' to 'tweetText'
                        userId: tweet.username,  // Mapping 'username' to 'userId'
                        createdAt: tweet.timestamp,  // Mapping 'timestamp' to 'createdAt'
                    });
                    console.log("Tweet response:", response.data);
                } else {
                    console.error("Missing required fields in tweet data:", tweet);
                }
            }
            console.log("data sending", { tweetText, userId, createdAt });
            if (response.status === 200) {
                console.log('Tweets saved successfully');
            } else {
                throw new Error('Failed to save tweets to database');
            }
        } catch (error) {
            console.error('Error saving tweets:', error);
        }
    };

    // // Process the CSV file to load the time series data
    // const fetchAndProcessTimeSeries = async () => {
    //     try {
    //         const response = await axios.get('/dashboard/timeSeries.csv'); // Adjust the path if needed
    //         const csvData = response.data;

    //         // Parse CSV data
    //         const result = Papa.parse(csvData, {
    //             header: true,
    //             skipEmptyLines: true,
    //             dynamicTyping: true,
    //         });

    //         if (result.errors.length > 0) {
    //             console.error("Parsing errors:", result.errors);
    //         } else {
    //             console.log("Time Series Data:", result.data);
    //             // You can pass `result.data` to your PlotComponent or state
    //         }
    //     } catch (error) {
    //         console.error("Error fetching time series data:", error);
    //     }
    // };

    // // Fetch time series data on component mount
    // useEffect(() => {
    //     fetchAndProcessTimeSeries();
    // }, []);
    
    // Render the component
    return (
        <div className="bg-[url('https://bs-uploads.toptal.io/blackfish-uploads/components/open_graph_image/8957367/og_image/optimized/0823-DashboardDesign-Dan-Social-e319a5a8a7ceb75b9e5010740700d409.png')] bg-cover bg-center min-h-screen backdrop-blur-3xl">
            <div className='overlay blur-lg'></div>
            <div className="text-white flex flex-col justify-center items-center z-50 relative top-1/4">
                <div className="">
                    <h1 className="text-2xl font-bold my-8">SEVERITY MAP</h1>
                    <div className="w-screen">
                        <MapComponent data={mapData} />
                    </div>
                </div>

                {/* Adding spacing using margin instead of multiple <br /> tags */}
                <div className="my-8"></div>

                <div>
                    <h1 className="text-2xl font-bold my-8">TIME SERIES GRAPH</h1>
                    <div className=" mb-8">
                        <PlotComponent dataset={selectedDataset} />
                    </div>
                </div>
               
            </div>
        </div>
    );
};

export default Dashboard;
