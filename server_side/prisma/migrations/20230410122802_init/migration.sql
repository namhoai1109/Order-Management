BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Account] (
    [id] INT NOT NULL IDENTITY(1,1),
    [username] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000),
    [phone] NVARCHAR(1000),
    [bankAccount] NVARCHAR(1000),
    [nationalId] NVARCHAR(1000),
    [role] NVARCHAR(1000) NOT NULL,
    [isConfirmed] BIT NOT NULL CONSTRAINT [Account_isConfirmed_df] DEFAULT 0,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [Account_status_df] DEFAULT 'active',
    CONSTRAINT [Account_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Account_username_key] UNIQUE NONCLUSTERED ([username])
);

-- CreateTable
CREATE TABLE [dbo].[Staff] (
    [id] INT NOT NULL IDENTITY(1,1),
    [accountId] INT,
    [name] NVARCHAR(1000) NOT NULL,
    [address] NVARCHAR(1000),
    CONSTRAINT [Staff_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Staff_accountId_key] UNIQUE NONCLUSTERED ([accountId])
);

-- CreateTable
CREATE TABLE [dbo].[Customer] (
    [id] INT NOT NULL IDENTITY(1,1),
    [accountId] INT,
    [name] NVARCHAR(1000) NOT NULL,
    [address] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Customer_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Customer_accountId_key] UNIQUE NONCLUSTERED ([accountId])
);

-- CreateTable
CREATE TABLE [dbo].[Partner] (
    [id] INT NOT NULL IDENTITY(1,1),
    [accountId] INT,
    [brandName] NVARCHAR(1000) NOT NULL,
    [taxCode] NVARCHAR(1000) NOT NULL,
    [representative] NVARCHAR(1000),
    [orderQuantity] INT,
    [status] NVARCHAR(1000),
    [culinaryStyle] NVARCHAR(1000),
    CONSTRAINT [Partner_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Partner_accountId_key] UNIQUE NONCLUSTERED ([accountId]),
    CONSTRAINT [Partner_taxCode_key] UNIQUE NONCLUSTERED ([taxCode])
);

-- CreateTable
CREATE TABLE [dbo].[Shipper] (
    [id] INT NOT NULL IDENTITY(1,1),
    [accountId] INT,
    [districtId] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [address] NVARCHAR(1000),
    [licensePlate] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Shipper_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Shipper_accountId_key] UNIQUE NONCLUSTERED ([accountId])
);

-- CreateTable
CREATE TABLE [dbo].[Contract] (
    [id] INT NOT NULL IDENTITY(1,1),
    [partnerId] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Contract_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [confirmedAt] DATETIME2,
    [expiredAt] DATETIME2,
    [isConfirmed] BIT NOT NULL CONSTRAINT [Contract_isConfirmed_df] DEFAULT 0,
    [isExpired] BIT NOT NULL CONSTRAINT [Contract_isExpired_df] DEFAULT 0,
    [taxCode] NVARCHAR(1000) NOT NULL,
    [representative] NVARCHAR(1000),
    [accessCode] NVARCHAR(1000),
    [bankAccount] NVARCHAR(1000),
    [commission] FLOAT(53) NOT NULL CONSTRAINT [Contract_commission_df] DEFAULT 0.1,
    [effectTimeInYear] INT NOT NULL CONSTRAINT [Contract_effectTimeInYear_df] DEFAULT 1,
    [branchQuantity] INT,
    CONSTRAINT [Contract_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Contract_partnerId_key] UNIQUE NONCLUSTERED ([partnerId]),
    CONSTRAINT [Contract_taxCode_key] UNIQUE NONCLUSTERED ([taxCode]),
    CONSTRAINT [Contract_accessCode_key] UNIQUE NONCLUSTERED ([accessCode]),
    CONSTRAINT [Contract_bankAccount_key] UNIQUE NONCLUSTERED ([bankAccount])
);

-- CreateTable
CREATE TABLE [dbo].[Branch] (
    [id] INT NOT NULL IDENTITY(1,1),
    [partnerId] INT NOT NULL,
    [districtId] INT NOT NULL,
    [orderQuantity] INT,
    [address] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Branch_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Branch_address_key] UNIQUE NONCLUSTERED ([address])
);

