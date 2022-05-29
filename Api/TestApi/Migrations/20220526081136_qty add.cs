using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestApi.Migrations
{
    public partial class qtyadd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Qty",
                table: "SalesDetails",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "Qty",
                table: "PurchaseDetails",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Qty",
                table: "SalesDetails");

            migrationBuilder.DropColumn(
                name: "Qty",
                table: "PurchaseDetails");
        }
    }
}
