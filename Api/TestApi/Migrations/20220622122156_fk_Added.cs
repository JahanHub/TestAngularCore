using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestApi.Migrations
{
    public partial class fk_Added : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Expenses_IdExpenseElement",
                table: "Expenses",
                column: "IdExpenseElement");

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_IdExpenseHead",
                table: "Expenses",
                column: "IdExpenseHead");

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_ExpenseElements_IdExpenseElement",
                table: "Expenses",
                column: "IdExpenseElement",
                principalTable: "ExpenseElements",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_ExpenseHeads_IdExpenseHead",
                table: "Expenses",
                column: "IdExpenseHead",
                principalTable: "ExpenseHeads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_ExpenseElements_IdExpenseElement",
                table: "Expenses");

            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_ExpenseHeads_IdExpenseHead",
                table: "Expenses");

            migrationBuilder.DropIndex(
                name: "IX_Expenses_IdExpenseElement",
                table: "Expenses");

            migrationBuilder.DropIndex(
                name: "IX_Expenses_IdExpenseHead",
                table: "Expenses");
        }
    }
}
