using EnglishTutorPlatform.Core.DTOs.Common;
using EnglishTutorPlatform.Core.DTOs.Inquiry;
using EnglishTutorPlatform.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnglishTutorPlatform.Api.Controllers;

[ApiController]
[Route("api/v1/inquiries")]
public class InquiryController : ControllerBase
{
    private readonly IInquiryService _inquiryService;

    public InquiryController(IInquiryService inquiryService) => _inquiryService = inquiryService;

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateInquiryDto dto)
    {
        var result = await _inquiryService.CreateInquiryAsync(dto);
        return Ok(ApiResponse<InquiryDto>.Ok(result, "문의가 접수되었습니다."));
    }

    [HttpGet, Authorize(Roles = "Tutor")]
    public async Task<IActionResult> GetAll(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var result = await _inquiryService.GetInquiriesAsync(page, pageSize);
        return Ok(ApiResponse<PagedResponse<InquiryDto>>.Ok(result));
    }

    [HttpGet("{id}"), Authorize(Roles = "Tutor")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _inquiryService.GetInquiryByIdAsync(id);
        return Ok(ApiResponse<InquiryDto>.Ok(result));
    }

    [HttpPatch("{id}/status"), Authorize(Roles = "Tutor")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateInquiryStatusDto dto)
    {
        var result = await _inquiryService.UpdateStatusAsync(id, dto.Status);
        return Ok(ApiResponse<InquiryDto>.Ok(result));
    }
}
