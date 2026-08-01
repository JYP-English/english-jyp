using EnglishTutorPlatform.Core.DTOs.Common;
using EnglishTutorPlatform.Core.DTOs.Inquiry;
using EnglishTutorPlatform.Core.Enums;
using EnglishTutorPlatform.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EnglishTutorPlatform.Api.Controllers;

[ApiController]
[Route("api/v1/inquiries")]
public class InquiryController : ControllerBase
{
    private readonly IInquiryService _inquiryService;
    private readonly string _adminKey;

    public InquiryController(IInquiryService inquiryService, IConfiguration config)
    {
        _inquiryService = inquiryService;
        _adminKey = config["AdminApiKey"] ?? "";
    }

    private bool IsAdmin() =>
        !string.IsNullOrEmpty(_adminKey) &&
        Request.Headers.TryGetValue("X-Admin-Key", out var key) &&
        key == _adminKey;

    private IActionResult Unauthorized401() =>
        Unauthorized(ApiResponse<object>.Fail("관리자 인증이 필요합니다."));

    // POST /api/v1/inquiries  (public)
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateInquiryDto dto)
    {
        var result = await _inquiryService.CreateInquiryAsync(dto);
        return Ok(ApiResponse<InquiryDto>.Ok(result, "문의가 접수되었습니다."));
    }

    // GET /api/v1/inquiries  (admin only)
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 50)
    {
        if (!IsAdmin()) return Unauthorized401();
        var result = await _inquiryService.GetInquiriesAsync(page, pageSize);
        return Ok(ApiResponse<PagedResponse<InquiryDto>>.Ok(result));
    }

    // GET /api/v1/inquiries/{id}  (admin only)
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        if (!IsAdmin()) return Unauthorized401();
        var result = await _inquiryService.GetInquiryByIdAsync(id);
        return Ok(ApiResponse<InquiryDto>.Ok(result));
    }

    // PATCH /api/v1/inquiries/{id}/status  (admin only)
    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateInquiryStatusDto dto)
    {
        if (!IsAdmin()) return Unauthorized401();
        var result = await _inquiryService.UpdateStatusAsync(id, dto.Status);
        return Ok(ApiResponse<InquiryDto>.Ok(result));
    }
}
