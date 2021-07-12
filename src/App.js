import React from "react";
import Axios from "axios";

class App extends React.Component {
  state = {
    edit: false,
    dataApi: [],
    newDataApi: {
      id: 0,
      title: "",
      author: "",
    },
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

  handleChange = (e) => {
    let newData = { ...this.state.newDataApi };
    if (this.state.newDataApi.edit === false) {
      newData["id"] = new Date().getTime();
    }
    newData[e.target.name] = e.target.value;
    this.setState({ newDataApi: newData });
  };

  clearData = () => {
    let newData = { ...this.state.newDataApi };
    newData["id"] = 0;
    newData["title"] = "";
    newData["author"] = "";
    this.setState({ newDataApi: newData });
    this.setState({ edit: false });
  };

  handleAddData = () => {
    Axios.post(`http://localhost:2000/posts/`, this.state.newDataApi)
      .then((res) => {
        alert("Add Data Berhasil");
        this.clearData();
        this.renderDataApi();
      })
      .catch((err) => {
        alert("Terjadi masalah di server");
      });
  };

  handleMenuEdit = (e) => {
    this.setState({ edit: true });
    Axios.get(`http://localhost:2000/posts/${e.target.value}`).then((res) => {
      this.setState({ newDataApi: res.data });
    });
  };

  handleEditData = () => {
    Axios.put(
      `http://localhost:2000/posts/${this.state.newDataApi.id}`,
      this.state.newDataApi
    )
      .then((res) => {
        alert("Edit Data Berhasil");
        this.renderDataApi();
        this.clearData();
      })
      .catch((err) => {
        alert("Terjadi masalah di server");
      });
  };

  componentDidMount() {
    this.renderDataApi();
  }

  render() {
    return (
      <div>
        <h1>Hello API</h1>
        {!this.state.edit ? (
          <>
            <strong>Tambah Data</strong> <br />
            <input
              type="text"
              name="title"
              value={this.state.newDataApi.title}
              placeholder="Input Title"
              onChange={this.handleChange}
            />
            <br />
            <input
              type="text"
              name="author"
              value={this.state.newDataApi.author}
              placeholder="Input Author"
              onChange={this.handleChange}
            />
            <br />
            <button onClick={this.handleAddData}>Add Data</button>
          </>
        ) : (
          <>
            <strong>Edit Data</strong> <br />
            <input
              type="text"
              name="title"
              value={this.state.newDataApi.title}
              placeholder="Input Title"
              onChange={this.handleChange}
            />
            <br />
            <input
              type="text"
              name="author"
              value={this.state.newDataApi.author}
              placeholder="Input Author"
              onChange={this.handleChange}
            />
            <br />
            <button onClick={this.handleEditData}>Save Data</button>
          </>
        )}
        {this.state.dataApi.map((data, index) => {
          return (
            <div key={index}>
              <p>{data.id}</p>
              <p>{data.title}</p>
              <p>{data.author}</p>
              <button value={data.id} onClick={this.handleDelete}>
                Delete
              </button>
              <button value={data.id} onClick={this.handleMenuEdit}>
                Edit
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
