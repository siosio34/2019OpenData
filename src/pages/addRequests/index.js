// @format

import React from 'react';
import {
  Input,
  Popconfirm,
  Button,
  Table,
  Descriptions,
  Select,
  AutoComplete,
} from 'antd';
import axios from 'axios';

class AddEventPage extends React.Component {
  state = {
    eventItems: [],
  };

  handleAcceptButton = id => e => {
    axios
      .patch(`https://code.hanjun.kim:8000/addRequests/${id}`, {
        accepted: true,
      })
      .then(() => {
        axios
          .get('https://code.hanjun.kim:8000/addRequests?accepted=false')
          .then(response => response.data)
          .then(data => {
            this.setState({ eventItems: data });
          })
          .catch(response => {
            console.log(response);
          });
      });
  };

  columns = [
    {
      title: '카테고리',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: '혜택명',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '승인',
      key: 'action',
      render: record => (
        <Popconfirm
          title="정말로 승인하시겠습니까?"
          onConfirm={this.handleAcceptButton(record.id)}
          okText="확인"
          cancelText="취소"
        >
          <Button type="primary">승인하기</Button>
        </Popconfirm>
      ),
    },
  ];

  // {
  //   "id": 1,
  //   "name": "Name",
  //   "category": "Category",
  //   "requirements": "Requirements",
  //   "begin_date": "Begin Date",
  //   "end_date": "End Date",
  //   "reference": "Reference",
  //   "image": "Image",
  //   "link": "Link",
  //   "location": "Location",
  //   "benefit": "Benefit",
  //   "target": "Target",
  //   "tel": "Tel",
  //   "note": "Note",
  //   "description": "Description",
  //   "accepted": false
  // }

  // <Table dataSource={this.state.eventItems} coulmns={this.columns} />;

  async componentDidMount() {
    const items = await axios.get(
      'https://code.hanjun.kim:8000/addRequests?accepted=false'
    );
    const { data } = items;

    this.setState({
      eventItems: data,
    });
  }

  render() {
    const { eventItems } = this.state;
    return (
      <Table
        expandedRowRender={record => (
          <Descriptions bordered border>
            <Descriptions.Item label="이름">{record.name} </Descriptions.Item>
            <Descriptions.Item label="카테고리">
              {record.category}
            </Descriptions.Item>
            <Descriptions.Item label="혜택내역">
              {record.benefit}
            </Descriptions.Item>
            <Descriptions.Item label="대상">{record.target} </Descriptions.Item>
            <Descriptions.Item label="링크">{record.link} </Descriptions.Item>
            <Descriptions.Item label="전화번호">{record.tel}</Descriptions.Item>
            <Descriptions.Item label="승인상태">
              {record.accepted}
            </Descriptions.Item>
            <Descriptions.Item label="상세내역">
              {record.description}
            </Descriptions.Item>
          </Descriptions>
        )}
        dataSource={eventItems}
        columns={this.columns}
      />
    );
  }
}

export default AddEventPage;
