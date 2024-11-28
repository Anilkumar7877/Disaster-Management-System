// import React, { useEffect, useState } from 'react';

// const GraphComponent = () => {
//     const [htmlContent, setHtmlContent] = useState('');

//     const fetchGraphHtml = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/graph/Japan_time_series.html');
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const html = await response.text();
//             setHtmlContent(html);
//         } catch (error) {
//             console.error('Error fetching HTML:', error);
//         }
//     };

//     useEffect(() => {
//         fetchGraphHtml();
//     }, []);

//     return (
//         <div>
//             <h2>Japan Earthquake Tweets Graph</h2>
//             <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
//         </div>
//     );
// };

// export default GraphComponent;

