import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import "./App.css";
import ErrorBoundry from "../components/ErrorBoundry";

function App() {
  const [robots, setRobot] = useState([]);
  const [searchField, setSearchField] = useState("");
  // const [count, setCount] = useState(0)

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        setRobot(users);
      });
      // console.log(count);
  }, []);

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const filterRobots = robots.filter((robots) => {
    return robots.name.toLowerCase().includes(searchField.toLowerCase());
  });
  if (!robots.length) {
    return <h1>Loading</h1>;
  } else {
    return (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        {/* <button onClick={() => setCount(count + 1)}>Click Me!</button> */}
        <SearchBox searchChange={onSearchChange} />
        <ErrorBoundry>
          <CardList robots={filterRobots} />
        </ErrorBoundry>
      </div>
    );
  }
}

export default App;
