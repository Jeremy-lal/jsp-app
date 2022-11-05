export interface IFile {
  id?: number;
  name: string;
  grp: string;
}

export class File {
  constructor(
    public name: string,
    public grp: string,
  ) { }
}
