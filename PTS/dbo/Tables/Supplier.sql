CREATE TABLE [dbo].[Supplier] (
    [SupplierId]      INT            IDENTITY (1, 1) NOT NULL,
    [SupplierName]    NVARCHAR (100) NULL,
    [CreatedByUserId] INT            NULL,
    [CreatedDT]       DATETIME       NULL,
    [EditedByUserId]  INT            NULL,
    [EditedDT]        DATETIME       NULL,
    [SupplierCode]    NVARCHAR (100) NULL,
    [PhoneNo1]        NVARCHAR (100) NULL,
    [PhoneNo2]        NVARCHAR (100) NULL,
    [FaxNo]           NVARCHAR (100) NULL,
    [SupplierAd1]     NVARCHAR (100) NULL,
    [SupplierAd2]     NVARCHAR (100) NULL,
    [SupplierAd3]     NVARCHAR (100) NULL,
    [BankAccNo]       NVARCHAR (100) NULL,
    [BankName]        NVARCHAR (100) NULL,
    [BankAddress]     NVARCHAR (100) NULL,
    [Swift]           NVARCHAR (100) NULL,
    [CurrencyId]      INT            NULL,
    [PaymentTerms]    NVARCHAR (100) NULL,
    [Forwarder]       NVARCHAR (100) NULL,
    [DeliveryTerms]   NVARCHAR (100) NULL,
    [GSTNo]           NVARCHAR (100) NULL,
    [FactoryStatusId] INT            NULL,
    CONSTRAINT [PK_Supplier] PRIMARY KEY CLUSTERED ([SupplierId] ASC)
);



