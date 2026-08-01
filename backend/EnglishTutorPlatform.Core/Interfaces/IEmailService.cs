using EnglishTutorPlatform.Core.DTOs.Inquiry;

namespace EnglishTutorPlatform.Core.Interfaces;

public interface IEmailService
{
    Task SendInquiryNotificationAsync(InquiryDto inquiry);
}
