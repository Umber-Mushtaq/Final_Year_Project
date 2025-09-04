using System.ComponentModel.DataAnnotations;

namespace FypPronouncerPro.Server.Models
{
    public class VocabularyModel
    {
        [Key]
        public int VId { get; set; }
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Word { get; set; }

    }
}
