using System.Security.Claims;
using EnglishTutorPlatform.Core.DTOs.Common;
using EnglishTutorPlatform.Core.DTOs.Posts;
using EnglishTutorPlatform.Core.Enums;
using EnglishTutorPlatform.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EnglishTutorPlatform.Api.Controllers;

[ApiController]
[Route("api/v1/posts")]
public class PostController : ControllerBase
{
    private readonly IPostService _postService;

    public PostController(IPostService postService) => _postService = postService;

    [HttpGet]
    public async Task<IActionResult> GetPosts(
        [FromQuery] PostCategory? category,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var result = await _postService.GetPostsAsync(category, page, pageSize);
        return Ok(ApiResponse<PagedResponse<PostDto>>.Ok(result));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetPost(int id)
    {
        var result = await _postService.GetPostByIdAsync(id);
        return Ok(ApiResponse<PostDto>.Ok(result));
    }

    [HttpPost, Authorize(Roles = "Tutor")]
    public async Task<IActionResult> CreatePost([FromBody] CreatePostDto dto)
    {
        var authorId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var result = await _postService.CreatePostAsync(authorId, dto);
        return CreatedAtAction(nameof(GetPost), new { id = result.Id },
            ApiResponse<PostDto>.Ok(result));
    }

    [HttpPut("{id}"), Authorize(Roles = "Tutor")]
    public async Task<IActionResult> UpdatePost(int id, [FromBody] UpdatePostDto dto)
    {
        var result = await _postService.UpdatePostAsync(id, dto);
        return Ok(ApiResponse<PostDto>.Ok(result));
    }

    [HttpDelete("{id}"), Authorize(Roles = "Tutor")]
    public async Task<IActionResult> DeletePost(int id)
    {
        await _postService.DeletePostAsync(id);
        return Ok(ApiResponse<object>.Ok(null, "게시글이 삭제되었습니다."));
    }
}
