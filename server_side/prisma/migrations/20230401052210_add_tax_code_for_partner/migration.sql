/*
  Warnings:

  - A unique constraint covering the columns `[taxCode]` on the table `Partner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taxCode` to the `Partner` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Partner] ADD [taxCode] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[Partner] ADD CONSTRAINT [Partner_taxCode_key] UNIQUE NONCLUSTERED ([taxCode]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
