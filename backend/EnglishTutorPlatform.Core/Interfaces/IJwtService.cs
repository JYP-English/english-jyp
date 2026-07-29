using EnglishTutorPlatform.Core.Entities;

namespace EnglishTutorPlatform.Core.Interfaces;

public interface IJwtService
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken();
    int? ValidateRefreshToken(string token);
    (int userId, string role) ParseAccessToken(string token);
}
