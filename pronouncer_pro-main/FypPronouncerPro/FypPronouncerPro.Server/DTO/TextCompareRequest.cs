using System.ComponentModel.DataAnnotations;

namespace FypPronouncerPro.Server.DTO
{
    public class TextCompareRequest
    {
        [Required]
        public string OriginalString { get; set; }
        [Required]
        public string SpokenString { get; set; }
    }
}
