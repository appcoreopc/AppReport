CREATE TABLE [dbo].[Report] (
    [ReportId]   INT            NOT NULL,
    [ReportName] NVARCHAR (200) NULL,
    [ReportCode] VARCHAR (20)   NULL,
    CONSTRAINT [PK_Report] PRIMARY KEY CLUSTERED ([ReportId] ASC)
);

