using System.ComponentModel.DataAnnotations;

namespace FypPronouncerPro.Server.DTO
{
    public class SignInDTO
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
