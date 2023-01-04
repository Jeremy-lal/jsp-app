import { INote } from './note.model';

export interface IUser {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  pwd: string;
  status: string;
  imgURL?: string;
  note?: INote[];
}

export class User {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public username: string,
    public pwd: string,
    public status: string,
    public note: INote[],
    public imgURL: string
  ) { }
}
