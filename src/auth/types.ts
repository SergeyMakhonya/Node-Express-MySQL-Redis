import {UserName, UserPassword} from "../base-types";

export namespace INotesServer {
    export namespace IAuth {
        export interface InAction {
            signup?: InAction.Signup;
            signin?: InAction.Signin;
            signout?: InAction.Signout;
        }

        export namespace InAction {
            export interface Signup {
                username: UserName;
                password: UserPassword;
                passwordConfirm: UserPassword;
            }
            export interface Signin {
                username: UserName;
                password: UserPassword;
            }
            export interface Signout {}
        }
        
        export interface OutAction {
            signup?: OutAction.Signup;
            signin?: OutAction.Signin;
            signout?: OutAction.Signout;
        }

        export namespace OutAction {
            export interface Signup {}
            export interface Signin {
                token: string;
            }
            export interface Signout {}
        }
    }
}
