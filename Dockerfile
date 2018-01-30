FROM microsoft/aspnetcore-build:lts
COPY ./AppReport /app
COPY ./AppReport.Services /app
COPY ./PTS /app
COPy ./AppReport.sln /app
WORKDIR /app
RUN ["dotnet", "restore", "AppReport.sln"]
#RUN ["dotnet", "build", "AppReport.sln"]
EXPOSE 80/tcp