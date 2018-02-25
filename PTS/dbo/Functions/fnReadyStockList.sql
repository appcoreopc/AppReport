 
create FUNCTION [dbo].[fnReadyStockList]
()
RETURNS varchar(max)
AS
BEGIN
	
	DECLARE @Names VARCHAR(max) 

	select @Names = COALESCE(@Names + ', ', '') + ReadyStockDesc
	from ReadyStock  
 
	return @Names

END