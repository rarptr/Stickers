using Telegram.Bot.Types.Enums;
using Telegram.Bot.Types.ReplyMarkups;
using Telegram.Bot.Types;

namespace StickerEditor.API.Services.Interfaces
{
    public interface ITelegramBotClientService
    {
        Task<Message> SendTextMessageAsync(
            long chatId,
            string text,
            ParseMode parseMode = ParseMode.Html,
            IReplyMarkup? replyMarkup = null );

        Task DownloadTgFileAsync( long userId, string fileId, string filePath );
    }
}