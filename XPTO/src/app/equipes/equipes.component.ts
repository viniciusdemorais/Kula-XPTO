import { Component, OnInit } from "@angular/core";
import { Equipes } from "./equipes.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Team } from "../services/team.services";

import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "xp-equipes",
  templateUrl: "./equipes.component.html",
})
export class EquipesComponent implements OnInit {
  equipe: Equipes[];
  id: number;
  EquipGroup: FormGroup;
  data = "";
  constructor(
    private service: Team,
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {
    this.EquipGroup = this.fb.group({
      idEquipe: this.fb.control(""),
      nome: this.fb.control("", [Validators.required, Validators.minLength(5)]),
      nomeGestor: this.fb.control("", [
        Validators.required,
        Validators.minLength(5),
      ]),
    });

    this.activatedroute.params.subscribe((data) => {
      this.id = data.id;
    });
    if (this.id) {
      this.service
        .TeamsById(this.id)
        .subscribe((equipe) => (this.equipe = [equipe]));
      this.EquipGroup.controls["idEquipe"].patchValue(this.id);
    }
  }

  close() {
    this.route.navigate([""]).then(() => {
      window.location.reload();
    });
  }

  setValues(data: Equipes[]) {
    Object.keys(this.EquipGroup.controls).forEach((key) => {
      if (this.EquipGroup.controls[key].value == "") {
        this.EquipGroup.controls[key].patchValue(data[key]);
      }
    });
  }

  Save() {
    if (this.id == null) {
      if (this.EquipGroup.valid) {
        this.EquipGroup.removeControl("idEquipe");
        this.service.PostTeam(this.EquipGroup.value).subscribe(
          (suc) => {
            alert("Equipe cadastrada com sucesso!!");

            this.close();
          },
          (err) => {
            alert("Erro ao Salvar a equipe!!");
          }
        );
      } else {
        alert("Preencha todos os campos corretamente!!");
      }
    } else {
      this.setValues(this.equipe);
      if (this.EquipGroup.valid) {
        this.service.UpdateTeam(this.id, this.EquipGroup.value).subscribe(
          (suc) => {
            alert("Equipe editada com sucesso!!");
            this.close();
          },
          (err) => {
            alert("Erro ao Editar a Equipe!!");
          }
        );
      } else {
        alert("Preencha todos os campos corretamente!!");
      }
    }
  }
}
