CREATE TABLE [dbo].[RptLG_YImp] (
    [TxnId]          INT             IDENTITY (1, 1) NOT NULL,
    [RptId]          INT             NULL,
    [RptY]           INT             NULL,
    [RMId]           INT             NULL,
    [F_RMCatName]    NVARCHAR (100)  NULL,
    [F_RMDesc]       NVARCHAR (500)  NULL,
    [F_UOMCode]      NVARCHAR (10)   NULL,
    [F_TariffCode]   VARCHAR (50)    NULL,
    [F_OpenBalWgt]   DECIMAL (10, 2) NULL,
    [F_OpenBalCost]  DECIMAL (18, 2) NULL,
    [F_ImpRMWgt]     DECIMAL (10, 2) NULL,
    [F_ImpRMCost]    DECIMAL (18, 2) NULL,
    [F_LocRMWgt]     DECIMAL (10, 2) NULL,
    [F_LocRMCost]    DECIMAL (18, 2) NULL,
    [UsedRMWgt]      DECIMAL (10, 2) NULL,
    [UsedRMCost]     DECIMAL (18, 2) NULL,
    [ReturnedWgt]    DECIMAL (10, 2) NULL,
    [F_CloseBalWgt]  DECIMAL (10, 2) NULL,
    [F_CloseBalCost] DECIMAL (18, 2) NULL,
    CONSTRAINT [PK_RptLG_YImpRM] PRIMARY KEY CLUSTERED ([TxnId] ASC)
);






GO

CREATE TRIGGER [dbo].[RptLG_YImp_Update]
       ON [dbo].[RptLG_YImp]
AFTER INSERT, UPDATE
AS
BEGIN
SET NOCOUNT ON;
   

	declare @RptId as int , 
	@F_WastedCost as decimal(18,2),  
	@F_UsedCost as decimal(18,2)   
  
	SELECT @RptId = RptId 
	FROM inserted
	 
	/*UPDATE RptLG_YImp
	SET F_CloseBalWgt = (isnull(F_OpenBalWgt,0) + isnull(F_ImpRMWgt,0) + isnull(F_LocRMWgt,0)) 
	- (isnull(UsedRMWgt,0) + isnull(ReturnedWgt,0)), 
	F_CloseBalCost = (isnull(F_OpenBalCost,0) + isnull(F_ImpRMCost,0) + isnull(F_LocRMCost,0))  
	- (isnull(UsedRMCost,0)) 
	WHERE RptId = @RptId*/

	UPDATE t
		SET t.F_RMDesc = o.RMDesc, t.F_RMCatName = c.RMCatName, t.F_UOMCode = u.UomCode,
		t.F_TariffCode = o.TariffCode, 
		t.F_CloseBalWgt = (isnull(t.F_OpenBalWgt,0) + isnull(t.F_ImpRMWgt,0) + isnull(t.F_LocRMWgt,0)), 
		t.F_CloseBalCost = (isnull(t.F_OpenBalCost,0) + isnull(t.F_ImpRMCost,0) + isnull(t.F_LocRMCost,0))
		FROM RptLG_YImp t with (nolock) 
		JOIN RMaterial o with (nolock) ON t.RMId = o.RMId
		JOIN RMCat c with (nolock) ON t.RMId = o.RMId
		JOIN Uom u with (nolock) ON u.UomId = o.UOMId
		WHERE t.RptId = @RptId 

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
	@F_Imp_CloseBalCost_Y2 as decimal(18, 2)

	select @F_Imp_OpenBalWgt_Y2 = sum(isnull(F_OpenBalWgt,0)),
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
	from RptLG_YImp
	where RptId = @RptId

	update RptLG
	set F_Imp_OpenBalWgt_Y2 = @F_Imp_OpenBalWgt_Y2,
		F_Imp_OpenBalCost_Y2 = @F_Imp_OpenBalCost_Y2,
		F_ImpRMWgt_Y2 = @F_ImpRMWgt_Y2,
		F_ImpRMCost_Y2 = @F_ImpRMCost_Y2,
		F_Imp_LocRMWgt_Y2 = @F_Imp_LocRMWgt_Y2,
		F_Imp_LocRMCost_Y2 = @F_Imp_LocRMCost_Y2,
		F_Imp_UsedRMWgt_Y2 = @F_Imp_UsedRMWgt_Y2,
		F_Imp_UsedRMCost_Y2 = @F_Imp_UsedRMCost_Y2,
		F_Imp_ReturnedWgt_Y2 = @F_Imp_ReturnedWgt_Y2,
		F_Imp_CloseBalWgt_Y2 = @F_Imp_CloseBalWgt_Y2,
		F_Imp_CloseBalCost_Y2 = @F_Imp_CloseBalCost_Y2
	where RptId = @RptId
	  

END