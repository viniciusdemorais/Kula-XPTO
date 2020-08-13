import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
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
  ColaboradoresById(id: number): Observable<Colaboradores> {
    return this.httpClient.get<Colaboradores>(`${this.colaboradoresURL}/${id}`);
  }
  PostColaboradores(eq) {
    return this.httpClient.post<Colaboradores>(this.colaboradoresURL, eq);
  }
  DeleteColaboradores(id: number) {
    return this.httpClient.delete<Colaboradores>(
      `${this.colaboradoresURL}/${id}`
    );
  }
  UpdateColaboradores(id: number, body) {
    return this.httpClient.put(`${this.colaboradoresURL}/${id}`, body);
  }
}
