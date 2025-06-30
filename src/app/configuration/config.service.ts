export interface EnvConfig{
    BaseEndpoint?: string,
    BaseEndpointmr?: string,
    websocketBaseUrl?: string,
    production: boolean; // Add this line
    enableConsoleLogs:boolean;
}
