# Smart Digital Library Service

## Description

TBD

## API Documentation

API documented using swagger and can be accessed at path [/docs](http://localhost:3000/docs)

## Pre Installation

1. Generate Private & Public Key for JWT

    ```bash
    # Generate public & private key for JWT
    # https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9?permalink_comment_id=3760416#gistcomment-3760416

    openssl genrsa -out private.pem 2048
    openssl rsa -in private.pem -pubout -out public.pem
    ```

2. Create .env file and save it on root directory

    ```
    HOST=0.0.0.0
    PORT=3000
    NODE_ENV=development

    DATABASE_HOST=localhost
    DATABASE_NAME=smart_digital_library
    DATABASE_USER=postgres
    DATABASE_PASSWORD=postgres
    DATABASE_PORT=5432

    ...
    ```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Project Structure

keep in mind that this structure is quite generic and might not work with some techniques like GraphQL. You could however modify it as per your requirements.

```
src
├── common
│   ├── constants
│   ├── decorators
│   │   ├── metadata
│   │   └── requests
│   ├── exceptions
│   ├── guards
│   ├── helpers
│   │   ├── exceptions
│   │   └── responses
│   ├── interfaces
│   ├── middlewares
│   │   └── models
│   ├── pipes
│   ├── serializers
│   │   ├── exceptions
│   │   └── responses
│   └── validations
├── config
│   ├── api
│   ├── app
│   ├── cache
│   ├── database
│   │   └── postgres
│   ├── queue
│   ├── session
│   └── storage
├── database
│   ├── factories
│   │   ├── addresses
│   │   └── users
│   ├── migrations
│   └── seeders
│       ├── addresses
│       └── users
├── jobs
│   ├── consumers
│   │   └── verification-mail
│   └── producers
│       └── verification-mail
├── mails
│   └── verification
├── models
│   ├── addresses
│   │   ├── constants
│   │   ├── entities
│   │   ├── interfaces
│   │   └── serializers
│   └── users
│       ├── constants
│       ├── entities
│       ├── interfaces
│       └── serializers
├── providers
|   ├── cache
│   │   └── redis
│   ├── database
│   │   └── postgres
│   └── queue
│       └── redis
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
└── seed.ts
```

### Config Directory

The config/* folder consists of different sections of variable types to be loaded into our environment.

```
src/config
├── app
│   ├── config.module.ts
│   ├── config.service.ts
│   └── configuration.ts
├── cache
│   ├── config.module.ts
│   ├── config.service.ts
│   └── configuration.ts
├── database
│   ├── mongo
│   │   ├── config.module.ts
│   │   ├── config.service.ts
│   │   └── configuration.ts
│   ├── mysql
│   │   └── [...]
│   └── postgres
│       └── [...]
├── queue
│   └── [...]
├── session
│   └── [...]
└── storage
    └── [...]
```

### Provider Directory

Providers are basically going to be the core modules that initiate a connection between the app & the provider engine (for eg. database).

```
src/providers
├── cache
│   └── redis
│       └── provider.module.ts
├── database
│   ├── mongo
│   │   └── provider.module.ts
│   ├── mysql
│   │   └── [...]
│   └── postgres
│       └── [...]
├── mail
│   └── smtp
│       └── [...]
└── queue
    └── redis
        └── [...]
```

### Modules Directory

Modules will simply be the parent folder that contains all module related data.

```
src/modules
├── addresses
│   ├── entities
│   │   └── address.entity.ts
│   ├── interfaces
│   │   └── address.interface.ts
│   ├── serializers
│   │   └── address.serializer.ts
│   ├── addressess.controller.ts
│   ├── addresses.module.ts
│   ├── addresses.repository.ts
│   └── addresses.service.ts
└── users
    ├── entities
    │   └── user.entity.ts
    ├── interfaces
    │   └── user.interface.ts
    ├── serializers
    │   └── user.serializer.ts
    ├── users.controller.ts
    ├── users.module.ts
    ├── users.repository.ts
    └── users.service.ts
```

### Common Directory

use this common folder to literally fill it in with any extra classes/files that might commonly be used by other modules in your app.

```
src/common
├── constants
│   └── settings.ts
├── decorators
│   ├── metadata
│   │   └── user-types.decorator.ts
│   ├── requests
│   │   └── logged-in-user.decorator.ts
│   └── validations
│       ├── UserExists.ts
│       └── UniqueUserEmail.ts
├── exceptions
│   └── http-exception.filter.ts
├── guards
│   └── user-types.guard.ts
├── helpers
│   ├── exceptions
│   │   └── validation.helper.ts
│   ├── responses
│   │   ├── error.helper.ts
│   │   └── success.helper.ts
│   ├── number.helper.ts
│   ├── array.helper.ts
│   ├── query.helper.ts
│   ├── request.helper.ts
│   └── string.helper.ts
├── interceptors
│   └── http-cache.interceptor.ts
├── interfaces
│   ├── inputs.interface.ts
│   └── search.interface.ts
├── middleware
│   └── models
│       └── user.middleware.ts
├── pipes
│   ├── models
│   │   └── user-entity.pipe.ts
│   ├── search.pipe.ts
│   └── validation.pipe.ts
└── serializers
    ├── responses
    │   ├── error.serializer.ts
    │   └── success.serializer.ts
    ├── validation
    │   └── validation-error.serializer.ts
    └── model.serializer.ts
```