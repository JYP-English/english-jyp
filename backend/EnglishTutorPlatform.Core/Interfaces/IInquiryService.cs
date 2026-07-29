using EnglishTutorPlatform.Core.DTOs.Common;
using EnglishTutorPlatform.Core.DTOs.Inquiry;
using EnglishTutorPlatform.Core.Enums;

namespace EnglishTutorPlatform.Core.Interfaces;

public interface IInquiryService
{
    Task<InquiryDto> CreateInquiryAsync(CreateInquiryDto dto);
    Task<PagedResponse<InquiryDto>> GetInquiriesAsync(int page, int pageSize);
    Task<InquiryDto> GetInquiryByIdAsync(int id);
    Task<InquiryDto> UpdateStatusAsync(int id, InquiryStatus status);
}
