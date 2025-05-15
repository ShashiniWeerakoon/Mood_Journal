using Mood.Model;


namespace Mood.Services
{
    public interface IMoodService
    {
        int AddMoodEntry(MoodEntryDto entry);
        List<MoodEntryDto> GetMoodEntriesByDateRange(int userId, DateOnly startDate, DateOnly endDate);
        List<MoodStatsDto> GetMoodStats(int userId, DateOnly startDate, DateOnly endDate);
    }
}
