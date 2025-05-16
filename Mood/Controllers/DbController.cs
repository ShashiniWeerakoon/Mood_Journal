using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Mood.Data;


[ApiController]
[Route("api/[controller]")]
public class DbController : ControllerBase
{
    private readonly DbHelper _db;

    public DbController(IConfiguration config)
    {
        _db = new DbHelper(config.GetConnectionString("MoodDB"));
    }

    [HttpGet("check")]
    public IActionResult CheckConnection()
    {
        try
        {
            using (SqlConnection conn = _db.GetConnection())
            {
                conn.Open();
                return Ok("✅ Connected to SQL Server successfully.");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"❌ Connection failed: {ex.Message}");
        }
    }
}