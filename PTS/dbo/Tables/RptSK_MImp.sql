CREATE TABLE [dbo].[RptSK_MImp] (
    [TxnId]      INT             IDENTITY (1, 1) NOT NULL,
    [RptId]      INT             NULL,
    [F_ImpDate]  DATE            NULL,
    [F_CustomNo] VARCHAR (50)    NULL,
    [F_ImpWgt]   DECIMAL (10, 2) NULL,
    [F_ImpCost]  DECIMAL (18, 2) NULL,
    [F_GSTCost]  DECIMAL (18, 2) NULL,
    [Note]       NVARCHAR (MAX)  NULL,
    CONSTRAINT [PK_RptSK_MImpStk] PRIMARY KEY CLUSTERED ([TxnId] ASC)
);

