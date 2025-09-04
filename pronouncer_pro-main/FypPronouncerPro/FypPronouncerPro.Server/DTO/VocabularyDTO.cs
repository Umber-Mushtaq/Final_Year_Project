using System.ComponentModel.DataAnnotations;

namespace FypPronouncerPro.Server.Models
{
    public class VocabularyDTO
    {
        [Required]
        public string UserEmail { get; set; }

        [Required]
        public string Word { get; set; }

    }
}
