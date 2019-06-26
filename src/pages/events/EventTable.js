// @format

import React from 'react';
import { Descriptions, Divider, Table } from 'antd';

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
          <a onClick={() => onEdit(record)}>수정</a>
          <Divider type="vertical" />
          <a onClick={() => onDelete(record)}>삭제</a>
        </span>
      ),
    },
  ];
  const expandedRowRender = record => (
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
      <Descriptions.Item label="상세">{record.description}</Descriptions.Item>
    </Descriptions>
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
