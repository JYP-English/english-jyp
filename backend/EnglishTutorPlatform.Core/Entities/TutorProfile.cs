namespace EnglishTutorPlatform.Core.Entities;

public class TutorProfile
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string? Bio { get; set; }
    public string? Career { get; set; }         // JSONB → string
    public string? Achievements { get; set; }   // JSONB → string
    public string? TeachingStyle { get; set; }
    public string? YoutubeUrl { get; set; }
    public string? InstagramUrl { get; set; }
    public string? ProfileImageUrl { get; set; }
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
}
