#   How to connect microservice
There are many ways to connect to the microservice

1.  Shareable instance via imports
    ```
    import { Module } from '@nestjs/common';
    import { ClientsModule, Transport } from '@nestjs/microservices';

    @Module({
        imports: [
            ClientsModule.register([
                {
                    name: 'USER_SERVICE',
                    transport: Transport.TCP,
                    options: {
                        host: '127.0.0.1',
                        port: 8080,
                    },
                },
            ]),
        ],
    })
    export class AppModule {}
    ```
    
    Use:
    ```
        import { Inject, Injectable } from '@nestjs/common';
        import { ClientProxy } from '@nestjs/microservices';

        @Injectable()
        export class AppService {
            public constructor(@Inject('USER_SERVICE') private _userServiceClient: ClientProxy) {}
        }
    ```

2.  Shareable instance via providers
    ```
    import { Module } from '@nestjs/common';
    import { ClientProxyFactory, Transport } from '@nestjs/microservices';

    import { ServiceName } from './constants';

    @Module({
        providers: [
            {
                provide: 'USER_SERVICE',
                useFactory: () => {
                    return ClientProxyFactory.create({
                        transport: Transport.NATS,
                        options: {
                            servers: ['nats://0.0.0.0:4222'],
                        },
                    });
                },
            },
        ],
    })
    export class AppModule {}
    ```

    Use:
    ```
        import { Inject, Injectable } from '@nestjs/common';
        import { ClientProxy } from '@nestjs/microservices';

        @Injectable()
        export class AppService {
            public constructor(@Inject('USER_SERVICE') private _userServiceClient: ClientProxy) {}
        }
    ```
    
3.  Create new instance in the service
    ```
    import { Injectable } from '@nestjs/common';
    import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

    @Injectable()
    export class AppService {
        private readonly _userServiceClient: ClientProxy;
        public constructor() {
            this._userServiceClient = ClientProxyFactory.create({
                transport: Transport.TCP,
                options: {
                    host: '127.0.0.1',
                    port: 3002,
                },
            });
        }
    }
    ```
4.  Create new instance in the service by decorator
    ```
    import { Injectable } from '@nestjs/common';
    import { Client, ClientProxy, Transport } from '@nestjs/microservices';

    @Injectable()
    export class AppService {
        @Client({
            transport: Transport.TCP,
            options: {
                host: '127.0.0.1',
                port: 3002,
            },
        })
        private readonly _userServiceClient: ClientProxy;
    }
    ```
