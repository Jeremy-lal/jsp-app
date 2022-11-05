export interface INote {
  id?: number;
  title: string;
  valeur: number;
  user_id: number;
}

export class Note {
  constructor(
    public id: number,
    public title: string,
    public valeur: number,
    public user_id: number
  ) { }
}
