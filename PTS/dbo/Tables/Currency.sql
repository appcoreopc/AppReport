CREATE TABLE [dbo].[Currency] (
    [CurrencyId]   INT           NOT NULL,
    [CurrencyCode] VARCHAR (10)  NULL,
    [CurrencyName] NVARCHAR (20) NULL,
    CONSTRAINT [PK_Currency] PRIMARY KEY CLUSTERED ([CurrencyId] ASC)
);

