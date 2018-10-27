FROM microsoft/dotnet:sdk AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY . ./
RUN dotnet restore

# TODO: add test run steps

# Install NPM and run Webpack build steps
RUN wget -qO- https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs
RUN npm install
RUN npm run build

# Copy everything else and build
WORKDIR /app/Etap.Web
RUN dotnet publish -c Release -o ../out

# Build runtime image
FROM microsoft/dotnet:aspnetcore-runtime
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "Etap.Web.dll"]
