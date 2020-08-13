import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
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

  TeamsById(id: number): Observable<Equipes> {
    return this.httpClient.get<Equipes>(`${this.teamURL}/${id}`);
  }
  PostTeam(eq) {
    return this.httpClient.post<Equipes>(this.teamURL, eq);
  }
  DeleteTeam(id: number) {
    return this.httpClient.delete<Equipes>(`${this.teamURL}/${id}`);
  }
  UpdateTeam(id: number, body) {
    return this.httpClient.put(`${this.teamURL}/${id}`, body);
  }
}
