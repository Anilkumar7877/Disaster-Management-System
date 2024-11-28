import prisma from '@/lib/prisma'; // Adjust the import path based on your project structure

// Handle GET requests to fetch news articles
export async function GET() {
  try {
    const articles = await prisma.newsArticle.findMany(); // Fetch all articles
    return new Response(JSON.stringify(articles), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching articles' }), { status: 500 });
  }
}

// Handle POST requests to create a new article
export async function POST(request) {
  const { title, summary, url, imglink } = await request.json();
  
  try {
    const newArticle = await prisma.newsArticle.create({
      data: {
        title,
        summary,
        url,
        imglink,
      },
    });
    return new Response(JSON.stringify(newArticle), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error adding article' }), { status: 500 });
  }
}

// Handle DELETE requests to delete an article
export async function DELETE(request) {
  const { id } = await request.json();
  
  try {
    await prisma.newsArticle.delete({
      where: { id },
    });
    return new Response(JSON.stringify({ message: 'Article deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error deleting article' }), { status: 500 });
  }
}
