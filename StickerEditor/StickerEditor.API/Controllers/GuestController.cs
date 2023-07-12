using Microsoft.AspNetCore.Mvc;
using StickerEditor.API.Services.Interfaces;
using Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;

namespace StickerEditor.API.Controllers
{
    [Route( "api/guest" )]
    [ApiController]
    public class GuestController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ITelegramBotClientService _telegramBotClientService;

        public GuestController( IConfiguration configuration, ITelegramBotClientService telegramBotClientService )
        {
            _configuration = configuration;
            _telegramBotClientService = telegramBotClientService;
        }

        /// <summary>
        /// Принимает стикер от пользователя и добавляет его в стикерпак
        /// </summary>
        [HttpPost( "TelegramStart" )]
        public async Task<ActionResult> TelegramStart( [FromBody] Update update )
        {
            await Console.Out.WriteLineAsync( DateTime.Now + " " + update?.Message?.Text ?? "No message text" );

            if ( update.Message is null || update.Message.Sticker is null )
            {
                await Console.Out.WriteLineAsync( "Message or sticker is null" );
                return Ok();
            }

            if ( update.Message.Type is not MessageType.Sticker || update.Message.Sticker.IsAnimated )
            {
                await Console.Out.WriteLineAsync( "Not a static sticker" );
                return Ok();
            }

            var fileId = update.Message.Sticker.FileId;
            await _telegramBotClientService.DownloadTgFileAsync( update.Message.From.Id, fileId, GetStickerPath() );

            return Ok();
        }

        string GetStickerPath() =>
            $"{Environment.CurrentDirectory}/Resources/Stickers/";
    }
}