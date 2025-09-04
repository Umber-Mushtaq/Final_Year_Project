using System.ComponentModel.DataAnnotations;

namespace FypPronouncerPro.Server.Models
{
    public class UserLessonsModel
    {
        [Key]
        public int UL_Id { get; set; }
        [Required]
        public string UserName { get; set;}
        [Required]
        public string LessonTitle { get; set; }
        [Required]
        public string LessonContent { get; set; }
        [Required]
        public List<string> FocusWords { get; set; }
        [Required]
        public int LessonLevel { get; set; }
        public bool InProgress { get; set; }
        public bool IsComplited { get; set; }

    }
}
