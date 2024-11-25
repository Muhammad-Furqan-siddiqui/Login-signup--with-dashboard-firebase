import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import app from "../config/firebase";

const Comments = () => {
  const [Comments, setComments] = useState([]); // Changed to 'Comments'
  const [newComments, setNewComments] = useState(""); // Changed to 'newComments'
  const db = getFirestore(app);

  // Fetch Comments
  useEffect(() => {
    const fetchComments = async () => {
      const querySnapshot = await getDocs(collection(db, "Comments")); // Changed to 'Comments' collection
      setComments(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))); // Changed to 'setComments'
    };

    fetchComments();
  }, []);

  // Add Comments
  const addComments = async () => { // Changed to 'addComments'
    if (newComments.trim() !== "") {
      const docRef = await addDoc(collection(db, "Comments"), { title: newComments }); // Changed field to 'title'
      setComments([...Comments, { id: docRef.id, title: newComments }]); // Changed to 'setComments'
      setNewComments(""); // Changed to 'setNewComments'
    }
  };

  // Delete Comments
  const deleteComments = async (id) => { // Changed to 'deleteComments'
    await deleteDoc(doc(db, "Comments", id)); // Changed to 'Comments' collection
    setComments(Comments.filter((Comments) => Comments.id !== id)); // Changed to 'setComments'
  };

  // Edit Comments
  const editComments = async (id, newTitle) => { // Changed to 'editComments'
    await updateDoc(doc(db, "Comments", id), { title: newTitle }); // Changed field to 'title'
    setComments(Comments.map((Comments) => (Comments.id === id ? { ...Comments, title: newTitle } : Comments))); // Changed to 'setComments'
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Comments</h2> {/* Changed to 'Comments' */}
      <div className="mb-4">
        <input
          type="text"
          value={newComments} // Changed to 'newComments'
          onChange={(e) => setNewComments(e.target.value)} // Changed to 'setNewComments'
          placeholder="Add new Comments" // Changed placeholder
          className="border p-2 rounded"
        />
        <button onClick={addComments} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <ul>
        {Comments.map((Comments) => ( // Changed to 'Comments'
          <li key={Comments.id} className="mb-2 flex justify-between items-center">
            <span>{Comments.title}</span> {/* Changed to 'Comments.title' */}
            <div>
              <button
                onClick={() => {
                  const newTitle = prompt("Edit title:", Comments.title); // Changed to 'Comments.title'
                  if (newTitle) editComments(Comments.id, newTitle); // Changed to 'editComments'
                }}
                className="mr-2 bg-yellow-500 text-white px-4 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteComments(Comments.id)} // Changed to 'deleteComments'
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

export default Comments;
