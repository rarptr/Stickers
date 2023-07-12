using StickerEditor.API.Services;
using StickerEditor.API.Services.Interfaces;

namespace StickerEditor.API.Extensions
{
    public static class ConfigureTelegramBotClient
    {
        public static IServiceCollection AddTelegramBotClient( this IServiceCollection services, IConfiguration configuration )
        {
            var token = configuration.GetSection( "Telegram" )[ "Token" ];
            if ( token is null )
            {
                throw new ArgumentNullException( nameof( token ), "Telegram token is missing." );
            }

            services.AddSingleton<ITelegramBotClientService, TelegramBotClientService>( serviceProvider =>
                new TelegramBotClientService( token ) );
            return services;
        }
    }
}