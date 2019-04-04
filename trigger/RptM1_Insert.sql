USE [PTS]
GO
/****** Object:  Trigger [dbo].[RptM1_Insert]    Script Date: 3/10/2019 12:03:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER TRIGGER [dbo].[RptM1_Insert]
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
		case when c.IsLocal = 0 then g.Wgt_1 end,
		case when c.IsLocal = 0 then g.TotalFreightRMCost end,
		case when c.IsLocal = 1 then g.Wgt_1 end,
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