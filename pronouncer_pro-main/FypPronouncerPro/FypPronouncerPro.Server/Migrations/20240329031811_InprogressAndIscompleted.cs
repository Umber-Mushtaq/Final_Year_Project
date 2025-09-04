using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FypPronouncerPro.Server.Migrations
{
    /// <inheritdoc />
    public partial class InprogressAndIscompleted : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Status",
                table: "UserLessons",
                newName: "IsComplited");

            migrationBuilder.AddColumn<bool>(
                name: "InProgress",
                table: "UserLessons",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InProgress",
                table: "UserLessons");

            migrationBuilder.RenameColumn(
                name: "IsComplited",
                table: "UserLessons",
                newName: "Status");
        }
    }
}
