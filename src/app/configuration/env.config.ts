import { EnvConfig } from "./config.service";

export const Config: EnvConfig = {
    BaseEndpoint: 'http://localhost:8000/api/',
    BaseEndpointmr: 'http://localhost:8001/api/',
    websocketBaseUrl: 'ws://localhost:3000/ws/',
  production: true ,
  enableConsoleLogs: false, // Disable logs in production

};
