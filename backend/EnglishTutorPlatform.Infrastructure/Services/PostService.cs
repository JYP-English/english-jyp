using EnglishTutorPlatform.Core.DTOs.Common;
using EnglishTutorPlatform.Core.DTOs.Posts;
using EnglishTutorPlatform.Core.Entities;
using EnglishTutorPlatform.Core.Enums;
using EnglishTutorPlatform.Core.Interfaces;
using EnglishTutorPlatform.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EnglishTutorPlatform.Infrastructure.Services;

public class PostService : IPostService
{
    private readonly AppDbContext _db;

    public PostService(AppDbContext db) => _db = db;

    public async Task<PagedResponse<PostDto>> GetPostsAsync(PostCategory? category, int page, int pageSize)
    {
        var query = _db.Posts.Include(p => p.Author).AsQueryable();

        if (category.HasValue)
            query = query.Where(p => p.Category == category.Value);

        query = query.OrderByDescending(p => p.IsPinned)
                     .ThenByDescending(p => p.CreatedAt);

        var total = await query.CountAsync();
        var items = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

        return new PagedResponse<PostDto>
        {
            Items = items.Select(Map).ToList(),
            TotalCount = total,
            Page = page,
            PageSize = pageSize
        };
    }

    public async Task<PostDto> GetPostByIdAsync(int id)
    {
        var post = await _db.Posts.Include(p => p.Author).FirstOrDefaultAsync(p => p.Id == id)
            ?? throw new KeyNotFoundException("게시글을 찾을 수 없습니다.");

        post.ViewCount++;
        await _db.SaveChangesAsync();

        return Map(post);
    }

    public async Task<PostDto> CreatePostAsync(int authorId, CreatePostDto dto)
    {
        var post = new Post
        {
            AuthorId = authorId,
            Category = dto.Category,
            Title = dto.Title,
            Content = dto.Content,
            IsPinned = dto.IsPinned
        };

        _db.Posts.Add(post);
        await _db.SaveChangesAsync();
        await _db.Entry(post).Reference(p => p.Author).LoadAsync();

        return Map(post);
    }

    public async Task<PostDto> UpdatePostAsync(int id, UpdatePostDto dto)
    {
        var post = await _db.Posts.Include(p => p.Author).FirstOrDefaultAsync(p => p.Id == id)
            ?? throw new KeyNotFoundException("게시글을 찾을 수 없습니다.");

        if (dto.Category.HasValue) post.Category = dto.Category.Value;
        if (dto.Title != null) post.Title = dto.Title;
        if (dto.Content != null) post.Content = dto.Content;
        if (dto.IsPinned.HasValue) post.IsPinned = dto.IsPinned.Value;
        post.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        return Map(post);
    }

    public async Task DeletePostAsync(int id)
    {
        var post = await _db.Posts.FindAsync(id)
            ?? throw new KeyNotFoundException("게시글을 찾을 수 없습니다.");
        _db.Posts.Remove(post);
        await _db.SaveChangesAsync();
    }

    private static PostDto Map(Post p) => new()
    {
        Id = p.Id,
        AuthorName = p.Author?.Name ?? "",
        Category = p.Category,
        Title = p.Title,
        Content = p.Content,
        IsPinned = p.IsPinned,
        ViewCount = p.ViewCount,
        CreatedAt = p.CreatedAt,
        UpdatedAt = p.UpdatedAt
    };
}
