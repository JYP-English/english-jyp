using System.ComponentModel.DataAnnotations;

namespace EnglishTutorPlatform.Core.DTOs.Auth;

public class UpdateProfileDto
{
    [MaxLength(100)]
    public string? Name { get; set; }

    [MaxLength(20)]
    public string? Phone { get; set; }

    [MaxLength(100)]
    public string? School { get; set; }

    [Range(1, 3)]
    public short? Grade { get; set; }
}

public class ChangePasswordDto
{
    [Required]
    public string CurrentPassword { get; set; } = string.Empty;

    [Required, MinLength(8), MaxLength(100)]
    public string NewPassword { get; set; } = string.Empty;
}

public class RefreshTokenDto
{
    [Required]
    public string RefreshToken { get; set; } = string.Empty;
}
