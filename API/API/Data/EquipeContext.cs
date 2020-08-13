using API.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace API.Data
{
    public class EquipeContext : DbContext
    {
        private readonly IConfiguration configuration;
        public EquipeContext(IConfiguration configuration) => this.configuration = configuration;

        public DbSet<Equipe> Equipe { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder)
        {
            if (!dbContextOptionsBuilder.IsConfigured)
            {
                dbContextOptionsBuilder.UseMySQL(configuration["ConnectionStrings:ConexaoMysqlServer"]);
            }
        }
    }
}
