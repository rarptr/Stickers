using StickerEditor.API.Services.Interfaces;
using Telegram.Bot;
using Telegram.Bot.Types;
using Telegram.Bot.Types.Enums;
using Telegram.Bot.Types.ReplyMarkups;

namespace StickerEditor.API.Services
{
    public class TelegramBotClientService : ITelegramBotClientService
    {
        private readonly TelegramBotClient _telegramBotClient;

        public TelegramBotClientService( string token )
        {
            _telegramBotClient = new TelegramBotClient( token );
        }

        // TODO: del
        public async Task<Message> SendTextMessageAsync(
            long chatId,
            string text,
            ParseMode parseMode = ParseMode.Html,
            IReplyMarkup? replyMarkup = null )
        {
            return await _telegramBotClient.SendTextMessageAsync( chatId, text, parseMode: parseMode, replyMarkup: replyMarkup );
        }

        public async Task DownloadTgFileAsync( long userId, string fileId, string filePath )
        {
            var telegramFile = await _telegramBotClient.GetFileAsync( fileId );
            var telegramFileType = Path.GetExtension( telegramFile.FilePath );
            
            // Сохранение стикера в файл
            using var downloadFileStream = new FileStream( $"{filePath}{Guid.NewGuid()}{telegramFileType}", FileMode.Create );
            await _telegramBotClient.DownloadFileAsync( telegramFile.FilePath, downloadFileStream );

            // Добавление в стикерпак
            var newStickerFile = InputFile.FromFileId( fileId );
            var newSticker = new InputSticker( newStickerFile, new[] { "\ud83d\ude02" } );

            // TODO: вынести строки в константы 
            var stickerName = $"MySt3s34rs{DateTime.Now.Millisecond}_by_StickerMaker24Bot";

            await _telegramBotClient.CreateNewStickerSetAsync(
                userId,
                stickerName,
                $"MyStxvcrs231asd2{DateTime.Now.Millisecond}",
                new[] { newSticker },
                StickerFormat.Static
                );

            await _telegramBotClient.SendTextMessageAsync(
                chatId: userId,
                text: $"Стикер успешно [сохранён](t.me/addstickers/{stickerName})",
                parseMode: ParseMode.MarkdownV2
            );
        }
    }
}