{
    env: 'development',
    main: '/Users/icewater/varicom/learning/chatofpomelo-websocket/game-server/app01.js',
    servers: {},
    startTime: null,
    serverId: 'master-server-1',
    state: 1,
    components: {},
    clusterSeq: {},
    type: 'all',
    serverType: 'master',
    curServer: {
        id: 'master-server-1',
        host: '127.0.0.1',
        port: 3005
    },
    serverTypes: [
        [length]: 0
    ],
    loaded: [
        [length]: 0
    ],
    master: {
        id: 'master-server-1',
        host: '127.0.0.1',
        port: 3005
    },
    mode: 'clusters',
    base: '/Users/icewater/varicom/learning/chatofpomelo-websocket/game-server',
    settings: {
        base: '/Users/icewater/varicom/learning/chatofpomelo-websocket/game-server',
        env: 'development',
        master: {
            id: 'master-server-1',
            host: '127.0.0.1',
            port: 3005
        },
        servers: {
            connector: [{
                    id: 'connector-server-1',
                    host: '127.0.0.1',
                    port: 4050,
                    clientPort: 3050,
                    frontend: true,
                    serverType: 'connector'
                },
                [length]: 1
            ],
            chat: [{
                    id: 'chat-server-1',
                    host: '127.0.0.1',
                    port: 6050,
                    serverType: 'chat'
                },
                [length]: 1
            ],
            gate: [{
                    id: 'gate-server-1',
                    host: '127.0.0.1',
                    clientPort: 3014,
                    frontend: true,
                    serverType: 'gate'
                },
                [length]: 1
            ]
        },
        __serverMap__: {
            'connector-server-1': {
                id: 'connector-server-1',
                host: '127.0.0.1',
                port: 4050,
                clientPort: 3050,
                frontend: true,
                serverType: 'connector'
            },
            'chat-server-1': {
                id: 'chat-server-1',
                host: '127.0.0.1',
                port: 6050,
                serverType: 'chat'
            },
            'gate-server-1': {
                id: 'gate-server-1',
                host: '127.0.0.1',
                clientPort: 3014,
                frontend: true,
                serverType: 'gate'
            }
        },
        main: '/Users/icewater/varicom/learning/chatofpomelo-websocket/game-server/app01.js',
        serverType: 'master',
        serverId: 'master-server-1',
        mode: 'clusters',
        type: 'all',
        curServer: {
            id: 'master-server-1',
            host: '127.0.0.1',
            port: 3005
        },
        name: 'hello'
    }
}
