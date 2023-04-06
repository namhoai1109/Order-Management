/*
  Warnings:

  - You are about to drop the column `partnerId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `branchId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Order] DROP CONSTRAINT [Order_partnerId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Order] DROP COLUMN [partnerId];
ALTER TABLE [dbo].[Order] ADD [branchId] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[Order] ADD CONSTRAINT [Order_branchId_fkey] FOREIGN KEY ([branchId]) REFERENCES [dbo].[Branch]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
