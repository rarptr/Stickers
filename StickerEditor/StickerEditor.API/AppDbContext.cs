using Microsoft.EntityFrameworkCore;
using StickerEditor.API.Entity;

namespace StickerEditor.API
{
    public class AppDbContext : DbContext
    {
        public DbSet<Guest>? Guests { get; set; }

        public AppDbContext( DbContextOptions<AppDbContext> options ) : base( options )
        { }

        protected override void OnModelCreating( ModelBuilder modelBuilder )
        {
            base.OnModelCreating( modelBuilder );

            // TODO: ApplyConfigurationsFromAssembly
            //modelBuilder.ApplyConfigurationsFromAssembly(typeof(GuestConfiguration).Assembly);
        }
    }
}