using EnglishTutorPlatform.Core.DTOs.Tutor;

namespace EnglishTutorPlatform.Core.Interfaces;

public interface ITutorService
{
    Task<TutorProfileDto> GetProfileAsync();
    Task<TutorProfileDto> UpdateProfileAsync(UpdateTutorProfileDto dto);
    Task<TutorProfileDto> UpdateProfileImageAsync(string imageUrl);
}
