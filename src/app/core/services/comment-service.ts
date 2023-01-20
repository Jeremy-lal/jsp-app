import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { Comment, INewComment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  static URL = environment.serverUrl.comment;

  toUpdate = false;
  locate = 'Commun';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getComments(grp: string): Observable<Comment[]> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.get<Comment[]>(CommentService.URL + 'grp/' + grp, { headers });
  }

  getCommentById(id: number): Observable<Comment> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.get<Comment>(CommentService.URL + id, { headers });
  }

  getResponseComment(grp: string): Observable<Comment[]> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.get<Comment[]>(CommentService.URL + 'response/grp/' + grp, { headers });
  }

  getResponseCommentById(commentId: number): Observable<Comment[]> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.get<Comment[]>(CommentService.URL + 'response/' + commentId, { headers });
  }

  getNumberResponse(message: Comment): Observable<Count> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.get<Count>(CommentService.URL + '/response/number/' + message.id, { headers });
  }

  createComment(newComment: INewComment) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.post(CommentService.URL, newComment, { headers });
  }

  updateComment(updateComment: Comment) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    const id = updateComment.id;
    return this.http.put(CommentService.URL + id, updateComment, { headers });
  }

  deleteComment(id: number) {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authService.token });
    return this.http.delete(CommentService.URL + id, { headers });
  }
}

export interface Count {
  count: number;
}
