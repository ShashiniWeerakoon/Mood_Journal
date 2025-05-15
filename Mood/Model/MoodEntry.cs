namespace Mood.Model
{
    public class MoodEntry
    {
        public int EntryId { get; set; }              // PK
        public int UserId { get; set; }               // FK to Users
        public required string Mood { get; set; } 
        public string? JournalText { get; set; }
        public DateOnly EntryDate { get; set; }
    }
}
