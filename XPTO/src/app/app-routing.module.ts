import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { EquipesComponent } from "./equipes/equipes.component";
import { ColaboradoresComponent } from "./colaboradores/colaboradores.component";
const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "**", component: HomeComponent },
  { path: "equipes", component: EquipesComponent },
  { path: "equipes/:id", component: EquipesComponent },
  { path: "colaboradores/:id", component: ColaboradoresComponent },
  { path: "colaboradores/:id/:equipe", component: ColaboradoresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
