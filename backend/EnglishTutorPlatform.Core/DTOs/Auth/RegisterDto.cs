using System.ComponentModel.DataAnnotations;

namespace EnglishTutorPlatform.Core.DTOs.Auth;

public class RegisterDto
{
    [Required, EmailAddress, MaxLength(255)]
    public string Email { get; set; } = string.Empty;

    [Required, MinLength(8), MaxLength(100)]
    public string Password { get; set; } = string.Empty;

    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(20)]
    public string? Phone { get; set; }

    [MaxLength(100)]
    public string? School { get; set; }

    [Range(1, 3)]
    public short? Grade { get; set; }
}
