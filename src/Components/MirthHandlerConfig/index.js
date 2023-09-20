import React, { useState, useEffect } from 'react'
import { Card, Switch, Form, Input, Select, InputNumber, Divider, Typography } from 'antd'

const { Paragraph } = Typography

const MirthHandlerConfig = (props) => {
    const mirthState = props.mirthState
    const setMirthState = props.setMirthState

    const HandleChange = (config_field, value) => {
        // Create a copy of the current configuration to avoid mutating it directly
        const updatedConfig = { ...mirthState };
        // Update the specified field in the copy
        updatedConfig[config_field] = value;
        // Set the updated configuration in the state
        setMirthState(updatedConfig);
    }

    const mirth_db_options = [
        {
            label: "PostgreSQL",
            value: "postgres"
        }
    ]
    return (
        <Card title='Mirth Connect Webservice'>
            <Paragraph>
                <pre style={{ backgroundColor: "#3498db", color: '#ffffff' }}>
                    The Mirth Connect Webservice needs access to a Mirth Connect Instance
                </pre>
            </Paragraph>

            <Form.Item label='Container Name'>
                <Input defaultValue={mirthState['container_name']} onChange={(e) => HandleChange('mirthState', e.target.value)} disabled />
            </Form.Item>

            <Form.Item label='Container Port'>
                <InputNumber defaultValue={mirthState['container_port']} onChange={(value) => HandleChange('container_port', value)} />
            </Form.Item>

            <Form.Item label='Host Mirth Connect in System'>
                <Switch checked={mirthState['host_mirth']} onChange={(value) => HandleChange('host_mirth', value)} />
            </Form.Item>

            {
                mirthState['host_mirth'] === true ?
                    <Form>
                        <Form.Item name={'mirth_username'} label='Mirth Username'>
                            <Input defaultValue={mirthState['mirth_username']} onChange={(e) => HandleChange('mirth_username', e.target.value)} />
                        </Form.Item>

                        <Form.Item name={'mirth_password'} label='Mirth Password'>
                            <Input defaultValue={mirthState['mirth_password']} onChange={(e) => HandleChange('mirth_password', e.target.value)} />
                        </Form.Item>

                        <Form.Item name='mirth_db' label='Mirth Database'>
                            <Select defaultValue={mirthState['mirth_db']} options={mirth_db_options} />
                        </Form.Item>
                    </Form>
                    :
                    <Form>
                        <Form.Item name={'mirth_endpoint'} label='Mirth Endpoint'>
                            <Input defaultValue={mirthState['mirth_endpoint']} onChange={(e) => HandleChange('mirth_endpoint', e.target.value)} />
                        </Form.Item>

                        <Form.Item name={'mirth_username'} label='Mirth Username'>
                            <Input defaultValue={mirthState['mirth_username']} onChange={(e) => HandleChange('mirth_username', e.target.value)} />
                        </Form.Item>

                        <Form.Item name={'mirth_password'} label='Mirth Password'>
                            <Input defaultValue={mirthState['mirth_password']} onChange={(e) => HandleChange('mirth_password', e.target.value)} />
                        </Form.Item>
                    </Form>
            }

        </Card>
    )
}

export default MirthHandlerConfig