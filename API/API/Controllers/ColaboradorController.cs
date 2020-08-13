using API.Data;
using API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ColaboradorController : ControllerBase
    {
        private readonly ColaboradorContext _context;

        public ColaboradorController(ColaboradorContext context)
        {
            _context = context;
        }

        // GET: api/Colaborador
        [HttpGet]
        public async Task<IActionResult> Getcolaborador()
        {
            var result = await _context.Colaborador.ToListAsync();
            return Ok(result);
        }

        // GET: api/Colaborador/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetColaborador(int id)
        {
            var colaborador = await _context.Colaborador.FindAsync(id);

            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return Ok(colaborador);
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT: api/Colaborador/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutColaborador(int id, Colaborador colaborador)
        {
            if (id != colaborador.IdColaborador)
            {
                return BadRequest();
            }

            _context.Entry(colaborador).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ColaboradorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Colaborador
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<IActionResult> PostColaborador(Colaborador colaborador)
        {
            _context.Colaborador.Add(colaborador);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return Ok(colaborador);
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE: api/Colaborador/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteColaborador(int id)
        {
            var colaborador = await _context.Colaborador.FindAsync(id);
            if (colaborador == null)
            {
                return NotFound();
            }

            _context.Colaborador.Remove(colaborador);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return Ok(colaborador);
            }
            else
            {
                return BadRequest();
            }
        }

        private bool ColaboradorExists(int id)
        {
            return _context.Colaborador.Any(e => e.IdColaborador == id);
        }
    }
}
