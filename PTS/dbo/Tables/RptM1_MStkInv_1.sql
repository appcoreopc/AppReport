CREATE TABLE [dbo].[RptM1_MStkInv] (
    [MStkInvId]        INT             IDENTITY (1, 1) NOT NULL,
    [RptId]            INT             NULL,
    [MStkId]           INT             NULL,
    [InvoiceNo]        VARCHAR (50)    NULL,
    [F_ImpWgt]         DECIMAL (10, 2) NULL,
    [F_ImpFreightCost] DECIMAL (18, 2) NULL,
    [F_LocWgt]         DECIMAL (10, 2) NULL,
    [F_LocFreightCost] DECIMAL (18, 2) NULL,
    CONSTRAINT [PK_RptM1_MStkInv] PRIMARY KEY CLUSTERED ([MStkInvId] ASC)
);

