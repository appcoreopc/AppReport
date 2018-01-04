CREATE TABLE [dbo].[EmpJobTitle] (
    [EmpJobTitleId] INT IDENTITY (1, 1) NOT NULL,
    [EmpId]         INT NULL,
    [JobTitleId]    INT NOT NULL,
    CONSTRAINT [PK_EmpJobTitle] PRIMARY KEY CLUSTERED ([EmpJobTitleId] ASC)
);

