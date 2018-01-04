﻿CREATE TABLE [dbo].[RptM1] (
    [RptId]              INT             IDENTITY (1, 1) NOT NULL,
    [RptStatusId]        INT             NULL,
    [RptDate]            DATE            NULL,
    [RptMth]             INT             NULL,
    [RptYr]              INT             NULL,
    [RefNo]              VARCHAR (20)    NULL,
    [LetterDate]         DATETIME        NULL,
    [LRcptDept]          NVARCHAR (50)   NULL,
    [LRcptBr]            NVARCHAR (50)   NULL,
    [LRcptAdd1]          NVARCHAR (100)  NULL,
    [LRcptAdd2]          NVARCHAR (100)  NULL,
    [LRcptAdd3]          NVARCHAR (100)  NULL,
    [LRcptAdd4]          NVARCHAR (100)  NULL,
    [ExpQuota]           DECIMAL (5, 2)  NULL,
    [LocalSalesQuota]    DECIMAL (5, 2)  NULL,
    [GPBDate]            DATE            NULL,
    [PurchRM]            DECIMAL (18, 2) NULL,
    [PurchEq]            DECIMAL (18, 2) NULL,
    [SalesExpCont]       DECIMAL (18, 2) NULL,
    [SalesGPB]           DECIMAL (18, 2) NULL,
    [SalesFIZ]           DECIMAL (18, 2) NULL,
    [SalesLocal]         DECIMAL (18, 2) NULL,
    [SignedByEmpId]      INT             NULL,
    [F_SignedByPos]      NVARCHAR (50)   NULL,
    [F_SignedByName]     NVARCHAR (50)   NULL,
    [F_SignedByIDNo]     VARCHAR (20)    NULL,
    [SignedDate]         DATE            NULL,
    [RMDutyImp]          DECIMAL (18, 2) NULL,
    [RMGST]              DECIMAL (18, 2) NULL,
    [RMDutyExcise]       DECIMAL (18, 2) NULL,
    [F_RMTaxLost]        DECIMAL (18, 2) NULL,
    [EqDutyImp]          DECIMAL (18, 2) NULL,
    [EqGST]              DECIMAL (18, 2) NULL,
    [EqDutyExcise]       DECIMAL (18, 2) NULL,
    [F_EqTaxLost]        DECIMAL (18, 2) NULL,
    [F_SumDutyImp]       DECIMAL (18, 2) NULL,
    [F_SumGST]           DECIMAL (18, 2) NULL,
    [F_SumDutyExcise]    DECIMAL (18, 2) NULL,
    [F_SumTaxLost]       DECIMAL (18, 2) NULL,
    [CreatedByEmpId]     INT             NULL,
    [F_CreatedByPos]     NVARCHAR (50)   NULL,
    [F_CreatedByName]    NVARCHAR (50)   NULL,
    [F_CreatedByIDNo]    VARCHAR (20)    NULL,
    [AppdByEmpId]        INT             NULL,
    [F_AppdByPos]        NVARCHAR (50)   NULL,
    [F_AppdByName]       NVARCHAR (50)   NULL,
    [F_AppdByIDNo]       VARCHAR (20)    NULL,
    [F_OpenBal]          DECIMAL (10, 2) NULL,
    [F_ImpWgt]           DECIMAL (10, 2) NULL,
    [F_ImpFreightCost]   DECIMAL (18, 2) NULL,
    [F_LocalWgt]         DECIMAL (10, 2) NULL,
    [F_LocalFreightCost] DECIMAL (18, 2) NULL,
    [F_UsedCost]         DECIMAL (18, 2) NULL,
    [F_WastedCost]       DECIMAL (18, 2) NULL,
    [F_TotalRM]          DECIMAL (10, 2) NULL,
    [F_CloseBal]         DECIMAL (10, 2) NULL,
    [CreatedByUserId]    INT             NULL,
    [CreatedDT]          DATETIME        NULL,
    [EditedByUserId]     INT             NULL,
    [EditedDT]           DATETIME        NULL,
    CONSTRAINT [PK_RptM1_1] PRIMARY KEY CLUSTERED ([RptId] ASC)
);

