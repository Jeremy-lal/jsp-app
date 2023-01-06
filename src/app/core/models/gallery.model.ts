export interface IGalleryImg {
  id?: number;
  name: string;
  originalName: string;
  created_at?: Date;
}

export class GalleryImg {
  constructor(
    public name: string,
    public originalName: string,
    public created_at?: Date
  ) { }
}
