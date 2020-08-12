import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { take } from "rxjs/operators";
import { Equipes } from "../equipes/equipes.model";
@Injectable({
  providedIn: "root",
})
export class Team {
  constructor(private httpClient: HttpClient) {}

  teamURL = "http://localhost:52957/api/Equipes";

  Teams(search?: string): Observable<Equipes[]> {
    return this.httpClient.get<Equipes[]>(this.teamURL);
  }

  TeamsById(id): Observable<Equipes[]> {
    return this.httpClient.get<Equipes[]>(`${this.teamURL}/${id}`);
  }
  PostTeam(eq) {
    return this.httpClient.post<Equipes[]>(this.teamURL, eq).pipe(take(1));
  }
  DeleteTeam(id) {
    return this.httpClient
      .delete<Equipes[]>(`${this.teamURL}/${id}`)
      .pipe(take(1));
  }
  UpdateTeam(id, body) {
    return this.httpClient.put(`${this.teamURL}/${id}`, body).pipe(take(1));
  }
}
