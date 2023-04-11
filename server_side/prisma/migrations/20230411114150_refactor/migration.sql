/*
  Warnings:

  - You are about to drop the column `dishDetail` on the `OrderDetail` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `OrderDetail` table. All the data in the column will be lost.
  - Added the required column `dishDetailName` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[OrderDetail] DROP COLUMN [dishDetail],
[price];
ALTER TABLE [dbo].[OrderDetail] ADD [dishDetailName] NVARCHAR(1000) NOT NULL,
[totalPrice] FLOAT(53) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
