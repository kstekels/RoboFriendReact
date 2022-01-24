import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll.js";
import "./App.css";
import ErrorBoundry from "../components/ErrorBoundry";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        this.setState({ robots: users });
      });
    // this.setState({ robots: robots });
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  };

  render() {
    const { robots, searchField } = this.state;
    const filterRobots = robots.filter((robots) => {
      return robots.name.toLowerCase().includes(searchField.toLowerCase());
    });
    if (!robots.length) {
      return <h1>Loading</h1>; // Loading Bar
    } else {
      return (
        <div className="tc">
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundry>
              <CardList robots={filterRobots} />
            </ErrorBoundry>
          </Scroll>
        </div>
      );
    }
  }
}

export default App;
