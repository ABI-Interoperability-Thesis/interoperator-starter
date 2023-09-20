import yaml from 'js-yaml'

// export const GenerateMirthContainerYamlConfig = (mirth_config) => {
//     const container_json_config = {
//         image: "nextgenhealthcare/connect:4.3.0",
//         container_name: mirth_config['container_name'],
//         ports: [`${mirth_config['container_port']}:8443`],
//         environment: {
//             DATABASE: mirth_config['database'],
//             DATABASE_URL: 'jdbc:postgresql://mirth-connect-db:5432/mirthdb',
//             DATABASE_USERNAME: mirth_config['database_username'],
//             DATABASE_PASSWORD: mirth_config['database_password']
//         }
//     }
//     return container_json_config
// }

// export const GenerateMirthDatabaseContainerYamlConfig = (mirth_config) => {
//     const container_json_config = {
//         image: mirth_config['database'],
//         container_name: mirth_config['database_container_name'],
//         environment: {
//             POSTGRES_USER: mirth_config['database_username'],
//             POSTGRES_PASSWORD: mirth_config['database_password'],
//             POSTGRES_DB: 'mirthdb',
//         },
//         expose: [mirth_config['database_port']],
//         volumes: ['postgres_data:/var/lib/postgresql/data'],
//     }
//     return container_json_config
// }

// export const GenerateRabbitMQContainerYamlConfig = (rabbit_config) => {
//     const container_json_config = {
//         image: 'rabbitmq:management-alpine',
//         container_name: rabbit_config['container_name'],
//         ports: [
//             `${rabbit_config['container_port']}:5672`,      // RabbitMQ standard port
//             `${rabbit_config['container_port_ui']}:15672`    // RabbitMQ Management UI
//         ],
//         environment: {
//             RABBITMQ_DEFAULT_USER: rabbit_config['default_user'],
//             RABBITMQ_DEFAULT_PASS: rabbit_config['default_password'],
//         },
//         volumes: ['rabbitmq_data:/var/lib/rabbitmq'],
//     }
//     return container_json_config
// }

// export const GeneratePortainerContainerYamlConfig = (portainer_config) => {
//     const container_json_config = {
//         image: 'portainer/portainer-ce:latest',
//         container_name: portainer_config['container_name'],
//         restart: 'always',
//         ports: [
//             `${portainer_config['container_port']}:9000`,
//         ],
//         volumes: ['/var/run/docker.sock:/var/run/docker.sock', 'portainer_data:/data'],
//     }
//     return container_json_config
// } 

// export const GenerateMessageBrokerhandlerContainerYamlConfig = (message_broker_handler_config) => {
//     const container_json_config = {
//         image: 'ghcr.io/abi-interoperability-thesis/rabbitmq-webservice:latest',
//         container_name: message_broker_handler_config['container_name'],
//         restart: 'always',
//         environment: {
//             PORT: 3000,
//             RABBIT_USERNAME: message_broker_handler_config['message_broker_username'],
//             RABBIT_PASSWORD: message_broker_handler_config['message_broker_password'],
//             RABBIT_MQ_HOST: message_broker_handler_config['message_broker_endpoint'],
//             MYSQL_SERVICE_ENDPOINT: 'http://interoperator-webservice:3000',
//         },
//         ports: [
//             `${message_broker_handler_config['container_port']}:3000`,
//         ]
//     }
//     return container_json_config
// } 


// Interoperator Container
export const GenerateInteroperatorContainer = (interoperator_config) => {
    return {
        image: 'ghcr.io/abi-interoperability-thesis/mysql-webservice:latest',
        container_name: interoperator_config['container_name'],
        restart: 'always',
        ports: [
            `${interoperator_config['container_port']}:3000`,
        ],
        environment: {
            PORT: 3000,
            DB_USERNAME: interoperator_config['database_username'],
            DB_PASSWORD: interoperator_config['database_password'],
            DB_NAME: interoperator_config['database_name'],
            DB_HOST: interoperator_config['host_database'] === true ? 'mysql-container' : interoperator_config['database_host_ip'],
            MIRTH_IP: interoperator_config['mirth_ip'],
            MESSAGE_QUEUE_ENDPOINT: interoperator_config['message_broker_endpoint'],
            MIRTH_HANDLER_ENDPOINT: interoperator_config['mirth_handler_endpoint'],
            ADMIN_USERNAME: interoperator_config['admin_username'],
            ADMIN_PASSWORD: interoperator_config['admin_password']
        }
    }
}

// MySQL Container
export const GenerateMySQLContainer = (interoperator_config) => {
    return {
        image: 'mysql:8.0',
        container_name: 'mysql-container',
        restart: 'always',
        ports: [
            `${interoperator_config['database_port']}:3306`,
        ],
        expose: [interoperator_config['database_port']],
        environment: {
            MYSQL_ROOT_PASSWORD: 'admin',
            MYSQL_DATABASE: interoperator_config['database_name'],
            MYSQL_USER: interoperator_config['database_username'],
            MYSQL_PASSWORD: interoperator_config['database_password'],
        },
        volumes: ['mysql_data:/var/lib/mysql']
    }
}

