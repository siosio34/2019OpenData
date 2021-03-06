import React from "react";
import { Input, Button, Table, Select, Descriptions, AutoComplete } from "antd";
import axios from "axios";

class AcceptPage extends React.Component {
  state = {
    eventItems: []
  };

  columns = [
    {
      title: "category",
      dataIndex: "category",
      key: "category"
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "location",
      dataIndex: "location",
      key: "location"
    }
  ];

  // <Table dataSource={this.state.eventItems} coulmns={this.columns} />;

  async componentDidMount() {
    const items = await axios.get("https://code.hanjun.kim:8000/events");
    const { data } = items;

    this.setState({
      eventItems: data
    });

    console.log(this.state.eventItems);
  }

  render() {
    const { eventItems } = this.state;
    return <Table dataSource={eventItems} columns={this.columns} />;
  }
}

export default AcceptPage;
