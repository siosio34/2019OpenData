import React from "react";
import { Input, Button, Table, Select, Descriptions, AutoComplete } from "antd";
import axios from "axios";

class AddEventPage extends React.Component {
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
      title: "승인",
      key: "action",
      render: record => <Button>승인하기</Button>
    }
  ];

  // <Table dataSource={this.state.eventItems} coulmns={this.columns} />;

  async componentDidMount() {
    const items = await axios.get(
      "https://code.hanjun.kim:8000/requests?accepted=false"
    );
    const { data } = items;

    this.setState({
      eventItems: data
    });
  }

  render() {
    const { eventItems } = this.state;
    return <Table dataSource={eventItems} columns={this.columns} />;
  }
}

export default AddEventPage;
