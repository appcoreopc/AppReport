USE [PTS]
GO
/****** Object:  Trigger [dbo].[RptM1_MStk_Update]    Script Date: 3/10/2019 12:06:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 

ALTER TRIGGER [dbo].[RptM1_MStk_Update]
       ON [dbo].[RptM1_MStk]
AFTER UPDATE
AS
BEGIN
SET NOCOUNT ON;

	declare @RptId as int , 
	@F_WastedCost as decimal(18,2),  
	@F_UsedCost as decimal(18,2)   
  
	SELECT @RptId = RptId 
	FROM inserted
	 
	select @F_UsedCost = sum(isnull(UsedCost,0)), @F_WastedCost = sum(isnull(WastedCost,0))
	from RptM1_MStk with (nolock) 
	WHERE RptId = @RptId
	
	update RptM1 
	set F_WastedCost = @F_WastedCost, F_UsedCost = @F_UsedCost
	where RptId = @RptId 
	 

	UPDATE RptM1_MStk
	SET F_CloseBal = F_TotalRM - (WastedCost + UsedCost) 
	WHERE RptId = @RptId
	  

END