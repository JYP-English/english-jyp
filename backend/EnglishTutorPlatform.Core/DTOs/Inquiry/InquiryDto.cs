using System.ComponentModel.DataAnnotations;
using EnglishTutorPlatform.Core.Enums;

namespace EnglishTutorPlatform.Core.DTOs.Inquiry;

public class CreateInquiryDto
{
    [Required, MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required, MaxLength(20)]
    public string Phone { get; set; } = string.Empty;

    [EmailAddress, MaxLength(255)]
    public string? Email { get; set; }

    [MaxLength(100)]
    public string? School { get; set; }

    [Range(1, 3)]
    public short? Grade { get; set; }

    [Required]
    public string Message { get; set; } = string.Empty;
}

public class InquiryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? School { get; set; }
    public short? Grade { get; set; }
    public string Message { get; set; } = string.Empty;
    public InquiryStatus Status { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class UpdateInquiryStatusDto
{
    [Required]
    public InquiryStatus Status { get; set; }
}
