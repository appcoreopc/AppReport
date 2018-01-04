CREATE TABLE [dbo].[RptLG_YImp] (
    [TxnId]          INT             IDENTITY (1, 1) NOT NULL,
    [RptId]          INT             NULL,
    [RptY]           INT             NULL,
    [RMId]           INT             NULL,
    [F_RMCatName]    NVARCHAR (100)  NULL,
    [F_RMDesc]       NCHAR (10)      NULL,
    [F_UOMCode]      NVARCHAR (10)   NULL,
    [F_TariffCode]   VARCHAR (50)    NULL,
    [F_OpenBalWgt]   DECIMAL (10, 2) NULL,
    [F_OpenBalCost]  DECIMAL (18, 2) NULL,
    [F_ImpRMWgt]     DECIMAL (10, 2) NULL,
    [F_ImpRMCost]    DECIMAL (18, 2) NULL,
    [F_LocRMWgt]     DECIMAL (10, 2) NULL,
    [F_LocRMCost]    DECIMAL (18, 2) NULL,
    [UsedRMWgt]      DECIMAL (10, 2) NULL,
    [UsedRMCost]     DECIMAL (18, 2) NULL,
    [ReturnedWgt]    DECIMAL (10, 2) NULL,
    [F_CloseBalWgt]  DECIMAL (10, 2) NULL,
    [F_CloseBalCost] DECIMAL (18, 2) NULL,
    CONSTRAINT [PK_RptLG_YImpRM] PRIMARY KEY CLUSTERED ([TxnId] ASC)
);

