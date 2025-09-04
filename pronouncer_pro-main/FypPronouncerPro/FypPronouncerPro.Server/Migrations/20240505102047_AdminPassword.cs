using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FypPronouncerPro.Server.Migrations
{
    /// <inheritdoc />
    public partial class AdminPassword : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AdminPassword",
                table: "Admin",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdminPassword",
                table: "Admin");
        }
    }
}
