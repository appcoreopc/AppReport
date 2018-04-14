CREATE TABLE [dbo].[RptLG] (
    [RptId]                 INT             IDENTITY (1, 1) NOT NULL,
    [RptStatusId]           INT             NULL,
    [F_CoName]              NVARCHAR (50)   NULL,
    [F_CoRegNo]             VARCHAR (20)    NULL,
    [F_CoAdd1]              NVARCHAR (100)  NULL,
    [F_CoAdd2]              NVARCHAR (100)  NULL,
    [F_CoAdd3]              NVARCHAR (100)  NULL,
    [F_CoAdd4]              NVARCHAR (100)  NULL,
    [F_CoTel]               VARCHAR (20)    NULL,
    [F_CoFax]               VARCHAR (20)    NULL,
    [F_CoEmail]             VARCHAR (20)    NULL,
    [F_CoWebsite]           NVARCHAR (50)   NULL,
    [F_CoLogo]              VARCHAR (50)    NULL,
    [RptY1]                 INT             NULL,
    [RptY2]                 INT             NULL,
    [RptSDate_Y1]           DATE            NULL,
    [RptEDate_Y1]           DATE            NULL,
    [RptSDate_Y2]           DATE            NULL,
    [RptEDate_Y2]           DATE            NULL,
    [RptSDate_Y3]           DATE            NULL,
    [RptEDate_Y3]           DATE            NULL,
    [RefNo]                 VARCHAR (50)    NULL,
    [LDate]                 DATETIME        NULL,
    [LRcptDept]             NVARCHAR (50)   NULL,
    [LRcptBr]               NVARCHAR (50)   NULL,
    [LRcptAdd1]             NVARCHAR (100)  NULL,
    [LRcptAdd2]             NVARCHAR (100)  NULL,
    [LRcptAdd3]             NVARCHAR (100)  NULL,
    [LRcptAdd4]             NVARCHAR (100)  NULL,
    [PBBCekNo]              NVARCHAR (50)   NULL,
    [LicenseFee]            DECIMAL (18, 2) NULL,
    [SignedByEmpId]         INT             NULL,
    [SignedByPos]           NVARCHAR (50)   NULL,
    [SignedByName]          NVARCHAR (50)   NULL,
    [SignedDate]            DATE            NULL,
    [AppByEmpId]            INT             NULL,
    [AppByPos]              NVARCHAR (50)   NULL,
    [AppByName]             NVARCHAR (50)   NULL,
    [AppByIDNo]             VARCHAR (20)    NULL,
    [AppCoName]             NVARCHAR (50)   NULL,
    [AppAdd1]               NVARCHAR (100)  NULL,
    [AppAdd2]               NVARCHAR (100)  NULL,
    [AppAdd3]               NVARCHAR (100)  NULL,
    [AppAdd4]               NVARCHAR (100)  NULL,
    [AppDate]               DATE            NULL,
    [BRcptDept]             NVARCHAR (50)   NULL,
    [BRcptBr]               NVARCHAR (50)   NULL,
    [BRcptAdd1]             NVARCHAR (100)  NULL,
    [BRcptAdd2]             NVARCHAR (100)  NULL,
    [BRcptAdd3]             NVARCHAR (100)  NULL,
    [BRcptAdd4]             NVARCHAR (100)  NULL,
    [RptCoName]             NVARCHAR (50)   NULL,
    [RptSignedByEmpId]      INT             NULL,
    [RptSignedByPos]        NVARCHAR (50)   NULL,
    [RptSignedByIDNo]       VARCHAR (20)    NULL,
    [RptSignedByName]       NVARCHAR (50)   NULL,
    [MfdGoodY1]             NVARCHAR (MAX)  NULL,
    [MfdGoodY2]             NVARCHAR (MAX)  NULL,
    [MfdGoodY3]             NVARCHAR (MAX)  NULL,
    [MfdLicenseSDate]       DATE            NULL,
    [MfdLicenseEDate]       DATE            NULL,
    [IsChgCoName]           BIT             NULL,
    [IsChgCoMember]         BIT             NULL,
    [IsChgAddress]          BIT             NULL,
    [IsChgFtyStr]           BIT             NULL,
    [IsChgEq]               BIT             NULL,
    [F_RMCost]              DECIMAL (18, 2) NULL,
    [BgtRMCost]             DECIMAL (18, 2) NULL,
    [F_RdyGoodCost]         DECIMAL (18, 2) NULL,
    [BgtRdyGoodCost]        DECIMAL (18, 2) NULL,
    [F_MktExpCost]          DECIMAL (18, 2) NULL,
    [MktExpRate]            DECIMAL (5, 2)  NULL,
    [BgtMktExpCost]         DECIMAL (18, 2) NULL,
    [BgtMktExpRate]         DECIMAL (5, 2)  NULL,
    [F_LocalSalesCost]      DECIMAL (18, 2) NULL,
    [LocalSalesRate]        DECIMAL (5, 2)  NULL,
    [BgtLocSalesCost]       DECIMAL (18, 2) NULL,
    [BgtLocSalesRate]       DECIMAL (5, 2)  NULL,
    [IPC_RDC]               NVARCHAR (200)  NULL,
    [ValueAdded]            NVARCHAR (200)  NULL,
    [RepairSvc]             NVARCHAR (200)  NULL,
    [SparePart]             NVARCHAR (200)  NULL,
    [F_Imp_OpenBalWgt_Y1]   DECIMAL (10, 2) NULL,
    [F_Imp_OpenBalCost_Y1]  DECIMAL (18, 2) NULL,
    [F_Imp_ImpRMWgt_Y1]     DECIMAL (10, 2) NULL,
    [F_Imp_ImpRMCost_Y1]    DECIMAL (18, 2) NULL,
    [F_Imp_LocRMWgt_Y1]     DECIMAL (10, 2) NULL,
    [F_Imp_LocRMCost_Y1]    DECIMAL (18, 2) NULL,
    [F_Imp_UsedRMWgt_Y1]    DECIMAL (10, 2) NULL,
    [F_Imp_UsedRMCost_Y1]   DECIMAL (18, 2) NULL,
    [F_Imp_ReturnedWgt_Y1]  DECIMAL (10, 2) NULL,
    [F_Imp_CloseBalWgt_Y1]  DECIMAL (10, 2) NULL,
    [F_Imp_CloseBalCost_Y1] DECIMAL (18, 2) NULL,
    [F_Imp_OpenBalWgt_Y2]   DECIMAL (10, 2) NULL,
    [F_Imp_OpenBalCost_Y2]  DECIMAL (18, 2) NULL,
    [F_ImpRMWgt_Y2]         DECIMAL (10, 2) NULL,
    [F_ImpRMCost_Y2]        DECIMAL (18, 2) NULL,
    [F_Imp_LocRMWgt_Y2]     DECIMAL (10, 2) NULL,
    [F_Imp_LocRMCost_Y2]    DECIMAL (18, 2) NULL,
    [F_Imp_UsedRMWgt_Y2]    DECIMAL (10, 2) NULL,
    [F_Imp_UsedRMCost_Y2]   DECIMAL (18, 2) NULL,
    [F_Imp_ReturnedWgt_Y2]  DECIMAL (10, 2) NULL,
    [F_Imp_CloseBalWgt_Y2]  DECIMAL (10, 2) NULL,
    [F_Imp_CloseBalCost_Y2] DECIMAL (18, 2) NULL,
    [F_Exp_OpenBalQty_Y1]   DECIMAL (10, 2) NULL,
    [F_Exp_OpenBalCost_Y1]  DECIMAL (18, 2) NULL,
    [F_Exp_MadeQty_Y1]      DECIMAL (10, 2) NULL,
    [F_Exp_MadeCost_Y1]     DECIMAL (18, 2) NULL,
    [F_Exp_Qty_Y1]          DECIMAL (10, 2) NULL,
    [F_Exp_Cost_Y1]         DECIMAL (18, 2) NULL,
    [F_Exp_LocSalesQty_Y1]  DECIMAL (10, 2) NULL,
    [F_Exp_LocSalesCost_Y1] DECIMAL (18, 2) NULL,
    [F_Exp_DamagedQty_Y1]   DECIMAL (10, 2) NULL,
    [F_Exp_DamagedCost_Y1]  DECIMAL (18, 2) NULL,
    [F_Exp_CloseQty_Y1]     DECIMAL (10, 2) NULL,
    [F_Exp_CloseCost_Y1]    DECIMAL (18, 2) NULL,
    [F_Exp_OpenBalQty_Y2]   DECIMAL (10, 2) NULL,
    [F_Exp_OpenBalCost_Y2]  DECIMAL (18, 2) NULL,
    [F_Exp_MadeQty_Y2]      DECIMAL (10, 2) NULL,
    [F_Exp_MadeCost_Y2]     DECIMAL (18, 2) NULL,
    [F_Exp_Qty_Y2]          DECIMAL (10, 2) NULL,
    [F_Exp_Cost_Y2]         DECIMAL (18, 2) NULL,
    [F_Exp_LocSalesQty_Y2]  DECIMAL (10, 2) NULL,
    [F_Exp_LocSalesCost_Y2] DECIMAL (18, 2) NULL,
    [F_Exp_DamagedQty_Y2]   DECIMAL (10, 2) NULL,
    [F_Exp_DamagedCost_Y2]  DECIMAL (18, 2) NULL,
    [F_Exp_CloseQty_Y2]     DECIMAL (10, 2) NULL,
    [F_Exp_CloseCost_Y2]    DECIMAL (18, 2) NULL,
    [F_Rdy_Cost]            DECIMAL (18, 2) NULL,
    [F_Rdy_DutyImpCost]     DECIMAL (18, 2) NULL,
    [F_Rdy_GSTCost]         DECIMAL (18, 2) NULL,
    [F_Rdy_TaxCost]         DECIMAL (18, 2) NULL,
    [F_Bgt_Qty_Loc]         INT             NULL,
    [F_Bgt_Cost_Loc]        DECIMAL (18, 2) NULL,
    [F_Bgt_DutyImpCost_Loc] DECIMAL (18, 2) NULL,
    [F_Bgt_GSTCost_Loc]     DECIMAL (18, 2) NULL,
    [F_Bgt_TaxCost_Loc]     DECIMAL (18, 2) NULL,
    [F_Bgt_Qty_Imp]         INT             NULL,
    [F_Bgt_Cost_Imp]        DECIMAL (18, 2) NULL,
    [F_Bgt_DutyImpCost_Imp] DECIMAL (18, 2) NULL,
    [F_Bgt_GSTCost_Imp]     DECIMAL (18, 2) NULL,
    [F_Bgt_TaxCost_Imp]     DECIMAL (18, 2) NULL,
    [CreatedByUserId]       INT             NULL,
    [CreatedDT]             DATETIME        NULL,
    [EditedByUserId]        INT             NULL,
    [EditedDT]              DATETIME        NULL,
    CONSTRAINT [PK_RptLG_1] PRIMARY KEY CLUSTERED ([RptId] ASC)
);






































