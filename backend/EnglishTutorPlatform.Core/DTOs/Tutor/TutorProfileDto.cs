using System.ComponentModel.DataAnnotations;

namespace EnglishTutorPlatform.Core.DTOs.Tutor;

public class TutorProfileDto
{
    public int Id { get; set; }
    public string? Bio { get; set; }
    public string? Career { get; set; }
    public string? Achievements { get; set; }
    public string? TeachingStyle { get; set; }
    public string? YoutubeUrl { get; set; }
    public string? InstagramUrl { get; set; }
    public string? ProfileImageUrl { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class UpdateTutorProfileDto
{
    public string? Bio { get; set; }
    public string? Career { get; set; }
    public string? Achievements { get; set; }
    public string? TeachingStyle { get; set; }

    [MaxLength(500)]
    public string? YoutubeUrl { get; set; }

    [MaxLength(500)]
    public string? InstagramUrl { get; set; }
}
