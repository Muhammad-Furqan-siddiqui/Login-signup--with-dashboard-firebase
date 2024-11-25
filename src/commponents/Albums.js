import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import app from "../config/firebase";

const Albums = () => {
  const [Albums, setAlbums] = useState([]); // Changed to 'Albums'
  const [newAlbums, setNewAlbums] = useState(""); // Changed to 'newAlbums'
  const db = getFirestore(app);

  // Fetch Albums
  useEffect(() => {
    const fetchAlbums = async () => {
      const querySnapshot = await getDocs(collection(db, "Albums")); // Changed to 'Albums' collection
      setAlbums(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))); // Changed to 'setAlbums'
    };

    fetchAlbums();
  }, []);

  // Add Albums
  const addAlbums = async () => { // Changed to 'addAlbums'
    if (newAlbums.trim() !== "") {
      const docRef = await addDoc(collection(db, "Albums"), { title: newAlbums }); // Changed field to 'title'
      setAlbums([...Albums, { id: docRef.id, title: newAlbums }]); // Changed to 'setAlbums'
      setNewAlbums(""); // Changed to 'setNewAlbums'
    }
  };

  // Delete Albums
  const deleteAlbums = async (id) => { // Changed to 'deleteAlbums'
    await deleteDoc(doc(db, "Albums", id)); // Changed to 'Albums' collection
    setAlbums(Albums.filter((Albums) => Albums.id !== id)); // Changed to 'setAlbums'
  };

  // Edit Albums
  const editAlbums = async (id, newTitle) => { // Changed to 'editAlbums'
    await updateDoc(doc(db, "Albums", id), { title: newTitle }); // Changed field to 'title'
    setAlbums(Albums.map((Albums) => (Albums.id === id ? { ...Albums, title: newTitle } : Albums))); // Changed to 'setAlbums'
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Albums</h2> {/* Changed to 'Albums' */}
      <div className="mb-4">
        <input
          type="text"
          value={newAlbums} // Changed to 'newAlbums'
          onChange={(e) => setNewAlbums(e.target.value)} // Changed to 'setNewAlbums'
          placeholder="Add new Albums" // Changed placeholder
          className="border p-2 rounded"
        />
        <button onClick={addAlbums} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <ul>
        {Albums.map((Albums) => ( // Changed to 'Albums'
          <li key={Albums.id} className="mb-2 flex justify-between items-center">
            <span>{Albums.title}</span> {/* Changed to 'Albums.title' */}
            <div>
              <button
                onClick={() => {
                  const newTitle = prompt("Edit title:", Albums.title); // Changed to 'Albums.title'
                  if (newTitle) editAlbums(Albums.id, newTitle); // Changed to 'editAlbums'
                }}
                className="mr-2 bg-yellow-500 text-white px-4 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteAlbums(Albums.id)} // Changed to 'deleteAlbums'
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

export default Albums;
