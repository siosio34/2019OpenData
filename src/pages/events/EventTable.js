// @format

import React from 'react';
import { Divider, Table } from 'antd';

const EventTable = props => {
  const { onEdit, onDelete } = props;
  const columns = [
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
      title: '위치',
      dataIndex: 'location',
    },
    {
      title: '작업',
      render: (_, record) => (
        <span>
          <a onClick={() => onEdit(record)}>수정</a>
          <Divider type="vertical" />
          <a onClick={() => onDelete(record)}>삭제</a>
        </span>
      ),
    },
  ];
  const expandedRowRender = record => (
    <p>{record.description || 'No description'}</p>
  );

  return (
    <Table
      dataSource={props.events}
      columns={columns}
      expandedRowRender={expandedRowRender}
    />
  );
};

export default EventTable;
