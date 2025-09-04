using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FypPronouncerPro.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddContentInUserLessons : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LessonContent",
                table: "UserLessons",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LessonContent",
                table: "UserLessons");
        }
    }
}
