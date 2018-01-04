CREATE TABLE [dbo].[Supplier] (
    [SupplierId]      INT            IDENTITY (1, 1) NOT NULL,
    [SupplierName]    NVARCHAR (100) NULL,
    [CreatedByUserId] INT            NULL,
    [CreatedDT]       DATETIME       NULL,
    [EditedByUserId]  INT            NULL,
    [EditedDT]        DATETIME       NULL,
    CONSTRAINT [PK_Supplier] PRIMARY KEY CLUSTERED ([SupplierId] ASC)
);

