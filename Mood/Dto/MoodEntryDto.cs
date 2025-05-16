namespace Mood.Model
{
    public class MoodEntryDto
    {
        public int UserId { get; set; }
        public required string Mood { get; set; }
        public required string JournalText { get; set; }
        public DateTime EntryDate { get; set; }
    }
}
