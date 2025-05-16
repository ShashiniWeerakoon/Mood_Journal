using System.Data;
using System.Data.SqlClient;
using Mood.Model;
using Mood.Services;

public class MoodService(IConfiguration configuration) : IMoodService
{
    private readonly string _connectionString = configuration.GetConnectionString("DefaultConnection");

    public int AddMoodEntry(int userId, MoodEntryDto entry)
    {
        using var connection = new SqlConnection(_connectionString);
        using var command = new SqlCommand("sp_InsertMoodEntry", connection);
        command.CommandType = CommandType.StoredProcedure;

        command.Parameters.AddWithValue("@UserId", userId);
        command.Parameters.AddWithValue("@Mood", entry.Mood);
        command.Parameters.AddWithValue("@JournalText", entry.JournalText ?? (object)DBNull.Value);
        command.Parameters.AddWithValue("@EntryDate", entry.EntryDate); 

        connection.Open();
        return Convert.ToInt32(command.ExecuteScalar());
    }

    public int AddMoodEntry(MoodEntryDto entry)
    {
        throw new NotImplementedException();
    }

    public List<MoodEntry> GetMoodEntriesByDateRange(int userId, DateTime startDate, DateTime endDate)
    {
        var entries = new List<MoodEntry>();

        using var connection = new SqlConnection(_connectionString);
        using var command = new SqlCommand("sp_GetMoodEntriesByDateRange", connection);
        command.CommandType = CommandType.StoredProcedure;

        command.Parameters.AddWithValue("@UserId", userId);
        command.Parameters.AddWithValue("@StartDate", startDate);
        command.Parameters.AddWithValue("@EndDate", endDate);

        connection.Open();
        using var reader = command.ExecuteReader();
        while (reader.Read())
        {
            entries.Add(new MoodEntry
            {
                EntryId = Convert.ToInt32(reader["EntryId"]),
                UserId = Convert.ToInt32(reader["UserId"]),
                Mood = reader["Mood"].ToString(),
                JournalText = reader["JournalText"].ToString(),
                EntryDate = Convert.ToDateTime(reader["EntryDate"]) // ✅ Reader returns DateTime
            });
        }
        return entries;
    }

    public List<MoodStatsDto> GetMoodStats(int userId, DateTime startDate, DateTime endDate)
    {
        var stats = new List<MoodStatsDto>();

        using var connection = new SqlConnection(_connectionString);
        using var command = new SqlCommand("sp_GetMoodStats", connection);
        command.CommandType = CommandType.StoredProcedure;

        command.Parameters.AddWithValue("@UserId", userId);
        command.Parameters.AddWithValue("@StartDate", startDate);
        command.Parameters.AddWithValue("@EndDate", endDate);

        connection.Open();
        using var reader = command.ExecuteReader();
        while (reader.Read())
        {
            stats.Add(new MoodStatsDto
            {
                Mood = reader["Mood"].ToString(),
                Count = Convert.ToInt32(reader["Count"])
            });
        }

        return stats;
    }

    List<MoodEntryDto> IMoodService.GetMoodEntriesByDateRange(int userId, DateTime startDate, DateTime endDate)
    {
        throw new NotImplementedException();
    }
}
