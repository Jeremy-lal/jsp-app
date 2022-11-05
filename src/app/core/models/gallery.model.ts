export interface IGallery {
  id?: number;
  name: string;
  originalName: string;
  created_at?: Date;
}

export class Gallery {
  constructor(
    public name: string,
    public originalName: string,
    public created_at?: Date
  ) { }
}
