using System.Security.Claims;
using EnglishTutorPlatform.Core.DTOs.Auth;
using EnglishTutorPlatform.Core.DTOs.Common;
using EnglishTutorPlatform.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnglishTutorPlatform.Api.Controllers;

[ApiController]
[Route("api/v1/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService) => _authService = authService;

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        var result = await _authService.RegisterAsync(dto);
        SetRefreshTokenCookie(result.RefreshToken);
        return Ok(ApiResponse<TokenResponseDto>.Ok(result));
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var result = await _authService.LoginAsync(dto);
        SetRefreshTokenCookie(result.RefreshToken);
        return Ok(ApiResponse<TokenResponseDto>.Ok(result));
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
        var refreshToken = Request.Cookies["refreshToken"]
            ?? throw new UnauthorizedAccessException("리프레시 토큰이 없습니다.");
        var result = await _authService.RefreshTokenAsync(refreshToken);
        SetRefreshTokenCookie(result.RefreshToken);
        return Ok(ApiResponse<TokenResponseDto>.Ok(result));
    }

    [HttpPost("logout"), Authorize]
    public async Task<IActionResult> Logout()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var refreshToken = Request.Cookies["refreshToken"] ?? "";
        await _authService.LogoutAsync(userId, refreshToken);
        Response.Cookies.Delete("refreshToken");
        return Ok(ApiResponse<object>.Ok(null, "로그아웃 되었습니다."));
    }

    [HttpGet("me"), Authorize]
    public async Task<IActionResult> GetMe()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await _authService.GetMeAsync(userId);
        return Ok(ApiResponse<UserInfoDto>.Ok(result));
    }

    [HttpPatch("me"), Authorize]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await _authService.UpdateProfileAsync(userId, dto);
        return Ok(ApiResponse<UserInfoDto>.Ok(result));
    }

    [HttpPatch("me/password"), Authorize]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        await _authService.ChangePasswordAsync(userId, dto);
        return Ok(ApiResponse<object>.Ok(null, "비밀번호가 변경되었습니다."));
    }

    private void SetRefreshTokenCookie(string refreshToken)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTime.UtcNow.AddDays(30)
        };
        Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
    }
}
