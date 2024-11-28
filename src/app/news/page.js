"use client";
import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';

export default function News() {
  const { data: session } = useSession();
  // console.log("Session in News page:", session);
  const userEmail = session?.user?.email;
  const [savedArticles, setSavedArticles] = useState([]);
  const [newsArticles, setNewsArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    title: "",
    summary: "",
    url: "",
    imglink: "",
  });
  const [showAddArticleForm, setShowAddArticleForm] = useState(false);
  const [showDeleteButton, setshowDeleteButton] = useState(false);
  useEffect(() => {
    const fetchArticles = async () => {
      // Fetch all news articles
      const response = await fetch('/api/news');
      const articles = await response.json();
      setNewsArticles(articles);
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchUserAndArticles = async () => {
      if (!userEmail) return;  // Exit if no user email is found

      // Fetch the user by their email
      const response = await fetch(`/api/users?email=${userEmail}`);
      const userData = await response.json();
      console.log("User data in News page:", userData);
      console.log(userData.data.admin);
      if (userData.data.admin === true) {  // Check if the user is an admin
        setShowAddArticleForm(true); // Set the state to true to show the form
        setshowDeleteButton(true); // Set the state to true to show the form
      }
      // showAddArticleForm(userData.data.admin);
      console.log("Show Add Article Form:", showAddArticleForm);
      // console.log("Saved Articles in News page:", savedArticles);
      if (userData.data) {
        const userBookmarks = userData.data.bookmarks; // Array of bookmarked article IDs

        // Fetch news articles from the database
        const articlesResponse = await fetch('/api/news');
        const allArticles = await articlesResponse.json();

        // Filter and set the saved articles based on the user's bookmarks
        const userSavedArticles = allArticles.filter((article) =>
          userBookmarks.includes(article.id)
        );

        setSavedArticles(userSavedArticles);
      } else {
        setSavedArticles([]);
      }
    };

    fetchUserAndArticles();
  }, [userEmail]); // Adding userEmail as a dependency

  const handleInputChange = (e) => {
    setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
  };

  const addArticle = async () => {
    const response = await fetch('/api/news', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newArticle),
    });

    if (response.ok) {
      const article = await response.json();
      setNewsArticles([...newsArticles, article]);
      setNewArticle({ title: "", summary: "", url: "", imglink: "" });
    }
  };

  const deleteArticle = async (id) => {
    const response = await fetch('/api/news', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setNewsArticles(newsArticles.filter((article) => article.id !== id));
    }
  };

  const toggleBookmark = async (article) => {
    if (!userEmail) return;  // Make sure the user is logged in

    const isArticleSaved = savedArticles.some((saved) => saved.url === article.url);

    const response = await fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmail,
        bookmark: article.id,
      }),
    });

    if (response.ok) {
      if (isArticleSaved) {
        setSavedArticles(savedArticles.filter((saved) => saved.url !== article.url));
      } else {
        setSavedArticles([...savedArticles, article]);
      }
    }
  };

  console.log('savedArticles:', savedArticles, 'Type:', typeof savedArticles);
  const isArticleSaved = (article) =>
    Array.isArray(savedArticles) && savedArticles.some((saved) => saved.url === article.url);

  const NewsCard = ({ article, isSaved }) => (
    <div className="bg-white rounded-lg shadow-black hover:shadow-xl transition duration-200 relative border">
      <img src={article.imglink} alt="Article Image" className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-black">{article.title}</h2>
        <p className="text-gray-600 mb-4">{article.summary}</p>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">Read more</a>
        <button onClick={() => toggleBookmark(article)} className="absolute top-2 right-2 bg-transparent p-1 rounded-lg">
          {isSaved ? (
            <img src="/filled_bookmark.svg" width="30px" alt="Filled Bookmark" className="bg-white rounded-lg p-1" />
          ) : (
            <img src="/line_bookmark.svg" width="30px" alt="Line Bookmark" className="bg-white rounded-lg p-1" />
          )}
        </button>
        {/* Show the delete button only for admin users */}
        {showDeleteButton && (
        <button onClick={() => deleteArticle(article.id)} className="bg-red-600 text-white p-2 rounded mt-2 mx-4">Delete</button>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-[url('https://png.pngtree.com/background/20230317/original/pngtree-ruins-after-a-big-earthquake-for-newspaper-article-photojournalism-background-backdrop-picture-image_2149933.jpg')]  text-white  bg-cover bg-center min-h-screen backdrop-blur-3xl bg-opacity-50 container flex-col mx-auto p-4 ">
 
      <header className="mb-8">
      <img 
                src="https://media.istockphoto.com/id/929047972/vector/world-news-flat-vector-icon-news-symbol-logo-illustration-business-concept-simple-flat.jpg?s=612x612&w=0&k=20&c=5jpcJ7xejjFa2qKCzeOXKJGeUl7KZi9qoojZj1Kq_po="
                alt="News logo"
                className="inline-block h-12 w-12 ml-2 mr-1 rounded-full"
              />
        <h1 className="text-4xl font-bold font-sans">News</h1>
      </header>

      {/* Show Add Article button only for admin users */}
      {/* {showAddArticleForm && (
        <section className="mb-4"> 
          <button
            onClick={() => setShowAddArticleForm(!showAddArticleForm)}
            className="bg-blue-600 text-white p-2 rounded">
            {showAddArticleForm ? "Cancel" : "Add News Article"}
          </button>
        </section>
      )} */}

      {/* Show the Add News Article form if the button is clicked */}
      {showAddArticleForm && showAddArticleForm && (
        <section className="mb-4 bg-neutral-200 py-4 px-8 rounded-lg ">
          <h2 className="text-2xl font-bold text-black">Add News Article</h2>
          <input
            type="text"
            name="title"
            value={newArticle.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="border text-black p-2 mb-2 w-full rounded-lg "
          />
          <input
            type="text"
            name="summary"
            value={newArticle.summary}
            onChange={handleInputChange}
            placeholder="Summary"
            className="border text-black p-2 mb-2 w-full rounded-lg "
          />
          <input
            type="text"
            name="url"
            value={newArticle.url}
            onChange={handleInputChange}
            placeholder="URL"
            className="border text-black p-2 mb-2 w-full rounded-lg "
          />
          <input
            type="text"
            name="imglink"
            value={newArticle.imglink}
            onChange={handleInputChange}
            placeholder="Image Link"
            className="border text-black p-2 mb-2 w-full rounded-lg "
          />
          <button onClick={addArticle} className="bg-blue-600 text-white p-2 rounded">Add Article</button>
        </section>
      )}
      <section>
      <div className="border-red h-0 text-black m-2 border border-white"></div>
        <h2 className="text-2xl font-bold text-white">News Articles</h2>
        <div className="border-red h-0 text-black m-2 border border-white"></div>
        {newsArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 px-4">
            {newsArticles.map((article) => (
              <NewsCard key={article.id} article={article} isSaved={isArticleSaved(article)} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No articles available.</p>
        )}
      </section>

      <section>
      <div className="border-red h-0 text-black m-2 border border-white"></div>
        <h2 className="text-2xl font-bold text-white">Saved Articles</h2>
        <div className="border-red h-0 text-white m-2 border border-white"></div>
        {savedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 px-4">
            {savedArticles.map((article, index) => (
              <NewsCard key={index} article={article} isSaved={true} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You haven't bookmarked any articles yet.</p>
        )}
      </section>
    </div>
  );
}
