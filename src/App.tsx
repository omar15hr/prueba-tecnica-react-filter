import { useEffect, useState } from "react";
import { type User } from "./interfaces/types.d";
import UsersList from "./components/UsersList";

import "./App.css";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);

  const toogleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    setSortByCountry((prevState) => !prevState);
  };

  const handleDeleteUser = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  };

  const sortedUsers = sortByCountry
    ? users.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country);
      })
    : users;

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((response) => response.json())
      .then((res) => {
        setUsers(res.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <h1>Prueba técnica + React + TS</h1>
      <header>
        <button onClick={toogleColors} style={{ marginBottom: "20px" }}>
          Colorear filas
        </button>
        <button
          onClick={toggleSortByCountry}
          style={{ marginBottom: "20px", marginLeft: "20px" }}
        >
          {sortByCountry ? "No ordenar por país" : "Ordenar por país"}
        </button>
      </header>
      <main>
        <UsersList
          showColors={showColors}
          users={sortedUsers}
          deleteUser={handleDeleteUser}
        />
      </main>
    </div>
  );
}

export default App;
