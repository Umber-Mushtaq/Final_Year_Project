using System.ComponentModel.DataAnnotations;

namespace FypPronouncerPro.Server.DTO
{
    public class TextCompareResponse
    {
        [Required]
        public List<string> Mispronunciations { get; set; }
    }
}
