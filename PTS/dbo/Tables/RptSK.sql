CREATE TABLE [dbo].[RptSK] (
    [RptId]            INT             IDENTITY (1, 1) NOT NULL,
    [RptStatusId]      INT             NULL,
    [F_CoName]         NVARCHAR (50)   NULL,
    [F_CoRegNo]        VARCHAR (20)    NULL,
    [F_CoAdd1]         NVARCHAR (100)  NULL,
    [F_CoAdd2]         NVARCHAR (100)  NULL,
    [F_CoAdd3]         NVARCHAR (100)  NULL,
    [F_CoAdd4]         NVARCHAR (100)  NULL,
    [F_CoTel]          VARCHAR (20)    NULL,
    [F_CoFax]          VARCHAR (20)    NULL,
    [F_CoEmail]        VARCHAR (20)    NULL,
    [F_CoWebsite]      NVARCHAR (50)   NULL,
    [F_CoLogo]         VARCHAR (50)    NULL,
    [F_CoSPLNo]        VARCHAR (20)    NULL,
    [F_CoGSTNo]        VARCHAR (20)    NULL,
    [RptDate]          DATETIME        NULL,
    [RefNo]            VARCHAR (50)    NULL,
    [LetterDate]       DATETIME        NULL,
    [LRcptDept]        NVARCHAR (50)   NULL,
    [LRcptBr]          NVARCHAR (50)   NULL,
    [LRcptAdd1]        NVARCHAR (100)  NULL,
    [LRcptAdd2]        NVARCHAR (100)  NULL,
    [LRcptAdd3]        NVARCHAR (100)  NULL,
    [LRcptAdd4]        NVARCHAR (100)  NULL,
    [SignedByEmpId]    INT             NULL,
    [SignedByPos]      NVARCHAR (50)   NULL,
    [SignedByName]     NVARCHAR (50)   NULL,
    [SignedByIDNo]     VARCHAR (20)    NULL,
    [SignedDate]       DATE            NULL,
    [F_ImpCost]        DECIMAL (18, 2) NULL,
    [F_GSTCost]        DECIMAL (18, 2) NULL,
    [SignedByName_Imp] NVARCHAR (50)   NULL,
    [SignedByIDNo_Imp] VARCHAR (20)    NULL,
    [SignedByPos_Imp]  NVARCHAR (50)   NULL,
    [CreatedByUserId]  INT             NULL,
    [CreatedDT]        DATETIME        NULL,
    [EditedByUserId]   INT             NULL,
    [EditedDT]         DATETIME        NULL,
    CONSTRAINT [PK_RptSK] PRIMARY KEY CLUSTERED ([RptId] ASC)
);









