// @format

import React from 'react';
import axios from 'axios';
import { Input, Popconfirm, Button, Table, Descriptions, message } from 'antd';

const apiServer = 'https://code.hanjun.kim:8000';

class AddRequestsPage extends React.Component {
  state = {
    requests: [],
  };

  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '카테고리',
      dataIndex: 'category',
    },
    {
      title: '이름',
      dataIndex: 'name',
    },
    {
      title: '혜택',
      dataIndex: 'benefit',
    },
    {
      title: '위치',
      dataIndex: 'location',
    },
    {
      title: '작업',
      render: (_, record) => (
        <span>
          <Button type="primary" onClick={this.handleAccept(record)}>
            승인하기
          </Button>
        </span>
      ),
    },
  ];
  expandedRowRender = record => (
    <Descriptions bordered>
      <Descriptions.Item label="출처">{record.reference}</Descriptions.Item>
      <Descriptions.Item label="대상">{record.target}</Descriptions.Item>
      <Descriptions.Item label="조건">{record.requirements}</Descriptions.Item>
      <Descriptions.Item label="시작일">{record.beginDate}</Descriptions.Item>
      <Descriptions.Item label="종료일">{record.endDate}</Descriptions.Item>
      <Descriptions.Item label="링크">
        {record.link ? (
          <a target="_blank" href={record.link}>
            {record.link}
          </a>
        ) : (
          ''
        )}
      </Descriptions.Item>
      <Descriptions.Item label="이미지">
        {record.image ? (
          <a target="_blank" href={record.image}>
            {record.image}
          </a>
        ) : (
          ''
        )}
      </Descriptions.Item>
      <Descriptions.Item label="전화번호">{record.tel}</Descriptions.Item>
      <Descriptions.Item label="비고">{record.note}</Descriptions.Item>
      <Descriptions.Item label="상세">
        <pre>{record.description}</pre>
      </Descriptions.Item>
    </Descriptions>
  );

  fetchRequests = () => {
    axios
      .get(`${apiServer}/addRequests?accepted=false&_sort=id`)
      .then(resp =>
        this.setState({
          requests: resp.data.map(item =>
            Object.assign(item, { key: item.id })
          ),
        })
      )
      .catch(this.handleError);
  };

  handleError = err => {
    if (err.response) {
      message.error(`에러: ${err.response.status}`);
    } else if (err.request) {
      message.error(`에러: ${err.request}`);
    } else {
      message.error(`에러: ${err.message}`);
    }
  };

  handleAccept = record => () => {
    axios
      .patch(`${apiServer}/addRequests/${record.id}`, { accepted: true })
      .then(() => {
        const newRecord = Object.assign({}, record);
        delete newRecord.id;
        axios.post(`${apiServer}/events`, newRecord);
      })
      .then(resp => {
        message.success(`'${record.name}' 혜택 추가를 승인했습니다.`);
        this.fetchRequests();
      })
      .catch(this.handleError);
  };

  componentDidMount() {
    this.fetchRequests();
  }

  render() {
    const { requests } = this.state;
    return (
      <Table
        expandedRowRender={this.expandedRowRender}
        dataSource={requests}
        columns={this.columns}
      />
    );
  }
}

export default AddRequestsPage;
