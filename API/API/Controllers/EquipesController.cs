using API.Data;
using API.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class EquipesController : ControllerBase
    {
        private readonly EquipeContext _context;

        public EquipesController(EquipeContext context)
        {
            _context = context;
        }

        // GET: api/Equipes
        [HttpGet]
        public async Task<IActionResult> GetEquipe()
        {
            var result = await _context.Equipe.ToListAsync();
            return Ok(result);
        }

        // GET: api/Equipes/5
        [HttpGet("{id}")]
        [Produces("application/json")]
        public async Task<IActionResult> GetEquipe(int id)
        {
            var equipe = await _context.Equipe.FindAsync(id);            
            if (equipe == null)
            {
                return NotFound();
            }
            return Ok(equipe); 
        }

        // PUT: api/Equipes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEquipe(int id, Equipe equipe)
        {
            if (id != equipe.IdEquipe)
            {
                return BadRequest();
            }

            _context.Entry(equipe).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EquipeExists(id))
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

        // POST: api/Equipes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<IActionResult> PostEquipe(Equipe equipe)
        {
            _context.Equipe.Add(equipe);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return Ok(equipe);
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE: api/Equipes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEquipe(int id)
        {
            var equipe = await _context.Equipe.FindAsync(id);
            if (equipe == null)
            {
                return NotFound();
            }
            _context.Equipe.Remove(equipe);
            var result = await _context.SaveChangesAsync();
            if (result > 0)
            {
                return Ok(equipe);
            }
            else
            {
                return BadRequest();
            }
        }

        private bool EquipeExists(int id)
        {
            return _context.Equipe.Any(e => e.IdEquipe == id);
        }
    }
}
