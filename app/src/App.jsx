import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
]; // Array of friends information to be displayed

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false); // State to control the display of the form to add a friend

  const [friends, setFriends] = useState(initialFriends);

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  } // Function to add a new friend to the friends array

  function handleShowAddFriend() {
    setShowAddFriend(!showAddFriend);
  } // Function to toggle the display of the form to add a friend

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      <FormSplitBill></FormSplitBill>
    </div>
  );
} // Main component

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  ); // Map through the friends array and return a Friend component for each friend
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}₹
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}₹
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button>Select</Button>
    </li>
  );
  // Display the friend information in a list item and add a button to select the friend and display the transactions
  //abs is used to convert negative balance to positive
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  // Function to handle the form submission

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID(); // Generate a random id for the new friend
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    }; // Create a new friend object with the form data

    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48"); // Reset the form
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>📸 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
} // Form to add a new friend to the list

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with x</h2>

      <label>💰 Bill Value</label>
      <input type="text" />

      <label>🧑 Your expense</label>
      <input type="text" />

      <label>👨🏻‍🤝‍👨🏻 X's expense</label>
      <input type="text" disabled />

      <label>🤑 Who's paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
    </form>
  );
} // Form to split a bill with a friend

export default App;