-- CreateTable
CREATE TABLE [dbo].[Dish] (
    [id] INT NOT NULL IDENTITY(1,1),
    [partnerId] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    [status] NVARCHAR(1000),
    [rating] INT,
    CONSTRAINT [Dish_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[DishDetail] (
    [id] INT NOT NULL IDENTITY(1,1),
    [dishId] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [quantity] INT,
    CONSTRAINT [DishDetail_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Image] (
    [id] INT NOT NULL IDENTITY(1,1),
    [dishId] INT NOT NULL,
    [filename] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Image_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Order] (
    [id] INT NOT NULL IDENTITY(1,1),
    [customerId] INT NOT NULL,
    [shipperId] INT,
    [branchId] INT,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Order_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [deliveredAt] DATETIME2,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [Order_status_df] DEFAULT 'pending',
    [process] NVARCHAR(1000) NOT NULL CONSTRAINT [Order_process_df] DEFAULT 'pending',
    [orderPrice] FLOAT(53),
    [shippingPrice] FLOAT(53),
    [orderCode] NVARCHAR(1000),
    CONSTRAINT [Order_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Order_orderCode_key] UNIQUE NONCLUSTERED ([orderCode])
);

-- CreateTable
CREATE TABLE [dbo].[OrderDetail] (
    [id] INT NOT NULL IDENTITY(1,1),
    [orderId] INT NOT NULL,
    [dishName] NVARCHAR(1000) NOT NULL,
    [dishDetail] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [quantity] INT NOT NULL,
    CONSTRAINT [OrderDetail_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[City] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [City_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [City_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[District] (
    [id] INT NOT NULL IDENTITY(1,1),
    [cityId] INT NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [District_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Rating] (
    [isLike] BIT NOT NULL,
    [description] NVARCHAR(1000),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Rating_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2,
    [customerId] INT NOT NULL,
    [dishId] INT NOT NULL,
    CONSTRAINT [Rating_pkey] PRIMARY KEY CLUSTERED ([customerId],[dishId])
);

-- AddForeignKey
ALTER TABLE [dbo].[Staff] ADD CONSTRAINT [Staff_accountId_fkey] FOREIGN KEY ([accountId]) REFERENCES [dbo].[Account]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Customer] ADD CONSTRAINT [Customer_accountId_fkey] FOREIGN KEY ([accountId]) REFERENCES [dbo].[Account]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Partner] ADD CONSTRAINT [Partner_accountId_fkey] FOREIGN KEY ([accountId]) REFERENCES [dbo].[Account]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Shipper] ADD CONSTRAINT [Shipper_accountId_fkey] FOREIGN KEY ([accountId]) REFERENCES [dbo].[Account]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Shipper] ADD CONSTRAINT [Shipper_districtId_fkey] FOREIGN KEY ([districtId]) REFERENCES [dbo].[District]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Contract] ADD CONSTRAINT [Contract_partnerId_fkey] FOREIGN KEY ([partnerId]) REFERENCES [dbo].[Partner]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Branch] ADD CONSTRAINT [Branch_partnerId_fkey] FOREIGN KEY ([partnerId]) REFERENCES [dbo].[Partner]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Branch] ADD CONSTRAINT [Branch_districtId_fkey] FOREIGN KEY ([districtId]) REFERENCES [dbo].[District]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Dish] ADD CONSTRAINT [Dish_partnerId_fkey] FOREIGN KEY ([partnerId]) REFERENCES [dbo].[Partner]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[DishDetail] ADD CONSTRAINT [DishDetail_dishId_fkey] FOREIGN KEY ([dishId]) REFERENCES [dbo].[Dish]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Image] ADD CONSTRAINT [Image_dishId_fkey] FOREIGN KEY ([dishId]) REFERENCES [dbo].[Dish]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Order] ADD CONSTRAINT [Order_customerId_fkey] FOREIGN KEY ([customerId]) REFERENCES [dbo].[Customer]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Order] ADD CONSTRAINT [Order_shipperId_fkey] FOREIGN KEY ([shipperId]) REFERENCES [dbo].[Shipper]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Order] ADD CONSTRAINT [Order_branchId_fkey] FOREIGN KEY ([branchId]) REFERENCES [dbo].[Branch]([id]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[OrderDetail] ADD CONSTRAINT [OrderDetail_orderId_fkey] FOREIGN KEY ([orderId]) REFERENCES [dbo].[Order]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[District] ADD CONSTRAINT [District_cityId_fkey] FOREIGN KEY ([cityId]) REFERENCES [dbo].[City]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Rating] ADD CONSTRAINT [Rating_customerId_fkey] FOREIGN KEY ([customerId]) REFERENCES [dbo].[Customer]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Rating] ADD CONSTRAINT [Rating_dishId_fkey] FOREIGN KEY ([dishId]) REFERENCES [dbo].[Dish]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
