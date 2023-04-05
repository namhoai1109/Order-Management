/*
  Warnings:

  - You are about to drop the column `image` on the `DishDetail` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[DishDetail] DROP COLUMN [image];

-- CreateTable
CREATE TABLE [dbo].[Image] (
    [id] INT NOT NULL IDENTITY(1,1),
    [dishId] INT NOT NULL,
    [filename] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Image_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Image] ADD CONSTRAINT [Image_dishId_fkey] FOREIGN KEY ([dishId]) REFERENCES [dbo].[Dish]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
