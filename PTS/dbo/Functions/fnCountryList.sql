 
CREATE FUNCTION fnCountryList
( 
	@list varchar(max)
)
RETURNS varchar(max)
AS
BEGIN
	
	DECLARE @Names VARCHAR(max) 

	select @Names = COALESCE(@Names + ', ', '') + y.CountryName 
	from dbo.fnStringList2Table(@list) x
	left join Country y with (nolock)
	  on x.item = y.CountryId
 
	return @Names

END