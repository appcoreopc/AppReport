CREATE TABLE [dbo].[RptLG_YBgt] (
    [TxnId]         INT             IDENTITY (1, 1) NOT NULL,
    [RptId]         INT             NULL,
    [IsLocal]       BIT             NULL,
    [RMId]          INT             NULL,
    [F_RMCatName]   NVARCHAR (100)  NULL,
    [F_RMDesc]      NVARCHAR (500)  NULL,
    [F_UOMCode]     NVARCHAR (10)   NULL,
    [F_TariffCode]  VARCHAR (50)    NULL,
    [F_CountryList] VARCHAR (50)    NULL,
    [Qty]           INT             NULL,
    [F_Cost]        DECIMAL (18, 2) NULL,
    [F_DutyImpRate] DECIMAL (5, 2)  NULL,
    [F_DutyImpCost] DECIMAL (18, 2) NULL,
    [F_GSTRate]     DECIMAL (5, 2)  NULL,
    [F_GSTCost]     DECIMAL (18, 2) NULL,
    [F_TaxCost]     DECIMAL (18, 2) NULL,
    CONSTRAINT [PK_RptLG_YBgtStk] PRIMARY KEY CLUSTERED ([TxnId] ASC)
);



