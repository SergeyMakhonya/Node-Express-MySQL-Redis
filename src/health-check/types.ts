import {Timestamp} from "../base-types";

export namespace INotesServer {
    export namespace IHealthCheck {
        export interface InAction {
            get?: InAction.Get;
        }

        export namespace InAction {
            export interface Get {}
        }
        
        export interface OutAction {
            get?: OutAction.Get;
        }

        export namespace OutAction {
            export interface Get {
                status: HealthCheckStatus;
                timestamp: Timestamp;
            }
        }
    }
}

export type HealthCheckStatus = 'availabled';