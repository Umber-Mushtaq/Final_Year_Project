using Microsoft.EntityFrameworkCore;
namespace FypPronouncerPro.Server.Models
{
    public class PronouncerDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<StudentsModel> Students { get; set; }
        public DbSet<LessonsModel> Lessons { get; set; }
        public DbSet<MispronunciationsModel> Mispronunciations { get; set; }
        public DbSet<UserLessonsModel> UserLessons { get; set; }
        public DbSet<VocabularyModel> Vocabulary { get; set; }
        public DbSet<AdminModel> Admin { get; set; }

    }
}
