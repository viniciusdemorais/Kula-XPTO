using API.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class EquipeContext : DbContext
    {
        public EquipeContext(DbContextOptions<EquipeContext> options): base(options) { }
        public DbSet<Equipe> equipe { get; set; }
      
      /*  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL("Server=mysql.kula.jobs;DataBase=kula12;Uid=kula12;Pwd=k4lat3ste;Connect Timeout=9999");
            base.OnConfiguring(optionsBuilder);

        }*/
    }
}
