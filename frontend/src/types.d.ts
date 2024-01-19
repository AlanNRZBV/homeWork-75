export interface IMessage {
  password: string;
  encoded: string;
  decoded: string;
}

export interface IBtnType {
  type: string;
}

export interface IMessageMutation {
  password: string;
  message: string;
}
