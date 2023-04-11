/*
  Warnings:

  - Added the required column `dishDetailId` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dishId` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[OrderDetail] ADD [dishDetailId] INT NOT NULL,
[dishId] INT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
