export interface INewComment {
  content: string;
  grp: string;
  user_id: number;
  comment_id?: number;
}

export interface IUpdateComment extends INewComment {
  id: number;
}

export class Comment {
  id!: number;
  user_id!: number;
  create_at!: Date;
  title!: string;
  content!: string;
  grp!: string;
  comment_id!: number;
  nbAnswer!: number;
  show = false;
  update_at: any;
  firstname: any;
  lastname: any;
  status: any;
  imgURL: any;
  response = false;
}
