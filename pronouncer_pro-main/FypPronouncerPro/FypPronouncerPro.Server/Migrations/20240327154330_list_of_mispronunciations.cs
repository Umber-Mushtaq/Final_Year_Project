using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FypPronouncerPro.Server.Migrations
{
    /// <inheritdoc />
    public partial class list_of_mispronunciations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "M_Word",
                table: "Mispronunciations");

            migrationBuilder.AlterColumn<string>(
                name: "M_How",
                table: "Mispronunciations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "M_What",
                table: "Mispronunciations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "M_What",
                table: "Mispronunciations");

            migrationBuilder.AlterColumn<string>(
                name: "M_How",
                table: "Mispronunciations",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "M_Word",
                table: "Mispronunciations",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
