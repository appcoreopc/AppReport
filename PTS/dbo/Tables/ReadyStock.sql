CREATE TABLE [dbo].[ReadyStock] (
    [ReadyStockId]    INT             IDENTITY (1, 1) NOT NULL,
    [ReadyStockDesc]  NVARCHAR (500)  NULL,
    [TariffCode]      VARCHAR (50)    NULL,
    [DutyImpRate]     DECIMAL (18, 2) NULL,
    [GSTRate]         DECIMAL (18, 2) NULL,
    [CreatedByUserId] INT             NULL,
    [CreatedDT]       DATETIME        NULL,
    [EditedByUserId]  INT             NULL,
    [EditedDT]        DATETIME        NULL,
    CONSTRAINT [PK_ReadyStock] PRIMARY KEY CLUSTERED ([ReadyStockId] ASC)
);

