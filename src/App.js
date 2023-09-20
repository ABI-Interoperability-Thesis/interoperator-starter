// General Imports
import React, { useState, useEffect } from 'react'
import Icons from './Icons'
import { Typography, Divider, Button, message } from 'antd'

// Import Components
import SystemDescription from './Components/SystemDescription'
import InteroperatorConfig from './Components/InteroperatorConfig'
import MessageBrokerConfig from './Components/MessageBrokerConfig'
import MirthHandlerConfig from './Components/MirthHandlerConfig'
import PortainerConfig from './Components/PortainerConfig'
import UserInterfaceConfig from './Components/UserInterfaceConfig'

// Import Default Configurations
import InteroperatorJSONConfig from './config/Interoperator.json'
import MessageBrokerJSONConfig from './config/MessageBroker.json'
import MirthHandlerJSONConfig from './config/Mirth.json'
import PortainerJSONConfig from './config/Portainer.json'
import UserInterfaceJSONConfig from './config/UserInterface.json'

// Import Utils
import { GenerateInteroperatorContainer, GenerateMySQLContainer, GenerateDockerComposeFile, GenerateMessageBrokerContainer, GenerateMirthWebserviceContainer, GenerateRabbitMQContainer, GenerateMirthConnectContainer, GenerateMirthConnectDBContainer, GeneratePortainerContainer, GenerateUserInterfaceContainer } from './utils/utils'

const { Title, Paragraph } = Typography

const App = () => {
  // General State
  const [dockerCompose, setDockerCompose] = useState()

  // Configuration State
  const [interoperatorState, setInteroperatorState] = useState(InteroperatorJSONConfig)
  const [messageBrokerState, setMessageBrokerState] = useState(MessageBrokerJSONConfig)
  const [mirthState, setMirthState] = useState(MirthHandlerJSONConfig)
  const [portainerState, setPortainerState] = useState(PortainerJSONConfig)
  const [userInterfaceState, setUserInterfaceState] = useState(UserInterfaceJSONConfig)

  const GenerateDockerCompose = async () => {
    let docker_compose_json = {
      version: '3',
      services: {}
    }

    let docker_volumes = {}

    // Setting up Interoperator Container
    const interoperatorContainer = GenerateInteroperatorContainer(interoperatorState)
    docker_compose_json['services']['interoperator-microservice'] = interoperatorContainer

    // In case Interoperator DB is hosted in the system
    if (interoperatorState['host_database'] === true) {
      docker_compose_json['services']['mysql'] = GenerateMySQLContainer(interoperatorState)
      docker_volumes['mysql_data'] = null
    }

    // Setting up Message Broker Container
    const messageBrokerContainer = GenerateMessageBrokerContainer(messageBrokerState)
    docker_compose_json['services']['message-broker-microservice'] = messageBrokerContainer

    // In case Message Broker is hosted in the system
    if (messageBrokerState['host_message_broker'] === true) {
      docker_compose_json['services']['rabbitmq'] = GenerateRabbitMQContainer(messageBrokerState)
      docker_volumes['rabbitmq_data'] = null
    }

    // Setting up Mirth Connect Webservice
    const mirthContainer = GenerateMirthWebserviceContainer(mirthState)
    docker_compose_json['services']['mirth-connect-webservice'] = mirthContainer

    // In case Mirth Connect is hosted in the system
    if (mirthState['host_mirth'] === true) {
      docker_compose_json['services']['mirth-connect'] = GenerateMirthConnectContainer(mirthState)
      docker_compose_json['services']['mirth-db'] = GenerateMirthConnectDBContainer(mirthState)
      docker_volumes['postgres_data'] = null
    }
    
    if (portainerState['host_portainer'] === true) {
      docker_compose_json['services']['portainer'] = GeneratePortainerContainer(portainerState)
      docker_volumes['portainer_data'] = null
    }

    userInterfaceState['interoperator_port'] = interoperatorState['container_port']
    userInterfaceState['message_broker_port'] = messageBrokerState['container_port']
    userInterfaceState['mirth_service_port'] = mirthState['container_port']
    console.log(userInterfaceState)

    // Setting up the User Interface container
    docker_compose_json['services']['abi-webapp'] = GenerateUserInterfaceContainer(userInterfaceState)


    // If there are any volumes created
    if (Object.keys(docker_volumes).length > 0) {
      docker_compose_json['volumes'] = docker_volumes
    }

    // Generate Docker Compose file
    let docker_compose_str = GenerateDockerComposeFile(docker_compose_json)

    // Removing nulls from docker compose file
    docker_compose_str = docker_compose_str.replace(/\bnull\b/g, '');
    setDockerCompose(docker_compose_str)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Icons type='logo' />
        <Title style={{ margin: 0 }} level={2}>Interoperator Starter</Title>
      </div>

      <Divider>System Description</Divider>
      <SystemDescription />
      <Divider>System Configuration</Divider>

      <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', marginBottom: '1rem' }}>
        <InteroperatorConfig interoperatorState={interoperatorState} setInteroperatorState={setInteroperatorState} />
        <MessageBrokerConfig messageBrokerState={messageBrokerState} setMessageBrokerState={setMessageBrokerState} />
        <MirthHandlerConfig mirthState={mirthState} setMirthState={setMirthState} />
        <UserInterfaceConfig userInterfaceState={userInterfaceState} setUserInterfaceState={setUserInterfaceState} />
        <PortainerConfig portainerState={portainerState} setPortainerState={setPortainerState} />
      </div>

      <Button style={{ width: '100%', height: '3rem', backgroundColor: "#4CAF50F" }} type='primary' onClick={GenerateDockerCompose}>Generate Docker Compose</Button>

      {
        dockerCompose &&
        <>
          <Divider>Generated Docker Compose</Divider>
          <Paragraph>
            <pre>
              {dockerCompose}
            </pre>
          </Paragraph>
        </>
      }
    </div>
  )
}

export default App