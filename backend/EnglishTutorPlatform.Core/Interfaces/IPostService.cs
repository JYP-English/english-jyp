using EnglishTutorPlatform.Core.DTOs.Common;
using EnglishTutorPlatform.Core.DTOs.Posts;
using EnglishTutorPlatform.Core.Enums;

namespace EnglishTutorPlatform.Core.Interfaces;

public interface IPostService
{
    Task<PagedResponse<PostDto>> GetPostsAsync(PostCategory? category, int page, int pageSize);
    Task<PostDto> GetPostByIdAsync(int id);
    Task<PostDto> CreatePostAsync(int authorId, CreatePostDto dto);
    Task<PostDto> UpdatePostAsync(int id, UpdatePostDto dto);
    Task DeletePostAsync(int id);
}
