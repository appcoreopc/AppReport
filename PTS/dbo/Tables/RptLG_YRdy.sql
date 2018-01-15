CREATE TABLE [dbo].[RptLG_YRdy] (
    [TxnId]       INT             IDENTITY (1, 1) NOT NULL,
    [RptId]       INT             NULL,
    [StkDesc]     NVARCHAR (500)  NULL,
    [TariffCode]  VARCHAR (50)    NULL,
    [Qty]         INT             NULL,
    [Cost]        DECIMAL (18, 2) NULL,
    [DutyImpRate] DECIMAL (5, 2)  NULL,
    [DutyImpCost] DECIMAL (18, 2) NULL,
    [GSTRate]     DECIMAL (5, 2)  NULL,
    [GSTCost]     DECIMAL (18, 2) NULL,
    [TaxCost]     DECIMAL (18, 2) NULL,
    CONSTRAINT [PK_RptLG_YRdyStk] PRIMARY KEY CLUSTERED ([TxnId] ASC)
);