GO


CREATE TRIGGER [dbo].[RptLG_Insert]
       ON [dbo].[RptLG]
AFTER INSERT, UPDATE
AS
BEGIN
SET NOCOUNT ON;
   

declare @RptId as int,  
@PrevRptId as int,  
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
@CurrentYr as int,
@LastYr as int,
@MfdGoodY1 as nvarchar(max),
@MfdGoodY2 as nvarchar(max),
@CurrentCutOffMonth as int

select @MfdGoodY2 = dbo.[fnReadyStockList]()

declare @F_Imp_OpenBalWgt_Y1 as decimal(10, 2),
	@F_Imp_OpenBalCost_Y1 as decimal(18, 2),
	@F_ImpRMWgt_Y1 as decimal(10, 2),
	@F_ImpRMCost_Y1 as decimal(18, 2),
	@F_Imp_LocRMWgt_Y1 as decimal(10, 2),
	@F_Imp_LocRMCost_Y1 as decimal(18, 2),
	@F_Imp_UsedRMWgt_Y1 as decimal(10, 2),
	@F_Imp_UsedRMCost_Y1 as decimal(18, 2),
	@F_Imp_ReturnedWgt_Y1 as decimal(10, 2),
	@F_Imp_CloseBalWgt_Y1 as decimal(10, 2),
	@F_Imp_CloseBalCost_Y1 as decimal(18, 2), 

	@F_Exp_OpenBalQty_Y1 as decimal(10, 2),
	@F_Exp_OpenBalCost_Y1 as decimal(18, 2),
	@F_Exp_MadeQty_Y1 as decimal(10, 2),
	@F_Exp_MadeCost_Y1 as decimal(18, 2),
	@F_Exp_Qty_Y1 as decimal(10, 2),
	@F_Exp_Cost_Y1 as decimal(18, 2),
	@F_Exp_LocSalesQty_Y1 as decimal(10, 2),
	@F_Exp_LocSalesCost_Y1 as decimal(18, 2),
	@F_Exp_DamagedQty_Y1 as decimal(10, 2),
	@F_Exp_DamagedCost_Y1 as decimal(18, 2),
	@F_Exp_CloseQty_Y1 as decimal(10, 2),
	@F_Exp_CloseCost_Y1 as decimal(18, 2)

