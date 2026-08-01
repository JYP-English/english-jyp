using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EnglishTutorPlatform.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddSortOrderToPost : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SortOrder",
                table: "posts",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SortOrder",
                table: "posts");
        }
    }
}
