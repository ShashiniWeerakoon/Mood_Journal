namespace Mood.Model
{
    public class UserModel
    {
        public int UserId { get; set; }              // PK
        public required string UserName { get; set; }
        public required string Email { get; set; } 
    }
}
