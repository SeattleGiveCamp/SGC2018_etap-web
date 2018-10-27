#!/bin/bash

dotnet restore
dotnet build
dotnet run --project Etap.Web