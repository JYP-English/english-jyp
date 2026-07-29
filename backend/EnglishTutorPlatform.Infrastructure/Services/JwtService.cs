using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using EnglishTutorPlatform.Core.Entities;
using EnglishTutorPlatform.Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace EnglishTutorPlatform.Infrastructure.Services;

public class JwtService : IJwtService
{
    private readonly IConfiguration _config;
    private readonly string _secretKey;
    private readonly string _issuer;
    private readonly string _audience;
    private readonly int _accessTokenExpireMinutes;

    public JwtService(IConfiguration config)
    {
        _config = config;
        _secretKey = config["JwtSettings:SecretKey"]!;
        _issuer = config["JwtSettings:Issuer"]!;
        _audience = config["JwtSettings:Audience"]!;
        _accessTokenExpireMinutes = int.Parse(config["JwtSettings:AccessTokenExpireMinutes"] ?? "15");
    }

    public string GenerateAccessToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.ToString()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_accessTokenExpireMinutes),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public string GenerateRefreshToken()
    {
        var bytes = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(bytes);
        return Convert.ToBase64String(bytes);
    }

    public int? ValidateRefreshToken(string token)
    {
        // Refresh token validation is done via DB lookup, not JWT validation
        return null;
    }

    public (int userId, string role) ParseAccessToken(string token)
    {
        var handler = new JwtSecurityTokenHandler();
        var jwt = handler.ReadJwtToken(token);
        var userId = int.Parse(jwt.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value);
        var role = jwt.Claims.First(c => c.Type == ClaimTypes.Role).Value;
        return (userId, role);
    }
}