declare @F_Imp_OpenBalWgt_Y2 as decimal(10, 2),
 @F_Imp_OpenBalCost_Y2 as decimal(18, 2),
 @F_ImpRMWgt_Y2 as decimal(10, 2),
 @F_ImpRMCost_Y2 as decimal(18, 2),
 @F_Imp_LocRMWgt_Y2 as decimal(10, 2),
 @F_Imp_LocRMCost_Y2 as decimal(18, 2),
 @F_Imp_UsedRMWgt_Y2 as decimal(10, 2),
 @F_Imp_UsedRMCost_Y2 as decimal(18, 2),
 @F_Imp_ReturnedWgt_Y2 as decimal(10, 2),
 @F_Imp_CloseBalWgt_Y2 as decimal(10, 2),
 @F_Imp_CloseBalCost_Y2 as decimal(18, 2),

 @F_Exp_OpenBalQty_Y2 as decimal(10, 2),
 @F_Exp_OpenBalCost_Y2 as decimal(18, 2),
 @F_Exp_MadeQty_Y2 as decimal(10, 2),
 @F_Exp_MadeCost_Y2 as decimal(18, 2),
 @F_Exp_Qty_Y2 as decimal(10, 2),
 @F_Exp_Cost_Y2 as decimal(18, 2),
 @F_Exp_LocSalesQty_Y2 as decimal(10, 2),
 @F_Exp_LocSalesCost_Y2 as decimal(18, 2),
 @F_Exp_DamagedQty_Y2 as decimal(10, 2),
 @F_Exp_DamagedCost_Y2 as decimal(18, 2),
 @F_Exp_CloseQty_Y2 as decimal(10, 2),
 @F_Exp_CloseCost_Y2 as decimal(18, 2),

 @F_Rdy_Cost as decimal(18, 2),
 @F_Rdy_DutyImpCost as decimal(18, 2),
 @F_Rdy_GSTCost as decimal(18, 2),
 @F_Rdy_TaxCost as decimal(18, 2),

 @F_Bgt_Qty_Loc as int,
 @F_Bgt_Cost_Loc as decimal(18, 2),
 @F_Bgt_DutyImpCost_Loc as decimal(18, 2),
 @F_Bgt_GSTCost_Loc as decimal(18, 2),
 @F_Bgt_TaxCost_Loc as decimal(18, 2),
 @F_Bgt_Qty_Imp as int,
 @F_Bgt_Cost_Imp as decimal(18, 2),
 @F_Bgt_DutyImpCost_Imp as decimal(18, 2),
 @F_Bgt_GSTCost_Imp as decimal(18, 2),
 @F_Bgt_TaxCost_Imp as decimal(18, 2)
   
 
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
 
