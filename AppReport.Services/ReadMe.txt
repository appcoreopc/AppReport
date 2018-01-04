

Please remember to remove localhost settings from your DB Context

Scaffold-DbContext "Server=localhost;Database=PTS;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir PTSDataModel -FORCE

Scaffold-DbContext "Server=localhost;Database=PTS;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer -Tables "User" -OutputDir PTSDataModel -FORCE
