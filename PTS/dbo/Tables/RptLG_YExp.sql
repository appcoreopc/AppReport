CREATE TABLE [dbo].[RptLG_YExp] (
    [TxnId]        INT             IDENTITY (1, 1) NOT NULL,
    [RptId]        INT             NULL,
    [RptY]         INT             NULL,
    [StkDesc]      NVARCHAR (500)  NULL,
    [TariffCode]   VARCHAR (50)    NULL,
    [OpenBalQty]   DECIMAL (10, 2) NULL,
    [OpenBalCost]  DECIMAL (18, 2) NULL,
    [MadeQty]      DECIMAL (10, 2) NULL,
    [MadeCost]     DECIMAL (18, 2) NULL,
    [ExpQty]       DECIMAL (10, 2) NULL,
    [ExpCost]      DECIMAL (18, 2) NULL,
    [LocSalesQty]  DECIMAL (10, 2) NULL,
    [LocSalesCost] DECIMAL (18, 2) NULL,
    [DamagedQty]   DECIMAL (10, 2) NULL,
    [DamagedCost]  DECIMAL (18, 2) NULL,
    [CloseBalQty]  DECIMAL (10, 2) NULL,
    [CloseBalCost] DECIMAL (18, 2) NULL,
    CONSTRAINT [PK_ptLG_YExpStk] PRIMARY KEY CLUSTERED ([TxnId] ASC)
);

