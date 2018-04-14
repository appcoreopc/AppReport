CREATE TABLE [dbo].[RptM1] (
    [RptId]              INT             IDENTITY (1, 1) NOT NULL,
    [RptStatusId]        INT             NULL,
    [RptDate]            DATE            NULL,
    [RefNo]              VARCHAR (50)    NULL,
    [LetterDate]         DATETIME        NULL,
    [F_CoName]           NVARCHAR (50)   NULL,
    [F_CoRegNo]          VARCHAR (20)    NULL,
    [F_CoAdd1]           NVARCHAR (100)  NULL,
    [F_CoAdd2]           NVARCHAR (100)  NULL,
    [F_CoAdd3]           NVARCHAR (100)  NULL,
    [F_CoAdd4]           NVARCHAR (100)  NULL,
    [F_CoTel]            VARCHAR (20)    NULL,
    [F_CoFax]            VARCHAR (20)    NULL,
    [F_CoEmail]          VARCHAR (20)    NULL,
    [F_CoWebsite]        NVARCHAR (50)   NULL,
    [F_CoLogo]           VARCHAR (50)    NULL,
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
    [SignedByPos]        NVARCHAR (50)   NULL,
    [SignedByName]       NVARCHAR (50)   NULL,
    [SignedByIDNo]       VARCHAR (20)    NULL,
    [SignedDate]         DATE            NULL,
    [LicenseNo]          VARCHAR (50)    NULL,
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
    [CreatedByPos]       NVARCHAR (50)   NULL,
    [CreatedByName]      NVARCHAR (50)   NULL,
    [CreatedByIDNo]      VARCHAR (20)    NULL,
    [AppdByEmpId]        INT             NULL,
    [AppdByPos]          NVARCHAR (50)   NULL,
    [AppdByName]         NVARCHAR (50)   NULL,
    [AppdByIDNo]         VARCHAR (20)    NULL,
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






















GO


CREATE TRIGGER [dbo].[RptM1_Insert]
       ON [dbo].[RptM1]
AFTER INSERT,UPDATE
AS
BEGIN
SET NOCOUNT ON;
   

declare @RptId as int, 
@RptDate as datetime,
@PrevRptDate as datetime,
@PrevRptId as int, 
@OpenBal as decimal(10,2),
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
@F_CoGSTNo as varchar(20),
@TotalFreightRMCost as decimal(18,2),
@RMDutyImp as decimal(18,2),
@RMGST as decimal(18,2),
@F_ImpWgt as decimal(10,2),
@F_ImpFreightCost as decimal(18,2),
@F_LocWgt as decimal(10,2),
@F_LocFreightCost as decimal(18,2),  
@F_CloseBal as decimal(10,2),
@F_TotalRM as decimal(10,2),
@F_WastedCost as decimal(18,2),  
@F_UsedCost as decimal(18,2),
@DutyExcise as decimal(18,2) 
 
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
Set @PrevRptDate = dateadd(month,-1, @RptDate)

select top 1 @PrevRptId = RptId, @OpenBal = F_CloseBal
from RptM1 with (nolock)
where Month(RptDate) = Month(@PrevRptDate)
 and Year(RptDate) = Year(@PrevRptDate)
 --and RptStatusId = 3 

select @TotalFreightRMCost = sum(isnull(TotalFreightRMCost,0)),
@RMDutyImp = sum(isnull(DutyImp,0)),
@RMGST = sum(isnull(GST,0)),
@DutyExcise = sum(isnull(DutyExcise,0))
from GRN g with (nolock) 
where Month(g.GRNDate) = Month(@RptDate)
	and Year(g.GRNDate) = Year(@RptDate)  

update RptM1
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
F_OpenBal = isnull(@OpenBal,0),
PurchRM = @TotalFreightRMCost, 
RMDutyImp = @RMDutyImp,
RMGST = @RMGST,
F_RMTaxLost = isnull(@RMDutyImp,0) + isnull(@RMGST,0),
F_EqTaxLost = isnull(EqDutyImp,0) + isnull(EqGST,0),
RMDutyExcise = @DutyExcise
where RptId = @RptId

update RptM1 
set F_SumDutyImp = isnull(RMDutyImp,0) + isnull(EqDutyImp,0),  
F_SumGST = isnull(RMGST,0) + isnull(EqGST,0),  
F_SumTaxLost = isnull(F_RMTaxLost,0) + isnull(F_EqTaxLost,0),   
F_SumDutyExcise = isnull(RMDutyExcise,0) + isnull(EqDutyExcise,0)
where RptId = @RptId


if(not exists(select 1 from RptM1_MStk where RptId = @RptId))
begin
   
   IF NOT EXISTS (SELECT 1 FROM deleted)
   begin
		insert into RptM1_MStk (RptId, RMId, F_RMCatName, F_RMDesc, F_UOMCode, F_TariffCode, F_OpenBal, UsedCost, WastedCost, F_TotalRM, F_CloseBal)
		select @RptId, rm.RMId, rc.RMCatName, rm.RMDesc, um.UomCode,  rc.TariffCode,
			(select top 1 F_CloseBal from RptM1_MStk a with (nolock) where RptId = @PrevRptId and a.RMId= rm.RMId),
			0, 0, 0, 0
		from RMaterial rm with (nolock) 
		left join RMCat rc with (nolock) on rc.RMCatId = rm.RMCatId
		left join UOM um with (nolock) on um.UomId = rm.UomId  


		insert into RptM1_MStkInv (RptId, MStkId, InvoiceNo, F_ImpWgt, F_ImpFreightCost, F_LocWgt, F_LocFreightCost)
		select @RptId, (select top 1 MStkId from RptM1_MStk a with (nolock) 
						where a.RptId = @RptId and a.RMId = g.RMId), 
		g.InvoiceNo, 
		case when c.IsLocal = 0 then g.Wgt end,
		case when c.IsLocal = 0 then g.TotalFreightRMCost end,
		case when c.IsLocal = 1 then g.Wgt end,
		case when c.IsLocal = 1 then g.Amount end
		from GRN g with (nolock)
			left join STNCustom c with (nolock) on g.STNCustomId = c.STNCustomId
		where Month(g.GRNDate) = Month(@RptDate)
			and Year(g.GRNDate) = Year(@RptDate) 
	  
	
		DECLARE @temp1 TABLE (MStkId int, TotalKg decimal(10,2))
		
		insert into @temp1 (MStkId, TotalKg)
		select MStkId, sum(isnull(F_ImpWgt,0)) + sum(isnull(F_LocWgt,0)) as TotalKg 
		from RptM1_MStkInv
		where RptId = @RptId
		group by MStkId
	  
		/*UPDATE t
		SET t.F_TotalRM = isnull(o.TotalKg,0) + isnull(t.F_OpenBal,0) 
		FROM @temp1 o 
			JOIN RptM1_MStk t with (nolock) ON t.MStkId = o.MStkId
		WHERE t.RptId = @RptId */

		update RptM1_MStk 
		set F_TotalRM = isnull((select o.TotalKg from @temp1 o where o.MStkId = RptM1_MStk.MStkId),0) + isnull(F_OpenBal,0) 
		WHERE RptId = @RptId 
	
		UPDATE RptM1_MStk
		SET F_CloseBal = F_TotalRM - (WastedCost + UsedCost) 
		WHERE RptId = @RptId
	 
    end
	 
	select @F_ImpWgt = sum(isnull(F_ImpWgt,0)),  @F_ImpFreightCost = sum(isnull(F_ImpFreightCost,0)), 
	@F_LocWgt = sum(isnull(F_LocWgt,0)),  @F_LocFreightCost = sum(isnull(F_LocFreightCost,0))
	from RptM1_MStkInv with (nolock) 
	WHERE RptId = @RptId

	select @F_TotalRM = sum(isnull(F_TotalRM,0)),  @F_CloseBal = sum(isnull(F_CloseBal,0)),
	@F_UsedCost = sum(isnull(UsedCost,0)), @F_WastedCost = sum(isnull(WastedCost,0))
	from RptM1_MStk with (nolock) 
	WHERE RptId = @RptId
	
	update RptM1 
	set F_ImpWgt = @F_ImpWgt, F_ImpFreightCost = @F_ImpFreightCost,
	F_LocalWgt = @F_LocWgt, F_LocalFreightCost = @F_LocFreightCost,
	F_TotalRM = @F_TotalRM, F_CloseBal = @F_CloseBal,
	F_WastedCost = @F_WastedCost, F_UsedCost = @F_UsedCost
	where RptId = @RptId 
	 
	 
end

 


END