CREATE TABLE [dbo].[Country] (
    [CountryId]   INT          NOT NULL,
    [CountryName] VARCHAR (20) NULL,
    CONSTRAINT [PK_Country] PRIMARY KEY CLUSTERED ([CountryId] ASC)
);

