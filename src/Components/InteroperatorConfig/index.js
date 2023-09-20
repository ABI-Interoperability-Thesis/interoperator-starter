import React, { useState, useEffect } from 'react'
import { Card, Switch, Form, Input, Select, InputNumber, Divider, Typography } from 'antd'

const { Paragraph } = Typography

const MessageBrokerHandlerConfig = (props) => {
    const interoperatorState = props.interoperatorState
    const setInteroperatorState = props.setInteroperatorState

    const HandleChange = (config_field, value) => {
        // Create a copy of the current configuration to avoid mutating it directly
        const updatedConfig = { ...interoperatorState };
        // Update the specified field in the copy
        updatedConfig[config_field] = value;
        // Set the updated configuration in the state
        setInteroperatorState(updatedConfig);
    }

    return (
        <Card title='Interoperator Microservice'>
            <Paragraph>
                <pre style={{ backgroundColor: "#3498db", color: '#ffffff' }}>
                    The Interoperator Microservice needs a connection to a database in order to work. Right now only MySQL is supported.
                </pre>
            </Paragraph>

            <Form.Item label='Container Name'>
                <Input defaultValue={interoperatorState['container_name']} onChange={(e) => HandleChange('interoperatorState', e.target.value)} disabled />
            </Form.Item>

            <Form.Item label='Container Port'>
                <InputNumber defaultValue={interoperatorState['container_port']} onChange={(value) => HandleChange('container_port', value)} />
            </Form.Item>

            <Form.Item label='Host MySQL Database in System'>
                <Switch checked={interoperatorState['host_database']} onChange={(value) => HandleChange('host_database', value)} />
            </Form.Item>

            {
                interoperatorState['host_database'] === true ?
                    <div>
                        <Form>
                            <Form.Item name='database_username' label='Database Username'>
                                <Input defaultValue={interoperatorState['database_username']} onChange={(e) => HandleChange('database_username', e.target.value)} />
                            </Form.Item>

                            <Form.Item name='database_password' label='Database Password'>
                                <Input.Password defaultValue={interoperatorState['database_password']} onChange={(e) => HandleChange('database_password', e.target.value)} />
                            </Form.Item>

                            <Form.Item name='database_name' label='Database Name'>
                                <Input defaultValue={interoperatorState['database_name']} disabled />
                            </Form.Item>

                            <Form.Item name='admin_username' label='System Admin Username'>
                                <Input defaultValue={interoperatorState['admin_username']} onChange={(e) => HandleChange('admin_username', e.target.value)}/>
                            </Form.Item>

                            <Form.Item name='admin_password' label='System Admin Password'>
                                <Input defaultValue={interoperatorState['admin_password']} onChange={(e) => HandleChange('admin_password', e.target.value)} />
                            </Form.Item>
                        </Form>
                    </div>
                    :
                    <div>
                        <Form>
                            <Form.Item name='database_host_ip' label='Database Host IP'>
                                <Input defaultValue={interoperatorState['database_host_ip']} onChange={(e) => HandleChange('database_host_ip', e.target.value)} />
                            </Form.Item>

                            <Form.Item name='database_username' label='Database Username'>
                                <Input defaultValue={interoperatorState['database_username']} onChange={(e) => HandleChange('database_username', e.target.value)} />
                            </Form.Item>

                            <Form.Item name='database_password' label='Database Password'>
                                <Input.Password defaultValue={interoperatorState['database_password']} onChange={(e) => HandleChange('database_password', e.target.value)} />
                            </Form.Item>

                            <Form.Item name='database_name' label='Database Name'>
                                <Input defaultValue={interoperatorState['database_name']} disabled />
                            </Form.Item>
                        </Form>
                    </div>
            }
        </Card>
    )
}

export default MessageBrokerHandlerConfig