select top 1 @CurrentCutOffMonth = convert(int,ConfigData)
 from Config with (nolock)
where ModuleId = 1 and Id = 2 and ConfigKey='CurrentCutOffMonth'
 

 
SELECT @RptId = RptId, @CurrentYr = RptY2
FROM inserted 

if @CurrentYr is null
 return;

set @LastYr = @CurrentYr - 1 

select top 1 @MfdGoodY1= MfdGoodY2, @PrevRptId = RptId
from RptLG with (nolock)
where RptY2 = @LastYr
--and RptStatusId = 3 
  
if @PrevRptId is not null
begin
	select Top 1 @F_Imp_OpenBalWgt_Y1 = isnull(F_Exp_OpenBalQty_Y2,0),
	@F_Imp_OpenBalCost_Y1 = isnull(F_Imp_OpenBalCost_Y2,0),
	@F_ImpRMWgt_Y1 = isnull(F_ImpRMWgt_Y2,0),
	@F_ImpRMCost_Y1 = isnull(F_ImpRMCost_Y2,0),
	@F_Imp_LocRMWgt_Y1 = isnull(F_Imp_LocRMWgt_Y2,0),
	@F_Imp_LocRMCost_Y1 = isnull(F_Imp_LocRMCost_Y2,0),
	@F_Imp_UsedRMWgt_Y1 = isnull(F_Imp_UsedRMWgt_Y2,0),
	@F_Imp_UsedRMCost_Y1 = isnull(F_Imp_UsedRMCost_Y2,0),
	@F_Imp_ReturnedWgt_Y1 = isnull(F_Imp_ReturnedWgt_Y2,0),
	@F_Imp_CloseBalWgt_Y1 = isnull(F_Imp_CloseBalWgt_Y2,0),
	@F_Imp_CloseBalCost_Y1 = isnull(F_Imp_CloseBalCost_Y2,0)
	from RptLG
	where RptId = @PrevRptId


	select Top 1 
	@F_Exp_OpenBalQty_Y1 = isnull(F_Exp_OpenBalQty_Y2,0),
	@F_Exp_OpenBalCost_Y1 = isnull(F_Exp_OpenBalCost_Y2,0),
	@F_Exp_MadeQty_Y1 = isnull(F_Exp_MadeQty_Y2,0),
	@F_Exp_MadeCost_Y1 = isnull(F_Exp_MadeCost_Y2,0),
	@F_Exp_Qty_Y1 = isnull(F_Exp_Qty_Y2,0),
	@F_Exp_Cost_Y1 = isnull(F_Exp_Cost_Y2,0),
	@F_Exp_LocSalesQty_Y1 = isnull(F_Exp_LocSalesQty_Y2,0),
	@F_Exp_LocSalesCost_Y1 = isnull(F_Exp_LocSalesCost_Y2,0),
	@F_Exp_DamagedQty_Y1 = isnull(F_Exp_DamagedQty_Y2,0),
	@F_Exp_DamagedCost_Y1 = isnull(F_Exp_DamagedCost_Y2,0),
	@F_Exp_CloseQty_Y1 = isnull(F_Exp_CloseQty_Y2,0),
	@F_Exp_CloseCost_Y1 = isnull(F_Exp_CloseCost_Y2,0)
	from RptLG
	where RptId = @PrevRptId

