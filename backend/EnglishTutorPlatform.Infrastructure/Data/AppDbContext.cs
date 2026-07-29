using EnglishTutorPlatform.Core.Entities;
using EnglishTutorPlatform.Core.Enums;
using Microsoft.EntityFrameworkCore;

namespace EnglishTutorPlatform.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<TutorProfile> TutorProfiles => Set<TutorProfile>();
    public DbSet<Post> Posts => Set<Post>();
    public DbSet<Inquiry> Inquiries => Set<Inquiry>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(e =>
        {
            e.ToTable("users");
            e.HasKey(u => u.Id);
            e.Property(u => u.Id).ValueGeneratedOnAdd();
            e.Property(u => u.Email).HasMaxLength(255).IsRequired();
            e.HasIndex(u => u.Email).IsUnique();
            e.Property(u => u.PasswordHash).HasMaxLength(500).IsRequired();
            e.Property(u => u.Name).HasMaxLength(100).IsRequired();
            e.Property(u => u.Phone).HasMaxLength(20);
            e.Property(u => u.School).HasMaxLength(100);
            e.Property(u => u.Role).HasConversion<short>();
            e.Property(u => u.CreatedAt).HasDefaultValueSql("NOW()");
            e.Property(u => u.UpdatedAt).HasDefaultValueSql("NOW()");
        });

        modelBuilder.Entity<RefreshToken>(e =>
        {
            e.ToTable("refresh_tokens");
            e.HasKey(r => r.Id);
            e.Property(r => r.Id).ValueGeneratedOnAdd();
            e.Property(r => r.Token).HasMaxLength(500).IsRequired();
            e.HasOne(r => r.User)
             .WithMany(u => u.RefreshTokens)
             .HasForeignKey(r => r.UserId)
             .OnDelete(DeleteBehavior.Cascade);
            e.Property(r => r.CreatedAt).HasDefaultValueSql("NOW()");
        });

        modelBuilder.Entity<TutorProfile>(e =>
        {
            e.ToTable("tutor_profile");
            e.HasKey(t => t.Id);
            e.Property(t => t.Id).ValueGeneratedOnAdd();
            e.Property(t => t.Career).HasColumnType("jsonb");
            e.Property(t => t.Achievements).HasColumnType("jsonb");
            e.Property(t => t.YoutubeUrl).HasMaxLength(500);
            e.Property(t => t.InstagramUrl).HasMaxLength(500);
            e.Property(t => t.ProfileImageUrl).HasMaxLength(1000);
            e.HasOne(t => t.User)
             .WithMany()
             .HasForeignKey(t => t.UserId);
            e.Property(t => t.UpdatedAt).HasDefaultValueSql("NOW()");
        });

        modelBuilder.Entity<Post>(e =>
        {
            e.ToTable("posts");
            e.HasKey(p => p.Id);
            e.Property(p => p.Id).ValueGeneratedOnAdd();
            e.Property(p => p.Title).HasMaxLength(300).IsRequired();
            e.Property(p => p.Category).HasConversion<short>();
            e.HasOne(p => p.Author)
             .WithMany()
             .HasForeignKey(p => p.AuthorId);
            e.Property(p => p.CreatedAt).HasDefaultValueSql("NOW()");
            e.Property(p => p.UpdatedAt).HasDefaultValueSql("NOW()");
        });

        modelBuilder.Entity<Inquiry>(e =>
        {
            e.ToTable("inquiries");
            e.HasKey(i => i.Id);
            e.Property(i => i.Id).ValueGeneratedOnAdd();
            e.Property(i => i.Name).HasMaxLength(100).IsRequired();
            e.Property(i => i.Phone).HasMaxLength(20).IsRequired();
            e.Property(i => i.Email).HasMaxLength(255);
            e.Property(i => i.School).HasMaxLength(100);
            e.Property(i => i.Status).HasConversion<short>();
            e.Property(i => i.CreatedAt).HasDefaultValueSql("NOW()");
        });
    }
}
