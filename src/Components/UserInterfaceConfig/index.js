import React, { useState, useEffect } from 'react'
import { Card, Switch, Form, Input, Select, InputNumber, Divider, Typography } from 'antd'

const { Paragraph } = Typography

const UserInterfaceConfig = (props) => {
    const userInterfaceState = props.userInterfaceState
    const setUserInterfaceState = props.setUserInterfaceState

    const HandleChange = (config_field, value) => {
        // Create a copy of the current configuration to avoid mutating it directly
        const updatedConfig = { ...userInterfaceState };
        // Update the specified field in the copy
        updatedConfig[config_field] = value;
        // Set the updated configuration in the state
        setUserInterfaceState(updatedConfig);
    }

    return (
        <Card title='User Interface'>

            <Paragraph>
                <pre style={{ backgroundColor: "#3498db", color: '#ffffff' }}>
                    Easy Interaction with the system. This container needs the IP for the host machine where all services are hosted.
                </pre>
            </Paragraph>

            <Form.Item name={'container_name'} label='Container Name'>
                <Input defaultValue={userInterfaceState['container_name']} disabled />
            </Form.Item>

            <Form.Item name={'container_port'} label='Container Port'>
                <InputNumber defaultValue={userInterfaceState['container_port']} onChange={(value) => HandleChange('container_port', value)} />
            </Form.Item>

            <Form.Item name={'host_machine'} label='Host Machine'>
                <Input defaultValue={userInterfaceState['host_machine']} onChange={(e) => HandleChange('host_machine', e.target.value)} />
            </Form.Item>
        </Card>
    )
}

export default UserInterfaceConfig