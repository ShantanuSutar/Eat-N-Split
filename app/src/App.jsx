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

  const [selectedFriend, setSelectedFriend] = useState(null); // State to store the selected friend

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  } // Function to add a new friend to the friends array

  function handleShowAddFriend() {
    setShowAddFriend(!showAddFriend);
  } // Function to toggle the display of the form to add a friend

  function handleSelection(friend) {
    // setSelectedFriend(friend);

    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend)); // Toggle the selected friend state between null and the friend object
    setShowAddFriend(false); // Hide the form to add a friend
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    // Update the balance of the selected friend and the user based on the bill value

    setSelectedFriend(null); // Reset the selected friend state
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
      {
        // Display the form to split the bill if a friend is selected
      }
    </div>
  );
} // Main component

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  ); // Map through the friends array and return a Friend component for each friend
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id; // Check if the friend is selected or not by comparing the friend id with the selected friend id

  return (
    <li className={isSelected ? "selected" : ""}>
      {
        // Add the selected class to the list item if the friend is selected
      }
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
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>{" "}
      {/* Display the button to select the friend 
      and display the transactions if the friend is not selected, 
      otherwise display the button to close the friend information
      */}
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

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState(""); // State to store the bill value
  const [paidByUser, setPaidByUser] = useState(""); // State to store the amount paid by the user
  const paidByFriend = bill && bill - paidByUser; // Calculate the amount paid by the friend
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  // State to store who is paying the bill

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  } //calculate the amount to be added to the friend balance based on who is paying the bill

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      {
        // Convert the bill value to a number
      }

      <label>🧑 Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />
      {
        // Calculate the amount paid by the user and make sure it is not greater than the bill value
      }

      <label>👨🏻‍🤝‍👨🏻 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />
      {
        // Display the amount paid by the friend. This input is disabled and the value is calculated based on the bill value and the amount paid by the user
      }

      <label>🤑 Who's paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        {
          // Select the person who is paying the bill
        }
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
} // Form to split a bill with a friend

export default App;