end
 
update RptLG
set F_CoName = @F_CoName,
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
	RptY1 = @CurrentYr-1, 
	RptSDate_Y1 = DATEFROMPARTS(@CurrentYr-1, 1, 1),
	RptEDate_Y1 = DATEFROMPARTS(@CurrentYr-1, 12, 31),
	RptSDate_Y2 = DATEFROMPARTS(@CurrentYr, 1, 1),
	RptEDate_Y2 = DATEADD(DAY, -1, DATEADD(MONTH, 1, DATEFROMPARTS(@CurrentYr, @CurrentCutOffMonth, 1))),
	RptSDate_Y3 = DATEFROMPARTS(@CurrentYr+1, 1, 1),
	RptEDate_Y3 = DATEFROMPARTS(@CurrentYr+1, 12, 31), 
	MfdGoodY1 = @MfdGoodY1,
	MfdGoodY2 = @MfdGoodY2,
	MfdGoodY3 = @MfdGoodY2,
	F_Imp_OpenBalWgt_Y1 = @F_Imp_OpenBalWgt_Y1,
	F_Imp_OpenBalCost_Y1 = @F_Imp_OpenBalCost_Y1,
	F_Imp_ImpRMWgt_Y1 = @F_ImpRMWgt_Y1,
	F_Imp_ImpRMCost_Y1 = @F_ImpRMCost_Y1,
	F_Imp_LocRMWgt_Y1 = @F_Imp_LocRMWgt_Y1,
	F_Imp_LocRMCost_Y1 = @F_Imp_LocRMCost_Y1,
	F_Imp_UsedRMWgt_Y1 = @F_Imp_UsedRMWgt_Y1,
	F_Imp_UsedRMCost_Y1 = @F_Imp_UsedRMCost_Y1,
	F_Imp_ReturnedWgt_Y1 = @F_Imp_ReturnedWgt_Y1,
	F_Imp_CloseBalWgt_Y1 = @F_Imp_CloseBalWgt_Y1,
	F_Imp_CloseBalCost_Y1 = @F_Imp_CloseBalCost_Y1,
	
	F_Exp_OpenBalQty_Y1 = @F_Exp_OpenBalQty_Y1,
	F_Exp_OpenBalCost_Y1 = @F_Exp_OpenBalCost_Y1,
	F_Exp_MadeQty_Y1 = @F_Exp_MadeQty_Y1,
	F_Exp_MadeCost_Y1 = @F_Exp_MadeCost_Y1,
	F_Exp_Qty_Y1 = @F_Exp_Qty_Y1,
	F_Exp_Cost_Y1 = @F_Exp_Cost_Y1,
	F_Exp_LocSalesQty_Y1 = @F_Exp_LocSalesQty_Y1,
	F_Exp_LocSalesCost_Y1 = @F_Exp_LocSalesCost_Y1,
	F_Exp_DamagedQty_Y1 = @F_Exp_DamagedQty_Y1,
	F_Exp_DamagedCost_Y1 = @F_Exp_DamagedCost_Y1,
	F_Exp_CloseQty_Y1 = @F_Exp_CloseQty_Y1,
	F_Exp_CloseCost_Y1 = @F_Exp_CloseCost_Y1