// Message Broker Container
export const GenerateMessageBrokerContainer = (messageBrokerState) => {
    return {
        image: 'ghcr.io/abi-interoperability-thesis/rabbitmq-webservice:latest',
        container_name: 'message-broker-webservice',
        restart: 'always',
        ports: [
            `${messageBrokerState['container_port']}:3000`,
        ],
        environment: {
            PORT: 3000,
            RABBIT_USERNAME: messageBrokerState['message_broker_username'],
            RABBIT_PASSWORD: messageBrokerState['message_broker_password'],
            RABBIT_MQ_HOST: messageBrokerState['host_message_broker'] === true ? 'rabbitmq' : messageBrokerState['message_broker_host_ip'],
            MYSQL_SERVICE_ENDPOINT: 'http://interoperator-webservice:3000',
        }
    }
}

// RabbitMQ Container
export const GenerateRabbitMQContainer = (messageBrokerState) => {
    return {
        image: 'rabbitmq:management-alpine',
        container_name: 'rabbitmq',
        restart: 'always',
        ports: [
            `${messageBrokerState['message_broker_port']}:5672`,
            `${messageBrokerState['message_broker_port_ui']}:15672`,
        ],
        environment: {
            RABBITMQ_DEFAULT_USER: messageBrokerState['message_broker_username'],
            RABBITMQ_DEFAULT_PASS: messageBrokerState['message_broker_password']
        },
        volumes: ['rabbitmq_data:/var/lib/rabbitmq']
    }
}

export const GenerateMirthWebserviceContainer = (mirthState) => {
    return {
        image: 'ghcr.io/abi-interoperability-thesis/mirth-api-webservice:latest',
        container_name: mirthState['container_name'],
        restart: 'always',
        ports: [
            `${mirthState['container_port']}:3000`,
        ],
        environment: {
            PORT: 3000,
            MIRTH_USERNAME: mirthState['mirth_username'],
            MIRTH_PASSWORD: mirthState['mirth_password'],
            MIRTH_ENDPOINT: mirthState['host_mirth'] === true ? 'https://mirth-connect:8443' : mirthState['mirth_endpoint'],
            MYSQL_SERVICE_ENDPOINT: 'http://interoperator-webservice:3000',
        }
    }
}

export const GenerateMirthConnectContainer = (mirthState) => {
    return {
        image: 'nextgenhealthcare/connect:4.3.0',
        container_name: 'mirth-connect',
        restart: 'always',
        ports: [
            `${mirthState['mirth_port']}:8443/tcp`,
        ],
        environment: {
            DATABASE: mirthState['mirth_db'],
            DATABASE_USERNAME: mirthState['mirth_username'],
            DATABASE_PASSWORD: mirthState['mirth_password'],
            DATABASE_MAX_CONNECTIONS: 20,
            DATABASE_MAX_RETRY: 2,
            DATABASE_RETRY_WAIT: 10000,
            DATABASE_URL: 'jdbc:postgresql://mirth-db:5432/mirthdb',
            KEYSTORE_STOREPASS: 'docker_storepass',
            KEYSTORE_KEYPASS: 'docker_keypass',
            VMOPTIONS: '-Xmx512m'
        },
    }
}


export const GenerateMirthConnectDBContainer = (mirthState) => {
    return {
        image: mirthState['mirth_db'],
        container_name: 'mirth-db',
        restart: 'always',
        expose: [5432],
        environment: {
            POSTGRES_USER: mirthState['mirth_username'],
            POSTGRES_PASSWORD: mirthState['mirth_password'],
            POSTGRES_DB: 'mirthdb',
        },
        volumes: ['postgres_data:/var/lib/postgresql/data']
    }
}

export const GeneratePortainerContainer = (portainerState) => {
    return {
        image: 'portainer/portainer-ce:latest',
        container_name: portainerState['container_name'],
        restart: 'always',
        ports: [
            `${portainerState['container_port']}:9000`,
        ],
        volumes: [
            '/var/run/docker.sock:/var/run/docker.sock',
            'portainer_data:/data'
        ]
    }
}

export const GenerateUserInterfaceContainer = (userInterfaceState) => {
    const interoperator_endpoint = `http://${userInterfaceState['host_machine']}:${userInterfaceState['interoperator_port']}`
    const message_broker_endpoint = `http://${userInterfaceState['host_machine']}:${userInterfaceState['message_broker_port']}`
    const mirth_service_endpoint = `http://${userInterfaceState['host_machine']}:${userInterfaceState['mirth_service_port']}`

    return {
        image: 'ghcr.io/abi-interoperability-thesis/abi-interoperability-webapp:latest',
        container_name: userInterfaceState['container_name'],
        restart: 'always',
        ports: [
            `${userInterfaceState['container_port']}:3000`,
        ],
        environment: {
            REACT_APP_MYSQL_SERVICE_ENDPOINT: interoperator_endpoint,
            REACT_APP_MIRTH_SERVICE_ENDPOINT: mirth_service_endpoint,
            REACT_APP_RABBITMQ_SERVICE_ENDPOINT: message_broker_endpoint
        }
    }
}

export const GenerateDockerComposeFile = (file_config) => {
    const yamlString = yaml.dump(file_config);
    return yamlString
}