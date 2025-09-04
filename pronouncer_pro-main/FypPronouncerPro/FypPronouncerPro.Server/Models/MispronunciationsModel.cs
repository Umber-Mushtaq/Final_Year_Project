using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net.Http.Json;
using System.Text.Json.Serialization;

namespace FypPronouncerPro.Server.Models
{
    public class MispronunciationsModel
    {
        [Key]
        public int M_Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string LessonTitle { get; set; }
        [Required]
        public List<string> M_What { get; set;}
        [Required]
        public List<string> M_How { get; set;}
    }

}
