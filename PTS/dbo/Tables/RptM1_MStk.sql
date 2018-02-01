CREATE TABLE [dbo].[RptM1_MStk] (
    [MStkId]       INT             IDENTITY (1, 1) NOT NULL,
    [RptId]        INT             NULL,
    [RMId]         INT             NULL,
    [F_RMCatName]  NVARCHAR (100)  NULL,
    [F_RMDesc]     NCHAR (10)      NULL,
    [F_UOMCode]    NVARCHAR (10)   NULL,
    [F_TariffCode] VARCHAR (50)    NULL,
    [F_OpenBal]    DECIMAL (10, 2) NULL,
    [UsedCost]     DECIMAL (18, 2) NULL,
    [WastedCost]   DECIMAL (18, 2) NULL,
    [F_TotalRM]    DECIMAL (10, 2) NULL,
    [F_CloseBal]   DECIMAL (10, 2) NULL,
    CONSTRAINT [PK_RptM1Trans] PRIMARY KEY CLUSTERED ([MStkId] ASC)
);