where RptId = @RptId

IF NOT EXISTS (SELECT 1 FROM deleted)
BEGIN

	if(not exists(select 1 from RptLG_YImp where RptId = @RptId))
	begin 

		  insert into RptLG_YImp (RptId, RptY, RMId, F_OpenBalWgt, F_OpenBalCost, 
			 F_ImpRMWgt, F_ImpRMCost, F_LocRMWgt, F_LocRMCost)
			 select @RptId, @CurrentYr, RMId, 
			 (select top 1 F_CloseBalWgt from RptLG_YImp xa where xa.RptY = @LastYr and xa.RMId = a.RMId),  
			 (select top 1 F_CloseBalCost from RptLG_YImp xa where xa.RptY = @LastYr and xa.RMId = a.RMId),  
			 sum(case when b.IsLocal = 0 then isnull(a.Wgt,0) else 0 end), 
			 sum(case when b.IsLocal = 0 then isnull(a.Amount,0) else 0 end), 
			 sum(case when b.IsLocal = 1 then isnull(a.Wgt,0) else 0 end), 
			 sum(case when b.IsLocal = 1 then isnull(a.Amount,0) else 0 end)   
			 from GRN a with (nolock)
			 left join STNCustom b with (nolock) 
			  on a.STNCustomId = b.STNCustomId
			 where year(GRNDate) = @CurrentYr
			 group by RMId 

			 insert into RptLG_YImp (RptId, RptY, RMId, F_OpenBalWgt, F_OpenBalCost, 
			 F_ImpRMWgt, F_ImpRMCost, F_LocRMWgt, F_LocRMCost)
			 select @RptId, @CurrentYr, RMId, 
			 (select top 1 F_CloseBalWgt from RptLG_YImp xa where xa.RptY = @LastYr and xa.RMId = rm.RMId),  
			 (select top 1 F_CloseBalCost from RptLG_YImp xa where xa.RptY = @LastYr and xa.RMId = rm.RMId),  
			 0,0,0,0
			 from RMaterial rm with (nolock)
			 where RMId not in (
				 select r.RMId
				 from  RptLG_YImp r with (nolock)
				 where RptId = @RptId
			 ) 
		  
	 
	end 


	if(not exists(select 1 from RptLG_YExp where RptId = @RptId))
	begin 

		insert into RptLG_YExp (RptId, RptY, StkDesc, TariffCode, OpenBalQty, OpenBalCost) 
		select @RptId, @CurrentYr, b.ReadyStockDesc, b.TariffCode, 
			(select top 1 CloseBalQty from RptLG_YExp xa where xa.RptY = @LastYr and xa.ReadyStockId = b.ReadyStockId),  
			(select top 1 CloseBalCost from RptLG_YExp xa where xa.RptY = @LastYr and xa.ReadyStockId = b.ReadyStockId) 
		from ReadyStock b with (nolock)  
	 
	end 

	if(not exists(select 1 from RptLG_YBgt where RptId = @RptId))
	begin 
 
		insert into RptLG_YBgt (RptId, IsLocal, RMId, F_RMCatName, F_RMDesc, F_UOMCode, F_TariffCode, F_CountryList, Qty, F_Cost,
		F_DutyImpRate, F_DutyImpCost, F_GSTRate, F_GSTCost, F_TaxCost) 
		select @RptId, 0, a.RMId, F_RMCatName, F_RMDesc, F_UOMCode, F_TariffCode, dbo.fnCountryList(b.CountryList), a.F_ImpRMWgt, a.F_ImpRMCost,
		b.DutyImpRate, 0, b.GSTRate, 0, 0
		from RptLG_YImp a with (nolock)
		left join RMaterial b with (nolock)
		  on a.RMId = b.RMId
		where RptY = @CurrentYr
		and (isnull(F_ImpRMWgt,0) > 0 or isnull(F_ImpRMCost,0) > 0)

		insert into RptLG_YBgt (RptId, IsLocal, RMId, F_RMCatName, F_RMDesc, F_UOMCode, F_TariffCode, F_CountryList, Qty, F_Cost,
		F_DutyImpRate, F_DutyImpCost, F_GSTRate, F_GSTCost, F_TaxCost) 
		select @RptId, 1, a.RMId, F_RMCatName, F_RMDesc, F_UOMCode, F_TariffCode, dbo.fnCountryList(b.CountryList), a.F_LocRMWgt, a.F_LocRMCost,
		b.DutyImpRate, 0, b.GSTRate, 0, 0
		from RptLG_YImp a with (nolock)
		left join RMaterial b with (nolock)
		  on a.RMId = b.RMId
		where RptY = @CurrentYr
		and (isnull(F_LocRMWgt,0) > 0 or isnull(F_LocRMCost,0) > 0) 
	 
	 
	end 
 
	if(not exists(select 1 from RptLG_YRdy where RptId = @RptId))
	begin 

		insert into RptLG_YRdy (RptId, StkDesc, TariffCode, Qty, Cost, DutyImpRate, DutyImpCost, GSTRate, GSTCost, TaxCost) 
		select @RptId, b.ReadyStockDesc, b.TariffCode, 0, 0, b.DutyImpRate, 0, b.GSTRate, 0, 0 
		from ReadyStock b with (nolock)  

	end 
