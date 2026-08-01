using EnglishTutorPlatform.Core.DTOs.Common;
using EnglishTutorPlatform.Core.DTOs.Posts;
using EnglishTutorPlatform.Core.Enums;
using EnglishTutorPlatform.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EnglishTutorPlatform.Api.Controllers;

[ApiController]
[Route("api/v1/passages")]
public class PassageController : ControllerBase
{
    private readonly IPostService _postService;
    private readonly string _adminKey;

    private static readonly int[] PassageCategories = Enumerable.Range(10, 12).ToArray();

    // 임시 어드민 계정 ID (지문 생성 시 authorId 용도)
    private const int AdminAuthorId = 1;

    public PassageController(IPostService postService, IConfiguration config)
    {
        _postService = postService;
        _adminKey = config["AdminApiKey"] ?? "";
    }

    private IActionResult Unauthorized401() =>
        Unauthorized(ApiResponse<object>.Fail("관리자 인증이 필요합니다."));

    private bool IsAdmin() =>
        !string.IsNullOrEmpty(_adminKey) &&
        Request.Headers.TryGetValue("X-Admin-Key", out var key) &&
        key == _adminKey;

    // GET /api/v1/passages?category=10&page=1&pageSize=100
    [HttpGet]
    public async Task<IActionResult> GetPassages(
        [FromQuery] PostCategory? category,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 100)
    {
        // category 미지정 시 전체 지문 카테고리 대상은 지원하지 않음
        // 프론트에서 카테고리 지정해서 호출
        var result = await _postService.GetPostsAsync(category, page, pageSize);
        return Ok(ApiResponse<PagedResponse<PostDto>>.Ok(result));
    }

    // GET /api/v1/passages/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetPassage(int id)
    {
        var result = await _postService.GetPostByIdAsync(id);
        return Ok(ApiResponse<PostDto>.Ok(result));
    }

    // POST /api/v1/passages  (admin only)
    [HttpPost]
    public async Task<IActionResult> CreatePassage([FromBody] CreatePostDto dto)
    {
        if (!IsAdmin()) return Unauthorized401();
        if (!PassageCategories.Contains((int)dto.Category))
            return BadRequest(ApiResponse<object>.Fail("지문 카테고리가 아닙니다."));

        var result = await _postService.CreatePostAsync(AdminAuthorId, dto);
        return CreatedAtAction(nameof(GetPassage), new { id = result.Id },
            ApiResponse<PostDto>.Ok(result));
    }

    // PUT /api/v1/passages/{id}  (admin only)
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePassage(int id, [FromBody] UpdatePostDto dto)
    {
        if (!IsAdmin()) return Unauthorized401();
        var result = await _postService.UpdatePostAsync(id, dto);
        return Ok(ApiResponse<PostDto>.Ok(result));
    }

    // DELETE /api/v1/passages/{id}  (admin only)
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePassage(int id)
    {
        if (!IsAdmin()) return Unauthorized401();
        await _postService.DeletePostAsync(id);
        return Ok(ApiResponse<object>.Ok(null, "지문이 삭제되었습니다."));
    }

    // PUT /api/v1/passages/reorder  (admin only)
    [HttpPut("reorder")]
    public async Task<IActionResult> ReorderPassages([FromBody] List<ReorderPassageDto> orders)
    {
        if (!IsAdmin()) return Unauthorized401();
        await _postService.ReorderPassagesAsync(orders);
        return Ok(ApiResponse<object>.Ok(null, "순서가 업데이트되었습니다."));
    }
}
