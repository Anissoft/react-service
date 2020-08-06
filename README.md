# Welcome to react-service 👋
[![Version](https://img.shields.io/npm/v/react-service.svg)](https://www.npmjs.com/package/react-service)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)

> My attempt to make inversion of control solution for React apps with Reflect and Typescript;

## Install

```sh
npm install @anissoft/react-service --save
```

## Usage

First of all - you need to declare interfaces for your services:

```typescript
// interfaces.ts
export interface ISessionClient {
  createSession(): Promise<Response>
  removeSession(): Promise<Response>
}

export interface IUser {
  username: string;
  email: string;

  sessionClient: ISessionClient;

  login(): Promise<void>;
  logout(): Promise<void>;
}
```

Then, you should write some classes to implement these interfaces:

```typescript
// classes.ts
import { Service, Inject } from '@anissoft/react-service';
import { IUser, ISessionClient } from './interfaces';

@Service()
export class SessionClient implements ISessionClient {
  public async createSession() {
    return fetch('/api/method/to/create/session');
  }

  public async removeSession() {
    return fetch('/api/method/to/remove/session');
  }
}

@Service()
export class SessionClientMock implements ISessionClient {
  public async createSession() {
    return new Promise<Response>((res) => {
      setTimeout(() => res(new Response(MOCKED_CREATE)), 1000);
    });
  }

  public async removeSession() {
    return new Promise<Response>((res) => {
      setTimeout(() => res(new Response(MOCKED_REMOVE)), 1000);
    });
  }
}

@Service()
export class User implements IUser {
  public username = 'Boris Sshec';

  public email = 'boris1991@example.com';

  @Inject('SESSION_CLIENT') 
  private sessionClient: SessionClient; 

  public async login() {
    await this.sessionClient.createSession();
  }; 

  public async logout() {
    await this.sessionClient.removeSession();
  }; 
}

```

Write react components, which should have acces to your services insidde them:

```tsx
// userview.tsx
import { Provider } from '@anissoft/react-service';

export const Example = () => {
  const test = useService<Test>('TEST');

  console.log(test);

  return (
    <>
    </>
  );
};

```

Pass those classes that you need in Provider for services, You can configure, which implementation will be resolved by tag-names:

```tsx
import { Provider } from '@anissoft/react-service';
import { User, SessionClient} from './classes';

const RootComponent = () => {
  return (
    <Provider services={{ 'USER': User, 'SESSION_CLIENT': SessionClient }}>
      <Example />
    </Provider>
  );
};
```

## Author

👤 **anissoftkun@gmail.com**

* Github: [@anissoft](https://github.com/anissoft)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/Anissoft/react-service/issues). 

## Show your support

Give a ⭐️ if this project helped you!