using System.ComponentModel.DataAnnotations;

namespace FypPronouncerPro.Server.DTO
{
    public class UserLessonRequest
    {
        [Required]
        public string UserEmail { get; set; }
        [Required]
        public string LessonTitle { get; set; }
        [Required]
        public string LessonContent { get; set; }
        [Required]
        public List<string> FocusWords { get; set; }
        [Required]
        public int LessonLevel { get; set; }
    }
}
