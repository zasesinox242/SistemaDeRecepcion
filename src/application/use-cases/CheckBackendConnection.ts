import { ConnectionCheck, ConnectionResult } from '../../domain/ports/ConnectionCheck';

export class CheckBackendConnection {
  constructor(private readonly check: ConnectionCheck) {}

  execute(): Promise<ConnectionResult> {
    return this.check.ping();
  }
}
