using Microsoft.AspNetCore.Mvc;
using Mood.Model;
using Mood.Services;

namespace Mood.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoodController : ControllerBase
    {
        private readonly IMoodService _moodService;

        public MoodController(IMoodService moodService)
        {
            _moodService = moodService;
        }

        [HttpPost("add")]
        public IActionResult Add([FromBody] MoodEntryDto entry)
        {
            try
            {
                var newId = _moodService.AddMoodEntry(entry);
                return Ok(new { Message = "Mood entry added successfully", EntryId = newId });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpGet("history")]
        public IActionResult History([FromQuery] int userId, [FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            try
            {
                var entries = _moodService.GetMoodEntriesByDateRange(userId, startDate, endDate);
                return Ok(entries);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }

        [HttpGet("stats")]
        public IActionResult Stats([FromQuery] int userId, [FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            try
            {
                var stats = _moodService.GetMoodStats(userId, startDate, endDate);
                return Ok(stats);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }
    }
}
