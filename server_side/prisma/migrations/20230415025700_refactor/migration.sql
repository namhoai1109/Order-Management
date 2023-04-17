/*
  Warnings:

  - A unique constraint covering the columns `[licensePlate]` on the table `Shipper` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Shipper] ADD CONSTRAINT [Shipper_licensePlate_key] UNIQUE NONCLUSTERED ([licensePlate]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