END

 
select 
 @F_Imp_OpenBalWgt_Y2 = sum(isnull(F_OpenBalWgt,0)), 
 @F_Imp_OpenBalCost_Y2 = sum(isnull(F_OpenBalCost,0)),
 @F_ImpRMWgt_Y2 = sum(isnull(F_ImpRMWgt,0)), 
 @F_ImpRMCost_Y2 = sum(isnull(F_ImpRMCost,0)),
 @F_Imp_LocRMWgt_Y2 = sum(isnull(F_LocRMWgt,0)),
 @F_Imp_LocRMCost_Y2 = sum(isnull(F_LocRMCost,0)),
 @F_Imp_UsedRMWgt_Y2 = sum(isnull(UsedRMWgt,0)),
 @F_Imp_UsedRMCost_Y2 = sum(isnull(UsedRMCost,0)),
 @F_Imp_ReturnedWgt_Y2 = sum(isnull(ReturnedWgt,0)),
 @F_Imp_CloseBalWgt_Y2 = sum(isnull(F_CloseBalWgt,0)),
 @F_Imp_CloseBalCost_Y2 = sum(isnull(F_CloseBalCost,0)) 
from RptLG_YImp with (nolock)
where RptId = @RptId

select 
 @F_Exp_OpenBalQty_Y2 = sum(isnull(OpenBalQty,0)), 
 @F_Exp_OpenBalCost_Y2 = sum(isnull(OpenBalCost,0)), 
 @F_Exp_MadeQty_Y2 = sum(isnull(MadeQty,0)), 
 @F_Exp_MadeCost_Y2 = sum(isnull(MadeCost,0)), 
 @F_Exp_Qty_Y2 = sum(isnull(ExpQty,0)), 
 @F_Exp_Cost_Y2  = sum(isnull(ExpCost,0)), 
 @F_Exp_LocSalesQty_Y2 = sum(isnull(LocSalesQty,0)), 
 @F_Exp_LocSalesCost_Y2 = sum(isnull(LocSalesCost,0)), 
 @F_Exp_DamagedQty_Y2 = sum(isnull(DamagedQty,0)), 
 @F_Exp_DamagedCost_Y2 = sum(isnull(DamagedCost,0)), 
 @F_Exp_CloseQty_Y2 = sum(isnull(CloseBalQty,0)), 
 @F_Exp_CloseCost_Y2 = sum(isnull(CloseBalCost,0))
from RptLG_YExp with (nolock)
where RptId = @RptId

select 
 @F_Rdy_Cost = sum(isnull(Cost,0)), 
 @F_Rdy_DutyImpCost = sum(isnull(DutyImpCost,0)), 
 @F_Rdy_GSTCost = sum(isnull(GSTCost,0)), 
 @F_Rdy_TaxCost = sum(isnull(TaxCost,0)) 
from RptLG_YRdy with (nolock)  
where RptId = @RptId

select 
 @F_Bgt_Qty_Loc = sum(isnull(Qty,0)), 
 @F_Bgt_Cost_Loc = sum(isnull(F_Cost,0)), 
 @F_Bgt_DutyImpCost_Loc = sum(isnull(F_DutyImpCost,0)), 
 @F_Bgt_GSTCost_Loc = sum(isnull(F_GSTCost,0)), 
 @F_Bgt_TaxCost_Loc = sum(isnull(F_TaxCost,0)) 
