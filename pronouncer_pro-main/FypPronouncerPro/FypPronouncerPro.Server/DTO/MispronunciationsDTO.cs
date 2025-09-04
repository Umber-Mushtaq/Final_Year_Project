using FypPronouncerPro.Server.Models;
using System.ComponentModel.DataAnnotations;

namespace FypPronouncerPro.Server.DTO
{
    public class MispronunciationsDTO
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string LessonTitle { get; set; }

        [Required]
        public List<string> M_What { get; set; }
        [Required]
        public List<string> M_How { get; set; }
    } 
}