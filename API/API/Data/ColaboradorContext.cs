using API.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class ColaboradorContext : DbContext
    {
        public ColaboradorContext(DbContextOptions<ColaboradorContext> options) : base(options) { }
        public DbSet<Colaborador> colaborador { get; set; }
    }
}
