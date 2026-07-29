using EnglishTutorPlatform.Core.Enums;

namespace EnglishTutorPlatform.Core.Entities;

public class Inquiry
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? School { get; set; }
    public short? Grade { get; set; }
    public string Message { get; set; } = string.Empty;
    public InquiryStatus Status { get; set; } = InquiryStatus.Unread;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
