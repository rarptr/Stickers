using Microsoft.EntityFrameworkCore;

namespace StickerEditor.API.Extensions
{
    public static class ConfigureDbContext
    {
        public static IServiceCollection AddSqlContext( this IServiceCollection services, IConfiguration configuration )
        {
            var connectionString = configuration.GetConnectionString( "SqlConnection" );
            var assemblyName = configuration.GetSection( "MigrationAssemblies" )[ "HotelMigrations" ];

            // TODO: MigrationsAssembly
            services.AddDbContext<AppDbContext>( opts =>
                opts.UseSqlServer( connectionString/*, s => s.MigrationsAssembly(assemblyName)*/) );
            return services;
        }
    }
}