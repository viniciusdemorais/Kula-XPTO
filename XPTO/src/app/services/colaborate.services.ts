import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError, take } from "rxjs/operators";
import { Colaboradores } from "./../colaboradores/colaboradores.model";

@Injectable({
  providedIn: "root",
})
export class Colaborate {
  constructor(private httpClient: HttpClient) {}

  colaboradoresURL = "http://localhost:52957/api/Colaborador";
  GetColaboradores(): Observable<Colaboradores[]> {
    return this.httpClient.get<Colaboradores[]>(this.colaboradoresURL);
  }
  ColaboradoresById(id): Observable<Colaboradores[]> {
    return this.httpClient.get<Colaboradores[]>(
      `${this.colaboradoresURL}/${id}`
    );
  }
  PostColaboradores(eq) {
    return this.httpClient
      .post<Colaboradores[]>(this.colaboradoresURL, eq)
      .pipe(take(1));
  }
  DeleteColaboradores(id) {
    return this.httpClient
      .delete<Colaboradores[]>(`${this.colaboradoresURL}/${id}`)
      .pipe(take(1));
  }
  UpdateColaboradores(id, body) {
    return this.httpClient
      .put(`${this.colaboradoresURL}/${id}`, body)
      .pipe(take(1));
  }
}
