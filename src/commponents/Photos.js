import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import app from "../config/firebase";

const Photos = () => {
  const [Photos, setPhotos] = useState([]); // Changed to 'Photos'
  const [newPhotos, setNewPhotos] = useState(""); // Changed to 'newPhotos'
  const db = getFirestore(app);

  // Fetch Photos
  useEffect(() => {
    const fetchPhotos = async () => {
      const querySnapshot = await getDocs(collection(db, "Photos")); // Changed to 'Photos' collection
      setPhotos(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))); // Changed to 'setPhotos'
    };

    fetchPhotos();
  }, []);

  // Add Photos
  const addPhotos = async () => { // Changed to 'addPhotos'
    if (newPhotos.trim() !== "") {
      const docRef = await addDoc(collection(db, "Photos"), { title: newPhotos }); // Changed field to 'title'
      setPhotos([...Photos, { id: docRef.id, title: newPhotos }]); // Changed to 'setPhotos'
      setNewPhotos(""); // Changed to 'setNewPhotos'
    }
  };

  // Delete Photos
  const deletePhotos = async (id) => { // Changed to 'deletePhotos'
    await deleteDoc(doc(db, "Photos", id)); // Changed to 'Photos' collection
    setPhotos(Photos.filter((Photos) => Photos.id !== id)); // Changed to 'setPhotos'
  };

  // Edit Photos
  const editPhotos = async (id, newTitle) => { // Changed to 'editPhotos'
    await updateDoc(doc(db, "Photos", id), { title: newTitle }); // Changed field to 'title'
    setPhotos(Photos.map((Photos) => (Photos.id === id ? { ...Photos, title: newTitle } : Photos))); // Changed to 'setPhotos'
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Photos</h2> {/* Changed to 'Photos' */}
      <div className="mb-4">
        <input
          type="text"
          value={newPhotos} // Changed to 'newPhotos'
          onChange={(e) => setNewPhotos(e.target.value)} // Changed to 'setNewPhotos'
          placeholder="Add new Photos" // Changed placeholder
          className="border p-2 rounded"
        />
        <button onClick={addPhotos} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <ul>
        {Photos.map((Photos) => ( // Changed to 'Photos'
          <li key={Photos.id} className="mb-2 flex justify-between items-center">
            <span>{Photos.title}</span> {/* Changed to 'Photos.title' */}
            <div>
              <button
                onClick={() => {
                  const newTitle = prompt("Edit title:", Photos.title); // Changed to 'Photos.title'
                  if (newTitle) editPhotos(Photos.id, newTitle); // Changed to 'editPhotos'
                }}
                className="mr-2 bg-yellow-500 text-white px-4 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deletePhotos(Photos.id)} // Changed to 'deletePhotos'
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

export default Photos;
