import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import app from "../config/firebase";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const db = getFirestore(app);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      setUsers(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchUsers();
  }, []);

  // Add user
  const addUser = async () => {
    if (newUser.trim() !== "") {
      const docRef = await addDoc(collection(db, "users"), { name: newUser });
      setUsers([...users, { id: docRef.id, name: newUser }]);
      setNewUser("");
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    setUsers(users.filter((user) => user.id !== id));
  };

  // Edit user
  const editUser = async (id, newName) => {
    await updateDoc(doc(db, "users", id), { name: newName });
    setUsers(users.map((user) => (user.id === id ? { ...user, name: newName } : user)));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          placeholder="Add new user"
          className="border p-2 rounded"
        />
        <button onClick={addUser} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-2 flex justify-between items-center">
            <span>{user.name}</span>
            <div>
              <button
                onClick={() => {
                  const newName = prompt("Edit name:", user.name);
                  if (newName) editUser(user.id, newName);
                }}
                className="mr-2 bg-yellow-500 text-white px-4 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteUser(user.id)}
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

export default Users;
