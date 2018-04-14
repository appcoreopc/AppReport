CREATE TABLE [dbo].[RptSK] (
    [RptId]             INT             IDENTITY (1, 1) NOT NULL,
    [RptStatusId]       INT             NULL,
    [F_CoName]          NVARCHAR (50)   NULL,
    [F_CoRegNo]         VARCHAR (20)    NULL,
    [F_CoAdd1]          NVARCHAR (100)  NULL,
    [F_CoAdd2]          NVARCHAR (100)  NULL,
    [F_CoAdd3]          NVARCHAR (100)  NULL,
    [F_CoAdd4]          NVARCHAR (100)  NULL,
    [F_CoTel]           VARCHAR (20)    NULL,
    [F_CoFax]           VARCHAR (20)    NULL,
    [F_CoEmail]         VARCHAR (20)    NULL,
    [F_CoWebsite]       NVARCHAR (50)   NULL,
    [F_CoLogo]          VARCHAR (50)    NULL,
    [F_CoSPLNo]         VARCHAR (20)    NULL,
    [F_CoGSTNo]         VARCHAR (20)    NULL,
    [RptDate]           DATETIME        NULL,
    [RefNo]             VARCHAR (50)    NULL,
    [LetterDate]        DATETIME        NULL,
    [LRcptDept]         NVARCHAR (50)   NULL,
    [LRcptBr]           NVARCHAR (50)   NULL,
    [LRcptAdd1]         NVARCHAR (100)  NULL,
    [LRcptAdd2]         NVARCHAR (100)  NULL,
    [LRcptAdd3]         NVARCHAR (100)  NULL,
    [LRcptAdd4]         NVARCHAR (100)  NULL,
    [SignedByEmpId]     INT             NULL,
    [SignedByPos]       NVARCHAR (50)   NULL,
    [SignedByName]      NVARCHAR (50)   NULL,
    [SignedByIDNo]      VARCHAR (20)    NULL,
    [SignedDate]        DATE            NULL,
    [F_ImpCost]         DECIMAL (18, 2) NULL,
    [F_GSTCost]         DECIMAL (18, 2) NULL,
    [SignedByEmpId_Imp] INT             NULL,
    [SignedByName_Imp]  NVARCHAR (50)   NULL,
    [SignedByIDNo_Imp]  VARCHAR (20)    NULL,
    [SignedByPos_Imp]   NVARCHAR (50)   NULL,
    [CreatedByUserId]   INT             NULL,
    [CreatedDT]         DATETIME        NULL,
    [EditedByUserId]    INT             NULL,
    [EditedDT]          DATETIME        NULL,
    CONSTRAINT [PK_RptSK] PRIMARY KEY CLUSTERED ([RptId] ASC)
);


















GO

CREATE TRIGGER [dbo].[RptSK_Insert]
       ON [dbo].[RptSK]
AFTER INSERT, UPDATE
AS
BEGIN
SET NOCOUNT ON;
   

declare @RptId as int, 
@RptDate as datetime,
@F_CoName as nvarchar(50),
@F_CoRegNo as varchar(20),
@F_CoAdd1 as nvarchar(100),
@F_CoAdd2 as nvarchar(100),
@F_CoAdd3 as nvarchar(100),
@F_CoAdd4 as nvarchar(100),
@F_CoTel as varchar(20),
@F_CoFax as varchar(20),
@F_CoEmail as varchar(20),
@F_CoWebsite as nvarchar(50),
@F_CoLogo as varchar(50),
@F_CoSPLNo as varchar(20),
@F_CoGSTNo as varchar(20)
 
select top 1 @F_CoName = ConfigData
 from Config with (nolock)
where ModuleId = 0 and ConfigKey='CoName'
 
select top 1 @F_CoRegNo = ConfigData
 from Config with (nolock)
where ModuleId = 0 and ConfigKey='CoRegNo'
 
select top 1 @F_CoAdd1 = ConfigData
 from Config with (nolock)
where ModuleId = 0 and ConfigKey='CoAdd1'
 
select top 1 @F_CoAdd2 = ConfigData
 from Config with (nolock)
where ModuleId = 0 and ConfigKey='CoAdd2'
 
select top 1 @F_CoAdd3 = ConfigData
 from Config with (nolock)
where ModuleId = 0 and ConfigKey='CoAdd3'
 
select top 1 @F_CoAdd4 = ConfigData
 from Config with (nolock)
where ModuleId = 0 and ConfigKey='CoAdd4'
 
select top 1 @F_CoTel = ConfigData
 from Config with (nolock)
where ModuleId = 0 and ConfigKey='CoTel'

select top 1 @F_CoFax = ConfigData
 from Config with (nolock)
where ModuleId = 0 and ConfigKey='CoFax'

select top 1 @F_CoEmail = ConfigData
 from Config with (nolock)
where ModuleId = 0 and ConfigKey='CoEmail'

select top 1 @F_CoWebsite = ConfigData
 from Config with (nolock)
where ModuleId = 0 and ConfigKey='CoWebsite'

select top 1 @F_CoLogo = ConfigData
 from Config with (nolock)
where ModuleId = 0 and ConfigKey='CoLogo'
 
select top 1 @F_CoSPLNo = ConfigData
 from Config with (nolock)
where ModuleId = 0 and ConfigKey='CoSPLNo'
 
select top 1 @F_CoGSTNo = ConfigData
 from Config with (nolock)
where ModuleId = 0 and ConfigKey='CoGSTNo'
  
SELECT @RptId = RptId, @RptDate = RptDate
FROM inserted
 
set @RptDate = DATEFROMPARTS(year(@RptDate), month(@RptDate), 1) 

update RptSK
set RptDate = @RptDate,
F_CoName = @F_CoName,
F_CoRegNo = @F_CoRegNo,
F_CoAdd1 = @F_CoAdd1,
F_CoAdd2 = @F_CoAdd2,
F_CoAdd3 = @F_CoAdd3,
F_CoAdd4 = @F_CoAdd4,
F_CoTel = @F_CoTel,
F_CoFax = @F_CoFax,
F_CoEmail = @F_CoEmail,
F_CoWebsite = @F_CoWebsite,
F_CoLogo = @F_CoLogo,
F_CoSPLNo = @F_CoSPLNo,
F_CoGSTNo= @F_CoGSTNo
where RptId = @RptId

IF NOT EXISTS (SELECT 1 FROM deleted)
begin
	if(not exists(select 1 from RptSK_MImp where RptId = @RptId))
	begin

		insert into RptSK_MImp (RptId, F_ImpDate, F_CustomNo, F_ImpWgt, F_ImpCost, F_GSTCost)
		select  @RptId, GRNDate, CustomNo, sum(KASWgt), sum(CIF), sum(GST)
		from GRN with (nolock)
		where Month(GRNDate) = Month(@RptDate)
		and Year(GRNDate) = Year(@RptDate)
		Group By GRNDate, CustomNo
		order by GRNDate, CustomNo 

	end
end


	declare @SumImpCost as decimal(18,2), 
	@SumGSTCost as decimal(18,2);

	select @SumImpCost = sum(F_ImpCost), @SumGSTCost = sum(F_GSTCost)
	from RptSK_MImp with (nolock)
	where RptId= @RptId

    update RptSK 
	set F_ImpCost = @SumImpCost, F_GSTCost = @SumGSTCost
	where RptId= @RptId


END