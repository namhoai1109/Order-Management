/*
  Warnings:

  - The primary key for the `Rating` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Rating] DROP CONSTRAINT [Rating_pkey];
ALTER TABLE [dbo].[Rating] ADD CONSTRAINT Rating_pkey PRIMARY KEY CLUSTERED ([dishId],[customerId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
