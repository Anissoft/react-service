/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/interface-name-prefix */
import { Service, Inject } from '../src/react-service';

const MOCKED_CREATE = undefined;
const MOCKED_REMOVE = undefined;

export interface ISessionClient {
  createSession(): Promise<Response>;
  removeSession(): Promise<Response>;
}

export interface IUser {
  username: string;
  email: string;

  login(): Promise<void>;
  logout(): Promise<void>;
}

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
      setTimeout(() => res(new Response(MOCKED_CREATE)), 1000);
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
