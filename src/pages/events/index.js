import React from 'react';
import axios from 'axios';
import { Button, Table } from 'antd';

class EventsPage extends React.Component {
  state = {
    events: [],
  };

  columns = [
    {
      title: '카테고리',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '이름',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '위치',
      dataIndex: 'location',
      key: 'location',
    },
  ];

  async componentDidMount() {
    const { data } = await axios.get('https://code.hanjun.kim:8000/events?_sort=id');

    this.setState({
      events: data,
    });
  }

  render() {
    const { events } = this.state;
    return (
      <React.Fragment>
        <Button>추가</Button>
        <Table dataSource={events} columns={this.columns} />
      </React.Fragment>
    );
  }
}

export default EventsPage;
