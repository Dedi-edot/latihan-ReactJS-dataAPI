import React from "react";
import Axios from "axios";

class App extends React.Component {
  state = {
    dataApi: [],
  };

  renderDataApi = () => {
    Axios.get(`http://localhost:2000/posts`).then((res) => {
      this.setState({ dataApi: res.data });
    });
  };

  handleDelete = (e) => {
    fetch(`http://localhost:2000/posts/${e.target.value}`, {
      method: "DELETE",
    }).then((res) => {
      this.renderDataApi();
    });
  };

  componentDidMount() {
    this.renderDataApi();
  }

  render() {
    return (
      <div>
        <h1>Hello API</h1>
        {this.state.dataApi.map((data, index) => {
          return (
            <div key={index}>
              <p>{data.id}</p>
              <p>{data.title}</p>
              <p>{data.author}</p>
              <button value={data.id} onClick={this.handleDelete}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
