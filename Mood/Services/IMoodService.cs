using Mood.Model;


namespace Mood.Services
{
    public interface IMoodService
    {
        int AddMoodEntry(MoodEntryDto entry);
        List<MoodEntryDto> GetMoodEntriesByDateRange(int userId, DateTime startDate, DateTime endDate);
        List<MoodStatsDto> GetMoodStats(int userId, DateTime startDate, DateTime endDate);
    }
}
