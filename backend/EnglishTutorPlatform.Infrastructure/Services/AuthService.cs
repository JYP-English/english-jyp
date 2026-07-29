using EnglishTutorPlatform.Core.DTOs.Auth;
using EnglishTutorPlatform.Core.Entities;
using EnglishTutorPlatform.Core.Interfaces;
using EnglishTutorPlatform.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace EnglishTutorPlatform.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _db;
    private readonly IJwtService _jwt;
    private readonly IConfiguration _config;

    public AuthService(AppDbContext db, IJwtService jwt, IConfiguration config)
    {
        _db = db;
        _jwt = jwt;
        _config = config;
    }

    public async Task<TokenResponseDto> RegisterAsync(RegisterDto dto)
    {
        if (await _db.Users.AnyAsync(u => u.Email == dto.Email))
            throw new InvalidOperationException("이미 사용 중인 이메일입니다.");

        var user = new User
        {
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Name = dto.Name,
            Phone = dto.Phone,
            School = dto.School,
            Grade = dto.Grade,
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return await IssueTokensAsync(user);
    }

    public async Task<TokenResponseDto> LoginAsync(LoginDto dto)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email)
            ?? throw new UnauthorizedAccessException("이메일 또는 비밀번호가 올바르지 않습니다.");

        if (!user.IsActive)
            throw new UnauthorizedAccessException("비활성화된 계정입니다.");

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("이메일 또는 비밀번호가 올바르지 않습니다.");

        return await IssueTokensAsync(user);
    }

    public async Task<TokenResponseDto> RefreshTokenAsync(string refreshToken)
    {
        var stored = await _db.RefreshTokens
            .Include(r => r.User)
            .FirstOrDefaultAsync(r => r.Token == refreshToken && !r.IsRevoked)
            ?? throw new UnauthorizedAccessException("유효하지 않은 리프레시 토큰입니다.");

        if (stored.ExpiresAt < DateTime.UtcNow)
        {
            stored.IsRevoked = true;
            await _db.SaveChangesAsync();
            throw new UnauthorizedAccessException("만료된 리프레시 토큰입니다.");
        }

        if (!stored.User.IsActive)
            throw new UnauthorizedAccessException("비활성화된 계정입니다.");

        stored.IsRevoked = true;
        return await IssueTokensAsync(stored.User);
    }

    public async Task LogoutAsync(int userId, string refreshToken)
    {
        var token = await _db.RefreshTokens.FirstOrDefaultAsync(
            r => r.UserId == userId && r.Token == refreshToken);
        if (token != null)
        {
            token.IsRevoked = true;
            await _db.SaveChangesAsync();
        }
    }

    public async Task<UserInfoDto> GetMeAsync(int userId)
    {
        var user = await _db.Users.FindAsync(userId)
            ?? throw new KeyNotFoundException("사용자를 찾을 수 없습니다.");
        return MapToUserInfo(user);
    }

    public async Task<UserInfoDto> UpdateProfileAsync(int userId, UpdateProfileDto dto)
    {
        var user = await _db.Users.FindAsync(userId)
            ?? throw new KeyNotFoundException("사용자를 찾을 수 없습니다.");

        if (dto.Name != null) user.Name = dto.Name;
        if (dto.Phone != null) user.Phone = dto.Phone;
        if (dto.School != null) user.School = dto.School;
        if (dto.Grade.HasValue) user.Grade = dto.Grade;
        user.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        return MapToUserInfo(user);
    }

    public async Task ChangePasswordAsync(int userId, ChangePasswordDto dto)
    {
        var user = await _db.Users.FindAsync(userId)
            ?? throw new KeyNotFoundException("사용자를 찾을 수 없습니다.");

        if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
            throw new InvalidOperationException("현재 비밀번호가 올바르지 않습니다.");

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
        user.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
    }

    private async Task<TokenResponseDto> IssueTokensAsync(User user)
    {
        var accessToken = _jwt.GenerateAccessToken(user);
        var refreshTokenValue = _jwt.GenerateRefreshToken();
        var refreshExpireDays = int.Parse(_config["JwtSettings:RefreshTokenExpireDays"] ?? "30");

        var refreshToken = new RefreshToken
        {
            UserId = user.Id,
            Token = refreshTokenValue,
            ExpiresAt = DateTime.UtcNow.AddDays(refreshExpireDays),
        };

        _db.RefreshTokens.Add(refreshToken);
        await _db.SaveChangesAsync();

        return new TokenResponseDto
        {
            AccessToken = accessToken,
            RefreshToken = refreshTokenValue,
            User = MapToUserInfo(user)
        };
    }

    private static UserInfoDto MapToUserInfo(User user) => new()
    {
        Id = user.Id,
        Email = user.Email,
        Name = user.Name,
        Phone = user.Phone,
        School = user.School,
        Grade = user.Grade,
        Role = user.Role.ToString()
    };
}
