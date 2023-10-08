import React, { useState } from 'react';
import { Typography, Collapse, Button } from 'antd';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const SystemDescription = () => {
  const [showInteroperator, setShowInteroperator] = useState(false);
  const [showMessageBroker, setShowMessageBroker] = useState(false);
  const [showMirthContainer, setShowMirthContainer] = useState(false);

  const toggleInteroperator = () => {
    setShowInteroperator(!showInteroperator);
  };

  const toggleMessageBroker = () => {
    setShowMessageBroker(!showMessageBroker);
  };

  const toggleMirthContainer = () => {
    setShowMirthContainer(!showMirthContainer);
  };

  const docker_compose_examples = {
    interoperator: "interoperator-microservice:\r\n    image: ghcr.io/abi-interoperability-thesis/mysql-webservice:latest\r\n    container_name: interoperator-webservice\r\n    restart: always\r\n    ports:\r\n      - '3001:3000'\r\n    environment:\r\n      PORT: 3000 # Container Port, must match exposed ports above\r\n      DB_USERNAME: admin # username for mysql db connection\r\n      DB_PASSWORD: admin # password for mysql db connection\r\n      DB_NAME: abi-metadata # db name for mysql db connection\r\n      DB_HOST: 192.168.0.4 # mysql machine ip for mysql db connection\r\n      MIRTH_IP: 192.168.0.5 # Mirth Connect machine ip\r\n      MESSAGE_QUEUE_ENDPOINT: http://message-broker-webservice:3000 # Internal connection to message broker container\r\n      MIRTH_HANDLER_ENDPOINT: http://mirth-connect-webservice:3000 # Internal connection to mirth controller container\r\n      ADMIN_USERNAME: admin # Default admin user account\r\n      ADMIN_PASSWORD: admin # Default admin user account",
    message_broker: "message-broker-microservice:\r\n    image: ghcr.io/abi-interoperability-thesis/rabbitmq-webservice:latest\r\n    container_name: message-broker-webservice\r\n    restart: always\r\n    ports:\r\n      - '3002:3000'\r\n    environment:\r\n      PORT: 3000 # Container Port, must match exposed ports above\r\n      RABBIT_USERNAME: admin # Username for RabbitMQ connection\r\n      RABBIT_PASSWORD: admin # Password for RabbitMQ connection\r\n      RABBIT_MQ_HOST: 192.168.0.4 # Ip for machine running RabbitMQ\r\n      MYSQL_SERVICE_ENDPOINT: http://interoperator-webservice:3000 # Internal connection to Interoperator container",
    mirth: "mirth-connect-webservice:\r\n    image: ghcr.io/abi-interoperability-thesis/mirth-api-webservice:latest\r\n    container_name: mirth-connect-webservice\r\n    restart: always\r\n    ports:\r\n      - '3003:3000'\r\n    environment:\r\n      PORT: 3000  # Container Port, must match exposed ports above\r\n      MIRTH_USERNAME: admin # Mirth username for Mirth Connect connection\r\n      MIRTH_PASSWORD: admin # Mirth password for Mirth Connect connection\r\n      MIRTH_ENDPOINT: https://mirth-connect:8443 # Endpoint for Mirth Connect Instance\r\n      MYSQL_SERVICE_ENDPOINT: http://interoperator-webservice:3000 # Internal connection to Interoperator container"

  }

  return (
    <div>
      <Paragraph>
        The ABI Interoperator is a system that can take your machine learning models and can run them using HL7 messages or FHIR resources as input for the models. It does this while allowing complete control over the model feature mappings to HL7/FHIR, validations and preprocessing. The system uses a Microservice Architecture where each service is a specialized controller of a different part of the system and is highly customizeable through its environemt variables allowing modularity and different parts of the system to be hosted by different machines. Thus the three main containers/services in the system can use already running instances of mysql/rabbitmq/mirth-connect or fire up internal ones directly in the docker-compose file.
      </Paragraph>
      <div className="container">
        <Title level={3}>Interoperator Microservice</Title>
        <Paragraph>
          The Interoperator Container is the central component of our system, responsible for managing the interoperability engine's backend operations. It establishes a robust connection to the database, ensuring data integrity and reliability. This container plays a critical role in facilitating seamless communication between various system modules and ensures the efficient exchange of data.
        </Paragraph>
        <Collapse ghost>
          <Panel header="Docker Compose Example" key="1">
            {showInteroperator && (
              <pre>
                {docker_compose_examples['interoperator']}
              </pre>
            )}
            <Button type="link" onClick={toggleInteroperator}>
              {showInteroperator ? 'Hide Code' : 'Show Code'}
            </Button>
          </Panel>
        </Collapse>
      </div>
      <div className="container">
        <Title level={3}>Message Broker Microservice</Title>
        <Paragraph>
          The Message Broker Container serves as the communication hub within our system. It controls the message broker, allowing diverse applications and systems to send and receive requests seamlessly. This container is responsible for routing messages efficiently, ensuring real-time data exchange, and promoting system-wide interoperability.
        </Paragraph>
        <Collapse ghost>
          <Panel header="Docker Compose Example" key="2">
            {showMessageBroker && (
              <pre>
                {docker_compose_examples['message_broker']}
              </pre>
            )}
            <Button type="link" onClick={toggleMessageBroker}>
              {showMessageBroker ? 'Hide Code' : 'Show Code'}
            </Button>
          </Panel>
        </Collapse>
      </div>
      <div className="container">
        <Title level={3}>Mirth Microservice</Title>
        <Paragraph>
          The Mirth Container is dedicated to managing Mirth Connect instances in our system. It leverages the Mirth Connect API to create, modify, and deploy channels, among other functions. This container significantly enhances our system's capabilities in healthcare data integration and management, providing a robust and scalable solution.
        </Paragraph>
        <Collapse ghost>
          <Panel header="Docker Compose Example" key="3">
            {showMirthContainer && (
              <pre>
                {docker_compose_examples['mirth']}
              </pre>
            )}
            <Button type="link" onClick={toggleMirthContainer}>
              {showMirthContainer ? 'Hide Code' : 'Show Code'}
            </Button>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default SystemDescription;
