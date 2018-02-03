CREATE TABLE [dbo].[Employee] (
    [EmpId]           INT            IDENTITY (1, 1) NOT NULL,
    [EmpName]         NVARCHAR (50)  NULL,
    [EmpIDNo]         VARCHAR (20)   NULL,
    [EmpAd1]          NVARCHAR (100) NULL,
    [EmpAd2]          NVARCHAR (100) NULL,
    [EmpAd3]          NVARCHAR (100) NULL,
    [JobTitleId]      INT            NULL,
    [CreatedByUserId] INT            NULL,
    [CreatedDT]       DATETIME       NULL,
    [EditedByUserId]  INT            NULL,
    [EditedDT]        DATETIME       NULL,
    CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED ([EmpId] ASC)
);



