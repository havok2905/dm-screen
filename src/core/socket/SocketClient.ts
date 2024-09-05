import { io, Socket } from 'socket.io-client';

export class SocketClient {
  public socketInstance: Socket | null;
  public url: string;

  constructor(url: string) {
    this.socketInstance = null;
    this.url = url;
  }

  public init() {
    this.socketInstance = io(this.url);
  }

  public disconnect() {
    this.socketInstance?.disconnect();
  }

  public emit(key: string, data?: unknown) {
    if (typeof data !== 'undefined') {
      this.socketInstance?.emit(key);
    } else {
      this.socketInstance?.emit(key, data);
    }
  }
}
