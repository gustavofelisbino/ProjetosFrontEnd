# === Build ===
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia tudo (simples e direto). Para soluções grandes, dá pra otimizar o cache.
COPY . .
RUN dotnet publish -c Release -o /out

# === Runtime ===
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /out .

# Vamos expor HTTP na 8080
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

# Opcional: habilitar Swagger em produção
# ENV ENABLE_SWAGGER=true

ENTRYPOINT ["dotnet", "API.dll"]
