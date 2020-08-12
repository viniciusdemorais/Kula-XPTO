using API.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public static class InicializaDB
    {
        public static void initializeEquipe(EquipeContext context) {

            context.Database.EnsureCreated();

            //Procura equipes
            if (context.equipe.Any())
            {
                return;

            }

            /*var equipes = new Equipe[];

            foreach (Equipe e in equipes) {
                context.equipe.Add(e);
            }*/

            context.SaveChanges();
        }
        public static void initializeColaborador(ColaboradorContext context)
        {

            context.Database.EnsureCreated();

            //Procura equipes
            if (context.colaborador.Any())
            {
                return;

            }

           /* var colaborador = new Colaborador[1];

            foreach (Colaborador e in colaborador) {
                context.colaborador.Add(e);
            }*/

            context.SaveChanges();
        }
    }
}
