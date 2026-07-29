using EnglishTutorPlatform.Core.DTOs.Common;
using EnglishTutorPlatform.Core.DTOs.Tutor;
using EnglishTutorPlatform.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnglishTutorPlatform.Api.Controllers;

[ApiController]
[Route("api/v1/tutor")]
public class TutorController : ControllerBase
{
    private readonly ITutorService _tutorService;

    public TutorController(ITutorService tutorService) => _tutorService = tutorService;

    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        var result = await _tutorService.GetProfileAsync();
        return Ok(ApiResponse<TutorProfileDto>.Ok(result));
    }

    [HttpPut("profile"), Authorize(Roles = "Tutor")]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateTutorProfileDto dto)
    {
        var result = await _tutorService.UpdateProfileAsync(dto);
        return Ok(ApiResponse<TutorProfileDto>.Ok(result));
    }

    [HttpPost("profile/image"), Authorize(Roles = "Tutor")]
    public async Task<IActionResult> UploadProfileImage([FromBody] UploadImageDto dto)
    {
        var result = await _tutorService.UpdateProfileImageAsync(dto.ImageUrl);
        return Ok(ApiResponse<TutorProfileDto>.Ok(result));
    }
}

public record UploadImageDto(string ImageUrl);
