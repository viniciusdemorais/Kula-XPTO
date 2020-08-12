import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Equipes } from "./../equipes/equipes.model";
import { Team } from "./../services/team.services";
import { Colaborate } from "./../services/colaborate.services";
import { Colaboradores } from "./../colaboradores/colaboradores.model";
import {
  animate,
  transition,
  style,
  state,
  trigger,
  keyframes,
} from "@angular/animations";

@Component({
  selector: "xp-home",
  templateUrl: "./home.component.html",
  animations: [
    trigger("Appeared", [
      state("ready", style({ opacity: "1" })),
      transition("void => ready", [
        style({ opacity: "0", transform: "translateY(-10px)" }),
        animate("2200ms 0s ease-in-out"),
      ]),
    ]),
    trigger("Row", [
      state("ready", style({ opacity: 1 })),
      transition(
        "void => ready",
        animate(
          "3000ms 0s ease-in",
          keyframes([
            style({
              opacity: 0,
              transform: "translateX(-30px)",
              "offset-rotate": 0,
            }),
            style({
              opacity: 0.8,
              transform: "translateX(10px)",
              "offset-rotate": 0.8,
            }),
            style({
              opacity: 1,
              transform: "translateX(0px)",
              "offset-rotate": 1,
            }),
          ])
        )
      ),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  stateHeader = "ready";
  stateEquip = "ready";

  id: number;
  type: string;

  equipe: Equipes[];
  colaboradores: Colaboradores[];
  constructor(private svcTeam: Team, private svcColaborate: Colaborate) {}

  ngOnInit() {
    this.svcTeam.Teams().subscribe((equipe) => (this.equipe = equipe));

    this.svcColaborate
      .GetColaboradores()
      .subscribe((colaboradores) => (this.colaboradores = colaboradores));
  }
  setDelete(id, tipo?) {
    this.id = id;
    this.type = tipo;
  }

  Excluir() {
    if (this.type === "C") {
      this.svcColaborate.DeleteColaboradores(this.id).subscribe(
        (suc) => {
          alert("Exclusão realizada com sucesso!!");
          window.location.reload();
        },
        (err) => {
          alert("Erro ao Excluir!!");
        }
      );
    } else {
      this.svcTeam.DeleteTeam(this.id).subscribe(
        (suc) => {
          alert("Exclusão realizada com sucesso!!");
          window.location.reload();
        },
        (err) => {
          alert(
            "Erro ao Excluir, verifique se existem colaboradores na equipe, primeiro os remova e depois exclua a equipe!!"
          );
        }
      );
    }
  }
}
