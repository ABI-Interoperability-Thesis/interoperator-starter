import React, { useState, useEffect } from 'react'
import { Card, Switch, Form, Input, Select, InputNumber, Divider, Typography } from 'antd'

const { Paragraph } = Typography

const MessageBrokerConfig = (props) => {
    const messageBrokerState = props.messageBrokerState
    const setMessageBrokerState = props.setMessageBrokerState

    const HandleChange = (config_field, value) => {
        // Create a copy of the current configuration to avoid mutating it directly
        const updatedConfig = { ...messageBrokerState };
        // Update the specified field in the copy
        updatedConfig[config_field] = value;
        // Set the updated configuration in the state
        setMessageBrokerState(updatedConfig);
    }
    return (
        <Card title='Message Broker Microservice'>

            <Paragraph>
                <pre style={{ backgroundColor: "#3498db", color: '#ffffff' }}>
                    The Message Broker Microservice needs a connection to a Message Broker in order to work. Right now only RabbitMQ is supported.
                </pre>
            </Paragraph>

            <Form.Item label='Container Name'>
                <Input defaultValue={messageBrokerState['container_name']} disabled />
            </Form.Item>

            <Form.Item label='Container Port'>
                <InputNumber defaultValue={messageBrokerState['container_port']} onChange={(value) => HandleChange('container_port', value)} />
            </Form.Item>

            <Form.Item label='Host RabbitMQ Message Broker in System'>
                <Switch checked={messageBrokerState['host_message_broker']} onChange={(value) => HandleChange('host_message_broker', value)} />
            </Form.Item>

            {
                messageBrokerState['host_message_broker'] === true ?
                    <Form>
                        <Form.Item name='message_broker_container_port' label='RabbitMQ Port'>
                            <InputNumber defaultValue={messageBrokerState['message_broker_port']} onChange={(value) => HandleChange('message_broker_port', value)} />
                        </Form.Item>
                        <Form.Item name='message_broker_container_port_ui' label='RabbitMQ UI Port'>
                            <InputNumber defaultValue={messageBrokerState['message_broker_port_ui']} onChange={(value) => HandleChange('message_broker_port_ui', value)} />
                        </Form.Item>
                        <Form.Item name='message_broker_username' label='Message Broker Username'>
                            <Input defaultValue={messageBrokerState['message_broker_username']} onChange={(e) => HandleChange('message_broker_username', e.target.value)} />
                        </Form.Item>

                        <Form.Item name='message_broker_password' label='Message Broker Password'>
                            <Input.Password defaultValue={messageBrokerState['message_broker_password']} onChange={(e) => HandleChange('message_broker_password', e.target.value)} />
                        </Form.Item>
                    </Form>
                    :
                    <Form>
                        <Form.Item name='message_broker_host_ip' label='Message Broker Host IP'>
                            <Input defaultValue={messageBrokerState['message_broker_host_ip']} onChange={(e) => HandleChange('message_broker_host_ip', e.target.value)} />
                        </Form.Item>

                        <Form.Item name='message_broker_username' label='Message Broker Username'>
                            <Input defaultValue={messageBrokerState['message_broker_username']} onChange={(e) => HandleChange('message_broker_username', e.target.value)} />
                        </Form.Item>

                        <Form.Item name='message_broker_password' label='Message Broker Password'>
                            <Input.Password defaultValue={messageBrokerState['message_broker_password']} onChange={(e) => HandleChange('message_broker_password', e.target.value)} />
                        </Form.Item>
                    </Form>
            }

        </Card>
    )
}

export default MessageBrokerConfig