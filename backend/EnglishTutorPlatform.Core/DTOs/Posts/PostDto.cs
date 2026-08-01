using System.ComponentModel.DataAnnotations;
using EnglishTutorPlatform.Core.Enums;

namespace EnglishTutorPlatform.Core.DTOs.Posts;

public class PostDto
{
    public int Id { get; set; }
    public string AuthorName { get; set; } = string.Empty;
    public PostCategory Category { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public bool IsPinned { get; set; }
    public int ViewCount { get; set; }
    public int SortOrder { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class CreatePostDto
{
    [Required]
    public PostCategory Category { get; set; }

    [Required, MaxLength(300)]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Content { get; set; } = string.Empty;

    public bool IsPinned { get; set; } = false;
}

public class UpdatePostDto
{
    public PostCategory? Category { get; set; }

    [MaxLength(300)]
    public string? Title { get; set; }

    public string? Content { get; set; }

    public bool? IsPinned { get; set; }
}

public class ReorderPassageDto
{
    public int Id { get; set; }
    public int SortOrder { get; set; }
}
