using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Model
{
    [Table("colaborador")]
    public class Colaborador
    {
        [Key]
        public int IdColaborador { get; set; }
        public int Equipe { get; set; }
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Genero { get; set; }
        public string Endereco { get; set; }
    }
}
