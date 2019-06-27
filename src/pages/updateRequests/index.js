// @format

import React from 'react';
import axios from 'axios';
import {
  Card,
  Descriptions,
  Divider,
  Icon,
  Switch,
  Table,
  message,
} from 'antd';

const apiServer = 'https://code.hanjun.kim:8000';

class UpdateRequestsPage extends React.Component {
  state = {
    requests: [],
  };

  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '이름',
      dataIndex: 'event.name',
    },
    {
      title: '처리 완료',
      render: record => (
        <Switch
          checkedChildren={<Icon type="check" />}
          unCheckedChildren={<Icon type="close" />}
          onChange={this.handleAcceptedChange(record)}
          checked={record.accepted}
        />
      ),
    },
  ];

  fetchRequests = () => {
    axios
      .get(`${apiServer}/updateRequests?_expand=event&_sort=id`)
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

  handleAcceptedChange = record => accepted => {
    axios
      .patch(`${apiServer}/updateRequests/${record.id}`, { accepted })
      .then(resp => {
        message.success(
          `'${record.event.name}' 혜택의 수정 요청을 처리 완료했습니다.`
        );
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
        expandedRowRender={record => (
          <React.Fragment>
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
          </React.Fragment>
        )}
        dataSource={requests}
        columns={this.columns}
      />
    );
  }
}

export default UpdateRequestsPage;
