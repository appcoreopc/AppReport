CREATE TABLE [dbo].[JobTitle] (
    [JobTitleId]      INT           NOT NULL,
    [JobTitleName]    NVARCHAR (50) NULL,
    [CreatedByUserId] INT           NULL,
    [CreatedDT]       DATETIME      NULL,
    [EditedByUserId]  INT           NULL,
    [EditedDT]        DATETIME      NULL,
    CONSTRAINT [PK_JobTitle] PRIMARY KEY CLUSTERED ([JobTitleId] ASC)
);

