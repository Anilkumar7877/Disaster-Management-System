import prisma from '@/lib/prisma';

export async function POST(req) {
    try {
      // Parse the incoming JSON data from the request
      const { tweetText, userId, createdAt } = await req.json();
      console.log("income tweets data: ", tweetText, userId, createdAt );
      // Validate input data (ensure all fields are provided)
      if (!tweetText || !userId || !createdAt) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      // Clean up the tweetText by trimming whitespace and removing unwanted characters
      const cleanedTweetText = tweetText.trim();
  
      // Check if a tweet already exists from the same user
      const existingTweet = await prisma.tweet.findFirst({
        where: {
          tweet: cleanedTweetText,  // Using cleaned tweet text to avoid mismatch due to extra spaces
          userId: userId,           // Ensure the tweet belongs to the same user
        },
      });
  
      // If the tweet already exists, don't create it again
      if (existingTweet) {
        return new Response(
          JSON.stringify({ message: 'Tweet already exists' }),
          { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
      }
  
      // Create and save the new tweet
      const newTweet = await prisma.tweet.create({
        data: {
          tweet: cleanedTweetText,
          userId: userId,
          timestamp: new Date(createdAt),
        },
      });
  
      // Respond with the created tweet data
      return new Response(JSON.stringify(newTweet), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error creating tweet:', error);
      return new Response(
        JSON.stringify({ error: 'Error creating tweet' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

export async function GET() {
    try {
        // Fetch tweets from the database and sort by the most recent
        const tweets = await prisma.tweet.findMany({
            orderBy: {
                createdAt: 'desc', // Sorting by the 'createdAt' field
            },
        });

        // Returning a success response with the retrieved tweets
        return new Response(JSON.stringify({ success: true, data: tweets }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching tweets:', error);

        // Return an error response with detailed error information
        return new Response(
            JSON.stringify({ success: false, error: 'Internal Server Error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
