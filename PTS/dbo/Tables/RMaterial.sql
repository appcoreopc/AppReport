CREATE TABLE [dbo].[RMaterial] (
    [RMId]            INT            IDENTITY (1, 1) NOT NULL,
    [RMCode]          VARCHAR (50)   NULL,
    [RMCatId]         INT            NULL,
    [RMDesc]          NVARCHAR (500) NULL,
    [UOMId]           INT            NULL,
    [TariffCode]      VARCHAR (50)   NULL,
    [CountryList]     VARCHAR (100)  NULL,
    [DutyImpRate]     DECIMAL (5, 2) NULL,
    [GSTRate]         DECIMAL (5, 2) NULL,
    [CreatedByUserId] INT            NULL,
    [CreatedDT]       DATETIME       NULL,
    [EditedByUserId]  INT            NULL,
    [EditedDT]        DATETIME       NULL,
    CONSTRAINT [PK_Material] PRIMARY KEY CLUSTERED ([RMId] ASC)
);



