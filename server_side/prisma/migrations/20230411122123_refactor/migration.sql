BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Order] ADD CONSTRAINT [Order_shippingPrice_df] DEFAULT 0 FOR [shippingPrice];
ALTER TABLE [dbo].[Order] ADD [totalPrice] FLOAT(53) CONSTRAINT [Order_totalPrice_df] DEFAULT 0;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
