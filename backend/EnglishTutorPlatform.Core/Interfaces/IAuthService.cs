using EnglishTutorPlatform.Core.DTOs.Auth;

namespace EnglishTutorPlatform.Core.Interfaces;

public interface IAuthService
{
    Task<TokenResponseDto> RegisterAsync(RegisterDto dto);
    Task<TokenResponseDto> LoginAsync(LoginDto dto);
    Task<TokenResponseDto> RefreshTokenAsync(string refreshToken);
    Task LogoutAsync(int userId, string refreshToken);
    Task<UserInfoDto> GetMeAsync(int userId);
    Task<UserInfoDto> UpdateProfileAsync(int userId, UpdateProfileDto dto);
    Task ChangePasswordAsync(int userId, ChangePasswordDto dto);
}
