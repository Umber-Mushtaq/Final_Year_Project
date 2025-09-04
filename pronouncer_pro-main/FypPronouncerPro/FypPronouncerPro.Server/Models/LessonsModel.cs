using System.ComponentModel.DataAnnotations;

namespace FypPronouncerPro.Server.Models
{
    public class LessonsModel
    {
        [Key]
        public int  LessonId { get; set; }
        [Required]
        public string LessonTitle { get; set; }
        [Required]
        public string LessonContent { get; set; }
        [Required]
        public int LessonLevel { get; set; }
        [Required]
        public List<string> FocusWords { get; set; }
    }
}
