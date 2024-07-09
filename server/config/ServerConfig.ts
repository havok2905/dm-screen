export class ServerConfig {
  private dbSource: string;
  private dbType: string;
  private serverPort: number;

  constructor() {
    this.dbSource = process.env.DBSOURCE ?? '';
    this.dbType = process.env.DBTYPE ?? '';
    this.serverPort = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;
  }

  getDbSource(): string {
    return this.dbSource;
  }

  getDbType(): string {
    return this.dbType;
  }

  getServerPort(): number {
    return this.serverPort;
  }
}
