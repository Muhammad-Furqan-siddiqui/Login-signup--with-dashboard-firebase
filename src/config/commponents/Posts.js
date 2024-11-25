import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import app from "../config/firebase";

const Posts = () => {
  const [posts, setPosts] = useState([]); // Changed to 'posts'
  const [newPost, setNewPost] = useState(""); // Changed to 'newPost'
  const db = getFirestore(app);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts")); // Changed to 'posts' collection
      setPosts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))); // Changed to 'setPosts'
    };

    fetchPosts();
  }, []);

  // Add post
  const addPost = async () => { // Changed to 'addPost'
    if (newPost.trim() !== "") {
      const docRef = await addDoc(collection(db, "posts"), { title: newPost }); // Changed field to 'title'
      setPosts([...posts, { id: docRef.id, title: newPost }]); // Changed to 'setPosts'
      setNewPost(""); // Changed to 'setNewPost'
    }
  };

  // Delete post
  const deletePost = async (id) => { // Changed to 'deletePost'
    await deleteDoc(doc(db, "posts", id)); // Changed to 'posts' collection
    setPosts(posts.filter((post) => post.id !== id)); // Changed to 'setPosts'
  };

  // Edit post
  const editPost = async (id, newTitle) => { // Changed to 'editPost'
    await updateDoc(doc(db, "posts", id), { title: newTitle }); // Changed field to 'title'
    setPosts(posts.map((post) => (post.id === id ? { ...post, title: newTitle } : post))); // Changed to 'setPosts'
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Posts</h2> {/* Changed to 'Posts' */}
      <div className="mb-4">
        <input
          type="text"
          value={newPost} // Changed to 'newPost'
          onChange={(e) => setNewPost(e.target.value)} // Changed to 'setNewPost'
          placeholder="Add new post" // Changed placeholder
          className="border p-2 rounded"
        />
        <button onClick={addPost} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <ul>
        {posts.map((post) => ( // Changed to 'posts'
          <li key={post.id} className="mb-2 flex justify-between items-center">
            <span>{post.title}</span> {/* Changed to 'post.title' */}
            <div>
              <button
                onClick={() => {
                  const newTitle = prompt("Edit title:", post.title); // Changed to 'post.title'
                  if (newTitle) editPost(post.id, newTitle); // Changed to 'editPost'
                }}
                className="mr-2 bg-yellow-500 text-white px-4 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deletePost(post.id)} // Changed to 'deletePost'
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
