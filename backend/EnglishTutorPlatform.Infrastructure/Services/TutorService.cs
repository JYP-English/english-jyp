using EnglishTutorPlatform.Core.DTOs.Tutor;
using EnglishTutorPlatform.Core.Entities;
using EnglishTutorPlatform.Core.Interfaces;
using EnglishTutorPlatform.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EnglishTutorPlatform.Infrastructure.Services;

public class TutorService : ITutorService
{
    private readonly AppDbContext _db;

    public TutorService(AppDbContext db) => _db = db;

    public async Task<TutorProfileDto> GetProfileAsync()
    {
        var profile = await _db.TutorProfiles.FirstOrDefaultAsync();
        if (profile == null)
            return new TutorProfileDto();
        return Map(profile);
    }

    public async Task<TutorProfileDto> UpdateProfileAsync(UpdateTutorProfileDto dto)
    {
        var profile = await _db.TutorProfiles.FirstOrDefaultAsync();
        if (profile == null)
        {
            var tutor = await _db.Users.FirstOrDefaultAsync(u => (int)u.Role == 1)
                ?? throw new InvalidOperationException("강사 계정이 없습니다.");
            profile = new TutorProfile { UserId = tutor.Id };
            _db.TutorProfiles.Add(profile);
        }

        if (dto.Bio != null) profile.Bio = dto.Bio;
        if (dto.Career != null) profile.Career = dto.Career;
        if (dto.Achievements != null) profile.Achievements = dto.Achievements;
        if (dto.TeachingStyle != null) profile.TeachingStyle = dto.TeachingStyle;
        if (dto.YoutubeUrl != null) profile.YoutubeUrl = dto.YoutubeUrl;
        if (dto.InstagramUrl != null) profile.InstagramUrl = dto.InstagramUrl;
        profile.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        return Map(profile);
    }

    public async Task<TutorProfileDto> UpdateProfileImageAsync(string imageUrl)
    {
        var profile = await _db.TutorProfiles.FirstOrDefaultAsync()
            ?? throw new InvalidOperationException("프로필이 없습니다.");
        profile.ProfileImageUrl = imageUrl;
        profile.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Map(profile);
    }

    private static TutorProfileDto Map(TutorProfile p) => new()
    {
        Id = p.Id,
        Bio = p.Bio,
        Career = p.Career,
        Achievements = p.Achievements,
        TeachingStyle = p.TeachingStyle,
        YoutubeUrl = p.YoutubeUrl,
        InstagramUrl = p.InstagramUrl,
        ProfileImageUrl = p.ProfileImageUrl,
        UpdatedAt = p.UpdatedAt
    };
}
