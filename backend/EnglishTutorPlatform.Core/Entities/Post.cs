using EnglishTutorPlatform.Core.Enums;

namespace EnglishTutorPlatform.Core.Entities;

public class Post
{
    public int Id { get; set; }
    public int AuthorId { get; set; }
    public PostCategory Category { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public bool IsPinned { get; set; } = false;
    public int ViewCount { get; set; } = 0;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public User Author { get; set; } = null!;
}
