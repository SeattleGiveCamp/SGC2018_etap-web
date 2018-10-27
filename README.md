# ETAP Web
A prototype application for the cataloging/categorization and tracking of litter picked up

## Getting Started
- You will need:
    - Dotnet Core SDK
    - NodeJS/NPM
    - Git (of course!)
    - Docker (optional)
- Clone this repository
- Navigate to the root directory
- Run:
    - For Docker: 
        - Run `docker build -t etap.web .`
        - Run `docker run -d -p 8080:80 --name etapweb etap.web`
    - Locally:
        - For unix-based systems, run `./run.sh`
        - For Windows, use `./run.ps1`

## Contribution Guidelines
- NO PASSWORDS OR CREDENTIALS CHECKED IN!
    - The `.gitignore` will ignore a directory named `secrets/`, put them there, or use the [dotnet core secrets manager](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-2.1&tabs=macos)
- This work is MIT, see the LICENSE for details