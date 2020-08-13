using System.Linq;

namespace API.Data
{
    public static class InicializaDB
    {
        public static void InitializeEquipe(EquipeContext context) {

            context.Database.EnsureCreated();

            //Procura equipes
            if (context.Equipe.Any())
            {
                return;

            }

            /*var equipes = new Equipe[];

            foreach (Equipe e in equipes) {
                context.equipe.Add(e);
            }*/

            context.SaveChanges();
        }
        public static void InitializeColaborador(ColaboradorContext context)
        {

            context.Database.EnsureCreated();

            //Procura equipes
            if (context.Colaborador.Any())
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
