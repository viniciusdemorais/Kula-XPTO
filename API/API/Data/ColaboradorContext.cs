using API.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace API.Data
{
    public class ColaboradorContext : DbContext
    {
        private readonly IConfiguration configuration;
        public ColaboradorContext(IConfiguration configuration) => this.configuration = configuration;

        public DbSet<Colaborador> Colaborador { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder dbContextOptionsBuilder)
        {
            if (!dbContextOptionsBuilder.IsConfigured)
            {
                dbContextOptionsBuilder.UseMySQL(configuration["ConnectionStrings:ConexaoMysqlServer"]);
            }
        }
    }
}
