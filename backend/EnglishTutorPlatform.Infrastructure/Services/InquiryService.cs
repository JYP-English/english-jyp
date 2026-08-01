using EnglishTutorPlatform.Core.DTOs.Common;
using EnglishTutorPlatform.Core.DTOs.Inquiry;
using EnglishTutorPlatform.Core.Entities;
using EnglishTutorPlatform.Core.Enums;
using EnglishTutorPlatform.Core.Interfaces;
using EnglishTutorPlatform.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EnglishTutorPlatform.Infrastructure.Services;

public class InquiryService : IInquiryService
{
    private readonly AppDbContext _db;
    private readonly IEmailService _email;

    public InquiryService(AppDbContext db, IEmailService email)
    {
        _db = db;
        _email = email;
    }

    public async Task<InquiryDto> CreateInquiryAsync(CreateInquiryDto dto)
    {
        var inquiry = new Inquiry
        {
            Name = dto.Name,
            Phone = dto.Phone,
            Email = dto.Email,
            School = dto.School,
            Grade = dto.Grade,
            Message = dto.Message
        };

        _db.Inquiries.Add(inquiry);
        await _db.SaveChangesAsync();

        var result = Map(inquiry);
        // 이메일 실패해도 문의 접수는 성공으로 처리
        _ = _email.SendInquiryNotificationAsync(result);

        return result;
    }

    public async Task<PagedResponse<InquiryDto>> GetInquiriesAsync(int page, int pageSize)
    {
        var query = _db.Inquiries.OrderByDescending(i => i.CreatedAt);
        var total = await query.CountAsync();
        var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

        return new PagedResponse<InquiryDto>
        {
            Items = items.Select(Map).ToList(),
            TotalCount = total,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<InquiryDto> GetInquiryByIdAsync(int id)
    {
        var inquiry = await _db.Inquiries.FindAsync(id)
            ?? throw new KeyNotFoundException("문의를 찾을 수 없습니다.");
        return Map(inquiry);
    }

    public async Task<InquiryDto> UpdateStatusAsync(int id, InquiryStatus status)
    {
        var inquiry = await _db.Inquiries.FindAsync(id)
            ?? throw new KeyNotFoundException("문의를 찾을 수 없습니다.");
        inquiry.Status = status;
        await _db.SaveChangesAsync();
        return Map(inquiry);
    }

    private static InquiryDto Map(Inquiry i) => new()
    {
        Id = i.Id,
        Name = i.Name,
        Phone = i.Phone,
        Email = i.Email,
        School = i.School,
        Grade = i.Grade,
        Message = i.Message,
        Status = i.Status,
        CreatedAt = i.CreatedAt
    };
}
