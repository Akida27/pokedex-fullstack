using System.Net.Http.Json;
using Microsoft.AspNetCore.Http.HttpResults;

var builder = WebApplication.CreateBuilder(args);

// Allow React dev server origin during development
const string AllowedOrigin = "http://localhost:5173";
builder.Services.AddCors(options =>
{
    options.AddPolicy("dev", p =>
        p.WithOrigins(AllowedOrigin)
         .AllowAnyHeader()
         .AllowAnyMethod());
});

var app = builder.Build();
app.UseCors("dev");

// GET /api/pokemon/{nameOrId}
// Calls PokéAPI and returns only { id, name, image }
app.MapGet("/api/pokemon/{nameOrId}",
    async Task<Results<Ok<PokemonDto>, NotFound>> (string nameOrId) =>
{
    using var http = new HttpClient();
    var url = $"https://pokeapi.co/api/v2/pokemon/{nameOrId.ToLower()}";

    try
    {
        var data = await http.GetFromJsonAsync<PokeApiResponse>(url);
        if (data is null) return TypedResults.NotFound();

        var dto = new PokemonDto(
            data.id,
            data.name,
            data.sprites.front_default ?? ""
        );

        return string.IsNullOrWhiteSpace(dto.image)
            ? TypedResults.NotFound()
            : TypedResults.Ok(dto);
    }
    catch (HttpRequestException)
    {
        return TypedResults.NotFound();
    }
});

app.Run();

// DTOs
record PokemonDto(int id, string name, string image);

record PokeApiResponse(int id, string name, Sprites sprites);
record Sprites(string? front_default);
