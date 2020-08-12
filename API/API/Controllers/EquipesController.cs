using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Model;
using System.Text.Json.Serialization;
using System.Text.Json;
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
        public async Task<ActionResult<IEnumerable<Equipe>>> GetEquipe()
        {
            return await _context.equipe.ToListAsync();
        }

        // GET: api/Equipes/5
        [HttpGet("{id}")]
        [Produces("application/json")]
        public async Task<ActionResult<Equipe>> GetEquipe(int id)
        {
            var equipe = await _context.equipe.FindAsync(id);
            
            if (equipe == null)
            {
                return NotFound();
            }
            
            
            return equipe;  
            


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
        public async Task<ActionResult<Equipe>> PostEquipe(Equipe equipe)
        {
            _context.equipe.Add(equipe);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEquipe", new { id = equipe.IdEquipe }, equipe);
        }

        // DELETE: api/Equipes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Equipe>> DeleteEquipe(int id)
        {
            var equipe = await _context.equipe.FindAsync(id);
            if (equipe == null)
            {
                return NotFound();
            }

            _context.equipe.Remove(equipe);
            await _context.SaveChangesAsync();

            return equipe;
        }

        private bool EquipeExists(int id)
        {
            return _context.equipe.Any(e => e.IdEquipe == id);
        }
    }
}
