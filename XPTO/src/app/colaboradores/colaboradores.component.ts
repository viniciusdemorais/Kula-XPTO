import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ElementRef,
  ViewChild,
} from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Colaborate } from "../services/colaborate.services";
import { Router, ActivatedRoute } from "@angular/router";
import { Colaboradores } from "./colaboradores.model";

@Component({
  selector: "xp-colaboradores",
  templateUrl: "./colaboradores.component.html",
})
export class ColaboradoresComponent implements OnInit {
  @ViewChild("closeModal", { static: false }) closeModal: ElementRef;
  @Input() equipe?: number;
  @Output() colaborador: EventEmitter<Colaboradores> = new EventEmitter<
    Colaboradores
  >();
  idColaborador: number;
  idEquipe: number;
  Colaboradores: Colaboradores[];
  colaborateGroup: FormGroup;
  constructor(
    private service: Colaborate,
    private fb: FormBuilder,
    private route: Router,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.colaborateGroup = this.fb.group({
      idColaborador: this.fb.control(""),
      equipe: this.fb.control(""),
      nome: this.fb.control("", [Validators.required, Validators.minLength(5)]),
      telefone: this.fb.control("", [
        Validators.required,
        Validators.minLength(9),
      ]),

      dataNascimento: this.fb.control("", [Validators.required]),
      genero: this.fb.control("", [Validators.required]),
      endereco: this.fb.control("", [Validators.required]),
    });

    this.activatedroute.params.subscribe((data) => {
      (this.idColaborador = data.id), (this.idEquipe = data.equipe);
    });

    if (this.idColaborador && this.idEquipe) {
      this.service
        .ColaboradoresById(this.idColaborador)
        .subscribe((colab) => (this.Colaboradores = [colab]));
    } else {
      this.idEquipe = this.idColaborador;
      this.idColaborador = null;
    }
  }
  close() {
    this.route.navigate([""]).then(() => {
      window.location.reload();
    });
  }
  setValues(data: Colaboradores[]) {
    Object.keys(this.colaborateGroup.controls).forEach((key) => {
      if (this.colaborateGroup.controls[key].value == "") {
        this.colaborateGroup.controls[key].patchValue(data[key]);
      }
    });
  }
  Save() {
    this.colaborateGroup.controls["equipe"].patchValue(this.equipe);
    if (this.idColaborador == null) {
      if (this.colaborateGroup.valid) {
        this.colaborateGroup.removeControl("idColaborador");
        this.service.PostColaboradores(this.colaborateGroup.value).subscribe(
          (suc) => {
            alert("Colaborador(a) cadastrado com sucesso!!");
            this.colaborador.emit(suc);
            this.closeModal.nativeElement.click();
          },
          (err) => {
            alert("Erro ao cadastrar colaborador(a)!!");
          }
        );
      } else {
        alert("Preencha todos os campos corretamente!!");
      }
    } else {
      this.setValues(this.Colaboradores);
      if (this.colaborateGroup.valid) {
        this.service
          .UpdateColaboradores(this.idColaborador, this.colaborateGroup.value)
          .subscribe(
            (suc) => {
              alert("Colaborador(a) editado com sucesso!!");
              this.colaborador.emit(suc);
              this.closeModal.nativeElement.click();
            },
            (err) => {
              alert("Erro ao Editar o colaborador(a)!!");
            }
          );
      } else {
        alert("Preencha todos os campos corretamente!!");
      }
    }
  }
}
