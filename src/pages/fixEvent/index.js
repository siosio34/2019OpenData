// @format

import React from 'react';
import { Popconfirm, Button, Card, Divider, Table, Descriptions } from 'antd';
import axios from 'axios';

class FixEventPage extends React.Component {
  state = {
    fixItems: [],
  };

  handleAcceptButton = id => e => {
    axios
      .patch(
        `https://code.hanjun.kim:8000/updateRequests/${id}?_expand=event`,
        {
          accepted: true,
        }
      )
      .then(() => {
        axios
          .get('https://code.hanjun.kim:8000/updateRequests?accepted=false')
          .then(response => response.data)
          .then(data => {
            this.setState({ fixItems: data });
          })
          .catch(response => {
            console.log(response);
          });
      });
  };

  columns = [
    {
      title: '순번',
      dataIndex: 'id',
    },
    {
      title: '혜택명',
      dataIndex: 'event.name',
    },
    {
      title: '승인',
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
      'https://code.hanjun.kim:8000/updateRequests?accepted=false&_expand=event'
    );
    const { data } = items;

    this.setState({
      fixItems: data.map(item => Object.assign(item, { key: item.id })),
    });
  }

  render() {
    const { fixItems } = this.state;
    return (
      <Table
        expandedRowRender={record => (
          <>
            <Descriptions bordered>
              <Descriptions.Item label="카테고리">
                {record.event.category}
              </Descriptions.Item>
              <Descriptions.Item label="혜택">
                {record.event.benefit}
              </Descriptions.Item>
              <Descriptions.Item label="위치">
                {record.event.location}
              </Descriptions.Item>
              <Descriptions.Item label="대상">
                {record.event.target}
              </Descriptions.Item>
              <Descriptions.Item label="조건">
                {record.event.requirements}
              </Descriptions.Item>
              <Descriptions.Item label="시작일">
                {record.event.beginDate}
              </Descriptions.Item>
              <Descriptions.Item label="종료일">
                {record.event.endDate}
              </Descriptions.Item>
              <Descriptions.Item label="링크">
                {record.event.link ? (
                  <a target="_blank" href={record.event.link}>
                    {record.event.link}
                  </a>
                ) : (
                  ''
                )}
              </Descriptions.Item>
              <Descriptions.Item label="이미지">
                {record.event.image ? (
                  <a target="_blank" href={record.event.image}>
                    {record.event.image}
                  </a>
                ) : (
                  ''
                )}
              </Descriptions.Item>
              <Descriptions.Item label="전화번호">
                {record.event.tel}
              </Descriptions.Item>
              <Descriptions.Item label="비고">
                {record.event.note}
              </Descriptions.Item>
              <Descriptions.Item label="상세">
                {record.event.description}
              </Descriptions.Item>
            </Descriptions>
            <Divider>수정 요청 사항</Divider>
            <Card>
              <p>{record.content}</p>
            </Card>
          </>
        )}
        dataSource={fixItems}
        columns={this.columns}
      />
    );
  }
}

export default FixEventPage;
