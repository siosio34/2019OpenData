// @format

import React from 'react';
import axios from 'axios';
import { Button, Icon } from 'antd';

import EventTable from './EventTable';
import AddEventModal from './AddEventModal';

class EventsPage extends React.Component {
  state = {
    events: [],
    addEventModalVisible: false,
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
      // TODO: post to api server
      form.resetFields();
      this.setState({ addEventModalVisible: false });
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

  async componentDidMount() {
    const { data } = await axios.get(
      'https://code.hanjun.kim:8000/events?_sort=id'
    );

    this.setState({
      events: data.map(item => Object.assign(item, { key: item.id })),
    });
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
        <EventTable events={events} />
      </React.Fragment>
    );
  }
}

export default EventsPage;
