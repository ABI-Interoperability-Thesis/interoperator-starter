import React, { useState, useEffect } from 'react'
import { Card, Switch, Form, Input, Select, InputNumber, Divider, Typography } from 'antd'

const { Paragraph } = Typography

const PortainerConfig = (props) => {
    const portainerState = props.portainerState
    const setPortainerState = props.setPortainerState

    const HandleChange = (config_field, value) => {
        // Create a copy of the current configuration to avoid mutating it directly
        const updatedConfig = { ...portainerState };
        // Update the specified field in the copy
        updatedConfig[config_field] = value;
        // Set the updated configuration in the state
        setPortainerState(updatedConfig);
    }

    return (
        <div>
            <Form.Item label='Host Portainer in System'>
                <Switch checked={portainerState['host_portainer']} onChange={(value) => HandleChange('host_portainer', value)} />
            </Form.Item>
            {
                portainerState['host_portainer'] === true &&
                <Card title='Portainer'>
                    <Form>
                        <Form.Item name={'container_name'} label='Container Name'>
                            <Input defaultValue={portainerState['container_name']} disabled />
                        </Form.Item>

                        <Form.Item name={'container_port'} label='Container Port'>
                            <Input defaultValue={portainerState['container_port']} onChange={(value) => HandleChange('container_port', value)}  />
                        </Form.Item>
                    </Form>
                </Card>
            }

        </div>

    )
}

export default PortainerConfig