from RptLG_YBgt with (nolock)    
where RptId = @RptId and IsLocal = 1

select  
 @F_Bgt_Qty_Imp = sum(isnull(Qty,0)), 
 @F_Bgt_Cost_Imp  = sum(isnull(F_Cost,0)), 
 @F_Bgt_DutyImpCost_Imp  = sum(isnull(F_DutyImpCost,0)), 
 @F_Bgt_GSTCost_Imp  = sum(isnull(F_GSTCost,0)), 
 @F_Bgt_TaxCost_Imp  = sum(isnull(F_TaxCost,0)) 
from RptLG_YBgt with (nolock)  
where RptId = @RptId and IsLocal = 0
   

update RptLG
set 
 F_Imp_OpenBalWgt_Y2 = @F_Imp_OpenBalWgt_Y2, 
 F_Imp_OpenBalCost_Y2 = @F_Imp_OpenBalCost_Y2,
 F_ImpRMWgt_Y2 = @F_ImpRMWgt_Y2 , 
 F_ImpRMCost_Y2 = @F_ImpRMCost_Y2,
 F_Imp_LocRMWgt_Y2 = @F_Imp_LocRMWgt_Y2,
 F_Imp_LocRMCost_Y2 = @F_Imp_LocRMCost_Y2,
 F_Imp_UsedRMWgt_Y2 = @F_Imp_UsedRMWgt_Y2,
 F_Imp_UsedRMCost_Y2 = @F_Imp_UsedRMCost_Y2,
 F_Imp_ReturnedWgt_Y2 = @F_Imp_ReturnedWgt_Y2,
 F_Imp_CloseBalWgt_Y2 = @F_Imp_CloseBalWgt_Y2,
 F_Imp_CloseBalCost_Y2 = @F_Imp_CloseBalCost_Y2,
 F_Exp_OpenBalQty_Y2 = @F_Exp_OpenBalQty_Y2, 
 F_Exp_OpenBalCost_Y2 = @F_Exp_OpenBalCost_Y2, 
 F_Exp_MadeQty_Y2 = @F_Exp_MadeQty_Y2, 
 F_Exp_MadeCost_Y2 = @F_Exp_MadeCost_Y2, 
 F_Exp_Qty_Y2 = @F_Exp_Qty_Y2, 
 F_Exp_Cost_Y2  = @F_Exp_Cost_Y2, 
 F_Exp_LocSalesQty_Y2 = @F_Exp_LocSalesQty_Y2, 
 F_Exp_LocSalesCost_Y2 = @F_Exp_LocSalesCost_Y2, 
 F_Exp_DamagedQty_Y2 = @F_Exp_DamagedQty_Y2, 
 F_Exp_DamagedCost_Y2 = @F_Exp_DamagedCost_Y2, 
 F_Exp_CloseQty_Y2 = @F_Exp_CloseQty_Y2, 
 F_Exp_CloseCost_Y2 = @F_Exp_CloseCost_Y2, 
 F_Rdy_Cost = @F_Rdy_Cost, 
 F_Rdy_DutyImpCost = @F_Rdy_DutyImpCost, 
 F_Rdy_GSTCost = @F_Rdy_GSTCost, 
 F_Rdy_TaxCost = @F_Rdy_TaxCost, 
 F_Bgt_Qty_Loc = @F_Bgt_Qty_Loc, 
 F_Bgt_Cost_Loc = @F_Bgt_Cost_Loc, 
 F_Bgt_DutyImpCost_Loc = @F_Bgt_DutyImpCost_Loc, 
 F_Bgt_GSTCost_Loc = @F_Bgt_GSTCost_Loc, 
 F_Bgt_TaxCost_Loc = @F_Bgt_TaxCost_Loc,
 F_Bgt_Qty_Imp = @F_Bgt_Qty_Imp, 
 F_Bgt_Cost_Imp  = @F_Bgt_Cost_Imp, 
 F_Bgt_DutyImpCost_Imp  = @F_Bgt_DutyImpCost_Imp, 
 F_Bgt_GSTCost_Imp  = @F_Bgt_GSTCost_Imp, 
 F_Bgt_TaxCost_Imp  = @F_Bgt_TaxCost_Imp
where RptId = @RptId


END