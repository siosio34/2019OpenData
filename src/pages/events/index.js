// @format

import React from 'react';
import axios from 'axios';
import { Button, Icon, Modal, message } from 'antd';

import EventTable from './EventTable';
import AddEventModal from './AddEventModal';

const apiServer = 'https://code.hanjun.kim:8000';

class EventsPage extends React.Component {
  state = {
    events: [],
    addEventModalVisible: false,
  };

  fetchEvents = () => {
    axios
      .get(`${apiServer}/events?_sort=id`)
      .then(resp =>
        this.setState({
          events: resp.data.map(item => Object.assign(item, { key: item.id })),
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

  showAddEventModal = () => {
    this.setState({ addEventModalVisible: true });
  };

  handleAddEventModalSubmit = () => {
    const { form } = this.addEventFormRef.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }

      const data = Object.entries(values).reduce(
        (obj, [key, value]) => ({ ...obj, [key]: value || '' }),
        {}
      );

      axios
        .post(`${apiServer}/events`, data)
        .then(resp => resp.data)
        .then(data => {
          message.success(
            `'${data.name}' 혜택을 추가했습니다. (ID: ${data.id})`
          );

          form.resetFields();
          this.setState({ addEventModalVisible: false });
          this.fetchEvents();
        })
        .catch(this.handleError);
    });
  };

  handleAddEventModalCancel = () => {
    const { form } = this.addEventFormRef.props;
    form.resetFields();
    this.setState({ addEventModalVisible: false });
  };

  saveAddEventFormRef = formRef => {
    this.addEventFormRef = formRef;
  };

  handleEdit = record => {};

  handleDelete = record => {
    Modal.confirm({
      title: `'${record.name}' 혜택을 삭제하시겠습니까?`,
      okText: '예',
      okType: 'danger',
      cancelText: '취소',
      onOk: () => {
        return axios
          .delete(`${apiServer}/events/${record.id}`)
          .then(resp => {
            message.success(`'${record.name}' 혜택을 삭제했습니다.`);
            this.fetchEvents();
          })
          .catch(this.handleError);
      },
    });
  };

  componentDidMount() {
    this.fetchEvents();
  }

  render() {
    const { events } = this.state;

    return (
      <React.Fragment>
        <AddEventModal
          visible={this.state.addEventModalVisible}
          wrappedComponentRef={this.saveAddEventFormRef}
          onSubmit={this.handleAddEventModalSubmit}
          onCancel={this.handleAddEventModalCancel}
        />
        <Button
          type="primary"
          onClick={() => this.setState({ addEventModalVisible: true })}
          style={{ marginBottom: 12 }}
        >
          <Icon type="plus" />
          혜택 추가
        </Button>
        <EventTable
          events={events}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
        />
      </React.Fragment>
    );
  }
}

export default EventsPage;
